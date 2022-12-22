import { useEffect, useState } from 'react'

import { Web3Factory } from '@/web3'

export const WalletVM = () => {
  const walletAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  const web3Factory = new Web3Factory()

  const [balance, setBalance] = useState('')

  const fetchBalance = async () => {
    await web3Factory
      .getBalance(walletAddress)
      .then((balance) => {
        const b = Math.round(Number(balance) * Math.pow(10, 4)) / Math.pow(10, 4)
        setBalance(String(b))
      })
      .catch((e: Error) => {
        console.error(e)
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
