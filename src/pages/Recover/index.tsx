import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { SubTitle } from '../../styles/Login'
import { Bar, BarTitle, ButtonRecover, ButtonRegister, Input, Label, RecoverStyle, Title } from '../../styles/Recover'



export default function Recover(){
    return(
        <>
            <Header page='Login'/>
            <RecoverStyle>
                <Title>Recuperar sua senha</Title>
                <SubTitle>Entendemos que lembrar todas suas senhas pode ser difícil.</SubTitle>
                <SubTitle>Para recuperar sua senha um link para recuperação deve ser enviado em seu e-mail.</SubTitle>
                <Label htmlFor='email'>E-mail</Label>
                <Input
                    type="text"
                    name="email"
                    value=''
                />
                <ButtonRecover>Recuperar Senha</ButtonRecover>
            </RecoverStyle>
            <Bar>
                <BarTitle>Ainda não possui uma conta?</BarTitle>
                <ButtonRegister>Cria sua conta grátis agora</ButtonRegister>
            </Bar>
            <Footer/>
        </>
    )
}