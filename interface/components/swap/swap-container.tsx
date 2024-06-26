// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Hooks
import { useSwapContext } from '../../context/swap.context'

// Components
import { Header } from './header'

// Styled Components
import { StyledDiv, StyledButton } from '../shared.styles'

// Types
import { RefreshBlockchainStateParams } from '../../constants/types'

interface Props {
  children?: React.ReactNode
  refreshBlockchainState: (
    overrides: Partial<RefreshBlockchainStateParams>
  ) => Promise<void>
  showPrivacyModal: () => void
}

export const SwapContainer = (props: Props) => {
  const { children, refreshBlockchainState, showPrivacyModal } = props

  const { network, getLocale } = useSwapContext()

  // State
  const [backgroundHeight, setBackgroundHeight] = React.useState<number>(0)
  const [backgroundOpacity, setBackgroundOpacity] = React.useState<number>(0.3)

  // Refs
  const ref = React.createRef<HTMLInputElement>()

  // Effects
  React.useEffect(() => {
    // Keeps track of the Swap Containers Height to update
    // the network backgrounds height.
    setBackgroundHeight(ref?.current?.clientHeight ?? 0)
  }, [ref])

  React.useEffect(() => {
    // Changes network background opacity to 0.6 after changing networks
    setBackgroundOpacity(0.6)
    // Changes network background opacity back to 0.3 after 1 second
    setTimeout(() => setBackgroundOpacity(0.3), 1000)
  }, [network])

  return (
    <Wrapper>
      <Header
        refreshBlockchainState={refreshBlockchainState}
      />
      <Container ref={ref}>{children}</Container>
      <PrivacyButton onClick={showPrivacyModal}>{getLocale('braveSwapPrivacyPolicy')}</PrivacyButton>
      <Background
        height={backgroundHeight}
        network={network.chainId ?? ''}
        backgroundOpacity={backgroundOpacity}
      />
    </Wrapper>
  )
}

const Wrapper = styled(StyledDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 100px 0px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  position: fixed;
  background-color: ${p => p.theme.color.legacy.background01};
  @media (prefers-color-scheme: dark) {
    background-color: ${p => p.theme.color.legacy.background02};
}
`

const Background = styled(StyledDiv) <{
  height: number
  network: string
  backgroundOpacity: number
}>`
  /* Solana */
  --0x65: linear-gradient(
    125deg,
    rgb(33, 178, 164) 0%,
    rgb(93, 124, 209) 50%,
    rgb(122, 96, 232) 100%
  );
  /* Ethereum */
  --0x1: linear-gradient(125deg, rgb(98, 126, 234) 0%, rgb(129, 152, 238) 100%);
  /* Polygon */
  --0x89: linear-gradient(
    125deg,
    rgb(130, 71, 229) 0%,
    rgb(93, 124, 209) 50%,
    rgb(130, 71, 229) 100%
  );
  /* Avalanche */
  --0xa86a: linear-gradient(
    125deg,
    rgb(232, 65, 66) 0%,
    rgb(233, 175, 176) 50%,
    rgb(232, 65, 66) 100%
  );
  /* Optimism */
  --0xa: linear-gradient(
    125deg,
    rgb(252, 141, 153) 0%,
    rgb(247, 211, 215) 50%,
    rgb(254, 4, 32) 100%
  );
  /* Celo */
  --0xa4ec: linear-gradient(
    125deg,
    rgb(252, 204, 94) 0%,
    rgb(238, 255, 143) 50%,
    rgb(54, 210, 129) 100%
  );
  /* Binance */
  --0x38: linear-gradient(
    125deg,
    rgb(243, 186, 47) 0%,
    rgb(255, 219, 133) 50%,
    rgb(243, 186, 47) 100%
  );
  /* Fantom */
  --0xfa: linear-gradient(
    125deg,
    rgb(19, 181, 236) 0%,
    rgb(19, 181, 236) 50%,
    rgb(19, 181, 236) 100%
  );
  filter: blur(150px);
  width: 512px;
  height: ${p => p.height}px;
  opacity: ${p => p.backgroundOpacity};
  transition-delay: 0s;
  transition-duration: 1s;
  transition-timing-function: ease;
  position: absolute;
  z-index: 8;
  background-image: var(--${p => p.network});
`

const Container = styled(StyledDiv)`
  background-color: ${p => p.theme.color.legacy.background01};
  border-radius: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  justify-content: flex-start;
  padding: 16px;
  width: 512px;
  position: relative;
  z-index: 9;
  margin-bottom: 10px;
  @media screen and (max-width: 570px) {
    width: 90%;
  }
`

export const PrivacyButton = styled(StyledButton)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => p.theme.color.legacy.interactive05};
  @media (prefers-color-scheme: dark) {
    color: ${(p) => p.theme.color.legacy.interactive06};
  }
`
