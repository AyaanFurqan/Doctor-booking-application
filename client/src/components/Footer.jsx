import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* ---- leftside ---- */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae at itaque dolores dolor perferendis iusto maxime. Tempora quos esse officiis quam eaque exercitationem assumenda corrupti ea obcaecati saepe. Dolor, nihil.</p>
                </div>

                {/* center */}
                <div>
                    <p className='text -xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/* ----rightside---- */}
                <div>
                    <p className='text -xl font-medium mb-5'>Get in touch</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+92-3232067909</li>
                        <li>ayaanfurqan008@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/* ----copyright text---- */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2026@ Prescripto - All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
