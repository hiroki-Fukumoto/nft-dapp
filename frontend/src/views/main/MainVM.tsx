import { useEffect, useState } from 'react'

import { Web3Factory } from '@/web3/index'

export const MainVM = () => {
  const web3Factory = new Web3Factory()

  const [errorMessageForAlert, setErrorMessageForAlert] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const getShowErrorAlert = () => showErrorAlert
  const getErrorMessageForAlert = () => errorMessageForAlert

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false)
  }

  useEffect(() => {
    function init() {
      void web3Factory.setDefaultAccount().catch((e: Error) => {
        setErrorMessageForAlert(e.message)
        setShowErrorAlert(true)
      })
    }
    void init()
  }, [])

  return {
    getShowErrorAlert,
    getErrorMessageForAlert,
    handleCloseErrorAlert,
  }
}
