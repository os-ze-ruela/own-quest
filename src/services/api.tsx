import axios from "axios";

export const api = axios.create({
    baseURL: 'https://deploy.ownquest.games',
})

// AUTH CONTEXT
export const createSession = async (email: string, password: string) => {
    return await api.post('/auth/signin', { email, password })
}

export const signupUser = async (name: string, nickname: string, email: string, password: string, birthDate: string) => {
    return await api.post('/auth/signup', {name, nickname, email, password, birthDate})
}

export const refreshToken = async () => {
    return await api.post('/auth/refresh')
}

// GAME CONTEXT
export const getUserGamesByToken = async () => {
    return await api.get('/user/games')
}