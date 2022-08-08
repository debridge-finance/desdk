import { BigNumberish, BytesLike } from "ethers";

import { SendAutoParams } from "./structs";

type SendArgs = [
  string,
  string,
  string,
  string,
  string,
  boolean,
  string,
  string
];

type TMessage = {
  readonly tokenAddress: string;
  readonly amount: BigNumberish;
  readonly chainIdTo: BigNumberish;
  readonly receiver: BytesLike;
  readonly permit?: BytesLike;
  readonly useAssetFee?: boolean;
  readonly referralCode?: BigNumberish;
  readonly autoParams: SendAutoParams;
};

// tslint:disable-next-line:no-empty-interface
export interface Message extends TMessage {
  /*_*/
}
export class Message {
  constructor(args: TMessage) {
    Object.assign(this, args);
  }

  getEncodedArgs(): SendArgs {
    return [
      this.tokenAddress,
      this.amount.toString(),
      this.chainIdTo.toString(),
      this.receiver.toString(),
      this.permit ? this.permit.toString() : "0x",
      this.useAssetFee !== undefined ? this.useAssetFee : false,
      this.referralCode ? this.referralCode.toString() : "0",
      this.autoParams.encode(),
    ];
  }
}
