'use client'
import React from 'react'
import { IconHome, IconProgress , IconQuestionMark, IconVideo, IconMessage, IconUser, IconShoppingBagCheck } from '@tabler/icons-react'
import Image from 'next/image'

const MobileSidebar = ({activeItem, setActiveItem, ref}: {activeItem?: number, setActiveItem: (item: number) => void, ref: React.RefObject<number | null>}) => {
    const menuItems = [
        { icon: <IconHome className='text-[#f8f6ee] h-5 w-5'/>, text: 'Home',  },
        { icon: <IconProgress className='text-[#f8f6ee] h-5 w-5'/>, text: 'Skin Progress' },
        { icon: <IconQuestionMark className='text-[#f8f6ee] h-5 w-5'/>, text: 'Learn & FAQs' },
        { icon: <IconVideo className='text-[#f8f6ee] h-5 w-5'/>, text: 'Videos' },
        { icon: <IconMessage className='text-[#f8f6ee] h-5 w-5'/>, text: 'Conversations / Chat' },
        { icon: <IconUser className='text-[#f8f6ee] h-5 w-5'/>, text: 'Support' },
        { icon: <IconShoppingBagCheck className='text-[#f8f6ee] h-5 w-5'/>, text: 'Orders & Subscriptions' }
      ]

      const handleClick = (index: number) => {
        setActiveItem(index)
        ref.current = index
      }
    
  return (
    <div>
         <div className='bg-[#1E3F2B] py-4 px-2 w-74 fixed right-0 h-screen border-[#1E3F2B] block md:hidden'>
            <div className='flex justify-start items-center px-2 mb-8'>
                <h1 className='text-xl font-medium'>
                    <Image src="https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240" alt="Formial Logo" height={75} width={75}/>
                   
                </h1>
            </div>
            
            <nav className='space-y-2 px-2 text-white'>
              {menuItems.map((item, index) => (
                <button 
                  onClick={() => handleClick(index)}
                  key={index}
                  className={`flex items-center justify-start w-full space-x-3 py-2 px-2 rounded-lg  hover:border-l-2 hover:border-r-2 hover:border-[#f8f6ee] hover:bg-[#f8f6ee]/20 cursor-pointer transition-all duration-100 ${activeItem === index ? `border-l-2 border-r-2 border-[#f8f6ee] bg-[#f8f6ee]/20 transition-all duration-100` : `none`}`}
                >
                  <span className='text-lg text-[#f8f6ee] h-6 w-6 '>{item.icon}</span>
                  <span className='text-sm font-medium text-[#f8f6ee]'>{item.text}</span>
                </button>
              ))}
            </nav>
        </div>
    </div>
  )
}

export default MobileSidebar