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

import { AuthContext, AuthProvider } from '../contexts/auth';
import { CategoryProvider } from '../contexts/category';
import { CreationProvider } from '../contexts/creation';
import { GameProvider } from '../contexts/game';
import { OpenAIProvider } from '../contexts/openai';
import { UserProvider } from '../contexts/user';
import { EMAIL_NOT_VALIDATED, EMAIL_VALIDATED, EXPLORER, GAME, GAME_DESCRIPTION, HOME, LANDING_PAGE, LOGIN, MYGAMES, NEW_PASSWORD, PLAYGAME, PROFILE, RECOVER_PASSWORD, REGISTER, SETTINGS, TEST, USER_DESCRIPTION } from '../core/app-urls';
import CreationSettings from '../pages/CreationSettings';
import Explorer from '../pages/Explorer';
import { GameInfos } from '../pages/GameInfos';
import MyGames from '../pages/MyGames';
import Profile from '../pages/Profile';
import VisualizationTest from '../pages/VisualizationTest/VisualizationTest';
import { UserInfos} from '../pages/UserInfos';

function AppRoutes() {
    function Private({ children }: { children: ReactNode }) {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <></>
        }

        if (!authenticated) {
            return <Navigate to={LOGIN} />
        }

        return <>{children}</>
    }

    function NotLogged({ children }: { children: ReactNode }) {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <div>Carregando...</div>
        }

        if (authenticated) {
            return <Navigate to={HOME} />
        }
        return <>{children}</>
    }

    return (
        <Router>
            <GameProvider>
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
                                        <Route path={MYGAMES} element={<Private><MyGames/></Private>} > </Route>
                                        <Route path={EXPLORER} element={<Explorer />}></Route>
                                        <Route path={GAME_DESCRIPTION + '/:id'} element={<GameInfos />} > </Route>
                                        <Route path={USER_DESCRIPTION + '/:nickname'} element={<UserInfos />}></Route>
                                        <Route path={TEST} element={<VisualizationTest />} > </Route>
                                        <Route path={GAME + '/:id' + SETTINGS} element={<Private><CreationSettings /></Private>} > </Route>
                                    </Routes>
                                </UserProvider>
                            </OpenAIProvider>
                        </CategoryProvider>
                    </CreationProvider>
                </AuthProvider>
            </GameProvider>
        </Router >
    );
}

export default AppRoutes;