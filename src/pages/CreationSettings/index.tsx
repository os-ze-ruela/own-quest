import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderCreation from "../../components/Header/HeaderCreation";
import EmailNotValidatedWarning from "../../components/Warning/EmailNotValidated";
import { AuthContext } from "../../contexts/auth";
import { CreationContext } from "../../contexts/creation";
import { GameContext } from "../../contexts/game";
import { GAME, HOME } from "../../core/app-urls";
import { DeleteButton, DescriptionInput, SaveButton, Separator, SettingsContainer, Title, TitleInput, Titles, TitlesInfo, WrapTextButton } from "../../styles/CreationSettings";
import { CategoryLabel, CategoryLabelWrapper } from "../../styles/HomeLogged";

export default function CreationSettings() {

    const { id } = useParams()
    const { user } = useContext(AuthContext);
    const { handleBackClick } = useContext(CreationContext)
    const { handleCreateClick, getPagesFromGameID } = useContext(CreationContext)
    const { editingGame, updateGame, setEditingGame, getGameById, deleteGameByID } = useContext(GameContext)
    const [titleTemp, setTitleTemp] = useState('');
    const [descTemp, setDescTemp] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleTemp(event.target.value);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescTemp(event.target.value);
    };

    useEffect(() => {
        if (editingGame) {
            setTitleTemp(editingGame.title);
            setDescTemp(editingGame.description)
        }
    }, [editingGame]);

    useEffect(() => {
        if (editingGame && titleTemp !== editingGame.title && (titleTemp.length > 0)) {
            const newEditingGame = { ...editingGame, title: titleTemp };
            setEditingGame(newEditingGame);
            updateGame(newEditingGame);
        }
    }, [titleTemp])

    useEffect(() => {
        if (editingGame && descTemp !== editingGame.description && (descTemp.length > 0)) {
            const newEditingGame = { ...editingGame, description: descTemp };
            setEditingGame(newEditingGame);
            updateGame(newEditingGame);
        }
    }, [descTemp])

    useEffect(() => {
        getPagesFromGameID(id!)
        getGameById(id!)
    }, [])

    const handleDelete = () => {
        if (editingGame) {
            deleteGameByID(editingGame.id);
        }
    }

    return (
        <>
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
                <DescriptionInput
                    type="text"
                    name="StoryDescription"
                    autoComplete="off"
                    value={descTemp!}
                    placeholder="Essa é uma nova história criada no Own QUest."
                    onChange={handleChange2}
                />
                <Separator />

                <Titles>Caregorias adicionadas:</Titles>
                {/* <h2>Em processo</h2> */}
                <CategoryLabelWrapper className='category-label-wrapper'>
                    {editingGame?.categories.map((category) => (
                        <CategoryLabel key={category.id} color={category.color}>
                            {category.title}
                        </CategoryLabel>
                    ))}
                </CategoryLabelWrapper>
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
        </>
    );
}