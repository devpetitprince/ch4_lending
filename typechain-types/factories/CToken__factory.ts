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
import type { PromiseOrValue } from "../common";
import type { CToken, CTokenInterface } from "../CToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_underlying",
        type: "address",
      },
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimal_",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "accountBorrow",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "borrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "controller",
    outputs: [
      {
        internalType: "contract Controller",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCash",
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
    name: "getExchangeRate",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    name: "pourInterest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "redeemAmount",
        type: "uint256",
      },
    ],
    name: "redeemUnderlying",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "repay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
    ],
    name: "setController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBorrow",
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
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "underlyingToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620030c0380380620030c0833981810160405281019062000037919062000401565b84600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260049080519060200190620000d192919062000111565b508160059080519060200190620000ea92919062000111565b5080600360006101000a81548160ff021916908360ff16021790555050505050506200052c565b8280546200011f90620004f6565b90600052602060002090601f0160209004810192826200014357600085556200018f565b82601f106200015e57805160ff19168380011785556200018f565b828001600101855582156200018f579182015b828111156200018e57825182559160200191906001019062000171565b5b5090506200019e9190620001a2565b5090565b5b80821115620001bd576000816000905550600101620001a3565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200020282620001d5565b9050919050565b6200021481620001f5565b81146200022057600080fd5b50565b600081519050620002348162000209565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200028f8262000244565b810181811067ffffffffffffffff82111715620002b157620002b062000255565b5b80604052505050565b6000620002c6620001c1565b9050620002d4828262000284565b919050565b600067ffffffffffffffff821115620002f757620002f662000255565b5b620003028262000244565b9050602081019050919050565b60005b838110156200032f57808201518184015260208101905062000312565b838111156200033f576000848401525b50505050565b60006200035c6200035684620002d9565b620002ba565b9050828152602081018484840111156200037b576200037a6200023f565b5b620003888482856200030f565b509392505050565b600082601f830112620003a857620003a76200023a565b5b8151620003ba84826020860162000345565b91505092915050565b600060ff82169050919050565b620003db81620003c3565b8114620003e757600080fd5b50565b600081519050620003fb81620003d0565b92915050565b600080600080600060a0868803121562000420576200041f620001cb565b5b6000620004308882890162000223565b9550506020620004438882890162000223565b945050604086015167ffffffffffffffff811115620004675762000466620001d0565b5b620004758882890162000390565b935050606086015167ffffffffffffffff811115620004995762000498620001d0565b5b620004a78882890162000390565b9250506080620004ba88828901620003ea565b9150509295509295909350565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200050f57607f821691505b60208210811415620005265762000525620004c7565b5b50919050565b612b84806200053c6000396000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c806392eefe9b116100c3578063c5ebeaec1161007c578063c5ebeaec146103ef578063db006a751461040b578063dd62ed3e14610427578063de94ea0014610457578063e6aa216c14610473578063f77c47911461049157610158565b806392eefe9b1461030957806395d89b4114610325578063a0712d6814610343578063a12b7dc71461035f578063a457c2d71461038f578063a9059cbb146103bf57610158565b8063371fd8e611610115578063371fd8e61461023557806339509351146102515780633b1d21a21461028157806370a082311461029f5780638285ef40146102cf578063852a12e3146102ed57610158565b806306fdde031461015d578063095ea7b31461017b57806318160ddd146101ab57806323b872dd146101c95780632495a599146101f9578063313ce56714610217575b600080fd5b6101656104af565b6040516101729190611d00565b60405180910390f35b61019560048036038101906101909190611dbb565b610541565b6040516101a29190611e16565b60405180910390f35b6101b3610564565b6040516101c09190611e40565b60405180910390f35b6101e360048036038101906101de9190611e5b565b61056e565b6040516101f09190611e16565b60405180910390f35b61020161059d565b60405161020e9190611ebd565b60405180910390f35b61021f6105c3565b60405161022c9190611ef4565b60405180910390f35b61024f600480360381019061024a9190611f0f565b6105da565b005b61026b60048036038101906102669190611dbb565b61085b565b6040516102789190611e16565b60405180910390f35b610289610892565b6040516102969190611e40565b60405180910390f35b6102b960048036038101906102b49190611f3c565b610944565b6040516102c69190611e40565b60405180910390f35b6102d761098c565b6040516102e49190611e40565b60405180910390f35b61030760048036038101906103029190611f0f565b610992565b005b610323600480360381019061031e9190611f3c565b610b6e565b005b61032d610bb2565b60405161033a9190611d00565b60405180910390f35b61035d60048036038101906103589190611f0f565b610c44565b005b61037960048036038101906103749190611f3c565b610d6c565b6040516103869190611e40565b60405180910390f35b6103a960048036038101906103a49190611dbb565b610d84565b6040516103b69190611e16565b60405180910390f35b6103d960048036038101906103d49190611dbb565b610dfb565b6040516103e69190611e16565b60405180910390f35b61040960048036038101906104049190611f0f565b610e1e565b005b61042560048036038101906104209190611f0f565b611078565b005b610441600480360381019061043c9190611f69565b61129e565b60405161044e9190611e40565b60405180910390f35b610471600480360381019061046c9190611f0f565b611325565b005b61047b6113da565b6040516104889190611e40565b60405180910390f35b61049961143b565b6040516104a69190612008565b60405180910390f35b6060600480546104be90612052565b80601f01602080910402602001604051908101604052809291908181526020018280546104ea90612052565b80156105375780601f1061050c57610100808354040283529160200191610537565b820191906000526020600020905b81548152906001019060200180831161051a57829003601f168201915b5050505050905090565b60008061054c611461565b9050610559818585611469565b600191505092915050565b6000600254905090565b600080610579611461565b9050610586858285611634565b6105918585856116c0565b60019150509392505050565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360009054906101000a900460ff16905090565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd9098f4306040518263ffffffff1660e01b81526004016106359190611ebd565b60206040518083038186803b15801561064d57600080fd5b505afa158015610661573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061068591906120b0565b6106c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106bb90612129565b60405180910390fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82146106f35781610734565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020545b9050600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b815260040161079593929190612149565b602060405180830381600087803b1580156107af57600080fd5b505af11580156107c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e791906120b0565b5080600660008282546107fa91906121af565b9250508190555080600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461085091906121af565b925050819055505050565b600080610866611461565b9050610887818585610878858961129e565b61088291906121e3565b611469565b600191505092915050565b6000600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016108ef9190611ebd565b60206040518083038186803b15801561090757600080fd5b505afa15801561091b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093f919061224e565b905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60065481565b600061099c6113da565b9050600081670de0b6b3a7640000846109b5919061227b565b6109bf9190612304565b9050600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663eabe7d913033846040518463ffffffff1660e01b8152600401610a2093929190612149565b60206040518083038186803b158015610a3857600080fd5b505afa158015610a4c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a7091906120b0565b610aaf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aa690612381565b60405180910390fd5b610ab93382611938565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33856040518363ffffffff1660e01b8152600401610b169291906123a1565b602060405180830381600087803b158015610b3057600080fd5b505af1158015610b44573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b6891906120b0565b50505050565b80600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b606060058054610bc190612052565b80601f0160208091040260200160405190810160405280929190818152602001828054610bed90612052565b8015610c3a5780601f10610c0f57610100808354040283529160200191610c3a565b820191906000526020600020905b815481529060010190602001808311610c1d57829003601f168201915b5050505050905090565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166395cde8b4306040518263ffffffff1660e01b8152600401610c9f9190611ebd565b60206040518083038186803b158015610cb757600080fd5b505afa158015610ccb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cef91906120b0565b610d2e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d2590612416565b60405180910390fd5b6000610d386113da565b9050600081670de0b6b3a764000084610d51919061227b565b610d5b9190612304565b9050610d673382611b06565b505050565b60076020528060005260406000206000915090505481565b600080610d8f611461565b90506000610d9d828661129e565b905083811015610de2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dd9906124a8565b60405180910390fd5b610def8286868403611469565b60019250505092915050565b600080610e06611461565b9050610e138185856116c0565b600191505092915050565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663da3d454c3033846040518463ffffffff1660e01b8152600401610e7d93929190612149565b60206040518083038186803b158015610e9557600080fd5b505afa158015610ea9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ecd91906120b0565b610f0c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f0390612514565b60405180910390fd5b80610f15610892565b1015610f56576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4d90612580565b60405180910390fd5b8060066000828254610f6891906121e3565b9250508190555080600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610fbe91906121e3565b92505081905550600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016110229291906123a1565b602060405180830381600087803b15801561103c57600080fd5b505af1158015611050573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061107491906120b0565b5050565b60006110826113da565b90506000670de0b6b3a7640000828461109b919061227b565b6110a59190612304565b9050600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663eabe7d913033866040518463ffffffff1660e01b815260040161110693929190612149565b60206040518083038186803b15801561111e57600080fd5b505afa158015611132573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061115691906120b0565b611195576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161118c906125ec565b60405180910390fd5b8061119e610892565b10156111df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111d690612658565b60405180910390fd5b6111e93384611938565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016112469291906123a1565b602060405180830381600087803b15801561126057600080fd5b505af1158015611274573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061129891906120b0565b50505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b815260040161138493929190612149565b602060405180830381600087803b15801561139e57600080fd5b505af11580156113b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113d691906120b0565b5050565b6000806113e5610564565b9050600081141561140157670de0b6b3a7640000915050611438565b80670de0b6b3a7640000600654611416610892565b61142091906121e3565b61142a919061227b565b6114349190612304565b9150505b90565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156114d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114d0906126ea565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611549576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115409061277c565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516116279190611e40565b60405180910390a3505050565b6000611640848461129e565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146116ba57818110156116ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116a3906127e8565b60405180910390fd5b6116b98484848403611469565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611730576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117279061287a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156117a0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117979061290c565b60405180910390fd5b6117ab838383611c5d565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611831576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118289061299e565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161191f9190611e40565b60405180910390a3611932848484611c62565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156119a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161199f90612a30565b60405180910390fd5b6119b482600083611c5d565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611a3a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a3190612ac2565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051611aed9190611e40565b60405180910390a3611b0183600084611c62565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611b76576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b6d90612b2e565b60405180910390fd5b611b8260008383611c5d565b8060026000828254611b9491906121e3565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051611c459190611e40565b60405180910390a3611c5960008383611c62565b5050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611ca1578082015181840152602081019050611c86565b83811115611cb0576000848401525b50505050565b6000601f19601f8301169050919050565b6000611cd282611c67565b611cdc8185611c72565b9350611cec818560208601611c83565b611cf581611cb6565b840191505092915050565b60006020820190508181036000830152611d1a8184611cc7565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611d5282611d27565b9050919050565b611d6281611d47565b8114611d6d57600080fd5b50565b600081359050611d7f81611d59565b92915050565b6000819050919050565b611d9881611d85565b8114611da357600080fd5b50565b600081359050611db581611d8f565b92915050565b60008060408385031215611dd257611dd1611d22565b5b6000611de085828601611d70565b9250506020611df185828601611da6565b9150509250929050565b60008115159050919050565b611e1081611dfb565b82525050565b6000602082019050611e2b6000830184611e07565b92915050565b611e3a81611d85565b82525050565b6000602082019050611e556000830184611e31565b92915050565b600080600060608486031215611e7457611e73611d22565b5b6000611e8286828701611d70565b9350506020611e9386828701611d70565b9250506040611ea486828701611da6565b9150509250925092565b611eb781611d47565b82525050565b6000602082019050611ed26000830184611eae565b92915050565b600060ff82169050919050565b611eee81611ed8565b82525050565b6000602082019050611f096000830184611ee5565b92915050565b600060208284031215611f2557611f24611d22565b5b6000611f3384828501611da6565b91505092915050565b600060208284031215611f5257611f51611d22565b5b6000611f6084828501611d70565b91505092915050565b60008060408385031215611f8057611f7f611d22565b5b6000611f8e85828601611d70565b9250506020611f9f85828601611d70565b9150509250929050565b6000819050919050565b6000611fce611fc9611fc484611d27565b611fa9565b611d27565b9050919050565b6000611fe082611fb3565b9050919050565b6000611ff282611fd5565b9050919050565b61200281611fe7565b82525050565b600060208201905061201d6000830184611ff9565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061206a57607f821691505b6020821081141561207e5761207d612023565b5b50919050565b61208d81611dfb565b811461209857600080fd5b50565b6000815190506120aa81612084565b92915050565b6000602082840312156120c6576120c5611d22565b5b60006120d48482850161209b565b91505092915050565b7f217265706179416c6c6f77656400000000000000000000000000000000000000600082015250565b6000612113600d83611c72565b915061211e826120dd565b602082019050919050565b6000602082019050818103600083015261214281612106565b9050919050565b600060608201905061215e6000830186611eae565b61216b6020830185611eae565b6121786040830184611e31565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006121ba82611d85565b91506121c583611d85565b9250828210156121d8576121d7612180565b5b828203905092915050565b60006121ee82611d85565b91506121f983611d85565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561222e5761222d612180565b5b828201905092915050565b60008151905061224881611d8f565b92915050565b60006020828403121561226457612263611d22565b5b600061227284828501612239565b91505092915050565b600061228682611d85565b915061229183611d85565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156122ca576122c9612180565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061230f82611d85565b915061231a83611d85565b92508261232a576123296122d5565b5b828204905092915050565b7f2172656465656d416c6c6f776564000000000000000000000000000000000000600082015250565b600061236b600e83611c72565b915061237682612335565b602082019050919050565b6000602082019050818103600083015261239a8161235e565b9050919050565b60006040820190506123b66000830185611eae565b6123c36020830184611e31565b9392505050565b7f216d696e74416c6c6f7765640000000000000000000000000000000000000000600082015250565b6000612400600c83611c72565b915061240b826123ca565b602082019050919050565b6000602082019050818103600083015261242f816123f3565b9050919050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000612492602583611c72565b915061249d82612436565b604082019050919050565b600060208201905081810360008301526124c181612485565b9050919050565b7f21626f72726f77416c6c6f776564000000000000000000000000000000000000600082015250565b60006124fe600e83611c72565b9150612509826124c8565b602082019050919050565b6000602082019050818103600083015261252d816124f1565b9050919050565b7f4c69717569646974790000000000000000000000000000000000000000000000600082015250565b600061256a600983611c72565b915061257582612534565b602082019050919050565b600060208201905081810360008301526125998161255d565b9050919050565b7f2172656465656d416c6c77656400000000000000000000000000000000000000600082015250565b60006125d6600d83611c72565b91506125e1826125a0565b602082019050919050565b60006020820190508181036000830152612605816125c9565b9050919050565b7f214c697175696469747900000000000000000000000000000000000000000000600082015250565b6000612642600a83611c72565b915061264d8261260c565b602082019050919050565b6000602082019050818103600083015261267181612635565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006126d4602483611c72565b91506126df82612678565b604082019050919050565b60006020820190508181036000830152612703816126c7565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000612766602283611c72565b91506127718261270a565b604082019050919050565b6000602082019050818103600083015261279581612759565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b60006127d2601d83611c72565b91506127dd8261279c565b602082019050919050565b60006020820190508181036000830152612801816127c5565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000612864602583611c72565b915061286f82612808565b604082019050919050565b6000602082019050818103600083015261289381612857565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b60006128f6602383611c72565b91506129018261289a565b604082019050919050565b60006020820190508181036000830152612925816128e9565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b6000612988602683611c72565b91506129938261292c565b604082019050919050565b600060208201905081810360008301526129b78161297b565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000612a1a602183611c72565b9150612a25826129be565b604082019050919050565b60006020820190508181036000830152612a4981612a0d565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b6000612aac602283611c72565b9150612ab782612a50565b604082019050919050565b60006020820190508181036000830152612adb81612a9f565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000612b18601f83611c72565b9150612b2382612ae2565b602082019050919050565b60006020820190508181036000830152612b4781612b0b565b905091905056fea2646970667358221220d5cc3cd4748a8e91730073dde81f0c10c4c9c636adfb3b3ce076bed3bd3276ce64736f6c63430008090033";

type CTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CToken__factory extends ContractFactory {
  constructor(...args: CTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _controller: PromiseOrValue<string>,
    _underlying: PromiseOrValue<string>,
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    decimal_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CToken> {
    return super.deploy(
      _controller,
      _underlying,
      name_,
      symbol_,
      decimal_,
      overrides || {}
    ) as Promise<CToken>;
  }
  override getDeployTransaction(
    _controller: PromiseOrValue<string>,
    _underlying: PromiseOrValue<string>,
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    decimal_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _controller,
      _underlying,
      name_,
      symbol_,
      decimal_,
      overrides || {}
    );
  }
  override attach(address: string): CToken {
    return super.attach(address) as CToken;
  }
  override connect(signer: Signer): CToken__factory {
    return super.connect(signer) as CToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CTokenInterface {
    return new utils.Interface(_abi) as CTokenInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): CToken {
    return new Contract(address, _abi, signerOrProvider) as CToken;
  }
}
