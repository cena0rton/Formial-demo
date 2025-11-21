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
  const [hoveredSection, setHoveredSection] = useState<SectionType | null>(null)

  const sections: { id: SectionType; label: string }[] = [
    { id: 'treatment', label: 'Treatment Plan' },
    { id: 'progress', label: 'Progress Timeline' },
    { id: 'refer', label: 'Refer and Earn' },
  ]

  const handleSectionClick = (sectionId: SectionType) => {
    if (setActiveSection) {
      setActiveSection(sectionId)
    }
    // Set activeItem to 0 (Home) when clicking sections
    setActiveItem(0)
    ref.current = 0
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
          {/* Section Tabs */}
          <div className="relative flex rounded-full bg-[#1E3F2B] border border-[#1E3F2B] overflow-hidden">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all focus:outline-none z-10 ${
                  hoveredSection === section.id && activeSection !== section.id
                    ? 'opacity-80'
                    : ''
                }`}
                style={{
                  color: activeSection === section.id ? 'white' : 'white',
                }}
              >
                {section.label}
              </button>
            ))}
            {/* Animated Background */}
            {activeSection && (
              <motion.div
                layoutId="activeSection"
                className="absolute inset-y-0 bg-[#7CB58D] rounded-full z-0"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                style={{
                  width: `${100 / sections.length}%`,
                  left: `${(sections.findIndex(s => s.id === activeSection)) * (100 / sections.length)}%`,
                }}
              />
            )}
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