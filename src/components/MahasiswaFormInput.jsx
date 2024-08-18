import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';

const MahasiswaFormInput = ({ onMahasiswaSubmit }) => {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nim || !nama || !email || !phone) {
      setErrorMessage('Semua field harus diisi.');
      return;
    }
    const mahasiswaData = {
      NIM: nim,
      Nama: nama,
      Email: email,
      Phone: phone,
    };

    try {
      const docRef = await addDoc(collection(db, 'Mahasiswa'), mahasiswaData);
      onMahasiswaSubmit(mahasiswaData);
      setNim('');
      setNama('');
      setEmail('');
      setPhone('');
      setErrorMessage('');

      await Swal.fire({
        title: 'Sukses!',
        text: 'Data Mahasiswa berhasil ditambahkan.',
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
      className="bg-white p-3 md:p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl mb-4 font-semibold text-[#fff] text-center rounded-md bg-[#1B9AD7] py-2">
        Tambah Data Mahasiswa
      </h2>
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      <div className="grid md:grid-cols-1 item gap-4">
        <div className="mb-4 flex flex-col items-start">
          <label htmlFor="nim" className="block text-md font-semibold text-gray-600">
            NIM
          </label>
          <input
            type="text"
            id="nim"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ex. 123456"
            value={nim ?? ''}
            onChange={(e) => setNim(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col items-start ">
          <label htmlFor="nama" className="block text-sm font-semibold text-gray-600">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ex. John Doe"
            value={nama ?? ''}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ex. john.doe@example.com"
            value={email ?? ''}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-600">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ex. 123-456-7890"
            value={phone ?? ''}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#E48118] text-[#eaeaea] py-2 px-4 rounded hover:bg-[#a97339] hover:text-[#ffffff] mt-4"
      >
        Simpan
      </button>
    </form>
  );
};

export default MahasiswaFormInput;
