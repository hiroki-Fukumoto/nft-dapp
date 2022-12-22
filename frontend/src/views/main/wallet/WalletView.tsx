import { SimpleCard } from '@components/card/SimpleCard'
import { MainView } from '@mainViews/MainView'
import { WalletVM } from '@mainViews/wallet/WalletVM'

import { themeColor } from '@/tailwind/theme'

export const WalletView = () => {
  const VM = WalletVM()

  return (
    <MainView>
      <SimpleCard color={themeColor.bg.lightBlue}>
        <div>Balance</div>
        <div>{VM.getBalance()} ETH</div>
      </SimpleCard>
    </MainView>
  )
}
