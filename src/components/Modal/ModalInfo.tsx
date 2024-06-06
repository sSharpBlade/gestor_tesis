import React from "react";
import { Modal } from "antd";

interface ModalInfoProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  student: any;
}

const ModalInfo: React.FC<ModalInfoProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  student,
}) => {
  return (
    <Modal
      title={`Información de ${student?.name || "Estudiante"}`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Nombre: {student?.name}</p>
      <p>Carrera: {student?.career}</p>
      <p>Estado: {student?.state}</p>
      <p>Porcentaje: {student?.percentage}%</p>
    </Modal>
  );
};

export default ModalInfo;
