import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import { reportWebVitals } from '@/reportWebVitals'
import { RouterConfig } from '@/RouteConfig'
import { Web3Factory } from '@/web3/index'

import '@/index.css'

const web3Factory = new Web3Factory()
void web3Factory
  .setDefaultAccount()
  .then(() => {
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

    reportWebVitals()
  })
  .catch((e: Error) => {
    console.error(e)
  })
