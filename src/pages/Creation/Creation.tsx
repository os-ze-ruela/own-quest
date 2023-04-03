import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { HiPlus } from 'react-icons/hi';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import ColorPicker from '../../components/ButtonWithColorPicker/ButtonWithColorPicker';
import CheckBoxButton from '../../components/CheckBoxButton/CheckBoxButton';
import HeaderCreation from '../../components/Header/HeaderCreation';
import { Page as PageModel } from '../../models/Page';
import { ActionsBar, ActualPage, AddButton, AddPage, Body, ButtonContainer, CheckBoxText, CreationBody, CreationStyle, DeleteButton, EditableButton, MiniPage, Page, PageBody, PageDescription, PageListContainer, PagesMenu, PageTitle } from '../../styles/Creation';


const handleBackClick = () => {
  // Lógica para voltar para a página anterior
};

const handleCreateClick = () => {
  // Lógica para criar o conteúdo
};


const Creation = () => {

  const [pages, setPages] = useState<PageModel[]>([
    new PageModel(1, "História 1", "Descrição teste", '#568EA3', []),
  ])
  const [indexSelected, setIndexSelected] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const [buttonList, setButtonList] = useState<string[]>([]);
  const [newButtonText, setNewButtonText] = useState('');

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  const handleAddButtonClick = () => {
    if(buttonList.length < 4) {
      setButtonList([...buttonList, newButtonText]);
      setNewButtonText('');
    }
  };

  const handleAddPageClick = (index: number) => {
    const newPage = new PageModel(index + 1, "História " + index, "Descrição teste", '#568EA3', []);
    let pagesTemp = [...pages, newPage];
    setPages(pagesTemp);
    setIndexSelected(pages.length);
    console.log(pages);
  };

  const handleTextChange = (index: number, newText: string) => {
    const updatedList = [...buttonList];
    updatedList[index] = newText;
    setButtonList(updatedList);
  };


  return (
    <CreationBody>
      <HeaderCreation onBackClick={handleBackClick} onCreateClick={handleCreateClick} isSaved={false} />
      <CreationStyle>
        <Body>
          {/* <Sidebar>
          <SideBarButton onClick={() => handlePageClick(1)}>
            <IoMdAddCircleOutline size={30} color="#fff" />
            <TextButton>Adicionar botão</TextButton>
          </SideBarButton>
        </Sidebar> */}
          <PageBody>
            <ActionsBar>
              <ColorPicker
                color={pages[indexSelected].color}
                setColor={(color) => {
                  let pagesTemp = [...pages];
                  pagesTemp[indexSelected].color = color;
                  setPages(pagesTemp);
                }}
              />
              <CheckBoxText>Última página?</CheckBoxText>
              <CheckBoxButton checked={isChecked} onClick={handleCheckboxClick}></CheckBoxButton>
              <DeleteButton onClick={() => {
                
              }}>
                <BiTrash size={30} color="#000" />
              </DeleteButton>
            </ActionsBar>
            <ActualPage>
              <Page background={pages[indexSelected].color} >
                <PageTitle
                  type="text"
                  name="PageTitle"
                  value={pages[indexSelected].title}
                  placeholder="Exemplo de título"
                  onChange={(event) => {
                    let pagesTemp = [...pages];
                    pagesTemp[indexSelected].title = event.target.value;
                    setPages(pagesTemp);
                  }}
                />
                <PageDescription
                  name="PageDescription"
                  value={pages[indexSelected].description}
                  placeholder="Esse é um exemplo de descrição"
                  onChange={(event) => {
                    let pagesTemp = [...pages];
                    pagesTemp[indexSelected].description = event.target.value;
                    setPages(pagesTemp);
                  }}
                />
                <ButtonContainer>
                  {buttonList.map((text, index) => (
                    <EditableButton
                      key={index}
                      value={text}
                      placeholder={"Botão " + (index + 1).toString()}
                      onChange={(event) => handleTextChange(index, event.target.value)}
                    />
                  ))}
                  <AddButton onClick={handleAddButtonClick} canAdd={buttonList.length < 4} >
                    <MdOutlineAddCircleOutline size={25} color="#fff" />
                  </AddButton>
                </ButtonContainer>
              </Page>
            </ActualPage>
            <PagesMenu>
              <PageListContainer>
                {pages.map((page, index) => (
                  <MiniPage
                    isSelected={index === indexSelected}
                    background={pages[index].color}
                    key={index}
                    value={index}
                    onClick={() => {
                      setIndexSelected(index)
                    }}
                  >
                    <span>{index + 1}</span>
                  </MiniPage>
                ))}
                <AddPage onClick={() => { handleAddPageClick(pages.length + 1) }}>
                  <HiPlus size={25} color="#000" />
                </AddPage>
              </PageListContainer>
            </PagesMenu>
          </PageBody>
        </Body>
      </CreationStyle>
    </CreationBody>
  );
};

export default Creation;
