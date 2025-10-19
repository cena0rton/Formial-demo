"use client"
import {  IconMenu2, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import Image from 'next/image'
import MobileSidebar from './Sidebar-Mobile'
import { AnimatePresence, motion } from 'framer-motion'

const Navbar = ({activeItem, setActiveItem, ref}: {activeItem?: number, setActiveItem: (item: number) => void, ref: React.RefObject<number | null>}) => {

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
    <div className='bg-[#F2EEE0] border-1 relative border-[#1E3F2B]/40 rounded-full mt-4 p-4 ml-2 mr-2 h-fit md:hidden'>
        <div className='flex items-center justify-between'>
            {/* <div className='flex items-center justify-start space-x-2 rounded-full border-1 border-[#99a39d]/30 px-2'>
            <input type="text" placeholder='Search' className='w-70 h-full p-2 outline-none'/>
            <IconSearch className='text-[#1E3F2B] h-5 w-5 cursor-pointer'/>
            </div> */}
            {/* <div className='flex items-center justify-start space-x-2'>
                <IconBell className='text-[#1E3F2B] h-6 w-6 cursor-pointer'/>
                <IconUser className='text-[#1E3F2B] h-6 w-6 cursor-pointer'/>
            </div> */}
           
            <Image src="/Formial.webp" alt="Formial Logo" height={80} width={80} className="rounded-lg"/>
            
            <button onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? <IconMenu2 className='text-[#1E3F2B] h-6 w-6 cursor-pointer'/> : <IconX className='text-[#1E3F2B] h-6 w-6 cursor-pointer'/>}
            </button>
            <AnimatePresence>
            {isOpen && 
            
        <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
        className='fixed top-20 right-0 w-fit  bg-[#1E3F2B] z-20'>
        <MobileSidebar activeItem={activeItem} setActiveItem={setActiveItem} ref={ref}/>
        </motion.div>
        
        }
        </AnimatePresence>
            
        </div>

      
    </div>
    </div>
  )
}

export default Navbar