import { BigNumber } from "ethers";
import { deepCopy } from "ethers/lib/utils";

import { Claim } from "./claim";
import { Context, getDeBridgeGateAddress, getProvider } from "./context";
import { SendAutoParams } from "./structs";
import { DeBridgeGate__factory } from "./typechain";
import {
  IDeBridgeGate,
  SentEvent,
  SentEventObject,
} from "./typechain/@debridge-finance/contracts/contracts/interfaces/IDeBridgeGate";

export enum SubmissionStatus {
  WAITING_CONFIRMATION,
  WAITING_CLAIM,
  CLAIMED,
}

export type TSubmission = Readonly<Omit<SentEventObject, 'amount' | 'nonce' | 'chainIdTo' | 'autoParams'> & {
  amount: string;
  nonce: string;
  chainIdTo: string;
  autoParams: SendAutoParams;

  originChainId: number;
  sentEvent: SentEvent;
}>;

// tslint:disable-next-line:no-empty-interface
export interface Submission extends TSubmission {}
export class Submission {
  static async findAll(txHash: string, ctx: Context): Promise<Submission[]> {
    const events = await getSentEvents(txHash, ctx);
    const originChainId = (await getProvider(ctx).getNetwork()).chainId;
    return events.map(
      (sentEvent: SentEvent) =>
        new Submission(
          {
            submissionId: sentEvent.args.submissionId.toString(),
            debridgeId: sentEvent.args.debridgeId.toString(),
            amount: sentEvent.args.amount.toString(),
            receiver: sentEvent.args.receiver.toString(),
            nonce: sentEvent.args.nonce.toString(),
            chainIdTo: sentEvent.args.chainIdTo.toString(),
            referralCode: sentEvent.args.referralCode,
            feeParams: sentEvent.args.feeParams,
            autoParams: SendAutoParams.decode(sentEvent.args.autoParams),
            nativeSender: sentEvent.args.nativeSender.toString(),

            originChainId,
            sentEvent,
          },
          ctx
        )
    );
  }

  static async find(
    txHash: string,
    submissionId: string,
    ctx: Context
  ): Promise<Submission | undefined> {
    const submissions = await Submission.findAll(txHash, ctx);
    return submissions.find((s) => s.submissionId === submissionId);
  }

  constructor(args: TSubmission, private ctx: Context) {
    Object.assign(this, args);
  }

  async hasRequiredBlockConfirmations(overrideBlockConfirmations?: number): Promise<boolean> {
    const requiredConfirmations =
      overrideBlockConfirmations === undefined
        ? await this._getRequiredConfirmations()
        : overrideBlockConfirmations;

    const currentBlockNumber = await getProvider(this.ctx).getBlockNumber();
    const submissionBlockNumber = this.sentEvent.blockNumber;

    if (
      submissionBlockNumber + requiredConfirmations <=
      currentBlockNumber
    ) {
      return true;
    }

    return false;
  }

  private async _getRequiredConfirmations(): Promise<number> {
    const network = await getProvider(this.ctx).getNetwork();
    if (network.chainId === 137) return 256;
    else return 12;
  }

  async toEVMClaim(destinationCtx: Context): Promise<Claim> {
    if (!destinationCtx.signatureStorage)
      destinationCtx.signatureStorage = this.ctx.signatureStorage;
    return new Claim(
      {
        submissionId: this.submissionId,
        debridgeId: this.debridgeId,
        amount: this.amount,
        chainIdFrom: this.originChainId,
        receiver: this.receiver,
        nonce: this.nonce,
        autoParams: this.autoParams.toClaimAutoParams(this),
      },
      destinationCtx
    );
  }

  // async toEVMDeployAsset(): Promise<void> {}
}

async function getSentEvents(
  txHash: string,
  opts: Context
): Promise<SentEvent[]> {
  const provider = getProvider(opts);
  const txReceipt = await provider.getTransactionReceipt(txHash);
  const contract = DeBridgeGate__factory.connect(
    getDeBridgeGateAddress(opts),
    provider
  );

  return txReceipt.logs
    .map((log) => {
      try {
        const logDescription = contract.interface.parseLog(log);
        return {
          ...log,
          ...logDescription
        }
      } catch (e) {}
    })
    .filter((log) => log !== undefined)
    .filter((log) => log!.name === "Sent")
    .map((log) => {
      // this is an ugly copypasta from the ethers.js' Contract._wrapEvent method
      // until Contract.queryTransaction() is implemented (https://github.com/ethers-io/ethers.js/discussions/2895)
      const event = deepCopy(log! as unknown) as SentEvent;
      event.getBlock = () => {
        return provider.getBlock(txReceipt.blockHash);
      };
      event.getTransaction = () => {
        return provider.getTransaction(txReceipt.transactionHash);
      };
      event.getTransactionReceipt = () => {
        return Promise.resolve(txReceipt);
      };
      return event;
    });
}
