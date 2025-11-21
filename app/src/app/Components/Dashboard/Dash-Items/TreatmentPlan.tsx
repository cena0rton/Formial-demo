'use client'
import React from 'react'
import { motion } from 'framer-motion'

const TreatmentPlan = () => {
  const treatmentTags = [
    { label: "pimples", color: "bg-pink-200 text-pink-900 border-pink-300" },
    { label: "dullness", color: "bg-yellow-200 text-yellow-900 border-yellow-300" },
    { label: "fine lines", color: "bg-orange-200 text-orange-900 border-orange-300" },
  ]

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
  )
}

export default TreatmentPlan

