import { useContext, useEffect, useState } from 'react';
import { BsSearch } from "react-icons/bs";
import nextIcon from '../../assets/img/next-icon.svg';
import { CardExplorerHotShimmer } from '../../components/Cards/CardExplorerHotShimmer';
import CardHighlightGame from '../../components/Cards/CardHighlightGame';
import { CardHighlightGameShimmer } from '../../components/Cards/CardHighlightGameShimmer';
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
  const [isLoading, setIsLoading] = useState(true);
  const [sliderOffset, setSliderOffset] = useState(0);

  const fetchGames = async () => {
    try {
      await Promise.all([getHotGamesForHome()]);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
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
      {authenticated === true && user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
      <FiltersContainer>
        <SearchContainer>
          <BsSearch className='search-icon' />
          <SearchInput type='text' id='search' name='search' placeholder='Procurar Jogos' />
        </SearchContainer>
      </FiltersContainer>
      <GameListContainer>
        <TitleListGames>Histórias mais Jogadas</TitleListGames>
        <ListGamesCardContainer>
          {isLoading ? (
          <>
            <CardExplorerHotShimmer />
            <CardExplorerHotShimmer />
            <CardExplorerHotShimmer />
            <CardExplorerHotShimmer />
          </>
          ) : games.map((game, index) => (
            <CardMostViewGame
              key={index}
              id={game.id}
              title={game.title}
              imageSrc={`https://picsum.photos/300/200?random=5}`}
              description={game.description}
              categories={game.categories}
              createdByNickname={game.createdBy!.nickname}
            />
          ))}
          {sliderOffset < 1 ? (
            <></>
          ) : (
            <PaginationContainer direction='left'>
              <button onClick={() => {
                setSliderOffset(sliderOffset - 1);
                console.log(sliderOffset)
              }}>
                <img src={nextIcon} alt="next games" className='nextIcon' />
              </button>
            </PaginationContainer>
          )}
          <PaginationContainer direction='right'>
            <button onClick={() => {
              setSliderOffset(sliderOffset + 1);
            }}>
              <img src={nextIcon} alt="next games" className='nextIcon' />
            </button>
          </PaginationContainer>
        </ListGamesCardContainer>
      </GameListContainer>
      <GameListContainer>
        <TitleListGames>Histórias em Destaque</TitleListGames>
        {isLoading ? (<>
          <CardHighlightGameShimmer/>
        </>) : (<>
          <CardHighlightGame
            key={0}
            title={games[0].title}
            imageSrc={`https://picsum.photos/300/200?random=5}`}
            description={games[0].description}
            categories={games[0].categories}
            createdByNickname={games[0].createdBy!.nickname}
          />
        </>)}
      </GameListContainer>
    </ExplorerMain>
  );

};

export default Explorer;
