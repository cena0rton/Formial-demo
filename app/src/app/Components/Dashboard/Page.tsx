'use client'
import React, { useRef, useState } from 'react'
import Dash from './Dash'
import DashHome from './Dash-Items/DashHome'
import SkinProgress from './Dash-Items/SkinProgress'
import PersonalDetails from './Dash-Items/PersonalDetails'
import Navbar from './Navbar'

const Page = () => {
  const [activeItem, setActiveItem] = useState(0);
  const ref = useRef<number>(0);
  
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f5f2ed]">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar activeItem={activeItem} setActiveItem={setActiveItem} ref={ref} />
        <Dash>
          {ref.current === 0 && <DashHome />}
          {ref.current === 1 && <SkinProgress />}
          {ref.current === 6 && <PersonalDetails />}
        </Dash>
      </div>
    </div>
  )
}

export default Page