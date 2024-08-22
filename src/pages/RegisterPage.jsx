import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from '../utils/auth';
import InputForm from '../components/InputForm';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegisterWrapper = (e) =>
    handleRegister(
      e,
      { firstName, lastName, email, phone, password, confirmPassword },
      setFirstName,
      setLastName,
      setEmail,
      setPhone,
      setPassword,
      setConfirmPassword,
      navigate
    );

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        onSubmit={handleRegisterWrapper}
        className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">
          Sign Up
        </h2>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-bold">
            First Name
          </label>
          <InputForm
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={setFirstName}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold">
            Last Name
          </label>
          <InputForm
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={setLastName}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold">
            Email
          </label>
          <InputForm
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold">
            Phone
          </label>
          <InputForm
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={setPhone}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold">
            Password
          </label>
          <InputForm
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-bold">
            Confirm Password
          </label>
          <InputForm
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
