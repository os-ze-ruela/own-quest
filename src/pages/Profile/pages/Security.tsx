import { useState, useContext } from "react";
import { BtnCancel, EditButton, LoginInfo, LoginTitle, Separator, Text, Text2, Titles, TitlesInfo, WrapTextButton, ConfirmationDialog, DialogButtons } from "../../../styles/Profile";
import { UserContext } from "../../../contexts/user";
import { AuthContext } from "../../../contexts/auth";

export default function SecurityTab() {
  const { user } = useContext(AuthContext);
  const { deleteUser } = useContext(UserContext);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleDeleteAccount = () => {
    setShowConfirmationDialog(true);
  };

  const handleConfirmDelete = () => {
    try{
        deleteUser(user!.id.toString())
        setShowConfirmationDialog(false);
    }catch(e){
        console.error("Erro ao excluir a conta:", e);
        setShowConfirmationDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmationDialog(false);
  };


  return (
    <LoginInfo>
      <LoginTitle>Login e Segurança</LoginTitle>
      <Separator />

      <WrapTextButton>
        <Text>
          <Titles>Atualizar Senha</Titles>
        </Text>
        <EditButton>Atualizar</EditButton>
      </WrapTextButton>
      <Separator />

      <Text2>
        <Titles>Excluir sua conta</Titles>
        <TitlesInfo>
          Ao excluir sua conta, você não poderá mais acessar suas histórias criadas, nem mesmo sua conta.
        </TitlesInfo>
      </Text2>
      <BtnCancel onClick={handleDeleteAccount}>Excluir conta</BtnCancel>

      {showConfirmationDialog && (
        <ConfirmationDialog>
          Tem certeza que deseja excluir sua conta?
          <DialogButtons>
            <button onClick={handleConfirmDelete}>Confirmar</button>
            <button onClick={handleCancelDelete}>Cancelar</button>
          </DialogButtons>
        </ConfirmationDialog>
      )}
    </LoginInfo>
  );
}
