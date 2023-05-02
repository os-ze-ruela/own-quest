import { ReactNode, useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../App.css';
import Creation from '../pages/Creation/Creation';
import Home from '../pages/Home';
import HomeLogged from '../pages/HomeLogged/HomeLogged';
import Login from '../pages/Login';
import NewPword from '../pages/NewPword';
import NotValidated from '../pages/NotVlidated';
import Recover from '../pages/Recover';
import Register from '../pages/Register';
import Validated from '../pages/Validated';

import { AuthContext, AuthProvider } from '../contexts/auth';
import { CreationProvider } from '../contexts/creation';
import { GameProvider } from '../contexts/game';
import { EMAIL_NOT_VALIDATED, EMAIL_VALIDATED, GAME, HOME, LANDING_PAGE, LOGIN, NEW_PASSWORD, PROFILE, RECOVER_PASSWORD, REGISTER } from '../core/app-urls';
import Profile from '../pages/Profile';

function AppRoutes() {
    function Private({ children }: { children: ReactNode }) {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <div>Carregando...</div>
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
                            <Route path={PROFILE} element={<Profile/>} > </Route>
                        </Routes>
                    </CreationProvider>
                </AuthProvider>
            </GameProvider>
        </Router>
    );
}

export default AppRoutes;