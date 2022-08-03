import { deployMockContract } from "ethereum-waffle";
import { BigNumber, BigNumberish, ethers } from "ethers";
import hre from "hardhat";

import {
  CallProxy,
  DeBridgeGate,
  SignatureVerifier,
} from "../src/evm/typechain";

function getRandom(min: number, max: number, decimals = 18) {
  const denominator = 4;
  min *= 10 ** denominator;
  max *= 10 ** denominator;
  decimals -= denominator;
  const v = Math.floor(Math.random() * (max - min + 1) + min);
  return BigNumber.from("10").pow(decimals).mul(v);
}

export interface DeBridgeGateOpts {
  validators?: ethers.Signer[];
  fixedFee?: BigNumberish;
}

export async function deployGate(
  opts: DeBridgeGateOpts = {}
): Promise<DeBridgeGate> {
  opts.validators = opts.validators || [];

  // setup WETH9 for wrapping
  const Weth = await hre.ethers.getContractFactory("MockWeth");
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
  let verifier;
  if (opts.validators!.length === 0) {
    verifier = await deployMockContract((await hre.ethers.getSigners())[0], [
      ...Verifier.interface.fragments,
    ]);
    await verifier.mock.submit.returns();
  } else {
    verifier = (await hre.upgrades.deployProxy(Verifier, [
      opts.validators!.length / 2 + 1, // uint8 _minConfirmations,
      1, // uint8 _confirmationThreshold,
      opts.validators!.length - 2, // uint8 _excessConfirmations,
      deBridgeGate.address, // address _debridgeAddress
    ])) as SignatureVerifier;

    const validatorAddresses = await Promise.all(
      opts.validators.map((signer) => signer.getAddress())
    );

    await verifier.addOracles(
      validatorAddresses,
      Array.from(Array(opts.validators.length)).map(() => false)
    );
  }

  await deBridgeGate.setSignatureVerifier(verifier.address);

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

  await deBridgeGate.updateGlobalFee(
    opts.fixedFee || getRandom(0.001, 0.5, 18), // globalFixedNativeFee
    10 /*globalTransferFeeBps*/
  );

  return deBridgeGate;
}
