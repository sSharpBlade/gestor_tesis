import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StudentForm.module.css';
import { request } from './Student.request';

interface StudentFormProps {
    handleClose: () => void;
    Teacher:number;
}

interface FormData {
    cedula: string;
    firstname: string;
    lastname: string;
    idCareer: string;
    issue: string;
    approvalDate: string;
}

const StudentForm: React.FC<StudentFormProps> = ({Teacher, handleClose }) => {
    const { register, formState: { errors }, handleSubmit, setValue } = useForm<FormData>();

    const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
        const formattedData = {
            student: {
                cedula: data.cedula,
                firstname: data.firstname,
                lastname: data.lastname,
                idCareer: parseInt(data.idCareer), // Convertir a número entero
                idTeacher: Teacher // Asignar un valor predeterminado para idTeacher
            },
            thesis: {
                issue: data.issue,
                approvalDate: data.approvalDate
            }
        };
        await request(formattedData);
        handleClose(); // Cerrar el modal después de enviar el formulario
    };

    const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) {
            setValue(e.target.name as keyof FormData, newValue);
        } else {
            setValue(e.target.name as keyof FormData, newValue.slice(0, -1));
        }
        if (newValue.length === 11) {
            setValue(e.target.name as keyof FormData, newValue.slice(0, -1));
        }
    };

    useEffect(() => {
        if (errors.cedula) {
            if (errors.cedula.type === 'required') {
                toast.error('Cedula es un campo requerido');
            } else if (errors.cedula.type === 'minLength') {
                toast.error('Cedula requiere una longitud mínima de 10 caracteres');
            }
        }
    }, [errors.cedula]);

    useEffect(() => {
        if (errors.firstname && errors.firstname.type === 'required') {
            toast.error('Nombre es un campo requerido');
        }
    }, [errors.firstname]);

    useEffect(() => {
        if (errors.lastname && errors.lastname.type === 'required') {
            toast.error('Apellido es un campo requerido');
        }
    }, [errors.lastname]);

    useEffect(() => {
        if (errors.issue && errors.issue.type === 'required') {
            toast.error('Tema es un campo requerido');
        }
    }, [errors.issue]);

    return (
        <>
            <div className='container'>
                <ToastContainer />
                <h1>Asignar Estudiante</h1>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div>
                        <label>Cedula</label>
                        <input type="text"  {...register('cedula', {
                            required: true,
                            minLength: 10,
                            onChange: handleNumericInputChange
                        })} />
                    </div>
                    <div>
                        <label>Nombre</label>
                        <input type="text" {...register('firstname', {
                            required: true
                        })} />
                    </div>
                    <div>
                        <label>Apellido</label>
                        <input type="text" {...register('lastname', {
                            required: true
                        })} />
                    </div>
                    <div>
                        <label>Carrera</label>
                        <select {...register('idCareer')}>
                            <option value="1">Software</option>
                            <option value="2">Industrial</option>
                            <option value="3">Telecomunicaciones</option>
                            <option value="4">Tegnologías de la Comunicación</option>
                            <option value="5">Automatización y Robótica</option>
                        </select>
                    </div>
                    <div>
                        <label>Tema</label>
                        <input type="text" {...register('issue', {
                            required: true
                        })} />
                    </div>
                    <div>
                        <label>Fecha Aprobado</label>
                        <input type="date" {...register('approvalDate')} />
                    </div>
                    <input type="submit" value="Asignar" />
                </form>
            </div>
        </>
    );
};

export default StudentForm;
