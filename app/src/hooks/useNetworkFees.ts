// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'

// Hooks
import { useWalletState } from '../state/wallet'

// Types
import { NetworkInfo } from '../constants/types'

export const useNetworkFees = () => {
  // Wallet State
  const {
    state: { tokenSpotPrices, networkFeeEstimates }
  } = useWalletState()

  const getNetworkFeeFiatEstimate = React.useCallback(
    (network: NetworkInfo) => {
      if (!networkFeeEstimates[network.chainId]) {
        return ''
      }
      return (
        Number(tokenSpotPrices[network.symbol]) *
        Number(networkFeeEstimates[network.chainId].gasFee)
      ).toString()
    },
    [tokenSpotPrices, networkFeeEstimates]
  )

  return {
    getNetworkFeeFiatEstimate
  }
}
export default useNetworkFees