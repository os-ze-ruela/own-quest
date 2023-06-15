import { SetStateAction, useContext, useEffect, useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { CardExplorerHotShimmer } from '../../components/Cards/CardExplorerHotShimmer';
import CardHighlightGame from '../../components/Cards/CardHighlightGame';
import { CardHighlightGameShimmer } from '../../components/Cards/CardHighlightGameShimmer';
import CardMostViewGame from '../../components/Cards/CardMostViewGame';
import Drawer from '../../components/Drawer/Drawer';
import SearchGamesComponent from '../../components/Explorer/SearchGamesComponent';
import Header from '../../components/Header/Header';
import HeaderLogged from '../../components/Header/HeaderLogged';
import EmailNotValidatedWarning from '../../components/Warning/EmailNotValidated';
import { AuthContext } from '../../contexts/auth';
import { GameContext } from '../../contexts/game';
import { LOGIN } from '../../core/app-urls';
import { ExplorerMain, FiltersContainer, GameListContainer, HighlightGameContainer, HorizontalListWrapper, ListGamesCardContainer, LoadMoreContainer, LoadMoreGames, SearchContainer, SearchInput, TitleListGames } from "../../styles/Explorer";


const Explorer = () => {

  const { authenticated, user, } = useContext(AuthContext)
  const { hotGames, highlightGame, getHotGamesForHome, getHighlightGame, searchGamesByTitle } = useContext(GameContext)
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');


  const fetchGames = async () => {
    try {
      await Promise.all([getHotGamesForHome(), getHighlightGame()]);
      setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const titleParam = urlParams.get('title');
        setSearch(titleParam || '');
        setIsLoading(false)
      }, 1000);
    } catch (e) {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchGames()
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      // Executar ações desejadas após o atraso de 500ms
      // Por exemplo, atualizar o estado com o valor do campo de busca
      // setIsLoadingSearch(true)
      await searchGamesByTitle(search)
      // setIsLoadingSearch(false)
    }, 500);

    const updateURL = () => {
      const url = new URL(window.location.href);
      if (search.length > 0) {
        url.searchParams.set('title', search);
      } else {
        url.searchParams.delete('title');
      }
      window.history.replaceState({}, '', url.toString());
    };

    // Função de limpeza para cancelar o debounce se o componente for desmontado ou o valor for alterado
    return () => {
      updateURL();
      if (search.length > 0) {
        clearTimeout(delayDebounceFn);
      }
    };
  }, [search]);

  const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearch(event.target.value);
  };


  return (
    <>
      <Drawer />
      <ExplorerMain>
        {authenticated ?
          (<HeaderLogged nickname={user!.nickname} photo={user!.photo} />) :
          (<Header page='Login' redirect={LOGIN} />)
        }
        {authenticated === true && user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
        <FiltersContainer>
          <SearchContainer>
            <BsSearch className='search-icon' />
            <SearchInput
              type="text"
              id="search"
              name="search"
              placeholder="Procurar Jogos"
              value={search}
              onChange={handleSearchChange} />
          </SearchContainer>
        </FiltersContainer>
        {search.length > 0 ? (
          <SearchGamesComponent />
        ) : (
          <>
            <HorizontalListWrapper>
              <TitleListGames>Histórias mais Curtidas</TitleListGames>
              <GameListContainer>
                <ListGamesCardContainer>
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
                {/* {sliderOffset < 1 ? (
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
                  </PaginationContainer> */}
                <LoadMoreContainer>
                  <LoadMoreGames onClick={async () => {
                    await getHotGamesForHome();
                  }}>Carregar mais jogos</LoadMoreGames>
                </LoadMoreContainer>
              </GameListContainer>
            </HorizontalListWrapper>
            {
              highlightGame != null ? (
                <HighlightGameContainer>
                  <TitleListGames>Histórias em Destaque</TitleListGames>
                  {isLoading ? (
                    <>
                      <CardHighlightGameShimmer />
                    </>
                  ) : (
                    <CardHighlightGame
                      id={highlightGame!.id}
                      key={0}
                      title={highlightGame!.title}
                      imageSrc={highlightGame!.image}
                      description={highlightGame!.description}
                      categories={highlightGame!.categories}
                      createdByNickname={highlightGame!.createdBy!.nickname}
                    />
                  )}
                </HighlightGameContainer>
              ) : (<></>)
            }
          </>
        )
        }

      </ExplorerMain>
    </>
  );

};

export default Explorer;
