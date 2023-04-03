import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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

function AppRoutes() {
    return (
    <Router>
      <Routes>
            <Route path="/" element={<Home />} > </Route>
            <Route path="/login" element={<Login />} > </Route>
            <Route path="/register" element={<Register />} > </Route>
            <Route path="/recover" element={<Recover />} > </Route>
            <Route path="/newpassword" element={<NewPword />} > </Route>
            <Route path="/notvalidated" element={<NotValidated />} > </Route>
            <Route path="/validated" element={<Validated />} > </Route>
            <Route path="/logged" element={<HomeLogged />} > </Route>
            <Route path="/creation" element={<Creation />} > </Route>
        </Routes>
    </Router>
    );
}

export default AppRoutes;