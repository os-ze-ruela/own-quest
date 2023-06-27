import { useContext, useEffect, useState } from "react";
import { AiOutlineHistory } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Drawer from "../../components/Drawer/Drawer";
import HeaderLogged from "../../components/Header/HeaderLogged";
import { AuthContext } from "../../contexts/auth";
import { GameContext } from "../../contexts/game";
import { UserContext } from "../../contexts/user";
import AppError from "../../core/app-error";
import { UserImagePlaceholder } from "../../styles/Header";
import {
  BtnOpt,
  Email,
  Name,
  NameEmail,
  ProfileIdent,
  ProfileOpt,
  ProfileStyle,
  UserImage
} from "../../styles/Profile";
import HistoricOfGamesTab from "./pages/HistoricOfGames";
import ProfileTab from "./pages/Profile";
import SecurityTab from "./pages/Security";


export default function Profile() {
  const { user, refresh, logout } = useContext(AuthContext);
  const { updateProfileInfo } = useContext(UserContext);
  const { getUserPlayingAllGames, userPlayingAllGames } =
    useContext(GameContext);
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [editinName, setEditingName] = useState(false);
  const [name, setName] = useState(user!.name);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
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
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleButtonClick = (buttonIndex: number) => {
    navigate(`/profile?tab=${buttonIndex}`);
    setSelectedTab(buttonIndex);
  };

  const handleLogoutClick = () => {
    logout();
  };

 

  const pages = [
    <ProfileTab/>,
    <SecurityTab/>,
    <HistoricOfGamesTab/>
  ]

  return (
    <>
      <Drawer />
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
        {pages[selectedTab-1]}
      </ProfileStyle>
    </>
  );
}
