import { BytesLike, ethers } from "ethers";

import { SubmissionStatus } from "./submission";

type DeBridgeApiGetFullSubmissionInfoResponse = {
  send: {
    isExecuted: boolean;
  };
};

export class DeBridgeApiStatus {
  async getStatus(submissionId: string): Promise<SubmissionStatus> {
    const url = [
      `https://api.debridge.finance`,
      `/api/Transactions/GetFullSubmissionInfo?filter=${submissionId}`,
    ].join("");
    const response = await fetch(url);
    const data =
      (await response.json()) as DeBridgeApiGetFullSubmissionInfoResponse;
    if (data.send.isExecuted === true) return SubmissionStatus.CLAIMED;
    else return SubmissionStatus.WAITING_CLAIM;
  }
}

export interface ISignatureStorage {
  getSignatures(submissionId: BytesLike): Promise<string[]>;
}

export class DummySignatureStorage implements ISignatureStorage {
  async getSignatures() {
    return ["0x1", "0x2", "0x3", "0x4", "0x5", "0x6", "0x7", "0x8"];
  }
}

export class FixedSignatureStorage implements ISignatureStorage {
  constructor(private _signatures: string[]) {}

  async getSignatures() {
    return this._signatures;
  }
}
export class SignersSignatureStorage implements ISignatureStorage {
  constructor(private _signers: ethers.Signer[]) {}

  async getSignatures(submissionId: BytesLike): Promise<string[]> {
    const signatures = [];

    // see the note: https://docs.ethers.io/v5/api/signer/#Signer-signMessage
    // submissionId is a string (0x12[...]), but we must sign the bytes
    const bytesToSign = ethers.getBytes(submissionId);

    // Sort signers by their addresses to ensure consistent order
    const sortedSigners = await Promise.all(
      this._signers.map(async (signer) => ({
        signer,
        address: await signer.getAddress(),
      }))
    );
    sortedSigners.sort((a, b) =>
      BigInt(a.address) < BigInt(b.address) ? -1 : 1
    );

    // Collect signatures from sorted signers
    for (const { signer } of sortedSigners) {
      const signature = await signer.signMessage(bytesToSign);
      signatures.push(signature);
    }

    return signatures;
  }
}

export class IPFSSignatureStorage implements ISignatureStorage {
  async getSignatures() {
    throw new Error("IPFSSignatureStorage not implemented");
    return [];
  }
}

type DeBridgeApiGetSignaturesResponse = {
  signature: string;
}[];

export class DeBridgeApiSignatureStorage implements ISignatureStorage {
  async getSignatures(submissionId: string) {
    const url = [
      `https://api.debridge.finance`,
      `/api/SubmissionConfirmations/getForSubmission?submissionId=${submissionId}`,
    ].join("");
    const response = await fetch(url);
    const data = (await response.json()) as DeBridgeApiGetSignaturesResponse;
    return data.map((v) => v.signature);
  }
}
