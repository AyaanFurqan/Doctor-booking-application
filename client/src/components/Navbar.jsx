import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import toast from 'react-hot-toast'
import axios from 'axios'
const Navbar = () => {

    const navigate = useNavigate()
    const { token, setToken, backendurl } = useContext(AppContext)
    const [showmenu, setShowmenu] = useState(false)
    const [showdropdown, setShowdropdown] = useState(false)
    const { userprofile, setUserprofile } = useContext(AppContext)
    const { image } = userprofile
    const userlogout = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/user/logout', { withCredentials: true })
            console.log(data)
            if (data.success) {
                toast.success(data.message)
                setToken(false)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)

        }

    }

    return (
        <div className='flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img onClick={() => { navigate('/') }} className='w-44 cursor-pointer rounded-full' src={assets.logo} alt="" />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to={'/'}>
                    <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-blue-200 w-3/5 m-auto hidden ' />
                </NavLink>
                <NavLink to={'/doctors'}>
                    <li className='py-1'>All DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-blue-200 w-3/5 m-auto hidden ' />
                </NavLink>
                <NavLink to={'/about'}>
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-blue-200 w-3/5 m-auto hidden ' />
                </NavLink>
                <NavLink to={'/contact'}>
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-blue-200 w-3/5 m-auto hidden ' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token ?

                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 h-8 rounded-full object-cover' src={image} alt="" />
                            <img onClick={() => { setShowdropdown(true) }} className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 group-hover: block ${showdropdown ? 'block' : 'hidden'}  `}>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => { navigate('/my-profile'), setShowdropdown(false) }} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => { navigate('/my-appointments'), setShowdropdown(false) }} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={() => { userlogout(), setShowdropdown(false) }} className='hover:text-black cursor-pointer'>Logout</p>
                                    <p onClick={() => { setShowdropdown(false) }} className='md-hidden cursor-pointer text-sm '>Close</p>
                                </div>
                            </div>
                        </div> :
                        <button onClick={() => { navigate('/login') }} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
                }
                <img onClick={() => { setShowmenu(true) }} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                {/* Mobie menu */}
                <div className={`${showmenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-30' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => { setShowmenu(false) }} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-3 font-medium mt-5 px-5 text-lg'>
                        <NavLink onClick={() => { setShowmenu(false) }} to={'/'}> <p className='px-4 py-2 rounded-full inline-block'>Home</p></NavLink>
                        <NavLink onClick={() => setShowmenu(false)} to={'/doctors'}> <p className='px-4 py-2 rounded-full inline-block'>All doctors</p></NavLink>
                        <NavLink onClick={() => { setShowmenu(false) }} to={'/about'}> <p className='px-4 py-2 rounded-full inline-block'>About</p></NavLink>
                        <NavLink onClick={() => { setShowmenu(false) }} to={'/contact'}> <p className='px-4 py-2 rounded-full inline-block'>Contact</p></NavLink>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Navbar
