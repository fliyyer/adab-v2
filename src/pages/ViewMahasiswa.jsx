import React, { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  doc,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/useAuth';

const ViewMahasiswa = () => {
  useAuth();
  const [mahasiswa, setMahasiswa] = useState([]);
  const handleDelete = async (mahasiswaId) => {
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
        const mahasiswaRef = doc(db, 'users', mahasiswaId);
        await updateDoc(mahasiswaRef, {
          role: 'inactive',
        });

        setMahasiswa((mahasiswa) =>
          mahasiswa.filter((item) => item.id !== mahasiswaId)
        );
        await Swal.fire(
          'Terhapus!',
          'Data Mahasiswa telah dihapus.',
          'success'
        );
      }
    } catch (error) {
      await Swal.fire(
        'Error!',
        'Terjadi kesalahan saat menghapus data.',
        'error'
      );
      console.error('Error updating document: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mahasiswaQuery = query(
          collection(db, 'users'),
          where('nim', '!=', '')
        );
        const mahasiswaSnapshot = await getDocs(mahasiswaQuery);
        const formattedMahasiswa = mahasiswaSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMahasiswa(formattedMahasiswa);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full overflow-auto custom-scrollbar">
      <div className="bg-[#fff] rounded-lg h-screen px-4">
        <h2 className="text-xl font-semibold text-gray-800 md:text-center mb-6">
          Data Mahasiswa
        </h2>
        <table className="table-auto w-full">
          <thead className="bg-[#1B9AD7] text-white">
            <tr className="text-left">
              <th className="py-2 px-4 text-center">No</th>
              <th className="py-2 px-4">NIM</th>
              <th className="py-2 px-4">Nama</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-slate-50' : 'bg-slate-100'}>
                <td className="py-2 text-center px-4">{index + 1}</td>
                <td className="py-2 px-4">{data.nim}</td>
                <td className="py-2 px-4">
                  {data.firstName} {data.lastName}
                </td>
                <td className="py-2 px-4">{data.email}</td>
                <td className="py-2 px-4">{data.phone}</td>
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

export default ViewMahasiswa;
