import { AxiosError } from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppError from "../core/app-error";
import { HOME, LANDING_PAGE } from "../core/app-urls";
import { api, createSession, refreshToken } from '../services/api';

type AuthContextType = {
    authenticated: boolean,
    user: any,
    loading: boolean,
    login: (email: string, password: string) => Promise<{ sucess: boolean, message: string }>,
    refresh: () => Promise<void>
    logout: () => void
}

interface User {
    email: string;
    name: string;
    nickname: string;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user')
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser))
        }
        setLoading(false)
    }, [])

    async function login(email: string, password: string): Promise<{ sucess: boolean, message: string }> {
        let retorno = { sucess: false, message: '' }

        try {
            const response = await createSession(email, password)
            retorno.sucess = true
            // console.log('createSession response', response)
            retorno.message = 'Usuário autenticado com sucesso.'
            const loggedUser = await response.data.user
            const tokens = await response.data.tokens

            localStorage.setItem('user', JSON.stringify(loggedUser))
            localStorage.setItem('token', JSON.stringify(tokens))

            api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`

            setUser(loggedUser)
            navigate(HOME)

        } catch (e) {
            const error = await e as AxiosError
            // console.log('erro:',error)
            if (error.response?.status === 400) {
                retorno.message = 'Credenciais incorretas.'
            } else if (error.response?.status === 401) {
                retorno.message = 'Verifique seu e-mail por favor.'
            } else if (error.response?.status === 403) {
                retorno.message = 'Credenciais incorretas.'
            }
            retorno.sucess = false
        }


        return retorno
    };

    async function refresh() {
        const tokensJSON = localStorage.getItem('token')
        const tokens = JSON.parse(tokensJSON!)
        // console.log(`refresh for token ${tokens.access_token}`)
        // console.log(`refresh with Bearer ${tokens.refresh_token}`)

    
        try {
            const response = await refreshToken()
            const newTokens = await response.data.tokens
            api.defaults.headers.Authorization = `Bearer ${newTokens.access_token}`
        } catch (e) {
            const error = await e as AxiosError
            console.error(`Erro (${error.response?.status}) ao realizar refresh:`, error);
            if (error.response?.status === 401) {
                api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`
                throw new AppError(401, 'Refresh token inválido')
            }
        };
    }

    function logout() {
        console.log('logout')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = null
        setUser(null)
        navigate(LANDING_PAGE)
    };

    return (
        <AuthContext.Provider value={{
            authenticated: !!user,
            user,
            loading,
            login,
            refresh,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}