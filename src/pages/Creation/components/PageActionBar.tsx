import { BiTrash } from "react-icons/bi";
import ColorPicker from "../../../components/ButtonWithColorPicker/ButtonWithColorPicker";
import CheckBoxButton from "../../../components/CheckBoxButton/CheckBoxButton";
import { ActionsBar, CheckBoxText, DeleteButton } from "../../../styles/Creation";
import { CreationContext } from "../../../contexts/creation";
import { useContext, useState, useEffect } from "react";


function PageActionBar() {
    const {pages,setPages} = useContext(CreationContext)
    const {indexSelected, setIndexSelected} = useContext(CreationContext)
    const {handleAddButtonClick} = useContext(CreationContext)
    const {handleAddPageClick} = useContext(CreationContext)
    const {handleCheckboxClick} = useContext(CreationContext)
    const {updatePage} = useContext(CreationContext)
    const {handleDeletePage} = useContext(CreationContext)

    const {loading, setLoading} = useContext(CreationContext)
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

    const debounceSaveChanges = () => {
      setLoading(true)
      if (timerId) {
        clearTimeout(timerId);
      }
      const idTimer = setTimeout(() => {
        saveChanges();
      }, 1000);
      setTimerId(idTimer);
    };
    
    const saveChanges = () => {
      setLoading(false);
      updatePage(pages[indexSelected])
    };
  
    useEffect(() => {
      return () => {
        if (timerId) {
          clearTimeout(timerId);
        }
      };
    }, [timerId]);
    

    return <ActionsBar>
      <ColorPicker
        color={pages[indexSelected].color}
        setColor={(color) => {
          let pagesTemp = [...pages];
          pagesTemp[indexSelected].color = color;
          setPages(pagesTemp);
          // updatePage(pagesTemp[indexSelected])
          debounceSaveChanges()
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