import { useContext, useEffect, useState } from "react";
import { AiOutlineHistory } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderLogged from "../../components/Header/HeaderLogged";
import EmailNotValidatedWarning from "../../components/Warning/EmailNotValidated";
import { AuthContext } from "../../contexts/auth";
import { GameContext } from "../../contexts/game";
import AppError from "../../core/app-error";
import { GAME_HISTORY } from "../../core/app-urls";
import { UserImagePlaceholder } from "../../styles/Header";
import {
  BtnCancel,
  BtnOpt,
  ButtonHist,
  CardGame,
  CardInfos,
  CardStatusInfos,
  CardSubInfos,
  CardTitle,
  EditButton,
  Email,
  HistoricTitle,
  LoginInfo,
  LoginTitle,
  Name,
  NameEmail,
  ProfileIdent,
  ProfileInfo,
  ProfileOpt,
  ProfileStyle,
  Separator,
  Text,
  Text2,
  Titles,
  TitlesInfo,
  UserImage,
  WrapCardGame,
  WrapTextButton,
  YourProfileTitle
} from "../../styles/Profile";


export default function Profile() {
  const { user, refresh, logout } = useContext(AuthContext);
  const { getUserPlayingAllGames, userPlayingAllGames } =
    useContext(GameContext);
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [playingGames, setPlayingGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    const tabNumber = tabParam ? parseInt(tabParam) : 1;
    setSelectedTab(tabNumber);
  }, [location.search]);

  const fetchGames = async () => {

    try {
      await Promise.all([getUserPlayingAllGames()]);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      const error = (await e) as AppError;
      if (error.statusCode === 401) {
        try {
          await refresh();
          await fetchGames();
        } catch (e) { }
      }
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleButtonClick = (buttonIndex: number) => {
    navigate(`/profile?tab=${buttonIndex}`);
    setSelectedTab(buttonIndex)
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <>
      <HeaderLogged nickname={user!.nickname} photo={user!.photo} />
      <ProfileStyle>
        <ProfileOpt>
          <ProfileIdent>
            {user!.photo == null ? (
              <UserImagePlaceholder>
                {user!.nickname[0].toUpperCase()}
              </UserImagePlaceholder>
            ) : (
              <UserImage src={user!.photo} alt="Perfil image" />
            )}
            <NameEmail>
              <Name>{user!.name}</Name>
              <Email>{user!.email}</Email>
            </NameEmail>
          </ProfileIdent>
          <BtnOpt
            onClick={() => handleButtonClick(1)}
            className={selectedTab === 1 ? "active" : ""}
          >
            <BiUserCircle />
            Sua conta
          </BtnOpt>
          <BtnOpt
            onClick={() => handleButtonClick(2)}
            className={selectedTab === 2 ? "active" : ""}
          >
            <MdOutlineLockPerson />
            Login e Segurança
          </BtnOpt>
          <BtnOpt
            onClick={() => handleButtonClick(3)}
            className={selectedTab === 3 ? "active" : ""}
          >
            <AiOutlineHistory />
            Histórico de jogos
          </BtnOpt>
          <BtnOpt onClick={handleLogoutClick}>
            <FiLogOut />
            Sair
          </BtnOpt>
        </ProfileOpt>
        {selectedTab === 1 && (
          <ProfileInfo>
            {user!.email_validated ? (
              <></>
            ) : (
              <>
                <EmailNotValidatedWarning />
              </>
            )}
            <YourProfileTitle>Sua conta</YourProfileTitle>
            <Separator />

            <WrapTextButton>
              <Text>
                <Titles>Nome</Titles>
                <TitlesInfo>{user!.name}</TitlesInfo>
              </Text>
              <EditButton>Editar</EditButton>
            </WrapTextButton>
            <Separator />

            <WrapTextButton>
              <Text>
                <Titles>Endereço de email</Titles>
              </Text>
              <EditButton>Editar</EditButton>
            </WrapTextButton>
            <Separator />

            <WrapTextButton>
              <Text>
                <Titles>Nickname</Titles>
                <TitlesInfo>{user!.nickname}</TitlesInfo>
              </Text>
              <EditButton>Editar</EditButton>
            </WrapTextButton>
            {/* <Separator />

            <Titles>Que uso você vai dar ao Own Quest?</Titles>
            <Select>
              <option>Selecione uma opção</option>
            </Select> */}
          </ProfileInfo>
        )}
        {selectedTab === 2 && (
          <LoginInfo>
            <LoginTitle>Login e Segurança</LoginTitle>
            <Separator />

            <WrapTextButton>
              <Text>
                <Titles>Senha</Titles>
                <TitlesInfo>Última atualização de senha: chevers/04</TitlesInfo>
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
        )}
        {selectedTab === 3 && (
          <WrapCardGame>
            <HistoricTitle>Histórico de Jogos</HistoricTitle>

            {userPlayingAllGames.map((listgame, index) => {
              const gameDate = new Date(listgame.game_date_play);
              const day = gameDate.getDate().toString().padStart(2, "0");
              const month = (gameDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const year = gameDate.getFullYear().toString();
              const formattedDate = `${day}/${month}/${year}`;

              return (
                <CardGame key={index}>
                  <CardInfos>
                    <CardTitle>{listgame.game.title}</CardTitle>
                    <CardSubInfos>Jogado em: {formattedDate}</CardSubInfos>
                    {/* <CardSubInfos>{listgame.game.createdBy!.name}</CardSubInfos> */}
                    <CardStatusInfos
                      status={
                        listgame.not_possible_continue
                          ? "Interrompido por nova versão"
                          : listgame.is_ongoing
                            ? "Em andamento"
                            : "Finalizado"
                      }
                    >
                      {listgame.not_possible_continue
                        ? "Interrompido por nova versão"
                        : listgame.is_ongoing
                          ? "Em andamento"
                          : "Finalizado"}
                    </CardStatusInfos>
                  </CardInfos>
                  <ButtonHist href={GAME_HISTORY + '/' + listgame.play_game_id} >Ver Histórico</ButtonHist>
                </CardGame>
              );
            })}
          </WrapCardGame>
        )}
      </ProfileStyle>
    </>
  );
}
