import { AppProps } from 'next/app'
import { FC } from 'react'
import React from 'react'

// Use require instead of import since order matters
require('../styles/globals.css')
require('@solana/wallet-adapter-react-ui/styles.css')
require('@rainbow-me/rainbowkit/styles.css')
require('../interface/index.css')

import SolanaWalletProviderContext from '../contexts/solana'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <SolanaWalletProviderContext>
        <Component {...pageProps} />
      </SolanaWalletProviderContext>
  )
}

export default App
