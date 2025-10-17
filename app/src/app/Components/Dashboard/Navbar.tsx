import { IconBell, IconSearch, IconUser } from '@tabler/icons-react'
import React from 'react'

const Navbar = () => {
  return (
    <div>
    <div className='bg-[#f8f6f2] border-1 border-[#1E3F2B]/40 rounded-full mt-4 p-4 ml-78 mr-4 h-fit'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start space-x-2 rounded-full border-1 border-[#99a39d]/30 px-2'>
            <input type="text" placeholder='Search' className='w-70 h-full p-2 outline-none'/>
            <IconSearch className='text-[#1E3F2B] h-5 w-5 cursor-pointer'/>
            </div>
            <div className='flex items-center justify-start space-x-2'>
                <IconBell className='text-[#1E3F2B] h-6 w-6 cursor-pointer'/>
                <IconUser className='text-[#1E3F2B] h-6 w-6 cursor-pointer'/>
            </div>
            
        </div>
    </div>
    </div>
  )
}

export default Navbar