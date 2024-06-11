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
  Tooltip,
} from "antd";
import { deleteReport, fetchDataReport, getDatosReport } from "./dataInfo";
import { ReportType } from "./reportType";
import {
  DeleteOutlined,
  EditFilled,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FormularioReporte from "../Report/ReportModal"; // Asegúrate de que la ruta sea correcta

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
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); // Estado para controlar la visibilidad del nuevo modal
  const navigate = useNavigate();

  const confirm = async (idReport: number) => {
    return new Promise(async (resolve) => {
      await deleteReport(idReport);
      const data = await getDatosReport();
      setTimeout(() => {
        setDataReport(data);
        resolve(null);
        window.location.reload();
      }, 500);
    });
  };

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

  const openNotification =
    (pauseOnHover: boolean, message: string, description: string) => () => {
      api.open({
        icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
        message: message,
        description: description,
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
              if (dataReport.idReport) {
                console.log(dataReport)
                navigate("/informeModificar", {
                  state: {
                    student,
                  },
                });
                if (dataReport.signed != null) {
                  openNotification(
                    true,
                    "A tener en cuenta !!",
                    "Este informe ya se encuentra firmado, cualquier modificación será responsabilidad suya"
                  )();
                } else if (checkIfOutOfTime(dataReport.date)) {
                  openNotification(
                    true,
                    "Informe fuera de tiempo",
                    "Este informe va ser modificado fuera del tiempo permitido"
                  )();
                } else {
                  console.log("Aún es permitido");
                }
              } else {
                console.error("ID del reporte no está definido.");
              }
            }}
          >
            <EditFilled />
          </Button>

          <Popconfirm
            title="Eliminar informe"
            description={"Se eliminará el informe: " + dataReport.issue}
            onConfirm={() => confirm(dataReport.idReport)}
            onOpenChange={() => { }}
          >
            <Button className="border-0 bg-transparent">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const checkIfOutOfTime = (reportDate: string): boolean => {
    const report = new Date(reportDate);
    const now = new Date();

    return (
      report.getFullYear() < now.getFullYear() ||
      (report.getFullYear() === now.getFullYear() &&
        report.getMonth() < now.getMonth())
    );
  };

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
        <Tooltip placement="right" title={"Agregar informe"} arrow={true}>
          <Button
            disabled={student.percentage === 100}
            className="border-0 bg-transparent"
            onClick={() => {
              setIsFormOpen(true);
              console.log(student.idThesis);
            }} // Cambia el estado para mostrar el nuevo modal
          >
            <PlusCircleOutlined />
          </Button>
        </Tooltip>
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
        />
        {/* Modal para el FormularioReporte */}
        <Modal
          title="Agregar Informe"
          open={isFormOpen}
          onCancel={() => setIsFormOpen(false)} // Función para cerrar el modal
          footer={null}
        >
          <FormularioReporte />
        </Modal>
      </Modal>
    </>
  );
};

export default ModalInfo;
