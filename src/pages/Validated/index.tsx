import { useContext, useEffect, useState } from 'react';
import { FaLock, FaUnlock } from "react-icons/fa";
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { AuthContext } from '../../contexts/auth';
import { HOME } from '../../core/app-urls';
import { Bar, BarTitle, ButtonSend, Title, SubTitle, ValidateStyle } from '../../styles/Validated';
import AppError from '../../core/app-error';



export default function Validated(){

    const { validateEmail } = useContext(AuthContext)
    const [validated, setValidated] = useState(false)
    const [messageError, setMessageError] = useState('')
    

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        const token = searchParams.get("token");
        const access_token = searchParams.get("access_token");
        
        emailValidating(token!, access_token!)
    }, [])

    async function emailValidating(token: string, access_token: string): Promise<void> {
        try{
            await validateEmail(access_token!, token!)
            setValidated(true)
        } catch(e) {
            const error = (await e) as AppError
            setMessageError(error.message)
            setValidated(false)
        }
    }

    return(
        <>
            <Header page='Minha conta' redirect=''/>
            {validated ? 
                <>
                <ValidateStyle>
                    <Title>Seu e-mail foi verificado com sucesso</Title>
                    <SubTitle>Agora você pode criar milhares de histórias e compartilhar com seus amigos!<br/>
                    Seu e-mail foi validado e você não irá precisar passar mais por esse processo para<br/>
                    acessar a sua conta novamente!</SubTitle>
                    <ButtonSend href={HOME}>Continuar na plataforma</ButtonSend>
                </ValidateStyle>
                <Bar>
                    <BarTitle>Seu acesso à criação e visualização de histórias foi garantido! <FaUnlock/> </BarTitle>
                </Bar>
                </>
                
                :
                
                <>
                <ValidateStyle>
                    <Title>Erro ao verificar o E-mail</Title>
                    <SubTitle>Ocorreu um erro ao verificar o seu e-mail<br/>
                    Verifique se o link de verificação ainda é válido.<br/>
                    Erro: {messageError}</SubTitle>
                    <ButtonSend href={HOME}>Continuar na plataforma</ButtonSend>
                </ValidateStyle>
                <Bar>
                    <BarTitle>Falta pouco para ter acesso a um mundo de histórias incríveis! <FaLock/> </BarTitle>
                </Bar>
                </>
            }
            <Footer/>
        </>
    )
}