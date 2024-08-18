import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

const MatkulFormFile = ({ onFileUpload }) => {
  const [csvFile, setCsvFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) {
        setCsvFile(file);
        onFileUpload(file);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Only CSV or XLSX files are allowed.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const parseCSVorXLSX = (file) => {
    if (file.name.endsWith('.csv')) {
      Papa.parse(file, {
        complete: function (results) {
          console.log('Parsed CSV:', results.data);
          const mataKuliahData = results.data.map((row) => ({
            kodeKelas: row[0],
            kodeMataKuliah: row[1],
            nama: row[2],
            sks: row[3],
            tanggal: row[4],
            shift: row[5],
            semester: row[6],
          }));

          mataKuliahData.forEach(async (data) => {
            try {
              await addDoc(collection(db, 'mataKuliah'), data);
            } catch (error) {
              console.error('Error adding document: ', error);
            }
          });
        },
      });
    } else if (file.name.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(workSheet);
        const mataKuliahData = excelData.map((row) => ({
          kodeKelas: row['Kode Kelas'],
          kodeMataKuliah: row['Kode Mata Kuliah'],
          nama: row['Nama'],
          sks: row['SKS'],
          tanggal: row['Tanggal'],
          shift: row['Shift'],
          semester: row['Semester'],
        }));

        console.log('Parsed XLSX:', mataKuliahData);
        mataKuliahData.forEach(async (data) => {
          try {
            await addDoc(collection(db, 'mataKuliah'), data);
          } catch (error) {
            console.error('Error adding document: ', error);
          }
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleFileSubmit = () => {
    if (csvFile) {
      Swal.fire({
        title: 'Success',
        text: 'File uploaded successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

      parseCSVorXLSX(csvFile);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Please select a file to upload.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="p-4 bg-white my-4 shadow-md rounded-md">
      <label
        htmlFor="csvFile"
        className="text-md mb-4 block font-semibold text-[#fff] text-center bg-[#1B9AD7] py-2">
        Upload File Mata Kuliah
      </label>
      <div className="flex flex-row items-start gap-3">
        <input
          type="file"
          id="csvFile"
          accept=".csv, .xlsx"
          onChange={handleFileChange}
          className="py-2 px-4 border border-gray-300 rounded-md mb-4 w-full"
        />
        <button
          onClick={handleFileSubmit}
          className="bg-[#E48118] text-[#eaeaea] md:py-3 px-4 rounded-md hover:bg-[#a97339] hover:text-[#ffffff] cursor-pointer md:w-4/12">
          Submit File
        </button>
      </div>
    </div>
  );
};

export default MatkulFormFile;
