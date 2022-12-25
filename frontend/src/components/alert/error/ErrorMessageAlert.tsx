import { Alert } from '@material-tailwind/react'
interface Props {
  show: boolean
  message: string
  onClose: () => void
}

export const ErrorMessageAlert = (props: Props) => {
  const { show, message, onClose } = props

  return (
    <>
      <Alert
        show={show}
        className="absolute z-10"
        color="red"
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        dismissible={{
          onClose: () => onClose(),
        }}
      >
        {message}
      </Alert>
    </>
  )
}
