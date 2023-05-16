import { CircularProgress } from '@mui/material'
import { useContext } from 'react'
import { GameContext } from '../../contexts/game'
import { ListSearchGamesCardContainer, NoSearchedGames, SearchGameWrapContainer } from '../../styles/SearchGamesComponent'
import CardSearchGame from './CardSearchGame'


import ASTRO_LAPIS from "../../assets/img/astrounauta-lapis.svg"

const SearchGamesComponent = () => {


    const { loading, searchGames } = useContext(GameContext)

    return (
        <SearchGameWrapContainer>
            <ListSearchGamesCardContainer  >
                {loading ?
                    <div style={{ height: '200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                        <CircularProgress />
                    </div> : searchGames.length === 0 ? (
                        <NoSearchedGames>
                            <img src={ASTRO_LAPIS} alt="" width='90%' />
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