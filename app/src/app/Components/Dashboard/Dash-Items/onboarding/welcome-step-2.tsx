"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { IconUser, IconCamera, IconRocket, IconEdit } from "@tabler/icons-react"
import { sendWhatsAppOtp, verifyWhatsAppOtp } from "../../../../utils/otpService"
import { setAuthToken } from "../../../../utils/authToken"
import { setUserContact } from "../../../../utils/userContact"
import { getUser, updateUserByContact } from "../../../../utils/formialApi"
import { useRouter } from "next/navigation"

interface WelcomeStep2Props {
  userDetails: {
    firstName: string
    lastName: string
    phone: string
    address: string
  }
  onNext: () => void
  onBack: () => void
  onRefresh?: () => void
  mobileNumber?: string | null
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

export default function WelcomeStep2({ userDetails, onNext, onBack, mobileNumber }: WelcomeStep2Props) {
  const router = useRouter()
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(4).fill(""))
  const [firstName, setFirstName] = useState(userDetails.firstName)
  const [lastName, setLastName] = useState(userDetails.lastName)
  const [phone, setPhone] = useState(userDetails.phone)
  const [originalData, setOriginalData] = useState({ firstName: userDetails.firstName, lastName: userDetails.lastName, phone: userDetails.phone })
  const [otpMessage, setOtpMessage] = useState<string | null>(null)
  const [otpError, setOtpError] = useState<string | null>(null)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const firstNameInputRef = useRef<HTMLInputElement | null>(null)
  const lastNameInputRef = useRef<HTMLInputElement | null>(null)
  const phoneInputRef = useRef<HTMLInputElement | null>(null)
  
  // Fetch user data when component mounts or mobileNumber changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!mobileNumber) return
      
      try {
        const user = await getUser(mobileNumber)
        if (user) {
          const fetchedFirstName = user.first_name || (user.name ? user.name.split(' ')[0] : '') || ""
          const fetchedLastName = user.last_name || (user.name ? user.name.split(' ').slice(1).join(' ') : '') || ""
          const fetchedPhone = user.contact || mobileNumber
          
          setFirstName(fetchedFirstName)
          setLastName(fetchedLastName)
          setPhone(fetchedPhone)
          setOriginalData({ firstName: fetchedFirstName, lastName: fetchedLastName, phone: fetchedPhone })
        }
      } catch {
        // User doesn't exist yet - use provided userDetails
      }
    }
    
    fetchUserData()
  }, [mobileNumber])

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus()
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
  const sanitizedPhone = phone.replace(/\D/g, "")
  const isFormValid = firstName.trim().length > 0 && sanitizedPhone.length >= 10 && allDigitsFilled

  const handleSendOtp = async () => {
    if (isSendingOtp || resendCooldown > 0) return
    setOtpError(null)
    setOtpMessage(null)

    if (!sanitizedPhone) {
      setOtpError("Please enter a valid phone number with country code.")
      return
    }

    try {
      setIsSendingOtp(true)
      const fullName = `${firstName} ${lastName}`.trim()
      await sendWhatsAppOtp({ phoneNumber: sanitizedPhone, name: fullName })
      setOtpMessage("OTP sent to WhatsApp. Please check your phone.")
      setResendCooldown(30)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send OTP."
      setOtpError(message)
    } finally {
      setIsSendingOtp(false)
    }
  }

  const handleVerifyAndContinue = async () => {
    if (!isFormValid || isVerifyingOtp) return
    const code = otpDigits.join("")

    // Strict validation: Must be exactly 4 digits
    if (code.length !== 4) {
      setOtpError("Please enter a valid 4-digit OTP.")
      return
    }

    // Ensure it's only digits
    if (!/^\d{4}$/.test(code)) {
      setOtpError("OTP must contain only numbers.")
      return
    }

    setOtpError(null)
    setIsVerifyingOtp(true)
    setIsUpdating(false)

    try {
      const response = await verifyWhatsAppOtp({
        phoneNumber: sanitizedPhone,
        code,
      })

      // Additional validation: Ensure response indicates successful verification
      if (!response || typeof response !== 'object') {
        throw new Error("Invalid response from server. Please try again.")
      }

      // Validate that the message indicates successful verification
      const message = response.message?.toLowerCase() || ''
      if (!message || !message.includes('verified')) {
        throw new Error(response.message || "OTP verification failed. Please check your code and try again.")
      }

      const normalizedMobile = `+${sanitizedPhone}`
      
      // Handle Case A & B: User exists + OTP match (profile: true, token provided)
      if (response?.profile === true) {
        // Store token and contact for existing users
        if (response.token) {
          setAuthToken(response.token)
          setUserContact(normalizedMobile)
        } else {
          // Token missing for existing user - unexpected but handle gracefully
          console.warn("Token not provided for existing user profile")
        }

        // Check if user data has changed and needs to be updated
        const hasChanges = firstName !== originalData.firstName || lastName !== originalData.lastName || sanitizedPhone !== originalData.phone.replace(/\D/g, "")
        
        // Always update if there are changes
        if (hasChanges && normalizedMobile) {
          setIsUpdating(true)
          try {
            const updatePayload: { first_name?: string; last_name?: string; contact?: string } = {}
            if (firstName !== originalData.firstName) {
              updatePayload.first_name = firstName.trim()
            }
            if (lastName !== originalData.lastName) {
              updatePayload.last_name = lastName.trim()
            }
            if (sanitizedPhone !== originalData.phone.replace(/\D/g, "")) {
              updatePayload.contact = normalizedMobile
            }
            
            // Send PATCH request to update user details
            await updateUserByContact(normalizedMobile, updatePayload)
            
            // Update original data after successful save
            setOriginalData({ firstName, lastName, phone: sanitizedPhone })
          } catch (updateError) {
            console.error("Failed to update user data:", updateError)
            // Continue even if update fails - don't block user progress
          } finally {
            setIsUpdating(false)
          }
        }

        setOtpMessage(response?.message || "OTP verified successfully.")

        // Existing user - redirect to dashboard route
        const mobileForUrl = sanitizedPhone
        setTimeout(() => {
          router.push(`/dashboard/${mobileForUrl}`)
        }, 1000)
      } else {
        // Handle Case C: User does not exist + OTP match (profile: false, no token)
        // New user - store contact and continue with onboarding
        // Still save token if provided (API might return token even for new users)
        if (response.token) {
          setAuthToken(response.token)
          console.log('[WelcomeStep2] JWT token saved to localStorage for new user')
        }
        setUserContact(normalizedMobile)
        setOtpMessage(response?.message || "OTP verified. Please complete your profile.")
        onNext()
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "OTP verification failed. Please try again."
      setOtpError(message)
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col w-full max-w-6xl mx-auto text-[#3D2D1F]"
      style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
    >
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center px-0 sm:px-6 md:px-10 py-0 md:py-30">
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
            className="text-xl md:text-2xl text-[#5B4331] tracking-tight font-medium leading-tight"
            style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <span className="text-sm font-semibold text-[#6F5B4C] tracking-tight">First Name</span>
                <div className="relative">
                  <input
                    ref={firstNameInputRef}
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
                    placeholder="First Name"
                  />
                  <button
                    type="button"
                    onClick={() => firstNameInputRef.current?.focus()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 p-1 hover:opacity-70 transition-opacity cursor-pointer"
                    aria-label="Edit first name"
                  >
                    <IconEdit size={18} className="text-[#6F5B4C]" strokeWidth={2} />
                  </button>
                </div>
              </div>
              {/* Last Name */}
              <div className="space-y-2">
                <span className="text-sm font-semibold text-[#6F5B4C] tracking-tight">Last Name</span>
                <div className="relative">
                  <input
                    ref={lastNameInputRef}
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
                    placeholder="Last Name"
                  />
                  <button
                    type="button"
                    onClick={() => lastNameInputRef.current?.focus()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 p-1 hover:opacity-70 transition-opacity cursor-pointer"
                    aria-label="Edit last name"
                  >
                    <IconEdit size={18} className="text-[#6F5B4C]" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#6F5B4C] tracking-tight">WhatsApp Number</span>
            
              <div className="flex flex-wrap items-center justify-start gap-6 mt-2 w-full">
                <div className="w-fit sm:w-auto flex flex-col items-start justify-between gap-4">
                <div className="relative">
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-fit rounded-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
                    placeholder="Enter WhatsApp number"
                  />
                  <button
                    type="button"
                    onClick={() => phoneInputRef.current?.focus()}
                    className="absolute right-3 top-1/2 -translate-y-1/2  p-1 hover:opacity-70 transition-opacity cursor-pointer"
                    aria-label="Edit phone number"
                  >
                    <IconEdit size={18} className="text-[#6F5B4C]" strokeWidth={2} />
                  </button>
                </div>
                <span className="text-xs text-[#6F5B4C]">Please ensure this is your personal WhatsApp number and Check your WhatsApp on <span className="font-bold">Phone</span> for the OTP.</span>
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
                      : "Send OTP"}
                  </button>
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
          onClick={handleVerifyAndContinue}
            disabled={!isFormValid || isVerifyingOtp || isUpdating}
            className="box-border px-6 py-3 bg-[#1E3F2B] border-[0.767442px] border-[#1F3F2A] shadow-[0px_3.06977px_3.06977px_rgba(0,0,0,0.25)] rounded-full font-medium text-white flex items-center justify-center transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
         {isUpdating ? "Updating..." : isVerifyingOtp ? "Verifying..." : "Verify & Continue"}
        </button>
        </div>
        <div className="mt-3 min-h-[1.5rem]" aria-live="polite">
          {otpMessage && !otpError && (
            <p className="text-xs text-green-700">{otpMessage}</p>
          )}
          {otpError && (
            <p className="text-xs text-red-600">{otpError}</p>
          )}
        </div>
      </motion.div>
      </div>
    </motion.div>
  )
}

