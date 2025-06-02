import { ethers } from "ethers";
import "@nomicfoundation/hardhat-toolbox"
import { DeBridgeApiSignatureStorage, ISignatureStorage } from "./connectors";
import { DeBridgeGate, DeBridgeGate__factory } from "./typechain";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export const DEFAULT_DEBRIDGE_GATE_ADDRESS =
  "0x43dE2d77BF8027e25dBD179B491e8d64f38398aA";

export type HRELike = {
  ethers: {
    provider: ethers.JsonRpcProvider;
  };
};

export interface Context {
  provider: HardhatRuntimeEnvironment | ethers.Provider | string;
  deBridgeGateAddress?: string;
  signatureStorage?: ISignatureStorage;
}

export function getProvider(ctx: Context): ethers.Provider {
  if (typeof ctx.provider === "string")
    return new ethers.JsonRpcProvider(ctx.provider as string);
  else if ((ctx.provider as HardhatRuntimeEnvironment)?.ethers?.provider)
    return (ctx.provider as HardhatRuntimeEnvironment).ethers.provider;
  else if ((ctx.provider as ethers.Provider)?.provider === ctx.provider)
    return ctx.provider as ethers.Provider;

  throw new Error("deSDK: cannot resolve network provider from the context");
}

export function getDeBridgeGateAddress(ctx: Context): string {
  return ctx.deBridgeGateAddress || DEFAULT_DEBRIDGE_GATE_ADDRESS;
}

export function getDeBridgeGate(ctx: Context): DeBridgeGate {
  return DeBridgeGate__factory.connect(
    getDeBridgeGateAddress(ctx),
    getProvider(ctx)
  );
}

export function getSignatureStorage(ctx: Context): ISignatureStorage {
  return ctx.signatureStorage || new DeBridgeApiSignatureStorage();
}
