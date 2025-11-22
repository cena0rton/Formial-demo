"use client"
import { IconMenu2, IconX, IconBell, IconUser } from '@tabler/icons-react'
import React, { useState } from 'react'
import Image from 'next/image'
import MobileSidebar from './Sidebar-Mobile'
import { AnimatePresence, motion } from 'framer-motion'

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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Unified navigation items - all links in one array
  const navItems: { 
    id: string; 
    label: string; 
    type: 'section' | 'page'; 
    sectionId?: SectionType; 
    itemIndex?: number 
  }[] = [
    { id: 'treatment', label: 'Treatment Plan', type: 'section', sectionId: 'treatment' },
    { id: 'progress', label: 'Progress Timeline', type: 'section', sectionId: 'progress' },
    { id: 'refer', label: 'Refer and Earn', type: 'section', sectionId: 'refer' },
    { id: 'support', label: 'Support', type: 'page', itemIndex: 4 },
    { id: 'details', label: 'Details', type: 'page', itemIndex: 6 },
  ]

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.type === 'section' && item.sectionId) {
      // Handle section navigation
      if (setActiveSection) {
        setActiveSection(item.sectionId)
      }
      setActiveItem(0)
      ref.current = 0
    } else if (item.type === 'page' && item.itemIndex !== undefined) {
      // Handle direct page navigation
      setActiveItem(item.itemIndex)
      ref.current = item.itemIndex
      if (setActiveSection) {
        setActiveSection('treatment')
      }
    }
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
      {/* Top Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#E0E0E0] px-6 md:px-10 py-6 bg-[#1E3F2B] backdrop-blur-sm sticky top-0 z-10">
        {/* Logo */}
        <div className="flex items-center gap-4 text-[#3C403D]">
          <Image src="https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240" alt="Formial" width={120} height={40} className="md:h-8 w-auto h-6" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-4">
          {/* Unified Navigation Tabs */}
          <div className="relative flex rounded-full bg-[#1E3F2B] border border-[#1E3F2B] overflow-hidden">
            {navItems.map((item) => {
              const isActive = isItemActive(item)
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative px-3 py-2 rounded-full text-sm font-medium transition-all focus:outline-none z-10 ${
                    hoveredItem === item.id && !isActive
                      ? 'opacity-80'
                      : ''
                  }`}
                  style={{
                    color: isActive ? '#1E3F2B' : 'white',
                  }}
                >
                  {item.label}
                </button>
              )
            })}
            {/* Animated Background - Single element for smooth animation */}
            {(() => {
              const activeIndex = navItems.findIndex(item => isItemActive(item))
              if (activeIndex === -1) return null
              
              return (
                <motion.div
                  layoutId="activeNavItem"
                  className="absolute inset-y-0 bg-[#7CB58D] rounded-full z-0 w-fit"
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
          
          <button className="flex items-center justify-center overflow-hidden rounded-full size-10 bg-[#EAE0D5]/50 hover:bg-[#EAE0D5] text-[#3C403D] transition-colors">
            <IconBell className="text-xl" />
          </button>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 text-[#3C403D] bg-[#EAE0D5]/50 hover:bg-[#EAE0D5] flex items-center justify-center">
            <IconUser className="text-xl" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center rounded-full size-8 bg-transparent text-white hover:bg-white/10 transition-colors"
        >
          {!isOpen ? <IconMenu2 className="h-5 w-5" /> : <IconX className="h-5 w-5" />}
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
            className="md:hidden fixed right-0 w-fit bg-[#1E3F2B] z-20"
          >
            <MobileSidebar 
              activeItem={activeItem} 
              setActiveItem={setActiveItem} 
              ref={ref}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar