// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// NOTE: error -> Source "@openzeppelin/contracts/utils/math/SafeMath.sol" not found: File import callback not supported
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Product {
    address public owner;
    ProductStruct[] products;

    constructor() {
        owner = msg.sender;
    }

    // == struct ==
    struct ProductStruct {
        address seller;
        string name;
        string imageURL;
        string description;
        uint8 price;
        uint8 stock;
        bool isDeleted;
        uint timestamp;
    }

    struct CreateProductRequest {
        string name;
        string imageURL;
        string description;
        uint8 price;
        uint8 stock;
    }

    struct ProductResponse {
        uint id;
        string name;
        string imageURL;
        string description;
        uint8 price;
        uint8 stock;
        uint timestamp;
    }

    // == mapping ==
    mapping(uint => address) public productToOwner;
    mapping(address => uint) ownerProductCount;
    mapping(uint => bool) productExist;

    // == modifier ==
    modifier validateCreate(CreateProductRequest memory req) {
        require(bytes(req.name).length > 0, "name cannot be empty");
        require(
            bytes(req.description).length > 0,
            "description cannot be empty"
        );
        // TODO: URL check
        require(bytes(req.imageURL).length > 0, "image URL cannot be empty");
        require(req.price > 0, "price cannot be zero");
        require(req.stock > 0, "stock cannot be zero");
        _;
    }

    function getProductIDs() public view returns (uint[] memory) {
        if (ownerProductCount[msg.sender] == 0) {
            uint[] memory emptyArray = new uint[](0);
            return emptyArray;
        }

        uint[] memory result = new uint[](ownerProductCount[msg.sender]);
        uint counter = 0;

        for (uint i = 0; i < products.length; i++) {
            if (productToOwner[i] == msg.sender) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getProduct(uint id) public view returns (ProductResponse memory) {
        require(productExist[id], "Product not found");

        ProductStruct memory p = products[id];
        ProductResponse memory res = ProductResponse(
            id,
            p.name,
            p.imageURL,
            p.description,
            p.price,
            p.stock,
            p.timestamp
        );
        return res;
    }

    function createProduct(
        CreateProductRequest memory _req
    ) public validateCreate(_req) returns (uint) {
        products.push(
            ProductStruct(
                msg.sender,
                _req.name,
                _req.imageURL,
                _req.description,
                _req.price,
                _req.stock,
                false,
                block.timestamp
            )
        );

        uint id = products.length - 1;
        productExist[id] = true;
        productToOwner[id] = msg.sender;
        ownerProductCount[msg.sender]++;

        return id;
    }
}
