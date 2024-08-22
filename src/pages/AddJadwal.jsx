import React, { useState, useEffect } from 'react';
import JadwalFormInput from '../components/JadwalFormInput';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';

const AddJadwal = () => {
  useAuth();
  const [listMatakuliah, setListMatakuliah] = useState([]);
  const [listDosen, setListDosen] = useState([]);
  const [jadwal, setJadwal] = useState([]);

  const handleJadwalSubmit = (jadwalData) => {
    setJadwal([...jadwal, jadwalData]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matakuliahSnapshot = await getDocs(collection(db, 'mataKuliah'));
        const formattedMatakuliah = matakuliahSnapshot.docs.map((doc) => ({
          value: doc.id,
          label: doc.data().nama,
          shifts: doc.data().shift || doc.data().shifts,
        }));
        setListMatakuliah(formattedMatakuliah);

        const dosenQuery = query(
          collection(db, 'users'),
          where('role', '==', 'dosen')
        );
        const dosenSnapshot = await getDocs(dosenQuery);
        const formattedDosen = dosenSnapshot.docs.map((doc) => ({
          value: doc.id,
          label: doc.data().firstName + ' ' + doc.data().lastName,
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
      <JadwalFormInput
        listMatakuliah={listMatakuliah}
        listDosen={listDosen}
        onJadwalSubmit={handleJadwalSubmit}
      />
    </div>
  );
};

export default AddJadwal;
