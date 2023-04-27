import { AxiosError } from "axios";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import AppError from "../core/app-error";
import { Page, Page as PageModel } from '../models/Page';
import { Button, Button as ButtonModel } from '../models/Button';
import { api, deleteButton, deletePage, getPagesByGameID, patchButton, patchPage, postButton, postPage } from "../services/api";


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
  handleButtonActionBar: (index: number, actionBarSelected: boolean) => void
  handlePageActionBar: (index: number, actionBarSelected: boolean) => void
  getPagesFromGameID: (id: number) => void
  updatePage: (page: PageModel) => void
  updateButton: (button: ButtonModel) => void
  addPage: (page: PageModel) => void
  deletePageByID: (id: number) => void
  addButton: (pageId: number) => Promise<ButtonModel>
  deleteButtonByID: (id: number) => void
  loading: boolean
  handleDeleteButton: () => void
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

  //---Page---
  async function addPage(page: PageModel) {
    try {
      await postPage(page.title, page.description, page.color, "", page.id, page.isLastPage, 1)
      console.log("Page added")
    } catch (error) {
      console.error(error)
    }
  }

  async function deletePageByID(id: number) {
    try {
      await deletePage(id)

    } catch (error) {
      console.error(error)
    }
  }

  async function getPagesFromGameID(id: number) {
    try {

      const tokensJSON = localStorage.getItem('token')
      const tokens = JSON.parse(tokensJSON!)
      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`


      const response = await getPagesByGameID(id)

      const data: PageResponse[] = await response.data;
      const pages: PageModel[] = data.map(page => new PageModel(page.id, page.title, page.description, page.color, page.buttons));
      setPages(pages);

    } catch (error) {
      console.error(error)
    }
  }


  async function updatePage(page: PageModel) {
    try {
      setLoading(true)
      await patchPage(page.id, page.title, page.description, page.color, "", indexSelected, page.isLastPage)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }


  //---Button---
  async function updateButton(button: ButtonModel) {
    try {
      setLoading(true)
      await patchButton(button.id, button.title, button.color, "")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  async function addButton(pageId: number): Promise<ButtonModel> {
    try {
      const response = await postButton(pageId, '', '#202331', "", 1)
      const { id, title, color, nextPageId, icon } = response.data
      return new ButtonModel(id, title, nextPageId, icon, color);
    } catch (error) {
      console.error(error)
      throw new AppError(500, 'Ocorreu um erro ao criar o botão')
    }
  }

  async function deleteButtonByID(id: number) {
    try {
      await deleteButton(id)
    } catch (error) {
      console.error(error)
    }
  }




  //---------- 


  const [indexSelected, setIndexSelected] = useState(0);
  const [indexButton, setIndexButton] = useState(0);
  const [loading, setLoading] = useState(false);


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

  const handleAddButtonClick = async (index: number) => {
    if (pages[indexSelected].buttons.length < 4) {
      const newButton = await addButton(pages[indexSelected].id)
      console.log(newButton)
      let pagesTemp = [...pages];
      const buttons = pagesTemp[index].buttons
      const updatedButtons = [...buttons, newButton]
      pagesTemp[index].buttons = updatedButtons
      setPages(pagesTemp)
    }
  };

  const handleAddPageClick = (index: number) => {
    setActionBarSelected(true)
    const newPage = new PageModel(index + 1, "História " + index, "Descrição teste", '#568EA3', []);
    let pagesTemp = [...pages, newPage];
    setPages(pagesTemp);
    console.log(pagesTemp)
    addPage(pagesTemp[index])
    setIndexSelected(pages.length);
    setIndexButton(0)
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

  const handleButtonActionBar = (index: number, actionBarSelected: boolean) => {
    console.log(pages[indexSelected].buttons[index].color)
    console.log("Button Index = " + index)
    setIndexButton(index)
    setActionBarSelected(false)
  }

  const handlePageActionBar = (index: number, actionBarSelected: boolean) => {
    console.log(pages[indexSelected].buttons[index].color)
    console.log("Button Index = " + index)
    setIndexButton(index)
    setActionBarSelected(true)
    console.log(actionBarSelected)
  }

  const handleDeleteButton = () => {
    console.log(pages[indexSelected].buttons[indexButton].id)
    let pagesTemp = [...pages];
    const buttons = pagesTemp[indexSelected].buttons

    deleteButtonByID(pagesTemp[indexSelected].buttons[indexButton].id)
    setActionBarSelected(true)

    if (indexButton > -1) {
      buttons.splice(indexButton, 1);
    }

    setIndexButton(0)

    const updatedButtons = [...buttons]
    pagesTemp[indexSelected].buttons = updatedButtons
    setPages(pagesTemp)
  };

  const handleBackClick = () => {

  };


  const handleCreateClick = () => {

  };

  return (
    <CreationContext.Provider value={{
      indexSelected,
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
      getPagesFromGameID,
      updatePage,
      updateButton,
      addPage,
      deletePageByID,
      addButton,
      deleteButtonByID,
      loading,
      handleDeleteButton
    }}>
      {children}
    </CreationContext.Provider>
  )
}

