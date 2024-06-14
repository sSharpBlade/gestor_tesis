import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import EditarInforme from "./components/Inform/EditarInformeModal";
import CrearInforme from "./components/Inform/CrearInformeModal";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    < App />
  </React.StrictMode>
);