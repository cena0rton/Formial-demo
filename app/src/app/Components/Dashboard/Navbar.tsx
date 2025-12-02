"use client"
import { IconBell, IconUser, IconGift, IconLogout, IconUserCircle } from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { clearAuthToken } from '../../utils/authToken'
import { clearUserContact, getUserContact } from '../../utils/userContact'
import { getUser } from '../../utils/formialApi'

type SectionType = 'treatment' | 'progress' | 'refer'

interface NavbarProps {
  activeItem?: number
  setActiveItem: (item: number) => void
  ref: React.RefObject<number | null>
  activeSection?: SectionType
  setActiveSection?: (section: SectionType) => void
}

const Navbar = ({activeItem, setActiveItem, ref, activeSection, setActiveSection}: NavbarProps) => {
  const router = useRouter()
  const [showLogoutMenu, setShowLogoutMenu] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [userPhone, setUserPhone] = useState<string | null>(null)

  // Fetch user details for dropdown
  useEffect(() => {
    const fetchUserDetails = async () => {
      const contact = getUserContact()
      if (contact) {
        try {
          const user = await getUser(contact)
          if (user) {
            const fullName = user.first_name && user.last_name 
              ? `${user.first_name} ${user.last_name}`.trim()
              : user.name || user.first_name || null
            setUserName(fullName)
            // Format phone number for display (remove + and format)
            const phoneDisplay = contact.replace(/^\+/, '').replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3')
            setUserPhone(phoneDisplay)
          }
        } catch {
          // If fetch fails, use contact as fallback
          const phoneDisplay = contact.replace(/^\+/, '').replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3')
          setUserPhone(phoneDisplay)
        }
      }
    }
    fetchUserDetails()
  }, [])

  // Handle logout
  const handleLogout = () => {
    // Get mobile number from contact BEFORE clearing it
    const contact = getUserContact()
    const mobileNumber = contact?.replace(/[^0-9]/g, '') || ''
    
    // Clear token and contact from localStorage
    clearAuthToken()
    clearUserContact()
    
    // Redirect to login page (mobile number route)
    if (mobileNumber) {
      router.push(`/${mobileNumber}`)
    } else {
      // If no contact, redirect to home
      router.push('/')
    }
    
    setShowLogoutMenu(false)
  }

  // Navigation items - 4 tabs for mobile, Personal Details moved to user dropdown
  const navItems: { 
    id: string; 
    label: string; 
    type: 'section' | 'page'; 
    sectionId?: SectionType; 
    itemIndex?: number 
  }[] = [
    { id: 'treatment', label: 'Home', type: 'section', sectionId: 'treatment' },
    { id: 'support', label: 'Consult / Support', type: 'page', itemIndex: 4 },
    { id: 'discover', label: 'Discover', type: 'page', itemIndex: 2 },
    { id: 'payments', label: 'Payments', type: 'page', itemIndex: 7 },
    // Personal Details removed from tabs - now in user dropdown
  ]
  
  // Handle Personal Details click from dropdown
  const handlePersonalDetailsClick = () => {
    setActiveItem(6)
    ref.current = 6
    if (setActiveSection) {
      setActiveSection('treatment')
    }
    setShowLogoutMenu(false)
  }

  // Handle Refer & Earn click
  const handleReferEarnClick = () => {
    if (setActiveSection) {
      setActiveSection('refer')
    }
    setActiveItem(0)
    ref.current = 0
  }

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
    // Navigation handled
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
          <button
            onClick={handleReferEarnClick}
            className={`flex items-center justify-center overflow-hidden rounded-full size-10 bg-white/10 hover:bg-white/20 text-white transition-colors ${
              activeSection === 'refer' && activeItem === 0 ? 'bg-white/20' : ''
            }`}
            aria-label="Refer & Earn"
          >
            <IconGift className="text-xl" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowLogoutMenu(!showLogoutMenu)}
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 text-white bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="User menu"
            >
              <IconUser className="text-xl" />
            </button>
            
            {/* Logout Dropdown Menu */}
            <AnimatePresence>
              {showLogoutMenu && (
                <>
                  {/* Backdrop to close menu on outside click */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowLogoutMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-[#CBBEAD] py-3 min-w-[200px] z-50"
                  >
                    {/* User Details Box */}
                    {(userName || userPhone) && (
                      <div className="px-4 py-3 border-b border-[#CBBEAD]/30 mb-2">
                        {userName && (
                          <div className="text-sm font-semibold text-[#1E3F2B] mb-1">
                            {userName}
                          </div>
                        )}
                        {userPhone && (
                          <div className="text-xs text-[#6F5B4C]">
                            {userPhone}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Personal Details Button */}
                    <button
                      onClick={handlePersonalDetailsClick}
                      className="w-full px-4 py-2 text-left text-sm text-[#1E3F2B] hover:bg-[#F2F0E0] transition-colors flex items-center gap-2"
                    >
                      <IconUserCircle className="h-4 w-4" />
                      <span>Personal Details</span>
                    </button>
                    
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-[#1E3F2B] hover:bg-[#F2F0E0] transition-colors flex items-center gap-2"
                    >
                      <IconLogout className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Centered Navigation Bar - Sticky below green header */}
      <nav className="sticky top-[72px] md:top-[72px] z-40 bg-[#FEFCE8] border-b border-black/20">
        <div className="max-w-7xl mx-auto px-0 md:px-6 ">
        
          <div className="flex items-center justify-center">
            <div className="relative flex overflow-hidden w-full md:max-w-2xl max-w-lg mt-3 ">
              {/* Show only 4 tabs - hide Personal Details from tabs */}
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