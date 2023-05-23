import { AxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import AppError from "../core/app-error";
import Category from "../models/Category";
import Game from "../models/Game";

import { api, deleteGame, deleteGameCategoryByID, fetchGameById, fetchHighlightGame, findGamesByTitle, getHotGames, getUserGamesByToken, patchGame, postFullGame, postGame, postGameCategoryByID } from "../services/api";


type GameContextType = {

    setEditingGame: (game: Game) => void,
    getGameById: (id: string) => Promise<void>,
    createGame: () => Promise<number>,
    deleteGameByID: (id: number) => void,
    updateGame: (game: Game) => Promise<void>,
    getUserGames: () => Promise<void>,
    getHighlightGame: () => Promise<void>,
    getHotGamesForHome: () => Promise<void>,
    searchGamesByTitle: (title: string) => Promise<void>,
    setPagesOfHotGames: (page: number) => void,
    pagesOfHotGames: number,
    userGames: Game[],
    hotGames: Game[],
    searchGames: Game[],
    editingGame: Game | null,
    highlightGame: Game | null,
    createFullGame: (game: Game) => Promise<number>,
    addGameCategoryByID: (id: number, categories: Number[]) => Promise<void>,
    deleteGameCategory: (idGame: number, idCategory: number) => Promise<void>
    loading: boolean,

}

export const GameContext = createContext<GameContextType>({} as GameContextType)

export const GameProvider = ({ children }: { children: ReactNode }) => {

    // const navigate = useNavigate()
    const [userGames, setUserGames] = useState<Game[]>([])
    const [hotGames, setHotGames] = useState<Game[]>([])
    const [searchGames, setSearchGames] = useState<Game[]>([])
    const [editingGame, setEditingGame] = useState<Game | null>(null)
    const [highlightGame, setHighlightGame] = useState<Game | null>(null)
    const [pagesOfHotGames, setPagesOfHotGames] = useState(1);
    const [loading, setLoading] = useState(false)

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

    async function updateGame(game: Game): Promise<void> {
        try {
            //   setLoading(true)
            await patchGame(game.id, game.title, game.description, game.image, game.isEditing, game.isPublished, game.isDeleted);
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

            console.log('EDITING GAME')
            console.log(editingGame)

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


    async function addGameCategoryByID(id: number, categories: Number[]): Promise<void>{
        try {
            await postGameCategoryByID(id, categories)
        } catch (e) {
            const error = await e as AxiosError
            console.log(error)
            throw new AppError(error.response!.status, error.message);
        }
    }

    async function deleteGameCategory(idGame: number, idCategory:number): Promise<void> {
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
            userGames,
            hotGames,
            searchGames,
            editingGame,
            pagesOfHotGames,
            highlightGame,
            addGameCategoryByID,
            deleteGameCategory,
            loading

        }}>
            {children}
        </GameContext.Provider>
    )
}