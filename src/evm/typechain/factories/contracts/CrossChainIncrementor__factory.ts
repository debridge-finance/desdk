/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  CrossChainIncrementor,
  CrossChainIncrementorInterface,
} from "../../contracts/CrossChainIncrementor";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IDeBridgeGate",
        name: "deBridgeGate_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "crossChainCounterResidenceChainID_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "crossChainCounterResidenceAddress_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "deBridgeGate",
    outputs: [
      {
        internalType: "contract IDeBridgeGate",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_amount",
        type: "uint8",
      },
    ],
    name: "increment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_amount",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_executionFee",
        type: "uint256",
      },
    ],
    name: "incrementWithIncludedGas",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000a4538038062000a4583398181016040528101906200003791906200010d565b826000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160018190555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050506200020e565b600081519050620000d981620001c0565b92915050565b600081519050620000f081620001da565b92915050565b6000815190506200010781620001f4565b92915050565b600080600060608486031215620001295762000128620001bb565b5b60006200013986828701620000df565b93505060206200014c86828701620000f6565b92505060406200015f86828701620000c8565b9150509250925092565b6000620001768262000191565b9050919050565b60006200018a8262000169565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600080fd5b620001cb8162000169565b8114620001d757600080fd5b50565b620001e5816200017d565b8114620001f157600080fd5b50565b620001ff81620001b1565b81146200020b57600080fd5b50565b610827806200021e6000396000f3fe6080604052600436106100345760003560e01c8063a78730a514610039578063ca777fbf14610055578063d6b4633014610080575b600080fd5b610053600480360381019061004e919061039b565b61009c565b005b34801561006157600080fd5b5061006a6100b9565b6040516100779190610606565b60405180910390f35b61009a6004803603810190610095919061036e565b6100dd565b005b60006100a883336100fa565b90506100b4818361017c565b505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006100e982336100fa565b90506100f681600061017c565b5050565b606063cca5afd460e01b8383604051602401610117929190610643565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905092915050565b61018461031c565b8181600001818152505061019f8160200151600260016102f4565b8160200181815250506101b881602001516001806102f4565b816020018181525050828160600181905250336040516020016101db919061055a565b604051602081830303815290604052816040018190525060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663be29747634600034600154600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051602001610268919061055a565b604051602081830303815290604052600160008960405160200161028c9190610621565b6040516020818303038152906040526040518963ffffffff1660e01b81526004016102bd9796959493929190610575565b6000604051808303818588803b1580156102d657600080fd5b505af11580156102ea573d6000803e3d6000fd5b5050505050505050565b6000811561030a57826001901b84179050610315565b826001901b19841690505b9392505050565b6040518060800160405280600081526020016000815260200160608152602001606081525090565b600081359050610353816107c3565b92915050565b600081359050610368816107da565b92915050565b6000602082840312156103845761038361079d565b5b600061039284828501610359565b91505092915050565b600080604083850312156103b2576103b161079d565b5b60006103c085828601610359565b92505060206103d185828601610344565b9150509250929050565b6103e481610699565b82525050565b6103fb6103f682610699565b610779565b82525050565b61040a816106ab565b82525050565b600061041b8261066c565b6104258185610677565b9350610435818560208601610746565b61043e816107a2565b840191505092915050565b60006104548261066c565b61045e8185610688565b935061046e818560208601610746565b610477816107a2565b840191505092915050565b61048b816106fe565b82525050565b61049a81610710565b82525050565b60006104ad600083610688565b91506104b8826107c0565b600082019050919050565b60006080830160008301516104db600086018261052d565b5060208301516104ee602086018261052d565b50604083015184820360408601526105068282610410565b915050606083015184820360608601526105208282610410565b9150508091505092915050565b610536816106d7565b82525050565b610545816106d7565b82525050565b610554816106f1565b82525050565b600061056682846103ea565b60148201915081905092915050565b60006101008201905061058b600083018a6103db565b610598602083018961053c565b6105a5604083018861053c565b81810360608301526105b78187610449565b905081810360808301526105ca816104a0565b90506105d960a0830186610401565b6105e660c0830185610491565b81810360e08301526105f88184610449565b905098975050505050505050565b600060208201905061061b6000830184610482565b92915050565b6000602082019050818103600083015261063b81846104c3565b905092915050565b6000604082019050610658600083018561054b565b61066560208301846103db565b9392505050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b60006106a4826106b7565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b600060ff82169050919050565b600061070982610722565b9050919050565b600061071b826106e1565b9050919050565b600061072d82610734565b9050919050565b600061073f826106b7565b9050919050565b60005b83811015610764578082015181840152602081019050610749565b83811115610773576000848401525b50505050565b60006107848261078b565b9050919050565b6000610796826107b3565b9050919050565b600080fd5b6000601f19601f8301169050919050565b60008160601b9050919050565b50565b6107cc816106d7565b81146107d757600080fd5b50565b6107e3816106f1565b81146107ee57600080fd5b5056fea264697066735822122029d432016e9c62c3b2e43ca9d729d452817d93a3eaabdc79ae413cd9fe3cd05864736f6c63430008070033";

type CrossChainIncrementorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CrossChainIncrementorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CrossChainIncrementor__factory extends ContractFactory {
  constructor(...args: CrossChainIncrementorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    deBridgeGate_: PromiseOrValue<string>,
    crossChainCounterResidenceChainID_: PromiseOrValue<BigNumberish>,
    crossChainCounterResidenceAddress_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CrossChainIncrementor> {
    return super.deploy(
      deBridgeGate_,
      crossChainCounterResidenceChainID_,
      crossChainCounterResidenceAddress_,
      overrides || {}
    ) as Promise<CrossChainIncrementor>;
  }
  override getDeployTransaction(
    deBridgeGate_: PromiseOrValue<string>,
    crossChainCounterResidenceChainID_: PromiseOrValue<BigNumberish>,
    crossChainCounterResidenceAddress_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      deBridgeGate_,
      crossChainCounterResidenceChainID_,
      crossChainCounterResidenceAddress_,
      overrides || {}
    );
  }
  override attach(address: string): CrossChainIncrementor {
    return super.attach(address) as CrossChainIncrementor;
  }
  override connect(signer: Signer): CrossChainIncrementor__factory {
    return super.connect(signer) as CrossChainIncrementor__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CrossChainIncrementorInterface {
    return new utils.Interface(_abi) as CrossChainIncrementorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CrossChainIncrementor {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as CrossChainIncrementor;
  }
}
