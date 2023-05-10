import { AxiosError } from "axios";
import { ReactNode, createContext, useState, useContext } from "react";
import { Page } from "../models/Page";
import { Button } from "../models/Button";
import axios from 'axios';
import { GameContext } from '../contexts/game';
import { create } from "domain";
import Game from "../models/Game";
import { CreationContext } from "./creation";
import { api, deleteButton, deletePage, getPagesByGameID, patchButton, patchPage, postButton, postPage } from "../services/api";

type OpenAIContextType = {
    pages: Page[],
    setPages: (pages: Page[]) => void,
    createRandomGame: (randomGame: any) => void,
    chat: (message: string) => Promise<string>,
    dalleAPI: (message: string) => Promise<string>,
    improveDescription: (description: string) => Promise<string>, 
    generateRandomGame: (numPages: number, category: string) => Promise<string>
}

export const OpenAIContext = createContext<OpenAIContextType>({} as OpenAIContextType)

export const OpenAIProvider = ({ children }: { children: ReactNode }) => {

    const [pages, setPages] = useState<Page[]>([])

    const API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;

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

    async function improveDescription(description: string): Promise<string>{
        const defaultPrompt = "Substitua a sinopse da história deixando-a mais detalhada, utilizando apenas um parágrafo: "

        const response = await chat(defaultPrompt+description);

        console.log(response)

        return response
    }

    async function generateRandomGame(numPages: number, category: string): Promise<string>{
        const defaultPrompt = `Eu tenho uma plataforma de criação de histórias e desejo criar histórias aleatórias. Todas
                                histórias seguem um padrão de criação. A história possui uma ou mais categorias
                                (Aventura, ação, terror, suspense, e outras.), possui um título e uma descrição. Cada história é dividida em páginas. Cada página possui: um título, uma descrição, um conjunto de botões
                                e um indicação se é uma página de final da história (pode haver uma ou mais páginas de
                                final de história). Cada botão possui um título e cada botão redireciona para outra página da
                                história (pode ser uma página já visitada ou não).
                                Fornecendo a categoria da história e o número de páginas da história, gostaria que gerasse
                                uma história seguindo o seguinte formato JSON:

                                {
                                "title": "",
                                "description": "",
                                "image": "",
                                "categories": "",
                                “pages”: [
                                    {
                                    "id": 1
                                        "title": "",
                                        "description": "",
                                        "color": "#568EA3",
                                        "number_page": 0,
                                        "is_last_page": false,
                                        "icon": "",
                                        "buttons": [
                                            {
                                                "id": 1
                                                "title": "",
                                                "nextPageId": 1,
                                                "icon": "",
                                                "color": "#202331"
                                            }
                                        ]
                                    }
                                ]
                                }
                                --------------------------------
                                Retorne apenas o JSON

                                Categoria da História: ${category}
                                Número de páginas da história:  ${numPages}  
                                `;


        const response = await chat(defaultPrompt);

        return response
    }

    const { createFullGame } = useContext(GameContext)

    async function createRandomGame(randomGame: any) {
        console.log("JSON do game a ser gerado = ")
        console.log(randomGame)

        // cria um novo jogo
        const newGameID = await createFullGame(randomGame)
      
        const pagesTemp: Page[] = [];
        randomGame.pages.map( async (page: any, index: any) => {
            const pageTemp = page;
            const response = await postPage({
                title: page.title,
                description: page.description,
                icon: page.icon,
                color: page.color,
                number_page: index,
                is_last_page: page.isLastPage,
                game_id: newGameID
            })
            pageTemp.id = response.data.id;
            pagesTemp.push(pageTemp)
        })

        pagesTemp.map((page, index) => {
            const buttonsTemp: Button[] = [];
            randomGame.pages[index].buttons.map(async (button: any, index: any) => {
                const buttonTemp = button;
                const respons = await postButton(page.id,button.title,button.color,button.icon, button.nextPageId)
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
        <OpenAIContext.Provider value={{pages, setPages, createRandomGame, chat, dalleAPI, improveDescription, generateRandomGame}}>
            {children}
        </OpenAIContext.Provider>
    )
}