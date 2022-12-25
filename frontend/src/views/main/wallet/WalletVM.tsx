import { useEffect, useState } from 'react'

import { Web3Factory } from '@/web3'

export const WalletVM = () => {
  const web3Factory = new Web3Factory()

  const [balance, setBalance] = useState('')

  const fetchBalance = async () => {
    return web3Factory
      .getDefaultAccount()
      .then((account) => {
        return web3Factory
          .getBalance(account)
          .then((balance) => {
            const b = Math.round(Number(balance) * Math.pow(10, 4)) / Math.pow(10, 4)
            setBalance(String(b))
          })
          .catch((e: Error) => {
            throw e
          })
      })
      .catch((e: Error) => {
        throw e
      })
  }

  const getBalance = () => {
    return balance
  }

  useEffect(() => {
    function init() {
      void fetchBalance()
    }
    void init()
  }, [])

  return {
    getBalance,
  }
}
