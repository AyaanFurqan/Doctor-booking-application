import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const MyProfile = () => {
  const { userprofile, setUserprofile, backendurl, getprofile } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const { token } = useContext(AppContext)
  const navigate = useNavigate()
  const [image, setImage] = useState(false)
  console.log(userprofile)

  // API call to update usersprofile
  const updateuserprofile = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userprofile.name)
      formData.append('address', JSON.stringify(userprofile.address))
      formData.append('dob', userprofile.dob)
      formData.append('phone', userprofile.phone)
      formData.append('gender', userprofile.gender)
      image && formData.append('image', image)

      const { data } = await axios.post(backendurl + 'api/user/update-profile',  formData , { withCredentials: true })

      if (data.success) {
        toast.success(data.message)
        await getprofile()
        setIsEdit(false)
      }else{toast.error(data.message)}
    }
    catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }

  // To check if token is available
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])

  return userprofile && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <div>
        {
          isEdit ?
            <label htmlFor="image">
              <div className='inline-block relative cursor-pointer'>
                <img className='w-36 h-36 rounded object-cover opacity-75' src={image ? URL.createObjectURL(image) : userprofile.image} alt="" />
                <img className='w-10 absolute bottom-12 right-12' src={image ? null : assets.upload_icon} alt="" />
              </div><br />
              <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id='image' hidden />
            </label>
            :
            <img className='w-36 h-36 rounded object-cover' src={userprofile.image} alt="" />
        }


        {isEdit ?
          <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type='text' value={userprofile.name} onChange={(e) => { setUserprofile(prev => ({ ...prev, name: e.target.value })) }}></input> :
          <p className='font-medium text-3xl text-neutral-800 mt-4'>{userprofile.name}</p>
        }

        <hr className='bg-zinc-400 h-[1px border-none]' />
        <div>
          <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>Email id:</p>
            <p className='text-blue-500'>{userprofile.email}</p>
            <p className='font-medium'>Phone:</p>
            {isEdit ?
              <input className='bg-gray-100 max-w-52' type="text" value={userprofile.phone} onChange={(e) => { setUserprofile(prev => ({ ...prev, phone: e.target.value })) }} /> :
              <p className='text-blue-400'>{userprofile.phone}</p>
            }
            <p className='font-medium'>Address:</p>
            {
              isEdit ? <p>
                <input className='bg-gray-50' type="text" value={userprofile.address.line1} onChange={(e) => { setUserprofile(prev => ({ ...prev, address: ({ ...prev.address, line1: e.target.value }) })) }} />
                <br />
                <input className='bg-gray-50' type="text" value={userprofile.address.line2} onChange={(e) => { setUserprofile(prev => ({ ...prev, address: ({ ...prev.address, line2: e.target.value }) })) }} /></p>
                :
                <p className='text-gray-500'>{userprofile.address.line1}
                  <br />
                  {userprofile.address.line2}</p>
            }
          </div>
        </div>


        <div>
          <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 '>
            <p className='font-medium'>Gender:</p>
            {
              isEdit ?
                <select className='max-w-20 bg-gray-100' onChange={(e) => { setUserprofile(prev => ({ ...prev, gender: e.target.value })) }} value={userprofile.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                : <p className='text-gray-400'>{userprofile.gender}</p>
            }
            <p className='font-medium'>Birthday:</p>
            {
              isEdit ?
                <input className='max-w-28 bg-gray-100 ' value={userprofile.dob} type="date" onChange={(e) => { setUserprofile(prev => ({ ...prev, dob: e.target.value })) }} /> :
                <p className='text-gray-400'>{userprofile.dob}</p>
            }
          </div>
        </div>

        <div className='mt-10'>
          {
            isEdit
              ?
              <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => { updateuserprofile() }}>Save information</button>
              : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => { setIsEdit(prev => !prev) }}>Edit</button>

          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile
