import React, { useState, useEffect, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {api, createSession} from '../services/api'
import axios, {AxiosError} from "axios";

type AuthContextType = {
    authenticated: boolean,
    user: any,
    loading: boolean,
    login: (email: string, password: string) => Promise<{sucess: boolean, message: string}>,
    logout: () => void
  }

interface User {
    email: string;
    name: string;
    nickname: string;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] =useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user')
        if(recoveredUser) {
            setUser(JSON.parse(recoveredUser))
        }
        setLoading(false)
    }, [])

    async function login(email: string, password: string): Promise<{sucess: boolean, message: string}> {
        let retorno = {sucess: false, message: ''}
        if (!!user) {
            retorno.sucess = false
            retorno.message = 'Já há um usuário logado.'
        } else {
            try{
                const response = await createSession(email, password)
                retorno.sucess = true
                // console.log('createSession response', response)
                retorno.message = 'Usuário autenticado com sucesso.'
                const loggedUser = await response.data.user
                const tokens = await response.data.tokens
    
                localStorage.setItem('user', JSON.stringify(loggedUser))
                localStorage.setItem('token', JSON.stringify(tokens))
    
                api.defaults.headers.Authorization = `Bearer ${tokens['acess_token']}`
    
                setUser(loggedUser)
                navigate('/logged')
                
            } catch(e) {
                const error = await e as AxiosError
                // console.log('erro:',error)
                if(error.response?.status === 400) {
                    retorno.message = 'Credenciais incorretas.'
                } else if(error.response?.status === 401) {
                    retorno.message = 'Verifique seu e-mail por favor.'
                } else if(error.response?.status === 403) {
                    retorno.message = 'Credenciais incorretas.'
                }
                retorno.sucess = false
            }    
        }
        
        return retorno
    };

    function logout() {
        console.log('logout')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = null
        setUser(null)
        navigate('/')
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user,
                                        user,
                                        loading,
                                        login,
                                        logout }}>
            {children}
        </AuthContext.Provider>
    )
}