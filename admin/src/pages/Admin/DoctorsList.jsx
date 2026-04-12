import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorsList = () => {
  const { atoken, doctors, getalldoctors } = useContext(AdminContext)

  useEffect(() => {
    if (atoken) {
      getalldoctors()
    }
  }, [atoken])


  return (
    <div>
      <p className='mb-4 mt-4'>All Doctors</p>
      <div className='flex flex-wrap gap-3'>
        {
          doctors.map((item, key) => (
            <div className='items-center' key={key}>
              <img className='w-40' src={item.image} alt="" />
              <div>
                <p>{item.name}</p>
                <p>{item.speciality}</p>
              </div>
              <div>
                <input type="checkbox" />
              </div>
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
