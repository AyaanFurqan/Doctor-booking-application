import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencysymbol } = useContext(AppContext)

  const [docinfo, setdocinfo] = useState(null)

  const fetchdocinfo = async () => {
    const docinfo = doctors.find(doc => doc._id === docId)
    setdocinfo(docinfo)
    console.log(docinfo)
  }

  useEffect(() => {
    fetchdocinfo()
  }, [doctors, docId])

  return docinfo && (
    <div>
      {/* ----doc-details---- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docinfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 '>
          {/* ----Doc-info = name, degree, experience etc */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docinfo.name}
            <img src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docinfo.degree}-{docinfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docinfo.experience}</button>
          </div>
          {/* ----Doc About---- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docinfo.about}</p>
          </div>
          <p className='text-gray-500 font-bold mt-4'>
            Appointment fees: <span className='text-gray-600'>{currencysymbol+docinfo.fees}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Appointment
