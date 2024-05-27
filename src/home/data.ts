import { DataType } from "./types";

let datos: DataType[] = [];

async function fetchData(idTeacher: number): Promise<void> {
  try {
    const response = await fetch(
      `http://localhost:3000/thesis/teacher/${idTeacher}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    datos = responseData.map((item: any) => ({
      id: item.student.cedula,
      name: `${item.student.lastname} ${item.student.firstname}`,
      career: item.student.career.name,
      state: item.state,
      percentage: item.finalstate,
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
