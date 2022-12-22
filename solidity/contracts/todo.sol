// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract todo {
  struct Todo {
    string task;
  }

  Todo[] public todoList;

  mapping(uint => address) public todoToOwner;
  mapping(address => uint) todoCountByOwner;

  modifier onlyMine(uint id) {
    require(todoToOwner[id] == msg.sender);
    _;
  }

  function getTodo() external view returns (uint[] memory) {
    if (todoCountByOwner[msg.sender] == 0) {
      uint[] memory emptyArray = new uint[](0);
      return emptyArray;
    }

    uint[] memory result = new uint[](todoCountByOwner[msg.sender]);
    uint counter = 0;

    for (uint i = 0; i < todoList.length; i++) {
      if (todoToOwner[i] == msg.sender) {
        result[counter] = i;
        counter++;
      }
    }

    return result;
  }

  function createTodo(string memory _task) public returns (uint) {
    todoList.push(Todo(_task));
    uint id = todoList.length - 1;
    todoToOwner[id] = msg.sender;
    todoCountByOwner[msg.sender]++;

    return id;
  }
}
