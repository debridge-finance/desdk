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

export interface SignatureVerifierInterface extends utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "addOracles(address[],bool[])": FunctionFragment;
    "confirmationThreshold()": FunctionFragment;
    "currentBlock()": FunctionFragment;
    "debridgeAddress()": FunctionFragment;
    "excessConfirmations()": FunctionFragment;
    "getOracleInfo(address)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "initialize(uint8,uint8,uint8,address)": FunctionFragment;
    "isValidSignature(bytes32,bytes)": FunctionFragment;
    "minConfirmations()": FunctionFragment;
    "oracleAddresses(uint256)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "requiredOraclesCount()": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "setDebridgeAddress(address)": FunctionFragment;
    "setExcessConfirmations(uint8)": FunctionFragment;
    "setMinConfirmations(uint8)": FunctionFragment;
    "setThreshold(uint8)": FunctionFragment;
    "submissionsInBlock()": FunctionFragment;
    "submit(bytes32,bytes,uint8)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "updateOracle(address,bool,bool)": FunctionFragment;
    "version()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEFAULT_ADMIN_ROLE"
      | "addOracles"
      | "confirmationThreshold"
      | "currentBlock"
      | "debridgeAddress"
      | "excessConfirmations"
      | "getOracleInfo"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "initialize"
      | "isValidSignature"
      | "minConfirmations"
      | "oracleAddresses"
      | "renounceRole"
      | "requiredOraclesCount"
      | "revokeRole"
      | "setDebridgeAddress"
      | "setExcessConfirmations"
      | "setMinConfirmations"
      | "setThreshold"
      | "submissionsInBlock"
      | "submit"
      | "supportsInterface"
      | "updateOracle"
      | "version"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addOracles",
    values: [PromiseOrValue<string>[], PromiseOrValue<boolean>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "confirmationThreshold",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "debridgeAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "excessConfirmations",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOracleInfo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidSignature",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "minConfirmations",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "oracleAddresses",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "requiredOraclesCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setDebridgeAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setExcessConfirmations",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setMinConfirmations",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setThreshold",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "submissionsInBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "submit",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateOracle",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<boolean>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addOracles", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "confirmationThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "debridgeAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "excessConfirmations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOracleInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isValidSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minConfirmations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "oracleAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requiredOraclesCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDebridgeAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setExcessConfirmations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMinConfirmations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submissionsInBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "submit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;

  events: {
    "AddOracle(address,bool)": EventFragment;
    "Confirmed(bytes32,address)": EventFragment;
    "DeployApproved(bytes32)": EventFragment;
    "DeployConfirmed(bytes32,address)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "SubmissionApproved(bytes32)": EventFragment;
    "UpdateOracle(address,bool,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddOracle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Confirmed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DeployApproved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DeployConfirmed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubmissionApproved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateOracle"): EventFragment;
}

export interface AddOracleEventObject {
  oracle: string;
  required: boolean;
}
export type AddOracleEvent = TypedEvent<
  [string, boolean],
  AddOracleEventObject
>;

export type AddOracleEventFilter = TypedEventFilter<AddOracleEvent>;

export interface ConfirmedEventObject {
  submissionId: string;
  operator: string;
}
export type ConfirmedEvent = TypedEvent<[string, string], ConfirmedEventObject>;

export type ConfirmedEventFilter = TypedEventFilter<ConfirmedEvent>;

export interface DeployApprovedEventObject {
  deployId: string;
}
export type DeployApprovedEvent = TypedEvent<
  [string],
  DeployApprovedEventObject
>;

export type DeployApprovedEventFilter = TypedEventFilter<DeployApprovedEvent>;

export interface DeployConfirmedEventObject {
  deployId: string;
  operator: string;
}
export type DeployConfirmedEvent = TypedEvent<
  [string, string],
  DeployConfirmedEventObject
>;

export type DeployConfirmedEventFilter = TypedEventFilter<DeployConfirmedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface SubmissionApprovedEventObject {
  submissionId: string;
}
export type SubmissionApprovedEvent = TypedEvent<
  [string],
  SubmissionApprovedEventObject
>;

export type SubmissionApprovedEventFilter =
  TypedEventFilter<SubmissionApprovedEvent>;

export interface UpdateOracleEventObject {
  oracle: string;
  required: boolean;
  isValid: boolean;
}
export type UpdateOracleEvent = TypedEvent<
  [string, boolean, boolean],
  UpdateOracleEventObject
>;

export type UpdateOracleEventFilter = TypedEventFilter<UpdateOracleEvent>;

export interface SignatureVerifier extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SignatureVerifierInterface;

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
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    addOracles(
      _oracles: PromiseOrValue<string>[],
      _required: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    confirmationThreshold(overrides?: CallOverrides): Promise<[number]>;

    currentBlock(overrides?: CallOverrides): Promise<[number]>;

    debridgeAddress(overrides?: CallOverrides): Promise<[string]>;

    excessConfirmations(overrides?: CallOverrides): Promise<[number]>;

    getOracleInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, boolean, boolean] & {
        exist: boolean;
        isValid: boolean;
        required: boolean;
      }
    >;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      _minConfirmations: PromiseOrValue<BigNumberish>,
      _confirmationThreshold: PromiseOrValue<BigNumberish>,
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      _debridgeAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isValidSignature(
      _submissionId: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    minConfirmations(overrides?: CallOverrides): Promise<[number]>;

    oracleAddresses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    requiredOraclesCount(overrides?: CallOverrides): Promise<[number]>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setDebridgeAddress(
      _debridgeAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setExcessConfirmations(
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMinConfirmations(
      _minConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setThreshold(
      _confirmationThreshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    submissionsInBlock(overrides?: CallOverrides): Promise<[number]>;

    submit(
      _submissionId: PromiseOrValue<BytesLike>,
      _signatures: PromiseOrValue<BytesLike>,
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    updateOracle(
      _oracle: PromiseOrValue<string>,
      _isValid: PromiseOrValue<boolean>,
      _required: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    version(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  addOracles(
    _oracles: PromiseOrValue<string>[],
    _required: PromiseOrValue<boolean>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  confirmationThreshold(overrides?: CallOverrides): Promise<number>;

  currentBlock(overrides?: CallOverrides): Promise<number>;

  debridgeAddress(overrides?: CallOverrides): Promise<string>;

  excessConfirmations(overrides?: CallOverrides): Promise<number>;

  getOracleInfo(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [boolean, boolean, boolean] & {
      exist: boolean;
      isValid: boolean;
      required: boolean;
    }
  >;

  getRoleAdmin(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  grantRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    _minConfirmations: PromiseOrValue<BigNumberish>,
    _confirmationThreshold: PromiseOrValue<BigNumberish>,
    _excessConfirmations: PromiseOrValue<BigNumberish>,
    _debridgeAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isValidSignature(
    _submissionId: PromiseOrValue<BytesLike>,
    _signature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  minConfirmations(overrides?: CallOverrides): Promise<number>;

  oracleAddresses(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  renounceRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  requiredOraclesCount(overrides?: CallOverrides): Promise<number>;

  revokeRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setDebridgeAddress(
    _debridgeAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setExcessConfirmations(
    _excessConfirmations: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMinConfirmations(
    _minConfirmations: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setThreshold(
    _confirmationThreshold: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  submissionsInBlock(overrides?: CallOverrides): Promise<number>;

  submit(
    _submissionId: PromiseOrValue<BytesLike>,
    _signatures: PromiseOrValue<BytesLike>,
    _excessConfirmations: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  updateOracle(
    _oracle: PromiseOrValue<string>,
    _isValid: PromiseOrValue<boolean>,
    _required: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  version(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    addOracles(
      _oracles: PromiseOrValue<string>[],
      _required: PromiseOrValue<boolean>[],
      overrides?: CallOverrides
    ): Promise<void>;

    confirmationThreshold(overrides?: CallOverrides): Promise<number>;

    currentBlock(overrides?: CallOverrides): Promise<number>;

    debridgeAddress(overrides?: CallOverrides): Promise<string>;

    excessConfirmations(overrides?: CallOverrides): Promise<number>;

    getOracleInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, boolean, boolean] & {
        exist: boolean;
        isValid: boolean;
        required: boolean;
      }
    >;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(
      _minConfirmations: PromiseOrValue<BigNumberish>,
      _confirmationThreshold: PromiseOrValue<BigNumberish>,
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      _debridgeAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    isValidSignature(
      _submissionId: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    minConfirmations(overrides?: CallOverrides): Promise<number>;

    oracleAddresses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    requiredOraclesCount(overrides?: CallOverrides): Promise<number>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setDebridgeAddress(
      _debridgeAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setExcessConfirmations(
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setMinConfirmations(
      _minConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setThreshold(
      _confirmationThreshold: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    submissionsInBlock(overrides?: CallOverrides): Promise<number>;

    submit(
      _submissionId: PromiseOrValue<BytesLike>,
      _signatures: PromiseOrValue<BytesLike>,
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateOracle(
      _oracle: PromiseOrValue<string>,
      _isValid: PromiseOrValue<boolean>,
      _required: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "AddOracle(address,bool)"(
      oracle?: null,
      required?: null
    ): AddOracleEventFilter;
    AddOracle(oracle?: null, required?: null): AddOracleEventFilter;

    "Confirmed(bytes32,address)"(
      submissionId?: null,
      operator?: null
    ): ConfirmedEventFilter;
    Confirmed(submissionId?: null, operator?: null): ConfirmedEventFilter;

    "DeployApproved(bytes32)"(deployId?: null): DeployApprovedEventFilter;
    DeployApproved(deployId?: null): DeployApprovedEventFilter;

    "DeployConfirmed(bytes32,address)"(
      deployId?: null,
      operator?: null
    ): DeployConfirmedEventFilter;
    DeployConfirmed(
      deployId?: null,
      operator?: null
    ): DeployConfirmedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;

    "SubmissionApproved(bytes32)"(
      submissionId?: null
    ): SubmissionApprovedEventFilter;
    SubmissionApproved(submissionId?: null): SubmissionApprovedEventFilter;

    "UpdateOracle(address,bool,bool)"(
      oracle?: null,
      required?: null,
      isValid?: null
    ): UpdateOracleEventFilter;
    UpdateOracle(
      oracle?: null,
      required?: null,
      isValid?: null
    ): UpdateOracleEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    addOracles(
      _oracles: PromiseOrValue<string>[],
      _required: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    confirmationThreshold(overrides?: CallOverrides): Promise<BigNumber>;

    currentBlock(overrides?: CallOverrides): Promise<BigNumber>;

    debridgeAddress(overrides?: CallOverrides): Promise<BigNumber>;

    excessConfirmations(overrides?: CallOverrides): Promise<BigNumber>;

    getOracleInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _minConfirmations: PromiseOrValue<BigNumberish>,
      _confirmationThreshold: PromiseOrValue<BigNumberish>,
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      _debridgeAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isValidSignature(
      _submissionId: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minConfirmations(overrides?: CallOverrides): Promise<BigNumber>;

    oracleAddresses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    requiredOraclesCount(overrides?: CallOverrides): Promise<BigNumber>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setDebridgeAddress(
      _debridgeAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setExcessConfirmations(
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMinConfirmations(
      _minConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setThreshold(
      _confirmationThreshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    submissionsInBlock(overrides?: CallOverrides): Promise<BigNumber>;

    submit(
      _submissionId: PromiseOrValue<BytesLike>,
      _signatures: PromiseOrValue<BytesLike>,
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateOracle(
      _oracle: PromiseOrValue<string>,
      _isValid: PromiseOrValue<boolean>,
      _required: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addOracles(
      _oracles: PromiseOrValue<string>[],
      _required: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    confirmationThreshold(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentBlock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    debridgeAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    excessConfirmations(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOracleInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _minConfirmations: PromiseOrValue<BigNumberish>,
      _confirmationThreshold: PromiseOrValue<BigNumberish>,
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      _debridgeAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isValidSignature(
      _submissionId: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minConfirmations(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    oracleAddresses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    requiredOraclesCount(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setDebridgeAddress(
      _debridgeAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setExcessConfirmations(
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMinConfirmations(
      _minConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setThreshold(
      _confirmationThreshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    submissionsInBlock(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    submit(
      _submissionId: PromiseOrValue<BytesLike>,
      _signatures: PromiseOrValue<BytesLike>,
      _excessConfirmations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateOracle(
      _oracle: PromiseOrValue<string>,
      _isValid: PromiseOrValue<boolean>,
      _required: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
