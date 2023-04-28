import { BiTrash } from "react-icons/bi";
import ColorPicker from "../../../components/ButtonWithColorPicker/ButtonWithColorPicker";
import CheckBoxButton from "../../../components/CheckBoxButton/CheckBoxButton";
import { ActionsBar, CheckBoxText, DeleteButton } from "../../../styles/Creation";
import { CreationContext } from "../../../contexts/creation";
import { useContext } from "react";


function PageActionBar() {
    const {pages,setPages} = useContext(CreationContext)
    const {indexSelected, setIndexSelected} = useContext(CreationContext)
    const {handleAddButtonClick} = useContext(CreationContext)
    const {handleAddPageClick} = useContext(CreationContext)
    const {handleCheckboxClick} = useContext(CreationContext)
    const {updatePage} = useContext(CreationContext)
    const {handleDeletePage} = useContext(CreationContext)
    

    return <ActionsBar>
      <ColorPicker
        color={pages[indexSelected].color}
        setColor={(color) => {
          let pagesTemp = [...pages];
          pagesTemp[indexSelected].color = color;
          setPages(pagesTemp);
          updatePage(pagesTemp[indexSelected])
        } } />
      <CheckBoxText>Última página?</CheckBoxText>
      <CheckBoxButton checked={pages[indexSelected].isLastPage} onClick={handleCheckboxClick}></CheckBoxButton>
      <DeleteButton onClick={() => {
        handleDeletePage(); 
        }}>
        <BiTrash size={30} color="#000" />
      </DeleteButton>
    </ActionsBar>;
  }


  export default PageActionBar