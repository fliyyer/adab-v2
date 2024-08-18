import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";

const ViewDosen = () => {
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
                await deleteDoc(doc(db, "Dosen", mataKuliahId));
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


    useEffect(() => {
        const fetchData = async () => {
            const mataKuliahData = await getDocs(collection(db, "Dosen"));
            const formattedMataKuliah = mataKuliahData.docs.map((doc) => {
                const data = doc.data();
                return { ...data, id: doc.id };
            });
            setMataKuliah(formattedMataKuliah);
        };
        fetchData();
    }, []);
    return (
        <div className="flex flex-col overflow-auto custom-scrollbar h-full">
            <div className="mt-4 bg-[#fff] shadow-lg rounded-lg h-screen px-4">
                <h2 className="text-xl font-semibold text-gray-800 md:text-center mb-6">
                    Data Dosen
                </h2>
                <table className="table-auto w-full">
                    <thead className="bg-[#1B9AD7] text-white">
                        <tr className="text-left">
                            <th className="py-2 px-4 text-center">No</th>
                            <th className="py-2 px-4">Kode Dosen</th>
                            <th className="py-2 px-4">Nama Dosen</th>
                            <th className="py-2 px-4">Nomor Telepon</th>
                            <th className="py-2 px-4 text-center">Email</th>
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
                                <td className="py-2 px-4">{data.kodeDosen}</td>
                                <td className="py-2 px-4">{data.namaDosen}</td>
                                <td className="py-2 px-4">{data.nomorTelepon}</td>
                                <td className="py-2 text-center px-4">{data.email}</td>
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

export default ViewDosen;
