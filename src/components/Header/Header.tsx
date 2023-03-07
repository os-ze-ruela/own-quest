import React from 'react'
import { ButtonStyle, HeaderActions, HeaderStyle, LinkStyle, LogoStyle } from '../../styles/Header'
import LOGO from "../../assets/img/ownquest-logo.png";

interface HeaderProps {page: string}

function Header(props: HeaderProps) {
    return (
        <HeaderStyle>
            <LogoStyle src={LOGO} alt="Logo" />
            <HeaderActions>
                <LinkStyle>Funcionalidades</LinkStyle>
                <LinkStyle>Sobre Nós</LinkStyle>
                <ButtonStyle>{props.page}</ButtonStyle>
            </HeaderActions>
        </HeaderStyle>
    )
}

export default Header