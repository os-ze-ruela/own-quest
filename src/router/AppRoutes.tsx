import { ReactNode, useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../App.css';
import Creation from '../pages/Creation/Creation';
import Game from '../pages/Game/Game';
import Home from '../pages/Home';
import HomeLogged from '../pages/HomeLogged/HomeLogged';
import Login from '../pages/Login';
import NewPword from '../pages/NewPword';
import NotValidated from '../pages/NotVlidated';
import Recover from '../pages/Recover';
import Register from '../pages/Register';
import Validated from '../pages/Validated';

import { Backdrop, CircularProgress } from '@mui/material';
import { AuthContext, AuthProvider } from '../contexts/auth';
import { CategoryProvider } from '../contexts/category';
import { CreationProvider } from '../contexts/creation';
import { GameProvider } from '../contexts/game';
import { OpenAIProvider } from '../contexts/openai';
import { PlayGamesProvider } from '../contexts/play-games';
import { UserProvider } from '../contexts/user';
import { EMAIL_NOT_VALIDATED, EMAIL_VALIDATED, EXPLORER, GAME, GAME_DESCRIPTION, GAME_HISTORY, HOME, LANDING_PAGE, LOGIN, MYGAMES, NEW_PASSWORD, PERMISSION_DENIED, PLAYGAME, PROFILE, RECOVER_PASSWORD, REGISTER, SETTINGS, TEST, USER_DESCRIPTION } from '../core/app-urls';

import CreationSettings from '../pages/CreationSettings';
import Explorer from '../pages/Explorer';
import GameHistory from '../pages/GameHistory/GameHistory';
import { GameInfos } from '../pages/GameInfos';
import MyGames from '../pages/MyGames';
import PermissionDenied from '../pages/PermissionDenied';
import Profile from '../pages/Profile';
import { UserInfos } from '../pages/UserInfos';
import VisualizationTest from '../pages/VisualizationTest/VisualizationTest';

function AppRoutes() {
    function Private({ children }: { children: ReactNode }) {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <Backdrop open={true} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Backdrop>
        }

        if (!authenticated) {
            return <Navigate to={LOGIN} />
        }

        return <>{children}</>
    }

    function NotLogged({ children }: { children: ReactNode }) {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <Backdrop open={true} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Backdrop>
        }

        if (authenticated) {
            return <Navigate to={HOME} />
        }
        return <>{children}</>
    }

    return (
        <Router>
            <GameProvider>
                <PlayGamesProvider>
                    <AuthProvider>
                        <CreationProvider>
                            <CategoryProvider>
                                <OpenAIProvider>
                                    <UserProvider>
                                        <Routes>
                                            <Route path={LANDING_PAGE} element={<Home />} > </Route>
                                            <Route path={LOGIN} element={<NotLogged><Login /></NotLogged>} > </Route>
                                            <Route path={REGISTER} element={<NotLogged><Register /></NotLogged>} > </Route>
                                            <Route path={RECOVER_PASSWORD} element={<Recover />} > </Route>
                                            <Route path={NEW_PASSWORD} element={<NewPword />} > </Route>
                                            <Route path={EMAIL_NOT_VALIDATED} element={<NotValidated />} > </Route>
                                            <Route path={EMAIL_VALIDATED} element={<Validated />} > </Route>
                                            <Route path={HOME} element={<Private><HomeLogged /></Private>} > </Route>
                                            <Route path={GAME + '/:id'} element={<Private><Creation /></Private>} > </Route>
                                            <Route path={PLAYGAME + '/:id'} element={<Private><Game /></Private>} > </Route>
                                            <Route path={PROFILE} element={<Private><Profile /></Private>} > </Route>
                                            <Route path={MYGAMES} element={<Private><MyGames /></Private>} > </Route>
                                            <Route path={EXPLORER} element={<Explorer />}></Route>
                                            <Route path={GAME_DESCRIPTION + '/:id'} element={<GameInfos />} > </Route>
                                            <Route path={PERMISSION_DENIED} element={<PermissionDenied />} > </Route>
                                            <Route path={USER_DESCRIPTION + '/:nickname'} element={<Private><UserInfos /></Private>}></Route>
                                            <Route path={TEST} element={<VisualizationTest />} > </Route>
                                            <Route path={GAME + '/:id' + SETTINGS} element={<Private><CreationSettings /></Private>} > </Route>
                                            <Route path={GAME_HISTORY + '/:id'} element={<Private><GameHistory /></Private>} > </Route>
                                        </Routes>
                                    </UserProvider>
                                </OpenAIProvider>
                            </CategoryProvider>
                        </CreationProvider>
                    </AuthProvider>
                </PlayGamesProvider>
            </GameProvider>
        </Router >
    );
}

export default AppRoutes;