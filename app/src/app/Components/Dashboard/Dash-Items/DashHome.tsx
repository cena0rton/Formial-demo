'use client'
import React, { useMemo } from 'react'
import TreatmentPlan from './TreatmentPlan'
import ProgressTimeline from './ProgressTimeline'
import ReferAndEarn from './ReferAndEarn'
import { FormialPrescription, FormialUser } from '../../../utils/formialApi'

type SectionType = 'treatment' | 'progress' | 'refer'

interface DashHomeProps {
  activeSection?: SectionType
  user?: FormialUser | null
  prescriptions?: FormialPrescription[]
  isLoading?: boolean
  onRefetch?: () => void
}

const DashHome = ({
  activeSection = 'treatment',
  user,
  prescriptions = [],
  isLoading,
  onRefetch,
}: DashHomeProps) => {
  // Get the latest prescription (most recent by createdAt)
  const latestPrescription = useMemo(() => {
    if (!prescriptions || prescriptions.length === 0) return null
    const sorted = [...prescriptions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return sorted[0]
  }, [prescriptions])

  return (
    <div className="w-full min-h-screen bg-[#F2F0E0]">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
        {/* Show Treatment Plan and Progress Timeline together on home */}
        {activeSection === 'treatment' && (
          <>
            <TreatmentPlan
              user={user}
              latestPrescription={latestPrescription}
              isLoading={isLoading}
            />
            <ProgressTimeline 
              prescriptions={prescriptions} 
              isLoading={isLoading}
              contact={user?.contact || null}
              onRefetch={onRefetch}
            />
          </>
        )}
        {activeSection === 'progress' && (
          <ProgressTimeline 
            prescriptions={prescriptions} 
            isLoading={isLoading}
            contact={user?.contact || null}
          />
        )}
        {activeSection === 'refer' && <ReferAndEarn contact={user?.contact || null} />}
      </div>
    </div>
  )
}

export default DashHome
