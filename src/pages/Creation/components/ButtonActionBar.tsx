import { BiTrash } from "react-icons/bi";
import ColorPicker from "../../../components/ButtonWithColorPicker/ButtonWithColorPicker";
import CheckBoxButton from "../../../components/CheckBoxButton/CheckBoxButton";
import { ActionsBar, CheckBoxText, DeleteButton } from "../../../styles/Creation";
import { CreationContext } from "../../../contexts/creation";
import { useContext, useState } from "react";
import SelectBoxComponent from "../../../components/SelectBoxComponent/SelectBoxComponent";
import { Page } from "../../../models/Page";



function ButtonActionBar() {
  const { pages, setPages } = useContext(CreationContext)
  const { indexSelected, setIndexSelected } = useContext(CreationContext)
  const { indexButton, setIndexButton } = useContext(CreationContext)
  const { handleButtonColorChange } = useContext(CreationContext)
  const { updateButton } = useContext(CreationContext)
  const { updatePage } = useContext(CreationContext)
  const { handleDeleteButton } = useContext(CreationContext)
  const { selectedPage, setSelectedPage } = useContext(CreationContext)
  const { handleSelectChange } = useContext(CreationContext)
  const { findPageIndex } = useContext(CreationContext)


  // const [selectedPage, setSelectedPage] = useState(0);


  // const handleSelectChange = (selected: string) => {
  //   console.log(Number(selected.slice(selected.length - 1)))
  //   setSelectedPage(Number(selected.slice(selected.length - 1)));

  //   let pagesTemp = [...pages];
  //   let buttons = [...pagesTemp[indexSelected].buttons]

  //   buttons[indexButton].nextPageId = pagesTemp[selectedPage].id
  //   pagesTemp[indexSelected].buttons = buttons
  //   updateButton(pagesTemp[indexSelected].buttons[indexButton])
  //   setPages(pagesTemp);
  //   updatePage(pages[indexSelected])
  //   console.log(pages[indexSelected].buttons[indexButton])
  // };

  // const findPageIndex = (pages: Page[], nextPageId: number) => {
  //   for (let i = 0; i < pages.length; i++) {
  //     const page = pages[i];
  //     if(page.id === nextPageId){
  //       return i+1;
  //     }
  //   }
  //   return 0;
  // }

  return <ActionsBar>
    <ColorPicker
      color={pages[indexSelected].buttons[indexButton].color}
      setColor={(color) => {
        handleButtonColorChange(indexSelected, indexButton, color)
        updateButton(pages[indexSelected].buttons[indexButton])

      }} />
    <SelectBoxComponent selectedPage= {findPageIndex(pages, pages[indexSelected].buttons[indexButton].nextPageId)} pageList={pages.map((page, index) => `Página ${index + 1}`)} onChange={handleSelectChange} />
    <DeleteButton onClick={() => {
      handleDeleteButton();
      
    }}>
      <BiTrash size={30} color="#000" />
    </DeleteButton>
  </ActionsBar>;

}


export default ButtonActionBar;