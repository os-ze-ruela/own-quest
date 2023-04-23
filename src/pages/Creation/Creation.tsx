import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { HiPlus } from 'react-icons/hi';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import ColorPicker from '../../components/ButtonWithColorPicker/ButtonWithColorPicker';
import CheckBoxButton from '../../components/CheckBoxButton/CheckBoxButton';
import HeaderCreation from '../../components/Header/HeaderCreation';
import { Button, Button as ButtonModel } from '../../models/Button';
import { Page as PageModel } from '../../models/Page';
import { ActionsBar, ActualPage, AddButton, AddPage, Body, ButtonContainer, CheckBoxText, CreationBody, CreationStyle, DeleteButton, EditableButton, MiniPage, Page, PageBody, PageDescription, PageListContainer, PageTitle, PagesMenu } from '../../styles/Creation';


const handleBackClick = () => {
  // Lógica para voltar para a página anterior
};

const handleCreateClick = () => {
  // Lógica para criar o conteúdo
};

interface PageResponse {
  id: number;
  title: string;
  description: string;
  color: string;
  is_last_page: boolean;
  buttons: Button[];
}

const Creation = () => {

  useEffect(() => {
    async function fetchData() {
      const endPoint = `https://deploy.ownquest.games/game/3/pages`
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

    fetchData()

  }, [])

  const [indexSelected, setIndexSelected] = useState(0);
  
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
              <CheckBoxButton checked={pages[indexSelected].isLastPage} onClick={handleCheckboxClick}></CheckBoxButton>
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
                  {pages[indexSelected].buttons.map((button, index) => (
                    <EditableButton
                      key={index}
                      value={button.title}
                      placeholder={"Botão " + (index + 1).toString()}
                      onChange={(event) => handleTextChange(indexSelected, index, event.target.value)}
                    />
                  ))}
                  <AddButton onClick={
                    () => { handleAddButtonClick(indexSelected); }}
                    canAdd={pages[indexSelected].buttons.length < 4} >
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
                    background={page.color}
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
