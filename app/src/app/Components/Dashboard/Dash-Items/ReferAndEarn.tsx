'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  IconCopy,
  IconBrandWhatsapp,
} from '@tabler/icons-react'

const ReferAndEarn = () => {
  const referralCode = "#c5f789b"

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    // You can add a toast notification here
  }

  const handleWhatsAppShare = () => {
    const message = `Use my referral code: ${referralCode}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
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

      {/* Headline */}
      <h2 className="text-xl font-medium text-[#3D2D1F] mb-4">
        Share the joy of great skin.
      </h2>

      {/* Description */}
      <p className="text-sm text-[#3D2D1F] mb-6">
        Invite someone to try Formial using your coupon code, and when your friend places their order, both of you will receive a ₹200 credit on your next order.
      </p>

      {/* Referral Code Section */}
      <div className="space-y-4 mb-8">
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
            onClick={handleWhatsAppShare}
            className="p-3 rounded-lg border border-[#1E3F2B] bg-white hover:bg-[#7CB58D]/10 transition-colors"
            aria-label="Share on WhatsApp"
          >
            <IconBrandWhatsapp className="h-5 w-5 text-[#1E3F2B]" />
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#3D2D1F]">Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#3D2D1F]">Friends joined</span>
            <span className="text-sm font-medium text-[#3D2D1F]">5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#3D2D1F]">Referral credit earned</span>
            <span className="text-sm font-medium text-[#3D2D1F]">₹1000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#3D2D1F]">Credit spent</span>
            <span className="text-sm font-medium text-[#3D2D1F]">₹300</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-[#1E3F2B]/20">
            <span className="text-sm font-medium text-[#3D2D1F]">Total credit remaining</span>
            <span className="text-sm font-bold text-[#1E3F2B]">₹700</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ReferAndEarn

