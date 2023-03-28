import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { SubTitle } from '../../styles/Login'
import { ButtonRecover, Input, Label, Label2, RecoverStyle, Title } from '../../styles/NewPword'
import AskRegisterBar from '../../components/Bar/AskRegisterBar'



export default function NewPword(){
    return(
        <>
            <Header page='Login' redirect='/login'/>
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
            <AskRegisterBar/>
            <Footer/>
        </>
    )
}