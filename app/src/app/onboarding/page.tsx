"use client"

import OnboardingModal from "../Components/Dashboard/Dash-Items/OnboardingModal-new"

export default function OnboardingPage() {
  const handleOnboardingComplete = () => {
    // Onboarding complete - you can redirect to dashboard or set a flag
    // For now, just mark as complete in localStorage
    localStorage.setItem('formial-onboarding-completed', 'true')
  }

  return (
    <OnboardingModal onComplete={handleOnboardingComplete} />
  )
}

