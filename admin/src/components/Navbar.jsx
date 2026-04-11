import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets.js'
import { AdminContext } from '../context/AdminContext.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'

const Navbar = () => {
    const { atoken, setAtoken, backendurl } = useContext(AdminContext)
    const logout = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/admin/admin-logout', { withCredentials: true })
            if (data.success) {
                toast.success(data.message)
                setTimeout(() => {
                    setAtoken(false)
                }, 2000);
            }

        }
        catch (err) {
            toast.error(err)
        }

    }
    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 bg-white border-b border-gray-200 '>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border px-2.5 rounded-full border-gray-500 text-gray-600'>{atoken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logout} className='cursor-pointer bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
        </div>
    )
}

export default Navbar
