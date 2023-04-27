import AskRegisterBar from '../../components/Bar/AskRegisterBar'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { LOGIN } from '../../core/app-urls'
import { SubTitle } from '../../styles/Login'
import { ButtonRecover, Input, Label, RecoverStyle, Title } from '../../styles/Recover'



export default function Recover(){
    return(
        <>
            <Header page='Login' redirect={LOGIN}/>
            <RecoverStyle>
                <Title>Recuperar sua senha</Title>
                <SubTitle>Entendemos que lembrar todas suas senhas pode ser difícil.</SubTitle>
                <SubTitle>Para recuperar sua senha um link para recuperação deve ser enviado em seu e-mail.</SubTitle>
                <Label htmlFor='email'>E-mail</Label>
                <Input
                    type="text"
                    name="email"
                    value=''
                />
                <ButtonRecover>Recuperar Senha</ButtonRecover>
            </RecoverStyle>
            <AskRegisterBar/>
            <Footer/>
        </>
    )
}