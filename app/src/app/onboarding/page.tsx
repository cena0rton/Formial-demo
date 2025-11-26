"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import OnboardingModal from "../Components/Dashboard/Dash-Items/OnboardingModal-new"

export default function OnboardingPage() {
  const router = useRouter()

  const handleOnboardingComplete = () => {
    // Onboarding complete - you can redirect to dashboard or set a flag
    // For now, just mark as complete in localStorage
    localStorage.setItem('formial-onboarding-completed', 'true')
    // Optionally redirect to dashboard
    // router.push('/')
  }

  return (
    <OnboardingModal onComplete={handleOnboardingComplete} />
  )
}

