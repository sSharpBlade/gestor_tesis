import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "antd/es/button";
import Anexo5 from "./Anexo5";

const DownloadButtonAnexo5 = ({ student, idReport }) => {
  return (
    <PDFDownloadLink
      document={<Anexo5 student={student} idReport={idReport}/>}
      fileName={`${student.issue + " - " + student.name+ " - Anexo 5" }.pdf`}
    >
      {() => (
        <Button
          className="border-0 bg-transparent"
          onClick={() => {
            console.log(student.idThesis);
          }}
        >
          Generar Anexo 5
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default DownloadButtonAnexo5;
