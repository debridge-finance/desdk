import { expect } from "chai";
import { deployMockContract } from "ethereum-waffle";
import { BigNumber, ethers } from "ethers";
import { evm } from "../src";
import hre from "hardhat";

import {
  CallProxy,
  CrossChainCounter,
  CrossChainCounter__factory,
  CrossChainIncrementor,
  CrossChainIncrementor__factory,
  DeBridgeGate,
  MockWeth,
  MockWeth__factory,
} from "../src/evm/typechain";
import { describe } from "mocha";

interface TestSuiteState {
  gate: DeBridgeGate;
  gateProtocolFee: BigNumber;
  counter: CrossChainCounter;
  incrementor: CrossChainIncrementor;
}

function getRandom(min: number, max: number, decimals = 18) {
  const denominator = 4;
  min *= 10 ** denominator;
  max *= 10 ** denominator;
  decimals -= denominator;
  const v = Math.floor(Math.random() * (max - min + 1) + min);
  return BigNumber.from("10").pow(decimals).mul(v);
}

async function deployGate(): Promise<DeBridgeGate> {
  // setup WETH9 for wrapping

  const Weth = await hre.ethers.getContractFactory('MockWeth')
  const weth = await Weth.deploy("wrapped Ether", "wETH");

  const DeBridgeGateFactory = await hre.ethers.getContractFactory(
    "DeBridgeGate"
  );

  const deBridgeGate = (await hre.upgrades.deployProxy(DeBridgeGateFactory, [
    0,
    weth.address,
  ])) as DeBridgeGate;
  await deBridgeGate.deployed();

  // setup callproxy
  const CallProxyFactory = await hre.ethers.getContractFactory("CallProxy");
  const callProxy = (await hre.upgrades.deployProxy(
    CallProxyFactory
  )) as CallProxy;
  await callProxy.deployed();

  await callProxy.grantRole(
    await callProxy.DEBRIDGE_GATE_ROLE(),
    deBridgeGate.address
  );
  await deBridgeGate.setCallProxy(callProxy.address);

  // setup signature verifier
  const Verifier = await hre.ethers.getContractFactory("SignatureVerifier");
  const signatureVerifierMock = await deployMockContract(
    (await hre.ethers.getSigners())[0],
    [...Verifier.interface.fragments]
  );
  await signatureVerifierMock.mock.submit.returns();

  await deBridgeGate.setSignatureVerifier(signatureVerifierMock.address);

  // setup chain support (loopback)
  await deBridgeGate.setChainSupport(
    hre.ethers.provider.network.chainId,
    true,
    false
  );
  await deBridgeGate.setChainSupport(
    hre.ethers.provider.network.chainId,
    true,
    true
  );

  // setup global fee
  // For emulation purposes, we pick a random value from a range so that
  // developers consuming this plugin will cultivate a good habit of not
  // relying on hardcoded values and will explicitly query it from the contract
  // This helps to avoid a protocol rust:
  // "If a protocol is designed with a flexible structure, but that
  // flexibility is never used in practice, some implementation is going
  // to assume it is constant"
  // (c) https://blog.cloudflare.com/why-tls-1-3-isnt-in-browsers-yet/
  const [minRndFee, maxRndFee] = [0.001, 0.5];
  const randomGlobalFee = getRandom(minRndFee, maxRndFee, 18 /*decimals*/);
  await deBridgeGate.updateGlobalFee(
    randomGlobalFee,
    10 /*globalTransferFeeBps*/
  );

  return deBridgeGate;
}

// Creates a set of contracts for each test suite (useful for before() and beforeEach())
async function deployContracts(): Promise<TestSuiteState> {
  const gate = await deployGate();

  const Counter = await hre.ethers.getContractFactory('CrossChainCounter')
  const counter = await Counter.deploy(gate.address);

  const Incrementor = await hre.ethers.getContractFactory('CrossChainIncrementor');
  const incrementor = await Incrementor.deploy(gate.address, hre.ethers.provider.network.chainId, counter.address);

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

type State = {
  contracts?: TestSuiteState,
  tx?: ethers.providers.TransactionReceipt;
}

describe("General flow", function () {
  const INCREMENT_BY = 10;
  const state: State = {}

  before(async () => {
    state.contracts = await deployContracts();
    const tx = await state.contracts.incrementor.increment(INCREMENT_BY, {
      value: state.contracts.gateProtocolFee,
    });
    state.tx = await tx.wait();
  });

  it("Must capture one submission", async function () {
    const submissions = await evm.getSubmissions(state.tx!.transactionHash, {
      hre,
      deBridgeGateAddress: state.contracts!.gate.address
    });


    expect(submissions.length)
      .to.be.eq(1);


  });
});
