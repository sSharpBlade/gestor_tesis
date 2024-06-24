import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "antd/es/button";
import Anexo5 from "./Anexo5";
import { notification } from "antd";

const DownloadButtonAnexo5 = ({ student, idReport,refreshKey }) => {
  const showDownloadNotification = () => {
    notification.success({
      message: 'Descarga Iniciada',
      description: 'La descarga del Anexo 5 ha comenzado.',
    });
  };
  return (
    <PDFDownloadLink
      document={<Anexo5 student={student} idReport={idReport} refreshKey={refreshKey}/>}
      fileName={`${student.issue + " - " + student.name+ " - Anexo 5" }.pdf`}
    >
      {({ loading }) => (
        <Button className="border-0 bg-transparent" onClick={showDownloadNotification}>
          {loading ? "Generando..." : "Generar Anexo 5"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default DownloadButtonAnexo5;
