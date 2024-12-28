// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const TestTransientStorageModule = buildModule("TestTransientStorageModule", (m) => {

  const testTransientStorage = m.contract("TestTransientStorage");

  return { testTransientStorage };
});

export default TestTransientStorageModule;
