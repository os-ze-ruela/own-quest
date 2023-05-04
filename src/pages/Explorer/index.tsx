import { useContext, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import nextIcon from '../../assets/img/next-icon.svg';
import CardMostViewGame from '../../components/Cards/CardMostViewGame';
import Header from '../../components/Header/Header';
import HeaderLogged from '../../components/Header/HeaderLogged';
import EmailNotValidatedWarning from '../../components/Warning/EmailNotValidated';
import { AuthContext } from '../../contexts/auth';
import { GameContext } from '../../contexts/game';
import AppError from '../../core/app-error';
import { LOGIN } from '../../core/app-urls';
import { ExplorerMain, FiltersContainer, GameListContainer, ListGamesCardContainer, PaginationContainer, SearchContainer, SearchInput, TitleListGames } from "../../styles/Explorer";


const Explorer = () => {

  const { authenticated, user, refresh, logout } = useContext(AuthContext)
  const { games, getHotGamesForHome } = useContext(GameContext)

  const fetchGames = async () => {
    try {
      await Promise.all([getHotGamesForHome()]);
    } catch (e) {
      const error = await e as AppError
      if (error.statusCode === 401) {
        try {
          await refresh()
          await fetchGames()
        } catch (e) {
          logout()
        }
      }
    }
  };

  useEffect(() => {
    fetchGames()
  }, [])

  return (
    <ExplorerMain>
      {authenticated ?
        (<HeaderLogged nickname={user!.nickname} photo={user!.photo} />) :
        (<Header page='Login' redirect={LOGIN} />)
      }
      {authenticated && user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
      <FiltersContainer>
        <SearchContainer>
          <BsSearch className='search-icon' />
          <SearchInput type='text' id='search' name='search' placeholder='Procurar Jogos' />
        </SearchContainer>
      </FiltersContainer>
      <GameListContainer>
        <TitleListGames>Histórias mais Jogadas</TitleListGames>
        <ListGamesCardContainer>
          {games.map((game, index) => (
            <CardMostViewGame
              key={index}
              title={game.title}
              imageSrc={`https://picsum.photos/300/200?random=5}`}
              description={game.description}
              categories={game.categories}
              createdByNickname={game.createdBy!.nickname}
            />
          ))}
        <PaginationContainer>
          <img src={nextIcon} alt="next games" className='nextIcon' />
        </PaginationContainer>
        </ListGamesCardContainer>
      </GameListContainer>
    </ExplorerMain>
  );

};

export default Explorer;
