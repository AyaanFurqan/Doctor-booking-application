import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import Relateddoctors from '../components/Relateddoctors'
import {toast} from 'react-hot-toast'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencysymbol, backendurl, token, getalldoctors, userprofile, setUserprofile } = useContext(AppContext)
  const DaysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docinfo, setdocinfo] = useState(null)
  const [docslots, setdocslots] = useState([])
  const [slotindex, setslotindex] = useState(0)
  const [slottime, setslottime] = useState('')
  const navigate = useNavigate()

  const fetchdocinfo = async () => {
    const docinfo = doctors.find(doc => doc._id === docId)
    setdocinfo(docinfo)
    console.log(docinfo)
  }

  const getavailableslots = async () => {
    setdocslots([])

    // getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      // getting with index
      let currentdate = new Date(today)
      currentdate.setDate(today.getDate() + i)

      // setting endtime of the date with index
      let endtime = new Date()
      endtime.setDate(today.getDate() + i)
      endtime.setHours(21, 0, 0, 0)

      // setting hours
      if (today.getDate() === currentdate.getDate()) {
        currentdate.setHours(currentdate.getHours() > 10 ? currentdate.getHours() + 1 : 10)
        currentdate.setMinutes(currentdate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentdate.setHours(10)
        currentdate.setMinutes(0)
      }

      let timeSlots = []

      while (currentdate < endtime) {
        let formattedTime = currentdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentdate.getDate()
        let month = currentdate.getMonth()+1
        let year = currentdate.getFullYear()

        const slotDate = day +"_" + month+"_" + year
        const slotTime = formattedTime

        const isSlotAvailable = !docinfo.slots_booked?.[slotDate]?.includes(slotTime)

        if(isSlotAvailable){
          // add slot to array
        timeSlots.push({
          datetime: new Date(currentdate),
          time: formattedTime
        })
        }

        

        currentdate.setMinutes(currentdate.getMinutes() + 30)

      }
      setdocslots(prev => ([...prev, timeSlots]))
    }

  }

  const bookappointment = async()=>{
    if(!token){
      toast.error('Login to book an appointment')
      return navigate('/login')
    }
    try {
      const date = docslots[slotindex][0].datetime

      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day +"_" + month+"_" + year 

      const {data} = await axios.post(backendurl + 'api/user/book-appointment', {docId, slotDate, slotTime:slottime}, {withCredentials:true})
      if(data.success){
        toast.success(data.message)
        navigate('/my-appointments')
        getalldoctors()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(() => {
    fetchdocinfo()
  }, [doctors, docId])

  useEffect(() => {
    if(docinfo)
    getavailableslots()
  }, [docinfo])

  useEffect(() => {
    console.log(docslots)
  }, [docslots])

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
            Appointment fees: <span className='text-gray-600'>{currencysymbol + docinfo.fees}</span>
          </p>
        </div>
      </div>

      {/* ----Booking-slots---- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docslots.length && docslots.map((item, index) => (
            <div onClick={() => { setslotindex(index) }} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotindex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
              <p>{item[0] && DaysofWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>

            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docslots.length && docslots[slotindex]?.map((item, index) => (
            <p onClick={() => { setslottime(item.time) }} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slottime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={()=>{bookappointment()}} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'>Book an appointment</button>
      </div>
      {/* Listing related doctors */}
      <Relateddoctors docId={docId} speciality={docinfo.speciality}/>
    </div>
  )
}

export default Appointment
