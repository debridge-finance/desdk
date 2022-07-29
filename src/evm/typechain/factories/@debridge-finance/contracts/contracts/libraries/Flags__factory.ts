/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  Flags,
  FlagsInterface,
} from "../../../../../@debridge-finance/contracts/contracts/libraries/Flags";

const _abi = [
  {
    inputs: [],
    name: "MULTI_SEND",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PROXY_WITH_SENDER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVERT_IF_EXTERNAL_FAIL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SEND_EXTERNAL_CALL_GAS_LIMIT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SEND_HASHED_DATA",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNWRAP_ETH",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6101ad610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061006c5760003560e01c8063222f8167146100715780633b1805941461008f5780637b8332f9146100ad578063878174a9146100cb578063a8153758146100e9578063f3ff906314610107575b600080fd5b610079610125565b6040516100869190610152565b60405180910390f35b61009761012a565b6040516100a49190610152565b60405180910390f35b6100b561012f565b6040516100c29190610152565b60405180910390f35b6100d3610134565b6040516100e09190610152565b60405180910390f35b6100f1610139565b6040516100fe9190610152565b60405180910390f35b61010f61013e565b60405161011c9190610152565b60405180910390f35b600381565b600081565b600181565b600281565b600581565b600481565b61014c8161016d565b82525050565b60006020820190506101676000830184610143565b92915050565b600081905091905056fea2646970667358221220c4156b5a0a4f9aecfdbf90034a6c6901074d3afeb374698bfa1048f955b8f2cc64736f6c63430008070033";

type FlagsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FlagsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Flags__factory extends ContractFactory {
  constructor(...args: FlagsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Flags> {
    return super.deploy(overrides || {}) as Promise<Flags>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Flags {
    return super.attach(address) as Flags;
  }
  override connect(signer: Signer): Flags__factory {
    return super.connect(signer) as Flags__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FlagsInterface {
    return new utils.Interface(_abi) as FlagsInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Flags {
    return new Contract(address, _abi, signerOrProvider) as Flags;
  }
}
