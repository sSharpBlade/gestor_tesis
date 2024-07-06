import React, { useState } from "react";
import { FloatButton, Modal } from "antd";
import {
  BarsOutlined,
  DisconnectOutlined,
  DiffOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { request } from "../components/Student/Student.request";
import StudentForm from "../components/Student/StudentForm";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";

interface ListStudentsProps {
  onDataChange: () => void;
  teacherID: number;
}
const Menu: React.FC<ListStudentsProps> = ({ teacherID, onDataChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalD, setShowModalD] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleShowD = () => setShowModalD(true);
  const handleClose = () => setShowModal(false);
  const handleCloseD = () => setShowModalD(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (data: any) => {
    const respose = await request(data);
    if (respose) {
      onDataChange();
    }
    return respose;
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigate("/"); // Redirige al inicio
  };

  return (
    <>
      <FloatButton.Group
        trigger="hover"
        type="default"
        style={{ top: 25, left: 25 }}
        icon={<BarsOutlined />}
        shape="square"
      >
        <FloatButton
          tooltip={<div>Añadir Estudiante</div>}
          icon={<DiffOutlined />}
          onClick={handleShow}
        />
        <FloatButton
          tooltip={<div>Dashboard</div>}
          icon={<DashboardOutlined />}
          onClick={handleShowD}
        />
        <FloatButton
          tooltip={<div>Cerrar Sesión</div>}
          icon={<DisconnectOutlined />}
          onClick={handleLogout}
        />
      </FloatButton.Group>

      <Modal
        centered
        title="Dashboard"
        open={showModalD}
        onCancel={handleCloseD}
        footer={null}
        width={10000}
        styles={{
          body: {
            height: "750px",
          },
        }}
      >
        <Dashboard />
      </Modal>

      <Modal
        title="Asignar Estudiante"
        open={showModal}
        onCancel={handleClose}
        footer={null}
        width={800} // Aumenta el ancho del modal (en píxeles)
        styles={{
          body: {
            height: "650px", // Aumenta la altura del contenido del modal
            overflowY: "auto", // Añade scroll vertical si el contenido es muy largo
          },
        }}
      >
        <StudentForm
          TeacherID={Number(teacherID)}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </>
  );
};

export default Menu;
