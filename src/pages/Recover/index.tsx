import { SetStateAction, useState, useContext } from "react";
import AskRegisterBar from "../../components/Bar/AskRegisterBar";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { LOGIN } from "../../core/app-urls";
import { SubTitle } from "../../styles/Login";
import {
  ButtonRecover,
  Input,
  Label,
  MessageError,
  MessageSuccess,
  RecoverStyle,
  Title,
} from "../../styles/Recover";
import { AuthContext } from "../../contexts/auth";
import { AxiosError } from "axios";
import { CircularProgress } from "@mui/material";

export default function Recover() {
  const [emailInfo, setEmailInfo] = useState("");
  const [messageErr, setMessageErr] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [showSucc, setShowSucc] = useState(false);
  const [loading, setLoading] = useState(false);
  const { sendRecover } = useContext(AuthContext);

  async function sendEmail(email: string) {
    setLoading(true);
    setShowSucc(false);
    setShowErr(false);
    try {
      await sendRecover(email);
      console.log(email);
      setShowSucc(true);
      setMessageErr("Email enviado com sucesso!");
    } catch (error) {
      const e = (await error) as AxiosError;
      if (e.response) {
        const statusCode = e.response.status;
        if (statusCode === 400) {
          setMessageErr("Nenhum usuário encontrado");
          console.error("Erro 400: Requisição inválida");
          setShowErr(true);
        } else if (statusCode === 401) {
          setMessageErr("Token não está autorizado");
          console.error("Erro 401: Não autorizado");
          setShowErr(true);
        } else if (statusCode === 500) {
          setMessageErr("Erro ao enviar o email");
          console.error("Erro 500: Erro interno do servidor");
          setShowErr(true);
        }
      } else {
        console.error("Erro ao enviar email:", error);
      }
    }
    setLoading(false);
  }

  const handleEmailChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmailInfo(event.target.value);
  };

  return (
    <>
      <Header page="Login" redirect={LOGIN} />
      <RecoverStyle>
        <Title>Recuperar sua senha</Title>
        <SubTitle>
          Entendemos que lembrar todas suas senhas pode ser difícil.
        </SubTitle>
        <SubTitle>
          Para recuperar sua senha um link para recuperação deve ser enviado em
          seu e-mail.
        </SubTitle>
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="text"
          name="email"
          value={emailInfo}
          onChange={handleEmailChange}
        />

        { showErr &&
            <MessageError>{messageErr}</MessageError>}

        { showSucc &&
            <MessageSuccess>{messageErr}</MessageSuccess>}

        <ButtonRecover
          onClick={async () => {
            await sendEmail(emailInfo);
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Recuperar Senha'}
        </ButtonRecover>
      </RecoverStyle>
      <AskRegisterBar />
      <Footer />
    </>
  );
}
