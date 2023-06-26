import { useContext, useState } from "react";
import EmailNotValidatedWarning from "../../../components/Warning/EmailNotValidated";
import { AuthContext } from "../../../contexts/auth";
import { UserContext } from "../../../contexts/user";
import {
  EditButton,
  InputChange,
  ProfileInfo,
  Separator,
  Text,
  Titles,
  TitlesInfo,
  WrapButtons,
  WrapTextButton,
  YourProfileTitle,
} from "../../../styles/Profile";

export default function ProfileTab() {
  const [editingName, setEditingName] = useState(false);
  const [editingNickname, setEditingNickname] = useState(false);
  const { user } = useContext(AuthContext);
  const { updateProfileInfo } = useContext(UserContext);
  const [newName, setNewName] = useState(user!.name);
  const [newNickname, setNewNickname] = useState(user!.nickname);
  const [userId, setUserId] = useState(user!.id);

  const handleSaveName = async () => {
    try{
        await updateProfileInfo(userId, newName, newNickname)
        setEditingName(false)
    }catch(e){
        console.log("Erro")
    }
  }

  const handleSaveNickname = async () => {
    try{
        await updateProfileInfo(userId, newName, newNickname)
        setEditingNickname(false)
    }catch(e){
        console.log("Erro")
    }
  }

  return (
    <ProfileInfo>
      {user!.email_validated ? (
        <></>
      ) : (
        <>
          <EmailNotValidatedWarning />
        </>
      )}
      <YourProfileTitle>Sua conta</YourProfileTitle>
      <Separator />

      <WrapTextButton>
        <Text>
          <Titles>Nome</Titles>
          {editingName ? (
            <InputChange
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          ) : (
            <TitlesInfo>{newName}</TitlesInfo>
          )}
        </Text>
        {editingName ? (
            <WrapButtons>
                <EditButton onClick={() => handleSaveName()}>Salvar</EditButton>
                <EditButton onClick={() => setEditingName(false)}>Cancelar</EditButton>
            </WrapButtons>
            
        ) : (
            <EditButton onClick={() => setEditingName(true)}>Editar</EditButton>
           
        )}
      </WrapTextButton>
      <Separator />

      <WrapTextButton>
        <Text>
          <Titles>Endereço de email</Titles>
          <TitlesInfo>{user!.email}</TitlesInfo>
        </Text>
      </WrapTextButton>
      <Separator />

      <WrapTextButton>
        <Text>
          <Titles>Nickname</Titles>
          {editingNickname ? (
            <InputChange
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
          ) : (
            <TitlesInfo>@{newNickname}</TitlesInfo>
          )}
        </Text>
        {editingNickname ? (
          <WrapButtons>
              <EditButton onClick={() => handleSaveNickname()}>Salvar</EditButton>
              <EditButton onClick={() => setEditingNickname(false)}>Cancelar</EditButton>
          </WrapButtons>
        ) : (
          <EditButton onClick={() => setEditingNickname(true)}>
            Editar
          </EditButton>
        )}
      </WrapTextButton>
    </ProfileInfo>
  );
}
