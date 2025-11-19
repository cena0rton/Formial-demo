"use client"

import React, { useState, useRef, useEffect } from "react"
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
  const [name, setName] = useState(userDetails.name)
  const [phone, setPhone] = useState(userDetails.phone)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  const handleDigitChange = (index: number, value: string) => {
    // Only allow single digit
    if (!/^[0-9]?$/.test(value)) return
    
    const updated = [...otpDigits]
    updated[index] = value.slice(-1) // Take only the last character if multiple are pasted
    setOtpDigits(updated)

    // Auto-focus next input if a digit was entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (event.key === "Backspace") {
      if (otpDigits[index]) {
        // If current input has value, clear it
        const updated = [...otpDigits]
        updated[index] = ""
        setOtpDigits(updated)
      } else if (index > 0) {
        // If current input is empty, move to previous and clear it
        inputRefs.current[index - 1]?.focus()
        const updated = [...otpDigits]
        updated[index - 1] = ""
        setOtpDigits(updated)
      }
    }
    // Handle arrow keys
    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (event.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, startIndex: number) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").trim()
    const digits = pastedData.replace(/\D/g, "").slice(0, 4 - startIndex).split("")
    
    if (digits.length > 0) {
      const updated = [...otpDigits]
      digits.forEach((digit, idx) => {
        const targetIndex = startIndex + idx
        if (targetIndex < 4) {
          updated[targetIndex] = digit
        }
      })
      setOtpDigits(updated)
      
      // Focus the next empty input or the last input
      const nextEmptyIndex = updated.findIndex((d, idx) => idx >= startIndex && !d)
      const focusIndex = nextEmptyIndex === -1 ? Math.min(startIndex + digits.length - 1, 3) : nextEmptyIndex
      inputRefs.current[focusIndex]?.focus()
    }
  }

  const allDigitsFilled = otpDigits.every((digit) => digit.length === 1)
  const isFormValid = name.trim().length > 0 && phone.trim().length > 0 && allDigitsFilled

  const currentStepIndex: number = 0 // Verification step

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col w-full max-w-6xl mx-auto text-[#3D2D1F]"
      style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
    >
      {/* Mobile Progress Bar */}
      <div className="lg:hidden w-full px-8 pt-12">
        <div className="w-full bg-[#7CB58D] rounded-full px-8 py-4 flex items-center justify-between border border-[#5B4331]/50 shadow-[0_10px_30px_rgba(50,90,60,0.25)] border-b-2">
          <span className={`text-sm font-medium ${currentStepIndex === 0 ? 'text-black font-bold' : 'text-[#1E3F2B]'}`}>
            Verification
          </span>
          <span className={`text-sm font-medium ${currentStepIndex === 1 ? 'text-black font-bold' : 'text-[#1E3F2B]'}`}>
            Photo Upload
          </span>
          <span className={`text-sm font-medium ${currentStepIndex === 2 ? 'text-black font-bold' : 'text-[#1E3F2B]'}`}>
            Welcome
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center px-4 sm:px-6 md:px-10 py-0 md:py-30">
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
              <div key={step.title} className="relative flex lg:items-start gap-4">
                <div
                  className={`
                    hidden lg:flex relative z-10 mt-1 h-10 w-10 items-center justify-center rounded-2xl text-[#1E3F2B] shadow-md border border-black/60
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
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#6F5B4C] tracking-tight">WhatsApp Number</span>
            
              <div className="flex flex-wrap items-center justify-start gap-6 mt-2 w-full">
                <div className="w-fit sm:w-auto flex flex-col items-start justify-between gap-4">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-fit rounded-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
                  placeholder="Enter WhatsApp number"
                />
                <span className="text-xs text-[#6F5B4C]">Please ensure this is your personal WhatsApp number</span>
                </div>
                <div className="flex items-start justify-start gap-4 relative flex-wrap sm:flex-nowrap">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={digit}
                      onChange={(event) => handleDigitChange(index, event.target.value)}
                      onKeyDown={(event) => handleKeyDown(index, event)}
                      onPaste={(e) => handlePaste(e, index)}
                      className="h-12 w-12 rounded-full border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white text-center text-lg font-semibold text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
                      maxLength={1}
                      autoComplete="one-time-code"
                      aria-label={`OTP digit ${index + 1}`}
                    />
                  ))}
                  <div className="text-xs text-[#6F5B4C] pt-3 sm:pt-5 text-center">Send OTP</div>
                </div>
           
            </div>
            
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
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
            disabled={!isFormValid}
            className="box-border px-6 py-3 bg-[#1E3F2B] border-[0.767442px] border-[#1F3F2A] shadow-[0px_3.06977px_3.06977px_rgba(0,0,0,0.25)] rounded-full font-medium text-white flex items-center justify-center transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
         Verify & Continue
        </button>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-[#6F5B4C]">
          <IconShieldLock size={16} className="text-[#5B4331]" />
          <span>We encrypt your details and never share them without your permission.</span>
        </div>
      </motion.div>
      </div>
    </motion.div>
  )
}

