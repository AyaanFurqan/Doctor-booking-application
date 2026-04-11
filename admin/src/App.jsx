import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom'
import Adddoctor from './pages/Admin/Adddoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorsList from './pages/Admin/DoctorsList';
import Dashboard from './pages/Admin/Dashboard';

const App = () => {
  const { atoken } = useContext(AdminContext)
  return atoken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/add-doctor' element={<Adddoctor/>} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/doctors-list' element={<DoctorsList />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App
