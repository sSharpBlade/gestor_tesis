import React, { useState } from 'react';
import { FloatButton, Modal,  } from 'antd';
import {
  BarsOutlined,
  DisconnectOutlined,
  DiffOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { request } from '../components/Student/Student.request';
import StudentForm from '../components/Student/StudentForm';
import { useNavigate } from 'react-router-dom';


const teacherID = localStorage.getItem('teacherID');

interface ListStudentsProps {
  onDataChange: () => void
}
const Menu: React.FC<ListStudentsProps> = ({onDataChange}) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
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
    navigate('/');  // Redirige al inicio
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
          tooltip={<div>Cambiar contraseña</div>}
          icon={<UnlockOutlined />}
          onClick={() => {
            console.log("Cambiando contraseña...");
          }}
        />
        <FloatButton
          tooltip={<div>Cerrar Sesión</div>}
          icon={<DisconnectOutlined />}
          onClick={handleLogout}
        />
      </FloatButton.Group>

      <Modal
        title="Asignar Estudiante"
        open={showModal}
        onCancel={handleClose}
        footer={null}
      >
        <StudentForm TeacherID = {Number(teacherID)} onSubmit={handleFormSubmit} />
      </Modal>
    </>
  );
};

export default Menu;
