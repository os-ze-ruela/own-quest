import { AxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import AppError from "../core/app-error";
import Category from "../models/Category";
import Game from "../models/Game";
import { api, getHotGames, getUserGamesByToken } from "../services/api";

type GameContextType = {
    getUserGames: () => Promise<void>,
    getHotGamesForHome: () => Promise<void>,
    userGames: Game[],
    games: Game[]
}

export const GameContext = createContext<GameContextType>({} as GameContextType)

export const GameProvider = ({ children }: { children: ReactNode }) => {

    // const navigate = useNavigate()
    const [userGames, setUserGames] = useState<Game[]>([])
    const [games, setGames] = useState<Game[]>([])
    // const [loading, setLoading] =useState(true)

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

            const response = await getHotGames()

            const gamesData = response.data;

            console.log(response.data)

            const hotGames = gamesData.map((gameData: { game: { categories: any[]; id: any; title: any; description: any; image: any; favorites:any; isEditing: any; isPublished: any; isDeleted: any; createdAt: any; }; }) => {
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
                    categories: categories
                };
            });

            setGames(hotGames);
        } catch (e: any) {
            setGames([]);

            const error = await e as AxiosError
            console.error(`Erro (${error.response?.status}) ao buscar jogos:`, error);
            if (error.response?.status === 400) {
                throw new AppError(400, 'Usuário não encontrado')
            } else if (error.response?.status === 401) {
                throw new AppError(error.response?.status, 'Credenciais Incorretas')
            }
        }
    };

    return (
        <GameContext.Provider value={{ getUserGames, getHotGamesForHome, userGames, games }}>
            {children}
        </GameContext.Provider>
    )
}