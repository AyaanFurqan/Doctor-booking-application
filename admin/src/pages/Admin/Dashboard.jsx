import React from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Dashboard = () => {
  const {cancelappointment, dashData } = useContext(AdminContext)
  const {latestappointments} = dashData
  return (
    <div className="m-5">

      {/* Stat Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-7'>

        <div className='flex items-center gap-3 rounded-xl bg-zinc-100 p-4 hover:bg-zinc-200 transition-colors'>
          <img src={assets.doctor_icon} alt="" className='w-10 h-10 object-contain' />
          <div>
            <p className='text-xl font-semibold text-zinc-800'>{dashData ? dashData.doctors  : 0}</p>
            <p className='text-sm text-zinc-500'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-3 rounded-xl bg-zinc-100 p-4 hover:bg-zinc-200 transition-colors'>
          <img src={assets.appointments_icon} alt="" className='w-10 h-10 object-contain' />
          <div>
            <p className='text-xl font-semibold text-zinc-800'>{dashData ? dashData.appointments : 0}</p>
            <p className='text-sm text-zinc-500'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-3 rounded-xl bg-zinc-100 p-4 hover:bg-zinc-200 transition-colors'>
          <img src={assets.patients_icon} alt="" className='w-10 h-10 object-contain' />
          <div>
            <p className='text-xl font-semibold text-zinc-800'>{dashData ? dashData.users : 0}</p>
            <p className='text-sm text-zinc-500'>Patients</p>
          </div>
        </div>

      </div>

      {/* Latest Appointments */}
      <div className='border border-gray-200 rounded-xl overflow-hidden'>

        <div className='flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-gray-50'>
          <img className='w-6 h-6' src={assets.appointments_icon} alt="" />
          <p className='font-medium text-gray-700'>Latest Appointments</p>
        </div>

        {
          latestappointments &&
          latestappointments.map((item, index) => (
            <div key={index} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors gap-3">

              <div className='flex items-center gap-3 min-w-0'>
                <img
                  className='w-10 h-10 rounded-full object-cover bg-gray-100 flex-shrink-0'
                  src={item.userData.image}
                  alt=""
                />
                <p className='text-sm text-gray-600 truncate'>Booking on {item.slotDate}</p>
              </div>

              <div className='flex-shrink-0'>
                {
                  item.cancelled ?
                    <p className='text-red-400 text-sm font-bold'>Cancelled</p>
                    :
                    <img onClick={() => { cancelappointment(item._id) }} className='w-8 h-8' src={assets.cancel_icon} alt="" />
                }
              </div>

            </div>
          ))
        }

        {
          latestappointments.length === 0 &&
          <div className=' p-2 text-center text-sm text-zinc-400'>
            <p>No appointments found</p>
          </div>
          
        }

      </div>
    </div>
  )
}

export default Dashboard
