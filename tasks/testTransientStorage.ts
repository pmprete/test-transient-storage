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
    const callShaAndRip = await TestTransientStorage.callShaAndRip();
    console.log('callShaAndRip', callShaAndRip)
    const callBlake2F = await TestTransientStorage.callBlake2F(
        12,
        [
            "0x48c9bdf267e6096a3ba7ca8485ae67bb2bf894fe72f36e3cf1361d5f3af54fa5",
            "0xd182e6ad7f520e511f6c3e2b8c68059b6bbd41fbabd9831f79217e1319cde05b"
        ],
        [
            "0x6162630000000000000000000000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
        ],
        [
            "0x0300000000000000",
            "0x0000000000000000",
        ],
        true
     );
    console.log('callBlake2F', callBlake2F)
});