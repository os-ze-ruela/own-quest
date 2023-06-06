import { AxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import AppError from "../core/app-error";
import Category from "../models/Category";
import Game from "../models/Game";
import PlayGames from "../models/PlayGame";
import { api, deleteGame, deleteGameCategoryByID, fetchGameById, fetchHighlightGame, findGamesByTitle, getGamesByCategory, getHotGames, getUserGamesByToken, getUserPlayGames, patchGame, postFullGame, postGame, postGameCategoryByID, publishGame, unpublishGame } from "../services/api";



type GameContextType = {

    setEditingGame: (game: Game) => void,
    getGameById: (id: string) => Promise<void>,
    createGame: () => Promise<number>,
    deleteGameByID: (id: number) => void,
    updateGame: (game: Game) => Promise<any>,
    getUserPlayingGames: () => Promise<void>,
    getUserGames: () => Promise<void>,
    getHighlightGame: () => Promise<void>,
    getHotGamesForHome: () => Promise<void>,
    searchGamesByTitle: (title: string) => Promise<void>,
    setPagesOfHotGames: (page: number) => void,
    pagesOfHotGames: number,
    userGames: Game[],
    userPlayingGames: PlayGames[],
    hotGames: Game[],
    searchGames: Game[],
    editingGame: Game | null,
    highlightGame: Game | null,
    createFullGame: (game: Game) => Promise<number>,
    addGameCategoryByID: (id: number, categories: Number[]) => Promise<void>,
    deleteGameCategory: (idGame: number, idCategory: number) => Promise<void>
    loading: boolean,
    fetchGamesByCategory: (id: number) => Promise<void>,
    gamesByCategory: Game[],
    published: boolean,
    setPublished: (status: boolean) => void
    publishGameById: (id: number) => Promise<any>
    unpublishGameById: (id: number) => Promise<any>
}

export const GameContext = createContext<GameContextType>({} as GameContextType)

export const GameProvider = ({ children }: { children: ReactNode }) => {

    // const navigate = useNavigate()
    const [userGames, setUserGames] = useState<Game[]>([])
    const [userPlayingGames, setUserPlayingGames] = useState<PlayGames[]>([])
    const [hotGames, setHotGames] = useState<Game[]>([])
    const [gamesByCategory, setGamesByCategory] = useState<Game[]>([])
    const [searchGames, setSearchGames] = useState<Game[]>([])
    const [editingGame, setEditingGame] = useState<Game | null>(null)
    const [highlightGame, setHighlightGame] = useState<Game | null>(null)
    const [pagesOfHotGames, setPagesOfHotGames] = useState(1);
    const [loading, setLoading] = useState(false)
    const [published, setPublished] = useState(false);


    async function publishGameById(id: number): Promise<any> {
        try {
            setLoading(true)
            const response = await publishGame(id);
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    async function unpublishGameById(id: number): Promise<any> {
        try {
            setLoading(true)
            const response = await unpublishGame(id);
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }


    async function createGame(): Promise<number> {
        try {
            const response = await postGame()
            return response.data.game.id;
        } catch (e) {
            const error = await e as AxiosError
            console.log(error)
            throw new AppError(error.response!.status, error.message);
        }
    }

    async function createFullGame(game: Game): Promise<number> {
        try {
            const response = await postFullGame(game.title, game.description, game.image, game.categories)
            return response.data.game.id;
        } catch (e) {
            const error = await e as AxiosError
            console.log(error)
            throw new AppError(error.response!.status, error.message);
        }
    }

    async function deleteGameByID(id: number) {
        try {
            await deleteGame(id)
        } catch (error) {
            console.error(error)
        }
    }

    async function updateGame(game: Game): Promise<any> {
        try {
            //   setLoading(true)
            const response = await patchGame(game.id, game.title, game.description, game.image, game.isEditing, game.isPublished, game.isDeleted);
            return response
            //   setLoading(false)
        } catch (error) {
            //   setLoading(false)
            console.error(error)
        }
    }

    async function getGameById(idGame: string): Promise<void> {
        try {
            //   setLoading(true)
            const response = await fetchGameById(idGame);
            // const idGame = Number(id);
            const { id, title, description, image, isEditing, isPublished, isDeleted, isFavorited, createdAt, createdBy, favorites, categories } = response.data.game;
            const categorieGame = categories.map((category: { category: any }) => {
                return new Category({ title: category.category.title, id: category.category.id, color: category.category.color, plus18: category.category.plus18 });
            });

            setPublished(isPublished)

            setEditingGame(new Game({
                id: id,
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



            //   setLoading(false)
        } catch (error) {
            //   setLoading(false)
            console.error(error)
            throw error
        }
    }

    async function getHighlightGame(): Promise<void> {
        try {
            //   setLoading(true)
            const response = await fetchHighlightGame();

            const { id, title, description, image, isEditing, isPublished, isDeleted, isFavorited, createdAt, createdBy, favorites, categories } = response.data.game;

            const categorieGame = categories.map((category: { category: any }) => {
                return new Category({ title: category.category.title, id: category.category.id, color: category.category.color, plus18: category.category.plus18 });
            });

            const game = new Game({
                id: id,
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
            })

            setHighlightGame(game)

            console.log(editingGame)
            //   setLoading(false)
        } catch (error) {
            //   setLoading(false)
            console.error(error)
            throw error
        }
    }

    async function getUserGames(): Promise<void> {
        try {

            const tokensJSON = localStorage.getItem('token')
            const tokens = JSON.parse(tokensJSON!)
            api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`

            const response = await getUserGamesByToken()

            const gamesData = response.data;

            const userGames = gamesData.map((gameData: { categories: any[]; id: any; title: any; description: any; favorites: any; image: any; isEditing: any; isPublished: any; isDeleted: any; createdAt: any; }) => {
                const categories = gameData.categories.map((categoryData) => {
                    return new Category(categoryData.category);
                });

                return {
                    id: gameData.id,
                    title: gameData.title,
                    description: gameData.description,
                    image: gameData.image,
                    favorites: gameData.favorites,
                    isEditing: gameData.isEditing,
                    isPublished: gameData.isPublished,
                    isDeleted: gameData.isDeleted,
                    createdAt: gameData.createdAt,
                    categories: categories
                };
            });

            setUserGames(userGames);
        } catch (e: any) {
            setUserGames([]);

            const error = await e as AxiosError
            console.error(`Erro (${error.response?.status}) ao buscar jogos:`, error);
            if (error.response?.status === 400) {
                throw new AppError(400, 'Usuário não encontrado')
            } else if (error.response?.status === 401) {
                throw new AppError(error.response?.status, 'Credenciais Incorretas')
            }
        }
    };

    async function getHotGamesForHome(): Promise<void> {
        try {

            const tokensJSON = localStorage.getItem('token')
            const tokens = JSON.parse(tokensJSON!)
            api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`

            setPagesOfHotGames(pagesOfHotGames + 1)

            const response = await getHotGames(pagesOfHotGames)

            const gamesData = response.data;

            const newHotGames = gamesData.map((gameData: {
                game: {
                    createdBy: any; categories: any[]; id: any; title: any; description: any; image: any; favorites: any; isEditing: any; isPublished: any; isDeleted: any; createdAt: any;
                };
            }) => {
                const categories = gameData.game.categories.map((categoryData) => {
                    return new Category(categoryData.category);
                });

                return {
                    id: gameData.game.id,
                    title: gameData.game.title,
                    description: gameData.game.description,
                    image: gameData.game.image,
                    favorites: gameData.game.favorites,
                    isEditing: gameData.game.isEditing,
                    isPublished: gameData.game.isPublished,
                    isDeleted: gameData.game.isDeleted,
                    createdAt: gameData.game.createdAt,
                    createdBy: gameData.game.createdBy,
                    categories: categories,
                };
            });

            const hotGamesTemp = [...hotGames, ...newHotGames]

            setHotGames(hotGamesTemp);
        } catch (e: any) {
            setHotGames([]);

            const error = await e as AxiosError
            console.error(`Erro (${error.response?.status}) ao buscar jogos:`, error);
            if (error.response?.status === 400) {
                throw new AppError(400, 'Usuário não encontrado')
            } else if (error.response?.status === 401) {
                throw new AppError(error.response?.status, 'Credenciais Incorretas')
            }
        }
    };


    async function addGameCategoryByID(id: number, categories: Number[]): Promise<void> {
        try {
            await postGameCategoryByID(id, categories)
        } catch (e) {
            const error = await e as AxiosError
            console.log(error)
            throw new AppError(error.response!.status, error.message);
        }
    }

    async function deleteGameCategory(idGame: number, idCategory: number): Promise<void> {
        try {
            await deleteGameCategoryByID(idGame, idCategory)
        } catch (error) {
            console.error(error)
        }
    }

    async function searchGamesByTitle(title: string): Promise<void> {
        try {
            setLoading(true)
            const response = await findGamesByTitle(title);
            const gamesData: any = response.data;

            const searchGamesTemp: any = gamesData.map((gameData: any) => {
                const categories = gameData.categories.map((categoryData: any) => {
                    return {
                        id: categoryData.category.id,
                        title: categoryData.category.title,
                        color: categoryData.category.color,
                        plus18: categoryData.category.plus18,
                    };
                });

                return {
                    id: gameData.id,
                    title: gameData.title,
                    description: gameData.description,
                    image: gameData.image,
                    favorites: gameData.favorites,
                    isEditing: gameData.isEditing,
                    isPublished: gameData.isPublished,
                    isDeleted: gameData.isDeleted,
                    createdAt: gameData.createdAt,
                    createdBy: gameData.createdBy,
                    categories: categories,
                };
            });

            setSearchGames(searchGamesTemp);
            setLoading(false)
        } catch (e: any) {

            setSearchGames([]);
            setLoading(false)

            const error = await e as AxiosError;
            console.error(`Erro (${error.response?.status}) ao buscar jogos com título ${title}:`, error);
            if (error.response?.status === 400) {
                throw new AppError(400, 'Usuário não encontrado');
            } else if (error.response?.status === 401) {
                throw new AppError(error.response?.status, 'Credenciais Incorretas');
            }
        }
    };

    async function getUserPlayingGames(): Promise<void> {
        try {

            const userJSON = localStorage.getItem('user')
            const { id } = JSON.parse(userJSON!)

            console.log(`user id: ${id}`)

            const response = await getUserPlayGames(id)

            const playGamesData = response.data;

            const playingGames = playGamesData.map((playGame: {
                play_game_id: any;
                is_ongoing: any;
                not_possible_continue: any;
                game_date_play: any;
                game: {
                    id: any; title: any; description: any; image: any; createdAt: any;
                };
            }) => {

                return new PlayGames({
                    play_game_id: playGame.play_game_id,
                    is_ongoing: playGame.is_ongoing,
                    game_date_play: playGame.game_date_play,
                    not_possible_continue: playGame.not_possible_continue,
                    game: new Game({
                        categories: [],
                        createdAt: playGame.game.createdAt,
                        description: playGame.game.description,
                        favorites: 0,
                        id: playGame.game.id,
                        image: playGame.game.image,
                        title: playGame.game.title,
                        createdBy: null,
                        isEditing: false,
                        isPublished: true,
                        isDeleted: false,
                        isFavorited: false,
                    })
                })
            });

            setUserPlayingGames(playingGames);
        } catch (e: any) {
            setUserPlayingGames([]);

            const error = await e as AxiosError
            console.error(`Erro (${error.response?.status}) ao buscar jogos jogandos:`, error);
            if (error.response?.status === 400) {
                throw new AppError(400, 'Usuário não encontrado')
            } else if (error.response?.status === 401) {
                throw new AppError(error.response?.status, 'Credenciais Incorretas')
            }
        }
    };


    async function fetchGamesByCategory(id: number): Promise<void> {
        try {
            setLoading(true)
            console.log('buscando categoria com id = ', id)
            const response = await getGamesByCategory(id);
            const gamesData: any = response.data;
            console.log(gamesData)
            const gamesTemp: any = gamesData.map((gameData: any) => {
                const categories = gameData.categories.map((categoryData: any) => {
                    return {
                        id: categoryData.category.id,
                        title: categoryData.category.title,
                        color: categoryData.category.color,
                        plus18: categoryData.category.plus18,
                    };
                });

                return {
                    id: gameData.id,
                    title: gameData.title,
                    description: gameData.description,
                    image: gameData.image,
                    favorites: gameData.favorites,
                    isEditing: gameData.isEditing,
                    isPublished: gameData.isPublished,
                    isDeleted: gameData.isDeleted,
                    createdAt: gameData.createdAt,
                    createdBy: gameData.createdBy,
                    categories: categories,
                };
            });

            setGamesByCategory(gamesTemp);
            setLoading(false)
        } catch (e: any) {
            setGamesByCategory([]);
            setLoading(false)
            const error = await e as AxiosError;
            console.error(error);
        }
    };




    return (
        <GameContext.Provider value={{
            setEditingGame,
            getGameById,
            createGame,
            deleteGameByID,
            updateGame,
            getUserGames,
            setPagesOfHotGames,
            getHotGamesForHome,
            createFullGame,
            getHighlightGame,
            searchGamesByTitle,
            getUserPlayingGames,
            userGames,
            userPlayingGames,
            hotGames,
            searchGames,
            editingGame,
            pagesOfHotGames,
            highlightGame,
            addGameCategoryByID,
            deleteGameCategory,
            loading,
            fetchGamesByCategory,
            gamesByCategory,
            published,
            setPublished,
            publishGameById,
            unpublishGameById

        }}>
            {children}
        </GameContext.Provider>
    )
}