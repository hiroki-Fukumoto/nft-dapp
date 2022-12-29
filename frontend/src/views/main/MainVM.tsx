import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { UserABI } from '@/contracts/user/userABI'
import { accountState } from '@/store/userState'
import { Web3Factory } from '@/web3/index'

export const MainVM = () => {
  const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
  const userABI = new UserABI(contractAddress)

  const web3Factory = new Web3Factory()

  const [account, setAccount] = useRecoilState(accountState)
  const [errorMessageForAlert, setErrorMessageForAlert] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  // == ABI ==
  const getMe = () => {
    return userABI
      .getMe()
      .then((res) => {
        return res
      })
      .catch((e: Error) => {
        throw e
      })
  }

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false)
  }

  useEffect(() => {
    // TODO
    void web3Factory
      .setDefaultAccount()
      .then(() => {
        void getMe()
          .then((res) => {
            setAccount(res)
          })
          .catch((e: Error) => {
            if (!e.message.includes('Account not found')) {
              setErrorMessageForAlert(e.message)
              setShowErrorAlert(true)
            }
          })
      })
      .catch((e: Error) => {
        setErrorMessageForAlert(e.message)
        setShowErrorAlert(true)
      })
  }, [])

  return {
    showErrorAlert,
    errorMessageForAlert,
    handleCloseErrorAlert,
  }
}
