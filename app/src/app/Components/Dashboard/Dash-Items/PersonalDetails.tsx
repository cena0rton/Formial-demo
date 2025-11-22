/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { IconEdit } from '@tabler/icons-react'

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    name: 'Ashmit Arya',
    whatsapp: '+91 9315516968',
    address: '123, XYZ, BANGALORE',
  })

  const [otp, setOtp] = useState(['', '', '', ''])
  const otpInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      otpInputRefs[index + 1].current?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus()
    }
  }

  const handleVerifyOtp = () => {
    // TODO: Verify OTP via API
    const otpString = otp.join('')
    if (otpString.length === 4) {
      // API call to verify OTP
      console.log('Verifying OTP:', otpString)
    }
  }

  const handleSave = () => {
    // TODO: API call to update user details
    console.log('Saving:', formData)
  }

  return (
    <div className="w-full min-h-screen bg-[#F2F0E0]">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <motion.div
          key="details"
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
              Details
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#3D2D1F]">Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full rounded-xl border border-[#1E3F2B] bg-white px-4 py-3 pr-10 text-sm text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]/20"
                />
                <IconEdit className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1E3F2B]" />
              </div>
            </div>

            {/* WhatsApp Number Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#3D2D1F]">WhatsApp Number</label>
              <div className="flex items-start gap-3">
                <div className="relative flex-1">
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    className="w-full rounded-xl border border-[#1E3F2B] bg-white px-4 py-3 pr-10 text-sm text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]/20"
                  />
                  <IconEdit className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1E3F2B]" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={otpInputRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-10 h-10 rounded-full border border-[#1E3F2B] bg-white text-center text-sm text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]/20"
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleVerifyOtp}
                    className="text-xs text-[#1E3F2B] font-medium hover:underline"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#3D2D1F]">Address</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full rounded-xl border border-[#1E3F2B] bg-white px-4 py-3 pr-10 text-sm text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]/20"
                />
                <IconEdit className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1E3F2B]" />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-3 rounded-full bg-[#1E3F2B] text-white text-sm font-bold hover:bg-[#1E3F2B]/90 transition-colors mt-6"
              style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
            >
              SAVE
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PersonalDetails

