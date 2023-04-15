import { useRef, useState } from 'react';
import ASTRO from "../../assets/img/astronauta-saturno 1.png";
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { ButtonLogin, FieldsDiv, HideButton, ImgAstro, Input, InputButtonDiv, Label, LoginInputs, LoginRecoverItemsDiv, LoginStyle, MessageError, RecoverLink, RecoverText, RegisterLink, RegisterText, SubTitle, Title } from '../../styles/Login';


import showPasswordImg from "../../assets/img/hide.svg";
import hidePasswordImg from "../../assets/img/show.svg";
import AskRegisterBar from '../../components/Bar/AskRegisterBar';

function Login() {

  function SubmitLogin() {
    setShowError(false)
    if (isValid()) {
      const data = { email: email, password: password}
      fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(response => {
        console.log(response.status)
        if (response.status != 200) {
          setShowError(true)
          return response.json()
        }
      })
      .then( data => {
        setMessageError(data.message)
      })
      .catch(error => {
        console.log(error)
      })
      
    } else {
      setShowError(true)
      if (email == '') {
        setMessageError('Informe um email cadastrado.')
      } else if(password == '') {
        setMessageError('Informe a senha.')
      }
    }
  }

  function isValid() {
    if( email == '' || password == ''){
      return false
    } else {
      return true
    }
  }


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

            <Label htmlFor="login">Email ou nickname</Label>
            <Input
              type="text"
              name="login"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
          </LoginInputs>
          { showError &&
            <MessageError>{messageError}</MessageError>}
          
          <LoginRecoverItemsDiv>
            <ButtonLogin onClick={SubmitLogin}>Entrar</ButtonLogin>
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