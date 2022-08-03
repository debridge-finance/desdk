import { ethers } from "ethers";
import { SubmissionStatus } from "./submission";



type DeBridgeApiGetFullSubmissionInfoResponse = {
    send: {
        isExecuted: boolean
    }
}

export class DeBridgeApiStatus {
    async getStatus(submissionId: string): Promise<SubmissionStatus> {
        const url = `https://api.debridge.finance/api/Transactions/GetFullSubmissionInfo?filter=${submissionId}`;
        const response = await fetch(url);
        const data = await response.json() as DeBridgeApiGetFullSubmissionInfoResponse;
        if (data.send.isExecuted === true) return SubmissionStatus.CLAIMED;
        else return SubmissionStatus.WAITING_CLAIM;
    }
}


export interface ISignatureStorage {
    getSignatures(submissionId: string): Promise<string[]>;
}

export class DummySignatureStorage implements ISignatureStorage {
    async getSignatures(submissionId: string) {
        return ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7', '0x8']
    }
}

export class FixedSignatureStorage implements ISignatureStorage {
    constructor(private _signatures: string[]) {}

    async getSignatures(submissionId: string) {
        return this._signatures
    }
}

export class SignersSignatureStorage implements ISignatureStorage {
    constructor(private _signers: ethers.Signer[]) {}

    async getSignatures(submissionId: string): Promise<string[]> {
        const signatures = []

        // see the note: https://docs.ethers.io/v5/api/signer/#Signer-signMessage
        // submissionId is a string (0x12[...]), but we must sign the bytes
        const bytesToSign = ethers.utils.arrayify(submissionId);

        for (let i = 0; i < this._signers.length; i++) {
            const signer = this._signers[i];
            const signature = await signer.signMessage(bytesToSign);
            signatures.push(signature)
        }

        return signatures
    }
}

export class IPFSSignatureStorage implements ISignatureStorage {
    async getSignatures(submissionId: string) {
        throw new Error("IPFSSignatureStorage not implemented")
        return [];
    }
}

type DeBridgeApiGetSignaturesResponse = Array<{
    signature: string
}>

export class DeBridgeApiSignatureStorage implements ISignatureStorage {
    async getSignatures(submissionId: string) {
        const url = `https://api.debridge.finance/api/SubmissionConfirmations/getForSubmission?submissionId=${submissionId}`
        // const url = `https://api.debridge.finance/submission/${submissionId}/signatures`
        const response = await fetch(url)
        const data = await response.json() as DeBridgeApiGetSignaturesResponse;
        return data.map(v => v.signature)
    }
}