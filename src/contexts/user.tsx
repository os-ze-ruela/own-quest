import axios, { AxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import AppError from "../core/app-error";
import User from "../models/User";
import UserCategory from "../models/UserCategory";
import { api, getUserByNickname, postLikeGame, postUnLikeGame, postFollowUser, postUnfollowUser, updateProfile} from "../services/api";
type UserContextType = {
    likeGame: (gameId: string) => Promise<void>
    unlikeGame: (gameId: string) => Promise<void>
    findUserByNickname: (nickname: string) => Promise<void>
    visitingUser: User | null,
    setVisitingUser: (visitingUser: User | null) => void
    followUser: (followerId: string, followedId: string) => Promise<void>
    unfollowUser: (followerId: string, followedId: string) => Promise<void>
    open: boolean,
    setOpen: (open: boolean) => void,
    updateProfileInfo: (userId: string, name: string, nickname: string) => Promise<void>,
    deleteUser: (idUsuario: string) => Promise<void>
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: { children: ReactNode }) => {

    const [open, setOpen] = useState(false);
    const [visitingUser, setVisitingUser] = useState<User | null>(null)

    const toggleDrawer = () => {
        setOpen(!open);
    };
    
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
            const { id, name, email, nickname,
                birthDate, followers, following,
                photo, createdAt, isDeleted,
                isFollowing, categories } = response.data

            const userCategories = categories.map((category: any) => {
                const { id, title, color, timesUsed } = category
                return new UserCategory({ id, title, color, timesUsed });
            });

            setVisitingUser(new User({
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

    async function followUser(followerId: string, followedId: string): Promise<void> {
        try {
            await postFollowUser(followerId, followedId)
        } catch (e) {
            const error = await e as AxiosError
            console.error(`Erro (${error.response?.status}) ao seguir usuário ${followedId}`, error);
            if (error.response?.status === 400) {
                throw new AppError(400, 'Usuário não encontrado')
            } else if (error.response?.status === 401) {
                throw new AppError(error.response?.status, 'Credenciais Incorretas')
            }
        }
    };


    async function unfollowUser(followerId: string, followedId: string): Promise<void> {
        try {
            await postUnfollowUser(followerId, followedId)
        } catch (e) {
            const error = await e as AxiosError
            console.error(`Erro (${error.response?.status}) ao parar de seguir usuário ${followedId}`, error);
            if (error.response?.status === 400) {
                throw new AppError(400, 'Usuário não encontrado')
            } else if (error.response?.status === 401) {
                throw new AppError(error.response?.status, 'Credenciais Incorretas')
            }
        }
    };


    async function updateProfileInfo  (idUsuario: string, novoNome: string, novoNickname: string): Promise<void> {
        const url = '/user'; 

        try {
            const tokensJSON = localStorage.getItem("token");
            const tokens = JSON.parse(tokensJSON!);
    
            const config = {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`, 
              },
            };

            const body = {
                idUsuario: idUsuario,
                nome: novoNome,
                nickname: novoNickname
            };

          const response = await api.patch(url, body, config);
      
          console.log(response.data); 
        } catch (error) {
          console.error('Erro na troca de nome e nickname:', error);
        }
      };

      async function deleteUser(idUsuario: string): Promise<void> {
        const url = '/user/delete';
      
        try {
          const tokensJSON = localStorage.getItem("token");
          const tokens = JSON.parse(tokensJSON!);
      
          const config = {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          };
      
          const body = {
            idUsuario: idUsuario,
          };
      
          const response = await api.delete(url, { data: body, headers: config.headers });
      
          console.log(response.data);
        } catch (error) {
          console.error('Erro ao deletar o usuário:', error);
        }
      };

    return (
        <UserContext.Provider value={{ deleteUser, likeGame, unlikeGame, findUserByNickname, followUser, unfollowUser, setOpen, visitingUser, setVisitingUser, open, updateProfileInfo }}>
            {children}
        </UserContext.Provider>
    )
}