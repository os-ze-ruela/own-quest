import { BtnCancel, EditButton, LoginInfo, LoginTitle, Separator, Text, Text2, Titles, TitlesInfo, WrapTextButton } from "../../../styles/Profile";

export default function SecurityTab() {

    return (
        <LoginInfo>
            <LoginTitle>Login e Segurança</LoginTitle>
            <Separator />

            <WrapTextButton>
                <Text>
                    <Titles>Atualizar Senha</Titles>
                    {/* <TitlesInfo>Última atualização de senha: chevers/04</TitlesInfo> */}
                </Text>
                <EditButton>Atualizar</EditButton>
            </WrapTextButton>
            <Separator />

            <Text2>
                <Titles>Excluir sua conta</Titles>
                <TitlesInfo>
                    Ao excluir sua conta, você não poderá mais acessar suas
                    histórias criadas, nem mesmo sua conta.
                </TitlesInfo>
            </Text2>
            <BtnCancel>Excluir conta</BtnCancel>
        </LoginInfo>
    );
}