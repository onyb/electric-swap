// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { GasFeeOption } from '../constants/types'

// Assets
import { SlowIcon, AverageIcon, FastIcon } from '../assets/gas-presset-icons'

export const gasFeeOptions: GasFeeOption[] = [
  {
    id: 'slow',
    name: 'braveSwapSlow',
    icon: SlowIcon
  },
  {
    id: 'average',
    name: 'braveSwapAverage',
    icon: AverageIcon
  },
  {
    id: 'fast',
    name: 'braveSwapFast',
    icon: FastIcon
  }
]
