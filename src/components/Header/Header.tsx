import React from 'react'
//import { LOGO } from '../../core/app-images'
import { HeaderStyle } from '../../styles/Header'

import LOGO from "../../assets/img/ownquest-logo.png";

function Header() {
  return (
    <HeaderStyle>
    <img src={LOGO} alt="Logo"/>
    </HeaderStyle>
  )
}

export default Header