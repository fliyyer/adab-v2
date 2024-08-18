import React, { useState } from 'react';
import MahasiswaFormInput from '../components/MahasiswaFormInput';
import MahasiswaFormFile from '../components/MahasiswaFormFile';
import { useAuth } from '../hooks/useAuth';

const AddMahasiswa = () => {
  useAuth();
  const [mahasiswa, setMahasiswa] = useState([]);
  const handleMahasiswaSubmit = (mahasiswaData) => {
    setMahasiswa([...mahasiswa, mahasiswaData]);
  };

  const handleFileUpload = (file) => {
    console.log('File uploaded:', file);
  };
  return (
    <div className="flex flex-col overflow-auto custom-scrollbar h-full">
      <MahasiswaFormInput onMahasiswaSubmit={handleMahasiswaSubmit} />
      <MahasiswaFormFile onFileUpload={handleFileUpload} />
    </div>
  );
};

export default AddMahasiswa;
