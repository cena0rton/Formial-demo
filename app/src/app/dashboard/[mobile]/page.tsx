'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Page from '../../Components/Dashboard/Page'
import { getAuthToken } from '../../utils/authToken'
import { getUserContact, setUserContact } from '../../utils/userContact'
import { verifyUserAuth, normalizeMobileFromUrl } from '../../utils/auth'
import { getUserWithAllData } from '../../utils/formialApi'

export default function DashboardPage() {
  const params = useParams()
  const router = useRouter()
  const mobileParam = params?.mobile as string
  const [isChecking, setIsChecking] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!mobileParam) {
          console.error('[DashboardPage] No mobile parameter found')
          router.push('/')
          return
        }

        const token = getAuthToken()
        const contact = getUserContact()
        const normalizedMobile = normalizeMobileFromUrl(mobileParam)

        console.log('[DashboardPage] Checking auth:', { mobileParam, hasToken: !!token, contact })

        if (!token) {
          // No token - redirect to mobile number route for OTP verification
          console.log('[DashboardPage] No token found, redirecting to login')
          router.push(`/${mobileParam}`)
          return
        }

        // Verify JWT token is valid
        const authResult = await verifyUserAuth(normalizedMobile)
        if (!authResult.isValid) {
          // JWT is invalid - redirect to mobile number route
          console.log('[DashboardPage] JWT token invalid, redirecting to login:', authResult.error)
          router.push(`/${mobileParam}`)
          return
        }

        // CRITICAL: Check if user has valid shopify_user_id from /with-all-data endpoint
        // Only users who have made payment (have shopify_user_id) can access dashboard
        try {
          const allData = await getUserWithAllData(normalizedMobile)
          const user = allData?.user
          
          if (!user || !user._id) {
            console.log('[DashboardPage] User not found, redirecting to login')
            router.push(`/${mobileParam}`)
            return
          }

          // Check if user has a valid shopify_user_id - required for dashboard access
          const hasValidShopifyUserId = !!(user.shopify_user_id && user.shopify_user_id.trim() !== '')
          
          if (!hasValidShopifyUserId) {
            console.log('[DashboardPage] User exists but has no valid shopify_user_id, denying access')
            router.push(`/${mobileParam}`)
            return
          }

          console.log('[DashboardPage] User has valid shopify_user_id, access granted')
        } catch (err) {
          console.error('[DashboardPage] Error checking shopify_user_id:', err)
          // If we can't verify shopify_user_id, deny access for security
          router.push(`/${mobileParam}`)
          return
        }

        // JWT is valid and user has shopify_user_id - ensure contact is stored
        if (contact !== normalizedMobile) {
          setUserContact(normalizedMobile)
        }

        console.log('[DashboardPage] JWT verified and shopify_user_id validated, showing dashboard')
        setIsChecking(false)
      } catch (error) {
        console.error('[DashboardPage] Error during auth check:', error)
        setError(error instanceof Error ? error.message : 'Failed to verify authentication')
        // Don't redirect on error - show error message instead
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [mobileParam, router])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F0E0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3F2B] mx-auto mb-4"></div>
          <p className="text-[#3D2D1F]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F0E0]">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push(`/${mobileParam}`)}
            className="px-4 py-2 bg-[#1E3F2B] text-white rounded-lg hover:bg-[#1E3F2B]/80 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return <Page />
}

