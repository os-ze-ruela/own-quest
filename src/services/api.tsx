import axios from "axios";

export const api = axios.create({
    baseURL: 'https://deploy.ownquest.games',
})

// AUTH CONTEXT
export const createSession = async (email: string, password: string) => {
    return await api.post('/auth/signin', { email, password })
}

export const refreshToken = async () => {
    return await api.post('/auth/refresh')
}

// GAME CONTEXT
export const getUserGamesByToken = async () => {
    return await api.get('/user/games')
}

//VERIFY CONTEXT
export const sendEmail = async () => {
    return await api.post('/user/send-verification-email')
}