import { AxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import AppError from "../core/app-error";
import { api, getUserByNickname, postLikeGame, postUnLikeGame } from "../services/api";
import UserCategory from "../models/UserCategory";
import User from "../models/User";
type UserContextType = {
    likeGame: (gameId: string) => Promise<void>
    unlikeGame: (gameId: string) => Promise<void>
    findUserByNickname: (nickname: string) => Promise<void>
    visitingUser: User | null
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: { children: ReactNode }) => {

    const [visitingUser, setVisitingUser] = useState<User | null>(null)

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

    async function findUserByNickname(userNickname: string): Promise<void> {
        try {

            const tokensJSON = localStorage.getItem('token')
            const tokens = JSON.parse(tokensJSON!)
            api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`

            const response = await getUserByNickname(userNickname)
            console.log('response.data', response.data)
            const { id, name, email, nickname,
                    birthDate, followers, following,
                    photo, createdAt, isDeleted,
                    isFollowing, categories } = response.data
            console.log('categories', categories)
            const userCategories = categories.map((category: any) => {
                const { id, title, color, timesUsed } = category
                return new UserCategory({ id, title, color, timesUsed });
            });

            setVisitingUser( new User({
                id: id,
                name: name,
                email: email,
                nickname: nickname,
                birthDate: birthDate,
                followers: followers,
                following: following,
                photo: photo,
                createdAt: createdAt,
                isDeleted: isDeleted,
                isFollowing: isFollowing,
                categories: userCategories
            }))

        } catch (e) {
            const error = await e as AxiosError
            console.error(`Erro (${error.response?.status}) ao procurar usuário ${userNickname}`, error);
            if (error.response?.status === 400) {
                throw new AppError(400, 'Usuário não encontrado')
            } else if (error.response?.status === 401) {
                throw new AppError(error.response?.status, 'Credenciais Incorretas')
            }
        }
    }

    return (
        <UserContext.Provider value={{ likeGame, unlikeGame, findUserByNickname, visitingUser }}>
            {children}
        </UserContext.Provider>
    )
}