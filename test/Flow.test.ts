import { expect } from "chai";
import { BigNumber, ethers } from "ethers";
import hre from "hardhat";
import { describe } from "mocha";

import { evm } from "../src";
import { EVMContext, SignersSignatureStorage } from "../src/evm";
import {
  CrossChainCounter,
  CrossChainIncrementor,
  DeBridgeGate,
} from "../src/evm/typechain";

import { deployGate } from "./lib";

interface TestSuiteState {
  gate: DeBridgeGate;
  gateProtocolFee: BigNumber;
  counter: CrossChainCounter;
  incrementor: CrossChainIncrementor;
}

declare module "mocha" {
  export interface Context {
    contracts: TestSuiteState;
    tx: ethers.providers.TransactionReceipt;
    submissions: evm.EVMSubmission[];
    validators: ethers.Signer[];
    evmContext: EVMContext;
  }
}

// Creates a set of contracts for each test suite (useful for before() and beforeEach())
async function deployContracts(
  signers: ethers.Signer[]
): Promise<TestSuiteState> {
  const gate = await deployGate({
    validators: signers,
  });

  const Counter = await hre.ethers.getContractFactory("CrossChainCounter");
  const counter = await Counter.deploy(gate.address);

  const Incrementor = await hre.ethers.getContractFactory(
    "CrossChainIncrementor"
  );
  const incrementor = await Incrementor.deploy(
    gate.address,
    hre.ethers.provider.network.chainId,
    counter.address
  );

  await counter.addChainSupport(
    hre.ethers.provider.network.chainId,
    incrementor.address
  );

  return {
    gate,
    gateProtocolFee: await gate.globalFixedNativeFee(),
    counter,
    incrementor,
  };
}

describe("General flow", function () {
  const INCREMENT_BY = 10;

  before(async function () {
    const signers = await hre.ethers.getSigners();
    this.validators = signers.slice(0, 12);
    this.contracts = await deployContracts(this.validators);
    this.evmContext = {
      provider: hre,
      deBridgeGateAddress: this.contracts.gate.address,
      signatureStorage: new SignersSignatureStorage(this.validators),
    };
    const tx = await this.contracts.incrementor.increment(INCREMENT_BY, {
      value: this.contracts.gateProtocolFee,
    });
    this.tx = await tx.wait();
  });

  it("Must capture one submission", async function () {
    const submissions = await evm.EVMSubmission.from(
      this.tx.transactionHash,
      this.evmContext
    );

    expect(submissions.length).to.be.eq(1);

    Object.assign(this, {
      submissions,
    });
  });

  it("Must claim", async function () {
    const args = await this.submissions[0].getClaimArgs(this.evmContext);

    await this.contracts.gate.claim(...args);

    expect(await this.contracts.counter.counter()).to.be.eq(INCREMENT_BY);
  });
});

describe("General flow: multiple submissions per one txn", function () {
  const INCREMENT_BY = 10;

  before(async function () {
    const signers = await hre.ethers.getSigners();
    this.validators = signers.slice(0, 12);
    this.contracts = await deployContracts(this.validators);
    this.evmContext = {
      provider: hre,
      deBridgeGateAddress: this.contracts.gate.address,
      signatureStorage: new SignersSignatureStorage(this.validators),
    };
    const tx = await this.contracts.incrementor.incrementMulti(
      [INCREMENT_BY, INCREMENT_BY * 2, INCREMENT_BY * 3],
      {
        value: this.contracts.gateProtocolFee.mul(3),
      }
    );
    this.tx = await tx.wait();
  });

  it("Must capture multiple submissions", async function () {
    this.submissions = await evm.EVMSubmission.from(
      this.tx.transactionHash,
      this.evmContext
    );

    expect(this.submissions.length).to.be.eq(3);
  });

  for (let i = 0; i < 3; i++) {
    it(`Must claim #${i + 1}`, async function () {
      const preCounterValue = (
        await this.contracts.counter.counter()
      ).toNumber();

      const args = await this.submissions[i].getClaimArgs(this.evmContext);

      await this.contracts.gate.claim(...args);

      expect(await this.contracts.counter.counter()).to.be.eq(
        preCounterValue + INCREMENT_BY * (i + 1)
      );
    });
  }

  it("Check final value of the counter", async function () {
    expect(await this.contracts.counter.counter()).to.be.eq(
      INCREMENT_BY + INCREMENT_BY * 2 + INCREMENT_BY * 3
    );
  });
});
