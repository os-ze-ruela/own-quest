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
import { LOGIN } from '../../core/app-urls';
import { ExplorerMain, FiltersContainer, GameListContainer, HorizontalListWrapper, ListGamesCardContainer, PaginationContainer, SearchContainer, SearchInput, TitleListGames } from "../../styles/Explorer";


const Explorer = () => {

  const { authenticated, user, refresh, logout } = useContext(AuthContext)
  const { hotGames, highlightGame, getHotGamesForHome, setPagesOfHotGames, getHighlightGame, pagesOfHotGames } = useContext(GameContext)
  const [isLoading, setIsLoading] = useState(true);
  const [sliderOffset, setSliderOffset] = useState(0);

  const fetchGames = async () => {
    try {
      await Promise.all([getHotGamesForHome(), getHighlightGame()]);
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    } catch (e) {
      setIsLoading(false)
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
      <HorizontalListWrapper>
        <TitleListGames>Histórias mais Jogadas</TitleListGames>
        <GameListContainer>
        <ListGamesCardContainer translateX={`-${sliderOffset * 80}vw`} >
          {isLoading ? (
            <>
              <CardExplorerHotShimmer />
              <CardExplorerHotShimmer />
              <CardExplorerHotShimmer />
              <CardExplorerHotShimmer />
            </>
          ) : (hotGames.map((game, index) => (
            <CardMostViewGame
              key={index}
              id={game.id}
              title={game.title}
              imageSrc={game.image}
              description={game.description}
              categories={game.categories}
              createdByNickname={game.createdBy!.nickname}
            />)
          ))}
           </ListGamesCardContainer>
          {sliderOffset < 1 ? (
            <></>
          ) : (
            <PaginationContainer direction='left'>
              <button onClick={() => {
                setSliderOffset(sliderOffset - 1);
              }}>
                <img src={nextIcon} alt="next games" className='nextIcon' />
              </button>
            </PaginationContainer>
          )}
          <PaginationContainer direction='right'>
            <button onClick={async () => {
              // setPagesOfHotGames(pagesOfHotGames + 1)
              if (sliderOffset + 1 >= pagesOfHotGames - 1) {
                await getHotGamesForHome()
              }
              setSliderOffset(sliderOffset + 1);
            }}>
              <img src={nextIcon} alt="next games" className='nextIcon' />
            </button>
          </PaginationContainer>
        </GameListContainer>
      </HorizontalListWrapper>
      <GameListContainer>
        <TitleListGames>Histórias em Destaque</TitleListGames>
        {isLoading ? (
          <>
            <CardHighlightGameShimmer />
          </>
        ) : (
          <CardHighlightGame
            key={0}
            title={highlightGame!.title}
            imageSrc={highlightGame!.image}
            description={highlightGame!.description}
            categories={highlightGame!.categories}
            createdByNickname={highlightGame!.createdBy!.nickname}
          />
        )}
      </GameListContainer>
    </ExplorerMain>
  );

};

export default Explorer;
