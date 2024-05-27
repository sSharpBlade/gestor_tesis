import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import StudentForm from "./components/Student/StudentForm.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StudentForm/>
  </React.StrictMode>
);
