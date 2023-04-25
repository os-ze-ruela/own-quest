import React, { useContext, ReactNode } from 'react'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
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

import { AuthProvider, AuthContext } from '../contexts/auth'

function AppRoutes() {
    function Private({children}: { children: ReactNode }) {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <div>Carregando...</div>
        }

        if(!authenticated) {
            return <Navigate to={'/login'}/>
        }

        return <>{children}</>
    }

    return (
    <Router>
      <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} > </Route>
                <Route path="/login" element={<Login />} > </Route>
                <Route path="/register" element={<Register />} > </Route>
                <Route path="/recover" element={<Recover />} > </Route>
                <Route path="/newpassword" element={<NewPword />} > </Route>
                <Route path="/notvalidated" element={<NotValidated />} > </Route>
                <Route path="/validated" element={<Validated />} > </Route>
                <Route path="/logged" element={<Private><HomeLogged /></Private>} > </Route>
                <Route path="/creation" element= {<Private><Creation /></Private>} > </Route>
            </Routes>
      </AuthProvider>
    </Router>
    );
}

export default AppRoutes;