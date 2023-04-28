import { useContext, useState } from 'react';
import ASTRO from "../../assets/img/astronauta-saturno 1.png";
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { AuthContext } from '../../contexts/auth';
import { ButtonLogin, FieldsDiv, HideButton, ImgAstro, Input, InputButtonDiv, Label, LoginInputs, LoginRecoverItemsDiv, LoginStyle, MessageError, RecoverLink, RecoverText, RegisterLink, RegisterText, SubTitle, Title } from '../../styles/Login';
import AppError from '../../core/app-error';

import showPasswordImg from "../../assets/img/hide.svg";
import hidePasswordImg from "../../assets/img/show.svg";
import AskRegisterBar from '../../components/Bar/AskRegisterBar';

function Login() {

  async function SubmitLogin() {
    setShowError(false)
    try {
      await login(email, password)
    } catch(e) {
      const error = await e as AppError
      setMessageError(error.message)
      setShowError(true)  
    }
  }

  const { login } = useContext(AuthContext)
  const [password, setPassword] = useState('');
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [email, setEmail] = useState('');

  const [showError, setShowError] = useState(false)
  const [messageError, setMessageError] = useState('')

  return (
    <>
      <Header page='Registrar' redirect='/register' />
      <LoginStyle>
        <ImgAstro src={ASTRO} />
        <FieldsDiv>
          <LoginInputs>
            <Title>Bem-vindo de volta!</Title>

            <SubTitle>É um prazer te ver de novo por aqui!</SubTitle>

            <RegisterText>
              Ainda não tem uma conta?
              <RegisterLink href='register'> Cadastre-se </RegisterLink>
            </RegisterText>

            <Label htmlFor="email">Email ou nickname</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
          </LoginInputs>
          { showError &&
            <MessageError>{messageError}</MessageError>}
          
          <LoginRecoverItemsDiv>
            <ButtonLogin onClick={async () => await SubmitLogin()}>Entrar</ButtonLogin>
            <RecoverText>
              Esqueceu sua senha? <br />
              <RecoverLink href='recover'>Recupere aqui</RecoverLink>
            </RecoverText>
          </LoginRecoverItemsDiv>
        </FieldsDiv>
      </LoginStyle>
      <AskRegisterBar />
      <Footer />
    </>
  )
}

export default Login