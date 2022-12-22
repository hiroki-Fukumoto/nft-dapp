import todoContract from 'solidity/artifacts/contracts/todo.sol/todo.json'
import { Todo } from 'solidity/types/web3-v1-contracts/Todo'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import { Web3Factory } from '@/web3/index'

export type TodoContract = {
  task: string
}

export class TodoABI {
  web3Factory: Web3Factory
  contractAddress: string
  web3: Web3
  account: string
  contract: () => Todo

  constructor(address: string) {
    this.web3Factory = new Web3Factory()
    this.contractAddress = address
    this.web3 = this.web3Factory.getWeb3()
    this.account = this.web3.eth.defaultAccount as string
    this.contract = () => {
      return new this.web3.eth.Contract(todoContract.abi as AbiItem[], this.contractAddress) as unknown as Todo
    }
  }

  async getTodoIDs(): Promise<string[]> {
    const res = await this.contract()
      .methods.getTodo()
      .call({ from: this.account })
      .catch((e: Error) => {
        throw e
      })
    return res
  }

  async getTodo(id: string): Promise<TodoContract> {
    const res = await this.contract()
      .methods.todoList(id)
      .call({ from: this.account })
      .then((r) => {
        const todo: TodoContract = {
          task: r,
        }
        return todo
      })
      .catch((e: Error) => {
        throw e
      })

    return res
  }

  async createTask(task: string) {
    await this.contract()
      .methods.createTodo(task)
      .send({ from: this.account })
      .catch((e: Error) => {
        throw e
      })
  }
}
