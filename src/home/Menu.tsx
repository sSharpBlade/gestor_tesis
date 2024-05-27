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

interface StudentFormProps {
  TeacherID:number
}

const Menu: React.FC<StudentFormProps> = ({TeacherID}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleFormSubmit = async (data: any) => {
    return await request(data);

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
          onClick={() => {
            console.log("Cerrando sesión...");
          }}
        />
      </FloatButton.Group>

      <Modal
        title="Asignar Estudiante"
        open={showModal}
        onCancel={handleClose}
        footer={null}
      >
        <StudentForm TeacherID = {TeacherID} onSubmit={handleFormSubmit} handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default Menu;
