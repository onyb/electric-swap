// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React, { createContext } from 'react'

// Types
import {
  BlockchainToken,
  NetworkInfo,
  QuoteOption,
  WalletAccount,
  Exchange,
  GasEstimate,
  ZeroExSwapParams,
  ZeroExSwapResponse,
  JupiterSwapParams,
  JupiterQuote,
  JupiterQuoteParams,
  JupiterSwapTransactions,
  ZeroExQuoteResponse
} from '../constants/types'

interface SwapContextInterface {
  getLocale: (key: string) => string
  getBalance: (
    address: string,
    coin: number,
    chainId: string
  ) => Promise<{
    balance: string
    error: number
    errorMessage: string
  }>
  getERC20TokenBalance: (
    contractAddress: string,
    address: string,
    chainId: string
  ) => Promise<{
    balance: string
    error: number
    errorMessage: string
  }>
  getAllTokens: (
    chainId: string,
    coin: number
  ) => Promise<{
    tokens: BlockchainToken[]
  }>
  getSelectedAccount: () => Promise<string>
  getSelectedNetwork: () => Promise<NetworkInfo>
  getSupportedNetworks: () => Promise<NetworkInfo[]>
  getTokenPrice: (contractAddress: string) => Promise<{
    price: string
    error: number
    errorMessage: string
  }>
  swapService: {
    getZeroExPriceQuote: (params: ZeroExSwapParams) => Promise<{
      success: boolean
      response: ZeroExQuoteResponse
      errorResponse: string
    }>
    getZeroExTransactionPayload: (params: ZeroExSwapParams) => Promise<{
      success: boolean
      response: ZeroExSwapResponse
      errorResponse: string
    }>
    getJupiterQuote: (params: JupiterQuoteParams) => Promise<{
      success: boolean
      response: JupiterQuote
      errorResponse: string
    }>
    getJupiterTransactionsPayload: (params: JupiterSwapParams) => Promise<{
      success: boolean
      response: JupiterSwapTransactions
      errorResponse: string
    }>
  }
  getSwapQuotes: (
    fromAddress: string,
    fromAmount: string,
    toAddress: string
  ) => Promise<QuoteOption[]>
  getBraveWalletAccounts?: () => Promise<WalletAccount[]>
  getExchanges: () => Promise<Exchange[]>
  getNetworkFeeEstimate: (chainId: string) => Promise<GasEstimate>
}

// Create Swap Context
const SwapContext = createContext<SwapContextInterface | undefined>(undefined)

export interface SwapProviderInterface extends SwapContextInterface {
  children?: React.ReactNode
}

// Swap Provder
const SwapProvider = (props: SwapProviderInterface) => {
  const {
    children,
    getLocale,
    getBalance,
    getERC20TokenBalance,
    getAllTokens,
    getSelectedAccount,
    getSelectedNetwork,
    getTokenPrice,
    getSwapQuotes,
    getSupportedNetworks,
    getBraveWalletAccounts,
    getExchanges,
    getNetworkFeeEstimate,
    swapService
  } = props

  return (
    <SwapContext.Provider
      value={{
        getLocale,
        getBalance,
        getERC20TokenBalance,
        getAllTokens,
        getSelectedAccount,
        getSelectedNetwork,
        getTokenPrice,
        getSwapQuotes,
        getSupportedNetworks,
        getBraveWalletAccounts,
        getExchanges,
        getNetworkFeeEstimate,
        swapService
      }}
    >
      {children}
    </SwapContext.Provider>
  )
}

const useSwapContext = () => {
  const context = React.useContext(SwapContext)
  if (context === undefined) {
    throw new Error('useSwap must be used within a SwapProvider')
  }
  return context
}

export { SwapContext, SwapProvider, useSwapContext }