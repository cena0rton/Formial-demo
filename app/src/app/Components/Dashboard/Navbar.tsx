"use client"
import { IconMenu2, IconX, IconBell, IconUser } from '@tabler/icons-react'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type SectionType = 'treatment' | 'progress' | 'refer'

interface NavbarProps {
  activeItem?: number
  setActiveItem: (item: number) => void
  ref: React.RefObject<number | null>
  activeSection?: SectionType
  setActiveSection?: (section: SectionType) => void
}

const Navbar = ({activeItem, setActiveItem, ref, activeSection, setActiveSection}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // Navigation items - simplified for centered navbar
  const navItems: { 
    id: string; 
    label: string; 
    type: 'section' | 'page'; 
    sectionId?: SectionType; 
    itemIndex?: number 
  }[] = [
    { id: 'treatment', label: 'Home', type: 'section', sectionId: 'treatment' },
    { id: 'refer', label: 'Refer & Earn', type: 'section', sectionId: 'refer' },
    { id: 'support', label: 'Consult', type: 'page', itemIndex: 4 },
    { id: 'details', label: 'Details', type: 'page', itemIndex: 6 },
    // { id: 'orders', label: 'Orders & Subscriptions', type: 'page', itemIndex: 5 },
  ]

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.type === 'section' && item.sectionId) {
      if (setActiveSection) {
        setActiveSection(item.sectionId)
      }
      setActiveItem(0)
      ref.current = 0
    } else if (item.type === 'page' && item.itemIndex !== undefined) {
      setActiveItem(item.itemIndex)
      ref.current = item.itemIndex
      if (setActiveSection) {
        setActiveSection('treatment')
      }
    }
    setIsOpen(false) // Close mobile menu on click
  }

  const isItemActive = (item: typeof navItems[0]) => {
    if (item.type === 'section' && item.sectionId) {
      return activeSection === item.sectionId && activeItem === 0
    } else if (item.type === 'page' && item.itemIndex !== undefined) {
      return activeItem === item.itemIndex
    }
    return false
  }

  return (
    <>
      {/* Top Green Header with Logo */}
      <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-[#1E3F2B] sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center">
          <Image 
            src="https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240" 
            alt="Formial" 
            width={120} 
            height={40} 
            className="md:h-8 w-auto h-6" 
          />
        </div>

        {/* Mobile Menu Button */}
    

        {/* Desktop Icons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center overflow-hidden rounded-full size-10 bg-white/10 hover:bg-white/20 text-white transition-colors">
            <IconBell className="text-xl" />
          </button>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 text-white bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <IconUser className="text-xl" />
          </div>
        </div>
      </header>

      {/* Centered Navigation Bar - Sticky below green header */}
      <nav className="sticky top-[72px] md:top-[72px] z-40 bg-[#FEFCE8] border-b border-black/20">
        <div className="max-w-7xl mx-auto px-0 md:px-6 ">
        
          <div className="flex items-center justify-center">
            <div className="relative flex  overflow-hidden w-full md:max-w-2xl max-w-lg mt-3 ">
              {navItems.map((item) => {
                const isActive = isItemActive(item)
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`relative flex-1 px-3 pb-4 mt-2 text-xs md:text-sm text-black font-medium transition-all focus:outline-none z-10 ${
                      isActive ? 'text-[#1E3F2B]' : 'text-black'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
              
              {(() => {
                const activeIndex = navItems.findIndex(item => isItemActive(item))
                if (activeIndex === -1) return null
                
                return (
                  <motion.div
                    layoutId="activeNavItemMobile"
                    className="absolute  inset-y-0 bg-transparent border-b-2 border-black/60  z-0"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    style={{
                      width: `${100 / navItems.length}%`,
                      left: `${activeIndex * (100 / navItems.length)}%`,
                    }}
                  />
                )
              })()}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar