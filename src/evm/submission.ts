import { deepCopy } from "ethers/lib/utils";
import { ClaimArgs } from "./claim";
import { DeBridgeApiStatus } from "./connectors";
import { EVMContext, getDeBridgeGateAddress, getProvider, getSignatureStorage } from "./context";
import { SendAutoParams } from "./structs";
import { DeBridgeGate__factory } from "./typechain";
import { SentEvent, SentEventObject } from "./typechain/@debridge-finance/contracts/contracts/interfaces/IDeBridgeGate";

export enum SubmissionStatus {
    WAITING_CONFIRMATION,
    WAITING_CLAIM,
    CLAIMED
}

export type TEVMSubmission = Readonly<Omit<SentEventObject, 'autoParams'>> & {
    readonly autoParams: SendAutoParams;
    readonly originChainId: number;
    readonly sentEvent: SentEvent;
}
export interface EVMSubmission extends TEVMSubmission {}
export class EVMSubmission {
    static async from(txHash: string, ctx: EVMContext): Promise<EVMSubmission[]> {
        return getSubmissions(txHash, ctx)
    }

    constructor(args: TEVMSubmission) {
      Object.assign(this, args);
    }

    async getStatus(ctx: EVMContext): Promise<SubmissionStatus> {
        const api = new DeBridgeApiStatus();
        return api.getStatus(this.submissionId);
    }

    async getSignatures(ctx: EVMContext): Promise<string[]> {
        const storage = getSignatureStorage(ctx);
        return storage.getSignatures(this.submissionId);
    }

    async getClaimArgs(ctx: EVMContext): Promise<ClaimArgs> {
        return getClaimArgs(this, ctx);
    }
}

export async function getClaimArgs(submission: EVMSubmission, ctx: EVMContext): Promise<ClaimArgs> {
    const storage = getSignatureStorage(ctx);
    const signatures = await storage.getSignatures(submission.submissionId);
    return [
        submission.debridgeId,
        submission.amount,
        submission.originChainId,
        submission.receiver,
        submission.nonce,
        '0x' + signatures.map(s => s.replace(/^0x/, '')).join(''),
        submission.autoParams.toClaimAutoParams(submission).encode()
      ];
}

export async function getSubmissions(txHash: string, ctx: EVMContext): Promise<EVMSubmission[]> {
    const events = await getSentEvents(txHash, ctx);
    const originChainId = (await getProvider(ctx).getNetwork()).chainId;
    return events.map((sentEvent: SentEvent) => new EVMSubmission({
        ...sentEvent.args,
        autoParams: SendAutoParams.decode(sentEvent.args.autoParams),
        originChainId,
        sentEvent,
    }))
}

async function getSentEvents(txHash: string, opts: EVMContext): Promise<SentEvent[]> {
    const provider = getProvider(opts);
    const txReceipt = await provider.getTransactionReceipt(txHash);
    const contract = DeBridgeGate__factory.connect(
        getDeBridgeGateAddress(opts),
        provider
    );

    return txReceipt.logs
        .map((log) => {
            try {
                return contract.interface.parseLog(log)
            } catch (e) { }
        })
        .filter(log => log !== undefined)
        .filter(log => log!.name == 'Sent')
        .map(log => {
            // this is an ugly copypasta from the ethers.js' Contract._wrapEvent method
            // until Contract.queryTransaction() is implemented (https://github.com/ethers-io/ethers.js/discussions/2895)
            const event = <SentEvent>deepCopy(log! as unknown)
            event.getBlock = () => { return provider.getBlock(txReceipt.blockHash); }
            event.getTransaction = () => { return provider.getTransaction(txReceipt.transactionHash); }
            event.getTransactionReceipt = () => { return Promise.resolve(txReceipt) }
            return event
        })
}
