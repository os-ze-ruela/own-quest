import { useContext, useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { HiPlus } from 'react-icons/hi';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import ColorPicker from '../../components/ButtonWithColorPicker/ButtonWithColorPicker';
import CheckBoxButton from '../../components/CheckBoxButton/CheckBoxButton';
import HeaderCreation from '../../components/Header/HeaderCreation';
import { Button, Button as ButtonModel } from '../../models/Button';
import { Page as PageModel } from '../../models/Page';
import { ActionsBar, ActualPage, AddButton, AddPage, Body, ButtonContainer, CheckBoxText, CreationBody, CreationStyle, DeleteButton, EditableButton, MiniPage, Page, PageBody, PageDescription, PageListContainer, PageTitle, PagesMenu } from '../../styles/Creation';
import ButtonActionBar from './components/ButtonActionBar';
import PageActionBar from './components/PageActionBar';
import { CreationContext } from '../../contexts/creation';
import { useParams } from 'react-router-dom';
import NoPagePlaceholder from './components/NoPagePlaceholder';


const Creation = () => {
  const { pages, setPages } = useContext(CreationContext)
  const { indexButton, setIndexButton } = useContext(CreationContext)
  const { indexSelected, setIndexSelected } = useContext(CreationContext)
  const { handleAddButtonClick } = useContext(CreationContext)
  const { handleAddPageClick } = useContext(CreationContext)
  const { handleCheckboxClick } = useContext(CreationContext)
  const { handleBackClick } = useContext(CreationContext)
  const { handleCreateClick } = useContext(CreationContext)
  const { handleTextChange } = useContext(CreationContext)
  const { handleButtonActionBar } = useContext(CreationContext)
  const { handlePageActionBar } = useContext(CreationContext)
  const { actionBarSelected, setActionBarSelected } = useContext(CreationContext)
  const { getPagesFromGameID } = useContext(CreationContext)
  const { updatePage } = useContext(CreationContext)
  const { updateButton } = useContext(CreationContext)

  const { id } = useParams()

  useEffect(() => {
    getPagesFromGameID(id!)
  }, [])


  return (
    <CreationBody>
      <HeaderCreation onBackClick={handleBackClick} onCreateClick={handleCreateClick} isSaved={false} />
      <CreationStyle>
        <Body>
          <PageBody>
            { pages.length > 0 ? actionBarSelected ?
              (
                <PageActionBar />
              )
              :
              (
                <ButtonActionBar />
              ) : (<></>)
            }

            <ActualPage>
              {pages.length < 1 ? (
                <NoPagePlaceholder />
              ) : (<Page background={pages[indexSelected].color}
                onDoubleClick={() => handlePageActionBar(indexButton, actionBarSelected)}   >
                <PageTitle
                  type="text"
                  name="PageTitle"
                  value={pages[indexSelected].title}
                  placeholder="Exemplo de título"
                  onChange={(event) => {
                    let pagesTemp = [...pages];
                    pagesTemp[indexSelected].title = event.target.value;
                    setPages(pagesTemp);
                    updatePage(pages[indexSelected])
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
                    updatePage(pages[indexSelected])
                  }}
                />
                <ButtonContainer>
                  {pages[indexSelected].buttons.map((button, index) => (
                    <EditableButton
                      key={index}
                      value={button.title}
                      isSelected={index === indexButton}
                      placeholder={"Botão " + (index + 1).toString()}
                      background={button.color}
                      onClick={() => { handleButtonActionBar(index, actionBarSelected); setIndexButton(index) }}
                      onChange={(event) => {
                        handleTextChange(indexSelected, index, event.target.value);
                        updateButton(button)
                      }}
                    />
                  ))}
                  <AddButton onClick={
                    () => { handleAddButtonClick(indexSelected); }}
                    canAdd={pages[indexSelected].buttons.length < 4} >
                    <MdOutlineAddCircleOutline size={25} color="#fff" />
                  </AddButton>
                </ButtonContainer>
              </Page>)}

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
                      setActionBarSelected(true)
                      setIndexSelected(index)
                    }}
                  >
                    <span>{index + 1}</span>
                  </MiniPage>
                ))}
                <AddPage onClick={() => { handleAddPageClick(id!) }}>
                  <HiPlus size={25} color="#000" />
                </AddPage>
              </PageListContainer>
            </PagesMenu>
          </PageBody>
        </Body>
      </CreationStyle>
    </CreationBody >
  );

};

export default Creation;
