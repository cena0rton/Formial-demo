'use client'
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FormialUser, FormialPrescription } from '../../../utils/formialApi'

interface TreatmentPlanTestProps {
  user?: FormialUser | null
  latestPrescription?: FormialPrescription | null
  isLoading?: boolean
}

const fallbackTags = [
  { label: "pimples", color: "bg-pink-200 text-pink-900 border-pink-300" },
  { label: "dullness", color: "bg-yellow-200 text-yellow-900 border-yellow-300" },
  { label: "fine lines", color: "bg-orange-200 text-orange-900 border-orange-300" },
]

const TreatmentPlanTest = ({ user, latestPrescription, isLoading }: TreatmentPlanTestProps) => {
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
    
    // If we have tags, map them with colors
    if (allTags.length > 0) {
      return allTags.map((label, index) => ({
        label,
        color: fallbackTags[index % fallbackTags.length].color,
      }))
    }
    
    // Fallback to default tags if no user data
    return fallbackTags
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
  // Track months from plan start: if plan started on day X of month M, 
  // next shipment is day X of the next month from plan start
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
    const planStartDate = new Date(latestPrescription.createdAt)
    const planStartDay = planStartDate.getDate() // Day of month (1-31)
    const planStartMonth = planStartDate.getMonth() // Month (0-11)
    const planStartYear = planStartDate.getFullYear()

    // Get current date
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    // Calculate how many months have passed since plan start
    const monthsSinceStart = (currentYear - planStartYear) * 12 + (currentMonth - planStartMonth)

    // Next shipment is the same day of the NEXT month from plan start
    // If plan started on Jan 15 and we're in Jan, next shipment is Feb 15
    // If plan started on Jan 15 and we're in Feb, next shipment is Mar 15
    let nextShipmentMonth = planStartMonth + monthsSinceStart + 1
    let nextShipmentYear = planStartYear

    // Handle year rollover
    while (nextShipmentMonth > 11) {
      nextShipmentMonth -= 12
      nextShipmentYear += 1
    }

    // Create next shipment date with the same day as plan start
    const nextShipment = new Date(nextShipmentYear, nextShipmentMonth, planStartDay)

    // If the calculated date is in the past (shouldn't happen, but safety check),
    // move to the next month
    if (nextShipment < today) {
      nextShipmentMonth += 1
      if (nextShipmentMonth > 11) {
        nextShipmentMonth = 0
        nextShipmentYear += 1
      }
      nextShipment.setFullYear(nextShipmentYear)
      nextShipment.setMonth(nextShipmentMonth)
    }

    // Handle edge case: if plan started on day 31 and next month has fewer days
    // (e.g., Jan 31 -> Feb doesn't have 31 days, so use last day of Feb)
    const lastDayOfMonth = new Date(nextShipmentYear, nextShipmentMonth + 1, 0).getDate()
    if (planStartDay > lastDayOfMonth) {
      nextShipment.setDate(lastDayOfMonth)
    }

    return nextShipment
  }, [user, latestPrescription])

  // Calculate request changes by date: next shipment - 3 days
  const requestChangesByDate = useMemo(() => {
    if (!nextShipmentDate) return null
    const requestDate = new Date(nextShipmentDate)
    requestDate.setDate(requestDate.getDate() - 3)
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
          Treatment Plan (TEST)
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-black px-6 py-6">
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col w-full items-start gap-2">
            <div className="flex w-full items-center justify-between">
              <p className="text-sm text-[#3D2D1F]">Your plan is</p>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#7CB58D] text-[#1E3F2B] border border-[#1E3F2B]">
                {statusLabel}
              </span>
            </div>
            <div>
              <div className="flex gap-2 mt-4 flex-wrap">
                {treatmentTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
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
            {latestPrescription?.updatedAt
              ? (() => {
                  const date = new Date(latestPrescription.updatedAt)
                  date.setMonth(date.getMonth() + 3) // Add 3 months for expiry
                  return date.toLocaleDateString('en-US', {
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

export default TreatmentPlanTest

