import React, { useState, useEffect } from 'react';
import JadwalFormInput from '../components/JadwalFormInput';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';

const AddJadwal = () => {
  useAuth();
  const [listMatakuliah, setListMatakuliah] = useState([]);
  const [listDosen, setListDosen] = useState([]);
  const [jadwal, setJadwal] = useState([])

  const handleJadwalSubmit = (jadwalData) => {
    setJadwal([...jadwal, jadwalData]);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matakuliahData = await getDocs(collection(db, 'mataKuliah'));
        const formattedMatakuliah = matakuliahData.docs.map((doc) => ({
          value: doc.id,
          label: doc.data().nama,
        }));
        setListMatakuliah(formattedMatakuliah);
        const dosenData = await getDocs(collection(db, 'Dosen'));
        const formattedDosen = dosenData.docs.map((doc) => ({
          value: doc.id,
          label: doc.data().namaDosen,
        }));
        setListDosen(formattedDosen);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col overflow-auto custom-scrollbar h-full">
      <JadwalFormInput listMatakuliah={listMatakuliah} listDosen={listDosen} onJadwalSubmit={handleJadwalSubmit} />
    </div>
  );
};

export default AddJadwal;
