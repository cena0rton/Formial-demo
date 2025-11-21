'use client'
import React, { useState } from 'react'
import { IconCalendar, IconProgress, IconShare } from '@tabler/icons-react'
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

const MobileSidebar = ({ setActiveItem, ref, activeSection, setActiveSection}: MobileSidebarProps) => {
    const [hoveredSection, setHoveredSection] = useState<SectionType | null>(null)

    const sections: { id: SectionType; label: string; icon: React.ReactNode }[] = [
      { id: 'treatment', label: 'Treatment Plan', icon: <IconCalendar className='h-5 w-5'/> },
      { id: 'progress', label: 'Progress Timeline', icon: <IconProgress className='h-5 w-5'/> },
      { id: 'refer', label: 'Refer and Earn', icon: <IconShare className='h-5 w-5'/> },
    ]

      const handleSectionClick = (sectionId: SectionType) => {
        if (setActiveSection) {
          setActiveSection(sectionId)
        }
        setActiveItem(0)
        ref.current = 0
      }
    
  return (
    <div>
         <div className='bg-[#1E3F2B] py-4 px-2 w-74 fixed top-16 right-0 h-fit border-[#1E3F2B] block md:hidden'>
            <div className='flex justify-start items-center px-2 mb-8'>
                <h1 className='text-xl font-medium'>
                    <Image src="https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240" alt="Formial Logo" height={75} width={75}/>
                   
                </h1>
            </div>
            
            <nav className='px-2 text-white'>
              {/* Section Tabs Container */}
              <div className="relative flex flex-col rounded-xl bg-[#1E3F2B] border border-[#1E3F2B] overflow-hidden">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    className={`relative flex items-center justify-start space-x-3 px-4 py-3 rounded-full text-sm font-medium transition-all focus:outline-none z-10 ${
                      hoveredSection === section.id && activeSection !== section.id
                        ? 'opacity-80'
                        : ''
                    }`}
                    style={{
                      color: activeSection === section.id ? 'white' : 'white',
                    }}
                  >
                    <span className='h-5 w-5' style={{ color: activeSection === section.id ? 'white' : 'white' }}>
                      {section.icon}
                    </span>
                    <span>{section.label}</span>
                  </button>
                ))}
                {/* Animated Background */}
                {activeSection && (
                  <motion.div
                    layoutId="activeSectionMobile"
                    className="absolute inset-x-0 bg-[#7CB58D] rounded-full z-0"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    style={{
                      height: `${100 / sections.length}%`,
                      top: `${(sections.findIndex(s => s.id === activeSection)) * (100 / sections.length)}%`,
                    }}
                  />
                )}
              </div>
            </nav>
        </div>
    </div>
  )
}

export default MobileSidebar