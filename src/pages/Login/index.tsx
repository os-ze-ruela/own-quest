import React from 'react'
import Header from '../../components/Header/Header'
import { Bar, BarTitle, ButtonLogin, ButtonRegister, Foot, LoginStyle, RegisterLink, Wrt } from '../../styles/Login'
import LOGO from "../../assets/img/ownquest-logo.png";

function Login() {
  return (
    <>
    <Header/>
    <LoginStyle>
      <Wrt>
        Bem-vindo de volta!
      </Wrt>
      <div style={{color: "white", marginLeft: "0.5em"}}>É um prazer te ver de novo por aqui</div>
      <p style={{color: "white", marginLeft: "0.5em"}}>Ainda não tem uma conta? 
      <RegisterLink href='register'> Cadastre-se</RegisterLink>
      </p>
      {/* LEMBRAR DE ESTILISAR OS INPUTS */}
      <input style={{display: "flex", marginLeft: "0.5em"}}
        type="text"
        name="login"
        placeholder="Email ou nickname"
        value=''
      /> 
      <input style={{display: "flex", marginLeft: "0.5em"}}
        type="text"
        name="senha"
        placeholder="Senha"
        value=''
      />
      <ButtonLogin>Entrar</ButtonLogin>          
    </LoginStyle>
    {/* LEMBRAR DE MUDAR A COR DO BAR - TÁ ERRADA DE PROPÓSITO */}
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