import { useContext } from 'react'
import { GameContext } from '../../contexts/game'
import { ListSearchGamesCardContainer, NoSearchedGames, SearchGameWrapContainer } from '../../styles/SearchGamesComponent'
import CardSearchGame from './CardSearchGame'


import ASTRO_LAPIS from "../../assets/img/astrounauta-lapis.svg"
import { GameListContainer, HorizontalListWrapper, ListGamesCardContainer } from '../../styles/Explorer'
import { CardExplorerHotShimmer } from '../Cards/CardExplorerHotShimmer'

const SearchGamesComponent = () => {


    const { loading, searchGames } = useContext(GameContext)


    return loading ? (
        <HorizontalListWrapper>
            <GameListContainer>
                <ListGamesCardContainer>
                    <CardExplorerHotShimmer />
                    <CardExplorerHotShimmer />
                    <CardExplorerHotShimmer />
                    <CardExplorerHotShimmer />
                    <CardExplorerHotShimmer />
                    <CardExplorerHotShimmer />
                    <CardExplorerHotShimmer />
                    <CardExplorerHotShimmer />
                </ListGamesCardContainer>
            </GameListContainer>
        </HorizontalListWrapper >
    ) : (
        <SearchGameWrapContainer>
            <ListSearchGamesCardContainer>
                {searchGames.length === 0 ? (
                    <NoSearchedGames>
                        <img src={ASTRO_LAPIS} alt="" width='90%' />
                        <h2>Não foi encontrado nenhum jogo</h2>
                    </NoSearchedGames>
                ) : (
                    searchGames.map((game, index) => (
                        <CardSearchGame
                            key={index}
                            id={game.id}
                            title={game.title}
                            imageSrc={game.image}
                            isPublished={game.isPublished ?? false}
                            description={game.description}
                            categories={game.categories}
                        />
                    ))
                )}
            </ListSearchGamesCardContainer>
        </SearchGameWrapContainer>
    )

}

export default SearchGamesComponent