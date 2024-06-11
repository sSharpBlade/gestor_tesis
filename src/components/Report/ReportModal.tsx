import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reporte.module.css';

interface FormularioReporteProps {
  student: {
    career: string;
    name: string;
    issue: string;
    id: string;
    approvalDate: string;
    state: string;
    percentage: number;
    idThesis: number;
  };
}

interface ReportResponse {
  idReport: number;
  title: string;
  date: string;
  percentage: number;
}

const FormularioReporte: React.FC<FormularioReporteProps> = ({ student }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [reportNumber, setReportNumber] = useState('');
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [authorizeSignature, setAuthorizeSignature] = useState(false);
  const [reportResponse, setReportResponse] = useState<ReportResponse | null>(null);
  
  const navigate = useNavigate(); // Hook para redirigir

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const progressPercentage = parseInt(formData.get('progressPercentage') as string, 10);
    
    const informe = {
      idThesis: student.idThesis,
      date: date,
      percentage: progressPercentage,
      title: reportNumber
    };

    try {
      const response = await fetch('http://localhost:3000/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(informe),
      });

      if (response.ok) {
        const data = await response.json();
        const reportData: ReportResponse = {
          idReport: data.idReport,
          title: data.title,
          date: data.date,
          percentage: data.percentage,
        };
        setReportResponse(reportData);
        console.log(reportData); // Imprimir los datos por consola
        toggleModal(); // Cerrar el modal después de enviar el formulario

        // Redirigir después de 2 segundos
        setTimeout(() => {
          navigate('/informeModificar', { state: { student, reportData } });
        }, 1000);
      } else {
        console.error('Error al crear el informe');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div>
      <button onClick={toggleModal}>Abrir Formulario</button>
      {isOpen && (
        <div className="modal">
          <div className="modalContent">
            <div className="formularioReporte">
              <h3>INFORME MENSUAL DEL AVANCE DEL TRABAJO DE TITULACIÓN</h3>
              <h3>UNIVERSIDAD TÉCNICA DE AMBATO</h3>
              <h3>FACULTAD DE INGENIERÍA EN SISTEMAS ELECTRÓNICA E INDUSTRIAL</h3>
              <h3>{student.career.toUpperCase()}</h3><br></br>
              <p>
                <b>NOMBRE DEL ESTUDIANTE:  </b>{student.name.toUpperCase()}
              </p>
              <p>
                <b>TEMA DEL TRABAJO DE TITULACIÓN:  </b>{student.issue.toUpperCase()}
              </p>
              <br></br>
              <form onSubmit={handleSubmit}>
                <p>
                  <b>FECHA :</b>
                  <input
                    type='date'
                    name='date'
                    className='dateInput'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </p>
                <p>
                  <b>TITULO DEL INFORME:</b>
                  <input
                    type='text'
                    name='reportNumber'
                    className='numInformeInput'
                    value={reportNumber}
                    onChange={(e) => setReportNumber(e.target.value)}
                    required
                  />
                </p>
                <br></br>
                <p>
                  <b>PORCENTAJE DE AVANCE :</b>
                  <input
                    type='number'
                    name='progressPercentage'
                    className='percentageInput'
                    value={progressPercentage}
                    onChange={(e) => setProgressPercentage(Number(e.target.value))}
                    min={1}
                    required
                  />
                </p>
                <p><br></br>
                  <b>AUTORIZAR FIRMA :</b>
                  <input
                    type='checkbox'
                    name='authorizeSignature'
                    className='checkboxInput'
                    checked={authorizeSignature}
                    onChange={(e) => setAuthorizeSignature(e.target.checked)}
                    required
                  />
                </p>
                <div>
                  <button type="submit">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioReporte;
