import { Skeleton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../../components/Header/Header';
import HeaderLogged from '../../components/Header/HeaderLogged';
import { AuthContext } from '../../contexts/auth';
import { UserContext } from '../../contexts/user';
import { LOGIN } from '../../core/app-urls';
import { CategoryInfoLabel, CategoryInfoWrapper, CategoryWrapper, DescriptionWrapper, DenounceButton, UserActionsWrapper, UserInfosMain, UserInfosWrapper, UserNickname, UserPhotoWrapper, UsersInfosWrapper, FollowButton, DescriptionInfoWrapper, UserPhoto, UserPhotoPlaceholder } from '../../styles/UserInfos';
import AppError from '../../core/app-error';


export const UserInfos = () => {


    const { nickname } = useParams()

    const { findUserByNickname, visitingUser, setVisitingUser, followUser, unfollowUser } = useContext(UserContext)
    const { authenticated, user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    // const [loadingGames, setLoadingGames] = useState(true)
    const [following, setFollowing] = useState(false);
    // const { hotGames, getHotGamesForHome } = useContext(GameContext)

    const handleClick = async () => {
        if (!following) {
            try {
                await followUser(user?.id!.toString() ?? '', visitingUser?.id!.toString() ?? '')
                setFollowing(true);
                const visitingUserTemp = visitingUser
                visitingUserTemp!.followers += 1
                setVisitingUser(visitingUserTemp)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await unfollowUser(user?.id!.toString() ?? '', visitingUser?.id!.toString() ?? '')
                setFollowing(false);
                const visitingUserTemp = visitingUser
                visitingUserTemp!.followers -= 1
                setVisitingUser(visitingUserTemp)
            } catch (error) {
               console.log(error)
            }
        }
    };

    // const fetchGames = async () => {
    //     try {
    //       await Promise.all([getHotGamesForHome()]);
    //       setTimeout(() => {
    //         setLoadingGames(false)
    //       }, 500);
    //     } catch (e) {
    //       setLoadingGames(false)
    //       const error = await e as AppError
    //       if (error.statusCode === 401) {
    //         try {
    //           await refresh()
    //           await fetchGames()
    //         } catch (e) {
    //           logout()
    //         }
    //       }
    //     }
    // };

    async function getUserByNickname(nickname: string): Promise<void> {
        try {
            // setLoading(true)
            await findUserByNickname(nickname);

        } catch (error) {
            // setLoading(false)
            console.error(error)
            // navigate(EXPLORER)
        }
    }

    useEffect(() => {
        getUserByNickname(nickname!)
        // fetchGames()
    }, [])

    useEffect(() => {
        if (visitingUser !== null) {
            setTimeout(() => {
                setLoading(false)
                setFollowing(visitingUser.isFollowing)
            }, 1000);  
        } else {
            setLoading(true)
        }
    }, [visitingUser])

    return (
        <>
            {authenticated ?
                (<HeaderLogged nickname={user!.nickname} photo={user!.photo} />) :
                (<Header page='Login' redirect={LOGIN} />)
            }
            <UserInfosMain>
                {loading ?
                    (<Skeleton variant="rounded" animation="wave" width='40%' height='40px' style={{ marginTop: '12px' }} />)
                    :
                    (<UserNickname>@{visitingUser?.nickname}</UserNickname>)}
                <UserInfosWrapper>
                    <UserPhotoWrapper>
                        {loading ?
                            (<Skeleton variant="rounded" animation="wave" width='100%' height='300px' />)
                            :
                            (
                            visitingUser?.photo == null ? (
                                <UserPhotoPlaceholder>
                                    {visitingUser?.nickname[0].toUpperCase()}
                                </UserPhotoPlaceholder>
                            ) : (
                                <UserPhoto src={visitingUser?.photo} alt="Perfil image" />
                            ) 
                            )
                        }
                    </UserPhotoWrapper>
                    <UsersInfosWrapper>
                        {loading ?
                            (<DescriptionWrapper>
                                <DescriptionInfoWrapper>
                                    <Skeleton variant="rounded" animation="wave" width='4rem' height='40px' style={{ marginTop: '2rem' }} />
                                    <Skeleton variant="rounded" animation="wave" width='8rem' height='40px' />
                                    <Skeleton variant="rounded" animation="wave" width='4rem' height='40px' style={{ marginTop: '2rem' }} />
                                    <Skeleton variant="rounded" animation="wave" width='8rem' height='40px' />
                                </DescriptionInfoWrapper>
                                <DescriptionInfoWrapper>
                                    <Skeleton variant="rounded" animation="wave" width='4rem' height='40px' style={{ marginTop: '2rem' }} />
                                    <Skeleton variant="rounded" animation="wave" width='8rem' height='40px' />
                                    <Skeleton variant="rounded" animation="wave" width='4rem' height='40px' style={{ marginTop: '2rem' }} />
                                    <Skeleton variant="rounded" animation="wave" width='8rem' height='40px' />
                                </DescriptionInfoWrapper>
                            </DescriptionWrapper>)
                            :
                            (
                                <DescriptionWrapper>
                                    <DescriptionInfoWrapper>
                                        <h3>E-MAIL</h3>
                                        <p>{visitingUser?.email}</p>
                                        <h3>NOME</h3>
                                        <p>{visitingUser?.name}</p>
                                    </DescriptionInfoWrapper>
                                    <DescriptionInfoWrapper>
                                        <h3>SEGUIDORES</h3>
                                        <p>{visitingUser?.followers}</p>
                                        <h3>SEGUINDO</h3>
                                        <p>{visitingUser?.following}</p>
                                    </DescriptionInfoWrapper>
                                </DescriptionWrapper>
                            )}
                        {loading ?
                            (<div style={{ display: 'flex', gap: '1rem' }}>
                                <Skeleton variant="rounded" animation="wave" width='120px' height='30px' />
                                <Skeleton variant="rounded" animation="wave" width='120px' height='30px' />
                                <Skeleton variant="rounded" animation="wave" width='120px' height='30px' />
                            </div>)
                            : visitingUser?.categories.length === 0 ? (<></>) : (
                                <CategoryWrapper>
                                    <h3>CATEGORIA PRINCIPAL</h3>
                                    <CategoryInfoWrapper className='category-label-wrapper'>
                                        <CategoryInfoLabel key={visitingUser?.categories[0].id} color={visitingUser?.categories[0].color} href={`/explorer?tag=${visitingUser?.categories[0].title}`}>
                                            {visitingUser?.categories[0].title}
                                        </CategoryInfoLabel>
                                    </CategoryInfoWrapper>
                                </CategoryWrapper>
                            )}
                    </UsersInfosWrapper>
                        {loading ?
                        (<UserActionsWrapper>
                            <Skeleton variant="rounded" animation="wave" width='90%' height='30px' style={{ marginTop: '3rem' }} />
                            <Skeleton variant="rounded" animation="wave" width='100%' height='40px' style={{ marginTop: '8px' }} />
                        </UserActionsWrapper>)
                        : (<UserActionsWrapper>
                            <DenounceButton>Denunciar</DenounceButton>
                            <FollowButton   className={following ? 'following' : ''}
                                        onClick={handleClick}>
                                        {following ? 'Seguindo' : 'Seguir'}
                            </FollowButton>
           
                            
                        </UserActionsWrapper>)}
                </UserInfosWrapper>
                </UserInfosMain>
                {/* {loadingGames ?
                    (<Skeleton variant="rounded" animation="wave" width='40%' height='40px' style={{ marginTop: '12px' }} />)
                    :
                    (<UserInfosWrapper>
                        <h2>Histórias de @{visitingUser?.nickname}</h2>
                    </UserInfosWrapper>)} 
                </UserInfosMain>
                {/* <GameListContainer>
                    <ListGamesCardContainer>
                    {loadingGames ? (
                        <>
                        <CardExplorerHotShimmer />
                        <CardExplorerHotShimmer />
                        <CardExplorerHotShimmer />
                        <CardExplorerHotShimmer />
                        </>
                    ) : hotGames.map((game, index) => (
                        <CardMostViewGame
                        key={index}
                        id={game.id}
                        title={game.title}
                        imageSrc={game.image != null ? game.image : `https://picsum.photos/300/200?random=4`}
                        description={game.description}
                        categories={game.categories}
                        createdByNickname={game.createdBy!.nickname}
                        />
                    ))}
                    </ListGamesCardContainer>
                </GameListContainer> */}
        </>
    );
}