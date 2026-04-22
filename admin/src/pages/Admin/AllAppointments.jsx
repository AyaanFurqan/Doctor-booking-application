import { React, useContext, useState, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'
import { toast } from 'react-toastify'

const AllAppointments = () => {
  const { backendurl, atoken, appointments,allappointments, cancelappointment } = useContext(AdminContext)
  const { agecalculate, currency } = useContext(AppContext)

  
  useEffect(() => {
    allappointments()
  }, [])

  return (
    <div className="m-5">
      <p className="text-lg font-semibold text-gray-800 mb-4">All Appointments</p>

      {/* ── Card View (mobile + tablet: below lg) ── */}
      <div className="flex flex-col gap-3 lg:hidden">
        {appointments.length === 0 && (
          <p className="text-center text-gray-400 py-10 text-sm">No appointments found.</p>
        )}
        {appointments.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white text-sm text-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src={item.userData.image} alt={item.userData.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <span className="font-medium text-gray-800">{item.userData.name}</span>
              </div>
              <span className="text-gray-400 text-xs">#{index + 1}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
              <span className="text-gray-400">Age</span><span>{agecalculate(item.userData.dob)}</span>
              <span className="text-gray-400">Date</span><span>{item.slotDate}</span>
              <span className="text-gray-400">Time</span><span>{item.slotTime}</span>
              <span className="text-gray-400">Doctor</span>
              <div className="flex items-center gap-1">
                <img className="w-5 h-5 rounded-full object-cover bg-gray-200" src={item.docData.image} alt="" />
                <span>{item.docData.name}</span>
              </div>
              <span className="text-gray-400">Fees</span><span>{currency} {item.docData.fees.toLocaleString()}</span>
            </div>
            <div className="mt-3">
              {item.cancelled
                ? <p className="text-red-400 text-sm font-bold">Cancelled</p>
                : <img onClick={() => { cancelappointment(item._id) }} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
              }
            </div>
          </div>
        ))}
      </div>

      {/* ── Table View (lg and above) ── */}
      <div className="hidden lg:block w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left text-gray-700">

          <thead className="bg-gray-100 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 w-10">#</th>
              <th className="px-4 py-3 min-w-[160px]">Patient</th>
              <th className="px-4 py-3 w-16">Age</th>
              <th className="px-4 py-3 min-w-[110px]">Date</th>
              <th className="px-4 py-3 min-w-[90px]">Time</th>
              <th className="px-4 py-3 min-w-[160px]">Doctor</th>
              <th className="px-4 py-3 w-24">Fees</th>
              <th className="px-4 py-3 w-28">Actions</th>
            </tr>
          </thead>

          {/* ── Rows ── */}
          <tbody className="divide-y divide-gray-100">
            {appointments.map((item, index) => (

              <tr key={index} className="hover:bg-gray-50 transition-colors">

                <td className="px-4 py-3 text-gray-400">{index + 1}</td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.userData.image}
                      alt={item.userData.name}

                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <span className="font-medium text-gray-800 truncate max-w-[120px]">
                      {item.userData.name}
                    </span>

                  </div>

                </td>

                {/* Age */}
                <td className="px-4 py-3">{agecalculate(item.userData.dob)}</td>

                {/* Date */}
                <td className="px-4 py-3 whitespace-nowrap">{item.slotDate}</td>

                {/* Time */}
                <td className="px-4 py-3 whitespace-nowrap">{item.slotTime}</td>

                {/* Doctor */}
                <td className="px-4 py-3 flex items-center gap-1">
                  <img className='w-8 h-8 rounded-full object-cover bg-gray-200' src={item.docData.image} alt="" />
                  <span className="truncate block max-w-[150px]">{item.docData.name}</span>
                </td>

                {/* Fees */}
                <td className="px-4 py-3">
                  {currency} {item.docData.fees.toLocaleString()}
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  {
                    item.cancelled ?
                      <p className='text-red-400 text-sm font-bold'>Cancelled</p>
                      :
                      <img onClick={() => {cancelappointment(item._id)}} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {appointments.length === 0 && (
          <p className="text-center text-gray-400 py-10 text-sm">No appointments found.</p>
        )}
      </div>
    </div>
  );

}

export default AllAppointments
