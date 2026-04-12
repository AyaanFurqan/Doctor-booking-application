import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'

const Adddoctor = () => {
  const [docimg, setDocimg] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('General Physiscian')
  const [education, setEducation] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [aboutdoc, setAboutdoc] = useState('')
  const [showpassword, setShowpassword] = useState(false)
  const { backendurl, atoken } = useContext(AdminContext)

  const adddoctor = async () => {
    try {

      if (!docimg && atoken) {
        toast.error('Image not selected')
      }

      const formdata = new FormData()

      formdata.append('image', docimg)
      formdata.append('name', name)
      formdata.append('email', email)
      formdata.append('password', password)
      formdata.append('experience', experience)
      formdata.append('fees', fees)
      formdata.append('speciality', speciality)
      formdata.append('degree', education)
      formdata.append('address', JSON.stringify({ line1: address1, line2: address2 }))
      formdata.append('about', aboutdoc)

      const { data } = await axios.post(backendurl + 'api/admin/add-doctor', formdata, { withCredentials: true })
      console.log(data)
      if (data.success) {
        toast.success(data.message)
        setTimeout(() => {
          setName('')
          setEmail('')
          setPassword('')
          setDocimg(false)
          setFees('')
          setEducation('')
          setAddress1('')
          setAddress2('')
          setAboutdoc('')
        }, 2000);


      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error)
    }

  }

  return (
    <div className='w-full m-5'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8  border border-gray-100 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-4 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docimg ? URL.createObjectURL(docimg) : assets.upload_area} alt="" />
          </label>
          <input required={true} onChange={(e) => { setDocimg(e.target.files[0]) }} type="file" id='doc-img' hidden />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-10 items-start text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input onChange={(e) => { setName(e.target.value) }} value={name} required={true} className='border border-gray-200 rounded px-3 py-2' type="text" placeholder='Name' />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e) => { setEmail(e.target.value) }} value={email} className='border border-gray-200 rounded px-3 py-2' type="text" placeholder='Email' />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={(e) => { setPassword(e.target.value) }} value={password} className='border border-gray-200 rounded px-3 py-2' type={showpassword ? 'text' : 'password'} placeholder='Password' />
              <button className='cursor-pointer bg-gray-' onClick={() => { setShowpassword((prev) => !prev) }}>{showpassword ? 'Hide password' : 'Show password'}</button>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e) => { setExperience(e.target.value) }} value={experience} className='border border-gray-200 rounded px-3 py-2' name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e) => { setFees(e.target.value) }} value={fees} className='border border-gray-200 rounded px-3 py-2' type="text" placeholder='Fees' />
            </div>

          </div>



          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e) => { setSpeciality(e.target.value) }} value={speciality} className='border border-gray-200 rounded px-3 py-2' name="" id="">
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e) => { setEducation(e.target.value) }} value={education} className='border border-gray-200 rounded px-3 py-2' type="text" placeholder='Education' />
            </div>

            <div className='flex-1 flex flex-col gap-3'>
              <p>Address</p>
              <input onChange={(e) => { setAddress1(e.target.value) }} value={address1} className='border border-gray-200 rounded px-3 py-2' type="text" placeholder='address 1' />
              <input onChange={(e) => { setAddress2(e.target.value) }} value={address2} className='border border-gray-200 rounded px-3 py-2' type="text" placeholder='address 2' />
            </div>
          </div>
        </div>

        <div>

          <div>
            <p className='mt-4 mb-2 '>About Doctor</p>
            <textarea onChange={(e) => { setAboutdoc(e.target.value) }} value={aboutdoc} className='w-full px-4 pt-2 border border-gray-400 rounded' type="text" placeholder='write about doctor' rows={5} required />
          </div>

          <button type='submit' onClick={adddoctor} className='bg-primary px-10 py-3 items-center mt-4 text-white rounded-full cursor-pointer'>Add Doctor</button>

        </div>

      </div>
    </div>
  )
}

export default Adddoctor
