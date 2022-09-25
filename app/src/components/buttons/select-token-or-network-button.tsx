// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Context
import { useSwapContext } from '~/context/swap.context'

// Assets
import CaratDownIcon from '~/assets/carat-down-icon.svg'
import FuelTankIcon from '~/assets/fuel-tank-icon.svg'

// Styled Components
import { Text, Icon, HorizontalSpacer, Row } from '~/components/shared.styles'

interface SelectTokenButtonStyleProps {
  buttonType?: 'primary' | 'secondary'
  buttonSize?: 'big' | 'medium' | 'small'
  moreRightPadding?: boolean
  hasBackground?: boolean
  hasShadow?: boolean
}

interface Props extends SelectTokenButtonStyleProps {
  onClick: () => void
  icon: string | undefined
  text: string | undefined
  disabled?: boolean
  networkFeeFiatValue?: string
}

export const SelectTokenOrNetworkButton = (props: Props) => {
  const {
    onClick,
    buttonType,
    buttonSize,
    icon,
    text,
    disabled,
    hasBackground,
    hasShadow,
    networkFeeFiatValue
  } = props

  // Context
  const { getLocale } = useSwapContext()

  // Memos
  const needsMorePadding = React.useMemo((): boolean => {
    if (!text) {
      return true
    }
    return text.length > 3
  }, [text])

  return (
    <Button
      onClick={onClick}
      buttonType={buttonType}
      moreRightPadding={needsMorePadding}
      buttonSize={buttonSize}
      disabled={disabled}
      hasBackground={hasBackground}
      hasShadow={hasShadow}
    >
      <Row>
        {text && icon && <ButtonImage src={icon} buttonSize={buttonSize} />}
        <Text
          isBold={text !== undefined}
          textColor={text ? 'text01' : 'text03'}
          textSize={
            buttonSize === 'small' || buttonSize === 'medium' ? '14px' : '18px'
          }
        >
          {text ?? getLocale('braveSwapSelectToken')}
        </Text>
      </Row>
      {networkFeeFiatValue && (
        <>
          <HorizontalSpacer size={8} />
          <GasBubble>
            <FuelTank icon={FuelTankIcon} size={12} />
            <Text textSize='14px' textColor='text01'>
              {networkFeeFiatValue}
            </Text>
          </GasBubble>
        </>
      )}
      {buttonSize !== 'small' && <HorizontalSpacer size={8} />}
      <ButtonIcon size={12} icon={CaratDownIcon} />
    </Button>
  )
}

const Button = styled.button<SelectTokenButtonStyleProps>`
  /* Variables */
  --big-padding: 10px ${(p) => (p.moreRightPadding ? 12 : 10)}px 10px 12px;
  --medium-padding: 8px 16px;
  --small-padding: 4px 12px 4px 4px;

  /* Styles */
  background-color: ${(p) =>
    p.hasBackground ? p.theme.color.legacy.background01 : 'transparent'};
  border-radius: 100px;
  box-shadow: ${(p) =>
    p.hasShadow ? '0px 0px 10px rgba(0, 0, 0, 0.05)' : 'none'};
  justify-content: ${(p) =>
    p.buttonSize === 'small' ? 'space-between' : 'center'};
  padding: ${(p) =>
    p.buttonSize === 'small'
      ? 'var(--small-padding)'
      : p.buttonSize === 'medium'
      ? 'var(--medium-padding)'
      : 'var(--big-padding)'};
  white-space: nowrap;
  width: ${(p) => (p.buttonSize === 'small' ? '140px' : 'unset')};
  :disabled {
    opacity: 0.3;
  }
  &:hover:not([disabled]) {
    background-color: ${(p) =>
      p.buttonType === 'secondary' || p.buttonSize === 'small'
        ? 'var(--token-or-network-button-background-hover-secondary)'
        : 'var(--token-or-network-button-background-hover-primary)'};
  }
`

const ButtonIcon = styled(Icon)`
  background-color: ${(p) => p.theme.color.legacy.text01};
`

const ButtonImage = styled.img<SelectTokenButtonStyleProps>`
  height: ${(p) =>
    p.buttonSize === 'small' || p.buttonSize === 'medium' ? 24 : 40}px;
  margin-right: 8px;
  width: ${(p) =>
    p.buttonSize === 'small' || p.buttonSize === 'medium' ? 24 : 40}px;
`

const FuelTank = styled(Icon)`
  background-color: ${(p) => p.theme.color.legacy.text02};
  margin-right: 6px;
`

const GasBubble = styled(Row)`
  padding: 2px 8px;
  border-radius: 8px;
  background-color: var(--token-or-network-bubble-background);
`
