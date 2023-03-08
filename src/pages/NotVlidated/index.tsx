import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { SubTitle } from '../../styles/Login'
import { FaLock } from "react-icons/fa";
import { Bar, BarTitle, ButtonSend, Title, ValidateStyle } from '../../styles/NotValidated'



export default function NotValidated(){
    return(
        <>
            <Header page='Minha conta'/>
            <ValidateStyle>
                <Title>Valide sua conta!</Title>
                <SubTitle>Para começar criar suas histórias com Own Quest é necessário validar seu e-mail.</SubTitle> 
                <SubTitle>O link foi enviado em seu e-mail e tem validade de 24 horas.</SubTitle>
                <SubTitle>Se não foi você que solicitou esse cadastro, simplesmente desconsidere esse e-mail.</SubTitle>
                <ButtonSend>Reenviar E-mail</ButtonSend>
            </ValidateStyle>
            <Bar>
                <BarTitle>Falta pouco para ter acesso a um mundo de histórias incríveis! <FaLock/> </BarTitle>
            </Bar>
            <Footer/>
        </>
    )
}