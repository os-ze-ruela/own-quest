import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import NewPword from './pages/NewPword';
import Recover from './pages/Recover';
import Register from './pages/Register';
import NotValidated from './pages/NotVlidated';
import Validated from './pages/Validated';

function App() {
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
        </Routes>
    </Router>
  );
}

export default App;
