import React from 'react'
import { assets } from '../assets/assets_frontend/assets';
const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className="flex md:flex-row flex-col justify-center gap-12 my-10">
        <img  className="w-full md:max-w-70" src={assets.about_image} alt="About Us"/>
        <div className="flex flex-col justify-center gap-6 text-sm text-gray-600 md:w-2/4">
        <p>Welcome to DocGhor, your trusted partner in managing your healthcare needs conveniently and efficiently. At DocGhor, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records</p>
        <p>DocGhor is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, DocGhor is here to support you every step of the way.</p>
        <b className='text-gray-800'>Our Vision</b>
        <p>Our vision at DocGhor is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
      </div>
    </div>
    <div>
      <p>WHY CHOOSE US</p>
    </div>
    </div>
  )
}

export default About
