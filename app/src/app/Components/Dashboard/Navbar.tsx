"use client"
import { IconMenu2, IconX, IconBell, IconUser } from '@tabler/icons-react'
import React, { useState } from 'react'
import Image from 'next/image'
import MobileSidebar from './Sidebar-Mobile'
import { AnimatePresence, motion } from 'framer-motion'

const Navbar = ({activeItem, setActiveItem, ref}: {activeItem?: number, setActiveItem: (item: number) => void, ref: React.RefObject<number | null>}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Top Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#E0E0E0] px-6 md:px-10 py-3 bg-[#1E3F2B] backdrop-blur-sm sticky top-0 z-10">
        {/* Logo */}
        <div className="flex items-center gap-4 text-[#3C403D]">
          <Image src="https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240" alt="Formial" width={120} height={40} className="h-8 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <a className="text-[#F5F2ED] text-sm font-medium leading-normal hover:text-[#A3B18A] transition-colors cursor-pointer" onClick={() => { setActiveItem(0); ref.current = 0; }}>
              Home
            </a>
            <a className="text-[#F5F2ED] text-sm font-medium leading-normal hover:text-[#A3B18A] transition-colors cursor-pointer" onClick={() => { setActiveItem(3); ref.current = 3; }}>
              Referral and earn
            </a>
              <a className="text-[#F5F2ED] text-sm font-medium leading-normal hover:text-[#A3B18A] transition-colors cursor-pointer" onClick={() => { setActiveItem(4); ref.current = 4; }}>
              Support
            </a>
            <a className="text-[#F5F2ED] text-sm font-medium leading-normal hover:text-[#A3B18A] transition-colors cursor-pointer" onClick={() => { setActiveItem(2); ref.current = 2; }}>
              FAQs and Videos
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center overflow-hidden rounded-full size-10 bg-[#EAE0D5]/50 hover:bg-[#EAE0D5] text-[#3C403D] transition-colors">
              <IconBell className="text-xl" />
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 text-[#3C403D] bg-[#EAE0D5]/50 hover:bg-[#EAE0D5] flex items-center justify-center">
              <IconUser className="text-xl" />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center rounded-full size-10 bg-[#EAE0D5]/50 text-[#3C403D]"
        >
          {!isOpen ? <IconMenu2 className="h-6 w-6" /> : <IconX className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 right-0 w-fit bg-[#1E3F2B] z-20"
          >
            <MobileSidebar activeItem={activeItem} setActiveItem={setActiveItem} ref={ref} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar