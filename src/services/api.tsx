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

// CREATION CONTEXT

//---- Page ----
export const getPagesByGameID = async (id: number) => {
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

export const postPage = async (title: string, description: string, color: string, icon: string, number_page: number, is_last_page: boolean, game_id: number) => {
    return await api.post(`/page`, {
        "title": title,
        "description": description,
        "color": color,
        "icon": icon,
        "number_page": number_page,
        "is_last_page": is_last_page,
        "game_id": game_id
    })
}

export const deletePage = async (id: number) => {
    return await api.delete(`/page/${id}`)
}

//---- Button  ----

export const patchButton = async (id: number, title: string, color: string, icon: string) => {
    return await api.patch(`/button`, {
        "id": id,
        "title": title,
        "color": color,
        "icon": icon,
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

export const postGame = async (title: string, description: string, image: string, categories: string) => {
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

// --- Category ---
