import axios from 'axios';
import { ReactNode, createContext, useState } from "react";
import { Button } from "../models/Button";
import { Page } from "../models/Page";

type OpenAIContextType = {
    pages: Page[],
    setPages: (pages: Page[]) => void,
    createRandomGame: (randomGame: any) => void,
    chat: (message: string) => Promise<string>,
    dalleAPI: (message: string) => Promise<string>,
    improveDescription: (description: string) => Promise<string>, 
}

export const OpenAIContext = createContext<OpenAIContextType>({} as OpenAIContextType)

export const OpenAIProvider = ({ children }: { children: ReactNode }) => {

    const [pages, setPages] = useState<Page[]>([])

    const API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;

    async function chat(message: string): Promise<string> {
        console.log(API_KEY)
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

    async function improveDescription(description: string): Promise<string>{
        const defaultPrompt = "Melhore a sinopse da história deixando-a mais detalhada, utilizando apenas um parágrafo: "

        const response = await chat(defaultPrompt+description);

        console.log(response)

        return response
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
                // buttonTemp.nextPageId = pagesTemp[button.nextPageId].id
                // const { id } = ADICIONAR NO BANCO
                // buttonTemp.id = id;
                buttonsTemp.push(buttonTemp)
            })

            pagesTemp[index].buttons = buttonsTemp;
        })

        setPages(pagesTemp)
        console.log(pagesTemp)
    }

        async function dalleAPI(message: string): Promise<string> {
            const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
                model: "image-alpha-001",
                prompt: message,
                num_images: 1,
            },
            {
                headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                },
            }
            );
            return response.data.data[0].url;
        }


    return (
        <OpenAIContext.Provider value={{pages, setPages, createRandomGame, chat, dalleAPI, improveDescription}}>
            {children}
        </OpenAIContext.Provider>
    )
}