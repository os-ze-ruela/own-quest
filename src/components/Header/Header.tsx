import React from 'react'
//import { LOGO } from '../../core/app-images'
import { ButtonStyle, HeaderStyle, LinkStyle, LogoStyle } from '../../styles/Header'

import LOGO from "../../assets/img/ownquest-logo.png";

function Header() {
    return (
        <HeaderStyle>
            <LogoStyle src={LOGO} alt="Logo" />
            <div style={{display: 'flex'}}>
                <LinkStyle>Funcionalidades</LinkStyle>
                <LinkStyle>Sobre Nós</LinkStyle>
                <ButtonStyle>Login</ButtonStyle>
            </div>
        </HeaderStyle>
    )
}

export default Header