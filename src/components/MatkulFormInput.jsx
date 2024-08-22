import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import { Input } from 'antd';
const MatkulFormInput = ({ onMataKuliahSubmit }) => {
  const [kodeKelas, setKodeKelas] = useState('');
  const [kodeMataKuliah, setKodeMataKuliah] = useState('');
  const [nama, setNama] = useState('');
  const [sks, setSks] = useState('');
  const [shift, setShift] = useState('');
  const [semester, setSemester] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kodeKelas || !kodeMataKuliah || !nama || !sks || !shift || !semester) {
      setErrorMessage('Semua field harus diisi.');
      return;
    }
    const mataKuliahData = {
      kodeKelas,
      kodeMataKuliah,
      nama,
      sks,
      shift,
      semester,
    };

    try {
      const docRef = await addDoc(collection(db, 'mataKuliah'), mataKuliahData);
      onMataKuliahSubmit(mataKuliahData);
      setKodeKelas('');
      setKodeMataKuliah('');
      setNama('');
      setSks('');
      setShift('');
      setSemester('');
      setErrorMessage('');

      await Swal.fire({
        title: 'Sukses!',
        text: 'Data Mata Kuliah berhasil ditambahkan.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat menambahkan data.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 md:p-6 rounded-lg shadow-md">
      <h2 className="text-lg mb-4 font-semibold text-[#fff] text-center rounded-md bg-[#1B9AD7] py-2">
        Tambah Mata Kuliah
      </h2>
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      <div className="grid md:grid-cols-2 item gap-4">
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="kodeKelas"
            className="block text-md font-semibold text-gray-600">
            Kode Kelas
          </label>
          <input
            type="text"
            id="kodeKelas"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ex .. LN01"
            value={kodeKelas ?? ''}
            onChange={(e) => setKodeKelas(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col items-start ">
          <label
            htmlFor="kodeMataKuliah"
            className="block text-sm font-semibold text-gray-600">
            Kode Mata Kuliah
          </label>
          <input
            type="text"
            id="kodeMataKuliah"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ex.. COMP12345"
            value={kodeMataKuliah ?? ''}
            onChange={(e) => setKodeMataKuliah(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="nama"
            className="block text-sm font-semibold text-gray-600">
            Nama Mata Kuliah
          </label>
          <input
            type="text"
            id="nama"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ex.. Web Programming"
            value={nama ?? ''}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="sks"
            className="block text-sm font-semibold text-gray-600">
            SKS
          </label>
          <input
            type="number"
            id="sks"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ex.. 2"
            value={sks ?? ''}
            onChange={(e) => setSks(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="semester"
            className="block text-md font-semibold text-gray-600">
            Semester
          </label>
          <select
            id="semester"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={semester ?? ''}
            onChange={(e) => setSemester(e.target.value)}>
            <option value="">Pilih Semester</option>
            <option value="Ganjil 2023/2024">Ganjil 2023/2024</option>
            <option value="Genap 2023/2024">Genap 2023/2024</option>
          </select>
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="shift"
            className="block text-sm font-semibold text-gray-600">
            Shift
          </label>
          <select
            id="shift"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={shift ?? ''}
            onChange={(e) => setShift(e.target.value)}>
            <option value="">Pilih Shift</option>
            <option value="07.20 - 09.00">07.20 - 09.00</option>
            <option value="09.20 - 11.00">09.20 - 11.00</option>
            <option value="11.20 - 13.00">11.20 - 13.00</option>
            <option value="13.20 - 15.00">13.20 - 15.00</option>
            <option value="15.20 - 17.00">15.20 - 17.00</option>
            <option value="17.20 - 19.00">17.20 - 19.00</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#E48118] text-[#eaeaea] py-2 px-4 rounded hover:bg-[#a97339] hover:text-[#ffffff] mt-4">
        Simpan
      </button>
    </form>
  );
};

export default MatkulFormInput;
