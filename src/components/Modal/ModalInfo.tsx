import React, { useEffect, useState } from "react";
import { Button, Modal, Table, TableColumnsType } from "antd";
import { fetchDataReport, getDatosReport } from "./dataInfo";
import { ReportType } from "./reportType";
import {
  DeleteOutlined,
  EditFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [dataReport, setDataReport] = useState<ReportType[]>([]);

  useEffect(() => {
    if (isModalOpen) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (student) {
      fetchDataReport(student.id)
        .then(() => {
          setDataReport(getDatosReport());
        })
        .catch((error) => {
          console.error("Error fetching report data:", error);
          setLoading(true);
        });
    }
  }, [student, isModalOpen]);

  const columns: TableColumnsType<ReportType> = [
    {
      title: "Fecha",
      dataIndex: "date",
      width: 60,
    },
    {
      title: "Titulo",
      dataIndex: "issue",
      width: 70,
    },
    {
      title: "%",
      dataIndex: "percentage",
      width: 30,
    },
    {
      title: "Opciones",
      width: 55,
      render: (dataReport) => (
        <div className="content-center">
          <Button
            className="border-0 bg-transparent"
            onClick={() => {
              console.log("Editar reporte:", dataReport.idReport);
            }}
          >
            <EditFilled />
          </Button>

          <Button
            className="border-0 bg-transparent"
            onClick={() => {
              console.log("Eliminar reporte:", dataReport.idReport);
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Modal
      centered
      loading={loading}
      title={`Información de ${student.name || "Estudiante"}`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
    >
      <p>
        <b>Cédula:</b> {student.id}
      </p>
      <p>
        <b>Nombre:</b> {student.name}
      </p>
      <br />
      <p>
        <b>Carrera:</b> {student.career}
      </p>
      <p>
        <b>Tema:</b> {student.issue}
      </p>
      <p>
        <b>Fecha de aprobación:</b> {student.approvalDate}
      </p>
      <p>
        <b>Estado:</b> {student.state}
      </p>
      <p>
        <b>Porcentaje:</b> {student.percentage}%
      </p>
      <br />
      <h3>
        <b>Informes:</b>
      </h3>
      <Button
        className="border-0 bg-transparent"
        onClick={() => {
          console.log("Tesis:", student.idThesis);
        }}
      >
        <PlusCircleOutlined />
      </Button>
      <Table
        columns={columns}
        dataSource={dataReport.map((item) => ({ ...item, key: item.idReport }))}
        loading={loading}
        pagination={{
          pageSize: 5,
          hideOnSinglePage: true,
        }}
        // scroll={{ y: 73 }}
      />
    </Modal>
  );
};

export default ModalInfo;
