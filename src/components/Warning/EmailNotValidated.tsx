import { useContext, useState } from "react"
import { EmailNotValidatedBody } from "../../styles/EmailNotValidated"
import { AuthContext } from "../../contexts/auth"
import AppError from "../../core/app-error";
import { Snackbar, Alert } from '@mui/material';

function EmailNotValidatedWarning() {
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

    return (
        <EmailNotValidatedBody>
           <p>Sua conta ainda não foi verificada. <a onClick={async () => {await resendEmail()}}>Clique aqui</a> para reenviar o e-mail de verificação.</p>
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
        </EmailNotValidatedBody>
    )
}

export default EmailNotValidatedWarning