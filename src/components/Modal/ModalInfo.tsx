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
import EditarInforme from "../Inform/EditarInformeModal";
import CrearInforme from "../Inform/CrearInformeModal";
import DownloadButton from "../File/DownloadButton";

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
  const [isCrearInformeModalOpen, setIsCrearInformeModalOpen] =
    useState<boolean>(false);
  const [isEditarInformeModalOpen, setIsEditarInformeModalOpen] =
    useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  // const navigate = useNavigate();

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
      width: 150,
    },
    {
      title: "%",
      dataIndex: "percentage",
      width: 30,
    },
    {
      title: "Opciones",
      width: 50,
      render: (dataReport) => (
        <div className="content-center">
          <Button
            className="border-0 bg-transparent"
            onClick={() => {
              if (dataReport.idReport) {
                setSelectedReport(dataReport); // Guardar el informe seleccionado
                setIsEditarInformeModalOpen(true);
                console.log(dataReport);

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
        width={1000}
        styles={{
          mask: {
            backdropFilter: "blur(10px)",
          },
        }}
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
              //setIdThesis(student.idThesis); // Guardar el idThesis
              //setIsFormOpen(true); // Abrir el modal
              setIsCrearInformeModalOpen(true);
              console.log(student.idThesis);
            }}
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
            pageSize: 3,
            hideOnSinglePage: true,
          }}
        />
        <DownloadButton student={student}></DownloadButton>
      </Modal>
      <CrearInforme
        idThesis={student.idThesis}
        isModalOpen={isCrearInformeModalOpen}
        handleCancel={() => setIsCrearInformeModalOpen(false)}
      />
      {selectedReport && (
        <EditarInforme
          isModalOpen={isEditarInformeModalOpen}
          handleOk={() => setIsEditarInformeModalOpen(false)}
          handleCancel={() => setIsEditarInformeModalOpen(false)}
          student={student}
          dataReport={selectedReport}
        />
      )}
    </>
  );
};

export default ModalInfo;
