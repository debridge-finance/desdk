import { deepCopy } from "ethers/lib/utils";
import { Gateway, getDeBridgeGateAddress, getProvider } from "./gateway";
import { ISubmissionAutoParamsTo, parseAutoParamsTo } from "./structs";
import { DeBridgeGate__factory } from "./typechain";
import { SentEvent, SentEventObject } from "./typechain/@debridge-finance/contracts/contracts/interfaces/IDeBridgeGate";


export type Submission = Readonly<Omit<SentEventObject, 'autoParams'>> & {
    readonly autoParams: ISubmissionAutoParamsTo;
    readonly sentEvent: SentEvent;
}

export async function getSubmissions(txHash: string, opts: Gateway): Promise<Submission[]> {
    const events = await getSentEvents(txHash, opts);
    return events.map((sentEvent: SentEvent) => ({
        ...sentEvent.args,
        autoParams: parseAutoParamsTo(sentEvent.args.autoParams),
        sentEvent,
    }))
}

async function getSentEvents(txHash: string, opts: Gateway): Promise<SentEvent[]> {
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
            // this is an ugly copy'n'paste from the ethers.js' Contract._wrapEvent method
            // unless Contract.queryTransaction() is implemented (https://github.com/ethers-io/ethers.js/discussions/2895)
            const event = <SentEvent>deepCopy(log! as unknown)
            event.getBlock = () => { return provider.getBlock(txReceipt.blockHash); }
            event.getTransaction = () => { return provider.getTransaction(txReceipt.transactionHash); }
            event.getTransactionReceipt = () => { return Promise.resolve(txReceipt) }
            return event
        })
}
