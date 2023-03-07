import React from 'react'
import Header from '../../components/Header/Header'
import { Bar, BarTitle, ButtonLogin, ButtonRegister, Foot, ImgAstro, Input, Label, LoginStyle, RegisterLink, Wrt } from '../../styles/Login'
import LOGO from "../../assets/img/ownquest-logo.png";
import ASTRO from "../../assets/img/astronauta-saturno 1.png";

function Login() {
  return (
    <>
    <Header/>
    <LoginStyle>
      <ImgAstro src={ASTRO} />
      <Wrt>
        Bem-vindo de volta!
      </Wrt>
      <div style={{color: "white", marginLeft: "0.5em"}}>É um prazer te ver de novo por aqui</div>
      <p style={{color: "white", marginLeft: "0.5em"}}>Ainda não tem uma conta? 
      <RegisterLink href='register'> Cadastre-se</RegisterLink>
      </p>
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
    </LoginStyle>
    <Bar>
      <BarTitle>Ainda não possui uma conta?</BarTitle>
      <ButtonRegister>Crie sua conta grátis agora</ButtonRegister>
    </Bar>
    <Foot>
      <img style={{marginTop: "0.5em", marginLeft: "0.5em"}}src={LOGO} alt="Logo"/>
    </Foot>
    </>
  )
}

export default Login