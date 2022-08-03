import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { DeBridgeApiSignatureStorage, ISignatureStorage } from "./connectors";

const DEFAULT_DEBRIDGE_GATE_ADDRESS =
  "0x43dE2d77BF8027e25dBD179B491e8d64f38398aA";

export interface EVMContext {
  provider: HardhatRuntimeEnvironment | ethers.providers.Provider | string;
  deBridgeGateAddress?: string;
  signatureStorage?: ISignatureStorage;
}

export function getProvider(ctx: EVMContext): ethers.providers.Provider {
  if (typeof ctx.provider === "string")
    return new ethers.providers.JsonRpcProvider(ctx.provider as string);
  else if ((ctx.provider as HardhatRuntimeEnvironment)?.ethers?.provider)
    return (ctx.provider as HardhatRuntimeEnvironment).ethers.provider;
  else if ((ctx.provider as ethers.providers.Provider)?._isProvider)
    return ctx.provider as ethers.providers.Provider;

  throw new Error(
    "deSDK: cannot resolve network provider; use ctx.hre || ctx.provider || ctx.rpcUrl"
  );
}

export function getDeBridgeGateAddress(ctx: EVMContext): string {
  return ctx.deBridgeGateAddress || DEFAULT_DEBRIDGE_GATE_ADDRESS;
}

export function getSignatureStorage(ctx: EVMContext): ISignatureStorage {
  return ctx.signatureStorage || new DeBridgeApiSignatureStorage();
}
