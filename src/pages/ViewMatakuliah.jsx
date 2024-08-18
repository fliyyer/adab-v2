import React, { useEffect, useState } from "react";
import FormInput from "../components/MatkulFormInput";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import FormFile from "../components/MatkulFormFile";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";

const ViewMatakuliah = () => {
    useAuth();
    const [mataKuliah, setMataKuliah] = useState([]);
    const handleDelete = async (mataKuliahId) => {
        try {
            const result = await Swal.fire({
                title: "Apakah Anda yakin?",
                text: "Anda tidak akan dapat mengembalikan ini!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Ya, hapus!",
                cancelButtonText: "Batal",
            });
            if (result.isConfirmed) {
                await deleteDoc(doc(db, "mataKuliah", mataKuliahId));
                setMataKuliah((mataKuliah) =>
                    mataKuliah.filter((item) => item.id !== mataKuliahId)
                );
                await Swal.fire("Terhapus!", "Data Anda telah dihapus.", "success");
            }
        } catch (error) {
            await Swal.fire(
                "Error!",
                "Terjadi kesalahan saat menghapus data.",
                "error"
            );
            console.error("Error deleting document: ", error);
        }
    };

    const handleFileUpload = (file) => {
        console.log("File uploaded:", file);
    };

    useEffect(() => {
        const fetchData = async () => {
            const mataKuliahData = await getDocs(collection(db, "mataKuliah"));
            const formattedMataKuliah = mataKuliahData.docs.map((doc) => {
                const data = doc.data();
                return { ...data, id: doc.id };
            });
            setMataKuliah(formattedMataKuliah);
        };
        fetchData();
    }, []);
    return (
        <div className="flex flex-col h-full overflow-auto custom-scrollbar">
            <div className="mt-4 bg-[#fff] shadow-lg rounded-lg h-screen px-4">
                <h2 className="text-xl font-semibold text-gray-800 md:text-center mb-6">
                    Jadwal Mata Kuliah
                </h2>
                <table className="table-auto w-full">
                    <thead className="bg-[#1B9AD7] text-white">
                        <tr className="text-left">
                            <th className="py-2 px-4">No</th>
                            <th className="py-2 px-4">Kode Kelas</th>
                            <th className="py-2 px-4">Kode Mata Kuliah</th>
                            <th className="py-2 px-4">Nama Mata Kuliah</th>
                            <th className="py-2 px-4">SKS</th>
                            <th className="py-2 px-4">Tanggal</th>
                            <th className="py-2 px-4">Shift</th>
                            <th className="py-2 px-4">Semester</th>
                            <th className="py-2 px-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mataKuliah.map((data, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-slate-50" : "bg-slate-100"}
                            >
                                <td className="py-2 text-center px-4">{index + 1}</td>
                                <td className="py-2 px-4">{data.kodeKelas}</td>
                                <td className="py-2 px-4">{data.kodeMataKuliah}</td>
                                <td className="py-2 px-4">{data.nama}</td>
                                <td className="py-2 text-center px-4">{data.sks}</td>
                                <td className="py-2 px-4">{data.tanggal}</td>
                                <td className="py-2 px-4">{data.shift}</td>
                                <td className="py-2 px-4">{data.semester}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleDelete(data.id)}
                                        className="text-red-500 flex items-center gap-2 hover:text-red-700"
                                    >
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

export default ViewMatakuliah;
