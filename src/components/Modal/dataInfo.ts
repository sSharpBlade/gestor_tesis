async function fetchData(idThesis: number): Promise<void> {
  try {
    const response = await fetch(
      `http://localhost:3000/thesis/report/${idThesis}`
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
      issue: item.issue,
      approvalDate: item.approvalDate,
      idThesis: item.idThesis,
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
