import HeaderLogged from "../../components/Header/HeaderLogged";
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { MdOutlineLockPerson } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { BtnCancel, BtnOpt, EditButton, Email, LoginInfo, LoginTitle, 
Name, NameEmail, ProfileIdent, ProfileInfo, ProfileOpt, ProfileStyle, Select, Separator, Text, Text2, Titles, TitlesInfo, UserImage, WrapTextButton, YourProfileTitle } from "../../styles/Profile";

export default function Profile(){

    const { user } = useContext(AuthContext)

    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () =>{
        if(!isSelected){
            setIsSelected(!isSelected);
        }
    }

    const handleClick2 = () =>{
        if(isSelected){
            setIsSelected(!isSelected);
        }
    }

    return(
        <>
            <HeaderLogged nickname={user.nickname} img={"https://100k-faces.glitch.me/random-image"} />
            <ProfileStyle>
                <ProfileOpt>
                    <ProfileIdent>
                        <UserImage src={user.img} alt="Perfil image" />
                        <NameEmail>
                            <Name>{user.name}</Name>
                            <Email>{user.email}</Email>
                        </NameEmail>
                    </ProfileIdent>
                    <BtnOpt onClick={handleClick2}><BiUserCircle/>Sua conta</BtnOpt>
                    <BtnOpt onClick={handleClick}><MdOutlineLockPerson/>Login e Segurança</BtnOpt>
                </ProfileOpt>
                {!isSelected?
                
                <ProfileInfo>
                <YourProfileTitle>Sua conta</YourProfileTitle>
                <Separator/>

                <WrapTextButton>
                    <Text>
                        <Titles>Nome</Titles>
                        <TitlesInfo>{user.name}</TitlesInfo>
                    </Text>
                    <EditButton>Editar</EditButton>
                </WrapTextButton>
                <Separator/>
                
                <WrapTextButton>
                    <Text>
                        <Titles>Endereço de email</Titles>
                        <TitlesInfo>{user.email}</TitlesInfo>
                    </Text>
                    <EditButton>Editar</EditButton>
                </WrapTextButton>
                <Separator/>

                <WrapTextButton>
                    <Text>
                        <Titles>Nickname</Titles>
                        <TitlesInfo>{user.nickname}</TitlesInfo>
                    </Text>
                    <EditButton>Editar</EditButton>
                </WrapTextButton>
                <Separator/>

                <Titles>Que uso você vai dar ao Own Quest?</Titles>
                <Select>
                    <option>Selecione uma opção</option>
                </Select>
            </ProfileInfo>


                :
                <LoginInfo>
                <LoginTitle>Login e Segurança</LoginTitle>
                <Separator/>

                <WrapTextButton>
                    <Text>
                        <Titles>Senha</Titles>
                        <TitlesInfo>Última atualização de senha: chevers/04</TitlesInfo>
                    </Text>
                    <EditButton>Atualizar</EditButton>
                </WrapTextButton>
                <Separator/>

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