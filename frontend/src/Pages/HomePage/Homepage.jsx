import React from 'react'
import {Outlet} from "react-router-dom"
import LeftSidebar from './LeftSidebar'
import NoInternet from './NoInternet'
import BottomTabs from './MorePages/BottomTabs'

function Homepage() {
  return (
    <div>
        { navigator.onLine ? 
          <div className='flex '>
            <div className='hide_block_element w-[16%] border-r border-[#262626] h-screen fixed'>
                <LeftSidebar/>
            </div>

            <div className='fixed block_hide_element bottom-0 bg-black w-[355px] mx-1 h-[50px] z-10'>
              <BottomTabs/>
            </div>

            <div className='lg:w-[87%] lg:pl-6 px-2 '>
                <Outlet/>
            </div>
          </div>: 
          
          <div>
            <NoInternet/>
          </div>
        }
    </div>
  )
}

export default Homepage
