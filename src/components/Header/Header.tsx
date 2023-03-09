import React from 'react'
import { ButtonStyle, HeaderActions, HeaderStyle, LinkStyle, LogoStyle } from '../../styles/Header'
import LOGO from "../../assets/img/ownquest-logo.png";
import { Link } from "react-router-dom";

interface HeaderProps {page: string, redirect: string}

function Header(props: HeaderProps) {
   

    return (
        <HeaderStyle>
            <a href='/'>
            <LogoStyle src={LOGO} alt="Logo" />
            </a>
            <HeaderActions>
                <LinkStyle>Funcionalidades</LinkStyle>
                <LinkStyle>Sobre Nós</LinkStyle>
                <Link to={props.redirect}>
                <ButtonStyle onClick={() => {}}>{props.page}</ButtonStyle>
                </Link>
            </HeaderActions>
        </HeaderStyle>
    )
}

export default Header