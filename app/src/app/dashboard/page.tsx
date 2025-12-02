'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardRootPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page if accessing /dashboard without mobile number
    router.push('/')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2F0E0]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3F2B] mx-auto mb-4"></div>
        <p className="text-[#3D2D1F]">Redirecting...</p>
      </div>
    </div>
  )
}

