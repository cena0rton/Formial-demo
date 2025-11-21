'use client'
import React from 'react'
import { AnimatePresence } from 'framer-motion'
import TreatmentPlan from './TreatmentPlan'
import ProgressTimeline from './ProgressTimeline'
import ReferAndEarn from './ReferAndEarn'

type SectionType = 'treatment' | 'progress' | 'refer'

interface DashHomeProps {
  activeSection?: SectionType
}

const DashHome = ({ activeSection = 'treatment' }: DashHomeProps) => {
  return (
    <div className="w-full min-h-screen bg-[#F2F0E0]">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Section Content */}
        <AnimatePresence mode="wait">
          {activeSection === 'treatment' && <TreatmentPlan />}
          {activeSection === 'progress' && <ProgressTimeline />}
          {activeSection === 'refer' && <ReferAndEarn />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DashHome
