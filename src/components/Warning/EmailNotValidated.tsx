import { EMAIL_NOT_VALIDATED } from "../../core/app-urls"
import { EmailNotValidatedBody } from "../../styles/EmailNotValidated"

function EmailNotValidatedWarning() {

    return (
        <EmailNotValidatedBody>
           <p>Sua conta ainda não foi verificada. <a href={EMAIL_NOT_VALIDATED}>Clique aqui</a> para verificar.</p>
        </EmailNotValidatedBody>
    )
}

export default EmailNotValidatedWarning