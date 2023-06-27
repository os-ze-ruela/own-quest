import { CircularProgress } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';
import ASTRO from "../../assets/img/astronauta-controle 1.png";
import showPasswordImg from "../../assets/img/hide.svg";
import hidePasswordImg from "../../assets/img/show.svg";
import AskLoginBar from '../../components/Bar/AskLoginBar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { AuthContext } from '../../contexts/auth';
import AppError from '../../core/app-error';
import { LOGIN } from '../../core/app-urls';
import { ButtonRegister, FieldsDiv, HideButton, ImgAstro, Input, InputButtonDiv, Label, LoginLink, LoginText, MessageError, RegisterInputs, RegisterStyle, SubTitle, Title } from '../../styles/Register';


function Register() {


  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showError, setShowError] = useState(false)
  const [messageError, setMessageError] = useState('')

  const { register, validRegister } = useContext(AuthContext)

  async function submitRegister() {
    setLoading(true)
    setShowError(false)
    
    try {
      console.log(birthDate)
      var partes = birthDate.split("/"); // Divide a string nos caracteres "/"
      var dia = parseInt(partes[0], 10); // Converte o dia em um número inteiro
      var mes = parseInt(partes[1], 10); // Converte o mês em um número inteiro (tenha em mente que em JavaScript, os meses são baseados em zero, então janeiro é 0, fevereiro é 1, etc.)
      var ano = parseInt(partes[2], 10); // Converte o ano em um número inteiro

      console.log(ano, mes - 1, dia)
      var data = new Date(ano, mes - 1, dia);

      console.log(data)
      const date = data.toISOString()

      await validRegister(name, nickname, email, password, confirmPassword, birthDate);
      await register(name, nickname, email, password, confirmPassword, date)
    } catch (e) {
      const error = await e as AppError
      setMessageError(error.message)
      setShowError(true)
    }
    setLoading(false)
  }

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const formattedDate = inputDate.split('-').reverse().join('/');
    setBirthDate(formattedDate);
  };

  return (
    <>
      <Header page='Login' redirect={LOGIN} />
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
              name="nome"
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
              value={birthDate.split('/').reverse().join('-')}
              onChange={handleDateChange}
              max="9999-12-31"
              pattern="\d{2}/\d{2}/\d{4}"
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
          {showError &&
            <MessageError>{messageError}</MessageError>}
          <ButtonRegister onClick={() => submitRegister()}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Criar Conta'}
          </ButtonRegister>
        </FieldsDiv>

      </RegisterStyle>
      <AskLoginBar />

      <Footer />
    </>
  )
}

export default Register