import { BigNumber, BigNumberish, BytesLike } from "ethers";

import {
  Context,
  getDeBridgeGate,
  getProvider,
  getSignatureStorage,
} from "./context";
import { ClaimAutoParams } from "./structs";
import { SignatureVerifier__factory } from "./typechain";

export type ClaimArgs = [
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export type TClaimFields = {
  readonly debridgeId: BytesLike;
  readonly amount: BigNumberish;
  readonly chainIdFrom: BigNumberish;
  readonly receiver: string;
  readonly nonce: BigNumberish;
  readonly autoParams: ClaimAutoParams;
};

// tslint:disable-next-line:no-empty-interface
export interface Claim extends TClaimFields {}
export class Claim {
  constructor(
    public readonly submissionId: BytesLike,
    args: TClaimFields,
    private ctx: Context
  ) {
    Object.assign(this, args);
  }

  async requiredSignaturesCount(): Promise<number> {
    const contract = getDeBridgeGate(this.ctx);
    const excessConfirmations = await getDeBridgeGate(
      this.ctx
    ).excessConfirmations();
    const sv = SignatureVerifier__factory.connect(
      await contract.signatureVerifier(),
      getProvider(this.ctx)
    );
    const activityExcessConfirmations = await sv.excessConfirmations();
    return Math.max(excessConfirmations, activityExcessConfirmations);
  }

  async isSigned(): Promise<boolean> {
    const signatures = await this.getSignatures();
    const minRequiredSignatures = await this.requiredSignaturesCount();
    return signatures.length >= minRequiredSignatures;
  }

  async isExecuted(): Promise<boolean> {
    return this.isClaimed();
  }

  async isClaimed(): Promise<boolean> {
    const contract = getDeBridgeGate(this.ctx);
    return contract.isSubmissionUsed(this.submissionId);
  }

  async getSignatures(): Promise<string[]> {
    const storage = getSignatureStorage(this.ctx);
    return storage.getSignatures(this.submissionId);
  }

  async getEncodedArgs(): Promise<ClaimArgs> {
    const signatures = await this.getSignatures();

    return [
      this.debridgeId.toString(),
      this.amount.toString(),
      this.chainIdFrom.toString(),
      this.receiver.toString(),
      this.nonce.toString(),
      "0x" + signatures.map((s) => s.replace(/^0x/, "")).join(""),
      this.autoParams.encode(),
    ];
  }

  // TODO getClaimInfo() must return date from the claim event
}
