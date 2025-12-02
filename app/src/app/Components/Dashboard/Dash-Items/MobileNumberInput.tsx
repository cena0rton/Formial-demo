"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { getUser } from "../../../utils/formialApi"
import { normalizeMobileFromUrl } from "../../../utils/auth"

interface MobileNumberInputProps {
  onMobileSubmit: (mobileNumber: string, userName: string) => void
}

export default function MobileNumberInput({ onMobileSubmit }: MobileNumberInputProps) {
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
        // User exists - proceed to OTP screen
        const userName = user.first_name && user.last_name 
          ? `${user.first_name} ${user.last_name}`.trim()
          : user.name || user.first_name || ""
        onMobileSubmit(normalizedMobile, userName)
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
    <div className="flex items-center justify-center min-h-screen bg-[#F2F0E0] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] p-8 md:p-10 shadow-sm">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image 
              src="https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240" 
              alt="Formial" 
              width={180} 
              height={60} 
              className="w-auto h-auto" 
            />
          </div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 
              className="text-3xl md:text-4xl font-medium tracking-tight text-[#1E3F2B] mb-2"
              style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
            >
              Welcome to Formial
            </h1>
            <p className="text-base text-[#3D2D1F]/80 mt-2">
              Enter your mobile number to continue
            </p>
          </motion.div>

          {/* Mobile Number Input Form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-[#3D2D1F] mb-3">
                Mobile Number
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[#3D2D1F] font-medium px-3 py-3 bg-[#F2F0E0] rounded-l-3xl border border-r-0 border-b-2 border-b-[#CBBEAD] border-[#CBBEAD]">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={mobileNumber}
                  onChange={handleMobileChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  className="flex-1 rounded-r-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all disabled:opacity-60"
                  disabled={isChecking}
                  autoFocus
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-center text-red-600"
              >
                {error}
              </motion.p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!mobileNumber.trim() || mobileNumber.length !== 10 || isChecking}
              className="w-full py-4 px-6 rounded-3xl bg-[#7CB58D] text-white font-semibold text-base hover:bg-[#6BA47A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isChecking ? "Checking..." : "Continue"}
            </button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  )
}


