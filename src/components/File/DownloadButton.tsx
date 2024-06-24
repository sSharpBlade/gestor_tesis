import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Anexo11 from "./Anexo11";
import Button from "antd/es/button";

const DownloadButton = ({ student }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    console.log(student.idThesis);
  };

  return (
    <div>
      {isClicked ? (
        <PDFDownloadLink
          document={<Anexo11 student={student} />}
          fileName={`${student.issue + " - " + student.name}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              "Generando PDF..."
            ) : (
              <Button
                className="border-0 bg-transparent mt-3"
                onClick={() =>
                  setTimeout(() => {
                    setIsClicked(false);
                  }, 500)
                }
              >
                Descargar PDF
              </Button>
            )
          }
        </PDFDownloadLink>
      ) : (
        <Button
          // disabled={student.percentage !== 100}
          className="border-0 bg-transparent mt-3"
          onClick={handleClick}
        >
          Generar Anexo11
        </Button>
      )}
    </div>
  );
};

export default DownloadButton;
