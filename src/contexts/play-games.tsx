import { AxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import AppError from "../core/app-error";
import Category from "../models/Category";
import Game from "../models/Game";

import { api, postPlayedGame } from "../services/api";


type PlayGamesContextType = {
    playGame: (userId: number, gameId: number) => Promise<any>,
}

export const PlayGamesContext = createContext<PlayGamesContextType>({} as PlayGamesContextType)

export const PlayGamesProvider = ({ children }: { children: ReactNode }) => {

    
    async function playGame(userId: number, gameId: number): Promise<any> {
        try {
            const response = await postPlayedGame(userId, gameId)
            return response;
        } catch (e) {
            const error = await e as AxiosError
            console.log(error)
            throw new AppError(error.response!.status, error.message);
        }
    }



    return (
        <PlayGamesContext.Provider value={{
            playGame,
        }}>
            {children}
        </PlayGamesContext.Provider>
    )
}