import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import toast from 'react-hot-toast' 
const Doctors = () => {

  const { speciality } = useParams()
  console.log(speciality)
  const [filterDoc, setfilterDoc] = useState([])
  const [showfilters, setShowfilters] = useState(false)
  const { doctors, getalldoctors } = useContext(AppContext)
  const navigate = useNavigate()

  const applyfilter = () => {
    if (speciality) {
      setfilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setfilterDoc(doctors)
    }
  }
  useEffect(() => {
    getalldoctors()
  },[])

  useEffect(() => {
    applyfilter()
  }, [doctors, speciality])

  return (
    <div className='text-gray-600'>
      <p>Browse through the doctors speciality</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => { setShowfilters(prev => !prev) }} className={`px-3 py-1 rounded text-sm transition-all sm:hidden ${showfilters ? 'text-white bg-primary' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showfilters ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => { speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General Physician' ? "bg-indigo-100 text-black" : "not-first-of-type:"}`}>General Physician</p>
          <p onClick={() => { speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? "bg-indigo-100 text-black" : "not-first-of-type:"}`}>Gynecologist</p>
          <p onClick={() => { speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? "bg-indigo-100 text-black" : "not-first-of-type:"}`}>Dermatologist</p>
          <p onClick={() => { speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? "bg-indigo-100 text-black" : "not-first-of-type:"}`}>Pediatricians</p>
          <p onClick={() => { speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? "bg-indigo-100 text-black" : "not-first-of-type:"}`}>Neurologist</p>
          <p onClick={() => { speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? "bg-indigo-100 text-black" : "not-first-of-type:"}`}>Gastroenterologist</p>
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => ( 
            
                <div onClick={() => { item.available ? navigate(`/appointment/${item._id}`) : toast.error('Doctor not availvble')}} key={index} className='border border-blue-2 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img className='bg-blue-50' src={item.image} alt="" />
              <div className='p-4'>
                <div className= {`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                <p className = {`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`} ></p><p>{ item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          
          ))}
        </div>

      </div>
    </div>
  )
}

export default Doctors
