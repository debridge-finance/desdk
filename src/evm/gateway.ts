import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const DEFAULT_DEBRIDGE_GATE_ADDRESS = '0x43dE2d77BF8027e25dBD179B491e8d64f38398aA'

type InternalState = {
    provider?: ethers.providers.Provider
}

const INTERNAL_STATE: InternalState = {}

export interface Gateway {
    hre?: HardhatRuntimeEnvironment
    provider?: ethers.providers.Provider
    rpcUrl?: string;
    deBridgeGateAddress?: string;
}

export function setDefaultProvider(opts: Gateway) {
    INTERNAL_STATE.provider = getProvider(opts);
}

export function getProvider(opts: Gateway): ethers.providers.Provider {
    if (opts.hre) return opts.hre.ethers.provider;
    if (opts.provider) return opts.provider;
    if (opts.rpcUrl) return new ethers.providers.JsonRpcProvider(opts.rpcUrl);
    if (INTERNAL_STATE.provider) return INTERNAL_STATE.provider;
    throw new Error("deSDK: ethers.provider not set")
}

export function getDeBridgeGateAddress(opts: Gateway): string {
    if (opts.deBridgeGateAddress) return opts.deBridgeGateAddress;
    return DEFAULT_DEBRIDGE_GATE_ADDRESS;
}