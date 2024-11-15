import axios from "axios";
import Category from "../models/Category";

export const api = axios.create({
    baseURL: 'https://own-quest-server.onrender.com',
})

// AUTH CONTEXT
export const createSession = async (email: string, password: string) => {
    return await api.post('/auth/signin', { email, password })
}

// export const closeSession = async () => {
//     return await api.post('auth/logout')
// }

export const signupUser = async (name: string, nickname: string, email: string, password: string, birthDate: string) => {
    return await api.post('/auth/signup', { name, nickname, email, password, birthDate })
}

export const patchUser = async (userId: number, name: string, nickname: string) => {
    return await api.patch('/user', { "id": userId, "name": name, "nickname": nickname, })
}

export const serDelete = async (userId: number) => {
    return await api.delete('/user/delete', { params: { "id": userId } });
  }

export const refreshToken = async () => {
    return await api.post('/auth/refresh')
}

export const getUserByAccessToken = async () => {
    return await api.get('/user')
}

// GAME CONTEXT
export const getUserGamesByToken = async () => {
    return await api.get('/user/games')
}

export const getUserGamesById = async (id: number) => {
    return await api.get(`user/${id}/games`)
}

export const getUserRelevantsGamesById = async (id: number) => {
    return await api.get(`user/${id}/relevants`)
}

export const getHotGames = async (page: number) => {
    return await api.get(`/game/hot/${page}`)
}

export const fetchHighlightGame = async () => {
    return await api.get(`/game/highlight`)
}

export const getGamesByCategory = async (id: number) => {
    return await api.get(`/game/find/category/${id}`)
}

export const findGamesByTitle = async (title: string) => {
    return await api.get(`/game/find/${title}`)
}


// CREATION CONTEXT

//---- Page ----
export const getPagesByGameID = async (id: string, play: boolean) => {
    return await api.get(`/game/${id}/pages?play=${play}`)
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

export const publishGame = async (id: number) => {
    return await api.patch(`/game/publish/${id}`)
}

export const unpublishGame = async (id: number) => {
    return await api.patch(`/game/unpublish/${id}`)
}

export const reportGame = async (gameId: number, userId: number, complain: string) => {
    return await api.post(`/report`, {
        "gameId": gameId,
        "userId": userId,
        "complain": complain,
    })
}


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

export const postGameCategoryByID = async (id: number, categories: Number[]) => {
    return await api.post(`/game/${id}/categories`, {
        "categories": categories
    })
}

export const deleteGameCategoryByID = async (idGame: number, idCategory: number) => {
    return await api.delete(`/game/${idGame}/categories/${idCategory}`)
}

export const postFullGame = async (title: string, description: string, image: string, categories: Category[]) => {
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


export const fetchGameHistory = async (id: number) => {
    return await api.get(`/play-games/${id}`)
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
export const fetchCategoriesById = async (id: number) => {
    return await api.get(`/category/${id}`)
}


// ----- User ----

export const postLikeGame = async (gameId: string) => {
    return await api.post(`/user/favorite/${gameId}`)
}

export const postUnLikeGame = async (gameId: string) => {
    return await api.delete(`/user/unfavorite/${gameId}`)
}

export const getUserByNickname = async (nickname: string) => {
    return await api.get(`/user/find/${nickname}`)
}

export const updateProfile = async (userId: string, name: string, nickname: string) => {
    return await api.patch(`/user`, {userId, name, nickname})
}

export const postFollowUser = async (followerId: string, followedId: string) => {
    return await api.post(`/user/${followerId}/follow/${followedId}`)
}

export const postUnfollowUser = async (followerId: string, followedId: string) => {
    return await api.delete(`/user/${followerId}/unfollow/${followedId}`)
}

export const userDelete = async () =>{
    return await api.delete(`/user/delete`)
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


// ------ PLAY GAMES  ----

export const fetchResumePlayedGames = async (userId: number, gameId: number) => {
    return await api.get(`/play-games/resume-game/user/${userId}/game/${gameId}`)
}


export const postPlayedGame = async (userId: number, gameId: number) => {
    return await api.post(`/play-games`, {
        "userId": userId,
        "gameId": gameId
    })
}

export const postSelectedButton = async (playGameId: number, historicGameId: number, buttonId: number, buttonText: string, buttonNextPageId: number) => {
    return await api.post(`/play-games/select-button`, {
        "playGameId": playGameId,
        "historicGameId": historicGameId,
        "buttonId": buttonId,
        "buttonText": buttonText,
        "buttonNextPageId": buttonNextPageId
    })
}

export const postFinishPlayingGame = async (gameId: number) => {
    return await api.post(`/play-games/finish-user-play/${gameId}`)
}

export const postFinishAndPlay = async (userId: number, gameId: number) => {
    return await api.post(`/play-games/finish-and-play/`, {
        "userId": userId,
        "gameId": gameId
    })
}

export const getUserPlayGames = async (userId: string) => {
    return await api.get(`/play-games/user/${userId}`)
}

export const getUserPlayAllGames = async (userId: string) => {
    return await api.get(`/play-games/user/${userId}/all`)
}

// AI
export const generateDescriptionWithIA = async (userId: number, description: string) => {
    return await api.post(`/ia-generation/description`, {
        "userId": userId,
        "description": description
    })
}

export const generateImageWithIA = async (userId: number, description: string) => {
    return await api.post(`/ia-generation/image`, {
        "userId": userId,
        "description": description
    })
}

export const postIncrementAIGameGeneration = async (userId: number) => {
    return await api.post(`/ia-generation/game`, {
        "userId": userId
    })
}

// COMMENTS
export const postComment = async (autorId: number, gameId: number, content: string) => {
    return await api.post(`/comment`, {
        "userId": autorId,
        "gameId": gameId,
        "content": content
    })
}

export const deleteCommentById = async (commentId: number) => {
    return await api.delete(`/comment/${commentId}`)
}

export const fetchCommentsByGameId = async (gameId: string) => {
    return await api.get(`/comment/${gameId}`)
}
