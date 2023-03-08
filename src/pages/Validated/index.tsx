import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { SubTitle } from '../../styles/Login'
import { FaUnlock } from "react-icons/fa";
import { Bar, BarTitle, ButtonSend, Title, ValidateStyle } from '../../styles/Validated'



export default function Validated(){
    return(
        <>
            <Header page='Minha conta'/>
            <ValidateStyle>
                <Title>, seu e-mail foi verificado com sucesso</Title>
                <SubTitle>Agora você pode criar milhares de histórias e compartilhar com seus amigos!</SubTitle> 
                <SubTitle>Seu e-mail foi validado e você não irá precisar passar mais por esse processo para</SubTitle>
                <SubTitle>acessar a sua conta novamente!</SubTitle>
                <ButtonSend>Continuar na plataforma</ButtonSend>
            </ValidateStyle>
            <Bar>
                <BarTitle>Seu acesso à criação e visualização de histórias foi garantido! <FaUnlock/> </BarTitle>
            </Bar>
            <Footer/>
        </>
    )
}