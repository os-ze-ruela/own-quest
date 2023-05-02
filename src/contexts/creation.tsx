import { ReactNode, createContext, useState } from "react";
import AppError from "../core/app-error";
import { Button, Button as ButtonModel } from '../models/Button';
import { Page as PageModel } from '../models/Page';
import { api, deleteButton, deletePage, getPagesByGameID, patchButton, patchPage, postButton, postPage } from "../services/api";


type CreationContextType = {
  indexSelected: number,
  indexButton: number,
  pages: PageModel[],
  actionBarSelected: boolean,
  handleCheckboxClick: () => void,
  handleAddButtonClick: (index: number) => void,
  handleAddPageClick: (gameId: string) => void,
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
  getPagesFromGameID: (id: string) => void
  updatePage: (page: PageModel) => void
  updateButton: (button: ButtonModel) => void
  addPage: (gameId: number, numberPage: number) => void
  deletePageByID: (id: number) => void
  addButton: (pageId: number) => Promise<ButtonModel>
  deleteButtonByID: (id: number) => void
  loading: boolean
  handleDeleteButton: () => void
  handleDeletePage: () => void
  handleSelectChange: (selected: string) => void
  findPageIndex: (pages: PageModel[], nextPageId: number) => number
  destinyPage: number
  setDestinyPage: (page: number) => void
  handleButton: (index: number, button: ButtonModel) => void
}

interface PageResponse {
  id: number;
  title: string;
  description: string;
  color: string;
  number_page: number;
  icon: string;
  is_last_page: boolean;
  buttons: Button[];
}


export const CreationContext = createContext<CreationContextType>({} as CreationContextType)

export const CreationProvider = ({ children }: { children: ReactNode }) => {

  //---Page---
  async function addPage(gameId: number, numberPage: number): Promise<PageModel> {
    try {
      setLoading(true)
      const response = await postPage({
        title: '',
        description: '',
        icon: '',
        color: '#568EA3',
        number_page: numberPage,
        is_last_page: false,
        game_id: gameId
      })
      const { id, title, description, color, number_page, is_last_page, icon } = response.data
      setLoading(false)
      return new PageModel(id, title, description, color, number_page, is_last_page, icon, []);
    } catch (error) {
      setLoading(false)
      console.error(error)
      throw new AppError(500, 'Ocorreu um erro tente novamente mais tarde')
    }
  }

  async function deletePageByID(id: number) {
    try {
      setLoading(true)
      await deletePage(id)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  async function getPagesFromGameID(id: string) {
    try {

      const tokensJSON = localStorage.getItem('token')
      const tokens = JSON.parse(tokensJSON!)
      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`

      
      const response = await getPagesByGameID(id)
      
      
      const data: PageResponse[] = await response.data;
      const pages: PageModel[] = data.map(page => new PageModel(
        page.id,
        page.title,
        page.description,
        page.color,
        page.number_page,
        page.is_last_page,
        page.icon,
        page.buttons
      ));
      setPages(pages);

    } catch (error) {
      setLoading(false)
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
      await patchButton(button.id, button.title, button.color, "", button.nextPageId)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  async function addButton(pageId: number): Promise<ButtonModel> {
    try {
      setLoading(true)
      const response = await postButton(pageId, '', '#202331', "", -1)
      const { id, title, color,  icon, nextPageId,} = response.data
      setLoading(false)
      return new ButtonModel(id, title, color, icon, nextPageId);
    } catch (error) {
      setLoading(false)
      console.error(error)
      throw new AppError(500, 'Ocorreu um erro ao criar o botão')
    }
  }

  async function deleteButtonByID(id: number) {
    try {
      setLoading(true)
      await deleteButton(id)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }




  //---------- 


  const [indexSelected, setIndexSelected] = useState(0);
  const [indexButton, setIndexButton] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);
  const [destinyPage, setDestinyPage] = useState(-1);


  // 0 - PAGE | 1 - BUTTON
  const [actionBarSelected, setActionBarSelected] = useState(true);


  const [pages, setPages] = useState<PageModel[]>([
    // new PageModel(1, "História 1", "Descrição teste", '#568EA3',1,false, '', []),
  ])


  const handleCheckboxClick = () => {
    let pagesTemp = [...pages];
    pagesTemp[indexSelected].isLastPage = !pagesTemp[indexSelected].isLastPage;
    setPages(pagesTemp);
    updatePage(pages[indexSelected])
  };

  const handleAddButtonClick = async (index: number) => {
    if (pages[indexSelected].buttons.length < 4) {
      const newButton = await addButton(pages[indexSelected].id)
      let pagesTemp = [...pages];
      const buttons = pagesTemp[index].buttons
      const updatedButtons = [...buttons, newButton]
      pagesTemp[index].buttons = updatedButtons
      setPages(pagesTemp)
    }
  };

  const handleAddPageClick = async (gameId: string) => {
    setActionBarSelected(true)
    const newPage = await addPage(Number(gameId), pages.length + 1)
    let pagesTemp = [...pages, newPage];
    setPages(pagesTemp);
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
    setIndexButton(index)
    setActionBarSelected(false)
  }

  const handlePageActionBar = (index: number, actionBarSelected: boolean) => {
    setIndexButton(index)
    setActionBarSelected(true)
  }

  const handleDeleteButton = () => {
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

  const handleDeletePage = () => {
    let pagesTemp = [...pages]

    deletePageByID(pagesTemp[indexSelected].id)
    setActionBarSelected(true)

    if (indexSelected > 0) {
      pagesTemp.splice(indexSelected, 1);
      setIndexSelected(indexSelected-1)
    }
    else if(indexSelected-1 === 0 && pagesTemp.length != indexSelected){
      setIndexSelected(indexSelected+1)
    }
    else{
      pagesTemp = []
    }


    setPages(pagesTemp)
  };


  const handleButton = (index: number, button: ButtonModel) => {
    setIndexButton(index) 
    handleButtonActionBar(index, actionBarSelected); 
    setDestinyPage(findPageIndex(pages, button.nextPageId))
  };

  const handleSelectChange = (selected: string) => {
    let selectedSliced = Number(selected.slice(selected.length - 1))
    let pagesTemp = [...pages];
    let buttons = [...pagesTemp[indexSelected].buttons]
    buttons[indexButton].nextPageId = pagesTemp[selectedSliced-1].id
    setDestinyPage(findPageIndex(pages, buttons[indexButton].nextPageId))
    updateButton(pagesTemp[indexSelected].buttons[indexButton])
    pagesTemp[indexSelected].buttons = buttons
    setPages(pagesTemp);
    updatePage(pages[indexSelected])
  };

  const findPageIndex = (pages: PageModel[], nextPageId: number) => {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if(page.id === nextPageId){
        return i
      }
    }
    return -1
  }

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
      handleDeleteButton,
      handleDeletePage,
      handleSelectChange,
      findPageIndex,
      destinyPage,
      setDestinyPage,
      handleButton
    }}>
      {children}
    </CreationContext.Provider>
  )
}

