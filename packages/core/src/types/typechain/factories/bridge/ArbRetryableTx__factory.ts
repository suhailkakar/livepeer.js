/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ArbRetryableTx,
  ArbRetryableTxInterface,
} from "../../bridge/ArbRetryableTx";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "ticketId",
        type: "bytes32",
      },
    ],
    name: "Canceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "ticketId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newTimeout",
        type: "uint256",
      },
    ],
    name: "LifetimeExtended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "ticketId",
        type: "bytes32",
      },
    ],
    name: "Redeemed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "ticketId",
        type: "bytes32",
      },
    ],
    name: "TicketCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ticketId",
        type: "bytes32",
      },
    ],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ticketId",
        type: "bytes32",
      },
    ],
    name: "getBeneficiary",
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
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ticketId",
        type: "bytes32",
      },
    ],
    name: "getKeepalivePrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
    name: "getLifetime",
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
        name: "calldataSize",
        type: "uint256",
      },
    ],
    name: "getSubmissionPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
        internalType: "bytes32",
        name: "ticketId",
        type: "bytes32",
      },
    ],
    name: "getTimeout",
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
        internalType: "bytes32",
        name: "ticketId",
        type: "bytes32",
      },
    ],
    name: "keepalive",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "txId",
        type: "bytes32",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ArbRetryableTx__factory {
  static readonly abi = _abi;
  static createInterface(): ArbRetryableTxInterface {
    return new utils.Interface(_abi) as ArbRetryableTxInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArbRetryableTx {
    return new Contract(address, _abi, signerOrProvider) as ArbRetryableTx;
  }
}
