"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { IconUser, IconArrowLeft } from "@tabler/icons-react"

interface DoctorReviewStepProps {
  onNext: () => void
  onBack: () => void
  onSkip?: () => void
}

export default function DoctorReviewStep({ onNext, onBack, }: DoctorReviewStepProps) {
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="text-left md:mt-50 mt-30"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: "#1E3F2B" }}
      >
        <IconUser size={32} className="text-white" />
      </motion.div>

      {/* Heading */}
      <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-6" style={{ color: "#1E3F2B" }}>
        {displayedText}
        {!isTypingComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="ml-1 inline-block"
          >
            |
          </motion.span>
        )}
      </h2>

      {/* Description */}
      <p className="text-base text-gray-600 font-normal max-w-lg mb-8">
        {"Our expert dermatologists will review your photos and create a personalized skincare plan tailored just for you. You're one step closer!".split("").map((char, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + idx * 0.03, duration: 0.2 }}
          >
            {char}
          </motion.span>
        ))}
      </p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="flex gap-3 justify-start items-center"
      >
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <IconArrowLeft size={20} className="text-gray-600" />
        </button>
        <button
          onClick={onNext}
          className="px-10 py-3.5 rounded-full font-semibold text-white transition-all duration-200 bg-[#1E3F2B] hover:bg-[#1a3528] shadow-md hover:shadow-lg"
        >
          Continue
        </button>
      
      </motion.div>
    </motion.div>
  )
}
