import { useContext, useEffect, useState } from "react";
import { AiOutlineSend } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { GameContext } from "../../contexts/game";
import { CREATOR } from "../../core/app-urls";
import { Author } from "../../models/Autor";
import Comment from "../../models/Comment";
import { AddNewCommentButton, AddNewCommentInput, CardComment, CommentContent, CommentsContainer, DeleteCommentButton, NicknameAuthor, TitleComments } from "../../styles/Comments";

interface CommentSectionProps {
    gameId: number | undefined
}

export default function CommentsSection({ gameId }: CommentSectionProps) {

    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState<Comment[]>([])
    const { listAllCommentsByGameId, deleteComment, commentGame } = useContext(GameContext)

    const [content, setContent] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await comment(content)
        setContent('');
    };

    async function getComments(id: string): Promise<void> {
        try {
            const comments = await listAllCommentsByGameId(id);
            setComments(comments)

            setTimeout(() => {
                setLoading(false)
            }, 1000);

        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    async function comment(content: string): Promise<void> {
        try {

            var author: Author = new Author({
                id: user!.id,
                nickname: user!.nickname,
                photo: user!.photo
            })

            var comment: Comment = new Comment({
                author: author,
                comment: content,
                gameId: gameId!,
            })
             
            const commentInstance = await commentGame(comment);

            comment = commentInstance

            setComments([...comments, comment]);
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteCommentById(commentId: number): Promise<void> {
        try {
            await deleteComment(commentId);
            const commentsTemp = comments.filter(item => item.id !== commentId);
            setComments(commentsTemp);
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getComments(id!)
    }, [])

    return (
        <CommentsContainer>
            <TitleComments>Comentários</TitleComments>
            {comments.map((comment) => {
                return <CardComment key={comment.id}>
                    <NicknameAuthor href={CREATOR + '/' + comment.author.nickname}>@{comment.author.nickname}</NicknameAuthor>
                    <span style={{ display: 'flex', gap: '1rem' }}>
                        <CommentContent>{comment.comment}</CommentContent>
                        {comment.author.id === user!.id ? (
                            <DeleteCommentButton onClick={() => deleteCommentById(comment.id!)}>
                                <RiDeleteBinLine size={24} />
                            </DeleteCommentButton>
                        ) : (<></>)}
                    </span>
                </CardComment>
            })}
            <form onSubmit={handleSubmit}>
                <CardComment>
                    <AddNewCommentInput
                        type="text"
                        value={content}
                        onChange={handleInputChange}
                        autoComplete="off"
                        placeholder="Adicione seu comentário aqui"
                    />
                    <AddNewCommentButton type="submit"><AiOutlineSend size={24}/></AddNewCommentButton>
                </CardComment>
            </form>
        </CommentsContainer>
    )
}