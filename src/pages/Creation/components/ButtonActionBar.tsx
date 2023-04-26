import { BiTrash } from "react-icons/bi";
import ColorPicker from "../../../components/ButtonWithColorPicker/ButtonWithColorPicker";
import CheckBoxButton from "../../../components/CheckBoxButton/CheckBoxButton";
import { ActionsBar, CheckBoxText, DeleteButton } from "../../../styles/Creation";
import { CreationContext } from "../../../contexts/creation";
import { useContext, useState } from "react";
import SelectBoxComponent from "../../../components/SelectBoxComponent/SelectBoxComponent";



function ButtonActionBar (){
    const {pages,setPages} = useContext(CreationContext)
    const {indexSelected, setIndexSelected} = useContext(CreationContext)
    const {indexButton, setIndexButton} = useContext(CreationContext)
    const {handleAddButtonClick} = useContext(CreationContext)
    const {handleAddPageClick} = useContext(CreationContext)
    const {handleCheckboxClick} = useContext(CreationContext)
    const {handleButtonColorChange} = useContext(CreationContext)
    const {updateButton} = useContext(CreationContext)

    const [selectedPage, setSelectedPage] = useState("");
    const pageList = ["Página 1", "Página 2", "Página 3"];
    
    const handleSelectChange = (selected: string) => {
      setSelectedPage(selected);
    };

    return <ActionsBar>
      <ColorPicker
        color={pages[indexSelected].buttons[indexButton].color}
        setColor={(color) => {
          handleButtonColorChange(indexSelected, indexButton, color)
          updateButton(pages[indexSelected].buttons[indexButton])
        } } />
     <SelectBoxComponent pageList={pageList} onChange={handleSelectChange} />
      <DeleteButton onClick={() => {
      } }>
        <BiTrash size={30} color="#000" />
      </DeleteButton>
    </ActionsBar>;

}


export default ButtonActionBar;