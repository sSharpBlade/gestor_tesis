import React, { useEffect } from "react";
import { Modal, Table, TableColumnsType } from "antd";

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
  const [loading, setLoading] = React.useState<boolean>(true);

  const columns: TableColumnsType = [
    {
      title: "Fecha",
      width: 100,
    },
    {
      title: "Titulo",
    },
    {
      title: "%",
      width: 20,
    },
    {
      width: 100,
    },
  ];

  useEffect(() => {
    if (isModalOpen) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [isModalOpen]);

  return (
    <Modal
      loading={loading}
      centered
      title={`Información de ${student?.name || "Estudiante"}`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
    >
      <p>Cédula: {student?.id}</p>
      <p>Nombre: {student?.name}</p>
      <p>Carrera: {student?.career}</p>
      <p>Tema: {student?.issue}</p>
      <p>Fecha de aprobación: {student?.approvalDate}</p>
      <p>Estado: {student?.state}</p>
      <p>Porcentaje: {student?.percentage}%</p>

      <Table columns={columns}></Table>
    </Modal>
  );
};

export default ModalInfo;
