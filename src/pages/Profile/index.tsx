import { useContext, useState } from 'react';
import { BiUserCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import HeaderLogged from "../../components/Header/HeaderLogged";
import EmailNotValidatedWarning from '../../components/Warning/EmailNotValidated';
import { AuthContext } from '../../contexts/auth';
import { UserImagePlaceholder } from '../../styles/Header';
import {
    BtnCancel, BtnOpt, EditButton, Email, LoginInfo, LoginTitle,
    Name, NameEmail, ProfileIdent, ProfileInfo, ProfileOpt, ProfileStyle, Select, Separator, Text, Text2, Titles, TitlesInfo, UserImage, WrapTextButton, YourProfileTitle
} from "../../styles/Profile";

export default function Profile() {

    const { user, logout } = useContext(AuthContext)

    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        if (!isSelected) {
            setIsSelected(!isSelected);
        }
    }

    const handleLogoutClick = () => {
        logout()
    }

    const handleClick2 = () => {
        if (isSelected) {
            setIsSelected(!isSelected);
        }
    }

    return (
        <>
            <HeaderLogged nickname={user!.nickname} photo={user!.photo} />
            <ProfileStyle>
                <ProfileOpt>
                    <ProfileIdent>
                        {user!.photo == null ? (
                            <UserImagePlaceholder>
                                {user!.nickname[0].toUpperCase()}
                            </UserImagePlaceholder>
                        ) : (
                            <UserImage src={user!.photo} alt="Perfil image" />
                        )}
                        <NameEmail>
                            <Name>{user!.name}</Name>
                            <Email>{user!.email}</Email>
                        </NameEmail>
                    </ProfileIdent>
                    <BtnOpt onClick={handleClick2}><BiUserCircle />Sua conta</BtnOpt>
                    <BtnOpt onClick={handleClick}><MdOutlineLockPerson />Login e Segurança</BtnOpt>
                    <BtnOpt onClick={handleLogoutClick}><FiLogOut />Deslogar</BtnOpt>
                </ProfileOpt>
                {!isSelected ?
                    <ProfileInfo>
                        {user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
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
                            <EditButton>Editar</EditButton>
                        </WrapTextButton>
                        <Separator />

                        <WrapTextButton>
                            <Text>
                                <Titles>Nickname</Titles>
                                <TitlesInfo>{user!.nickname}</TitlesInfo>
                            </Text>
                            <EditButton>Editar</EditButton>
                        </WrapTextButton>
                        <Separator />

                        <Titles>Que uso você vai dar ao Own Quest?</Titles>
                        <Select>
                            <option>Selecione uma opção</option>
                        </Select>
                    </ProfileInfo>


                    :
                    <LoginInfo>
                        <LoginTitle>Login e Segurança</LoginTitle>
                        <Separator />

                        <WrapTextButton>
                            <Text>
                                <Titles>Senha</Titles>
                                <TitlesInfo>Última atualização de senha: chevers/04</TitlesInfo>
                            </Text>
                            <EditButton>Atualizar</EditButton>
                        </WrapTextButton>
                        <Separator />

                        <Text2>
                            <Titles>Escluir sua conta</Titles>
                            <TitlesInfo>Ao excluir sua conta, você não poderá mais acessar suas histórias criadas,
                                nem mesmo sua conta.</TitlesInfo>
                        </Text2>
                        <BtnCancel>Exlcuir conta</BtnCancel>
                    </LoginInfo>


                }
            </ProfileStyle>
        </>

    )
}