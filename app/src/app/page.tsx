"use client"

import { useState, useEffect } from "react"
import Page from "./Components/Dashboard/Page";
import OnboardingModal from "./Components/Dashboard/Dash-Items/OnboardingModal-new";

export default function Home()
 {
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    // Check if onboarding is completed on mount
    const onboardingCompleted = localStorage.getItem('formial-onboarding-completed')
    setShowDashboard(onboardingCompleted === 'true')
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem('formial-onboarding-completed', 'true')
    setShowDashboard(true)
  }

  return (
    <>
      {showDashboard ? <Page /> : <OnboardingModal onComplete={handleOnboardingComplete} />}
    </>
  );
}
