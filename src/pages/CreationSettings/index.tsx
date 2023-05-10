import { Alert, CircularProgress, LinearProgress, Snackbar } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GPT from "../../assets/img/gpt.svg";
import HeaderCreation from "../../components/Header/HeaderCreation";
import EmailNotValidatedWarning from "../../components/Warning/EmailNotValidated";
import { AuthContext } from "../../contexts/auth";
import { CategoryContext } from "../../contexts/category";
import { CreationContext } from "../../contexts/creation";
import { GameContext } from "../../contexts/game";
import { OpenAIContext } from "../../contexts/openai";
import AppError from '../../core/app-error';
import { HOME } from "../../core/app-urls";
import { uploadImage, uploadRandomImage } from "../../services/api";
import { ActionsImageWrapper, Body, CategoryLabelEditingWrapper, CategorySettingsLabel, DeleteButton, DescriptionInput, FileInput, GenerateRandomImageButton, GptIcon, ImageContainer, ImageGameContainer, ImagePlaceholder, RandomDescriptionButton, RandomDescriptionWrapper, Separator, SettingsContainer, SettingsWrapper, Title, TitleInput, Titles, TitlesInfo, UploadImageButton, WrapTextButton } from "../../styles/CreationSettings";

export default function CreationSettings() {



  // interface ImageUploaderProps {
  //   onImageUploaded: (imageUrl: string) => void;
  // }

  const { id } = useParams()
  const { user } = useContext(AuthContext);
  const { handleBackClick } = useContext(CreationContext)
  const { handleCreateClick } = useContext(CreationContext)
  const { categories, getCategories } = useContext(CategoryContext)
  const { editingGame, updateGame, setEditingGame, getGameById, deleteGameByID } = useContext(GameContext)
  const [titleTemp, setTitleTemp] = useState('');
  const [descTemp, setDescTemp] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isErroImage, setErrorImage] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const { improveDescription, dalleAPI } = useContext(OpenAIContext
  const [loadingDescriptionAI, setLoadingDescriptionAI] = useState(false);
  const { loading, setLoading } = useContext(CreationContext)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // IMAGE USE STATES
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const saveChanges = () => {
    setLoading(false)
    updateGame(editingGame!);
};


  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  async function handleClickRandomDescription() {
    if (editingGame) {
      setLoadingDescriptionAI(true)
      const response = await improveDescription(editingGame.description);
      setDescTemp(response)
      setLoadingDescriptionAI(false)
    }
  }

  async function handleClickRandomImage() {
    if (editingGame) {
      try {
        setIsLoadingImage(true)

        const dalleImageUrl = await dalleAPI(editingGame.description);
        console.log(dalleImageUrl)
        const response = await uploadRandomImage(dalleImageUrl)
        const newEditingGame = editingGame!
        newEditingGame.image = response.data.imagePath;
        setEditingGame(newEditingGame);
        await updateGame(newEditingGame);

        setIsLoadingImage(false)
      } catch (error) {
        console.log(error)
        setIsLoadingImage(false)
        setErrorImage(true)
      }
    }
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTemp(event.target.value);
  };

  useEffect(() => {
    if (editingGame) {
      setTitleTemp(editingGame.title);
      setDescTemp(editingGame.description);
    }
  }, [editingGame]);

  useEffect(() => {
    if (editingGame && titleTemp !== editingGame.title && (titleTemp.length > 0) && (descTemp.length > 0)) {
      const newEditingGame = { ...editingGame, title: titleTemp };
      setEditingGame(newEditingGame);
      // updateGame(newEditingGame);
      debounceSaveChanges();
    }
  }, [titleTemp, descTemp])

  useEffect(() => {
    if (editingGame && descTemp !== editingGame.description && (descTemp.length > 0)) {
      const newEditingGame = { ...editingGame, description: descTemp };
      setEditingGame(newEditingGame);
      // updateGame(newEditingGame);
      debounceSaveChanges();
    }
  }, [descTemp])


  const handleDelete = () => {
    if (editingGame) {
      deleteGameByID(editingGame.id);
    }
  }

  const fetchAllRequests = async () => {
    try {
      setIsLoading(true)
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

  return (
    <Body>
      <Snackbar
        open={isErroImage}
        autoHideDuration={4000}
        onClose={() => { setErrorImage(false) }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="error">Ocorreu um erro ao gerar a imagem com IA</Alert>
      </Snackbar>
      {user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
      <HeaderCreation id={Number(id)} onBackClick={handleBackClick} onCreateClick={handleCreateClick} isSaved={false} set={true} />
      <Title>Configurações da história</Title>
      <SettingsWrapper>
      <SettingsContainer>
        <Title>Configurações da história</Title>
        <Separator />

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
        {loadingDescriptionAI ? (<LinearProgress color="success" />) : (<></>)}
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
        <Titles>Caregorias adicionadas:</Titles>
          <CategoryLabelEditingWrapper className='category-label-wrapper'>
            {categories.map((category, index) => (
              <CategorySettingsLabel key={index} color={category.color}>
          </CategoryLabelEditingWrapper>
          <Separator />
          <Titles>Excluir história</Titles>
          <WrapTextButton>
            <TitlesInfo>Ao excluir a sua história, você não poderá mais acessar nem editar essa história novamente.</TitlesInfo>
            <DeleteButton href={HOME} onClick={handleDelete}>Excluir</DeleteButton>
          </WrapTextButton>
          {/* <Link to={GAME + '/' + id}>
            <SaveButton>Salvar</SaveButton>
          </Link> */}
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

// function onImageUploaded(imageUrl: any) {
//   throw new Error("Function not implemented.");
// }
