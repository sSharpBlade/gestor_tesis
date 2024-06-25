
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url='http://localhost:3000/assignStudent/register';

export const request = async(data:any):Promise<boolean>=>{
    const method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url, method);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message ||'Network response was not ok');

        }

        const result = await response.json();
        console.log('Success:', result);
        return true
    } catch (error) {
        if (error.message.includes('La cédula no es correcta')) {
            toast.error('La cédula proporcionada no es correcta');
        } else if (error.message.includes('estudiante ya existe')) {
            toast.error('El estudiante ya está registrado');
        } else {
            toast.error('Hubo un error al asignar el estudiante');
        }
        console.error('Error:', error);
        return false;
    }
}