import React, { useContext, useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { SubTitle } from '../../styles/Login'
import { FaUnlock } from "react-icons/fa";
import { Bar, BarTitle, ButtonSend, Title, ValidateStyle } from '../../styles/Validated'
import { AuthContext } from '../../contexts/auth';
import { HOME } from '../../core/app-urls';



export default function Validated(){

    const { validateEmail } = useContext(AuthContext)

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        const token = searchParams.get("token");
        const access_token = searchParams.get("access_token");

        console.log(token,access_token);
        
        validateEmail(access_token!, token!)
    }, [])

    return(
        <>
            <Header page='Minha conta' redirect=''/>
            <ValidateStyle>
                <Title>Seu e-mail foi verificado com sucesso</Title>
                <SubTitle>Agora você pode criar milhares de histórias e compartilhar com seus amigos!</SubTitle> 
                <SubTitle>Seu e-mail foi validado e você não irá precisar passar mais por esse processo para</SubTitle>
                <SubTitle>acessar a sua conta novamente!</SubTitle>
                <ButtonSend href={HOME}>Continuar na plataforma</ButtonSend>
            </ValidateStyle>
            <Bar>
                <BarTitle>Seu acesso à criação e visualização de histórias foi garantido! <FaUnlock/> </BarTitle>
            </Bar>
            <Footer/>
        </>
    )
}