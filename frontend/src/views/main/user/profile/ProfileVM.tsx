import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { CreateAccountRequest } from '@/contracts/user/types'
import { UserABI } from '@/contracts/user/userABI'
import { accountState } from '@/store/userState'

export const ProfileVM = () => {
  const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
  const userABI = new UserABI(contractAddress)

  const [account, setAccount] = useRecoilState(accountState)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [headerImageURL, setHeaderImageURL] = useState('')
  const [avatarImageURL, setAvatarImageURL] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [errorMessageForAlert, setErrorMessageForAlert] = useState('')

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

  // TODO: update
  const createAccountABI = () => {
    const req: CreateAccountRequest = {
      name,
      bio,
      email,
      header_image_url: headerImageURL,
      avatar_image_url: avatarImageURL,
    }
    return userABI.createAccount(req).catch((e: Error) => {
      throw e
    })
  }

  // == methods ==
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleChangeBio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value)
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleHeaderImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderImageURL(event.target.value)
  }

  const handleChangeAvatarImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarImageURL(event.target.value)
  }

  const handleSave = () => {
    setErrorMessage('')
    void createAccountABI().catch((e: Error) => {
      setErrorMessage(e.message)
    })
  }

  const handleCloseErrorAlert = () => {
    setErrorMessageForAlert('')
    setShowErrorAlert(false)
  }

  useEffect(() => {
    if (account.id != '') {
      setName(account.name)
      setBio(account.bio)
      setEmail(account.email)
      setAvatarImageURL(account.avatar_image_url)
      setHeaderImageURL(account.header_image_url)
      return
    }

    void getMe()
      .then((res) => {
        setAccount(res)
        setName(res.name)
        setBio(res.bio)
        setEmail(res.email)
        setAvatarImageURL(res.avatar_image_url)
        setHeaderImageURL(res.header_image_url)
      })
      .catch((e: Error) => {
        if (!e.message.includes('Account not found')) {
          setErrorMessageForAlert(e.message)
          setShowErrorAlert(true)
        }
      })
  }, [])

  return {
    account,
    name,
    bio,
    email,
    headerImageURL,
    avatarImageURL,
    errorMessage,
    showErrorAlert,
    errorMessageForAlert,
    handleChangeName,
    handleChangeBio,
    handleChangeEmail,
    handleHeaderImageURL,
    handleChangeAvatarImageURL,
    handleSave,
    handleCloseErrorAlert,
  }
}
