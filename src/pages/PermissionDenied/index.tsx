import { useContext} from 'react';
import { FaLock } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { HOME } from "../../core/app-urls";
import { Bar, BarTitle, ButtonSend, DeniedStyle, SubTitle, Title } from "../../styles/PermissionDenied";
import HeaderLogged from "../../components/Header/HeaderLogged";
import { AuthContext } from "../../contexts/auth";

export default function PermissionDenied(){

    const { user } = useContext(AuthContext);
    return(
        <>
            <HeaderLogged nickname={user!.nickname} photo={user!.photo} />
            <DeniedStyle>
                <Title>Você não tem permissão para acessar essa página.</Title>
                <SubTitle>A página acessada é privada de outro usuário.</SubTitle> 
                <SubTitle>Páginas de criação e de configuração de histórias são privadas a cada usuário.</SubTitle>
                <ButtonSend href={HOME}>Ir para a página inicial</ButtonSend>
            </DeniedStyle>
            <Bar>
                <BarTitle>Permissão negada nesta página! <FaLock/> </BarTitle>
            </Bar>
            <Footer/>
        </>
    )
}