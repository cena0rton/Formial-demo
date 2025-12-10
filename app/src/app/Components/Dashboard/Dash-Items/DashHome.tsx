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
            {/* View Consultancy and Pharmacy Notes */}
            <div className="w-full flex items-center justify-center my-6">
              <button
                className="group w-full max-w-md px-6 py-4 rounded-2xl bg-white border border-[#CBBEAD] text-[#3D2D1F] text-sm font-semibold hover:bg-[#F8F6EE] transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-between"
                style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#3D2D1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>View consultancy and pharmacy notes</span>
                </span>
                <svg className="w-4 h-4 text-[#3D2D1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
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
