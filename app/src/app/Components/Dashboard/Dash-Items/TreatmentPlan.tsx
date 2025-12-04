'use client'
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FormialUser, FormialPrescription } from '../../../utils/formialApi'

interface TreatmentPlanProps {
  user?: FormialUser | null
  latestPrescription?: FormialPrescription | null
  isLoading?: boolean
}

const tagColors = [
  "bg-pink-200 text-pink-900 border-pink-300",
  "bg-yellow-200 text-yellow-900 border-yellow-300",
  "bg-orange-200 text-orange-900 border-orange-300"
]

function getFirstName(user: FormialUser | null | undefined): string {
  if (!user) return "there"
  if (typeof user === "object") {
    // Try all possible user name props in order
    if (
      "full_name" in user &&
      typeof user.full_name === "string" &&
      user.full_name.trim().length > 0
    ) {
      return user.full_name.split(" ")[0]
    }
    if (
      "first_name" in user &&
      typeof user.first_name === "string" &&
      user.first_name.trim().length > 0
    ) {
      return user.first_name
    }
    if (
      "name" in user &&
      typeof user.name === "string" &&
      user.name.trim().length > 0
    ) {
      return user.name.split(" ")[0]
    }
  }
  return "there"
}

const TreatmentPlan = ({ user, latestPrescription, isLoading }: TreatmentPlanProps) => {
  const userFirstName = getFirstName(user)

  const treatmentTags = useMemo(() => {
    const allTags: string[] = []

    // Add concerns
    if (user?.concerns?.length) {
      allTags.push(...user.concerns)
    }

    // Add skin_issues
    if (user?.skin_issues?.length) {
      allTags.push(...user.skin_issues)
    }

    // Only return tags if present, else empty array
    if (allTags.length > 0) {
      return allTags.map((label, index) => ({
        label,
        color: tagColors[index % tagColors.length],
      }))
    }

    // No default tags!
    return []
  }, [user?.concerns, user?.skin_issues])

  const statusLabel = useMemo(() => {
    if (latestPrescription?.prescription_completed) return "completed"
    if (latestPrescription || user?.prescribed) return "active"
    return "pending"
  }, [latestPrescription, user?.prescribed])
  const clinician = latestPrescription?.clinician_name || "Formial clinician"
  const clinicianRemarks = latestPrescription?.clinician_remarks

  // Build treatment plan description from prescription formulation
  const buildTreatmentPlan = useMemo(() => {
    if (!latestPrescription) {
      return "Your personalised formulation will appear here once your consultation is complete."
    }

    const components: string[] = []

    if (latestPrescription.tretinoin !== undefined && latestPrescription.tretinoin > 0) {
      components.push(`Tretinoin ${latestPrescription.tretinoin}%`)
    }

    if (latestPrescription.niacinamide !== undefined && latestPrescription.niacinamide > 0) {
      components.push(`Niacinamide ${latestPrescription.niacinamide}%`)
    }

    if (latestPrescription.azelaic_acid !== undefined && latestPrescription.azelaic_acid > 0) {
      components.push(`Azelaic Acid ${latestPrescription.azelaic_acid}%`)
    }

    if (components.length > 0) {
      return `${components.join(" + ")} in a Hyaluronic Acid base`
    }

    if (clinicianRemarks) {
      return clinicianRemarks
    }

    return `${clinician} is finalising your personalised formulation.`
  }, [latestPrescription, clinicianRemarks, clinician])

  const planDescription = buildTreatmentPlan

  // Calculate next shipment date based on plan start date
  // Next shipment is the same day of month as plan start, recurring monthly
  // First shipment is always one month after plan start
  const nextShipmentDate = useMemo(() => {
    if (!latestPrescription?.createdAt) {
      // Fallback: if no prescription, use current date + 30 days
      if (!user) return null
      const today = new Date()
      const nextShipment = new Date(today)
      nextShipment.setDate(today.getDate() + 30)
      return nextShipment
    }

    // Get plan start date from prescription createdAt
    // Parse the date string and extract components to avoid timezone issues
    const planStartDate = new Date(latestPrescription.createdAt)
    const planStartDay = planStartDate.getDate() // Day of month (1-31)
    const planStartMonth = planStartDate.getMonth()
    const planStartYear = planStartDate.getFullYear()
    
    // Create a normalized plan start date (start of day, local time)
    const normalizedPlanStart = new Date(planStartYear, planStartMonth, planStartDay)
    
    // Get current date components (year, month, day only - no time)
    const today = new Date()
    const todayYear = today.getFullYear()
    const todayMonth = today.getMonth()
    const todayDay = today.getDate()

    // Helper function to compare dates (year, month, day only)
    const isDateBefore = (date1: Date, year2: number, month2: number, day2: number) => {
      const year1 = date1.getFullYear()
      const month1 = date1.getMonth()
      const day1 = date1.getDate()
      
      if (year1 < year2) return true
      if (year1 > year2) return false
      if (month1 < month2) return true
      if (month1 > month2) return false
      return day1 < day2
    }

    // First shipment is always one month after plan start
    // Calculate the first shipment date (plan start + 1 month)
    let firstShipmentMonth = planStartMonth + 1
    let firstShipmentYear = planStartYear
    
    if (firstShipmentMonth > 11) {
      firstShipmentMonth = 0
      firstShipmentYear += 1
    }
    
    // Get the last day of the target month to handle edge cases (e.g., Jan 31 -> Feb)
    const lastDayOfFirstMonth = new Date(firstShipmentYear, firstShipmentMonth + 1, 0).getDate()
    const firstTargetDay = Math.min(planStartDay, lastDayOfFirstMonth)
    
    let nextShipment = new Date(firstShipmentYear, firstShipmentMonth, firstTargetDay)

    // If the first shipment date has passed (is today or in the past), keep moving forward
    // until we find a future date
    while (isDateBefore(nextShipment, todayYear, todayMonth, todayDay)) {
      const currentMonth = nextShipment.getMonth()
      const currentYear = nextShipment.getFullYear()
      
      // Move to next month
      let nextMonth = currentMonth + 1
      let nextYear = currentYear
      
      if (nextMonth > 11) {
        nextMonth = 0
        nextYear += 1
      }
      
      // Get the last day of the target month to handle edge cases (e.g., Jan 31 -> Feb)
      const lastDayOfNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate()
      const nextTargetDay = Math.min(planStartDay, lastDayOfNextMonth)
      
      nextShipment = new Date(nextYear, nextMonth, nextTargetDay)
    }

    return nextShipment
  }, [user, latestPrescription])

  // Calculate request changes by date: next shipment - 3 days
  const requestChangesByDate = useMemo(() => {
    if (!nextShipmentDate) return null
    const requestDate = new Date(nextShipmentDate)
    requestDate.setDate(requestDate.getDate() - 3)
    // Ensure we don't go into negative dates (shouldn't happen, but safety check)
    if (requestDate.getTime() < 0) {
      return new Date(0) // Return epoch start as fallback
    }
    return requestDate
  }, [nextShipmentDate])

  // Format date helper
  const formatDate = (date: Date | null) => {
    if (!date) return "TBD"
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      key="treatment"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Button */}
      <div className="flex items-center justify-center mb-6">
        <div className="px-6 py-3 rounded-full bg-[#7CB58D] border border-[#1E3F2B] text-[#1E3F2B] text-sm tracking-tighter font-bold"
        style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
        >
          Treatment Plan
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] px-6 py-6">
        {isLoading && (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        )}
        {!isLoading && (
        <>
        {/* Top Row: Status, Tags, and Active Badge */}
        <div className="flex items-center justify-between mb-6 tracking-tight">
          <div className="flex flex-col w-full items-start gap-2">
            <div className="flex w-full items-center justify-between">
              <p className="text-sm text-[#3D2D1F]">
                Hey {userFirstName}, Your plan is
              </p>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 border border-green-400">
                {statusLabel}
              </span>
            </div>
            <div>
              {treatmentTags.length > 0 ? (
                <div className="flex gap-2 mt-4">
                  {treatmentTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${tag.color}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-4 text-xs italic text-[#777]">
                  Wait till we review your pictures type
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Treatment Details */}
        <div className="mb-6">
          <p className="text-sm text-[#3D2D1F] mb-2">
            <span className="font-semibold">Treatment plan:</span>
          </p>
          <p className="text-sm text-[#3D2D1F]">
            {planDescription}
          </p>
        </div>

        {/* Dates - Two Column Layout */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-[#3D2D1F] mb-1">Next shipment</p>
            <p className="text-sm font-semibold text-[#3D2D1F]">
              {formatDate(nextShipmentDate)}
            </p>
          </div>
          <div>
            <p className="text-sm text-[#3D2D1F] mb-1">Request changes by</p>
            <p className="text-sm font-semibold text-[#3D2D1F]">
              {formatDate(requestChangesByDate)}
            </p>
          </div>
        </div>

        {/* Expires Date - Full Width */}
        <div>
          <p className="text-sm text-[#3D2D1F] mb-1">Expires on</p>
          <p className="text-sm font-semibold text-[#3D2D1F]">
            {latestPrescription?.createdAt
              ? (() => {
                  const date = new Date(latestPrescription.createdAt)
                  const year = date.getFullYear()
                  const month = date.getMonth()
                  const day = date.getDate()
                  
                  // Add 3 months, handling year rollover and month length edge cases
                  let expiryMonth = month + 3
                  let expiryYear = year
                  
                  if (expiryMonth > 11) {
                    expiryYear += Math.floor(expiryMonth / 12)
                    expiryMonth = expiryMonth % 12
                  }
                  
                  // Handle edge case: if original date is day 31 and target month has fewer days
                  const lastDayOfExpiryMonth = new Date(expiryYear, expiryMonth + 1, 0).getDate()
                  const expiryDay = Math.min(day, lastDayOfExpiryMonth)
                  
                  const expiryDate = new Date(expiryYear, expiryMonth, expiryDay)
                  return expiryDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                })()
              : "TBD"}
          </p>
        </div>
        </>
        )}
      </div>
    </motion.div>
  )
}

export default TreatmentPlan

