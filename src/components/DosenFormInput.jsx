import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { addDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import Select from 'react-select';

const DosenFormInput = ({ onMataKuliahSubmit }) => {
  const [kodeDosen, setKodeDosen] = useState('');
  const [namaDosen, setNamaDosen] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dosenOptions, setDosenOptions] = useState([]);

  useEffect(() => {
    const fetchDosenData = async () => {
      const dosenSnapshot = await getDocs(collection(db, 'users'));
      const dosenList = dosenSnapshot.docs.map((doc) => ({
        namaDosen: `${doc.data().firstName} ${doc.data().lastName}`,
        email: doc.data().email,
        phone: doc.data().phone,
      }));
      setDosenOptions(dosenList);
    };

    fetchDosenData();
  }, []);

  const handleNamaDosenChange = (selectedOption) => {
    setNamaDosen(selectedOption);
    const correspondingDosen = dosenOptions.find(
      (dosen) => dosen.namaDosen === selectedOption.value
    );
    if (correspondingDosen) {
      setEmail({
        value: correspondingDosen.email,
        label: correspondingDosen.email,
      });
      setPhone(correspondingDosen.phone || '');
    }
  };

  const handleEmailChange = (selectedOption) => {
    setEmail(selectedOption);
    const correspondingDosen = dosenOptions.find(
      (dosen) => dosen.email === selectedOption.value
    );
    if (correspondingDosen) {
      setNamaDosen({
        value: correspondingDosen.namaDosen,
        label: correspondingDosen.namaDosen,
      });
      setPhone(correspondingDosen.phone || '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kodeDosen || !namaDosen || !phone || !email) {
      setErrorMessage('Semua field harus diisi.');
      return;
    }

    const userData = {
      kodeDosen,
      firstName: namaDosen.label.split(' ')[0],
      lastName: namaDosen.label.split(' ').slice(1).join(' '),
      phone,
      email: email.value,
      role: 'dosen',
    };

    try {
      const userRef = collection(db, 'users');
      const querySnapshot = await getDocs(userRef);
      const userDoc = querySnapshot.docs.find(
        (doc) => doc.data().email === email.value
      );

      if (userDoc) {
        await updateDoc(userDoc.ref, userData);
      } else {
        await addDoc(userRef, userData);
      }

      onMataKuliahSubmit(userData);
      setKodeDosen('');
      setNamaDosen(null);
      setPhone('');
      setEmail(null);
      setErrorMessage('');

      await Swal.fire({
        title: 'Sukses!',
        text: 'Data dosen berhasil ditambahkan.',
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
      <h2 className="text-xl mb-4 font-semibold text-[#fff] text-center bg-[#1B9AD7] py-2">
        Tambah Data Dosen
      </h2>
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      <div className="grid md:grid-cols-2 item gap-4">
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="kodeDosen"
            className="block text-md font-semibold text-gray-600">
            Kode Dosen
          </label>
          <input
            type="text"
            id="kodeDosen"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ex.. D0123"
            value={kodeDosen ?? ''}
            onChange={(e) => setKodeDosen(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="namaDosen"
            className="block text-sm font-semibold text-gray-600">
            Nama Dosen
          </label>
          <Select
            id="namaDosen"
            options={dosenOptions.map((dosen) => ({
              value: dosen.namaDosen,
              label: dosen.namaDosen,
            }))}
            value={namaDosen}
            onChange={handleNamaDosenChange}
            placeholder="Pilih nama dosen"
            className="w-full"
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-600">
            Email Dosen
          </label>
          <Select
            id="email"
            options={dosenOptions.map((dosen) => ({
              value: dosen.email,
              label: dosen.email,
            }))}
            value={email}
            onChange={handleEmailChange}
            placeholder="Pilih email dosen"
            className="w-full"
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-600">
            Nomor Telepon
          </label>
          <input
            type="text"
            id="phone"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ex.. 0000-0000-0000"
            value={phone ?? ''}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#E48118] text-[#eaeaea] py-2 px-4 rounded hover:bg-[#a97339] hover:text-[#ffffff] mt-4">
        Tambah Data Dosen
      </button>
    </form>
  );
};

export default DosenFormInput;
