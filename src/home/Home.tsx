import React, { useEffect, useState } from "react";
import { getDatos, fetchData } from "./data";
import ListStudents from "./ListStudents";
import SearchStudents from "./SearchStudents";
import { DataType } from "./types";
import Menu from "./Menu";

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [datos, setDatos] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData().then(() => {
      setDatos(getDatos());
    });
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = datos.filter(
    (item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-stone-300">
      <div className="flex justify-between p-4">
        <Menu />
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
