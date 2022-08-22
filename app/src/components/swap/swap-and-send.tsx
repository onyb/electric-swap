// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Options
import { SwapAndSendOptions } from '../../options/select-and-send-options'

// Types
import { WalletAccount } from '../../constants/types'

// Context
import { useSwapContext } from '../../context/swap.context'

// Assets
import FlashIcon from '../../assets/flash-icon.svg'

// Components
import {
  StandardSwitch,
  StandardRadio,
  StandardCheckbox
} from '../form-controls'
import { StandardInput } from '../inputs'

import { AccountSelector } from './account-selector'

// Styled Components
import {
  Column,
  Row,
  Text,
  VerticalSpacer,
  HorizontalSpacer,
  Icon
} from '../shared.styles'

interface Props {
  selectedSwapAndSendOption: string
  toAnotherAddress: string
  selectedSwapSendAccount: WalletAccount | undefined
  userConfirmedAddress: boolean
  swapAndSendSelected: boolean
  onChangeSwapAndSendSelected: (value: boolean) => void
  onCheckUserConfirmedAddress: (id: string, checked: boolean) => void
  handleOnSetToAnotherAddress: (value: string) => void
  onSelectSwapAndSendOption: (value: string) => void
  onSelectSwapSendAccount: (account: WalletAccount) => void
}

export const SwapAndSend = (props: Props) => {
  const {
    selectedSwapAndSendOption,
    toAnotherAddress,
    selectedSwapSendAccount,
    userConfirmedAddress,
    swapAndSendSelected,
    onChangeSwapAndSendSelected,
    onCheckUserConfirmedAddress,
    handleOnSetToAnotherAddress,
    onSelectSwapAndSendOption,
    onSelectSwapSendAccount
  } = props

  // Context
  const { getLocale } = useSwapContext()

  return (
    <Column columnHeight='dynamic' columnWidth='full'>
      <VerticalSpacer size={16} />
      <Row rowWidth='full' marginBottom={16} horizontalPadding={16}>
        <Row>
          <Text textSize='14px'>{getLocale('braveSwapSwapAndSend')}</Text>
          <Flash icon={FlashIcon} size={12} />
          <Text isBold={false} textSize='14px' textColor='text03'>
            {getLocale('braveSwapNoExtraFees')}
          </Text>
        </Row>
        <StandardSwitch
          isChecked={swapAndSendSelected}
          onSetIsChecked={onChangeSwapAndSendSelected}
        />
      </Row>
      {swapAndSendSelected && (
        <Column
          columnHeight='dynamic'
          columnWidth='full'
          horizontalPadding={16}
        >
          {SwapAndSendOptions.map((option) => (
            <Column
              columnHeight='dynamic'
              columnWidth='full'
              horizontalAlign='flex-start'
              key={option.name}
            >
              <StandardRadio
                id={option.name}
                label={getLocale(option.label)}
                isChecked={option.name === selectedSwapAndSendOption}
                onSetIsChecked={onSelectSwapAndSendOption}
                key={option.name}
              />
              <VerticalSpacer size={10} />
              {option.name === 'to-account' && (
                <>
                  <Row rowWidth='full' horizontalAlign='flex-start'>
                    <HorizontalSpacer size={32} />
                    <AccountSelector
                      onSelectAccount={onSelectSwapSendAccount}
                      selectedAccount={selectedSwapSendAccount}
                      disabled={selectedSwapAndSendOption === 'to-address'}
                    />
                  </Row>
                  <VerticalSpacer size={16} />
                </>
              )}

              {option.name === 'to-address' && (
                <>
                  <Row rowWidth='full'>
                    <HorizontalSpacer size={32} />
                    <StandardInput
                      placeholder={getLocale(
                        'braveSwapAddressInputePlaceholder'
                      )}
                      onChange={handleOnSetToAnotherAddress}
                      value={toAnotherAddress}
                      disabled={selectedSwapAndSendOption !== 'to-address'}
                    />
                  </Row>
                  {selectedSwapAndSendOption === 'to-address' &&
                    toAnotherAddress !== '' && (
                      <>
                        <VerticalSpacer size={16} />
                        <Row rowWidth='full' horizontalAlign='flex-start'>
                          <HorizontalSpacer size={32} />
                          <StandardCheckbox
                            id='confirm-address'
                            label={getLocale('braveSwapConfirmAddress')}
                            isChecked={userConfirmedAddress}
                            onChange={onCheckUserConfirmedAddress}
                            key='confirm-address'
                          />
                        </Row>
                      </>
                    )}
                </>
              )}
            </Column>
          ))}
        </Column>
      )}
    </Column>
  )
}

const Flash = styled(Icon)`
  background-color: ${(p) => p.theme.color.legacy.text02};
  margin-left: 4px;
  margin-right: 16px;
`
