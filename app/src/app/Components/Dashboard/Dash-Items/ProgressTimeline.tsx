'use client'
import React from 'react'
import { motion } from 'framer-motion'

const ProgressTimeline = () => {
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
        {/* Timeline Line - Thick black vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black"></div>

        {/* Timeline Content */}
        <div className="space-y-10 pb-8">
          {/* Today Section */}
          <div className="relative">
            {/* Timeline Marker - Small horizontal line extending from timeline */}
            <div className="absolute -left-10 top-3 w-8 h-0.5 bg-black"></div>
            <div className="mb-4">
              <p className="text-sm font-medium text-black">Today</p>
            </div>
            <div className="rounded-xl border-2 border-dashed border-black bg-gray-200 p-8 flex flex-col items-center justify-center min-h-[140px]">
              {/* Landscape Icon with Sun and Arrow */}
              <div className="mb-4 flex flex-col items-center">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Mountains - two peaks */}
                  <path d="M8 48 L20 28 L32 40 L44 24 L56 32 L56 48 L8 48 Z" fill="black" fillOpacity="0.15" stroke="black" strokeWidth="2"/>
                  {/* Sun */}
                  <circle cx="52" cy="20" r="6" fill="black" fillOpacity="0.15" stroke="black" strokeWidth="2"/>
                  {/* Arrow pointing up */}
                  <path d="M32 16 L32 8 M26 16 L32 8 L38 16" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm text-black font-medium">Click to upload</p>
            </div>
          </div>

          {/* 13 Jun 2025 Section */}
          <div className="relative">
            {/* Timeline Marker */}
            <div className="absolute -left-10 top-3 w-8 h-0.5 bg-black"></div>
            <div className="mb-4">
              <p className="text-sm font-medium text-black">13 Jun 2025</p>
            </div>
            <div className="flex gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-24 h-12 rounded-full bg-purple-500 border border-black"
                />
              ))}
            </div>
          </div>

          {/* 10 Jun 2025 Section */}
          <div className="relative">
            {/* Timeline Marker */}
            <div className="absolute -left-10 top-3 w-8 h-0.5 bg-black"></div>
            <div className="mb-4">
              <p className="text-sm font-medium text-black">10 Jun 2025</p>
            </div>
            <div className="flex gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-24 h-12 rounded-full bg-purple-500 border border-black"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProgressTimeline

