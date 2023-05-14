import { SetStateAction, useState, useEffect, useContext } from "react";
import AskRegisterBar from "../../components/Bar/AskRegisterBar";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { LOGIN } from "../../core/app-urls";
import { SubTitle } from "../../styles/Login";
import {
  ButtonRecover,
  Input,
  Label,
  RecoverStyle,
  Title,
} from "../../styles/Recover";
import axios from "axios";
import { AuthContext } from "../../contexts/auth";

export default function Recover() {
  const [emailInfo, setEmailInfo] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { sendRecover } = useContext(AuthContext);

  async function sendEmail(email: string) {
    try {
      await sendRecover(email);
      console.log(email)
    } catch (e) {
      alert("ERRO AO ENVIAR E-MAIL.");
    }
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
        <ButtonRecover
          onClick={async () => {
            await sendEmail(emailInfo);
          }}
        >
          Recuperar Senha
        </ButtonRecover>
      </RecoverStyle>
      <AskRegisterBar />
      <Footer />
    </>
  );
}
