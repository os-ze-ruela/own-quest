import { SetStateAction, useState } from "react";
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

export default function NewPword() {
  const [pswd, setPswd] = useState("");
  const [pswdConf, setPswdConf] = useState("");
  const [showError, setShowError] = useState(false);

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
    if(password === password2){
        console.log("igual")
        console.log(password)
        console.log(password2)
    }else{
        console.log("dif")
        console.log(password)
        console.log(password2)
        setShowError(true)
        //Mostrar um erro na tela
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
          type="text"
          name="newpswd"
          value={pswd}
          onChange={handlePswdChange}
        />
        <Label2 htmlFor="confirmpswd">Confirmar nova senha</Label2>
        <Input
          type="text"
          name="confirmpswd"
          value={pswdConf}
          onChange={handlePswdConf}
        />
        <ButtonRecover
          onClick={async () => {
            await compareAndSend(pswd, pswdConf);
          }}
        >
          Definir Senha
        </ButtonRecover>
      </RecoverStyle>
      <AskRegisterBar />
      <Footer />
    </>
  );
}
