"use client"

import React, { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { IconClock, IconReload, } from "@tabler/icons-react"

interface WelcomeStep3Props {
  phoneNumber: string
  onBack: () => void
  onNext: () => void
  onResend?: () => void
}

export default function WelcomeStep3({ phoneNumber, onBack, onNext, onResend }: WelcomeStep3Props) {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const formattedPhone = useMemo(() => {
    if (!phoneNumber) return ""
    const trimmed = phoneNumber.replace(/\s+/g, "")
    if (trimmed.length < 4) return phoneNumber
    const lastFour = trimmed.slice(-4)
    return `${phoneNumber.slice(0, -4).replace(/[0-9]/g, "*")}${lastFour}`
  }, [phoneNumber])

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return

    const nextOtp = [...otp]
    nextOtp[index] = value
    setOtp(nextOtp)

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (otp[index]) {
        const nextOtp = [...otp]
        nextOtp[index] = ""
        setOtp(nextOtp)
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const isOtpComplete = otp.every((digit) => digit !== "")

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col tracking-tight items-center justify-center gap-6 px-6 md:px-16 py-6 w-full max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className="text-center space-y-4"
      >
      
        <h2 className="md:text-2xl text-xl  font-medium text-[#1E3F2B] leading-tight text-left">
          Verify it’s really you
        </h2>
        <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto text-left">
          We’ve sent a 4-digit verification code to{" "}{formattedPhone}.<br/>
          Enter the code to continue with your
          personalised onboarding journey.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.45, type: "spring", stiffness: 120 }}
        className="w-full"
      >
        <div className=" rounded-[24px] border border-[#1E3F2B]/10  px-6 md:px-12 py-10 md:py-12 space-y-10">
          <div className="flex flex-col items-center justify-center gap-6 mx-auto">
            <div className="grid grid-cols-4 gap-4 md:gap-4 mx-auto">
              {otp.map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                  className="relative"
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(event) => handleChange(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    className="md:w-12 w-10 aspect-square rounded-lg border border-[#1E3F2B]/20 bg-[#F6F4E5] text-xl md:text-2xl font-medium text-[#1E3F2B] text-center outline-none focus:border-[#1E3F2B] focus:ring-1 focus:ring-[#1E3F2B]/10 transition-all placeholder:text-gray-300"
                    aria-label={`OTP digit ${index + 1}`}
                    autoComplete="one-time-code"
                  />
                  
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#F2F0E0]/70 ">
                <IconClock size={16} className="text-[#1E3F2B]" />
                <span>Code expires in 04:32</span>
              </div>
              <button
                type="button"
                onClick={onResend}
                className="inline-flex items-center gap-2 text-[#1E3F2B] font-medium hover:underline"
              >
                <IconReload size={16} />
                Resend code
              </button>
            </div>
          </div>

        
        </div>

        <div className="flex flex-row items-center justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={onBack}
              className="w-fit md:w-auto rounded-full border border-[#1E3F2B]/30 text-[#1E3F2B] px-6 py-3 font-medium hover:bg-[#1E3F2B]/10 transition-all"
            >
              Go back
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!isOtpComplete}
              className="w-fit md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3F2B] px-9 py-3 font-semibold text-white cursor-pointer hover:bg-[#163021] transition-all disabled:bg-[#1E3F2B]/30 disabled:shadow-none disabled:cursor-not-allowed"
            >
             
              Verify & continue
            </button>
          </div>
      </motion.div>
    </motion.div>
  )
}


