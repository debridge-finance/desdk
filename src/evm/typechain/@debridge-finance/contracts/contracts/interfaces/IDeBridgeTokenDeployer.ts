/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export interface IDeBridgeTokenDeployerInterface extends utils.Interface {
  functions: {
    "deployAsset(bytes32,string,string,uint8)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "deployAsset"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deployAsset",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "deployAsset",
    data: BytesLike
  ): Result;

  events: {
    "DeBridgeTokenDeployed(address,string,string,uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DeBridgeTokenDeployed"): EventFragment;
}

export interface DeBridgeTokenDeployedEventObject {
  asset: string;
  name: string;
  symbol: string;
  decimals: number;
}
export type DeBridgeTokenDeployedEvent = TypedEvent<
  [string, string, string, number],
  DeBridgeTokenDeployedEventObject
>;

export type DeBridgeTokenDeployedEventFilter =
  TypedEventFilter<DeBridgeTokenDeployedEvent>;

export interface IDeBridgeTokenDeployer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IDeBridgeTokenDeployerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deployAsset(
      _debridgeId: PromiseOrValue<BytesLike>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  deployAsset(
    _debridgeId: PromiseOrValue<BytesLike>,
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deployAsset(
      _debridgeId: PromiseOrValue<BytesLike>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "DeBridgeTokenDeployed(address,string,string,uint8)"(
      asset?: null,
      name?: null,
      symbol?: null,
      decimals?: null
    ): DeBridgeTokenDeployedEventFilter;
    DeBridgeTokenDeployed(
      asset?: null,
      name?: null,
      symbol?: null,
      decimals?: null
    ): DeBridgeTokenDeployedEventFilter;
  };

  estimateGas: {
    deployAsset(
      _debridgeId: PromiseOrValue<BytesLike>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deployAsset(
      _debridgeId: PromiseOrValue<BytesLike>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
