// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface Address$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "Address",
  "sourceName": "@openzeppelin/contracts/utils/Address.sol",
  "abi": [],
  "bytecode": "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212203e702b6dbb6c9d1a5511f283037dc8ee2d21a1bdeaf53eee47decb906aa0839264736f6c634300081b0033",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212203e702b6dbb6c9d1a5511f283037dc8ee2d21a1bdeaf53eee47decb906aa0839264736f6c634300081b0033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "Address",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Address$Type["abi"]>>;
  export function deployContract(
    contractName: "@openzeppelin/contracts/utils/Address.sol:Address",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Address$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "Address",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Address$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "@openzeppelin/contracts/utils/Address.sol:Address",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Address$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "Address",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Address$Type["abi"]>>;
  export function getContractAt(
    contractName: "@openzeppelin/contracts/utils/Address.sol:Address",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Address$Type["abi"]>>;
}
