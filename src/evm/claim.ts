import { BigNumberish, BytesLike } from "ethers";
import { EVMContext, getDeBridgeGate, getSignatureStorage } from "./context";
import { ClaimAutoParams } from "./structs";
import { DeBridgeGate } from "./typechain";

export type ClaimArgs = Parameters<DeBridgeGate["claim"]>;

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

    async isSigned(): Promise<boolean> {
      // TODO: pick minConfirmations vs excessConfirmations according to bridged amount
      // TODO: check required validators
      const signatures = await this.getSignatures()
      return signatures.length > 8;
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