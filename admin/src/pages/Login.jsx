import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets.js'
import { useState } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [state, setState] = useState('Admin')
    const { backendurl, setAtoken } = useContext(AdminContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const Submit = async () => {
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendurl + 'api/admin/admin-login', { email, password }, { withCredentials: true })
                if (data.success) {
                    toast.success(data.message)
                    setTimeout(() => {
                        setAtoken(true)
                    }, 2000)
                }
                else {
                    toast.error(data.message)
                }

            } else {

            }
        } catch (error) {
            console.log('err', error)
        }
    }

    return (
        <div className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='font-semibold text-2xl m-auto'><span className='text-primary'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => { setEmail(e.target.value) }} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required={true} />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => { setPassword(e.target.value) }} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required={true} />
                </div>
                <button onClick={Submit} className=' cursor-pointer w-full rounded-md py-3 m-auto text-base text-white bg-primary'>Login</button>
                {
                    state === 'Admin' ?
                        <p className='m-auto text-sm'>Login as <span onClick={() => { setState('Doctor') }} className='text-primary underline cursor-pointer'>Doctor</span></p> :
                        <p className='m-auto text-sm'>Login as <span onClick={() => { setState('Admin') }} className='text-primary underline cursor-pointer'>Admin</span></p>
                }
            </div>
        </div>
    )
}

export default Login
