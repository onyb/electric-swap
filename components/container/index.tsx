import React from 'react'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

import { Swap, WalletAccount, NetworkInfo, CoinType, BlockchainToken } from '../../interface/lib'

import { getLocale } from '../../utils/locale'
import { networks, solana } from '../../constants/networks'

// Runtime dependencies
import {
  getBalance,
  getTokenBalance,
  discoverTokens,
  getTokenPrice,
  ethWalletAdapter,
  swapService,
  makeSolWalletAdapter
} from '../../runtime'
import { mockNetworkFeeEstimates } from '../../mock-data/mock-network-fee-estimates'

interface StaticProps {
  assetsList: BlockchainToken[]
}

export default function SwapContainer (props: StaticProps) {
  const [isReady, setIsReady] = React.useState<boolean>(false)

  const { setVisible: solSetVisible } = useWalletModal()
  const {
    publicKey: solPublicKey,
    disconnect: solDisconnectAsync,
    connected: solIsConnected,
    sendTransaction: solSendTransaction
  } = useSolanaWallet()

  const [network, setNetwork] = React.useState<NetworkInfo>(solana)

  React.useEffect(() => {
    setTimeout(() => setIsReady(true), 2000)
  }, [])

  const getAccountForNetwork = React.useCallback(
    (payload: NetworkInfo) => {
      if (payload.coin === CoinType.Solana) {
        if (!solPublicKey) {
          return
        }

        return {
          name: '',
          address: solPublicKey.toBase58(),
          coin: CoinType.Solana
        } as WalletAccount
      }
    },
    [solPublicKey]
  )

  const account = React.useMemo(
    () => getAccountForNetwork(network),
    [network, getAccountForNetwork]
  )

  return (
    <Swap
      assetsList={props.assetsList}
      account={account}
      network={network}
      supportedNetworks={networks}
      walletAccounts={account ? [account] : []}
      exchanges={[]}
      defaultBaseCurrency='USD'
      isWalletConnected={
        network.coin === CoinType.Solana
            ? solIsConnected && !!account
            : false
      }
      connectWallet={async () => {
        if (network.coin === CoinType.Solana) {
          solSetVisible(true)
        }
      }}
      disconnectWallet={async () => {
        await solDisconnectAsync()
      }}
      switchAccount={async (account: WalletAccount) => {
        // setAccount(account)
      }}
      switchNetwork={async (payload: NetworkInfo) => {
        setNetwork(payload)

        // The caller may use the WalletAccount corresponding to the network
        // being switched to, for refreshing the blockchain state.
        return getAccountForNetwork(payload)
      }}
      getLocale={getLocale}
      getBalance={getBalance}
      getTokenBalance={getTokenBalance}
      discoverTokens={discoverTokens}
      getTokenPrice={getTokenPrice}
      getNetworkFeeEstimate={async (chainId: string) => mockNetworkFeeEstimates[chainId]}
      ethWalletAdapter={ethWalletAdapter}
      solWalletAdapter={makeSolWalletAdapter(solSendTransaction)}
      swapService={swapService}
      isReady={isReady}
    />
  )
}
