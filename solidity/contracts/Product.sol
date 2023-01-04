// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./ProductStats.sol";

contract Product is ProductStats {
    address public owner;
    uint public fee;
    ProductStruct[] products;

    constructor(uint _fee) {
        owner = msg.sender;
        fee = _fee;
    }

    // == struct ==
    struct ProductStruct {
        address seller;
        string name;
        string imageURL;
        string description;
        uint8 price;
        bool isDeleted;
        uint timestamp;
    }

    struct CreateProductRequest {
        string name;
        string imageURL;
        string description;
        uint8 price;
    }

    struct UpdateProductRequest {
        uint id;
        string name;
        string imageURL;
        string description;
        uint8 price;
    }

    struct ProductResponse {
        uint id;
        string name;
        string imageURL;
        string description;
        uint8 price;
        uint timestamp;
    }

    // == mapping ==
    mapping(uint => address) public ownerOf;
    mapping(uint => bool) productExist;

    // == modifier ==
    modifier validateCreate(CreateProductRequest memory _req) {
        require(msg.value >= fee, "Insufficient fund");
        require(bytes(_req.name).length > 0, "name cannot be empty");
        require(
            bytes(_req.description).length > 0,
            "description cannot be empty"
        );
        // TODO: URL check
        require(bytes(_req.imageURL).length > 0, "image URL cannot be empty");
        require(_req.price > 0, "price cannot be zero");
        _;
    }

    modifier validateUpdate(UpdateProductRequest memory _req) {
        require(products[_req.id].seller == msg.sender, "Unauthorize Personal");
        require(bytes(_req.name).length > 0, "name cannot be empty");
        require(
            bytes(_req.description).length > 0,
            "description cannot be empty"
        );
        // TODO: URL check
        require(bytes(_req.imageURL).length > 0, "image URL cannot be empty");
        require(_req.price > 0, "price cannot be zero");
        _;
    }

    // == method ==
    function getProducts() public view returns (ProductResponse[] memory) {
        uint activeProducts = 0;
        for (uint i = 0; i < products.length; i++) {
            if (!products[i].isDeleted) {
                activeProducts += 1;
            }
        }
        ProductResponse[] memory results = new ProductResponse[](
            activeProducts
        );

        uint counter = 0;
        for (uint i = 0; i < products.length; i++) {
            if (!products[i].isDeleted) {
                ProductStruct memory product = products[i];
                ProductResponse memory p = _parseProductResponse(i, product);
                results[counter] = p;
                counter++;
            }
        }

        return results;
    }

    function getMyProducts() public view returns (ProductResponse[] memory) {
        uint activeProducts = 0;
        for (uint i = 0; i < products.length; i++) {
            if (products[i].seller == msg.sender && !products[i].isDeleted) {
                activeProducts += 1;
            }
        }
        ProductResponse[] memory results = new ProductResponse[](
            activeProducts
        );

        uint counter = 0;
        for (uint i = 0; i < products.length; i++) {
            if (products[i].seller == msg.sender && !products[i].isDeleted) {
                ProductStruct memory product = products[i];
                ProductResponse memory p = _parseProductResponse(i, product);
                results[counter] = p;
                counter++;
            }
        }

        return results;
    }

    function getProduct(uint _id) public view returns (ProductResponse memory) {
        require(productExist[_id], "Product not found");

        ProductStruct memory p = products[_id];
        require(!p.isDeleted, "Product has been deleted");

        ProductResponse memory res = _parseProductResponse(_id, p);

        return res;
    }

    function createProduct(
        CreateProductRequest memory _req
    ) public payable validateCreate(_req) returns (bool) {
        ProductStruct memory product;
        product.seller = msg.sender;
        product.name = _req.name;
        product.imageURL = _req.imageURL;
        product.description = _req.description;
        product.price = _req.price;
        product.isDeleted = false;
        product.timestamp = block.timestamp;
        products.push(product);

        uint id = products.length - 1;
        productExist[id] = true;
        ownerOf[id] = msg.sender;

        productStatsOf[msg.sender].productCount++;
        if (productStatsOf[msg.sender].floorPrice > _req.price) {
            productStatsOf[msg.sender].floorPrice = _req.price;
        }
        productStatsOf[msg.sender].totalVolume =
            productStatsOf[msg.sender].totalVolume +
            _req.price;

        return true;
    }

    function updateProduct(
        UpdateProductRequest memory _req
    ) public validateUpdate(_req) returns (bool) {
        ProductStruct memory product;
        product.name = _req.name;
        product.imageURL = _req.imageURL;
        product.description = _req.description;
        product.price = _req.price;
        products[_req.id] = product;

        if (productStatsOf[msg.sender].floorPrice > _req.price) {
            productStatsOf[msg.sender].floorPrice = _req.price;
        }
        productStatsOf[msg.sender].totalVolume =
            productStatsOf[msg.sender].totalVolume +
            _req.price -
            product.price;

        return true;
    }

    function deleteProduct(uint _id) public returns (bool) {
        require(ownerOf[_id] == msg.sender, "Unauthorize Personal");
        require(productExist[_id], "Product has been deleted");

        ProductStruct memory product = products[_id];
        product.isDeleted = true;
        products[_id] = product;

        return true;
    }

    function _parseProductResponse(
        uint _id,
        ProductStruct memory _product
    ) private pure returns (ProductResponse memory) {
        ProductResponse memory p;

        p.id = _id;
        p.name = _product.name;
        p.imageURL = _product.imageURL;
        p.description = _product.description;
        p.price = _product.price;
        p.timestamp = _product.timestamp;

        return p;
    }
}
