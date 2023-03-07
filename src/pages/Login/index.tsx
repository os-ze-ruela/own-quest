import React from 'react'
import Header from '../../components/Header/Header'
import { Bar, BarTitle, ButtonLogin, ButtonRegister, FieldsDiv, ImgAstro, Input, Label, LoginStyle, RegisterLink, RegisterText, SubTitle, Title } from '../../styles/Login'
import ASTRO from "../../assets/img/astronauta-saturno 1.png";
import Footer from '../../components/Footer/Footer';

function Login() {
  return (
    <>
    <Header page='Registrar'/>
    <LoginStyle>
      <ImgAstro src={ASTRO} />
      <FieldsDiv>
        <Title>Bem-vindo de volta!</Title>

        <SubTitle>É um prazer te ver de novo por aqui!</SubTitle>

        <RegisterText>
          Ainda não tem uma conta? 
        <RegisterLink href='register'> Cadastre-se </RegisterLink>
        </RegisterText>

        <Label htmlFor="login">Email ou nickname</Label>
        <Input
          type="text"
          name="login"
          value=''
        />
        <Label htmlFor="senha">Senha</Label> 
        <Input
          type="text"
          name="senha"
          value=''
        />
        <ButtonLogin>Entrar</ButtonLogin>
      </FieldsDiv>          
    </LoginStyle>
    <Bar>
      <BarTitle>Ainda não possui uma conta?</BarTitle>
      <ButtonRegister>Crie sua conta grátis agora</ButtonRegister>
    </Bar>
    <Footer/>
    </>
  )
}

export default Login