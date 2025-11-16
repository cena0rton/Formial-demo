"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { IconShieldLock, IconUser, IconCamera, IconRocket } from "@tabler/icons-react"

interface WelcomeStep2Props {
  userDetails: {
    name: string
    phone: string
    address: string
  }
  onNext: () => void
  onBack: () => void
  onRefresh?: () => void
}

const timeline = [
  {
    title: "Verify your details",
    subtitle: "Verify your WhatsApp number",
    icon: <IconUser size={20} stroke={1.8} />,
  },
  {
    title: "Upload your pictures",
    subtitle: "Ensure quality for higher accuracy",
    icon: <IconCamera size={20} stroke={1.8} className="text-[#937272]" />,
  },
  {
    title: "Welcome to Formial",
    subtitle: "Here's your personalised dashboard",
    icon: <IconRocket size={20} stroke={1.8} className="text-[#937272]" />,
  },
]

export default function WelcomeStep2({ userDetails, onNext, onBack }: WelcomeStep2Props) {
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(4).fill(""))

  const handleDigitChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return
    const updated = [...otpDigits]
    updated[index] = value
    setOtpDigits(updated)
  }

  const allDigitsFilled = otpDigits.every((digit) => digit.length === 1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col lg:flex-row gap-10 items-center justify-center w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-30 text-[#3D2D1F]"
      style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
        className="w-full lg:max-w-sm h-full"
      >
        <div className="relative lg:bg-[#7CB58D] bg-transparent text-[#1E3F2B] rounded-[32px] px-6 py-2 lg:px-8 lg:py-10 lg:border border-[#325A3C] lg:shadow-[0_10px_30px_rgba(50,90,60,0.25)]">
          <div className="absolute left-12 top-16 bottom-16 w-[2px] bg-[#1E3F2B]/50 hidden md:block" />
          <div className="flex lg:flex-col flex-row lg:gap-8 gap-2 justify-center items-center lg:justify-start lg:items-start">
            {timeline.map((step, idx) => (
              <div key={step.title} className="relative flex lgitems-start gap-4">
                <div
                  className={`
                    relative z-10 mt-1 flex h-10 w-10 items-center justify-center rounded-2xl text-[#1E3F2B] shadow-md border border-black/60
                    ${idx === 0 ? "bg-white" : "bg-gray-300"}
                  `}
                >
                  {step.icon}
                </div>
                <div>
                  <p className="hidden lg:block font-medium text-lg tracking-tight">
                    {step.title}
                  </p>
                  <p className="hidden lg:block text-sm text-[#1E3F2B]/80">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className="relative flex-1 rounded-[32px] px-8 md:px-12 "
      >
        <div className="space-y-4">
         
          <h2
            className="text-2xl md:text-xl text-[#5B4331] tracking-tight font-medium leading-tight"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Please review your details before proceeding.
          </h2>
          <p className="text-sm md:text-base text-[#6F5B4C] max-w-xl">
            Accurate information helps us reach you directly and provide a personalised experience.
          </p>
          <div className="w-full h-px bg-[#5B4331]/30 mt-4" />
        </div>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <span className="text-sm font-semibold text-[#6F5B4C] tracking-tight">Name</span>
            <input
              value={userDetails.name}
              readOnly
              className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white/60 px-5 py-3 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]"
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#6F5B4C] tracking-tight">WhatsApp Number</span>
            
              <div className="flex flex-wrap items-center justify-start gap-4 mt-2 w-full">
                <div className="w-full sm:w-auto">
                <input
                  value={userDetails.phone}
                  readOnly
                  className="w-full rounded-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white/60 px-5 py-3 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]"
                />
                </div>
                <div className="flex items-start justify-start gap-3 relative flex-wrap sm:flex-nowrap">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      value={digit}
                      onChange={(event) => handleDigitChange(index, event.target.value)}
                      className="h-12 w-12 rounded-full border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white text-center text-lg font-semibold text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]"
                      maxLength={1}
                    />
                  ))}
                  <div className="text-xs text-[#6F5B4C] pt-3 sm:pt-5 sm:absolute sm:right-0 sm:top-10">Verify OTP</div>
                </div>
           
            </div>
            
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-[#5B4331]/30 px-6 py-3 text-sm font-semibold text-[#5B4331] hover:bg-[#5B4331]/5 transition-colors"
          >
            Go back
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!allDigitsFilled}
            className="box-border px-6 py-3 bg-[#90C494] border-[0.767442px] border-[#1F3F2A] shadow-[0px_3.06977px_3.06977px_rgba(0,0,0,0.25)] rounded-full font-medium text-[#1F3F2A] flex items-center justify-center transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            Continue
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-[#6F5B4C]">
          <IconShieldLock size={16} className="text-[#5B4331]" />
          <span>We encrypt your details and never share them without your permission.</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

