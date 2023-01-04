// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract ProductStats {
    struct ProductStatsStruct {
        uint productCount;
        uint8 floorPrice;
        uint8 totalVolume;
    }

    // == mapping ==
    mapping(address => ProductStatsStruct) public productStatsOf;
}
