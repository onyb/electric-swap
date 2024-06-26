// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'
import { create } from 'ethereum-blockies'

// Utils
import { reduceAddress } from '../../utils/reduce-address'

// Hooks
import { useWalletState } from '../../state/wallet'
import { useSwapContext } from '../../context/swap.context'

// Styled Components
import { Text, HorizontalSpacer, HiddenResponsiveRow, StyledDiv, StyledButton } from '../shared.styles'

interface Props {
  onClick: () => void
}

export const ConnectWalletButton = (props: Props) => {
  const { onClick } = props

  // context
  const { getLocale, account } = useSwapContext()

  // Memos
  const accountOrb: string | undefined = React.useMemo(() => {
    if (!account) {
      return
    }

    return create({
      seed: account.address.toLowerCase() || '',
      size: 8,
      scale: 16
    }).toDataURL()
  }, [account])

  return (
    <Button onClick={onClick} isConnected={account !== undefined}>
      {account ? (
        <>
          {accountOrb && <AccountCircle orb={accountOrb} />}{' '}
          <HiddenResponsiveRow>
            <Text textSize='14px' textColor='text01' isBold={true}>
              {account.name}
            </Text>
            <HorizontalSpacer size={4} />
          </HiddenResponsiveRow>
          <Text textSize='14px' textColor='text03' isBold={true}>
            {reduceAddress(account.address)}
          </Text>
        </>
      ) : (
        getLocale('braveSwapConnectWallet')
      )}
    </Button>
  )
}

const Button = styled(StyledButton)<{ isConnected: boolean }>`
  background-color: ${p =>
    p.isConnected
      ? `var(--connect-wallet-button-background-connected)`
      : `var(--connect-wallet-button-background-disconnected)`};
  border-radius: 48px;
  color: ${p => (p.isConnected ? p.theme.color.legacy.text01 : p.theme.color.white)};
  font-size: 14px;
  padding: ${p => (p.isConnected ? '8px 16px' : `10px 22px`)};
  box-shadow: ${p => (p.isConnected ? '0px 0px 10px rgba(0, 0, 0, 0.05)' : 'none')};
`

const AccountCircle = styled(StyledDiv)<{ orb: string }>`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-image: url(${p => p.orb});
  background-size: cover;
  margin-right: 8px;
`
