import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import { RouterConfig } from '@/RouteConfig'

import '@/index.css'

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RecoilRoot>
        <RouterConfig />
      </RecoilRoot>
    </CookiesProvider>
  </React.StrictMode>
)
