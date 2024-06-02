// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import ZeroXIcon from '../assets/lp-icons/0x.png'
import AaveIcon from '../assets/lp-icons/aave.svg'
import AldrinIcon from '../assets/lp-icons/aldrin.svg'
import ApeSwapIcon from '../assets/lp-icons/apeswap.png'
import BalancerIcon from '../assets/lp-icons/balancer.svg'
import BalansolIcon from '../assets/lp-icons/balansol.svg'
import BancorIcon from '../assets/lp-icons/bancor.svg'
import ComponentIcon from '../assets/lp-icons/component.jpeg'
import CremaIcon from '../assets/lp-icons/crema.svg'
import CropperIcon from '../assets/lp-icons/cropper.svg'
import CryptoComIcon from '../assets/lp-icons/cryptocom.jpeg'
import CurveIcon from '../assets/lp-icons/curve.svg'
import CykuraIcon from '../assets/lp-icons/cykura.png'
import DFYNIcon from '../assets/lp-icons/dfyn.png'
import DoDoIcon from '../assets/lp-icons/dodo.svg'
import DradexIcon from '../assets/lp-icons/dradex.svg'
import FireBirdOneSwapIcon from '../assets/lp-icons/firebirdoneswap.png'
import GooseFXIcon from '../assets/lp-icons/goosefx.svg'
import InvariantIcon from '../assets/lp-icons/invariant.svg'
import IronSwapIcon from '../assets/lp-icons/ironswap.jpeg'
import KyberDMMIcon from '../assets/lp-icons/kyberdmm.png'
import LidoIcon from '../assets/lp-icons/lido.png'
import LifinityIcon from '../assets/lp-icons/lifinity.jpeg'
import MakerPsmIcon from '../assets/lp-icons/makerpsm.jpeg'
import MarinadeIcon from '../assets/lp-icons/marinade.svg'
import MercurialIcon from '../assets/lp-icons/mercurial.svg'
import MeshSwapIcon from '../assets/lp-icons/meshswap.png'
import MStableIcon from '../assets/lp-icons/mstable.png'
import OrcaIcon from '../assets/lp-icons/orca.svg'
import QuickSwapIcon from '../assets/lp-icons/quickswap.png'
import PenguinIcon from '../assets/lp-icons/penguin.svg'
import SaberIcon from '../assets/lp-icons/saber.svg'
import SaddleIcon from '../assets/lp-icons/saddle.png'
import SenchaIcon from '../assets/lp-icons/sencha.jpeg'
import SarosIcon from '../assets/lp-icons/saros.svg'
import SerumIcon from '../assets/lp-icons/serum.svg'
import ShellIcon from '../assets/lp-icons/shell.jpeg'
import ShibaSwapIcon from '../assets/lp-icons/shibaswap.png'
import StepIcon from '../assets/lp-icons/step.svg'
import StepnIcon from '../assets/lp-icons/stepn.svg'
import SushiSwapIcon from '../assets/lp-icons/sushiswap.svg'
import SynapseIcon from '../assets/lp-icons/synapse.png'
import SynthetixIcon from '../assets/lp-icons/synthetix.png'
import UniswapIcon from '../assets/lp-icons/uniswap.svg'
import WaultSwapIcon from '../assets/lp-icons/waultswap.jpeg'
import WOOFiIcon from '../assets/lp-icons/woofi.png'

import { getImageURL } from '../../utils/img-utils'

type LPMetadataType = {
  [name: string]: string
}

const LPMetadata: LPMetadataType = {
  ["0x"]: getImageURL(ZeroXIcon),
  Aave_V2: getImageURL(AaveIcon),
  Aldrin: getImageURL(AldrinIcon),
  ApeSwap: getImageURL(ApeSwapIcon),
  Balancer: getImageURL(BalancerIcon),
  Balancer_V2: getImageURL(BalancerIcon),
  Balansol: getImageURL(BalansolIcon),
  Bancor: getImageURL(BancorIcon),
  BancorV3: getImageURL(BancorIcon),
  Component: getImageURL(ComponentIcon),
  Crema: getImageURL(CremaIcon),
  Cropper: getImageURL(CropperIcon),
  CryptoCom: getImageURL(CryptoComIcon),
  Curve: getImageURL(CurveIcon),
  Curve_V2: getImageURL(CurveIcon),
  Cykura: getImageURL(CykuraIcon),
  Dfyn: getImageURL(DFYNIcon),
  DODO: getImageURL(DoDoIcon),
  DODO_V2: getImageURL(DoDoIcon),
  Dradex: getImageURL(DradexIcon),
  FirebirdOneSwap: getImageURL(FireBirdOneSwapIcon),
  GooseFX: getImageURL(GooseFXIcon),
  Invariant: getImageURL(InvariantIcon),
  IronSwap: getImageURL(IronSwapIcon),
  KyberDMM: getImageURL(KyberDMMIcon),
  Lido: getImageURL(LidoIcon),
  Lifinity: getImageURL(LifinityIcon),
  // LiquidityProvider info unknown
  LiquidityProvider: "",
  MakerPsm: getImageURL(MakerPsmIcon),
  Marinade: getImageURL(MarinadeIcon),
  Mercurial: getImageURL(MercurialIcon),
  MeshSwap: getImageURL(MeshSwapIcon),
  mStable: getImageURL(MStableIcon),
  // MultiHop info unknown
  MultiHop: "",
  Orca: getImageURL(OrcaIcon),
  QuickSwap: getImageURL(QuickSwapIcon),
  Penguin: getImageURL(PenguinIcon),
  Saber: getImageURL(SaberIcon),
  Saddle: getImageURL(SaddleIcon),
  Sencha: getImageURL(SenchaIcon),
  Saros: getImageURL(SarosIcon),
  Serum: getImageURL(SerumIcon),
  Shell: getImageURL(ShellIcon),
  ShibaSwap: getImageURL(ShibaSwapIcon),
  Step: getImageURL(StepIcon),
  Stepn: getImageURL(StepnIcon),
  SushiSwap: getImageURL(SushiSwapIcon),
  Synapse: getImageURL(SynapseIcon),
  Synthetix: getImageURL(SynthetixIcon),
  Uniswap: getImageURL(UniswapIcon),
  Uniswap_V2: getImageURL(UniswapIcon),
  Uniswap_V3: getImageURL(UniswapIcon),
  WaultSwap: getImageURL(WaultSwapIcon),
  WOOFi: getImageURL(WOOFiIcon),
};

export default LPMetadata
