import { AxiosError } from "axios";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import AppError from "../core/app-error";
import { Page as PageModel } from '../models/Page';
import { Button, Button as ButtonModel } from '../models/Button';


type CreationContextType = {
    indexSelected: number,
    indexButton: number,
    pages: PageModel[],
    actionBarSelected: boolean,
    handleCheckboxClick: () => void,
    handleAddButtonClick: (index: number) => void,
    handleAddPageClick: (index: number) => void,
    handleTextChange: (pageIndex: number, buttonIndex: number, newButtonText: string) => void,
    setIndexSelected: (index: number) => void,
    setIndexButton: (index: number) => void,
    setPages: (page: PageModel[]) => void,
    handleBackClick: () => void,
    handleCreateClick: () => void,
    handleButtonColorChange: (pageIndex: number, buttonIndex: number, color: string) => void,
    setActionBarSelected: (value: boolean) => void,
    handleButtonActionBar: (index: number, actionBarSelected:boolean) => void
    handlePageActionBar: (index: number, actionBarSelected:boolean) => void
    getPagesFromGameID: (id: number) => void
}

interface PageResponse {
    id: number;
    title: string;
    description: string;
    color: string;
    is_last_page: boolean;
    buttons: Button[];
  }


export const CreationContext = createContext<CreationContextType>({} as CreationContextType)

export const CreationProvider = ({ children }: { children: ReactNode }) => {


  async function getPagesFromGameID(id: number) {
    const endPoint = `https://deploy.ownquest.games/game/${id}/pages`
    // const endPoint = 'http://localhost:5000/game/3/pages'

    const tokensJSON = localStorage.getItem('token')

    const tokens = JSON.parse(tokensJSON!)
    
    try {
        const response = await fetch(endPoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'Content-Type': 'application/json'
        }
    });

    const data: PageResponse[] = await response.json();
    const pages: PageModel[] = data.map(page => new PageModel(page.id, page.title, page.description, page.color, page.buttons));
    setPages(pages);

  } catch (error) {
    console.error(error)
  }
}
 
  const [indexSelected, setIndexSelected] = useState(0);
  const [indexButton, setIndexButton] = useState(0);

  
  // 0 - PAGE | 1 - BUTTON
  const [actionBarSelected, setActionBarSelected] = useState(true);
 

  
  const [pages, setPages] = useState<PageModel[]>([
    new PageModel(1, "História 1", "Descrição teste", '#568EA3', []),
  ])


  const handleCheckboxClick = () => {
    let pagesTemp = [...pages];
    pagesTemp[indexSelected].isLastPage = !pagesTemp[indexSelected].isLastPage;
    setPages(pagesTemp);
  };

  const handleAddButtonClick = (index: number) => {
    if (pages[indexSelected].buttons.length < 4) {
      const newButton = new ButtonModel(1, '', 1, '', '#202331')
      let pagesTemp = [...pages];
      const buttons = pagesTemp[index].buttons
      const updatedButtons = [...buttons, newButton]
      pagesTemp[index].buttons = updatedButtons
      setPages(pagesTemp)
    }
  };

  const handleAddPageClick = (index: number) => {
    const newPage = new PageModel(index + 1, "História " + index, "Descrição teste", '#568EA3', []);
    let pagesTemp = [...pages, newPage];
    setPages(pagesTemp);
    setIndexSelected(pages.length);
    console.log(pages);
  };

  const handleTextChange = (pageIndex: number, buttonIndex: number, newButtonText: string) => {
    let pagesTemp = [...pages];
    let buttons = [...pagesTemp[pageIndex].buttons]
    buttons[buttonIndex].title = newButtonText
    pagesTemp[pageIndex].buttons = buttons
    setPages(pagesTemp)
  };

  const handleButtonColorChange = (pageIndex: number, buttonIndex: number, color: string) => {
    let pagesTemp = [...pages];
    let buttons = [...pagesTemp[pageIndex].buttons]
    buttons[buttonIndex].color = color
    pagesTemp[pageIndex].buttons = buttons
    setPages(pagesTemp);
   
  };

  const handleButtonActionBar = (index: number, actionBarSelected:boolean) =>{
    console.log(pages[indexSelected].buttons[index].color)
    console.log("Button Index = "+ index)
    setIndexButton(index)
    setActionBarSelected(false)
}

  const handlePageActionBar = (index: number, actionBarSelected:boolean) =>{
    console.log(pages[indexSelected].buttons[index].color)
    console.log("Button Index = "+ index)
    setIndexButton(index)
    setActionBarSelected(true)
    console.log(actionBarSelected)
}


  const handleBackClick = () => {
      
  };


  const handleCreateClick = () => {

  };

    return (
        <CreationContext.Provider value={{ indexSelected,
                                            indexButton,
                                            pages,
                                            handleCheckboxClick,
                                            handleAddButtonClick,
                                            handleAddPageClick,
                                            handleTextChange,
                                            setIndexSelected,
                                            setIndexButton,
                                            setPages,
                                            handleBackClick,
                                            handleCreateClick,
                                            handleButtonColorChange,
                                            actionBarSelected,
                                            handleButtonActionBar,
                                            handlePageActionBar,
                                            setActionBarSelected,
                                            getPagesFromGameID
                                            }}>
            {children}
        </CreationContext.Provider>
    )
}

