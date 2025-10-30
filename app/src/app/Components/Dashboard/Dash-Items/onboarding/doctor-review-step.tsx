"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { IconUser, IconArrowLeft } from "@tabler/icons-react"

interface DoctorReviewStepProps {
  onNext: () => void
  onBack: () => void
  onSkip: () => void
}

export default function DoctorReviewStep({ onNext, onBack, onSkip }: DoctorReviewStepProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullText = "Doctor Review"

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 30)
      return () => clearTimeout(timer)
    } else {
      setIsTypingComplete(true)
    }
  }, [displayedText, fullText])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 text-center"
    >
      {/* Icon */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#1E3F2B" }}
        >
          <IconUser className="h-10 w-10 text-white" />
        </motion.div>
      </div>

      {/* Heading */}
      <div className="min-h-12 flex items-center justify-center">
        <h2 className="text-3xl font-bold" style={{ color: "#1E3F2B", fontFamily: 'var(--font-instrument-serif), serif' }}>
          {displayedText}
          {!isTypingComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              className="ml-1"
            >
              |
            </motion.span>
          )}
        </h2>
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-600 max-w-md mx-auto"
      >
        Our expert dermatologists will review your photos and create a personalized skincare plan tailored just for you. You&apos;re one step closer! 💪
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-4 justify-center pt-8"
      >
        <button onClick={onBack} className="p-3 rounded-lg hover:bg-white/50 transition-colors">
          <IconArrowLeft className="h-5 w-5 text-gray-500" />
        </button>
        <button
          onClick={onNext}
          className="flex-1 px-8 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
          style={{ backgroundColor: "#1E3F2B" }}
        >
          Continue
        </button>
        <button
          onClick={onSkip}
          className="px-8 py-3 rounded-lg font-semibold border-2 transition-all hover:bg-white/50"
          style={{ borderColor: "#1E3F2B", color: "#1E3F2B" }}
        >
          Skip
        </button>
      </motion.div>
    </motion.div>
  )
}
