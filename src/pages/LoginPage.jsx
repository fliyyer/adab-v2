import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../utils/auth';
import { Link } from 'react-router-dom';
import InputForm from '../components/InputForm';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginWrapper = (e) =>
    handleLogin(e, email, password, setEmail, setPassword, navigate);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleLoginWrapper} className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">ADAB</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold">
            Email
          </label>
          <InputForm type="email" id="email" placeholder="Masukkan email Anda" value={email} onChange={setEmail} />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold">
            Password
          </label>
          <InputForm type="password" id="password" placeholder="Masukkan password Anda" value={password} onChange={setPassword} />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
        <div className="text-center text-gray-700">
          <p>Belum punya akun? <Link to="/register" className="text-blue-500">Daftar di sini</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
