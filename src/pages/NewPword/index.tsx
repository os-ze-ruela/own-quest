import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { SubTitle } from '../../styles/Login'
import { Bar, BarTitle, ButtonRecover, ButtonRegister, Input, Label, Label2, RecoverStyle, Title } from '../../styles/NewPword'



export default function NewPword(){
    return(
        <>
            <Header page='Login'/>
            <RecoverStyle>
                <Title>Definir nova senha</Title>
                <SubTitle>Como você pediu, aqui você pode definir sua nova senha</SubTitle>
                <SubTitle>caso tenha requisitado a recuperação</SubTitle>
                <Label htmlFor='newpswd'>Nova senha</Label>
                <Input
                    type="text"
                    name="newpswd"
                    value=''
                />
                <Label2 htmlFor='confirmpswd'>Confirmar nova senha</Label2>
                <Input
                    type="text"
                    name="confirmpswd"
                    value=''
                />
                <ButtonRecover>Definir Senha</ButtonRecover>
            </RecoverStyle>
            <Bar>
                <BarTitle>Ainda não possui uma conta?</BarTitle>
                <ButtonRegister>Cria sua conta grátis agora</ButtonRegister>
            </Bar>
            <Footer/>
        </>
    )
}