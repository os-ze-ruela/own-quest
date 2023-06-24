import { Alert, Backdrop, Skeleton, Snackbar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { CardExplorerHotShimmer } from '../../components/Cards/CardExplorerHotShimmer';
import CardMostViewGame from '../../components/Cards/CardMostViewGame';
import DialogReportGame from '../../components/Dialog/DialogReportGame';
import DialogResumeGame from '../../components/Dialog/DialogResumeGame';
import Header from '../../components/Header/Header';
import HeaderLogged from '../../components/Header/HeaderLogged';
import ImagePlaceholder from '../../components/ImagePlaceholder/ImagePlaceholder';
import { AuthContext } from '../../contexts/auth';
import { GameContext } from '../../contexts/game';
import { PlayGamesContext } from '../../contexts/play-games';
import { UserContext } from '../../contexts/user';
import AppError from '../../core/app-error';
import { CREATOR, EXPLORER, LOGIN, PLAYGAME } from '../../core/app-urls';
import Category from '../../models/Category';
import Game from '../../models/Game';
import { api, fetchGameById } from '../../services/api';
import { GameListContainer, HorizontalListWrapper, ListGamesCardContainer, TitleListGames } from '../../styles/Explorer';
import { BackButtonWrapper, CategoryGameInfoLabel, CategoryGameInfoWrapper, CategoryWrapper, CreatedByWrapper, DenounceButton, DescriptionWrapper, GameActionsWrapper, GameImageWrapper, GameInfosMain, GameInfosWrapper, GameTitle, GamesInfosWrapper, HeartIcon, ImageGame, LikeWrapper, PlayButton } from '../../styles/GameInfos';

export const GameInfos = () => {


    const { id } = useParams()

    const { playGame, setCurrentPlayingPage, getResumePlayedGame, setHistoricGameId, setPlayGameId, finishAndPlay } = useContext(PlayGamesContext)
    const { likeGame, unlikeGame } = useContext(UserContext)
    const { authenticated, user } = useContext(AuthContext)
    const [visitingGame, setVisitingGame] = useState<Game | null>(null)
    const [loading, setLoading] = useState(true)
    const [liked, setLiked] = useState(false);
    const [categoryID, setCategoryID] = useState(-1);
    const navigate = useNavigate()
    const { fetchGamesByCategory, gamesByCategory } = useContext(GameContext)


    const [showModal, setShowModal] = useState(false);
    const [showModalReport, setShowModalReport] = useState(false);



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

    const handlePlayButton = async () => {

        try {
            const response = await playGame(user!.id, Number(id!))
            setPlayGameId(response.data.play_game_id)
            setHistoricGameId(response.data.historic_last_game_id)
            setCurrentPlayingPage(response.data.actual_page_id)
            navigate(PLAYGAME + '/' + id + '?test=false');

        } catch (error) {
            console.log(error)
            if (error instanceof AppError && error.statusCode === 409) {
                setShowModal(true);
            }
        }

    };

    const handleRestartGame = async () => {

        try {
            const response = await finishAndPlay(user!.id, Number(id!))
            setPlayGameId(response.data.play_game_id)
            setHistoricGameId(response.data.historic_last_game_id)
            setCurrentPlayingPage(response.data.actual_page_id)
            navigate(PLAYGAME + '/' + id + '?test=false');
        } catch (error) {
            console.log(error)
        }

        navigate(PLAYGAME + '/' + id + '?test=false');
    }

    const handleResumeGame = async () => {

        try {
            const response = await getResumePlayedGame(user!.id, Number(id!))
            console.log(response)
            if (response.data.is_ongoing === true) {
                setPlayGameId(response.data.play_game_id)
                setCurrentPlayingPage(response.data.historic_last_page.page_game_id)
                setHistoricGameId(response.data.historic_last_page.id)
                navigate(PLAYGAME + '/' + id + '?test=false');
            }
        } catch (error) {
            console.log(error)
        }
    }


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
            setCategoryID(categorieGame[0].id)

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

            await fetchGamesByCategory(categorieGame[0].id);

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

    useEffect(() => {
        const setDocumentTitle = () => {
            if (visitingGame) {
                document.title = visitingGame.title;
            }
        };

        setDocumentTitle(); // Chamada inicial para definir o título assim que o componente for montado

        // Monitora as mudanças no estado visitingGame
        const visitingGameUpdated = visitingGame !== null && visitingGame !== undefined;
        if (visitingGameUpdated) {
            setDocumentTitle();
        }
    }, [visitingGame]);


    const [successReportSnack, setSuccessReportSnack] = useState(false)
    const [errorReportSnack, setErrorReportSnack] = useState(false)

    const handleSuccessCloseAlert = () => {
        setSuccessReportSnack(false)
    };

    const handleErrorCloseAlert = () => {
        setErrorReportSnack(false)
    };



    return (
        <>
            {authenticated ?
                (<HeaderLogged nickname={user!.nickname} photo={user!.photo} />) :
                (<Header page='Login' redirect={LOGIN} />)
            }
            {showModal && (
                <Backdrop
                    sx={{ color: '#fff', background: 'rgba(0, 0, 0, 0.8)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                    <DialogResumeGame onClose={() => { setShowModal(false) }} handleRestartGame={handleRestartGame} handleResumeGame={handleResumeGame} />
                </Backdrop>
            )}
            {showModalReport && (
                <Backdrop
                    sx={{ color: '#fff', background: 'rgba(0, 0, 0, 0.8)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                    <DialogReportGame
                        onClose={() => { setShowModalReport(false) }}
                        onCloseError={() => {
                            setShowModalReport(false)
                            setErrorReportSnack(true)
                        }}
                        onCloseSuccess={() => {
                            setShowModalReport(false)
                            setSuccessReportSnack(true)
                        }}
                        gameId={visitingGame?.id!} userId={user?.id!} />
                </Backdrop>
            )}
            <Snackbar open={successReportSnack} autoHideDuration={5000} onClose={handleSuccessCloseAlert}>
                <Alert onClose={handleSuccessCloseAlert} severity="success" sx={{ backgroundColor: '#69EC31', color: 'black', width: '100%' }}>
                    História reportado. Nós iremos analisar e tomar as próximas medidas daqui para frente!
                </Alert>
            </Snackbar>
            <Snackbar open={errorReportSnack} autoHideDuration={5000} onClose={handleErrorCloseAlert}>
                <Alert onClose={handleErrorCloseAlert} severity="warning" sx={{ backgroundColor: '#EC8831', color: 'black', width: '100%' }}>
                    Ocorreu um erro ao fazer a denúncia dessa história.
                </Alert>
            </Snackbar>
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
                            (visitingGame?.image != null ? <ImageGame src={visitingGame?.image} /> : (
                                <ImagePlaceholder />
                            ))}
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
                                <a href={CREATOR + '/' + visitingGame?.createdBy?.nickname}>
                                    <p>@{visitingGame?.createdBy?.nickname}</p>
                                </a>

                            </CreatedByWrapper>)}
                    </GamesInfosWrapper>
                    {loading ?
                        (<GameActionsWrapper>
                            <Skeleton variant="rounded" animation="wave" width='30%' height='30px' />
                            <Skeleton variant="rounded" animation="wave" width='90%' height='30px' style={{ marginTop: '3rem' }} />
                            <Skeleton variant="rounded" animation="wave" width='100%' height='40px' style={{ marginTop: '8px' }} />
                        </GameActionsWrapper>)
                        : (
                            <GameActionsWrapper>
                                <LikeWrapper>
                                    <HeartIcon onClick={handleClick} liked={liked} />
                                    <p>{visitingGame?.favorites}</p>
                                </LikeWrapper>
                                <DenounceButton onClick={() => setShowModalReport(true)} >Denunciar</DenounceButton>
                                <PlayButton onClick={handlePlayButton}>Jogar</PlayButton>
                            </GameActionsWrapper>
                        )}
                </GameInfosWrapper>
                <HorizontalListWrapper>
                <TitleListGames>Histórias semelhantes para você jogar</TitleListGames>
                <GameListContainer>
                  <ListGamesCardContainer>
                    {loading ? (
                      <>
                        <CardExplorerHotShimmer />
                        <CardExplorerHotShimmer />
                        <CardExplorerHotShimmer />
                        <CardExplorerHotShimmer />
                      </>
                    ) : (gamesByCategory.map((game, index) => (
                      <CardMostViewGame
                        key={index}
                        id={game.id}
                        title={game.title}
                        imageSrc={game.image}
                        description={game.description}
                        categories={game.categories}
                        createdByNickname={'teste'}
                      />)
                    ))}
                  </ListGamesCardContainer>
                </GameListContainer>
              </HorizontalListWrapper>
            </GameInfosMain>
        </>
    );
}