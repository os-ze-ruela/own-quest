import { LinearProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GPT from "../../assets/img/gpt.svg";
import HeaderCreation from "../../components/Header/HeaderCreation";
import EmailNotValidatedWarning from "../../components/Warning/EmailNotValidated";
import { AuthContext } from "../../contexts/auth";
import { CategoryContext } from "../../contexts/category";
import { CreationContext } from "../../contexts/creation";
import { GameContext } from "../../contexts/game";
import { OpenAIContext } from "../../contexts/openai";
import AppError from '../../core/app-error';
import { GAME, HOME } from "../../core/app-urls";
import { CreationBody } from "../../styles/Creation";
import { CategoryLabelEditingWrapper, CategorySettingsLabel, DeleteButton, DescriptionInput, GptIcon, RandomDescriptionButton, RandomDescriptionWrapper, SaveButton, Separator, SettingsContainer, Title, TitleInput, Titles, TitlesInfo, WrapTextButton } from "../../styles/CreationSettings";

export default function CreationSettings() {



  // interface ImageUploaderProps {
  //   onImageUploaded: (imageUrl: string) => void;
  // }

  const { id } = useParams()
  const { user, refresh, logout } = useContext(AuthContext);
  const { handleBackClick } = useContext(CreationContext)
  const { handleCreateClick } = useContext(CreationContext)
  const { categories, getCategories } = useContext(CategoryContext)
  const { editingGame, updateGame, setEditingGame, getGameById, deleteGameByID, getHotGamesForHome } = useContext(GameContext)
  const [titleTemp, setTitleTemp] = useState('');
  const [descTemp, setDescTemp] = useState('');
  const [categTemp, setCategTemp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDescriptionAI, setLoadingDescriptionAI] = useState(false);
  const { improveDescription } = useContext(OpenAIContext)
  const { loading, setLoading } = useContext(CreationContext)
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
    console.log("salvando...")
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
    <CreationBody>
      {user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
      <HeaderCreation id={Number(id)} onBackClick={handleBackClick} onCreateClick={handleCreateClick} isSaved={false} set={true} />
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
        {/* {games.map((game, index) => (
          game.categories.map((category) => (
            <ListCategories key={category.id}>
              <CategoriesLabel color={category.color}>
                {category.title}
              </CategoriesLabel>
            </ListCategories>
          ))
        ))} */}
        <CategoryLabelEditingWrapper className='category-label-wrapper'>
          {categories.map((category) => (
            <CategorySettingsLabel key={category.id} color={category.color}>
              {category.title}
            </CategorySettingsLabel>
          ))}
        {/* <AddButton>+</AddButton> */}
        </CategoryLabelEditingWrapper>
        <Separator />
        <Titles>Excluir história</Titles>
        <WrapTextButton>
          <TitlesInfo>Ao excluir a sua história, você não poderá mais acessar nem editar essa história novamente.</TitlesInfo>
          <DeleteButton href={HOME} onClick={handleDelete}>Excluir</DeleteButton>
        </WrapTextButton>
        <Link to={GAME + '/' + id}>
          <SaveButton>Salvar</SaveButton>
        </Link>
      </SettingsContainer>
    </CreationBody>
  );
}

// function onImageUploaded(imageUrl: any) {
//   throw new Error("Function not implemented.");
// }
