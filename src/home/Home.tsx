import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';

import { getDatos, fetchData } from "./data";
import ListStudents from "./ListStudents";
import SearchStudents from "./SearchStudents";
import { DataType } from "./types";
import Menu from "./Menu";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [datos, setDatos] = useState<DataType[]>([]);
  const [reload, setReload] = useState<boolean>(false); // Estado para manejar la recarga
  const location = useLocation();
  const teacherId = location.state?.userId || null;
  const showSuccessMessage = () => {
    toast.success('Estudiante asignado con éxito!');
    handleDataChange()
  };
  useEffect(() => {
    if (teacherId) {
      fetchData(teacherId).then(() => {
        setDatos(getDatos());
      });
    }
  }, [teacherId, reload]); // Añadido reload como dependencia

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
  const [datos, setDatos] = useState<DataType[]>([]);
  const teacherID = localStorage.getItem('teacherID');

  useEffect(() => {
    if (!teacherID) {
      navigate('/login'); // Redirige al usuario al login si no hay teacherID en localStorage
      return;
    }

    fetchData(Number(teacherID)).then(() => {
      setDatos(getDatos());
    });
  }, [teacherID, navigate]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleDataChange = () => {
    setReload(!reload); 

  };

  const filteredData = datos.filter(
    (item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-stone-300">
      <div className="flex justify-between p-4">

        <Menu onDataChange={showSuccessMessage}  />

      </div>
      <div className="flex justify-center items-center flex-grow">
        <div className="w-2/3 min-h-[809px]">
          <SearchStudents onSearch={handleSearch} />
          <ListStudents data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
