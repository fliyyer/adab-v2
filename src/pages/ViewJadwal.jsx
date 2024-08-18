import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/useAuth';

const ViewJadwal = () => {
  useAuth();
  const [jadwal, setJadwal] = useState([]);
  const handleDelete = async (jadwalId) => {
    try {
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda tidak akan dapat mengembalikan ini!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
      });
      if (result.isConfirmed) {
        await deleteDoc(doc(db, 'Jadwal', jadwalId));
        setJadwal((jadwal) => jadwal.filter((item) => item.id !== jadwalId));
        await Swal.fire('Terhapus!', 'Data Anda telah dihapus.', 'success');
      }
    } catch (error) {
      await Swal.fire(
        'Error!',
        'Terjadi kesalahan saat menghapus data.',
        'error'
      );
      console.error('Error deleting document: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const jadwalData = await getDocs(collection(db, 'Jadwal'));
      const formattedJadwal = jadwalData.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });
      setJadwal(formattedJadwal);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full overflow-auto custom-scrollbar">
      <div className="bg-[#fff] rounded-lg h-screen px-4">
        <h2 className="text-xl font-semibold text-gray-800 md:text-center mb-6">
          Data Jadwal
        </h2>
        <table className="table-auto w-full">
          <thead className="bg-[#1B9AD7] text-white">
            <tr className="text-left">
              <th className="py-2 px-4 text-center">No</th>
              <th className="py-2 px-4">Matakuliah</th>
              <th className="py-2 px-4">Dosen</th>
              <th className="py-2 px-4">Kode Kelas</th>
              <th className="py-2 px-4">Tanggal</th>
              <th className="py-2 px-4">Sesi</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jadwal.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-slate-50' : 'bg-slate-100'}>
                <td className="py-2 text-center px-4">{index + 1}</td>
                <td className="py-2 px-4">{data.matakuliah?.label}</td>
                <td className="py-2 px-4">{data.dosen?.label}</td>
                <td className="py-2 px-4">{data.kodeKelas}</td>
                <td className="py-2 px-4">{data.tanggal?.toDate().toLocaleDateString()}</td>
                <td className="py-2 px-4">{data.sesi?.label}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="text-red-500 flex items-center gap-2 hover:text-red-700">
                    <FaTrash /> <p>Hapus</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewJadwal;
