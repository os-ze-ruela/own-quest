import { Skeleton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import Header from '../../components/Header/Header';
import HeaderLogged from '../../components/Header/HeaderLogged';
import { AuthContext } from '../../contexts/auth';
import { UserContext } from '../../contexts/user';
import { EXPLORER, LOGIN } from '../../core/app-urls';
import Category from '../../models/Category';
import Game from '../../models/Game';
import { api, fetchGameById } from '../../services/api';
import { BackButtonWrapper, CategoryGameInfoLabel, CategoryGameInfoWrapper, CategoryWrapper, CreatedByWrapper, DenounceButton, DescriptionWrapper, GameActionsWrapper, GameImageWrapper, GameInfosMain, GameInfosWrapper, GameTitle, GamesInfosWrapper, HeartIcon, ImageGame, LikeWrapper, PlayButton } from '../../styles/GameInfos';

export const GameInfos = () => {


    const { id } = useParams()

    const { likeGame, unlikeGame } = useContext(UserContext)
    const { authenticated, user } = useContext(AuthContext)
    const [visitingGame, setVisitingGame] = useState<Game | null>(null)
    const [loading, setLoading] = useState(true)
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate()

    const handleClick = async () => {
        if (!liked) {
            try {
                await likeGame(id!)
                setLiked(true);
                const gameTemp = visitingGame;
                gameTemp!.favorites = gameTemp?.favorites! + 1;
                setVisitingGame(gameTemp)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await unlikeGame(id!)
                setLiked(false);
                const gameTemp = visitingGame;
                gameTemp!.favorites = gameTemp?.favorites! - 1;
                setVisitingGame(gameTemp)
            } catch (error) {
               console.log(error)
            }
        }
    };

    async function getGameById(id: string): Promise<void> {
        try {

            const tokensJSON = localStorage.getItem('token')
            const tokens = JSON.parse(tokensJSON!)
            api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`

            setLoading(true)
            const response = await fetchGameById(id);
            const idGame = Number(id);
            const { title, description, image, isEditing, isPublished, isDeleted, isFavorited, createdAt, createdBy, favorites, categories } = response.data.game;

            const categorieGame = categories.map((category: { category: any }) => {
                return new Category({ title: category.category.title, id: category.category.id, color: category.category.color, plus18: category.category.plus18 });
            });

            setVisitingGame(new Game({
                id: idGame,
                title: title,
                description: description,
                createdAt: createdAt,
                categories: categorieGame,
                favorites: favorites,
                isFavorited: isFavorited,
                image: image,
                isEditing: isEditing,
                isPublished: isPublished,
                isDeleted: isDeleted,
                createdBy: createdBy
            }))

            setLiked(isFavorited)


            setTimeout(() => {
                setLoading(false)
            }, 1000);

        } catch (error) {
            setLoading(false)
            console.error(error)
            // navigate(EXPLORER)
        }
    }

    useEffect(() => {
        getGameById(id!)
    }, [])

    return (
        <>
            {authenticated ?
                (<HeaderLogged nickname={user!.nickname} photo={user!.photo} />) :
                (<Header page='Login' redirect={LOGIN} />)
            }
            <GameInfosMain>
                <BackButtonWrapper href={EXPLORER}>
                    <BiArrowBack />
                    <p>Voltar</p>
                </BackButtonWrapper>
                {loading ?
                    (<Skeleton variant="rounded" animation="wave" width='40%' height='40px' style={{ marginTop: '12px' }} />)
                    :
                    (<GameTitle>{visitingGame?.title}</GameTitle>)}
                <GameInfosWrapper>
                    <GameImageWrapper>
                        {loading ?
                            (<Skeleton variant="rounded" animation="wave" width='100%' height='200px' />)
                            :
                            (<ImageGame src={visitingGame?.image != null ? visitingGame?.image : `https://picsum.photos/300/200?random=5`} />)}
                    </GameImageWrapper>
                    <GamesInfosWrapper>
                        {loading ?
                            (<>
                                <Skeleton variant="rounded" animation="wave" width='10%' height='40px' />
                                <Skeleton variant="rounded" animation="wave" width='80%' height='80px' style={{ marginTop: '2px' }} />
                            </>)
                            :
                            (
                                <DescriptionWrapper>
                                    <h3>Descrição</h3>
                                    <p>{visitingGame?.description}</p>
                                </DescriptionWrapper>
                            )}
                        {loading ?
                            (<div style={{ display: 'flex', gap: '1rem' }}>
                                <Skeleton variant="rounded" animation="wave" width='120px' height='30px' />
                                <Skeleton variant="rounded" animation="wave" width='120px' height='30px' />
                                <Skeleton variant="rounded" animation="wave" width='120px' height='30px' />
                            </div>)
                            : visitingGame?.categories.length === 0 ? (<></>) : (
                                <CategoryWrapper>
                                    <h3>Categorias</h3>
                                    <CategoryGameInfoWrapper className='category-label-wrapper'>
                                        {visitingGame?.categories.map((category) => (
                                            <CategoryGameInfoLabel key={category.id} color={category.color} href={`/explorer?tag=${category.title}`}>
                                                {category.title}
                                            </CategoryGameInfoLabel>
                                        ))}
                                    </CategoryGameInfoWrapper>
                                </CategoryWrapper>
                            )}
                        {loading ?
                            (<>
                                <Skeleton variant="rounded" animation="wave" width='10%' height='30px' />
                                <Skeleton variant="rounded" animation="wave" width='20%' height='30px' />
                            </>)
                            :
                            (<CreatedByWrapper>
                                <h3>Criado Por</h3>
                                <p>@{visitingGame?.createdBy?.nickname}</p>
                            </CreatedByWrapper>)}
                    </GamesInfosWrapper>
                    {loading ?
                        (<GameActionsWrapper>
                            <Skeleton variant="rounded" animation="wave" width='30%' height='30px' />
                            <Skeleton variant="rounded" animation="wave" width='90%' height='30px' style={{ marginTop: '3rem' }} />
                            <Skeleton variant="rounded" animation="wave" width='100%' height='40px' style={{ marginTop: '8px' }} />
                        </GameActionsWrapper>)
                        : (<GameActionsWrapper>
                            <LikeWrapper>
                                <HeartIcon onClick={handleClick} liked={liked} />
                                <p>{visitingGame?.favorites}</p>
                            </LikeWrapper>
                            <DenounceButton>Denunciar</DenounceButton>
                            <PlayButton>Jogar</PlayButton>
                        </GameActionsWrapper>)}
                </GameInfosWrapper>
            </GameInfosMain>
        </>
    );
}