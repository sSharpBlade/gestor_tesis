import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import ActivityTable from "./components/Activities/table";

//
//<App />
//
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
<ActivityTable id={1} />
  </React.StrictMode>
);