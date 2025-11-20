'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconCopy,
  IconShare,
  IconCamera,
} from '@tabler/icons-react'

type SectionType = 'treatment' | 'progress' | 'refer'

const DashHome = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('treatment')
  const [hoveredSection, setHoveredSection] = useState<SectionType | null>(null)
  const referralCode = "#c5f789b"

  const sections: { id: SectionType; label: string }[] = [
    { id: 'treatment', label: 'Treatment Plan' },
    { id: 'progress', label: 'Progress Timeline' },
    { id: 'refer', label: 'Refer and Earn' },
  ]

  const treatmentTags = [
    { label: "pimples", color: "bg-pink-200 text-pink-900 border-pink-300" },
    { label: "dullness", color: "bg-yellow-200 text-yellow-900 border-yellow-300" },
    { label: "fine lines", color: "bg-orange-200 text-orange-900 border-orange-300" },
  ]

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    // You can add a toast notification here
  }

  const handleShareCode = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Refer and Earn',
        text: `Use my referral code: ${referralCode}`,
      })
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#F2F0E0]">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Section Buttons */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative flex w-full max-w-xl rounded-full bg-[#7CB58D] divide-x-0 divide-[#1E3F2B]/30 border border-[#1E3F2B] overflow-hidden">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`relative flex-1 px-6 py-3 rounded-full text-sm font-medium transition-all focus:outline-none z-10 ${
                  hoveredSection === section.id && activeSection !== section.id
                    ? 'opacity-80'
                    : ''
                }`}
                style={{
                  color: activeSection === section.id ? 'white' : '#1E3F2B',
                }}
              >
                {section.label}
              </button>
            ))}
            {/* Animated Background */}
            <motion.div
              layoutId="activeSection"
              className="absolute inset-y-0 bg-[#1E3F2B] rounded-full z-0"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
              style={{
                width: `${100 / sections.length}%`,
                left: `${(sections.findIndex(s => s.id === activeSection)) * (100 / sections.length)}%`,
              }}
            />
          </div>
        </div>

        {/* Section Content */}
        <AnimatePresence mode="wait">
          {activeSection === 'treatment' && (
            <motion.div
              key="treatment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-3xl border border-black px-6 py-6">
                {/* Top Row: Status, Tags, and Active Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col w-full items-start gap-2">
                    <div className="flex w-full items-center justify-between">
                    <p className="text-sm text-[#3D2D1F]">Your plan is</p>
                     <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#7CB58D] text-[#1E3F2B] border border-[#1E3F2B]">
                    active
                  </span>
                  </div>
                    <div>
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
                    </div>
                  </div>
                 
                </div>

                {/* Treatment Details */}
                <div className="mb-6">
                  <p className="text-sm text-[#3D2D1F] mb-2">
                    <span className="font-semibold">Treatment plan:</span>
                  </p>
                  <p className="text-sm text-[#3D2D1F]">
                    Tretinoin 0.018% + Niacinamide 5% in a Hyaluronic Acid base AA - 24ml
                  </p>
                </div>

                {/* Dates - Two Column Layout */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-[#3D2D1F] mb-1">Next shipment</p>
                    <p className="text-sm font-semibold text-[#3D2D1F]">Nov 29, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#3D2D1F] mb-1">Request changes by</p>
                    <p className="text-sm font-semibold text-[#3D2D1F]">Nov 26, 2025</p>
                  </div>
                </div>

                {/* Expires Date - Full Width */}
                <div>
                  <p className="text-sm text-[#3D2D1F] mb-1">Expires on</p>
                  <p className="text-sm font-semibold text-[#3D2D1F]">Nov 12, 2025</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative pl-6">
                {/* Timeline Line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#1E3F2B]/30"></div>

                {/* Timeline Content */}
                <div className="space-y-8 pb-8">
                  {/* Today Section */}
                  <div className="relative">
                    <div className="mb-2">
                      <p className="text-sm font-medium text-[#3D2D1F]">Today</p>
                    </div>
                    <div className="rounded-xl border-2 border-dashed border-[#1E3F2B] bg-white p-6 flex flex-col items-center justify-center min-h-[120px]">
                      <IconCamera className="h-8 w-8 text-[#1E3F2B] mb-2" />
                      <p className="text-sm text-[#3D2D1F]">Click to upload</p>
                    </div>
                  </div>

                  {/* 13 Jun 2025 Section */}
                  <div className="relative">
                    <div className="mb-2">
                      <p className="text-sm font-medium text-[#3D2D1F]">13 Jun 2025</p>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="w-20 h-10 rounded-full bg-purple-500"
                        />
                      ))}
                    </div>
                  </div>

                  {/* 10 Jun 2025 Section */}
                  <div className="relative">
                    <div className="mb-2">
                      <p className="text-sm font-medium text-[#3D2D1F]">10 Jun 2025</p>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="w-20 h-10 rounded-full bg-purple-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'refer' && (
            <motion.div
              key="refer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <p className="text-sm font-medium text-[#3D2D1F]">Referral code</p>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={referralCode}
                    readOnly
                    className="flex-1 rounded-xl border border-[#1E3F2B] bg-white px-4 py-3 text-sm text-[#3D2D1F] focus:outline-none"
                  />
                  <button
                    onClick={handleCopyCode}
                    className="p-3 rounded-lg border border-[#1E3F2B] bg-white hover:bg-[#7CB58D]/10 transition-colors"
                    aria-label="Copy referral code"
                  >
                    <IconCopy className="h-5 w-5 text-[#1E3F2B]" />
                  </button>
                  <button
                    onClick={handleShareCode}
                    className="p-3 rounded-lg border border-[#1E3F2B] bg-white hover:bg-[#7CB58D]/10 transition-colors"
                    aria-label="Share referral code"
                  >
                    <IconShare className="h-5 w-5 text-[#1E3F2B]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DashHome
