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
  const { handleDeleteButton } = useContext(CreationContext)
  const { handleSelectChange } = useContext(CreationContext)
  const { destinyPage } = useContext(CreationContext)
  const { setDestinyPage } = useContext(CreationContext)
  const { findPageIndex } = useContext(CreationContext)


  return <ActionsBar>
    <ColorPicker
      color={pages[indexSelected].buttons[indexButton].color}
      setColor={(color) => {
        handleButtonColorChange(indexSelected, indexButton, color)
        updateButton(pages[indexSelected].buttons[indexButton])

      }} />
    <SelectBoxComponent defaultValue="Ir para página" pageList={pages.map((page, index) => `Página ${index + 1}`)} onChange={handleSelectChange} />
    <DeleteButton onClick={() => {
      handleDeleteButton();
      
    }}>
      <BiTrash size={30} color="#000" />
    </DeleteButton>
  </ActionsBar>;

}


export default ButtonActionBar;