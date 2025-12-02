"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { getUser } from "../../../utils/formialApi"
import { normalizeMobileFromUrl } from "../../../utils/auth"
import { useRouter } from "next/navigation"

interface MobileNumberModalProps {
  isOpen: boolean
  onClose?: () => void
}

export default function MobileNumberModal({ isOpen, onClose }: MobileNumberModalProps) {
  const router = useRouter()
  const [mobileNumber, setMobileNumber] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!mobileNumber.trim()) {
      setError("Please enter your mobile number.")
      return
    }

    // Validate mobile number format (should be 10 digits for Indian numbers)
    const cleaned = mobileNumber.replace(/\D/g, "")
    if (cleaned.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.")
      return
    }

    setIsChecking(true)
    setError(null)

    try {
      // Normalize mobile number (add +91 for Indian numbers)
      const normalizedMobile = normalizeMobileFromUrl(cleaned)
      
      // Check if user exists
      const user = await getUser(normalizedMobile)
      
      if (user && user._id) {
        // User exists - redirect to /{mobileNumber} route
        const mobileForUrl = cleaned // Use cleaned 10-digit number for URL
        router.push(`/${mobileForUrl}`)
      } else {
        // User doesn't exist
        setError("User not found. Please visit Formial.in to get started.")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      if (errorMessage.includes('404') || errorMessage.includes('not found') || errorMessage.includes('does not exist')) {
        setError("Sorry, we don't have you registered at Formial yet. Visit Formial.in and get going.")
      } else {
        setError("Failed to verify mobile number. Please try again.")
      }
    } finally {
      setIsChecking(false)
    }
  }

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10) // Only digits, max 10
    setMobileNumber(value)
    setError(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with strong blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full md:max-w-md max-w-sm ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="relative bg-white rounded-3xl border-3 border-[#1E3F2B]/50 shadow-2xl overflow-hidden "
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#F2F0E0]/30 pointer-events-none"></div>
                
                {/* Content */}
                <div className="relative p-8 md:p-10">
                  {/* Close button */}
                  {onClose && (
                    <button
                      onClick={onClose}
                      className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                      aria-label="Close"
                    >
                      <svg
                        className="w-5 h-5 text-gray-500 hover:text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Logo */}
                  <div className="flex justify-center mb-8 mx-auto w-fit">
                    <Image 
                      src="/greenFormial.png" 
                      alt="Formial" 
                      width={80} 
                      height={55} 
                      className="w-auto h-auto" 
                    />
                  </div>

                  {/* Title */}
                  <div className="text-center mb-8">
                    <h2 className="text-lg md:text-xl font-medium tracking-tight text-[#4d3927] mb-3">
                      Please enter your mobile number
                    </h2>
                    <p className="text-xs md:text-sm text-[#3D2D1F]/80 leading-relaxed">
                      We&apos;ll verify your number to continue to your dashboard
                    </p>
                  </div>

                {/* Mobile Number Input Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm  font-medium text-[#1E3F2B] mb-3 tracking-tight">
                      Mobile Number
                    </label>
                    <div className="flex items-stretch gap-0 shadow-sm rounded-full">
                      <span className="flex items-center text-[#1E3F2B] font-medium px-4 py-4 bg-[#F2F0E0]/30 rounded-l-full border border-r-0 border-[#CBBEAD] text-base">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={mobileNumber}
                        onChange={handleMobileChange}
                        placeholder="Enter 10-digit number"
                        maxLength={10}
                        className="flex-1 rounded-r-full border border-[#CBBEAD] bg-[#F2F0E0]/30 px-5 py-4 text-base text-[#1E3F2B] placeholder:text-[#3D2D1F]/50 focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={isChecking}
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl border border-red-200"
                    >
                      <p className="text-sm text-center text-red-700 font-medium">
                        {error.includes('Formial.in') ? (
                          <>
                            Sorry, we don&apos;t have you registered at Formial yet. Visit{' '}
                            <a
                              href="https://formial.in"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-500 font-medium underline transition-colors"
                            >
                              formial.in
                            </a>
                            {' '}and get going.
                          </>
                        ) : (
                          error
                        )}
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!mobileNumber.trim() || mobileNumber.length !== 10 || isChecking}
                    className="w-full py-4 px-6 rounded-full bg-[#1E3F2B] text-white font-semibold text-base hover:bg-[#1E3F2B]/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1E3F2B] shadow-lg hover:shadow-xl"
                  >
                    {isChecking ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

