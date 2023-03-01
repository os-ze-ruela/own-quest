import React from 'react'
//import { LOGO } from '../../core/app-images'
import { HeaderStyle } from '../../styles/Header'

import LOGO from "../../assets/img/ownquest-logo.png";

function Header() {
  return (
    <HeaderStyle>
    <img style={{marginTop: "0.5em", marginLeft: "0.5em", cursor: "pointer"}}src={LOGO} alt="Logo"/>
    </HeaderStyle>
  )
}

export default Header