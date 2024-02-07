import React from 'react'
import Loginpg from './auth/login'
import Layout from '@/components/Layout'
import Image from 'next/image'

function Homepg() {
  return (
    <>
    <Layout>
      <div className='w-full h-[100vh] bg-black text-white flex flex-col j text-2xl font-semibold'>

        <div className='flex flex-row text-3xl w-full justify-center py-5'>
          Water Supply Automation System
        </div>
        <div className='p-5'>
          <Image src={require("../assests/img1.jpeg")} className='w-[30%]'/>
        </div>
        <div className='p-5 gap-5 flex flex-col'>
          <div className='text-2xl text-blue-300'>Automated Water Water Supply Control System (Chaos Logic-based Demand Prediction Method)</div>
          <div className='text-lg text-white text-justify'>
          For conventional water supply and distribution operation, experienced operators, who are familiar with facilities, predict daily demand based on date and weather information, operating entire facilities. However, further efficient water supply and distribution operation and facility maintenance and management have been recently required due to mass retirement of experienced operators and mergers of municipalities. Our water supply and distribution automation system realizes reasonable and stable water supply operation by effectively utilizing each water systems with different configuration. This is done by using the chaos-logic based water demand prediction method and predict and control the water level of the distribution reservoir.z
          </div>
        </div>
      </div>
    </Layout>
    </>
  )
}

export default Homepg