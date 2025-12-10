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
            {/* Consultancy and Pharmacy Notes */}
            <div className="w-full space-y-4 my-6 mb-8 tracking-tight">
              
             
              {/* Pharmacy Notes Card */}
              <div className="bg-[#F8F6EE] rounded-2xl border border-[#644a34] border-dashed p-5 flex items-center gap-4  transition-shadow duration-200">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-[#3D2D1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#3D2D1F] mb-1">Pharmacy Notes</h3>
                  <p className="text-sm text-[#3D2D1F]">
                    Access your prescription details, formulation information, and pharmacy instructions.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button className="px-5 py-2 cursor-pointer bg-[#644a34] text-white text-sm font-medium rounded-full hover:bg-[#1E3F2B] transition-colors duration-200">
                    View
                  </button>
                </div>
              </div>
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
