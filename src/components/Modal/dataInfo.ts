import { ReportType } from "./reportType";

let datos: [];

async function fetchDataReport(cedula: string): Promise<void> {
  try {
    const response = await fetch(
      `http://localhost:3000/reports/student/${cedula}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    datos = responseData.map((item: any) => ({
      idReport: item.idReport,
      issue: item.title,
      date: item.date,
      percentage: item.percentage,
    }));
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    datos = [];
  }
}

export function getDatosReport(): ReportType[] {
  return datos;
}

export { fetchDataReport };
