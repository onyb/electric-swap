// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'

// Types / constants
import { CoinType, SwapParams, ZeroExErrorResponse, ZeroExQuoteResponse } from '~/constants/types'
import { MAX_UINT256, NATIVE_ASSET_CONTRACT_ADDRESS_0X } from '~/constants/magics'

// Hooks
import { useSwapContext } from '~/context/swap.context'
import { useWalletState } from '~/state/wallet'

// Utils
import Amount from '~/utils/amount'
import { hexStrToNumberArray } from '~/utils/hex-utils'

type Quote = {
  quote?: ZeroExQuoteResponse
  error?: ZeroExErrorResponse
}

export function useZeroEx (params: SwapParams) {
  const [quote, setQuote] = React.useState<ZeroExQuoteResponse | undefined>(undefined)
  const [error, setError] = React.useState<ZeroExErrorResponse | undefined>(undefined)
  const [hasAllowance, setHasAllowance] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  // Context
  const { swapService, ethWalletAdapter } = useSwapContext()

  // Wallet State
  const {
    state: { selectedNetwork, selectedAccount }
  } = useWalletState()

  const refresh = React.useCallback(
    async function (overrides: Partial<SwapParams> = {}): Promise<Quote> {
      const overriddenParams: SwapParams = {
        ...params,
        ...overrides
      }

      // Perform data validation and early-exit
      if (selectedNetwork?.coin !== CoinType.Ethereum) {
        return {}
      }
      if (!overriddenParams.fromToken || !overriddenParams.toToken) {
        return {}
      }
      if (!overriddenParams.fromAmount && !overriddenParams.toAmount) {
        setQuote(undefined)
        setError(undefined)
        return {}
      }
      if (!overriddenParams.takerAddress) {
        return {}
      }

      setLoading(true)
      try {
        const { success, response, errorResponse } = await swapService.getZeroExPriceQuote({
          takerAddress: overriddenParams.takerAddress,
          sellAmount: overriddenParams.fromAmount,
          buyAmount: overriddenParams.toAmount,
          buyToken: overriddenParams.toToken.contractAddress || NATIVE_ASSET_CONTRACT_ADDRESS_0X,
          sellToken: overriddenParams.fromToken.contractAddress || NATIVE_ASSET_CONTRACT_ADDRESS_0X,
          slippagePercentage: overriddenParams.slippagePercentage,
          gasPrice: ''
        })
        if (success && response) {
          setQuote(response)
          try {
            const allowance = await ethWalletAdapter.getERC20Allowance(
              response.sellTokenAddress,
              selectedAccount,
              response.allowanceTarget
            )
            setHasAllowance(new Amount(allowance).gte(response.sellAmount))
          } catch (e) {
            // bubble up error
          }

          return { quote: response, error: undefined }
        } else if (errorResponse) {
          try {
            const err = JSON.parse(errorResponse) as ZeroExErrorResponse
            setError(err)
            return { quote: undefined, error: err }
          } catch (e) {
            console.error(`Error parsing 0x response: ${e}`)
          } finally {
            console.error(`Error calling getZeroExPriceQuote(): ${errorResponse}`)
          }
        }
      } catch (e) {
        console.error(`Error getting 0x quote: ${e}`)
      } finally {
        setLoading(false)
      }

      return {}
    },
    [selectedNetwork, params]
  )

  const exchange = React.useCallback(
    async function (overrides: Partial<SwapParams> = {}) {
      const overriddenParams: SwapParams = {
        ...params,
        ...overrides
      }

      // Perform data validation and early-exit
      if (selectedNetwork?.coin !== CoinType.Ethereum) {
        return {}
      }
      if (!overriddenParams.fromToken || !overriddenParams.toToken) {
        return {}
      }
      if (!overriddenParams.fromAmount && !overriddenParams.toAmount) {
        return {}
      }
      if (!overriddenParams.takerAddress) {
        return {}
      }

      const { success, response, errorResponse } = await swapService.getZeroExTransactionPayload({
        takerAddress: overriddenParams.takerAddress,
        sellAmount: overriddenParams.fromAmount,
        buyAmount: overriddenParams.toAmount,
        buyToken: overriddenParams.toToken.contractAddress,
        sellToken: overriddenParams.fromToken.contractAddress,
        slippagePercentage: overriddenParams.slippagePercentage,
        gasPrice: ''
      })

      if (success && response) {
        const { data, to, value, estimatedGas } = response

        try {
          await ethWalletAdapter.sendTransaction({
            from: selectedAccount,
            to,
            value: new Amount(value).toHex(),
            gas: new Amount(estimatedGas).toHex(),
            data: hexStrToNumberArray(data)
          })

          setQuote(undefined)
        } catch (e) {
          // bubble up error
        }
      } else if (errorResponse) {
        try {
          const err = JSON.parse(errorResponse) as ZeroExErrorResponse
          setError(err)
        } catch (e) {
          console.error(`Error parsing 0x response: ${e}`)
        } finally {
          console.error(`Error calling getZeroExTransactionPayload(): ${errorResponse}`)
        }
      }
    },
    [selectedNetwork, selectedAccount, params]
  )

  const approve = React.useCallback(async () => {
    if (!quote || hasAllowance) {
      return
    }

    const { allowanceTarget, sellTokenAddress } = quote
    try {
      const data = await ethWalletAdapter.getERC20ApproveData({
        contractAddress: sellTokenAddress,
        spenderAddress: allowanceTarget,
        allowance: new Amount(MAX_UINT256).toHex()
      })
      await ethWalletAdapter.sendTransaction({
        from: selectedAccount,
        to: sellTokenAddress,
        value: '0x0',
        data
      })
    } catch (e) {
      // bubble up error
    }
  }, [selectedAccount, quote, hasAllowance])

  return {
    quote,
    error,
    hasAllowance,
    loading,
    exchange,
    refresh,
    approve
  }
}