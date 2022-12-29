import { CardBody } from '@material-tailwind/react'

import { BaseCard } from '@/components/card/BaseCard'
import { MainView } from '@/views/main/MainView'
import { WalletVM } from '@/views/main/wallet/WalletVM'

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
