import { Alert, Backdrop, CircularProgress, LinearProgress, Snackbar } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GPT from "../../assets/img/gpt.svg";
import DialogUnpublishGame from "../../components/Dialog/DialogUnpublishGame";
import HeaderCreation from "../../components/Header/HeaderCreation";
import Popup from "../../components/Popup/Popup";
import EmailNotValidatedWarning from "../../components/Warning/EmailNotValidated";
import { AuthContext } from "../../contexts/auth";
import { CategoryContext } from "../../contexts/category";
import { CreationContext } from "../../contexts/creation";
import { GameContext } from "../../contexts/game";
import { OpenAIContext } from "../../contexts/openai";
import AppError from '../../core/app-error';
import { HOME } from "../../core/app-urls";
import Category from "../../models/Category";
import { api, uploadImage, uploadRandomImage } from "../../services/api";
import { PopupContainer } from "../../styles/Creation";
import { ActionsImageWrapper, Body, CategoryLabelEditingWrapper, CategorySettingsLabel, DeleteButton, DescriptionInput, FileInput, GenerateRandomImageButton, GptIcon, ImageContainer, ImageGameContainer, ImagePlaceholder, PublishButton, RandomDescriptionButton, RandomDescriptionWrapper, Separator, SettingsContainer, SettingsWrapper, Title, TitleInput, Titles, TitlesInfo, UploadImageButton, WrapTextButton } from "../../styles/CreationSettings";

export default function CreationSettings() {

  const { id } = useParams()
  const { user, refresh, logout } = useContext(AuthContext);
  const { userGames, getUserGames } = useContext(GameContext);
  const { handleBackClick } = useContext(CreationContext)
  const { handleCreateClick } = useContext(CreationContext)
  const { categories, getCategories } = useContext(CategoryContext)
  const { editingGame, updateGame, setEditingGame, getGameById, deleteGameByID, addGameCategoryByID, deleteGameCategory, published, setPublished, publishGameById, unpublishGameById } = useContext(GameContext)

  const [descTemp, setDescTemp] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorIAGeneration, setErrorIAGeneration] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const { improveDescription, generateImage } = useContext(OpenAIContext);
  const [loadingDescriptionAI, setLoadingDescriptionAI] = useState(false);
  const { loading, setLoading } = useContext(CreationContext)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [titleTemp, setTitleTemp] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorIAMessage, setErrorIAMessage] = useState<string>('');

  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [addedCategories, setAddedCategories] = useState<Category[]>([]);

  const history = useNavigate()

  // IMAGE USE STATES
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchGames = async () => {
    try {
      await Promise.all([getUserGames()]);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      const error = await e as AppError
      if (error.statusCode === 401) {
        try {
          await refresh()
          await fetchGames()
        } catch (e) {
        }
      }
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  useEffect(() => { 
    let foundMatch = false; 
  
    for (const game of userGames) {
      if (game.id.toString() === id) { 
        foundMatch = true; 
        break; 
      }
    }

    if (!foundMatch && userGames.length > 0) {
      history('/denied'); 
    }
    
  }, [userGames, history]);


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingImage(true)
    const file = event.target.files && event.target.files[0];
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await uploadImage(formData)
        const imagePath: string = response.data.imagePath
        const newEditingGame = editingGame!
        newEditingGame.image = imagePath;
        setEditingGame(newEditingGame);
        await updateGame(newEditingGame);
      }
      setIsLoadingImage(false)
    } catch (error) {
      console.log(error)
      setIsLoadingImage(false)
    }

  };

  const handleClick = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handlePublishGame = async () => {
    if (editingGame) {
      try {
        const response = await publishGameById(Number(id!));
        setPublished(true)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUnpublishGame = async () => {
    if (editingGame) {
      try {
        const response = await unpublishGameById(Number(id!));
        setPublished(false)
        setShowModal(false)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }




  const handleCategories = async (content: string, categoryID: number) => {
    if (content === "+") {
      await addGameCategoryByID(Number(id), [categoryID]);
      fetchAllRequests()
      const addedCategory = availableCategories.find(category => category.id === categoryID);
      if (addedCategory) {
        setAddedCategories(prevCategories => [...prevCategories, addedCategory]);
        setAvailableCategories(prevCategories => prevCategories.filter(category => category.id !== categoryID));
      }
    } else if (content === "X") {
      await deleteGameCategory(Number(id), categoryID);
      fetchAllRequests()
      const removedCategory = addedCategories.find(category => category.id === categoryID);
      if (removedCategory) {
        setAddedCategories(prevCategories => prevCategories.filter(category => category.id !== categoryID));
        setAvailableCategories(prevCategories => [...prevCategories, removedCategory]);
      }
    }
  };



  async function handleClickRandomDescription() {
    try {
      if (editingGame) {
        setLoadingDescriptionAI(true)
        const response = await improveDescription(user!.id, editingGame.description);
        setDescTemp(response)
        setLoadingDescriptionAI(false)
      }
    }
    catch (error: any) {
      setLoadingDescriptionAI(false)
      setErrorIAMessage(error.response.data.message)
      setErrorIAGeneration(true)
    }
  }

  async function handleClickRandomImage() {
    if (editingGame) {
      try {
        setIsLoadingImage(true)

        const generateImageURL = await generateImage(user!.id, editingGame.description);
        const response = await uploadRandomImage(generateImageURL)
        const newEditingGame = editingGame!
        newEditingGame.image = response.data.imagePath;
        setEditingGame(newEditingGame);
        await updateGame(newEditingGame);

        setIsLoadingImage(false)
      } catch (error: any) {
        setErrorIAMessage(error.response.data.message)
        setIsLoadingImage(false)
        setErrorIAGeneration(true)
      }
    }
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTemp(event.target.value);
  };


  const handleDelete = () => {
    if (editingGame) {
      deleteGameByID(editingGame.id);
    }
  }

  const fetchAllRequests = async () => {
    try {
      setIsLoading(true)

      const tokensJSON = localStorage.getItem('token')
      const tokens = JSON.parse(tokensJSON!)
      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`

      await Promise.all([
        getGameById(id!),
        getCategories()
      ]);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      const error = await e as AppError
    }
  };

  useEffect(() => {
    fetchAllRequests()
  }, [])


  useEffect(() => {
    if (editingGame) {
      setAddedCategories(editingGame.categories);
      setPublished(editingGame.isPublished);
    }
  }, [editingGame]);

  useEffect(() => {
    if (categories.length > 0) {
      const filteredCategories = categories.filter(category1 => !addedCategories.some(category2 => category1.id === category2.id));
      setAvailableCategories(filteredCategories);
    }
  }, [categories, addedCategories]);


  // ----- DEBOUNCE -----


  const debounceSaveChangesTitle = () => {
    setLoading(true);
    if (timerId) {
      clearTimeout(timerId);
    }
    const idTimer = setTimeout(() => {
      saveChangesTitle(titleTemp); // Passa o valor atual do estado como argumento
    }, 500);
    setTimerId(idTimer);
  };

  const debounceSaveChangesDescription = () => {
    setLoading(true);
    if (timerId) {
      clearTimeout(timerId);
    }
    const idTimer = setTimeout(() => {
      saveChangesDescription(descTemp); // Passa o valor atual do estado como argumento
    }, 500);
    setTimerId(idTimer);
  };


  const saveChangesTitle = (title: string) => {
    if (editingGame) {
      setLoading(false);
      const newEditingGame = { ...editingGame, title };
      updateGame(newEditingGame);
    }
  };

  const saveChangesDescription = (description: string) => {
    if (editingGame) {
      setLoading(false);
      const newEditingGame = { ...editingGame, description };
      updateGame(newEditingGame);
    }
  };


  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  useEffect(() => {
    if (editingGame) {
      setTitleTemp(editingGame.title);
      setDescTemp(editingGame.description);
    }
  }, [editingGame]);


  useEffect(() => {
    if (editingGame && titleTemp !== editingGame.title && (titleTemp.length > 0)) {
      const newEditingGame = { ...editingGame };
      newEditingGame.title = titleTemp
      setEditingGame(newEditingGame);
      debounceSaveChangesTitle();
    }
  }, [titleTemp, editingGame]); // Include editingGame as a dependency

  useEffect(() => {
    if (editingGame && descTemp !== editingGame.description && (descTemp.length > 0)) {
      const newEditingGame = { ...editingGame, description: descTemp };
      setEditingGame(newEditingGame);
      debounceSaveChangesDescription();
    }
  }, [descTemp, editingGame]); // Include editingGame as a dependency

  return (
    <Body>
      <PopupContainer top={'550px'} left={'1100px'}>
        <Popup message="🚨 A imagem é gerada com base na descrição da história, certifique-se de digitar a descrição antes de gerar" id="popupSettings" />
      </PopupContainer>
      {showModal && (
        <Backdrop
          sx={{ color: '#fff', background: 'rgba(0, 0, 0, 0.8)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <DialogUnpublishGame onClose={() => { setShowModal(false) }} handleUnpublishGame={handleUnpublishGame} />
        </Backdrop>
      )}
      <Snackbar
        open={isErrorIAGeneration}
        autoHideDuration={4000}
        onClose={() => { setErrorIAGeneration(false) }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="error">{errorIAMessage}</Alert>
      </Snackbar>
      {user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
      <HeaderCreation id={Number(id)} onBackClick={handleBackClick} onCreateClick={handleCreateClick} isSaved={false} set={true} isPublished={published} showHelp={null} setShowHelp={() => { }} />
      <Title>Configurações da história</Title>
      <SettingsWrapper>
        <SettingsContainer>
          <Titles>Título</Titles>
          <TitleInput
            type="text"
            name="StoryTitle"
            autoComplete="off"
            value={titleTemp!}
            placeholder="Minha primeira história"
            onChange={handleChange}
          />
          <Separator />

          <Titles>Descrição</Titles>
          {loadingDescriptionAI ? (<LinearProgress color="success" style={{borderRadius: '12px'}} />) : (<></>)}
          <DescriptionInput
            name="StoryDescription"
            autoComplete="off"
            value={descTemp!}
            placeholder="Essa é uma nova história criada no Own Quest."
            onChange={(event) => { setDescTemp(event.target.value) }}
          />
          <RandomDescriptionWrapper>
            <RandomDescriptionButton onClick={handleClickRandomDescription}>Melhorar descrição com IA<GptIcon src={GPT} /></RandomDescriptionButton>
          </RandomDescriptionWrapper>
          <Separator />
          <Titles>Categorias disponíveis:</Titles>
          <CategoryLabelEditingWrapper className='category-label-wrapper'>
            {availableCategories.map((category, index) => (
              <CategorySettingsLabel key={index} color={category.color} content='+' onClick={() => { handleCategories('+', category.id) }}>{category.title}</CategorySettingsLabel>))}
          </CategoryLabelEditingWrapper>
          <Separator />

          <Titles>Categorias adicionadas:</Titles>
          <CategoryLabelEditingWrapper className='category-label-wrapper'>
            {addedCategories.map((category, index) => (
              <CategorySettingsLabel key={category.id} color={category.color} content='X' onClick={() => { handleCategories('X', category.id) }}>{category.title}</CategorySettingsLabel>))}
          </CategoryLabelEditingWrapper>
          <Separator />

          <Titles>Excluir história</Titles>
          <WrapTextButton>
            <TitlesInfo>Ao excluir a sua história, você não poderá mais acessar nem editar essa história novamente.</TitlesInfo>
            <DeleteButton href={HOME} onClick={handleDelete}>Excluir</DeleteButton>
          </WrapTextButton>
          <Separator />

          <Titles>Publicar história</Titles>
          <WrapTextButton>
            <TitlesInfo> {published ? 'Clique em Editar História para realizar alterações no conteúdo da história e publica-la novamente.' : 'Ao publicar a sua história, você torna ela disponível para ser jogada por todas pessoas da comunidade.'}</TitlesInfo>
            <PublishButton onClick={() => { published ? setShowModal(true) : handlePublishGame() }}>
              {published ? 'Editar História' : 'Publicar'}
            </PublishButton>
          </WrapTextButton>
        </SettingsContainer>
        <ImageContainer>
          <ActionsImageWrapper>
            <>
              <FileInput type="file" onChange={handleFileChange} ref={fileInputRef} />
              <UploadImageButton onClick={handleClick}>
                Adicionar Imagem
              </UploadImageButton>
            </>
            <GenerateRandomImageButton onClick={handleClickRandomImage}>
              <p>Gerar Imagem da História com IA</p>
              <GptIcon src={GPT} />
            </GenerateRandomImageButton>
          </ActionsImageWrapper>
          {
            isLoadingImage ?
              (
                <ImagePlaceholder>
                  <CircularProgress />
                  <p>Carregando Imagem</p>
                </ImagePlaceholder>
              ) :
              editingGame?.image != null ? <ImageGameContainer src={editingGame?.image} alt="Uploaded image" /> :
                (<ImagePlaceholder><p> Nenhuma imagem selecionada</p></ImagePlaceholder>)
          }
        </ImageContainer>
      </SettingsWrapper>
    </Body >
  );
}