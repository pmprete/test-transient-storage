# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

# Deploy to nexera

```shell
npx hardhat ignition deploy ./ignition/modules/TestTransientStorage.ts --network nexera
```

# Test

Copy the deploy addresss in [/tasks/testTransientStorage.ts](./tasks/testTransientStorage.ts) then run

```shell
npx hardhat transient  --network nexera
```