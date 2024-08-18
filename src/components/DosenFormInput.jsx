import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';

const DosenFormInput = ({ onMataKuliahSubmit }) => {
    const [kodeDosen, setKodeDosen] = useState('');
    const [namaDosen, setNamaDosen] = useState('');
    const [nomorTelepon, setNomorTelepon] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!kodeDosen || !namaDosen || !nomorTelepon || !email) {
            setErrorMessage('Semua field harus diisi.');
            return;
        }
        const mataKuliahData = {
            kodeDosen,
            namaDosen,
            nomorTelepon,
            email,
        };

        try {
            const docRef = await addDoc(collection(db, 'Dosen'), mataKuliahData);
            onMataKuliahSubmit(mataKuliahData);
            setKodeDosen('');
            setNamaDosen('');
            setNomorTelepon('');
            setEmail('');
            setErrorMessage('');

            await Swal.fire({
                title: 'Sukses!',
                text: 'Data Dosen berhasil ditambahkan.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            await Swal.fire({
                title: 'Error!',
                text: 'Terjadi kesalahan saat menambahkan data.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Error adding document: ', error);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="bg-white p-3 md:p-6 rounded-lg shadow-md">
            <h2 className="text-xl mb-4 font-semibold text-[#fff] text-center bg-[#1B9AD7] py-2">Tambah Data Dosen</h2>
            {errorMessage && (
                <div className="text-red-600 mb-4">{errorMessage}</div>
            )}
            <div className="grid md:grid-cols-2 item gap-4">
                <div className="mb-4 flex flex-col items-start">
                    <label htmlFor="kodeDosen" className="block text-md font-semibold text-gray-600">
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
                <div className="mb-4 flex flex-col items-start ">
                    <label htmlFor="namaDosen" className="block text-sm font-semibold text-gray-600">
                        Nama Dosen
                    </label>
                    <input
                        type="text"
                        id="namaDosen"
                        className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="ex.. Alvina Aulia"
                        value={namaDosen ?? ''}
                        onChange={(e) => setNamaDosen(e.target.value)}
                    />
                </div>
                <div className="mb-4 flex flex-col items-start">
                    <label htmlFor="nomorTelepon" className="block text-sm font-semibold text-gray-600">
                        Nomor Telepon
                    </label>
                    <input
                        type="text"
                        id="nomorTelepon"
                        className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="ex.. 0000-0000-0000"
                        value={nomorTelepon ?? ''}
                        onChange={(e) => setNomorTelepon(e.target.value)}
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
                        placeholder="ex.. @binus.ac.id"
                        value={email ?? ''}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-[#E48118] text-[#eaeaea] py-2 px-4 rounded hover:bg-[#a97339] hover:text-[#ffffff] mt-4"
            >
                Tambah Data Dosen
            </button>
        </form>
    );
};

export default DosenFormInput;
