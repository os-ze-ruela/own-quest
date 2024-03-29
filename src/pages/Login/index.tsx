import { useContext, useState } from 'react';
import ASTRO from "../../assets/img/astronauta-saturno 1.png";
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { AuthContext } from '../../contexts/auth';
import AppError from '../../core/app-error';
import { ButtonLogin, FieldsDiv, HideButton, ImgAstro, Input, InputButtonDiv, Label, LoginInputs, LoginRecoverItemsDiv, LoginStyle, MessageError, RecoverLink, RecoverText, RegisterLink, RegisterText, SubTitle, Title } from '../../styles/Login';

import { CircularProgress } from '@mui/material';
import showPasswordImg from "../../assets/img/hide.svg";
import hidePasswordImg from "../../assets/img/show.svg";
import AskRegisterBar from '../../components/Bar/AskRegisterBar';
import { RECOVER_PASSWORD, REGISTER } from '../../core/app-urls';

function Login() {

  async function SubmitLogin() {
    setLoading(true)
    setShowError(false)
    try {
      await login(email, password)
    } catch (e) {
      const error = await e as AppError
      setMessageError(error.message)
      setShowError(true)
    }
    setLoading(false)
  }

  const { login } = useContext(AuthContext)
  const [password, setPassword] = useState('');
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [showError, setShowError] = useState(false)
  const [messageError, setMessageError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await SubmitLogin()
  };

  return (
    <>
      <Header page='Registrar' redirect={REGISTER} />
      <LoginStyle>
        <ImgAstro src={ASTRO} />
        <FieldsDiv>
          <form onSubmit={handleSubmit}>
            <LoginInputs>
              <Title>Bem-vindo de volta!</Title>

              <SubTitle>É um prazer te ver de novo por aqui!</SubTitle>

              <RegisterText>
                Ainda não tem uma conta?
                <RegisterLink href={REGISTER}> Cadastre-se </RegisterLink>
              </RegisterText>
              <Label htmlFor="email">Email</Label>
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
            {showError &&
              <MessageError>{messageError}</MessageError>}

            <LoginRecoverItemsDiv>

              <ButtonLogin type='submit' disabled={loading}>
                {loading ? <CircularProgress size={20} color="inherit" /> : 'Entrar'}
              </ButtonLogin>

              <RecoverText>
                Esqueceu sua senha? <br />
                <RecoverLink href={RECOVER_PASSWORD}>Recupere aqui</RecoverLink>
              </RecoverText>
            </LoginRecoverItemsDiv>
          </form>
        </FieldsDiv>
      </LoginStyle >
      <AskRegisterBar />
      <Footer />

    </>
  )
}

export default Login