import { NavBar } from '@components/navBar/NavBar'
import { MainVM } from '@mainViews/MainVM'

import { ErrorMessageAlert } from '@/components/alert/error/ErrorMessageAlert'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const MainView = (props: Props) => {
  const { children } = props

  const VM = MainVM()

  return (
    <>
      <NavBar />
      <div className="m-4 relative">
        <ErrorMessageAlert
          show={VM.getShowErrorAlert()}
          message={VM.getErrorMessageForAlert()}
          onClose={VM.handleCloseErrorAlert}
        />
        {children}
      </div>
    </>
  )
}
