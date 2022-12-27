import { HomeView } from '@mainViews/home/HomeView'
import { WalletView } from '@mainViews/wallet/WalletView'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { CollectionView } from './views/main/collection/CollectionView'

export const ROUTE = {
  home: '/',
  wallet: '/wallet',
  collection: '/collection', // TODO: collection/userID
}

export const PRIVATE_ROUTE = {}

export const RouterConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTE.home} element={<HomeView />} />
      <Route path={ROUTE.wallet} element={<WalletView />} />
      <Route path={ROUTE.collection} element={<CollectionView />} />
    </Routes>
  </BrowserRouter>
)
