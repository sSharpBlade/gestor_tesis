
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
            throw new Error('Network response was not ok');

        }

        const result = await response.json();
        toast.success('Estudiante asignado con éxito!');
        console.log('Success:', result);
        return true
    } catch (error) {
        toast.error('Hubo un error al asignar el estudiante');
        console.error('Error:', error);
        return false
    }
}