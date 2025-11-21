'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  IconCopy,
  IconShare,
} from '@tabler/icons-react'

const ReferAndEarn = () => {
  const referralCode = "#c5f789b"

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
    <motion.div
      key="refer"
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
          Refer and Earn
        </div>
      </div>

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
  )
}

export default ReferAndEarn

