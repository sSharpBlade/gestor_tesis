import { PDFDownloadLink } from "@react-pdf/renderer";
import Anexo11 from "./Anexo11";
import Button from "antd/es/button";

const DownloadButton = ({ student }) => {
  return (
    <PDFDownloadLink
      document={<Anexo11 student={student} />}
      fileName={`${student.issue + " - " + student.name}.pdf`}
    >
      {() => (
        <Button
          //disabled={student.percentage !== 100}
          className="border-0 bg-transparent"
          onClick={() => {
            console.log(student.idThesis);
          }}
        >
          Generar Anexo11
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default DownloadButton;
