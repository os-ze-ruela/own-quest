import { AxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import AppError from "../core/app-error";
import Game from "../models/Game";
import { api, getUserGamesByToken } from "../services/api";

type GameContextType = {
    getUserGames: () => Promise<void>,
    games: Game[]
}

export const GameContext = createContext<GameContextType>({} as GameContextType)

export const GameProvider = ({ children }: { children: ReactNode }) => {

    // const navigate = useNavigate()
    const [games, setGames] = useState<Game[]>([])
    // const [loading, setLoading] =useState(true)

    async function getUserGames(): Promise<void> {
        try {

            const tokensJSON = localStorage.getItem('token')
            const tokens = JSON.parse(tokensJSON!)
            api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`
            
            const response = await getUserGamesByToken()
            
            setGames(response.data);

            for (let i = 0; i < games.length; i++) {
                const game = games[i];
                for (let j = 0; j < game.categories.length; j++) {
                    const category = game.categories[j];
                    console.log(`category title: ${category.title} - color: ${category.color}`)
                }
            }
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
        <GameContext.Provider value={{ getUserGames, games }}>
            {children}
        </GameContext.Provider>
    )
}