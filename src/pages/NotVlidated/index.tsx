import React, { useContext } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { SubTitle } from '../../styles/Login'
import { FaLock } from "react-icons/fa";
import { Bar, BarTitle, ButtonSend, Title, ValidateStyle } from '../../styles/NotValidated'
import { AuthContext } from '../../contexts/auth';



export default function NotValidated(){
    const { sendValidateEmail } = useContext(AuthContext)

    async function resendEmail() {
        try {
            await sendValidateEmail()
        } catch(e) {
            alert('ERRO AO ENVIAR E-MAIL.')
        }
    }

    return(
        <>
            <Header page='Minha conta' redirect=''/>
            <ValidateStyle>
                <Title>Valide sua conta!</Title>
                <SubTitle>Para começar criar suas histórias com Own Quest é necessário validar seu e-mail.</SubTitle> 
                <SubTitle>O link foi enviado em seu e-mail e tem validade de 24 horas.</SubTitle>
                <SubTitle>Se não foi você que solicitou esse cadastro, simplesmente desconsidere esse e-mail.</SubTitle>
                <ButtonSend onClick={async () => {await resendEmail()}}>Reenviar E-mail</ButtonSend>
            </ValidateStyle>
            <Bar>
                <BarTitle>Falta pouco para ter acesso a um mundo de histórias incríveis! <FaLock/> </BarTitle>
            </Bar>
            <Footer/>
        </>
    )
}