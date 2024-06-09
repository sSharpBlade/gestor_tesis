import Home from "./home/Home";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Informe from "./components/Inform/inform";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/informe" element={<Informe />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
};

export default App;