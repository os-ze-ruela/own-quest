import React, { useContext } from 'react'
import { useState } from 'react';
import ASTRO from "../../assets/img/astronauta-controle 1.png";
import showPasswordImg from "../../assets/img/hide.svg";
import hidePasswordImg from "../../assets/img/show.svg";
import AskLoginBar from '../../components/Bar/AskLoginBar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { LOGIN } from '../../core/app-urls';
import { ButtonRegister, FieldsDiv, HideButton, ImgAstro, Input, InputButtonDiv, Label, LoginLink, LoginText, RegisterStyle, SubTitle, Title, MessageError, RegisterInputs } from '../../styles/Register';
import { AuthContext } from '../../contexts/auth';
import AppError from '../../core/app-error';


function Register() {

  async function SubmitRegister() {
    setShowError(false)
    try {
      await register(name, nickname, email, password, confirmPassword, new Date(birthDate).toISOString())
    } catch (e) {
      const error = await e as AppError
      setMessageError(error.message)
      setShowError(true) 
    }
  }

    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRevealPassword, setIsRevealPassword] = useState(false);
    const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

    const [showError, setShowError] = useState(false)
    const [messageError, setMessageError] = useState('')

    const { register } = useContext(AuthContext)

  return (
    <>
    <Header page='Login' redirect={LOGIN}/>
    <RegisterStyle>
      <ImgAstro src={ASTRO} />
      <FieldsDiv>
        <RegisterInputs>
          <Title>Bem-vindo a plataforma de criação de histórias Own Quest</Title>

          <SubTitle>É um prazer te receber por aqui!</SubTitle>

          <LoginText>
            Já possui uma conta? 
          <LoginLink href={LOGIN}> Entre agora </LoginLink>
          </LoginText>

          <Label htmlFor="nickname">Nickname</Label>
          <Input
            type="text"
            name="nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Label htmlFor="birthDate">Data de Nascimento</Label>
          <Input
            type="date"
            name="birthDate"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
          />
          <Label htmlFor="password">Senha</Label> 
          <InputButtonDiv>
          <Input
            name="password"
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

          <Label htmlFor="confirmPassword">Confirmar Senha</Label> 
          <InputButtonDiv>
          <Input
            name="confirmPassword"
            type={isRevealConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <HideButton
            title={isRevealConfirmPassword ? "Hide password" : "Show password"}
            src={isRevealConfirmPassword ? hidePasswordImg : showPasswordImg}
            onClick={() => setIsRevealConfirmPassword(prevState => !prevState)}
          />
          </InputButtonDiv>
        </RegisterInputs>
          { showError &&
              <MessageError>{messageError}</MessageError>}
          <ButtonRegister onClick={async () => await SubmitRegister()}>Criar Conta</ButtonRegister>
      </FieldsDiv>
             
    </RegisterStyle>
    <AskLoginBar/>

    <Footer/>
    </>
  )
}

export default Register