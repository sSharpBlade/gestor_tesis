import React, { useState } from 'react';
import './Reporte.module.css';

const FormularioReporte: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 10);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log('Formulario enviado');
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
                        <h3>{/* Aque que se envie la carrera del estudiante*/}</h3><br></br>
                        <p>
                            <b>NOMBRE DEL ESTUDIANTE: </b>{/*Aqui Quiero que ubiques el el nombre del studienate
                            ese dato lo obtendras del otro componente*/}
                        </p>
                        <p>
                            <b>TEMA DEL TRABAJO DE TITULACIÓN:</b>{/*<Aqui pon el tema de trabajo de titulacion*/}
                        </p>
                        <br></br>
                        <form onSubmit={handleSubmit}>
                            <p>
                                <b>FECHA :</b>
                                <input type='date' name='date' className='dateInput' defaultValue={currentDate} required />
                            </p>
                            <p>
                                <b>TITULO DEL INFORME:</b>
                                <input type='text' name='reportNumber' className='numInformeInput' required />
                            </p>
                            <br></br>
                            <p>
                                <b>PORCENTAJE DE AVANCE :</b>
                                <input type='number' name='progressPercentage' className='percentageInput' min={1} required />
                            </p>
                            <p><br></br>
                                <b>AUTORIZAR FIRMA :</b>
                                <input type='checkbox' name='authorizeSignature' className='checkboxInput' required />
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
