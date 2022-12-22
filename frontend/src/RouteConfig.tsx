import { TodoView } from '@mainViews/todo/TodoView'
import { WalletView } from '@mainViews/wallet/WalletView'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

export const ROUTE = {
  todo: '/',
  wallet: '/wallet'
}

export const PRIVATE_ROUTE = {}

export const RouterConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTE.todo} element={<TodoView />} />
      <Route path={ROUTE.wallet} element={<WalletView />} />
    </Routes>
  </BrowserRouter>
)
