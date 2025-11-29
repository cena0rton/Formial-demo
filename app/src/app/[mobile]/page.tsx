"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Page from "../Components/Dashboard/Page"
import OnboardingModal from "../Components/Dashboard/Dash-Items/OnboardingModal-new"
import { verifyUserAuth, normalizeMobileFromUrl } from "../utils/auth"
import { getUser, getUserWithAllData } from "../utils/formialApi"
import { setUserContact } from "../utils/userContact"
import { getAuthToken } from "../utils/authToken"
import { hasCompletedOnboarding } from "../utils/onboardingStatus"

export default function UserPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const mobileParam = params?.mobile as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mobileNumber, setMobileNumber] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const checkUserAndAuth = async () => {
      if (!mobileParam) {
        setError("Mobile number is required.")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        // Normalize mobile number
        const normalizedMobile = normalizeMobileFromUrl(mobileParam)
        setMobileNumber(normalizedMobile)

        // Check if user has token (from OTP verification)
        const token = getAuthToken()
        
        if (!token) {
          // No token - user coming from Shopify or first visit
          // First check URL query params (from Shopify redirect)
          const nameFromQuery = searchParams?.get('name') || searchParams?.get('first_name')
          if (nameFromQuery) {
            setUserName(nameFromQuery)
          }
          
          // Try to fetch user data by mobile number (if they already exist)
          try {
            const user = await getUser(normalizedMobile)
            if (user?.name || user?.first_name) {
              setUserName(user.name || user.first_name || nameFromQuery || null)
            }
          } catch {
            // User doesn't exist yet - will be created during onboarding
            // Name from query params already set above if available
          }
          setShowOnboarding(true)
          setIsLoading(false)
          return
        }

        // Has token - verify user exists and JWT is valid
        const authResult = await verifyUserAuth(normalizedMobile)

        if (!authResult.isValid) {
          setError(authResult.error || "Authentication failed.")
          // If user doesn't exist or auth failed, show onboarding
          setShowOnboarding(true)
          setIsLoading(false)
          return
        }

        // User is authenticated, check if onboarding is complete
        try {
          // Fetch user data with prescriptions to check if photos are uploaded
          const allData = await getUserWithAllData(normalizedMobile)
          const user = allData?.user
          
          if (!user) {
            setShowOnboarding(true)
            return
          }
          
          // Store contact for dashboard use
          setUserContact(normalizedMobile)
          
          // Store user name for onboarding
          if (user?.name || user?.first_name) {
            setUserName(user.name || user.first_name || null)
          }
          
          // Check if user has completed onboarding by checking prescriptions
          // User has completed onboarding if they have uploaded photos (prescriptions exist)
          const onboardingComplete = hasCompletedOnboarding(user, allData)

          if (!onboardingComplete) {
            setShowOnboarding(true)
          } else {
            setIsAuthenticated(true)
          }
        } catch {
          // User doesn't exist yet - show onboarding which will create the user
          setShowOnboarding(true)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to verify user. Please try again.")
        setShowOnboarding(true)
      } finally {
        setIsLoading(false)
      }
    }

    checkUserAndAuth()
  }, [mobileParam, searchParams])

  const handleOnboardingComplete = () => {
    // After onboarding, user should be authenticated
    setIsAuthenticated(true)
    setShowOnboarding(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F0E0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3F2B] mx-auto mb-4"></div>
          <p className="text-[#3D2D1F]">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (error && !showOnboarding) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F0E0] px-4">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push(`/${mobileParam}`)}
            className="px-4 py-2 bg-[#1E3F2B] text-white rounded-lg hover:bg-[#1E3F2B]/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (showOnboarding) {
    return (
      <OnboardingModal 
        onComplete={handleOnboardingComplete} 
        mobileNumber={mobileNumber}
        initialUserName={userName}
      />
    )
  }

  if (isAuthenticated) {
    return <Page />
  }

  return null
}
