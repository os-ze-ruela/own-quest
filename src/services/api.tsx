import axios from "axios";

export const api = axios.create({
    baseURL: 'https://deploy.ownquest.games',
})

export const createSession = async(email: string, password: string) => {
    return await api.post('/auth/signin', {email, password})
}