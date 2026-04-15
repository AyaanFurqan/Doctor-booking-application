import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorsList = () => {
  const { atoken, doctors, getalldoctors, changeavailiblity } = useContext(AdminContext)

  useEffect(() => {
    if (atoken) {
      getalldoctors()
    }
  }, [atoken])


  return (
    <div className='m-4 max-h[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-4 gap-y-7'>
        {
          doctors.map((item, key) => (
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={key}>
              <img className='bg-indigo-50 hover:bg-primary transition-all duration-500' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p>{item.speciality}</p>
              </div>
              <div className='mt-2 p-1 flex items-center gap-1 text-sm'>
                <input onChange={()=>{changeavailiblity(item._id)}} type="checkbox" checked={item.available}/>
                <p>Available</p>
              </div>
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
