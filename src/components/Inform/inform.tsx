import React, { FormEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './inform.module.css';

interface Student {
  career: string;
  name: string;
  issue: string;
  approvalDate: string;
  idThesis: number; // Añadido idThesis aquí
}

interface Inform {
  authorizeSignature:string;
  date:string;
  progressPercentage: number;
  reportTitle: string;
  idThesis:number;
}

interface LocationState {
  student: Student;
}

const Informe: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as LocationState;
  const { student } = locationState || {};

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const dateInput = (form.elements.namedItem('date') as HTMLInputElement).value;
    const reportNumber = (form.elements.namedItem('reportNumber') as HTMLInputElement).value;
    const progressPercentage = (form.elements.namedItem('progressPercentage') as HTMLInputElement).value;
    const authorizeSignature = (form.elements.namedItem('authorizeSignature') as HTMLInputElement).checked;
    

    if (!dateInput || !reportNumber || !progressPercentage) {
      alert("Todos los campos son requeridos.");
      return;
    }

    if (Number(reportNumber) <= 0 || Number(progressPercentage) <= 0) {
      alert("Los números deben ser mayores que cero.");
      return;
    }

    const formData : Inform ={
      date: dateInput,
      reportTitle: `INFORME Nº: ${reportNumber}`,
      progressPercentage : Number(progressPercentage),
      authorizeSignature: authorizeSignature ? currentDate : '', //aqui quiero que envies la fecha actual no un boolean 
      idThesis: student.idThesis 
    };

    // Aquí puedes hacer un POST request con formData
    console.log(formData);
  };

  return (
    <div className={styles.containerInform}>
      <div className={styles.leftSection}>
        <h3>ANEXO 5</h3>
        <h3>INFORME MENSUAL DEL AVANCE DEL TRABAJO DE TITULACIÓN</h3>
        <h3>UNIVERSIDAD TÉCNICA DE AMBATO</h3>
        <h3>FACULTAD DE INGENIERÍA EN SISTEMAS ELECTRÓNICA E INDUSTRIAL</h3>
        <h3>{student?.career.toUpperCase()}</h3>
        <form onSubmit={handleSubmit}>
          <p>
            <b>FECHA :</b> <input type='date' name='date' className={styles.dateInput} defaultValue={currentDate} />
          </p>
          <p>
            <b>NOMBRE DEL ESTUDIANTE :</b> {student?.name}
          </p>
          <p>
            <b>MODALIDAD DE TITULACIÓN:</b> PROYECTO DE INVESTIGACIÓN
          </p>
          <p>
            <b>TEMA DEL TRABAJO DE TITULACIÓN :</b> {student?.issue}
          </p>
          <p>
            <b>FECHA DE APROBACIÓN DE LA PROPUESTA :</b> {student?.approvalDate}
          </p>
          <p>
            <b>TITULO DEL INFORME:</b> INFORME Nº: <input type='number' name='reportNumber' className={styles.numInformeInput} min="1" />
          </p>
          <p>
            <b>PORCENTAJE DE AVANCE :</b>
            <input type='number' name='progressPercentage' className={styles.percentageInput} min="1" />
          </p>
          <div>
            <b>ACTIVIDADES</b>
          </div>
          <div>
            <b>AUTORIZAR FIRMA :</b>
            <input type='checkbox' name='authorizeSignature' className={styles.checkboxInput} required
            />
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

export default Informe;
