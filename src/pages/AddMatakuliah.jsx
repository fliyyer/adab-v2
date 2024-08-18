import React, { useState } from 'react';
import MatkulFormInput from '../components/MatkulFormInput';
import MatkulFormFile from '../components/MatkulFormFile';
import { useAuth } from '../hooks/useAuth';

const AddMatakuliah = () => {
  useAuth();
  const [mataKuliah, setMataKuliah] = useState([]);
  const handleMataKuliahSubmit = (mataKuliahData) => {
    setMataKuliah([...mataKuliah, mataKuliahData]);
  };

  const handleFileUpload = (file) => {
    console.log('File uploaded:', file);
  };

  return (
    <div className="flex flex-col h-full overflow-auto custom-scrollbar">
      <MatkulFormInput onMataKuliahSubmit={handleMataKuliahSubmit} />
      <MatkulFormFile onFileUpload={handleFileUpload} />
    </div>
  );
};

export default AddMatakuliah;
