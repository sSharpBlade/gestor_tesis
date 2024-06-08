import { ReportType } from "./reportType";

let datos: ReportType[] = [];

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
      signed: item.signedAt,
    }));
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    datos = [];
  }
}

export async function deleteReport(idReport: number): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/reports/${idReport}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    datos = datos.filter((report) => report.idReport !== idReport);
  } catch (error) {
    console.error("Error al eliminar el informe:", error);
  }
}

export function getDatosReport(): ReportType[] {
  return datos;
}

export { fetchDataReport };
