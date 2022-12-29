import userContract from 'solidity/artifacts/contracts/User.sol/User.json'
import { User as TUser } from 'solidity/types/web3-v1-contracts/User'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import { CreateAccountRequest, AccountResponse, MeResponse } from '@/contracts/user/types'
import { Web3Factory } from '@/web3/index'

export class UserABI {
  web3Factory: Web3Factory
  contractAddress: string
  web3: Web3
  account: string
  contract: () => TUser

  constructor(address: string) {
    this.web3Factory = new Web3Factory()
    this.contractAddress = address
    this.web3 = this.web3Factory.getWeb3()
    this.account = this.web3.eth.defaultAccount as string
    this.contract = () => {
      return new this.web3.eth.Contract(userContract.abi as AbiItem[], this.contractAddress) as unknown as TUser
    }
  }

  async createAccount(req: CreateAccountRequest) {
    if (!this.account) {
      await this.web3Factory.getDefaultAccount().then((res) => {
        this.account = res
      })
    }

    const fee = this.web3.utils.toWei('0.002', 'ether')

    return this.contract()
      .methods.createAccount([req.name, req.bio, req.email, req.header_image_url, req.avatar_image_url])
      .send({ from: this.account, value: fee })
      .catch((e: Error) => {
        throw e
      })
  }

  getMe(): Promise<MeResponse> {
    return this.contract()
      .methods.getMe()
      .call({ from: this.account })
      .then((res) => {
        const m: MeResponse = {
          id: res[0],
          name: res[1],
          bio: res[2],
          email: res[3],
          header_image_url: res[4],
          avatar_image_url: res[5],
          floor_price: Number(res[6]),
          total_volume: Number(res[7]),
          timestamp: res[8],
        }
        return m
      })
  }

  async getAccounts(): Promise<AccountResponse[]> {
    return await this.contract()
      .methods.getAccounts()
      .call({ from: this.account })
      .then((res) => {
        const accounts: AccountResponse[] = []
        res.forEach((r) => {
          const a: AccountResponse = {
            id: r[0],
            name: r[1],
            bio: r[2],
            header_image_url: r[3],
            avatar_image_url: r[4],
            floor_price: Number(r[5]),
            total_volume: Number(r[6]),
            timestamp: r[7],
          }
          accounts.push(a)
        })
        return accounts
      })
      .catch((e: Error) => {
        throw e
      })
  }
}
