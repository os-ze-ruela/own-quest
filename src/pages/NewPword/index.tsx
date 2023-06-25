import { SetStateAction, useContext, useEffect, useState } from "react";

import AskRegisterBar from "../../components/Bar/AskRegisterBar";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { LOGIN } from "../../core/app-urls";
import { SubTitle } from "../../styles/Login";
import {
  ButtonRecover,
  Input,
  Label,
  Label2,
  RecoverStyle,
  Title,
} from "../../styles/NewPword";
import { AuthContext } from "../../contexts/auth";
import { useLocation } from "react-router-dom";
import { MessageError, MessageSuccess } from "../../styles/Recover";

export default function NewPword() {
  const { resetPassword } = useContext(AuthContext);
  const [pswd, setPswd] = useState("");
  const [pswdConf, setPswdConf] = useState("");
  const [showError, setShowError] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [showErr, setShowErr] = useState(false);
  const [showSucc, setShowSucc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageErr, setMessageErr] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    const emailParam = params.get('email')
    setEmail(emailParam!)
    setToken(tokenParam!);
  }, [location]);

  const handlePswdChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPswd(event.target.value);
  };

  const handlePswdConf = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPswdConf(event.target.value);
  };

  async function compareAndSend(password: string, password2: string) {
    if (password === password2) {
      setLoading(true);
      setShowSucc(false);
      setShowErr(false);
      try {
        await resetPassword(email, token, password); 
        setShowSucc(true);
        setMessageErr("Senha alterada com sucesso!");
      } catch (error) {
        console.error(error);
        setShowError(true);
        
      }
    } else {
      setShowError(true);
      setMessageErr("As senhas não correspondem");
    }
  }

  return (
    <>
      <Header page="Login" redirect={LOGIN} />
      <RecoverStyle>
        <Title>Definir nova senha</Title>
        <SubTitle>
          Como você pediu, aqui você pode definir sua nova senha
        </SubTitle>
        <SubTitle>caso tenha requisitado a recuperação</SubTitle>
        <Label htmlFor="newpswd">Nova senha</Label>
        <Input
          type="password" 
          name="newpswd"
          value={pswd}
          onChange={handlePswdChange}
        />
        <Label2 htmlFor="confirmpswd">Confirmar nova senha</Label2>
        <Input
          type="password" 
          name="confirmpswd"
          value={pswdConf}
          onChange={handlePswdConf}
        />

        { showErr &&
            <MessageError>{messageErr}</MessageError>}

        { showSucc &&
            <MessageSuccess>{messageErr}</MessageSuccess>}

        <ButtonRecover
          onClick={async () => {
            await compareAndSend(pswd, pswdConf);
          }}
        >
          Redefinir Senha
        </ButtonRecover>
      </RecoverStyle>
      <AskRegisterBar />
      <Footer />
    </>
  );
}
