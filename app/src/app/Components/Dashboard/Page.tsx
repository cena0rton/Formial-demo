'use client'
import React, { useRef, useState } from 'react'
import Sidebar from './Sidebar'

import Dash from './Dash'
import DashHome from './Dash-Items/DashHome'
import SkinProgress from './Dash-Items/SkinProgress'
import Navbar from './Navbar'

const Page = () => {

  const [activeItem, setActiveItem] = useState(0);
  const ref  = useRef<number>(0);
  return (
    <div className="flex flex-col">
    
    <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} ref={ref}/>
    <Navbar/>
    <Dash className={``}>
     {ref.current === 0 && <DashHome/>}
     {ref.current === 1 && <SkinProgress/>}
    </Dash>
       
</div>  
  )
}

export default Page