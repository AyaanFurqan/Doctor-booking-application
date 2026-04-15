import React, { useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const loginpage = () => {
  const [showpass, setShowpass] = useState(false)
  const [state, setState] = useState('Signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { token, setToken, backendurl } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmit = async () => {
    try {
      if (state === 'Signup') {
        const { data } = await axios.post(backendurl + 'api/user/register', { name, email, password }, { withCredentials: true })
        if (data.success) {
          toast.success(data.message)
          setEmail('')
          setPassword('')
          setShowpass(false)
          setState('login')
        }
        else {
          toast.error(data.message)
        }
      }

      if (state === 'login') {
        const { data } = await axios.post(backendurl + 'api/user/login', { email, password }, { withCredentials: true })
        if (data.success) {
          toast.success(data.message)
          console.log(data)
          setToken(true)
          navigate('/')
        } else {
          toast.error(data.message)
          console.log(data)
        }
      }
    }

    catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }

  return (
    <div className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='font-semibold text-2xl'>{state == 'Signup' ? "Create account" : "Login"}</p>
        <p>Please {state == 'Signup' ? "Signup" : "Login"} to book an appointment </p>
        {state === 'Signup' ?
          <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded-full w-full p-2 mt-1' type="text" onChange={(e) => { setName(e.target.value) }} value={name} required />
          </div> : ""}
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded-full w-full p-2 mt-1' type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded-full w-full p-2 mt-1' type={showpass ? 'text' : 'password'} onChange={(e) => { setPassword(e.target.value) }} value={password} required />
          <p className='cursor-pointer' onClick={() => { setShowpass((prev) => !prev) }}>{showpass ? 'Hide password' : 'Show password'}</p>
        </div>
        <button onClick={() => { onSubmit() }} className='cursor-pointer bg-primary text-white w-full py-2 rounded-md text-base'>{state == 'Signup' ? "Create Account" : "Login"}</button>
        {
          state === 'Signup' ?
            <p>Already have an account? <span className='cursor-pointer text-primary underline' onClick={() => { setState('login') }}>Login here</span></p> :
            <p>Dont have an account? <span className='cursor-pointer text-primary underline' onClick={() => { setState('Signup') }}>Signup here</span></p>
        }
      </div>
    </div>
  )
}

export default loginpage
