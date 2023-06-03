import { useContext, useState, useEffect } from "react";
import { BiUserCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import HeaderLogged from "../../components/Header/HeaderLogged";
import EmailNotValidatedWarning from "../../components/Warning/EmailNotValidated";
import { AuthContext } from "../../contexts/auth";
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
  Select,
  Separator,
  Text,
  Text2,
  Titles,
  TitlesInfo,
  UserImage,
  WrapCardGame,
  WrapTextButton,
  YourProfileTitle,
} from "../../styles/Profile";
import { AiOutlineHistory } from "react-icons/ai";
import { GameContext } from "../../contexts/game";
import AppError from "../../core/app-error";

export default function Profile() {
  const { user, refresh, logout } = useContext(AuthContext);
  const { getUserPlayingGames, userPlayingGames } = useContext(GameContext);
  const [isSelected1, setIsSelected1] = useState(true);
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const [playingGames, setPlayingGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGames = async () => {
    try {
      await Promise.all([getUserPlayingGames()]);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      const error = (await e) as AppError;
      if (error.statusCode === 401) {
        try {
          await refresh();
          await fetchGames();
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleButtonClick = (buttonIndex: number) => {
    setActiveButton(buttonIndex);
    if (buttonIndex === 1) {
      setIsSelected1(true);
      setIsSelected2(false);
      setIsSelected3(false);
    } else if (buttonIndex === 2) {
      setIsSelected1(false);
      setIsSelected2(true);
      setIsSelected3(false);
    } else {
      setIsSelected1(false);
      setIsSelected2(false);
      setIsSelected3(true);
    }
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
            className={activeButton === 1 ? "active" : ""}
          >
            <BiUserCircle />
            Sua conta
          </BtnOpt>
          <BtnOpt
            onClick={() => handleButtonClick(2)}
            className={activeButton === 2 ? "active" : ""}
          >
            <MdOutlineLockPerson />
            Login e Segurança
          </BtnOpt>
          <BtnOpt
            onClick={() => handleButtonClick(3)}
            className={activeButton === 3 ? "active" : ""}
          >
            <AiOutlineHistory />
            Histórico de jogos
          </BtnOpt>
          <BtnOpt onClick={handleLogoutClick}>
            <FiLogOut />
            Sair
          </BtnOpt>
        </ProfileOpt>
        {isSelected1 && (
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
            <Separator />

            <Titles>Que uso você vai dar ao Own Quest?</Titles>
            <Select>
              <option>Selecione uma opção</option>
            </Select>
          </ProfileInfo>
        )}
        {isSelected2 && (
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
        {isSelected3 && (
          <WrapCardGame>
            <HistoricTitle>Histórico de Jogos</HistoricTitle>

            {userPlayingGames.map((listgame, index) => {
              const gameDate = new Date(listgame.game_date_play);
              const day = gameDate.getDate().toString().padStart(2, '0');
              const month = (gameDate.getMonth() + 1).toString().padStart(2, '0');
              const year = gameDate.getFullYear().toString();
              const formattedDate = `${day}/${month}/${year}`;

              return (
                <CardGame key={index}>
                  <CardInfos>
                    <CardTitle>{listgame.game.title}</CardTitle>
                    <CardSubInfos>Jogado em: {formattedDate}</CardSubInfos>
                    {/* <CardSubInfos>{listgame.game.createdBy!.name}</CardSubInfos> */}
                    <CardStatusInfos status="Em andamento">
                    {listgame.is_ongoing ? 'Em andamento' : 'Finalizado'}
                    </CardStatusInfos>
                  </CardInfos>
                  <ButtonHist>Ver Histórico</ButtonHist>
                </CardGame>
              );
            })}
          </WrapCardGame>
        )}
      </ProfileStyle>
    </>
  );
}
