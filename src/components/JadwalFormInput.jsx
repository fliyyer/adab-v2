import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';

const JadwalFormInput = ({ onJadwalSubmit, listMatakuliah, listDosen }) => {
    const [matakuliah, setMatakuliah] = useState('');
    const [dosen, setDosen] = useState('');
    const [kodeKelas, setKodeKelas] = useState('');
    const [tanggal, setTanggal] = useState(new Date());
    const [sesi, setSesi] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleJadwalSubmit = async (jadwalData) => {
        try {
            const docRef = await addDoc(collection(db, 'Jadwal'), jadwalData);
            onJadwalSubmit(jadwalData);

            await Swal.fire({
                title: 'Sukses!',
                text: 'Data Jadwal berhasil ditambahkan.',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!matakuliah || !dosen || !kodeKelas || !tanggal || !sesi) {
            setErrorMessage('Semua field harus diisi.');
            return;
        }

        const jadwalData = {
            matakuliah,
            dosen,
            kodeKelas,
            tanggal,
            sesi,
        };

        handleJadwalSubmit(jadwalData);
        setMatakuliah('');
        setDosen('');
        setKodeKelas('');
        setTanggal(new Date());
        setSesi('');
    };

    const optionsSesi = [
        { value: '07.20 - 09.00', label: '07.20 - 09.00' },
        { value: '09.20 - 11.00', label: '09.20 - 11.00' },
        { value: '11.20 - 13.00', label: '11.20 - 13.00' },
        { value: '13.20 - 15.00', label: '13.20 - 15.00' },
        { value: '15.20 - 17.00', label: '15.20 - 17.00' },
        { value: '17.20 - 19.00', label: '17.20 - 19.00' },
    ];


    return (
        <form onSubmit={handleSubmit} className="bg-white p-3 md:p-6 rounded-lg shadow-md">
            <h2 className="text-xl mb-4 font-semibold text-[#fff] text-center bg-[#1B9AD7] py-2">Tambah Data Jadwal</h2>
            <div className="grid md:grid-cols-1 item gap-4">
                <div className="flex flex-col">
                    <label htmlFor="matakuliah" className="block text-md font-semibold text-gray-600">
                        Matakuliah
                    </label>
                    <Select
                        placeholder="Pilih Matakuliah..."
                        id="matakuliah"
                        options={listMatakuliah}
                        value={matakuliah}
                        onChange={(selectedOption) => setMatakuliah(selectedOption)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="dosen" className="block text-sm font-semibold text-gray-600">
                        Dosen
                    </label>
                    <Select
                        placeholder="Pilih Dosen..."
                        id="dosen"
                        options={listDosen}
                        value={dosen}
                        onChange={(selectedOption) => setDosen(selectedOption)}
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label htmlFor="kodeKelas" className="block text-sm font-semibold text-gray-600">
                        Kode Kelas
                    </label>
                    <input
                        type="text"
                        id="kodeKelas"
                        className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="ex.. A1"
                        value={kodeKelas ?? ''}
                        onChange={(e) => setKodeKelas(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="tanggal" className="block text-sm font-semibold text-gray-600">
                        Tanggal
                    </label>
                    <DatePicker
                        id="tanggal"
                        selected={tanggal}
                        onChange={(date) => setTanggal(date)}
                        dateFormat="dd/MM/yyyy"
                        className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="sesi" className="block text-sm font-semibold text-gray-600">
                        Sesi
                    </label>
                    <Select
                        placeholder="Pilih Sesi..."
                        id="sesi"
                        options={optionsSesi}
                        value={sesi}
                        onChange={(selectedOption) => setSesi(selectedOption)}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-[#E48118] text-[#eaeaea] py-2 px-4 rounded hover:bg-[#a97339] hover:text-[#ffffff] mt-4"
            >
                Tambah Data Jadwal
            </button>
        </form>
    );
};

export default JadwalFormInput;
