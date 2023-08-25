/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Controller, ControllerInterface } from "../Controller";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "accountAssets",
    outputs: [
      {
        internalType: "contract CToken",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allMarkets",
    outputs: [
      {
        internalType: "contract CToken",
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
        internalType: "address",
        name: "cToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "borrowAmount",
        type: "uint256",
      },
    ],
    name: "borrowAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "borrowStable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "redeemAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "borrowAmount",
        type: "uint256",
      },
    ],
    name: "checkAccountliquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "shortfall",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
    ],
    name: "enterMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
    ],
    name: "exitMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getAccountMembership",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "marketLength",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "markets",
    outputs: [
      {
        internalType: "bool",
        name: "isListed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "collateralFactor",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
    ],
    name: "mintAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "redeemer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "redeemAmount",
        type: "uint256",
      },
    ],
    name: "redeemAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
    ],
    name: "repayAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "repayStable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "underlyingToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stableCoin",
        type: "address",
      },
    ],
    name: "setStableCoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cToken",
        type: "address",
      },
    ],
    name: "supportMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenPrices",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610d1a806100206000396000f3fe608060405234801561001057600080fd5b50600436106101155760003560e01c8063cab4f84c116100a2578063dd9098f411610071578063dd9098f414610328578063e802389514610358578063eabe7d9114610374578063ede4edd0146103a4578063fba1d37d146103c057610115565b8063cab4f84c14610290578063da3d454c146102ac578063dc8da752146102dc578063dce15449146102f857610115565b80633fe5d425116100e95780633fe5d425146101b357806352d84d1e146101cf5780638e8f294b146101ff57806395cde8b414610230578063a4b81ef11461026057610115565b8062e4768b1461011a57806309a8559214610136578063204120bc1461016757806323af4e1714610197575b600080fd5b610134600480360381019061012f919061088f565b6103de565b005b610150600480360381019061014b91906108cf565b610426565b60405161015e929190610945565b60405180910390f35b610181600480360381019061017c919061096e565b6105f7565b60405161018e919061099b565b60405180910390f35b6101b160048036038101906101ac919061096e565b61060f565b005b6101cd60048036038101906101c8919061096e565b610612565b005b6101e960048036038101906101e491906109b6565b610615565b6040516101f69190610a42565b60405180910390f35b6102196004803603810190610214919061096e565b610654565b604051610227929190610a78565b60405180910390f35b61024a6004803603810190610245919061096e565b610685565b6040516102579190610aa1565b60405180910390f35b61027a60048036038101906102759190610abc565b610690565b6040516102879190610aa1565b60405180910390f35b6102aa60048036038101906102a5919061096e565b610727565b005b6102c660048036038101906102c19190610afc565b61072a565b6040516102d39190610aa1565b60405180910390f35b6102f660048036038101906102f191906109b6565b610737565b005b610312600480360381019061030d919061088f565b61073a565b60405161031f9190610a42565b60405180910390f35b610342600480360381019061033d919061096e565b610788565b60405161034f9190610aa1565b60405180910390f35b610372600480360381019061036d91906109b6565b610793565b005b61038e60048036038101906103899190610afc565b610796565b60405161039b9190610aa1565b60405180910390f35b6103be60048036038101906103b9919061096e565b6107a3565b005b6103c86107ea565b6040516103d5919061099b565b60405180910390f35b80600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050565b6000806000806000600260008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054806020026020016040519081016040528092919081815260200182805480156104ed57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116104a3575b5050505050905060005b81518110156105b557600082828151811061051557610514610b4f565b5b6020026020010151905060008060008060006ec097ce7bc90715b34b9f10000000008284600160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101546105869190610bad565b6105909190610bad565b61059a9190610c36565b905050505050505080806105ad90610c67565b9150506104f7565b50818311156105d85781836105ca9190610cb0565b6000945094505050506105ee565b600083836105e69190610cb0565b945094505050505b94509492505050565b60036020528060005260406000206000915090505481565b50565b50565b6000818154811061062557600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016020528060005260406000206000915090508060000160009054906101000a900460ff16908060010154905082565b600060019050919050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b50565b6000600190509392505050565b50565b6002602052816000526040600020818154811061075657600080fd5b906000526020600020016000915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060019050919050565b50565b6000600190509392505050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090505050565b60008080549050905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610826826107fb565b9050919050565b6108368161081b565b811461084157600080fd5b50565b6000813590506108538161082d565b92915050565b6000819050919050565b61086c81610859565b811461087757600080fd5b50565b60008135905061088981610863565b92915050565b600080604083850312156108a6576108a56107f6565b5b60006108b485828601610844565b92505060206108c58582860161087a565b9150509250929050565b600080600080608085870312156108e9576108e86107f6565b5b60006108f787828801610844565b945050602061090887828801610844565b93505060406109198782880161087a565b925050606061092a8782880161087a565b91505092959194509250565b61093f81610859565b82525050565b600060408201905061095a6000830185610936565b6109676020830184610936565b9392505050565b600060208284031215610984576109836107f6565b5b600061099284828501610844565b91505092915050565b60006020820190506109b06000830184610936565b92915050565b6000602082840312156109cc576109cb6107f6565b5b60006109da8482850161087a565b91505092915050565b6000819050919050565b6000610a08610a036109fe846107fb565b6109e3565b6107fb565b9050919050565b6000610a1a826109ed565b9050919050565b6000610a2c82610a0f565b9050919050565b610a3c81610a21565b82525050565b6000602082019050610a576000830184610a33565b92915050565b60008115159050919050565b610a7281610a5d565b82525050565b6000604082019050610a8d6000830185610a69565b610a9a6020830184610936565b9392505050565b6000602082019050610ab66000830184610a69565b92915050565b60008060408385031215610ad357610ad26107f6565b5b6000610ae185828601610844565b9250506020610af285828601610844565b9150509250929050565b600080600060608486031215610b1557610b146107f6565b5b6000610b2386828701610844565b9350506020610b3486828701610844565b9250506040610b458682870161087a565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610bb882610859565b9150610bc383610859565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610bfc57610bfb610b7e565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610c4182610859565b9150610c4c83610859565b925082610c5c57610c5b610c07565b5b828204905092915050565b6000610c7282610859565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610ca557610ca4610b7e565b5b600182019050919050565b6000610cbb82610859565b9150610cc683610859565b925082821015610cd957610cd8610b7e565b5b82820390509291505056fea26469706673582212206798b703733df5c5a68fa9dde47302504a496b66f7be77292b1f6989cc27a03264736f6c63430008090033";

type ControllerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ControllerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Controller__factory extends ContractFactory {
  constructor(...args: ControllerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Controller> {
    return super.deploy(overrides || {}) as Promise<Controller>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Controller {
    return super.attach(address) as Controller;
  }
  override connect(signer: Signer): Controller__factory {
    return super.connect(signer) as Controller__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ControllerInterface {
    return new utils.Interface(_abi) as ControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Controller {
    return new Contract(address, _abi, signerOrProvider) as Controller;
  }
}
