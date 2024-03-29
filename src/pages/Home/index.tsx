import ASTRO_HOME from "../../assets/img/astronauta-home.png";
import CHECK from "../../assets/img/check.svg";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { LOGIN, REGISTER } from "../../core/app-urls";
import { BannerInfo, FunctionItem, HomeActionButton, HomeDiv, ImgAstroHome, ListOfFuncs, MainContent, MainInfos } from "../../styles/Home";


import ASTRO_CONVERSANDO from "../../assets/img/astronauta-conversando 1.svg";
import ASTRO_PC from "../../assets/img/astronauta-pc.svg";
import ASTRO_LAPIS from "../../assets/img/astrounauta-lapis.svg";

export default function Home() {
    return (
        <HomeDiv>
            <Header page='Login' redirect={LOGIN} />
            <MainContent id="main">
                <MainInfos>
                    <h1>
                        Faça suas<br />
                        histórias.
                    </h1>
                    <p>
                        A Own Quest é uma plataforma de criação de histórias personalizadas jogáveis onde você determina os caminhos possíveis para alcançar diferentes finais.
                    </p>
                    <ul>
                        <li>
                            <img src={CHECK} alt="check" />
                            <p>Múltiplos Caminhos</p>
                        </li>
                        <li>
                            <img src={CHECK} alt="check" />
                            <p>Histórias da comunidade</p>
                        </li>
                        <li>
                            <img src={CHECK} alt="check" />
                            <p>Compartilhe com seus amigos</p>
                        </li>
                        <li>
                            <img src={CHECK} alt="check" />
                            <p>Simule situações reais</p>
                        </li>
                    </ul>
                </MainInfos>
                <ImgAstroHome src={ASTRO_HOME} />
            </MainContent>
            <BannerInfo>
                <p>
                    Mais de 150 histórias<br />
                    diferentes para jogar.
                </p>
            </BannerInfo>
            <section id="functions">
                <ListOfFuncs>
                    <FunctionItem>
                        <div>
                            <h3>Diga olá a um novo jeito de criar histórias customizáveis</h3>
                            <p>Com o sistema de criação de histórias, você pode personalizar, adicionar e colocar a quantidade que quiser de caminhos para a sua história</p>
                            <HomeActionButton href={REGISTER}>Comece a criar histórias</HomeActionButton>
                        </div>
                        <div className="img-example" >
                            <img src={ASTRO_LAPIS} alt="" />
                        </div>
                    </FunctionItem>
                    <FunctionItem flexDirection="row-reverse">
                        <div>
                            <h3>Compartilhe para os seus amigos jogarem</h3>
                            <p>Com um link personalizado que é gerado, você pode enviar e permitir com que as pessoas joguem e avaliem a sua história criado</p>
                            <HomeActionButton href={REGISTER}>Comece a criar histórias </HomeActionButton>
                        </div>
                        <div className="img-example" >

                            <img src={ASTRO_CONVERSANDO} alt="" />
                        </div>
                    </FunctionItem>
                    <FunctionItem>
                        <div>
                            <h3>Mais de 10 categorias diferentes para você jogar</h3>
                            <p>Terror, drama, aventura e diversão, todos esses são algumas das mais de 10 categorias de jogos dentro da plataforma</p>
                            <HomeActionButton href={REGISTER}>Escolha uma categoria</HomeActionButton>
                        </div>
                        <div className="img-example">

                            <img src={ASTRO_PC} alt="" />
                        </div>
                    </FunctionItem>
                </ListOfFuncs>
            </section>
            <BannerInfo>
                <p>
                    Seja bem-vindo a um novo jeito<br />
                    de criar histórias.
                </p>
                <HomeActionButton href={REGISTER} >Crie sua conta grátis agora!</HomeActionButton>
            </BannerInfo>
            <Footer />
        </HomeDiv>
    )
}