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

interface ReportType {
  date: string;
  issue: string;
  percentage: number;
  title: string;
    idReport: number; 
}

const InformModify2: React.FC = () => {
  const location = useLocation();
  const { student, dataReport } = location.state as { student: Student, dataReport: ReportType };
  console.log(dataReport)
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className={styles.containerInform}>
      <div className={styles.leftSection}>
        <h3>ANEXO 5</h3>
        <h3>INFORME MENSUAL DEL AVANCE DEL TRABAJO DE TITULACIÓN</h3>
        <h3>UNIVERSIDAD TÉCNICA DE AMBATO</h3>
        <h3>FACULTAD DE INGENIERÍA EN SISTEMAS ELECTRÓNICA E INDUSTRIAL</h3>
        <h3>{student?.career.toUpperCase()}</h3>
        
        <form>
          <p>
            <b>FECHA :</b> 
            <input type='date' 
            name='date' 
            className={styles.dateInput} 
            defaultValue={dataReport.date} />
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
            name='reportNumber' 
            className={styles.numInformeInput} 
            defaultValue={dataReport.issue}
            min="1" />
          </p>
          <p>
            <b>PORCENTAJE DE AVANCE :</b>
            <input type='number' 
            name='progressPercentage' 
            className={styles.percentageInput} 
            defaultValue={dataReport.percentage.toString()}
            min="1" />
          </p>
          <div>
            <b>ACTIVIDADES</b>
            <ActivityTable id={dataReport.idReport} />

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

export default InformModify2;