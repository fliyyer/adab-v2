
import Dashboard from './pages/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ViewMatakuliah from './pages/ViewMatakuliah'
import AddMatakuliah from './pages/AddMatakuliah'
import AddMahasiswa from './pages/AddMahasiswa'
import ViewMahasiswa from './pages/ViewMahasiswa'
import AddDosen from './pages/AddDosen'
import ViewDosen from './pages/ViewDosen'
import AddJadwal from './pages/AddJadwal'
import ViewJadwal from './pages/ViewJadwal'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Layouts from './pages/Layout'
import DashboardContent from './pages/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <DashboardContent />,
      },
      {
        path: '/matakuliah/add',
        element: <AddMatakuliah />,
      },
      {
        path: '/matakuliah/view',
        element: <ViewMatakuliah />,
      },
      {
        path: '/mahasiswa/add',
        element: <AddMahasiswa />
      },
      {
        path: '/mahasiswa/view',
        element: <ViewMahasiswa />
      },
      {
        path: '/dosen/add',
        element: <AddDosen />
      },
      {
        path: '/dosen/view',
        element: <ViewDosen />
      },
      {
        path: '/jadwal/add',
        element: <AddJadwal />
      },
      {
        path: '/jadwal/view',
        element: <ViewJadwal />
      }
    ]
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  }
])
function App() {
  return <RouterProvider router={router} />
}

export default App
