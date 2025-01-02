// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/StorageSlot.sol";
import "@openzeppelin/contracts/utils/TransientSlot.sol";

interface StoredValue {
    enum TestMode {
        STORAGE,
        STORAGE_SLOT,
        TRANSIENT_SLOT
    }

   function read(TestMode testMode) external returns(uint256);
}

contract Reader {
    address creator;

    constructor() {
        creator = msg.sender;
    }

    function readFromCreator(StoredValue.TestMode testMode) public returns(uint256) {
        return StoredValue(creator).read(testMode);
    }
}



contract TestTransientStorage is StoredValue{
    using TransientSlot for *;

    bytes32 internal constant _SLOT = keccak256("TestTransientStorage");

    event ValueStored(uint256 value);

    error ValueDoesNotMatch(uint256 found, uint256 expected);

    Reader public executor;

    uint256 public storageValue;

    constructor() {
        executor = new Reader();
    }

    function read(TestMode testMode) public view returns(uint256){
        if(testMode == TestMode.TRANSIENT_SLOT) {
            return _SLOT.asUint256().tload();
        } else if(testMode == TestMode.STORAGE_SLOT) {
            return StorageSlot.getUint256Slot(_SLOT).value;
        } else {
            return storageValue;
        }
    }

    function readTransientValue() public view returns(uint256) {
        return read(TestMode.TRANSIENT_SLOT);
    }

    function testTransientSlot() external {
        uint256 value = _value();
        _SLOT.asUint256().tstore(value);
        emit ValueStored(value);


        uint256 readed = executor.readFromCreator(TestMode.TRANSIENT_SLOT);
        //_SLOT.asUint256().tstore(0); // Skip this for test so that we can verify value is not stored with readTransientValue()
        if(readed != value) revert ValueDoesNotMatch(readed, value);

    }

    function testStorageSlot() external {
        uint256 value = _value();
        StorageSlot.getUint256Slot(_SLOT).value = value;
        emit ValueStored(value);

        uint256 readed = executor.readFromCreator(TestMode.STORAGE_SLOT);
        StorageSlot.getUint256Slot(_SLOT).value = 0;
        if(readed != value) revert ValueDoesNotMatch(readed, value);
    }


    function testStorage() external {
        uint256 value = _value();
        storageValue = value;
        emit ValueStored(value);

        uint256 readed = executor.readFromCreator(TestMode.STORAGE);
        if(readed != value) revert ValueDoesNotMatch(readed, value);
    }

    function _value() internal view returns(uint256) {
        return block.timestamp;
    }

    function callShaAndRip() external pure returns(bytes32) {
        bytes memory value = hex"1234567890";
        bytes32 hashed = sha256(value);

        return ripemd160(abi.encodePacked(hashed));
    }

    function callBlake2F(uint32 rounds, bytes32[2] memory h, bytes32[4] memory m, bytes8[2] memory t, bool f) public view returns (bytes32[2] memory) {
        bytes32[2] memory output;
        bytes memory args = abi.encodePacked(rounds, h[0], h[1], m[0], m[1], m[2], m[3], t[0], t[1], f);

        assembly {
            if iszero(staticcall(not(0), 0x09, add(args, 32), 0xd5, output, 0x40)) {
                revert(0, 0)
            }
        }

        return output;
    }

}
