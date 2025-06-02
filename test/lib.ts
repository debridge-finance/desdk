import { BigNumberish,  } from "ethers";
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
  return 10n ** BigInt(decimals) / BigInt( v )
}

export interface DeBridgeGateOpts {
  validators?: Awaited<ReturnType<typeof hre.ethers.getSigners>>;
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

  const deBridgeGate: DeBridgeGate = <any>(await hre.upgrades.deployProxy(DeBridgeGateFactory, [
    0,
    await weth.getAddress(),
  ], { unsafeAllow: ['missing-initializer-call'] }));

  // setup callproxy
  const CallProxyFactory = await hre.ethers.getContractFactory("CallProxy");
  const callProxy: CallProxy = <any>(await hre.upgrades.deployProxy(
    CallProxyFactory
  )) ;

  await callProxy.grantRole(
    await callProxy.DEBRIDGE_GATE_ROLE(),
    deBridgeGate.getAddress()
  );
  await deBridgeGate.setCallProxy(callProxy.getAddress());

  // setup signature verifier
  const Verifier = await hre.ethers.getContractFactory("SignatureVerifier");
  let verifier: SignatureVerifier;
  if (opts.validators!.length === 0) {
    throw new Error(
      "No validators provided. Please provide at least one validator to deploy the SignatureVerifier."
    );
  } else {
    verifier = <any>(await hre.upgrades.deployProxy(Verifier, [
      opts.validators!.length / 2 + 1, // uint8 _minConfirmations,
      1, // uint8 _confirmationThreshold,
      opts.validators!.length - 2, // uint8 _excessConfirmations,
      await deBridgeGate.getAddress(), // address _debridgeAddress
    ])) ;

    const validatorAddresses = await Promise.all(
      opts.validators.map((signer) => signer.getAddress())
    );

    await verifier.addOracles(
      validatorAddresses,
      Array.from(Array(opts.validators.length)).map(() => false)
    );
  }

  await deBridgeGate.setSignatureVerifier(verifier!.getAddress());

  // setup chain support (loopback)
    const chainId = await hre.ethers.provider.send("eth_chainId", []);
  await deBridgeGate.setChainSupport(
    chainId,
    true,
    false
  );
  await deBridgeGate.setChainSupport(
  chainId,
    true,
    true
  );

  await deBridgeGate.updateGlobalFee(
    opts.fixedFee || getRandom(0.001, 0.5, 18), // globalFixedNativeFee
    10 /*globalTransferFeeBps*/
  );

  return deBridgeGate;
}
