'use client'
import React, { useState } from 'react'
import { IconCalendar, IconProgress, IconShare, IconUser, IconUserCircle } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type SectionType = 'treatment' | 'progress' | 'refer'

interface MobileSidebarProps {
  activeItem?: number
  setActiveItem: (item: number) => void
  ref: React.RefObject<number | null>
  activeSection?: SectionType
  setActiveSection?: (section: SectionType) => void
}

const MobileSidebar = ({ activeItem, setActiveItem, ref, activeSection, setActiveSection}: MobileSidebarProps) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)

    // Unified navigation items - all links in one array
    const navItems: { 
      id: string; 
      label: string; 
      icon: React.ReactNode;
      type: 'section' | 'page'; 
      sectionId?: SectionType; 
      itemIndex?: number 
    }[] = [
      { id: 'treatment', label: 'Treatment Plan', icon: <IconCalendar className='h-5 w-5'/>, type: 'section', sectionId: 'treatment' },
      { id: 'progress', label: 'Progress Timeline', icon: <IconProgress className='h-5 w-5'/>, type: 'section', sectionId: 'progress' },
      { id: 'refer', label: 'Refer and Earn', icon: <IconShare className='h-5 w-5'/>, type: 'section', sectionId: 'refer' },
      { id: 'support', label: 'Support', icon: <IconUser className='h-5 w-5'/>, type: 'page', itemIndex: 4 },
      { id: 'details', label: 'Details', icon: <IconUserCircle className='h-5 w-5'/>, type: 'page', itemIndex: 6 },
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
    <div>
         <div className='bg-[#1E3F2B] py-4 px-2 w-74 right-0 h-fit block md:hidden rounded-bl-3xl border-br-3xl border border-white/10'>
          
            
            <nav className='px-2 text-white'>
              {/* Unified Navigation Container */}
              <div className="relative flex flex-col rounded-xl bg-[#1E3F2B] border border-[#1E3F2B] overflow-hidden">
                {navItems.map((item) => {
                  const isActive = isItemActive(item)
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`relative flex items-center justify-start space-x-3 px-4 py-3 rounded-full text-sm font-medium transition-all focus:outline-none z-10 ${
                        hoveredItem === item.id && !isActive
                          ? 'opacity-80'
                          : ''
                      }`}
                      style={{
                        color: isActive ? '#1E3F2B' : 'white',
                      }}
                    >
                      <span className='h-5 w-5' style={{ color: isActive ? '#1E3F2B' : 'white' }}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  )
                })}
                {/* Animated Background - Single element for smooth animation */}
                {(() => {
                  const activeIndex = navItems.findIndex(item => isItemActive(item))
                  if (activeIndex === -1) return null
                  
                  return (
                    <motion.div
                      layoutId="activeNavItemMobile"
                      className="absolute inset-x-0 bg-[#7CB58D] rounded-full z-0"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      style={{
                        height: `${100 / navItems.length}%`,
                        top: `${activeIndex * (100 / navItems.length)}%`,
                      }}
                    />
                  )
                })()}
              </div>
            </nav>
        </div>
    </div>
  )
}

export default MobileSidebar