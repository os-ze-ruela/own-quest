import { AxiosError } from "axios";
import { ReactNode, createContext } from "react";
import AppError from "../core/app-error";
import { postLikeGame, postUnLikeGame } from "../services/api";
type UserContextType = {
    likeGame: (gameId: string) => Promise<void>
    unlikeGame: (gameId: string) => Promise<void>
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: { children: ReactNode }) => {


    async function likeGame(gameId: string): Promise<void> {
        try {
            await postLikeGame(gameId)
        } catch (e) {
            const error = await e as AxiosError
            console.error(`Erro (${error.response?.status}) ao curtir jogo ${gameId}`, error);
            if (error.response?.status === 400) {
                throw new AppError(400, 'Usuário não encontrado')
            } else if (error.response?.status === 401) {
                throw new AppError(error.response?.status, 'Credenciais Incorretas')
            }
        }
    };

    async function unlikeGame(gameId: string): Promise<void> {
        try {
            await postUnLikeGame(gameId)
        } catch (e) {
            const error = await e as AxiosError
            console.error(`Erro (${error.response?.status}) ao desfavoritar jogo ${gameId}`, error);
            if (error.response?.status === 400) {
                throw new AppError(400, 'Usuário não encontrado')
            } else if (error.response?.status === 401) {
                throw new AppError(error.response?.status, 'Credenciais Incorretas')
            }
        }
    };

    return (
        <UserContext.Provider value={{ likeGame, unlikeGame }}>
            {children}
        </UserContext.Provider>
    )
}