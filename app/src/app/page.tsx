"use client"

import { useState, useEffect } from "react"
import OnboardingModal from "./Components/Dashboard/Dash-Items/OnboardingModal-new"
import MobileNumberModal from "./Components/Dashboard/Dash-Items/MobileNumberModal"
import Page from "./Components/Dashboard/Page"
import { getAuthToken } from "./utils/authToken"
import { getUserContact } from "./utils/userContact"

export default function Home() {
  const [showMobileModal, setShowMobileModal] = useState(true)
  const [isChecking, setIsChecking] = useState(true)

  // Check if user already has a token (already logged in)
  useEffect(() => {
    const token = getAuthToken()
    const contact = getUserContact()
    
    if (token && contact) {
      // User already logged in, redirect to their mobile number route
      const mobileForUrl = contact.replace(/^\+/, '')
      window.location.href = `/${mobileForUrl}`
      return
    }
    setIsChecking(false)
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
