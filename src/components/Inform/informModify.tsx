import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './inform.module.css';
import ActivityTable from '../Activities/table';

interface Student {
  career: string;
  name: string;
  issue: string;
  id: string;
  approvalDate: string;
  state: string;
  percentage: number;
  idThesis: number;
}

interface ReportResponse {
  idReport: number;
  issue: string; // Aquí estamos usando `issue`
  date: string;
  percentage: number;
  title: string;
}

const InformModify: React.FC = () => {
  const location = useLocation();
  const { student, reportData } = location.state as { student: Student, reportData: ReportResponse };
  console.log("tema: "+reportData.title)
  console.log('Location state:', location.state); // Depuración

  const [currentDate, setCurrentDate] = useState('');
  const [title, setTitle] = useState(reportData ? reportData.title : ''); // Asegúrate de usar `issue`
  const [percentage, setPercentage] = useState(reportData.percentage.toString());

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedReport = {
      modsigned: currentDate,
      percentage: parseInt(percentage),
      title: title,
    };

    try {
      const response = await fetch(`http://localhost:3000/reports/${reportData.idReport}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReport),
      });

      if (response.ok) {
        alert('El informe se guardo con exito');
        console.log('Reporte actualizado exitosamente');
      } else {
        console.error('Error al actualizar el reporte');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className={styles.containerInform}>
      <div className={styles.leftSection}>
        <h3>ANEXO 5</h3>
        <h3>INFORME MENSUAL DEL AVANCE DEL TRABAJO DE TITULACIÓN</h3>
        <h3>UNIVERSIDAD TÉCNICA DE AMBATO</h3>
        <h3>FACULTAD DE INGENIERÍA EN SISTEMAS ELECTRÓNICA E INDUSTRIAL</h3>
        <h3>{student?.career.toUpperCase()}</h3>
        <br></br>
        <form onSubmit={handleSubmit}>
          <p>
            <b>FECHA :</b> 
            <input type='date' 
            name='date' 
            className={styles.dateInput} 
            defaultValue={reportData.date} />
          </p>
          <p>
            <b>NOMBRE DEL ESTUDIANTE :</b> {student?.name.toUpperCase()}
          </p>
          <p>
            <b>MODALIDAD DE TITULACIÓN:</b> PROYECTO DE INVESTIGACIÓN
          </p>
          <p>
            <b>TEMA DEL TRABAJO DE TITULACIÓN :</b> {student?.issue.toUpperCase()}
          </p>
          <p>
            <b>FECHA DE APROBACIÓN DE LA PROPUESTA :</b> {student?.approvalDate.toUpperCase()}
          </p>
          <p>
            <b>TITULO DEL INFORME:</b>
            <input type='text'
              name='reportTitle' 
              className={styles.numInformeInput} 
              defaultValue={reportData.title} // Asegúrate de usar `issue`
              onChange={(e) => setTitle(e.target.value)} />
          </p>
          <p>
            <b>PORCENTAJE DE AVANCE :</b>
            <br></br>
            <input type='number' 
            name='progressPercentage' 
            className={styles.percentageInput} 
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            min="1" />
          </p>
          <div>
            <b>ACTIVIDADES</b>
            <ActivityTable id={reportData.idReport} />
          </div>
          <div>
            <button type='submit'>Guardar</button>
          </div>
        </form>
      </div>
      <div className={styles.rightSection}>
        <h2>Sección para la visualización del documento</h2>
        <div>
          <button>Generar PDF</button>
        </div>
      </div>
    </div>
  );
};

export default InformModify;
//listo no lecambies nada aaaaaaaaaaa