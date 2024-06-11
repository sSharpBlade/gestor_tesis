// src/reportService.ts

import { Inform } from './informTypes';

export const createReport = async (formData: Inform): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3000/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const result = await response.json();
    console.log('Reporte creado exitosamente:', result);
    alert('Reporte creado exitosamente');
  } catch (error) {
    console.error('Error al crear el reporte:', error);
    alert('Hubo un error al crear el reporte. Inténtalo nuevamente.');
  }
};
