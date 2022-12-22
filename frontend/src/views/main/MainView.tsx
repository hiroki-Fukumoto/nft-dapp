import { AppBar } from '@components/appBar/AppBar'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const MainView = (props: Props) => {
  const { children } = props

  return (
    <>
      <AppBar />
      <div className="p-2">{children}</div>
    </>
  )
}
