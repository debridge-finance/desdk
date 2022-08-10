import { BytesLike, defaultAbiCoder, ParamType } from "ethers/lib/utils";

import { Submission } from "./submission";

export enum Flag {
  UNWRAP_ETH = 0,
  REVERT_IF_EXTERNAL_FAIL = 1,
  PROXY_WITH_SENDER = 2,
  SEND_HASHED_DATA = 3,
  SEND_EXTERNAL_CALL_GAS_LIMIT = 4,
  MULTI_SEND = 5,
}

export class Flags {
  private _flags: number = 0;

  static decode(rawValue: number) {
    const flags = new Flags();
    flags._flags = rawValue;
    return flags;
  }

  constructor(...flags: Flag[]) {
    this.setFlags(...flags);
  }

  public setFlags(...flags: Flag[]) {
    flags.forEach((f) => this.setFlag(f));
  }

  public setFlag(flag: Flag) {
    // tslint:disable-next-line:no-bitwise
    this._flags = this._flags | (1 << flag);
  }

  public unsetFlag(flag: Flag) {
    // tslint:disable-next-line:no-bitwise
    this._flags = this._flags & ~(1 << flag);
  }

  public isSet(flag: Flag) {
    // tslint:disable-next-line:no-bitwise
    const v = (this._flags >> flag) & 1;
    return v === 1;
  }

  public toString() {
    return this._flags.toString();
  }

  public getFlags(): Flag[] {
    const ret: Flag[] = [];
    Object.keys(Flag).forEach((fl) => {
      const flag = Flag[fl as keyof typeof Flag];
      if (this.isSet(flag)) {
        ret.push(flag);
      }
    });
    return ret;
  }

  public toHumanReadableString() {
    const assertedFlags: string[] = [];
    this.getFlags().forEach((flag) => {
      assertedFlags.push(Flag[flag]);
    });

    return `Flags { ${assertedFlags.join(", ")} }`;
  }
}

export const SubmissionAutoParamsToParam = ParamType.from({
  type: "tuple",
  name: "SubmissionAutoParamsTo",
  components: [
    { name: "executionFee", type: "uint256" },
    { name: "flags", type: "uint256" },
    { name: "fallbackAddress", type: "bytes" },
    { name: "data", type: "bytes" },
  ],
});

export const SubmissionAutoParamsFromParam = ParamType.from({
  type: "tuple",
  name: "SubmissionAutoParamsFrom",
  components: [
    { name: "executionFee", type: "uint256" },
    { name: "flags", type: "uint256" },
    { name: "fallbackAddress", type: "address" },
    { name: "data", type: "bytes" },
    { name: "nativeSender", type: "bytes" },
  ],
});

type TSendAutoParams = {
  readonly executionFee: string;
  readonly flags: Flags;
  readonly fallbackAddress: string;
  readonly data: string;
};

// tslint:disable-next-line:no-empty-interface
export interface SendAutoParams extends TSendAutoParams {}
export class SendAutoParams {
  static decode(data: string): SendAutoParams {
    const struct = defaultAbiCoder.decode(
      [SubmissionAutoParamsToParam],
      data
    )[0];

    return new SendAutoParams({
      ...struct,
      flags: Flags.decode(struct.flags.toNumber()),
    });
  }

  constructor(args: TSendAutoParams) {
    Object.assign(this, args);
  }

  toString(): string {
    return this.encode();
  }

  encode(): string {
    return defaultAbiCoder.encode(
      [SubmissionAutoParamsToParam],
      [
        [
          this.executionFee,
          this.flags.toString(),
          this.fallbackAddress,
          this.data,
        ],
      ]
    );
  }

  toClaimAutoParams(submission: Submission): ClaimAutoParams {
    return new ClaimAutoParams({
      ...this,
      nativeSender: submission.nativeSender,
    });
  }
}

type TClaimAutoParams = {
  readonly executionFee: string;
  readonly flags: Flags;
  readonly fallbackAddress: BytesLike;
  readonly data: BytesLike;
  readonly nativeSender: BytesLike;
};

// tslint:disable-next-line:no-empty-interface
export interface ClaimAutoParams extends TClaimAutoParams {}
export class ClaimAutoParams {
  static decode(data: string): ClaimAutoParams {
    const struct = defaultAbiCoder.decode(
      [SubmissionAutoParamsFromParam],
      data
    )[0];

    return new ClaimAutoParams({
      ...struct,
      flags: Flags.decode(struct.flags.toNumber()),
    });
  }

  constructor(args: TClaimAutoParams) {
    Object.assign(this, args);
  }

  toString(): string {
    return this.encode();
  }

  encode(): string {
    return defaultAbiCoder.encode(
      [SubmissionAutoParamsFromParam],
      [
        [
          this.executionFee,
          this.flags.toString(),
          this.fallbackAddress,
          this.data,
          this.nativeSender,
        ],
      ]
    );
  }
}
