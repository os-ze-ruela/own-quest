import { AxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import AppError from "../core/app-error";

import { fetchResumePlayedGames, postFinishAndPlay, postFinishPlayingGame, postPlayedGame, postSelectedButton } from "../services/api";


type PlayGamesContextType = {
    playGame: (userId: number, gameId: number) => Promise<any>,
    finishPlayingGame: (gameId: number) => Promise<any>,
    getResumePlayedGame: (userId: number, gameId: number) => Promise<any>,
    currentPlayingPage: number,
    setCurrentPlayingPage: (page: number) => void,
    postSelectedButtonPlayingGame: (playGameId: number, historicGameId: number, buttonId: number, buttonText: string, buttonNextPageId: number) => Promise<any>,
    historicGameId: number, 
    setHistoricGameId: (id: number) => void,
    playGameId: number, 
    setPlayGameId: (id: number) => void,
    finishAndPlay: (userId: number, gameId: number) => Promise<any>,
}

export const PlayGamesContext = createContext<PlayGamesContextType>({} as PlayGamesContextType)

export const PlayGamesProvider = ({ children }: { children: ReactNode }) => {
    const [currentPlayingPage, setCurrentPlayingPage] = useState(0);
    const [playGameId, setPlayGameId] = useState(0);
    const [historicGameId, setHistoricGameId] = useState(0);
    
    async function playGame(userId: number, gameId: number): Promise<any> {
        try {
            const response = await postPlayedGame(userId, gameId)
            return response;
        } catch (e) {
            const error = await e as AxiosError
            throw new AppError(error.response!.status, error.message);
        }
    }
    async function finishPlayingGame(gameId: number): Promise<any> {
        try {
            const response = await postFinishPlayingGame(gameId)
            return response;
        } catch (e) {
            const error = await e as AxiosError
            throw new AppError(error.response!.status, error.message);
        }
    }

    async function finishAndPlay(userId: number, gameId: number): Promise<any> {
        try {
            const response = await postFinishAndPlay(userId, gameId)
            return response;
        } catch (e) {
            const error = await e as AxiosError
            throw new AppError(error.response!.status, error.message);
        }
    }
    
    async function getResumePlayedGame(userId: number, gameId: number): Promise<any> {
        try {
            const response = await fetchResumePlayedGames(userId, gameId)
            return response;
        } catch (e) {
            const error = await e as AxiosError
            throw new AppError(error.response!.status, error.message);
        }
    }
    
    
    async function postSelectedButtonPlayingGame(playGameId: number, historicGameId: number, buttonId: number, buttonText: string, buttonNextPageId: number): Promise<any> {
        try {
            const response = await postSelectedButton(playGameId, historicGameId, buttonId, buttonText, buttonNextPageId)
            return response;
        } catch (e) {
            const error = await e as AxiosError
            throw new AppError(error.response!.status, error.message);
        }
    }
    
    
    
    return (
        <PlayGamesContext.Provider value={{
            playGame,
            finishPlayingGame,
            getResumePlayedGame,
            currentPlayingPage,
            setCurrentPlayingPage,
            postSelectedButtonPlayingGame,
            historicGameId, 
            setHistoricGameId,
            playGameId, 
            setPlayGameId,
            finishAndPlay
        }}>
            {children}
        </PlayGamesContext.Provider>
    )
}