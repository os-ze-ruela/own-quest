import React from 'react'
import {useState} from 'react'
import Header from '../../components/Header/Header'
import ASTRO from "../../assets/img/astronauta-controle 1.png";
import Footer from '../../components/Footer/Footer';
import { HideButton, InputButtonDiv, LoginLink, LoginText, RegisterStyle, ButtonRegister, FieldsDiv, ImgAstro, Input, Label, SubTitle, Title } from '../../styles/Register';
import showPasswordImg from "../../assets/img/hide.svg";
import hidePasswordImg from "../../assets/img/show.svg";
import AskLoginBar from '../../components/Bar/AskLoginBar';


function Register() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRevealPassword, setIsRevealPassword] = useState(false);
    const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);
  return (
    <>
    <Header page='Login' redirect='/login'/>
    <RegisterStyle>
      <ImgAstro src={ASTRO} />
      <FieldsDiv>
        <Title>Bem-vindo a plataforma de criação de histórias Own Quest</Title>

        <SubTitle>É um prazer te receber por aqui!</SubTitle>

        <LoginText>
          Já possui uma conta? 
        <LoginLink href='login'> Entre agora </LoginLink>
        </LoginText>

        <Label htmlFor="login">Nickname</Label>
        <Input
          type="text"
          name="login"
          value=''
        />
        <Label htmlFor="login">Nome Completo</Label>
        <Input
          type="text"
          name="login"
          value=''
        />
        <Label htmlFor="login">Email</Label>
        <Input
          type="text"
          name="login"
          value=''
        />
        <Label htmlFor="login">Data de Nascimento</Label>
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

        <Label htmlFor="senha">Confirmar Senha</Label> 
        <InputButtonDiv>
        <Input
          name="confirmar senha"
          type={isRevealConfirmPassword ? "text" : "confirmPassword"}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <HideButton
          title={isRevealConfirmPassword ? "Hide password" : "Show password"}
          src={isRevealConfirmPassword ? hidePasswordImg : showPasswordImg}
          onClick={() => setIsRevealConfirmPassword(prevState => !prevState)}
        />
        </InputButtonDiv>
        <ButtonRegister>Criar Conta</ButtonRegister>
      </FieldsDiv>          
    </RegisterStyle>
    <AskLoginBar/>

    <Footer/>
    </>
  )
}

export default Register