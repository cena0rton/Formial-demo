'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { getUserWithAllData, UserWithAllDataResponse, FormialPrescription } from '../../utils/formialApi'
import TreatmentPlanTest from '../../Components/Dashboard/Dash-Items/TreatmentPlanTest'

const TestPage = () => {
  const params = useParams()
  const mobile = params?.mobile as string
  
  const [data, setData] = useState<UserWithAllDataResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Normalize mobile number: ensure it starts with +
  const normalizedMobile = useMemo(() => {
    if (!mobile) return null
    // Remove any existing + and spaces
    const cleaned = mobile.replace(/[+\s]/g, '')
    // Add + prefix
    return `+${cleaned}`
  }, [mobile])

  useEffect(() => {
    if (!normalizedMobile) {
      setError('No mobile number provided')
      return
    }

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await getUserWithAllData(normalizedMobile)
        setData(response)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load data'
        setError(message)
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [normalizedMobile])

  // Get latest prescription
  const latestPrescription = useMemo(() => {
    if (!data?.prescriptions || data.prescriptions.length === 0) return null
    const sorted = [...data.prescriptions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return sorted[0]
  }, [data?.prescriptions])

  return (
    <div className="w-full min-h-screen bg-[#F2F0E0]">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Test Header */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h1 className="text-lg font-bold text-yellow-900 mb-2">Test Page - Treatment Plan</h1>
          <p className="text-sm text-yellow-800">
            Mobile: <span className="font-mono font-semibold">{normalizedMobile || 'N/A'}</span>
          </p>
          {error && (
            <p className="text-sm text-red-600 mt-2">Error: {error}</p>
          )}
        </div>

        {/* Treatment Plan Component */}
        <TreatmentPlanTest
          user={data?.user || null}
          latestPrescription={latestPrescription}
          isLoading={isLoading}
        />

        {/* Debug Info */}
        {data && !isLoading && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-sm font-bold text-gray-900 mb-2">Debug Info:</h2>
            <div className="text-xs text-gray-700 space-y-1">
              <p><strong>User Name:</strong> {data.user?.name || 'N/A'}</p>
              <p><strong>Contact:</strong> {data.user?.contact || 'N/A'}</p>
              <p><strong>Concerns:</strong> {data.user?.concerns?.join(', ') || 'None'}</p>
              <p><strong>Skin Issues:</strong> {data.user?.skin_issues?.join(', ') || 'None'}</p>
              <p><strong>Prescriptions Count:</strong> {data.prescriptions?.length || 0}</p>
              <p><strong>Latest Prescription ID:</strong> {latestPrescription?._id || 'N/A'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TestPage

