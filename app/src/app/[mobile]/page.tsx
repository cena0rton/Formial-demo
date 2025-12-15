"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import OnboardingModal from "../Components/Dashboard/Dash-Items/OnboardingModal-new"
import LoginPage from "../Components/Dashboard/Dash-Items/LoginPage"
import { verifyUserAuth, normalizeMobileFromUrl } from "../utils/auth"
import { getUser, getUserWithAllData } from "../utils/formialApi"
import { setUserContact, getUserContact } from "../utils/userContact"
import { getAuthToken, clearAuthToken } from "../utils/authToken"

export default function UserPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const mobileParam = params?.mobile as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated] = useState(false) // Used for redirect check, but never set since we redirect immediately
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mobileNumber, setMobileNumber] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [userHasImages, setUserHasImages] = useState(false)

  useEffect(() => {
    const checkUserAndAuth = async () => {
      if (!mobileParam) {
        setError("Mobile number is required.")
        setIsLoading(false)
        return
      }

      // If already authenticated, don't re-check
      if (isAuthenticated) {
        console.log('[UserPage] Already authenticated, skipping check')
        return
      }
      
      // Normalize mobile number
      const normalizedMobile = normalizeMobileFromUrl(mobileParam)
      setMobileNumber(normalizedMobile)
      
      // FIRST: Check if user has a valid JWT token - verify it before proceeding
      const existingToken = getAuthToken()
      const existingContact = getUserContact()
      
      if (existingToken) {
        // Normalize contacts for comparison
        const normalizeForComparison = (contact: string) => {
          return contact.replace(/[\s+]/g, '').replace(/\D/g, '')
        }
        
        const existingContactNormalized = existingContact ? normalizeForComparison(existingContact) : ''
        const urlContactNormalized = normalizeForComparison(normalizedMobile)
        
        // If contacts match (or no contact stored), verify JWT token
        if (!existingContact || existingContactNormalized === urlContactNormalized) {
          try {
            const authResult = await verifyUserAuth(normalizedMobile)
            if (authResult.isValid) {
              // JWT token is valid - redirect to dashboard route
              setUserContact(normalizedMobile)
              const mobileForUrl = mobileParam.replace(/^\+/, '').replace(/\D/g, '')
              router.push(`/dashboard/${mobileForUrl}`)
              return
            } else {
              // JWT token is invalid - clear it and continue with normal flow
              console.log('[UserPage] JWT token invalid, clearing:', authResult.error)
              clearAuthToken()
            }
          } catch (authError) {
            console.error('[UserPage] JWT verification error:', authError)
            clearAuthToken()
          }
        } else {
          // Contact mismatch - clear token and continue
          console.log('[UserPage] Contact mismatch, clearing session')
          clearAuthToken()
        }
      }
      
      try {
        setIsLoading(true)
        setError(null)
        setUserNotFound(false)

        // FIRST: Check if user exists in the system
        let userExists = false
        let userHasShopifyOrder = false
        try {
          const user = await getUser(normalizedMobile)
          if (user && user._id) {
            userExists = true
            
            // Check if user has a Shopify order ID - required for onboarding
            // User must have purchased from Formial to proceed
            userHasShopifyOrder = !!(user.shopify_order_id || user.shopify_user_id || user.purchases && user.purchases > 0)
            
            if (user?.first_name || user?.last_name || user?.name) {
              const fullName = user.first_name && user.last_name 
                ? `${user.first_name} ${user.last_name}`.trim()
                : user.name || user.first_name || null
              setUserName(fullName)
            }
          }
        } catch (err) {
          // User doesn't exist - check if it's a 404 or similar
          const errorMessage = err instanceof Error ? err.message : String(err)
          if (errorMessage.includes('404') || errorMessage.includes('not found') || errorMessage.includes('does not exist')) {
            setUserNotFound(true)
            setIsLoading(false)
            return
          }
          // Other errors - user might not exist
          setUserNotFound(true)
          setIsLoading(false)
          return
        }

        // If user doesn't exist, show error page
        if (!userExists) {
          setUserNotFound(true)
          setIsLoading(false)
          return
        }

        // If user exists but has no Shopify order, they can't onboard
        // They need to purchase from Formial first
        if (!userHasShopifyOrder) {
          setUserNotFound(true)
          setIsLoading(false)
          return
        }

        // User exists - check if they have images uploaded
        // Fetch user data with prescriptions to check if photos are uploaded
        let allData
        try {
          allData = await getUserWithAllData(normalizedMobile)
        } catch {
          // If we can't fetch data, show onboarding
          const nameFromQuery = searchParams?.get('name') || searchParams?.get('first_name')
          if (nameFromQuery) {
            setUserName(nameFromQuery)
          }
          setShowOnboarding(true)
          setIsLoading(false)
          return
        }

        const user = allData?.user
        if (!user) {
          setShowOnboarding(true)
          setIsLoading(false)
          return
        }

        // Store user name
        if (user?.first_name || user?.last_name || user?.name) {
          const fullName = user.first_name && user.last_name 
            ? `${user.first_name} ${user.last_name}`.trim()
            : user.name || user.first_name || null
          setUserName(fullName)
        }

        // Check if user has uploaded images
        // User has images if they have at least one prescription with at least one image
        const prescriptions = allData?.prescriptions || []
        
        // Check each prescription for valid image URLs
        const hasImages = prescriptions.length > 0 && 
          prescriptions.some(prescription => {
            const frontImg = prescription.front_image
            const leftImg = prescription.left_image
            const rightImg = prescription.right_image
            
            // Check if any image exists and is a valid URL string
            const hasFront = frontImg && typeof frontImg === 'string' && frontImg.trim() !== '' && frontImg !== 'null' && frontImg.startsWith('http')
            const hasLeft = leftImg && typeof leftImg === 'string' && leftImg.trim() !== '' && leftImg !== 'null' && leftImg.startsWith('http')
            const hasRight = rightImg && typeof rightImg === 'string' && rightImg.trim() !== '' && rightImg !== 'null' && rightImg.startsWith('http')
            
            return hasFront || hasLeft || hasRight
          })

        // Also check user.image_uploaded flag as fallback (though it may be false even with images)
        const hasImageFlag = user?.image_uploaded === true
        
        // User has images if prescriptions check passes (primary check)
        // Note: image_uploaded flag may be false even when images exist, so we prioritize prescriptions check
        const userHasImagesValue = hasImages || hasImageFlag
        setUserHasImages(userHasImagesValue)

        // Debug logging
        console.log('[UserPage] Image check:', {
          prescriptionsCount: prescriptions.length,
          hasImages,
          hasImageFlag,
          userHasImages: userHasImagesValue,
          userImageUploadedFlag: user?.image_uploaded,
          prescriptions: prescriptions.map(p => ({
            id: p._id,
            front: !!p.front_image && typeof p.front_image === 'string' && p.front_image.startsWith('http'),
            left: !!p.left_image && typeof p.left_image === 'string' && p.left_image.startsWith('http'),
            right: !!p.right_image && typeof p.right_image === 'string' && p.right_image.startsWith('http'),
            frontValue: p.front_image?.substring(0, 50) + '...',
          }))
        })

        // Case 1: If user has images uploaded, show login page (OTP verification)
        if (userHasImagesValue) {
          // Ensure we have user name for login page if needed
          if (!userName && (user?.first_name || user?.last_name || user?.name)) {
            const fullName = user.first_name && user.last_name 
              ? `${user.first_name} ${user.last_name}`.trim()
              : user.name || user.first_name || ""
            setUserName(fullName)
          }
          
          // Check URL query params for name (from Shopify redirect)
          const nameFromQuery = searchParams?.get('name') || searchParams?.get('first_name')
          if (nameFromQuery && !userName) {
            setUserName(nameFromQuery)
          }
          
          // Show login page for OTP verification
          setShowLogin(true)
          setIsLoading(false)
          return
        }

        // Case 2: User exists but has no images - proceed with normal onboarding
        // First check URL query params (from Shopify redirect)
        const nameFromQuery = searchParams?.get('name') || searchParams?.get('first_name')
        if (nameFromQuery) {
          setUserName(nameFromQuery)
        }
        setShowOnboarding(true)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to verify user. Please try again.")
        setShowOnboarding(true)
      } finally {
        setIsLoading(false)
      }
    }

    checkUserAndAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileParam, searchParams])

  const handleOnboardingComplete = () => {
    // After onboarding, redirect to dashboard route
    if (mobileNumber) {
      setUserContact(mobileNumber)
      const mobileForUrl = mobileNumber.replace(/^\+/, '').replace(/\D/g, '')
      router.push(`/dashboard/${mobileForUrl}`)
    }
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

  // User not found - show error page
  if (userNotFound) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F0E0] px-4">
        <div className="text-center max-w-md w-full">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image 
              src="https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240" 
              alt="Formial" 
              width={180} 
              height={60} 
              className="w-auto h-auto" 
            />
          </div>
          
          {/* Error Message */}
          <div className="space-y-6">
            <p className="text-base md:text-lg text-[#1E3F2B] leading-relaxed">
              Sorry we don&apos;t have you registered at Formial yet.
            </p>
            <p className="text-base md:text-lg text-[#1E3F2B] leading-relaxed">
              Visit{" "}
              <a 
                href="https://formial.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#7CB58D] hover:text-[#1E3F2B] underline font-medium transition-colors"
              >
                Formial.in
              </a>
              {" "}and get going..
            </p>
          </div>
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

  // Show login page for users with images who need OTP verification
  if (showLogin && mobileNumber && userName) {
    return (
      <LoginPage
        userName={userName}
        mobileNumber={mobileNumber}
      />
    )
  }

  // Show onboarding only for users WITHOUT images
  if (showOnboarding && !userHasImages) {
    return (
      <OnboardingModal 
        onComplete={handleOnboardingComplete} 
        mobileNumber={mobileNumber}
        initialUserName={userName}
      />
    )
  }

  // This route should never show dashboard - redirect authenticated users to dashboard route
  // Dashboard is only shown on /dashboard/{mobileNumber} route
  if (isAuthenticated && mobileNumber) {
    const mobileForUrl = mobileNumber.replace(/^\+/, '').replace(/\D/g, '')
    router.push(`/dashboard/${mobileForUrl}`)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F0E0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3F2B] mx-auto mb-4"></div>
          <p className="text-[#3D2D1F]">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return null
}
