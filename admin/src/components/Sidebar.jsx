import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import {NavLink} from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {
   const {atoken} = useContext(AdminContext)
  return  (
    <div className='min-h-screen bg-white border-r border-gray-200'> 
      {atoken && <ul className='flex flex-col gap-4 mt-1'>

     <NavLink className={({isActive})=>`flex items-center px-3 py-3.5 gap-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r border-primary': ''}`} to={'/admin-dashboard'} >
        <img src={assets.home_icon} alt="" />
        <p>Home</p>
     </NavLink>

     <NavLink className={({isActive})=>`flex items-center px-3 py-3.5 gap-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r border-primary': ''}`} to={'/all-appointments'}>
        <img src={assets.appointment_icon} alt="" />
        <p>Appointments</p>
     </NavLink>

     <NavLink className={({isActive})=>`flex items-center px-3 py-3.5 gap-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r border-primary': ''}`} to={'/add-doctor'}>
        <img src={assets.add_icon} alt="" />
        <p>Add doctor</p>
     </NavLink>

     <NavLink className={({isActive})=>`flex items-center px-3 py-3.5 gap-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r border-primary': ''}`} to={'/doctors-list'}>
        <img src={assets.people_icon} alt="" />
        <p>Doctors list</p>
     </NavLink>

     </ul>}
    </div>
  )
}

export default Sidebar
