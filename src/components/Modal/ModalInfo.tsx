import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
  TableColumnsType,
  Popconfirm,
  notification,
  Flex,
  Progress,
} from "antd";
import { fetchDataReport, getDatosReport } from "./dataInfo";
import { ReportType } from "./reportType";
import {
  DeleteOutlined,
  EditFilled,
  ExclamationCircleOutlined,
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

  const confirm = (idReport: number) =>
    new Promise((resolve) => {
      console.log(`Informe eliminado con ID: ${idReport}`);
      setTimeout(() => {
        resolve(null);
      }, 1500);
    });

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

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (pauseOnHover: boolean) => () => {
    api.open({
      icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
      message: "A tener en cuenta !!",
      description:
        "Este informe ya se encuentra firmado, cualquier modificación será responsabilidad suya",
      showProgress: true,
      pauseOnHover,
    });
  };

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
              dataReport.signed != null
                ? openNotification(true)()
                : console.log("Aún es permitido");
            }}
          >
            <EditFilled />
          </Button>

          <Popconfirm
            title="Eliminar informe"
            description={"Se eliminará el informe: " + dataReport.issue}
            onConfirm={() => confirm(dataReport.idReport)}
            onOpenChange={() => {}}
          >
            <Button className="border-0 bg-transparent">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
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
          <b>Porcentaje:</b>
        </p>
        <Flex gap="small" vertical>
          <Progress
            percent={student.percentage}
            percentPosition={{ align: "start", type: "outer" }}
          />
        </Flex>
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
          dataSource={dataReport.map((item) => ({
            ...item,
            key: item.idReport,
          }))}
          loading={loading}
          pagination={{
            pageSize: 5,
            hideOnSinglePage: true,
          }}
          // scroll={{ y: 73 }}
        />
      </Modal>
    </>
  );
};

export default ModalInfo;
