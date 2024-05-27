import React from "react";
import { Input } from "antd";

const { Search } = Input;

interface SearchStudentsProps {
  onSearch: (value: string) => void;
}

const SearchStudents: React.FC<SearchStudentsProps> = ({ onSearch }) => {
  return (
    <Search
      placeholder="Buscar por nombre o clave"
      onChange={(e) => onSearch(e.target.value)}
      style={{ marginBottom: 8 }}
    />
  );
};

export default SearchStudents;
