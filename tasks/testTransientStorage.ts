import { task } from "hardhat/config";

export default task("transient", "Prints an account's balance").setAction(async (taskArgs, hre) => {
    console.log('TestTransientStorage')
    const deployAddr = "0x3e2AabB763F255CbB6a322DBe532192e120B5C6B";
    const TestTransientStorage = await hre.ethers.getContractAt("TestTransientStorage", deployAddr);
    const testStorage = await TestTransientStorage.testStorage();
    console.log('testStorage', testStorage)
    const testStorageSlot = await TestTransientStorage.testStorageSlot();
    console.log('testStorageSlot', testStorageSlot)
    const testTransientSlot = await TestTransientStorage.testTransientSlot();
    console.log('testTransientSlot', testTransientSlot)
});
