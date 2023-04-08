import LOGOIF from "../../assets/img/logo_if.png";
import { FooterStyle, ImgStyle, LinksDiv, LinkText, LinkTitle } from '../../styles/Footer';


function Footer() {
    return (
        <FooterStyle>
            <ImgStyle src={LOGOIF} alt="Logo" />
            <LinksDiv>
                <LinkTitle>REDES SOCIAIS</LinkTitle>
                <LinkText>Instagram</LinkText>
                <LinkText>Whatsapp</LinkText>
                <LinkText>(11)94350-6431</LinkText>
            </LinksDiv>
            <LinksDiv>
                <LinkTitle>CONTATO</LinkTitle>
                <LinkText>Rua Pedro Cavalo,</LinkText>
                <LinkText>Birigui-SP</LinkText>
            </LinksDiv>
        </FooterStyle>
    )
}

export default Footer