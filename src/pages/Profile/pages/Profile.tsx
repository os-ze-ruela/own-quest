import { useContext, useState } from "react";
import EmailNotValidatedWarning from "../../../components/Warning/EmailNotValidated";
import { AuthContext } from "../../../contexts/auth";
import {
  EditButton,
  InputChange,
  ProfileInfo,
  Separator,
  Text,
  Titles,
  TitlesInfo,
  WrapTextButton,
  YourProfileTitle,
} from "../../../styles/Profile";
import { UserContext } from "../../../contexts/user";

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
        await updateProfileInfo(userId.toString(), newName, newNickname)
        setEditingName(false)
    }catch(e){
        console.log("Erro")
    }
  }

  const handleSaveNickname = async () => {
    try{
        await updateProfileInfo(userId.toString(), newName, newNickname)
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
            <TitlesInfo>{user!.name}</TitlesInfo>
          )}
        </Text>
        {editingName ? (
          <EditButton onClick={() => handleSaveName()}>Salvar</EditButton>
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
            <TitlesInfo>@{user!.nickname}</TitlesInfo>
          )}
        </Text>
        {editingNickname ? (
          <EditButton onClick={() => handleSaveNickname()}>Salvar</EditButton>
        ) : (
          <EditButton onClick={() => setEditingNickname(true)}>
            Editar
          </EditButton>
        )}
      </WrapTextButton>
    </ProfileInfo>
  );
}
