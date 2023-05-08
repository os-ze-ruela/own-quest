import { AxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import AppError from "../core/app-error";
import Category from "../models/Category";
import Game from "../models/Game";
import { api, deleteGame, fetchGameById, getHotGames, getUserGamesByToken, patchGame, postGame } from "../services/api";
import { Page } from "../models/Page";
import { Button } from "../models/Button";
import axios from 'axios';

type OpenAIContextType = {
    pages: Page[],
    setPages: (pages: Page[]) => void,
    createRandomGame: (randomGame: any) => void,
    chat: (message: string) => Promise<string>
}

export const OpenAIContext = createContext<OpenAIContextType>({} as OpenAIContextType)

export const OpenAIProvider = ({ children }: { children: ReactNode }) => {

    const [pages, setPages] = useState<Page[]>([])

    const API_KEY = process.env.OPEN_AI_API_KEY
    
    async function chat(message: string): Promise<string> {
      const response = await axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": `${message}`}],
            "temperature": 0.7
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response)
      return response.data.choices[0].message.content;
    }
    


    async function createRandomGame(randomGame: any) {
        const pagesTemp: Page[] = [];
        randomGame.map((page: any, index: any) => {
            const pageTemp = page;
            // const { id } = ADICIONAR NO BANCO
            // pageTemp.id = id;
            pagesTemp.push(pageTemp)
        })

        pagesTemp.map((page, index) => {
            const buttonsTemp: Button[] = [];
            randomGame[index].buttons.map((button: any, index: any) => {
                const buttonTemp = button;
                buttonTemp.nextPageId = pagesTemp[button.nextPageId].id
                // const { id } = ADICIONAR NO BANCO
                // buttonTemp.id = id;
                buttonsTemp.push(buttonTemp)
            })

            pagesTemp[index].buttons = buttonsTemp;
        })

        setPages(pagesTemp)
    }



    return (
        <OpenAIContext.Provider value={{pages, setPages, createRandomGame, chat}}>
            {children}
        </OpenAIContext.Provider>
    )
}