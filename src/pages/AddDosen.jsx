import React, { useState } from 'react'
import DosenFormInput from '../components/DosenFormInput'
import DosenFormFile from '../components/DosenFormFile';
import { useAuth } from '../hooks/useAuth';

const AddDosen = () => {
  useAuth();
  const [mataKuliah, setMataKuliah] = useState([]);
  const handleMataKuliahSubmit = (mataKuliahData) => {
    setMataKuliah([...mataKuliah, mataKuliahData]);
  };

  const handleFileUpload = (file) => {
    console.log("File uploaded:", file);
  };

  return (
    <div className="flex flex-col custom-scrollbar overflow-auto h-full">
      <DosenFormInput onMataKuliahSubmit={handleMataKuliahSubmit} />
      <DosenFormFile onFileUpload={handleFileUpload} />
    </div>
  )
}

export default AddDosen