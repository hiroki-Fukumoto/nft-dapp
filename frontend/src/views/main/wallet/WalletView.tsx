import { MainView } from '@mainViews/MainView'
import { WalletVM } from '@mainViews/wallet/WalletVM'
import { CardBody } from '@material-tailwind/react'

import { BaseCard } from '@/components/card/BaseCard'

export const WalletView = () => {
  const VM = WalletVM()

  return (
    <MainView>
      <BaseCard>
        <BaseCard>
          <CardBody>
            <div>Balance</div>
            <div>{VM.getBalance()} ETH</div>
          </CardBody>
        </BaseCard>
      </BaseCard>
    </MainView>
  )
}
