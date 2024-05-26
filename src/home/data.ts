import { DataType } from "./types";

let datos: DataType[] = [];

async function fetchData(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/students/");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    datos = responseData.map((item: DataType) => ({
      id: item.id,
      name: item.name,
      career: item.career,
      state: item.state,
      percentage: item.percentage,
    }));
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    datos = [];
  }
}

export function getDatos(): DataType[] {
  return datos;
}

export { fetchData };
