// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract User {
    address public owner;
    uint public fee;
    Account[] accounts;

    constructor(uint _fee) {
        owner = msg.sender;
        fee = _fee;
    }

    // == struct ==
    struct Account {
        address creater;
        string name;
        string bio;
        string email;
        string headerImageURL;
        string avatarImageURL;
        bool isDeleted;
        uint timestamp;
    }

    struct AccountStats {
        uint productCount;
        uint8 floorPrice;
        uint8 totalVolume;
    }

    struct CreateAccountRequest {
        string name;
        string bio;
        string email;
        string headerImageURL;
        string avatarImageURL;
    }

    struct UpdateAccountRequest {
        uint id;
        string name;
        string bio;
        string email;
        string headerImageURL;
        string avatarImageURL;
    }

    struct AccountResponse {
        uint id;
        string name;
        string bio;
        string headerImageURL;
        string avatarImageURL;
        uint8 floorPrice;
        uint8 totalVolume;
        uint timestamp;
    }

    struct MeResponse {
        uint id;
        string name;
        string bio;
        string email;
        string headerImageURL;
        string avatarImageURL;
        uint8 floorPrice;
        uint8 totalVolume;
        uint timestamp;
    }

    // == mapping ==
    mapping(uint => address) public ownerOf;
    mapping(uint => bool) accountExist;
    mapping(address => AccountStats) public statsOf;

    // == modifier ==
    modifier validateCreateAccount(CreateAccountRequest memory _req) {
        require(msg.value >= fee, "Insufficient fund");
        require(bytes(_req.name).length > 0, "name cannot be empty");
        require(bytes(_req.bio).length > 0, "bio cannot be empty");
        // TODO: email check
        require(bytes(_req.email).length > 0, "email cannot be empty");
        // TODO: URL check
        require(
            bytes(_req.headerImageURL).length > 0,
            "header image URL cannot be empty"
        );
        require(
            bytes(_req.avatarImageURL).length > 0,
            "avatar image URL cannot be empty"
        );

        bool existAccount;
        bool existName;
        for (uint i = 0; i < accounts.length; i++) {
            if (ownerOf[i] == msg.sender) {
                existAccount = true;
            }
            if (
                keccak256(bytes(accounts[i].name)) ==
                keccak256(bytes(_req.name))
            ) {
                existName = true;
            }
        }
        require(
            !existAccount,
            "This contract address is already has an account"
        );
        require(!existName, "This account name is already in use");
        _;
    }

    modifier validateUpdateAccount(UpdateAccountRequest memory _req) {
        require(
            accounts[_req.id].creater == msg.sender,
            "Unauthorize Personal"
        );
        require(accountExist[_req.id], "Account not found");
        require(bytes(_req.name).length > 0, "name cannot be empty");
        require(bytes(_req.bio).length > 0, "bio cannot be empty");
        // TODO: email check
        require(bytes(_req.email).length > 0, "email cannot be empty");
        // TODO: URL check
        require(
            bytes(_req.headerImageURL).length > 0,
            "header image URL cannot be empty"
        );
        require(
            bytes(_req.avatarImageURL).length > 0,
            "avatar image URL cannot be empty"
        );
        _;
    }

    // == method ==
    function createAccount(
        CreateAccountRequest memory _req
    ) public payable validateCreateAccount(_req) returns (bool) {
        Account memory account;
        account.creater = msg.sender;
        account.name = _req.name;
        account.bio = _req.bio;
        account.email = _req.email;
        account.headerImageURL = _req.headerImageURL;
        account.avatarImageURL = _req.avatarImageURL;
        account.timestamp = block.timestamp;
        accounts.push(account);

        statsOf[msg.sender].floorPrice = 0;
        statsOf[msg.sender].totalVolume = 0;

        uint id = accounts.length - 1;
        accountExist[id] = true;
        ownerOf[id] = msg.sender;

        return true;
    }

    function updateAccount(
        UpdateAccountRequest memory _req
    ) public validateUpdateAccount(_req) returns (bool) {
        Account memory account = accounts[_req.id];
        account.name = _req.name;
        account.bio = _req.bio;
        account.email = _req.email;
        account.headerImageURL = _req.headerImageURL;
        account.avatarImageURL = _req.avatarImageURL;
        accounts[_req.id] = account;

        return true;
    }

    function deleteAccount(uint _id) public returns (bool) {
        require(ownerOf[_id] == msg.sender, "Unauthorize Personal");
        require(accountExist[_id], "Account not found");

        Account memory a = accounts[_id];
        a.isDeleted = true;
        accounts[_id] = a;

        return true;
    }

    function getAccounts() public view returns (AccountResponse[] memory) {
        uint activeUsers = 0;
        for (uint i = 0; i < accounts.length; i++) {
            if (!accounts[i].isDeleted) {
                activeUsers += 1;
            }
        }
        AccountResponse[] memory results = new AccountResponse[](activeUsers);

        uint counter = 0;
        for (uint i = 0; i < accounts.length; i++) {
            if (!accounts[i].isDeleted) {
                Account memory account = accounts[i];
                AccountResponse memory a;
                a.id = i;
                a.name = account.name;
                a.bio = account.bio;
                a.headerImageURL = account.headerImageURL;
                a.avatarImageURL = account.avatarImageURL;
                a.floorPrice = statsOf[msg.sender].floorPrice;
                a.totalVolume = statsOf[msg.sender].totalVolume;
                a.timestamp = account.timestamp;
                results[counter] = a;
                counter++;
            }
        }

        return results;
    }

    function getAccount(uint _id) public view returns (AccountResponse memory) {
        require(accountExist[_id], "Account not found");

        Account memory a = accounts[_id];
        require(!a.isDeleted, "Account has been deleted");

        AccountResponse memory res;
        res.id = _id;
        res.name = a.name;
        res.bio = a.bio;
        res.headerImageURL = a.headerImageURL;
        res.avatarImageURL = a.avatarImageURL;
        res.floorPrice = statsOf[msg.sender].floorPrice;
        res.totalVolume = statsOf[msg.sender].totalVolume;
        res.timestamp = a.timestamp;

        return res;
    }

    function getMe() public view returns (MeResponse memory) {
        bool existAccount;
        uint id;
        for (uint i = 0; i < accounts.length; i++) {
            if (ownerOf[i] == msg.sender) {
                existAccount = true;
                id = i;
            }
        }

        require(existAccount, "Account not found");

        Account memory a = accounts[id];
        require(!a.isDeleted, "Account has been deleted");

        MeResponse memory res;
        res.id = id;
        res.name = a.name;
        res.bio = a.bio;
        res.email = a.email;
        res.headerImageURL = a.headerImageURL;
        res.avatarImageURL = a.avatarImageURL;
        res.floorPrice = statsOf[msg.sender].floorPrice;
        res.totalVolume = statsOf[msg.sender].totalVolume;
        res.timestamp = a.timestamp;

        return res;
    }
}
