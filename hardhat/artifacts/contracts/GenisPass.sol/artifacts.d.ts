// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { GenisPass$Type } from "./GenisPass";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["GenisPass"]: GenisPass$Type;
    ["contracts/GenisPass.sol:GenisPass"]: GenisPass$Type;
  }

  interface ContractTypesMap {
    ["GenisPass"]: GetContractReturnType<GenisPass$Type["abi"]>;
    ["contracts/GenisPass.sol:GenisPass"]: GetContractReturnType<GenisPass$Type["abi"]>;
  }
}
