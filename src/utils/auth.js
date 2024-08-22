import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { auth, db } from '../firebase';

export const handleRegister = async (
  e,
  { firstName, lastName, email, phone, password, confirmPassword },
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setPassword,
  setConfirmPassword,
  navigate
) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    Swal.fire({
      title: 'Error!',
      text: 'Password and Confirm Password do not match.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);

    const userData = {
      firstName,
      lastName,
      email,
      phone,
      role: 'mahasiswa',
    };
    await addDoc(collection(db, 'users'), userData);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    await Swal.fire({
      title: 'Success!',
      text: 'Registration successful. Please check your email to verify your account.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    navigate('/login');
  } catch (error) {
    await Swal.fire({
      title: 'Error!',
      text: 'Registration failed. Please try again later.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    console.error('Registration error:', error);
  }
};

export const handleLogin = async (
  e,
  email,
  password,
  setEmail,
  setPassword,
  navigate
) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user.emailVerified) {
      const idToken = await user.getIdToken();
      sessionStorage.setItem('idToken', idToken);
      setEmail('');
      setPassword('');
      await Swal.fire({
        title: 'Success!',
        text: 'Login berhasil.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/');
    } else {
      await Swal.fire({
        title: 'Warning!',
        text: 'Akun belum terverifikasi. Silakan cek email Anda untuk verifikasi.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  } catch (error) {
    await Swal.fire({
      title: 'Error!',
      text: 'Login gagal. Silakan cek email dan password Anda.',
      icon: 'error',
      confirmButtonText: 'OK',
    });

    console.error('Login error:', error);
  }
};
