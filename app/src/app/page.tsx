"use client"

import { useState, useEffect } from "react"
import OnboardingModal from "./Components/Dashboard/Dash-Items/OnboardingModal-new"
import MobileNumberModal from "./Components/Dashboard/Dash-Items/MobileNumberModal"
import { getAuthToken } from "./utils/authToken"
import { getUserContact } from "./utils/userContact"
import { verifyUserAuth } from "./utils/auth"

export default function Home() {
  const [showMobileModal] = useState(true)
  const [isChecking, setIsChecking] = useState(true)

  // Check if user already has a valid JWT token (already logged in)
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
    const token = getAuthToken()
    const contact = getUserContact()
    
    if (token && contact) {
        try {
          // Verify JWT token is valid
          const authResult = await verifyUserAuth(contact)
          if (authResult.isValid) {
            // JWT is valid - redirect to dashboard
      const mobileForUrl = contact.replace(/^\+/, '')
            window.location.href = `/dashboard/${mobileForUrl}`
      return
          } else {
            // JWT is invalid - clear it and show mobile number modal
            console.log('[Home] JWT token invalid, clearing')
          }
        } catch (error) {
          console.error('[Home] JWT verification error:', error)
        }
    }
    setIsChecking(false)
    }
    
    checkAuthAndRedirect()
  }, [])

  const handleOnboardingComplete = () => {
    // Onboarding complete - redirect to dashboard
    const contact = getUserContact()
    if (contact) {
      const mobileForUrl = contact.replace(/^\+/, '')
      window.location.href = `/${mobileForUrl}`
    }
  }

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F0E0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3F2B] mx-auto mb-4"></div>
          <p className="text-[#3D2D1F]">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Onboarding Screen */}
      <OnboardingModal onComplete={handleOnboardingComplete} />
      
      {/* Mobile Number Modal */}
      <MobileNumberModal isOpen={showMobileModal} />
    </>
  )
}
