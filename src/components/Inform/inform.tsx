import styles from './inform.module.css';

const Informe = () => {
    return (
        <div className={styles.containerInform}>
          <div className={styles.leftSection}>
            <h3>ANEXO 5</h3>
            <h3>INFORME MENSUAL DEL AVANCE DEL TRABAJO DE TITULACIÓN</h3>
            <h3>UNIVERSIDAD TÉCNICA DE AMBATO</h3>
            <h3>FACULTAD DE INGENIERÍA EN SISTEMAS ELECTRÓNICA E INDUSTRIAL</h3>
            <h3>[CARRERA QUE SE ENVIARÁ]</h3>
            <p>FECHA: </p>
            <p>NOMBRE DEL ESTUDIANTE: </p>
            <p>MODALIDAD DE TITULACIÓN: PROYECTO DE INVESTIGACIÓN</p>
            <p>TEMA DEL TRABAJO DE TITULACIÓN: </p>
            <p>FECHA DE APROBACIÓN DE LA PROPUESTA: </p>
            <p>PORCENTAJE DE AVANCE:</p>
            <div>
              Aquí va una tabla
            </div>
            <div>
              <button>Firmar</button>
            </div>
            <div>
              <button>Guardar</button>
            </div>
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