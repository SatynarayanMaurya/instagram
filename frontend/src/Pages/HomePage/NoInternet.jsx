import React from 'react'
import noInternetImage from "../../Assests/Extras/noInternet.png"
function NoInternet() {
  return (
    <div className='bg-[#202124] h-screen flex justify-center items-center'>
      <div className='w-[500px] h-[400px] text-[#9AA0A6] -mt-36'>
        <img src={noInternetImage} alt="" className='w-[500px] object-cover' />
        <p className='font-semibold text-3xl'>No Internet</p>
        <div className='flex flex-col gap-2 text-lg mt-2'>
            <p>Try:</p>
            <ul className='pl-10 list-disc flex flex-col gap-2 '>
                <li>Checking the network cables, modem, and router</li>
                <li>Reconnecting to Wi-Fi</li>
                <li className='text-[#8AB4F8] cursor-pointer'>Running Windows Network Diagnostics</li>
            </ul>
            <p className='mt-2'>ERR_INTERNET_DISCONNECTED</p>
        </div>
      </div>
    </div>
  )
}

export default NoInternet