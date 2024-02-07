'use-client'
import Adminregister from '@/pages/auth/adminregister'
import Loginpg from '@/pages/auth/login'
import React, { useState } from 'react'

function Navbar() {

    const [showModal, setShowModal] = useState(false)
    const [adminShowModal, setAdminShowModal] = useState(false)



  return (
    <>
    <div className='flex flex-row w-full bg-gray-300 text-white items-center px-5 py-3 justify-between'>
        <div className='flex flex-row text-white gap-2'>
            <div className='text-xl text-black'><span className='text-blue-500 text-3xl font-semibold'>W</span>ater
</div>
            <div className='text-xl text-black'><span className='text-blue-500 text-3xl font-semibold'>S</span>upply</div>
            <div className='text-xl text-black'><span className='text-blue-500 text-3xl font-semibold'>A</span>utomation</div>
        </div>
        <div className='flex flex-row gap-5'>
        <div className='text-2xl px-5 text-black font-semibold bg-gray-100 py-2 flex flex-row items-center cursor-pointer' 
        onClick={()=>{
            setShowModal(true)
        }}>
            User Login
        </div>
        <div className='text-2xl px-5 text-black font-semibold bg-gray-100 py-2 flex flex-row items-center cursor-pointer' 
        onClick={()=>{
            setAdminShowModal(true)
        }}>
            Admin
        </div>
        </div>
       
    </div>
    {showModal && <Loginpg showModal={showModal} setShowModal={setShowModal} />}
    {adminShowModal && <Adminregister adminShowModal={adminShowModal} setAdminShowModal={setAdminShowModal} />}
    </>
    
  )
}

export default Navbar