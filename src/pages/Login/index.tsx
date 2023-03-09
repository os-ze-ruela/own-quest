import React from 'react'
import {useState} from 'react'
import Header from '../../components/Header/Header'
import { Bar, BarTitle, ButtonLogin, ButtonRegister, FieldsDiv, HideButton, ImgAstro, Input, InputButtonDiv, Label, LoginStyle, RegisterLink, RegisterText, SubTitle, Title } from '../../styles/Login'
import ASTRO from "../../assets/img/astronauta-saturno 1.png";
import Footer from '../../components/Footer/Footer';


import showPasswordImg from "../../assets/img/hide.svg";
import hidePasswordImg from "../../assets/img/show.svg";


function Login() {
  const [password, setPassword] = useState('');
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  return (
    <>
    <Header page='Registrar' redirect='/register'/>
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
        <InputButtonDiv>
        <Input
          name="senha"
          type={isRevealPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <HideButton
          title={isRevealPassword ? "Hide password" : "Show password"}
          src={isRevealPassword ? hidePasswordImg : showPasswordImg}
          onClick={() => setIsRevealPassword(prevState => !prevState)}
        />
        </InputButtonDiv>
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