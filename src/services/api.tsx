import axios from "axios";
import Category from "../models/Category";

export const api = axios.create({
    baseURL: 'https://deploy.ownquest.games',
})

// AUTH CONTEXT
export const createSession = async (email: string, password: string) => {
    return await api.post('/auth/signin', { email, password })
}

export const signupUser = async (name: string, nickname: string, email: string, password: string, birthDate: string) => {
    return await api.post('/auth/signup', { name, nickname, email, password, birthDate })
}

export const refreshToken = async () => {
    return await api.post('/auth/refresh')
}

// GAME CONTEXT
export const getUserGamesByToken = async () => {
    return await api.get('/user/games')
}

export const getHotGames = async (page: number) => {
    return await api.get(`/game/hot/${page}`)
}

export const fetchHighlightGame = async () => {
    return await api.get(`/game/highlight`)
}


// CREATION CONTEXT

//---- Page ----
export const getPagesByGameID = async (id: string) => {
    return await api.get(`/game/${id}/pages`)
}

export const patchPage = async (id: number, title: string, description: string, color: string, icon: string, number_page: number, is_last_page: boolean) => {
    return await api.patch(`/page`, {
        "id": id,
        "title": title,
        "description": description,
        "color": color,
        "icon": icon,
        "number_page": number_page,
        "is_last_page": is_last_page
    })
}

interface IPostPage {
    title: string;
    description: string;
    color: string;
    icon: string;
    number_page: number;
    is_last_page: boolean;
    game_id: number;
}

export const postPage = async (request: IPostPage) => {
    return await api.post(`/page`, {
        "title": request.title,
        "description": request.description,
        "color": request.color,
        "icon": request.icon,
        "number_page": request.number_page,
        "is_last_page": request.is_last_page,
        "game_id": request.game_id
    })
}

export const deletePage = async (id: number) => {
    return await api.delete(`/page/${id}`)
}

//---- Button  ----

export const patchButton = async (id: number, title: string, color: string, icon: string, nextPageId: number) => {
    return await api.patch(`/button`, {
        "id": id,
        "title": title,
        "color": color,
        "icon": icon,
        "nextPageId": nextPageId
    })
}

export const postButton = async (pageID: number, title: string, color: string, icon: string, nextPageId: number) => {
    return await api.post(`/button`, {
        "pageId": pageID,
        "title": title,
        "color": color,
        "icon": icon,
        "nextPageId": nextPageId
    })
}

export const deleteButton = async (id: number) => {
    return await api.delete(`/button/${id}`)
}

//---- Game  ----

export const fetchGameById = async (id: string) => {
    return await api.get(`/game/${id}`)
}

export const patchGame = async (id: number, title: string, description: string, image: string, isEditing: boolean, isPublished: boolean, isDeleted: boolean) => {
    return await api.patch(`/game`, {
        "id": id,
        "title": title,
        "description": description,
        "image": image,
        "isEditing": isEditing,
        "isPublished": isPublished,
        "isDeleted": isDeleted
    })
}

export const postGame = async () => {
    return await api.post(`/game`, {
        "title": 'Nova história',
        "description": 'Essa é uma nova história criada no Own QUest.',
        "image": null,
        "categories": []
    })
}
export const postFullGame = async (title: string, description: string, image: string, categories: Category[]) => {
    console.log(title, description, image, categories)
    return await api.post(`/game`, {
        "title": title,
        "description": description,
        "image": image,
        "categories": categories
    })
}

export const getButton = async (id: number) => {
    return await api.delete(`/button/${id}`)
}

// --- Verification ---

export const sendEmail = async () => {
    return await api.post('/user/send-verification-email')
}

export const verifyEmail = async (token: string) => {
    return await api.post(`/user/verify-email/${token}`)
}

export const deleteGame = async (id: number) => {
    return await api.delete(`/game/${id}`)
}

// --- Category ---

export const fetchCategories = async () => {
    return await api.get(`/category`)
}

// ----- User ----

export const postLikeGame = async (gameId: string) => {
    return await api.post(`/user/favorite/${gameId}`)
}

export const postUnLikeGame = async (gameId: string) => {
    return await api.delete(`/user/unfavorite/${gameId}`)
}

// ----- IMAGE UPLOAD -----

export const uploadImage = async (imageData: FormData) => {
    return await api.post(`/game/upload-game-image`, imageData)
}

export const uploadRandomImage = async (randomImageUrl: string) => {
    return await api.post(`/game/upload-random-image`, {
        "randomImageUrl": randomImageUrl
    })
}

// ------ RECOVER PASSWORD ----

export const sendRecoverEmail = async () => {
    return await api.post('/user/send-recover-password-email')
}
