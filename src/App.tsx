import Home from "./home/Home";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import InformModify from "./components/Inform/informModify";
import InformModify2 from "./components/Inform/informModify2";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="//informeModificar2" element={<InformModify2 />} />
        <Route path="/informeModificar" element={<InformModify />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
};

export default App;