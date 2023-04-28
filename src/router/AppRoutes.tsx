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
import { GameProvider } from '../contexts/game';
import { CreationProvider } from '../contexts/creation';
import { EMAIL_NOT_VALIDATED, EMAIL_VALIDATED, GAME, HOME, LANDING_PAGE, LOGIN, NEW_PASSWORD, RECOVER_PASSWORD, REGISTER } from '../core/app-urls';

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

    function NotLogged( { children }: { children: ReactNode }) {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <div>Carregando...</div>
        }

        if (authenticated) {
            return <Navigate to={'/logged'} />
        }
        return <>{children}</>
    }

    return (
        <Router>
            <GameProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home />} > </Route>
                        <Route path="/login" element={<NotLogged><Login /></NotLogged>} > </Route>
                        <Route path="/register" element={<NotLogged><Register /></NotLogged>} > </Route>
                        <Route path="/recover" element={<Recover />} > </Route>
                        <Route path="/newpassword" element={<NewPword />} > </Route>
                        <Route path="/notvalidated" element={<NotValidated />} > </Route>
                        <Route path="/validated" element={<Validated />} > </Route>
                        <Route path="/logged" element={<Private><HomeLogged /></Private>} > </Route>
                        <Route path="/creation" element={<Private><Creation /></Private>} > </Route>
                    </Routes>
                </AuthProvider>
            </GameProvider>
        </Router>
    );
}

export default AppRoutes;