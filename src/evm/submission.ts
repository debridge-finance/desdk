import { deepCopy } from "ethers/lib/utils";

import { EVMClaim } from "./claim";
import {
  EVMContext,
  getDeBridgeGateAddress,
  getProvider,
} from "./context";
import { SendAutoParams } from "./structs";
import { DeBridgeGate__factory } from "./typechain";
import {
  SentEvent,
  SentEventObject,
} from "./typechain/@debridge-finance/contracts/contracts/interfaces/IDeBridgeGate";

export enum SubmissionStatus {
  WAITING_CONFIRMATION,
  WAITING_CLAIM,
  CLAIMED,
}

export type TEVMSubmission = Readonly<Omit<SentEventObject, "autoParams">> & {
  readonly autoParams: SendAutoParams;
  readonly originChainId: number;
  readonly sentEvent: SentEvent;
};

// tslint:disable-next-line:no-empty-interface
export interface EVMSubmission extends TEVMSubmission {}
export class EVMSubmission {
  static async from(txHash: string, ctx: EVMContext): Promise<EVMSubmission[]> {
    const events = await getSentEvents(txHash, ctx);
    const originChainId = (await getProvider(ctx).getNetwork()).chainId;
    return events.map(
      (sentEvent: SentEvent) =>
        new EVMSubmission({
          ...sentEvent.args,
          autoParams: SendAutoParams.decode(sentEvent.args.autoParams),
          originChainId,
          sentEvent,
        }, ctx)
    );
  }

  constructor(args: TEVMSubmission, private ctx: EVMContext) {
    Object.assign(this, args);
  }

  async isConfirmed(overrideBlockConfirmations?: number): Promise<boolean> {
    const requiredConfirmations = overrideBlockConfirmations === undefined
      ? await this._getRequiredConfirmations()
      : overrideBlockConfirmations;

    const currentBlockNumber = await getProvider(this.ctx).getBlockNumber();
    if (this.sentEvent.blockNumber + requiredConfirmations <= currentBlockNumber) {
      return true;
    }

    return false;
  }

  private async _getRequiredConfirmations(): Promise<number> {
    const network = await getProvider(this.ctx).getNetwork();
    if (network.chainId == 137) return 256;
    else return 12;
  }

  async toEVMClaim(destinationCtx: EVMContext): Promise<EVMClaim> {
    if (!destinationCtx.signatureStorage)
      destinationCtx.signatureStorage = this.ctx.signatureStorage;
    return new EVMClaim(this.submissionId, {
      debridgeId: this.debridgeId,
      amount: this.amount,
      chainIdFrom: this.originChainId,
      receiver: this.receiver,
      nonce: this.nonce,
      autoParams: this.autoParams.toClaimAutoParams(this),
    }, destinationCtx)
  }

  // async toEVMDeployAsset(): Promise<void> {}
}


async function getSentEvents(
  txHash: string,
  opts: EVMContext
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
        return contract.interface.parseLog(log);
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