import { BigNumberish, BytesLike } from "ethers";
import { EVMContext, getDeBridgeGate, getProvider, getSignatureStorage } from "./context";
import { ClaimAutoParams } from "./structs";
import { SignatureVerifier__factory } from "./typechain";

export type ClaimArgs = [
    BytesLike,
    BigNumberish,
    BigNumberish,
    string,
    BigNumberish,
    BytesLike,
    BytesLike
];

export type TEVMClaimFields = {
    debridgeId: BytesLike,
    amount: BigNumberish,
    chainIdFrom: BigNumberish,
    receiver: string,
    nonce: BigNumberish,
    autoParams: ClaimAutoParams,
}

// tslint:disable-next-line:no-empty-interface
export interface EVMClaim extends TEVMClaimFields {}
export class EVMClaim {
    constructor(private submissionId: BytesLike, args: TEVMClaimFields, private ctx: EVMContext) {
        Object.assign(this, args);
    }

    async requiredSignaturesCount(): Promise<number> {
        const contract = getDeBridgeGate(this.ctx)
        const excessConfirmations = await getDeBridgeGate(this.ctx).excessConfirmations();
        const sv = SignatureVerifier__factory.connect(
            await contract.signatureVerifier(),
            getProvider(this.ctx)
        );
        const activityExcessConfirmations = await sv.excessConfirmations()
        return Math.max(excessConfirmations, activityExcessConfirmations)
    }

    async isSigned(): Promise<boolean> {
      const signatures = await this.getSignatures()
      const minRequiredSignatures = await this.requiredSignaturesCount()
      return signatures.length >= minRequiredSignatures;
    }

    async isExecuted(): Promise<boolean> {
        return this.isClaimed()
    }

    async isClaimed(): Promise<boolean> {
        const contract = getDeBridgeGate(this.ctx);
        return contract.isSubmissionUsed(this.submissionId);
    }

    async getSignatures(): Promise<string[]> {
      const storage = getSignatureStorage(this.ctx);
      return storage.getSignatures(this.submissionId);
    }

    async getClaimArgs(): Promise<ClaimArgs> {
        const signatures = await this.getSignatures()

        return [
            this.debridgeId,
            this.amount,
            this.chainIdFrom,
            this.receiver,
            this.nonce,
            "0x" + signatures.map((s) => s.replace(/^0x/, "")).join(""),
            this.autoParams.encode(),
        ];
    }
}