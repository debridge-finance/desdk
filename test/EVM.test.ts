import { assert, expect } from "chai";
import { BigNumber, ethers } from "ethers";
import hre from "hardhat";
import { describe } from "mocha";

import {
  SignersSignatureStorage,
  Submission,
  Context as EVMContext,
  Flags,
  SendAutoParams,
  Flag,
  Claim,
  ClaimAutoParams,
} from "../src/evm";
import { DeBridgeGate } from "../src/evm/typechain";
import {
  CrossChainCounter,
  CrossChainCounter__factory,
  CrossChainIncrementor,
  CrossChainIncrementor__factory,
} from "./fixture/typechain";

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
    submissions: Submission[];
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

  const [deployer] = await hre.ethers.getSigners();

  const Counter = await new CrossChainCounter__factory().connect(deployer);
  const counter = await Counter.deploy(gate.address);

  const Incrementor = await new CrossChainIncrementor__factory().connect(
    deployer
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

describe("EVM: General flow", function () {
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
    const submissions = await Submission.findAll(
      this.tx.transactionHash,
      this.evmContext
    );

    expect(submissions.length).to.be.eq(1);

    Object.assign(this, {
      submissions,
    });
  });

  it("Must claim", async function () {
    const claim = await this.submissions[0].toEVMClaim(this.evmContext);
    const args = await claim.getClaimArgs();

    await this.contracts.gate.claim(...args);

    expect(await this.contracts.counter.counter()).to.be.eq(INCREMENT_BY);
  });
});

describe("EVM: General flow: multiple submissions per one txn", function () {
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
    this.submissions = await Submission.findAll(
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

      const claim = await this.submissions[i].toEVMClaim(this.evmContext);
      const args = await claim.getClaimArgs();

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

describe("EVM: structs", function () {
  const SEND_AUTOPARAMS = {
    executionFee: BigNumber.from("0"),
    flags: Flags.decode(6),
    fallbackAddress: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    data: "0xcca5afd4000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  };
  const SEND_AUTOPARAMS_RAW =
    "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000014f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000000000000000000000000044cca5afd4000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000";
  const CLAIM_AUTOPARAMS = {
    executionFee: BigNumber.from("0"),
    flags: Flags.decode(6),
    fallbackAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    data: "0xcca5afd4000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    nativeSender: "0x95401dc811bb5740090279ba06cfa8fcf6113778",
  };
  const CLAIM_AUTOPARAMS_RAW =
    "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044cca5afd4000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001495401dc811bb5740090279ba06cfa8fcf6113778000000000000000000000000";

  it("Should encode SendAutoParams", function () {
    const sendAutoParams = new SendAutoParams(SEND_AUTOPARAMS);
    const raw = sendAutoParams.encode();
    expect(raw).to.be.eq(SEND_AUTOPARAMS_RAW);
  });

  it("Should decode SendAutoParams", function () {
    const sendAutoParams = SendAutoParams.decode(SEND_AUTOPARAMS_RAW);

    expect(sendAutoParams.executionFee).eq(SEND_AUTOPARAMS.executionFee);
    expect(sendAutoParams.flags.toString()).eq(
      SEND_AUTOPARAMS.flags.toString()
    );
    expect(sendAutoParams.fallbackAddress).eq(SEND_AUTOPARAMS.fallbackAddress);
    expect(sendAutoParams.data).eq(SEND_AUTOPARAMS.data);
  });

  it("Should encode ClaimAutoParams", function () {
    const claimAutoParams = new ClaimAutoParams(CLAIM_AUTOPARAMS);

    const raw = claimAutoParams.encode();
    expect(raw).to.be.eq(CLAIM_AUTOPARAMS_RAW);
  });

  it("Should decode ClaimAutoParams", function () {
    const claimAutoParams = ClaimAutoParams.decode(CLAIM_AUTOPARAMS_RAW);

    expect(claimAutoParams.executionFee).eq(CLAIM_AUTOPARAMS.executionFee);
    expect(claimAutoParams.flags.toString()).eq(
      CLAIM_AUTOPARAMS.flags.toString()
    );
    expect(claimAutoParams.fallbackAddress).eq(
      CLAIM_AUTOPARAMS.fallbackAddress
    );
    expect(claimAutoParams.data).eq(CLAIM_AUTOPARAMS.data);
    expect(claimAutoParams.nativeSender).eq(CLAIM_AUTOPARAMS.nativeSender);
  });
});
