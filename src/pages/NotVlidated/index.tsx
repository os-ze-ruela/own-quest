import React, { useContext,useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { FaLock } from "react-icons/fa";
import { Bar, BarTitle, ButtonSend, Title, SubTitle, ValidateStyle } from '../../styles/NotValidated'
import { AuthContext } from '../../contexts/auth';
import { HOME } from '../../core/app-urls';
import AppError from '../../core/app-error';
import { Snackbar, Alert } from '@mui/material';




export default function NotValidated(){
    const { sendValidateEmail } = useContext(AuthContext)
    const [ alert, setAlert ] = useState(false)
    const [ typeAlert, setTypeAlert ] = useState(0)
    const [ alertMessage, setAlertMessage ] = useState('')

    async function resendEmail() {
        try {
            await sendValidateEmail()
            setAlertMessage('E-mail enviado com sucesso.')
            setTypeAlert(1)
        } catch(e) {
            const error = await e as AppError
            setAlertMessage(error.message)
            setTypeAlert(2)
        }
        setAlert(true)

    }

    const handleCloseAlert = () => {
        setAlert(false)
        setTypeAlert(0)
        setAlertMessage('')
      };

    return(
        <>
            <Header page='Minha conta' redirect=''/>
            <ValidateStyle>
                <Title>Valide sua conta!</Title>
                <SubTitle>Meus parabéns! você acaba de criar uma conta no Own Quest.</SubTitle>
                <SubTitle>Para começar a criar suas histórias com Own Quest é necessário validar seu e-mail.</SubTitle>
                <SubTitle>O link foi enviado em seu e-mail e tem validade de 24 horas.</SubTitle>
                <SubTitle>Caso não tenha recebido o e-mail. <a onClick={async () => {await resendEmail()}}>Clique aqui</a> para reenviar o e-mail de verificação.</SubTitle>
                <ButtonSend href={HOME}>Continuar na plataforma</ButtonSend>
                { typeAlert === 1 &&
                <Snackbar open={alert} autoHideDuration={4000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{ backgroundColor:'#ffc341', color: 'black', width: '100%'}}>
                        {alertMessage}
                    </Alert>
                </Snackbar> }
                { typeAlert === 2 &&
                <Snackbar open={alert} autoHideDuration={4000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="error" sx={{ backgroundColor:'#ffc341', color: 'black', width: '100%'}}>
                        {alertMessage}
                    </Alert>
                </Snackbar> }
            </ValidateStyle>
            <Bar>
                <BarTitle>Falta pouco para ter acesso a um mundo de histórias incríveis! <FaLock/> </BarTitle>
            </Bar>
            <Footer/>
        </>
    )
}