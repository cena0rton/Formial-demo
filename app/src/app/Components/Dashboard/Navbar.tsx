"use client"
import { IconUser, IconGift, IconLogout, IconUserCircle } from '@tabler/icons-react'
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
  const [isHoveringUser, setIsHoveringUser] = useState(false)

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

  // Handle outside clicks/touches to close menu
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement
      // Check if click is outside the dropdown
      if (showLogoutMenu && !target.closest('[data-user-dropdown]')) {
        setShowLogoutMenu(false)
        setIsHoveringUser(false)
      }
    }

    if (showLogoutMenu) {
      // Add both mouse and touch event listeners
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('touchstart', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [showLogoutMenu])

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

  // Navigation items - Refer and Earn added back to tabs
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
    { id: 'refer', label: 'Refer and Earn', type: 'section', sectionId: 'refer' },
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
          {/* User Button with Dropdown */}
          <div 
            className="relative"
            data-user-dropdown
            onMouseEnter={() => {
              // Only enable hover on non-touch devices
              if (window.matchMedia('(hover: hover)').matches) {
                setIsHoveringUser(true)
              }
            }}
            onMouseLeave={() => {
              if (window.matchMedia('(hover: hover)').matches) {
                setIsHoveringUser(false)
              }
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowLogoutMenu(!showLogoutMenu)
                // On mobile, disable hover when clicking
                if (!window.matchMedia('(hover: hover)').matches) {
                  setIsHoveringUser(false)
                }
              }}
              className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 text-white bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ${
                showLogoutMenu || isHoveringUser ? 'bg-white/20' : ''
              }`}
              aria-label="User menu"
            >
              <IconUser className="text-xl" />
            </button>
            
            {/* User Details Dropdown Menu */}
            <AnimatePresence>
              {(showLogoutMenu || isHoveringUser) && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -right-4 top-12 backdrop-blur-xl backdrop-saturate-150 rounded-2xl shadow-2xl border border-white/20 py-0 min-w-[240px] z-50 overflow-hidden pb-1.5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.75) 100%)',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.5)'
                    }}
                    onMouseEnter={() => {
                      if (window.matchMedia('(hover: hover)').matches) {
                        setIsHoveringUser(true)
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.matchMedia('(hover: hover)').matches) {
                        setIsHoveringUser(false)
                      }
                    }}
                    onClick={(e) => {
                      // Prevent clicks inside dropdown from closing it
                      e.stopPropagation()
                    }}
                    data-user-dropdown
                  >
                    {/* User Details Box - Glassmorphism Styling */}
                    {(userName || userPhone) && (
                      <div className="px-4 py-3.5 to-transparent border-b border-white/30 backdrop-blur-sm">
                        {userName && (
                          <div className="flex items-center gap-3">
                         
                            <div className="text-lg w-full font-medium tracking-tight text-[#1E3F2B] truncate font-instrument-serif italic">
                              Hi{""}, {userName}
                            </div>
                          </div>
                        )}
                        
                      </div>
                    )}
                    
                    <div className="px-2 py-1">
                      {/* Personal Details Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePersonalDetailsClick()
                          setShowLogoutMenu(false)
                          setIsHoveringUser(false)
                        }}
                        className="w-full px-3 py-2.5 text-left text-sm text-[#1E3F2B] hover:bg-gradient-to-r hover:from-[#7CB58D]/20 hover:to-[#7CB58D]/10 rounded-lg transition-all duration-200 flex items-center gap-3 group"
                      >
                        <div className="p-1.5 rounded-full group-hover:bg-white/60 backdrop-blur-sm transition-all">
                          <IconUserCircle className="h-4 w-4 text-[#6F5B4C] group-hover:text-[#1E3F2B] transition-colors" />
                        </div>
                        <span className="font-medium">Personal Details</span>
                      </button>
                      
                      {/* Divider */}
                      <div className="border-t border-white/20 mx-2"></div>
                      
                      {/* Logout Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLogout()
                          setShowLogoutMenu(false)
                          setIsHoveringUser(false)
                        }}
                        className="w-full px-3 py-2.5 text-left text-sm text-[#DC2626] hover:bg-gradient-to-r hover:from-red-50/80 hover:to-red-50/60 rounded-lg transition-all duration-200 flex items-center gap-3 group"
                      >
                        <div className="p-1.5 rounded-lg bg-white/40 group-hover:bg-red-50/60 backdrop-blur-sm transition-all">
                          <IconLogout className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Centered Navigation Bar - Sticky below green header */}
      <nav className="sticky top-[72px] md:top-[72px] z-40 bg-[#eae8d8] border- border-black/20">
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