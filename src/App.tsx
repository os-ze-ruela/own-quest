import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Home />} > </Route>
            <Route path="/login" element={<Login />} > </Route>
            <Route path="/recover" element={<Recover />} > </Route>
            <Route path="/newpword" element={<NewPword />} > </Route>
        </Routes>
    </Router>
  );
}

export default App;
