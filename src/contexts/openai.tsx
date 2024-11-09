import axios, { AxiosError } from 'axios';
import { ReactNode, createContext, useContext, useState } from "react";
import { GameContext } from '../contexts/game';
import AppError from '../core/app-error';
import { Button } from "../models/Button";
import { Page } from "../models/Page";
import { api, generateDescriptionWithIA, postButton, postIncrementAIGameGeneration, postPage } from "../services/api";

interface ErrorData {
  statusCode: number;
  message: string;
}

type OpenAIContextType = {
  pages: Page[],
  setPages: (pages: Page[]) => void,
  createRandomGame: (randomGame: any) => Promise<number>,
  chat: (message: string) => Promise<string>,
  improveDescription: (userId: number, description: string) => Promise<string>,
  generateImage: (userId: number, description: string) => Promise<string>,
  generateRandomGame: (numPages: number, category: string) => Promise<string>
  generateRandomGameByDescription: (numPages: number, category: string, description: string, userId: number) => Promise<string>
  incrementAIGameGeneration: (userId: number) => Promise<void>
}

export const OpenAIContext = createContext<OpenAIContextType>({} as OpenAIContextType)

export const OpenAIProvider = ({ children }: { children: ReactNode }) => {


  const { createFullGame } = useContext(GameContext)

  const [pages, setPages] = useState<Page[]>([])

  const API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;

  async function chat(message: string): Promise<string> {
    const response = await axios.post(
      `https://api.openai.com/v1/chat/completions`,
      {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": `${message}` }],
        "temperature": 1.0
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  }

  async function improveDescription(userId: number, description: string): Promise<string> {

    const response = await generateDescriptionWithIA(userId, description);

    return response.data.description
  }

  async function generateImage(userId: number, description: string): Promise<string> {

    try {
      const response = await api.post('/ia-generation/image', { description: description, userId: userId });
      return response.data.image as string;
    } catch (e) {
      const error = (await e) as AppError;
      throw error;
    }

  }

  async function generateRandomGame(numPages: number, category: string): Promise<string> {
    const defaultPrompt = `Eu tenho uma plataforma de criação de histórias e desejo criar histórias aleatórias. Todas
                                histórias seguem um padrão de criação. A história possui uma ou mais categorias
                                (Aventura, ação, terror, suspense, e outras.), possui um título e uma descrição. Cada história é dividida em páginas. Cada página possui: um título, uma descrição, um conjunto de botões
                                e um indicação se é uma página de final da história (pode haver uma ou mais páginas de
                                final de história). Caso o seja uma página final "is_last_page"=true, todas as páginas que não são finais devem ter ao menos um botão, cada botão possui um título e cada botão redireciona para outra página da
                                história (pode ser uma página já visitada ou não).
                                Fornecendo a categoria da história e o número de páginas da história, gostaria que gerasse
                                uma história baseada nos parâmetros "Categoria da História" e "Número de páginas da história", crie um título, descrição e as páginas seguindo o seguinte formato JSON:

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

                                Parâmetros:
                                Categoria da História: ${category}
                                Número de páginas da história:  ${numPages}  
                                `;


    const response = await chat(defaultPrompt);

    return response
  }

  async function generateRandomGameByDescription(numPages: number, category: string, description: string, userId: number): Promise<string> {
    console.log("generateRandomGameByDescription...")
    try {
      const response = await api.post('/ia-generation/game', { description: description, numPages: numPages, category: category, userId: userId });
      console.log("Resposta da geração de jogo com descrição = ", response.data)
      return response.data
    } catch (error) {
      throw new AppError(500, 'Ocorreu um problema ao gerar a sua história com ia')
    }
  }



  async function createRandomGame(randomGame: any): Promise<number> {
    console.log("JSON do game a ser gerado = ");
    console.log(randomGame);

    // cria um novo jogo
    const newGameID = await createFullGame(randomGame);

    const pagesTemp: Page[] = [];
    await Promise.all(
      randomGame.pages.map(async (page: any, index: any) => {
        const pageTemp = page;
        console.log("Página que será gerada:")
        console.log(pageTemp)
        console.log("Cor da página que será gerada: ", pageTemp.color)
        try {
          const response = await postPage({
            title: pageTemp.title,
            description: pageTemp.description,
            icon: pageTemp.icon,
            color: pageTemp.color,
            number_page: Number(index),
            is_last_page: Boolean(pageTemp.is_last_page),
            game_id: newGameID,
          });
          pageTemp.id = response.data.id;
          pagesTemp.push(pageTemp);
        } catch (error) {
          console.error(error)
        }
      })
    );

    console.log("Páginas a ser criadas = ", pagesTemp.length)

    // Post buttons for each page
    for (let i = 0; i < pagesTemp.length; i++) {
      const page = pagesTemp[i];
      const buttonsTemp: Button[] = [];

      const pageId = page.id;
      console.log("Quantidade de botões na página a ser criada = ", page.buttons.length);
      if (page.buttons.length > 0) {
        for (let j = 0; j < page.buttons.length; j++) {
          const button = page.buttons[j];
          const buttonTemp = button;

          const destinationPage = pagesTemp.find(p => p.number_page === button.nextPageId);
          if (destinationPage) {
            const destinationId = destinationPage.id;
            buttonTemp.nextPageId = destinationId;

            console.log("Botão que será adicionado:")
            console.log(buttonTemp)

            try {
              const response = await postButton(
                pageId,
                buttonTemp.title,
                buttonTemp.color,
                buttonTemp.icon,
                buttonTemp.nextPageId
              );
              console.log("Resposta do botão criada: ", response)
              buttonsTemp.push(buttonTemp);
            } catch (error) {
              console.error(error)
            }
          } else {
            console.error("Destination page not found");
          }
        }
      }

      pagesTemp[i].buttons = buttonsTemp;
    }

    setPages(pagesTemp);

    return newGameID;
  }

  async function incrementAIGameGeneration(userId: number): Promise<void> {
    try {
      await postIncrementAIGameGeneration(userId)
    }
    catch (e) {
      const error = (await e) as AxiosError;
      if (error.response?.data) {
        const { statusCode, message } = error.response.data as ErrorData;
        if (statusCode && message) {
          throw new AppError(statusCode, message)
        }
      }
    }
  }


  return (
    <OpenAIContext.Provider value={{ pages, setPages, createRandomGame, chat, generateImage, improveDescription, generateRandomGame, generateRandomGameByDescription, incrementAIGameGeneration }}>
      {children}
    </OpenAIContext.Provider>
  )
}