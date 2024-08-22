import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import Select from 'react-select';

const MahasiswaFormInput = ({ onMahasiswaSubmit }) => {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [mahasiswaOptions, setMahasiswaOptions] = useState([]);

  useEffect(() => {
    const fetchMahasiswaData = async () => {
      const mahasiswaSnapshot = await getDocs(collection(db, 'users'));
      const mahasiswaList = mahasiswaSnapshot.docs.map((doc) => ({
        nama: `${doc.data().firstName} ${doc.data().lastName}`,
        email: doc.data().email,
        phone: doc.data().phone,
      }));
      setMahasiswaOptions(mahasiswaList);
    };

    fetchMahasiswaData();
  }, []);

  const handleNamaChange = (selectedOption) => {
    setNama(selectedOption);
    const correspondingMahasiswa = mahasiswaOptions.find(
      (mhs) => `${mhs.nama}` === selectedOption.value
    );
    if (correspondingMahasiswa) {
      setEmail({
        value: correspondingMahasiswa.email,
        label: correspondingMahasiswa.email,
      });
      setPhone(correspondingMahasiswa.phone || '');
    }
  };

  const handleEmailChange = (selectedOption) => {
    setEmail(selectedOption);
    const selectedMahasiswa = mahasiswaOptions.find(
      (mhs) => mhs.email === selectedOption.value
    );
    if (selectedMahasiswa) {
      setNama({
        value: selectedMahasiswa.nama,
        label: selectedMahasiswa.nama,
      });
      setPhone(selectedMahasiswa.phone || '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nim || !nama || !email || !phone) {
      setErrorMessage('Semua field harus diisi.');
      return;
    }

    const mahasiswaData = {
      nim,
      firstName: nama.value.split(' ')[0],
      lastName: nama.value.split(' ').slice(1).join(' '),
      email: email.value,
      phone,
      role: 'mahasiswa',
    };

    try {
      const userRef = collection(db, 'users');
      const querySnapshot = await getDocs(userRef);
      const userDoc = querySnapshot.docs.find(
        (doc) => doc.data().email === email.value
      );

      if (userDoc) {
        await updateDoc(userDoc.ref, mahasiswaData);
        await Swal.fire({
          title: 'Sukses!',
          text: 'Data Mahasiswa berhasil diperbarui.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        await addDoc(userRef, mahasiswaData);
        await Swal.fire({
          title: 'Sukses!',
          text: 'Data Mahasiswa berhasil ditambahkan.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }

      onMahasiswaSubmit(mahasiswaData);
      setNim('');
      setNama(null);
      setEmail(null);
      setPhone('');
      setErrorMessage('');
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat memproses data.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Error processing document: ', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 md:p-6 rounded-lg shadow-md">
      <h2 className="text-xl mb-4 font-semibold text-[#fff] text-center rounded-md bg-[#1B9AD7] py-2">
        Tambah Data Mahasiswa
      </h2>
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      <div className="grid md:grid-cols-1 gap-4">
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="nim"
            className="block text-md font-semibold text-gray-600">
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
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="nama"
            className="block text-sm font-semibold text-gray-600">
            Nama
          </label>
          <Select
            id="nama"
            options={mahasiswaOptions.map((mhs) => ({
              value: mhs.nama,
              label: mhs.nama,
            }))}
            value={nama}
            onChange={handleNamaChange}
            placeholder="Pilih nama"
            className="w-full"
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-600">
            Email
          </label>
          <Select
            id="email"
            options={mahasiswaOptions.map((mhs) => ({
              value: mhs.email,
              label: mhs.email,
            }))}
            value={email}
            onChange={handleEmailChange}
            placeholder="Pilih email"
            className="w-full"
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-600">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ex. 0893 1122 3342"
            value={phone ?? ''}
            onChange={(e) => setPhone(e.target.value)}
          />
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

export default MahasiswaFormInput;
