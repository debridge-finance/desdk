import { ethers } from "ethers";
import { DeBridgeApiSignatureStorage, ISignatureStorage } from "./connectors";
import { DeBridgeGate, DeBridgeGate__factory } from "./typechain";

export const DEFAULT_DEBRIDGE_GATE_ADDRESS =
  "0x43dE2d77BF8027e25dBD179B491e8d64f38398aA";

export type HRELike = {
  ethers: {
    provider: ethers.providers.JsonRpcProvider
  }
}

export interface EVMContext {
  provider: HRELike | ethers.providers.Provider | string;
  deBridgeGateAddress?: string;
  signatureStorage?: ISignatureStorage;
}

export function getProvider(ctx: EVMContext): ethers.providers.Provider {
  if (typeof ctx.provider === "string")
    return new ethers.providers.JsonRpcProvider(ctx.provider as string);
  else if ((ctx.provider as HRELike)?.ethers?.provider)
    return (ctx.provider as HRELike).ethers.provider;
  else if ((ctx.provider as ethers.providers.Provider)?._isProvider)
    return ctx.provider as ethers.providers.Provider;

  throw new Error(
    "deSDK: cannot resolve network provider from the context"
  );
}

export function getDeBridgeGateAddress(ctx: EVMContext): string {
  return ctx.deBridgeGateAddress || DEFAULT_DEBRIDGE_GATE_ADDRESS;
}

export function getDeBridgeGate(ctx: EVMContext): DeBridgeGate {
  return DeBridgeGate__factory.connect(
    getDeBridgeGateAddress(ctx),
    getProvider(ctx)
  );
}

export function getSignatureStorage(ctx: EVMContext): ISignatureStorage {
  return ctx.signatureStorage || new DeBridgeApiSignatureStorage();
}
