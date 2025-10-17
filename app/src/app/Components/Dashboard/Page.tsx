import React from 'react'
import Sidebar from './Sidebar'

import Dash from './Dash'
import DashHome from './Dash-Items/DashHome'

const Page = () => {
  return (
    <div>
    
    <Sidebar/>
    <Dash className={``}>
     <DashHome/>
    </Dash>
       
</div>  
  )
}

export default Page