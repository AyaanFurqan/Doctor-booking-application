import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT<span className='text-gray-700 font-medium'>US</span></p>
      </div>
      
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat repudiandae totam delectus vitae maiores veniam corporis omnis ea, dicta provident debitis dignissimos, eos nostrum iusto nemo quae illo ad earum!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum neque labore explicabo quam recusandae, eos illum exercitationem ut voluptatem tenetur in enim sit dolores, numquam ab perferendis nisi, deserunt ducimus!</p>
          <b className='text-gray-600'>Our Vision</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae consequuntur consequatur libero aspernatur distinctio vel praesentium suscipit dolorem explicabo adipisci magnam, autem culpa, sapiente excepturi commodi deleniti odit ipsam qui?</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm-py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Stremlined appointment scheduling that fits in your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm-py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm-py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>


    </div>
  )
}

export default About
