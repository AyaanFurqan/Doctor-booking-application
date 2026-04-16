import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
  const [userdata, setUserdata] = useState({
    name: 'Ayaan Furqan',
    image: assets.profile_pic,
    email: 'ayaanfurqan008@gmail.com',
    phone: '00-000-0000',
    adress: {
      line1: 'Statue of liberty',
      line2: 'Washington street no # 3'
    },
    gender: 'Male',
    DOB: '2008-08-8'
  })

  const [isEdit, setIsEdit] = useState(true)
  const {token} = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate('/')
    }
  },[])

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <div>
        <img className='w-36 rounded' src={userdata.image} alt="" />

        {isEdit ?
          <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type='text' value={userdata.name} onChange={(e) => { setUserdata(prev => ({ ...prev, name: e.target.value })) }}></input> :
          <p className='font-medium text-3xl text-neutral-800 mt-4'>{userdata.name}</p>
        }

        <hr className='bg-zinc-400 h-[1px border-none]' />
        <div>
          <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>Email id:</p>
            <p className='text-blue-500'>{userdata.email}</p>
            <p className='font-medium'>Phone:</p>
            {isEdit ?
              <input className='bg-gray-100 max-w-52' type="text" value={userdata.phone} onChange={(e) => { setUserdata(prev => ({ ...prev, phone: e.target.value })) }} /> :
              <p className='text-blue-400'>{userdata.phone}</p>
            }
            <p className='font-medium'>Address:</p>
            {
              isEdit ? <p>
                <input className='bg-gray-50' type="text" value={userdata.adress.line1} onChange={(e) => { setUserdata(prev => ({ ...prev, adress: ({ ...prev.adress, line1: e.target.value }) })) }} />
                <br />
                <input className='bg-gray-50' type="text" value={userdata.adress.line2} onChange={(e) => { setUserdata(prev => ({ ...prev, adress: ({ ...prev.adress, line2: e.target.value }) })) }} /></p>
                :
                <p className='text-gray-500'>{userdata.adress.line1}
                  <br />
                  {userdata.adress.line2}</p>
            }
          </div>
        </div>


        <div>
          <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 '>
            <p className='font-medium'>Gender:</p>
            {
              isEdit ?
                <select className='max-w-20 bg-gray-100' onChange={(e) => { setUserdata(prev => ({ ...prev, gender: e.target.value })) }} value={userdata.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                : <p className='text-gray-400'>{userdata.gender}</p>
            }
            <p className='font-medium'>Birthday:</p>
            {
              isEdit ?
                <input className='max-w-28 bg-gray-100 ' value={userdata.DOB} type="date" onChange={(e) => { setUserdata(prev => ({ ...prev, DOB: e.target.value })) }} /> :
                <p className='text-gray-400'>{userdata.DOB}</p>
            }
          </div>
        </div>

        <div className='mt-10'> 
          {
            isEdit
              ?
              <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(prev => !prev)}>Save information</button>
              : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(prev => !prev)}>Edit</button>

          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile
