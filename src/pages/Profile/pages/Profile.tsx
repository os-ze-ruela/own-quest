import { useContext } from "react";
import EmailNotValidatedWarning from "../../../components/Warning/EmailNotValidated";
import { AuthContext } from "../../../contexts/auth";
import { EditButton, ProfileInfo, Separator, Text, Titles, TitlesInfo, WrapTextButton, YourProfileTitle } from "../../../styles/Profile";

export default function ProfileTab() {


    const { user } = useContext(AuthContext);

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
                    <TitlesInfo>{user!.name}</TitlesInfo>
                </Text>
                <EditButton>Editar</EditButton>
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
                    <TitlesInfo>@{user!.nickname}</TitlesInfo>
                </Text>
                <EditButton>Editar</EditButton>
            </WrapTextButton>
            {/* <Separator />

            <Titles>Que uso você vai dar ao Own Quest?</Titles>
            <Select>
              <option>Selecione uma opção</option>
            </Select> */}
        </ProfileInfo>
    );
}