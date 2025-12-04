"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { sendWhatsAppOtp, verifyWhatsAppOtp } from "../../../utils/otpService"
import { setUserContact } from "../../../utils/userContact"
import { setAuthToken } from "../../../utils/authToken"
import { useRouter } from "next/navigation"

interface LoginPageProps {
  userName: string
  mobileNumber: string
}

export default function LoginPage({ userName, mobileNumber }: LoginPageProps) {
  const router = useRouter()
  const [phone] = useState(mobileNumber)
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(4).fill(""))
  const [otpMessage, setOtpMessage] = useState<string | null>(null)
  const [otpError, setOtpError] = useState<string | null>(null)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [otpSent, setOtpSent] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Auto-focus first input on mount (only if OTP has been sent)
    // Don't auto-send OTP - user needs to click "Send OTP" button
  }, [])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = window.setInterval(() => {
      setResendCooldown((prev) => Math.max(prev - 1, 0))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [resendCooldown])

  const handleDigitChange = (index: number, value: string) => {
    // Only allow single digit
    if (!/^[0-9]?$/.test(value)) return
    
    const updated = [...otpDigits]
    updated[index] = value.slice(-1)
    setOtpDigits(updated)

    // Auto-focus next input if a digit was entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all 4 digits are entered
    if (updated.every(d => d !== "") && updated.join("").length === 4) {
      handleVerifyOtp(updated.join(""))
    }
  }

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (event.key === "Backspace") {
      if (otpDigits[index]) {
        const updated = [...otpDigits]
        updated[index] = ""
        setOtpDigits(updated)
      } else if (index > 0) {
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
      
      const nextEmptyIndex = updated.findIndex((d, idx) => idx >= startIndex && !d)
      const focusIndex = nextEmptyIndex === -1 ? Math.min(startIndex + digits.length - 1, 3) : nextEmptyIndex
      inputRefs.current[focusIndex]?.focus()

      // Auto-verify if all 4 digits are pasted
      if (updated.every(d => d !== "") && updated.join("").length === 4) {
        setTimeout(() => handleVerifyOtp(updated.join("")), 100)
      }
    }
  }

  const handleSendOtp = async () => {
    const sanitizedPhone = phone.replace(/\D/g, "")
    
    if (!sanitizedPhone || sanitizedPhone.length < 10) {
      setOtpError("Please enter a valid phone number.")
      return
    }

    setIsSendingOtp(true)
    setOtpError(null)
    setOtpMessage(null)

    try {
      await sendWhatsAppOtp({
        phoneNumber: sanitizedPhone,
        name: userName || "User",
      })
      setOtpMessage("OTP sent to WhatsApp. Please check your phone.")
      setOtpSent(true)
      setResendCooldown(30) // 30 second cooldown
      // Auto-focus first input after OTP is sent
      setTimeout(() => {
        inputRefs.current[0]?.focus()
      }, 100)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send OTP. Please try again."
      setOtpError(message)
    } finally {
      setIsSendingOtp(false)
    }
  }

  const handleVerifyOtp = async (otp?: string) => {
    const otpCode = otp || otpDigits.join("")
    
    // Strict validation: Must be exactly 4 digits
    if (otpCode.length !== 4) {
      setOtpError("Please enter a valid 4-digit OTP.")
      return
    }

    // Ensure it's only digits
    if (!/^\d{4}$/.test(otpCode)) {
      setOtpError("OTP must contain only numbers.")
      return
    }

    const sanitizedPhone = phone.replace(/\D/g, "")
    if (!sanitizedPhone || sanitizedPhone.length < 10) {
      setOtpError("Please enter a valid phone number.")
      return
    }

    setIsVerifyingOtp(true)
    setOtpError(null)
    setOtpMessage(null)

    try {
      const response = await verifyWhatsAppOtp({
        phoneNumber: sanitizedPhone,
        code: otpCode,
      })

      // Additional validation: Ensure response indicates successful verification
      if (!response || typeof response !== 'object') {
        throw new Error("Invalid response from server. Please try again.")
      }

      // Validate that the message indicates successful verification
      const message = response.message?.toLowerCase() || ''
      if (!message.includes('verified')) {
        throw new Error(response.message || "OTP verification failed. Please check your code and try again.")
      }

      // Store JWT token and contact for session persistence
      const normalizedMobile = `+${sanitizedPhone}`
      
      // Save JWT token if provided
      if (response.token) {
        setAuthToken(response.token)
        console.log('[LoginPage] JWT token saved to localStorage')
      }
      
      // Save contact
      setUserContact(normalizedMobile)

      setOtpMessage("OTP verified successfully.")

      // Redirect to dashboard route
      const mobileForUrl = sanitizedPhone
      setTimeout(() => {
        router.push(`/dashboard/${mobileForUrl}`)
      }, 1000)
    } catch (error) {
      const message = error instanceof Error ? error.message : "OTP verification failed. Please try again."
      setOtpError(message)
      console.error('[LoginPage] OTP verification error:', error)
      // Clear OTP on error
      setOtpDigits(Array(4).fill(""))
      inputRefs.current[0]?.focus()
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const firstName = userName?.split(" ")[0] || userName || "there"
  const sanitizedPhone = phone.replace(/\D/g, "")
  const isFormValid = sanitizedPhone.length >= 10 && otpSent && otpDigits.every((digit) => digit.length === 1)

  return (
    <div className="fixed inset-0 z-50 flex flex-col h-screen overflow-x-hidden bg-[#F2F0E0]">
      {/* Header */}
      <div className="flex items-center justify-between px-8 md:py-6 py-6 border-b border-gray-200 bg-[#1E3F2B]">
        <div className="flex items-center gap-3">
          <Image 
            src="https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240" 
            alt="Formial" 
            width={120} 
            height={40} 
            className="md:h-8 h-6 w-auto" 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-7xl mx-auto w-full pb-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col w-full max-w-6xl mx-auto text-[#3D2D1F] px-0 sm:px-6 md:px-10 py-8 md:py-12"
          style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
        >
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="relative flex-1 rounded-[32px] px-8 md:px-12"
          >
            <div className="space-y-4">
              <h2
                className="text-xl md:text-2xl text-[#5B4331] tracking-tight font-medium leading-tight"
                style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
              >
                Welcome back{" "}
                <span className="italic font-instrument-serif">{firstName}!</span>
              </h2>
              <p className="text-sm md:text-base text-[#6F5B4C] max-w-xl">
                Enter OTP to continue to dashboard.
              </p>
              <div className="w-full h-px bg-[#5B4331]/30 mt-4" />
            </div>

            <div className="mt-6 space-y-6">
              {/* Phone Number Input */}
              <div className="space-y-2">
                <span className="text-sm font-semibold text-[#6F5B4C] tracking-tight">WhatsApp Number</span>
                <div className="flex flex-col gap-4 mt-2 w-full">
                  {/* Input and Button Row */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        readOnly
                        disabled
                        className="w-fit rounded-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-gray-50 px-5 py-3 text-base text-[#3D2D1F] opacity-70 cursor-not-allowed"
                        placeholder="Enter WhatsApp number"
                      />
                    </div>
                    
                    {/* Send OTP Button */}
                    {!otpSent && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp || resendCooldown > 0 || sanitizedPhone.length < 10}
                        className="box-border px-6 py-3 bg-[#1E3F2B] rounded-full font-medium text-white flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {isSendingOtp ? "Sending..." : "Send OTP"}
                      </button>
                    )}
                  </div>
                  
                  <span className="text-xs text-[#6F5B4C]">Check your WhatsApp on <span className="font-bold">Phone</span> for the OTP.</span>
                  
                  {/* OTP Input Boxes */}
                  {otpSent && (
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
                          disabled={isVerifyingOtp}
                        />
                      ))}
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp || resendCooldown > 0}
                        className="text-xs text-[#6F5B4C] pt-3 sm:pt-5 text-center underline-offset-2 hover:underline disabled:opacity-50 disabled:no-underline"
                      >
                        {isSendingOtp
                          ? "Sending..."
                          : resendCooldown > 0
                          ? `Resend in ${resendCooldown}s`
                          : "Resend OTP"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="mt-3 min-h-[1.5rem]" aria-live="polite">
              {otpMessage && !otpError && (
                <p className="text-xs text-green-700">{otpMessage}</p>
              )}
              {otpError && (
                <p className="text-xs text-red-600">{otpError}</p>
              )}
            </div>

            {/* Verify & Continue Button */}
            {otpSent && (
              <div className="mt-8 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => handleVerifyOtp()}
                  disabled={!isFormValid || isVerifyingOtp}
                  className="box-border px-6 py-3 bg-[#1E3F2B] border-[0.767442px] border-[#1F3F2A] shadow-[0px_3.06977px_3.06977px_rgba(0,0,0,0.25)] rounded-full font-medium text-white flex items-center justify-center transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {isVerifyingOtp ? "Verifying..." : "Verify & Continue"}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

