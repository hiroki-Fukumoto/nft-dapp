import { HomeView } from '@mainViews/home/HomeView'
import { WalletView } from '@mainViews/wallet/WalletView'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

export const ROUTE = {
  home: '/',
  wallet: '/wallet',
}

export const PRIVATE_ROUTE = {}

export const RouterConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTE.home} element={<HomeView />} />
      <Route path={ROUTE.wallet} element={<WalletView />} />
    </Routes>
  </BrowserRouter>
)
