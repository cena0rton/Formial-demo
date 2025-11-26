'use client'
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FormialPrescription } from '../../../utils/formialApi'

interface ProgressTimelineProps {
  prescriptions?: FormialPrescription[]
  isLoading?: boolean
}

const ProgressTimeline = ({ prescriptions = [], isLoading }: ProgressTimelineProps) => {
  const sortedPrescriptions = useMemo(() => {
    return [...prescriptions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [prescriptions])

  const formatDate = (dateString?: string) =>
    dateString ? new Date(dateString).toLocaleDateString() : "Pending"
  return (
    <motion.div
      key="progress"
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
          Progress Timeline
        </div>
      </div>

      <div className="relative pl-10">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black"></div>

        <div className="space-y-10 pb-8">
          <div className="relative">
            <div className="absolute -left-10 top-3 w-8 h-0.5 bg-black"></div>
            <div className="mb-4">
              <p className="text-sm font-medium text-black">Today</p>
            </div>
            <div className="rounded-xl border-2 border-dashed border-black bg-gray-50 p-6 flex flex-col gap-2">
              <p className="text-sm text-black font-medium">Ready for your next upload?</p>
              <p className="text-xs text-gray-600">
                Keep your clinician updated with fresh pictures to track progress.
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="space-y-4 animate-pulse">
              {[1, 2].map((item) => (
                <div key={item} className="h-16 bg-gray-200 rounded-xl" />
              ))}
            </div>
          )}

          {!isLoading && sortedPrescriptions.length === 0 && (
            <p className="text-sm text-gray-600">
              Once your first prescription is uploaded, it will appear here.
            </p>
          )}

          {!isLoading &&
            sortedPrescriptions.map((prescription) => (
              <div className="relative" key={prescription._id}>
                <div className="absolute -left-10 top-3 w-8 h-0.5 bg-black"></div>
                <div className="mb-2">
                  <p className="text-sm font-medium text-black">
                    {formatDate(prescription.createdAt)}
                  </p>
                </div>
                <div className="rounded-xl border border-black bg-white p-4 space-y-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Clinician: {prescription.clinician_name || "Pending"}
                  </p>
                  <p className="text-sm text-[#3D2D1F]">
                    {prescription.clinician_remarks || "Remarks will appear after review."}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {["front_image", "left_image", "right_image"].map((key) => {
                      const url = prescription[key as keyof FormialPrescription]
                      if (!url || typeof url !== "string") return null
                      return (
                        <img
                          key={key}
                          src={url}
                          alt={key}
                          className="w-16 h-16 object-cover rounded-lg border border-black/20"
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ProgressTimeline

