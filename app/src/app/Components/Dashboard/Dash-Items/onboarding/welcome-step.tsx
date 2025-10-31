"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface WelcomeStepProps {
  userName: string
  onNext: () => void
  onSkip: () => void
}

export default function WelcomeStep({ userName, onNext }: WelcomeStepProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullText = `Hi ${userName}! Welcome to Formial`

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 3)
      return () => clearTimeout(timer)
    } else {
      setTimeout(() => setIsTypingComplete(true), 500)
    }
  }, [displayedText, fullText])
 const text = "Ready to unlock your most radiant skin? Let's make feeling confident in your skin an everyday thing!"
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="text-center space-y-8"
    >
      {/* Animated Flower SVG */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex justify-center mb-4"
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className="overflow-visible">
          {/* Center Circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="8"
            fill="#1E3F2B"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          />
          {/* Petal 1 - Top */}
          <motion.path
            d="M60 30 Q65 45 70 50 Q65 60 60 55 Q55 60 50 50 Q55 45 60 30 Z"
            fill="#1E3F2B"
            fillOpacity="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
          {/* Petal 2 - Bottom */}
          <motion.path
            d="M60 90 Q65 75 70 70 Q65 60 60 65 Q55 60 50 70 Q55 75 60 90 Z"
            fill="#1E3F2B"
            fillOpacity="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          />
          {/* Petal 3 - Left */}
          <motion.path
            d="M30 60 Q45 65 50 70 Q60 65 55 60 Q60 55 50 50 Q45 55 30 60 Z"
            fill="#1E3F2B"
            fillOpacity="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
          />
          {/* Petal 4 - Right */}
          <motion.path
            d="M90 60 Q75 65 70 70 Q60 65 65 60 Q60 55 70 50 Q75 55 90 60 Z"
            fill="#1E3F2B"
            fillOpacity="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.8, ease: "easeOut" }}
          />
          {/* Petal 5 - Top Right */}
          <motion.path
            d="M75 35 Q70 45 70 50 Q65 55 60 55 Q60 50 62 45 Q68 40 75 35 Z"
            fill="#1E3F2B"
            fillOpacity="0.65"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          />
          {/* Petal 6 - Top Left */}
          <motion.path
            d="M45 35 Q50 40 58 45 Q60 50 60 55 Q55 55 50 50 Q50 45 45 35 Z"
            fill="#1E3F2B"
            fillOpacity="0.65"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.8, ease: "easeOut" }}
          />
          {/* Petal 7 - Bottom Left */}
          <motion.path
            d="M45 85 Q50 80 58 75 Q60 70 60 65 Q55 65 50 70 Q50 75 45 85 Z"
            fill="#1E3F2B"
            fillOpacity="0.65"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          />
          {/* Petal 8 - Bottom Right */}
          <motion.path
            d="M75 85 Q70 80 62 75 Q60 70 60 65 Q65 65 70 70 Q70 75 75 85 Z"
            fill="#1E3F2B"
            fillOpacity="0.65"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <div className="space-y-5">
        <div className="min-h-16 flex items-center justify-center">
          <h1 className="md:text-5xl text-4xl font-semibold tracking-normal" style={{ color: '#1E3F2B', fontFamily: 'var(--font-instrument-serif), serif' }}>
            {displayedText}
            {!isTypingComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                className="ml-1 inline-block"
              >
                |
              </motion.span>
            )}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-lg text-gray-500 font-light max-w-lg mx-auto tracking-tight"
        >
            {text.split("").map((char, idx) => {
                return <motion.span key={idx} initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.03, duration: 0.2 }}>
                    {char}
                </motion.span>
            })}
        </motion.p>
      <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }} className="flex items-center justify-center gap-3 mt-3">
        {/* Step 1: Upload Photos */}
        <span className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full shadow border bg-[#1E3F2B] text-white border-gray-300 font-instrument-serif min-w-[1.5rem] min-h-[1.5rem]"
          >
            1
          </span>
          <span className="text-md font-medium text-gray-700 font-instrument-serif">
            Upload Photos
          </span>
        </span>
        {/* Arrow */}
        <span className="text-gray-400 mx-1 text-[0.9rem] font-bold">
          &rarr;
        </span>
        {/* Step 2: Consultation */}
        <span className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full shadow border bg-[#1E3F2B] text-white border-gray-300 font-instrument-serif min-w-[1.5rem] min-h-[1.5rem]"
          >
            2
          </span>
          <span className="text-md font-medium text-gray-700 font-instrument-serif">
            Consultation
          </span>
        </span>
        {/* Arrow */}
        <span className="text-gray-400 mx-1 text-[0.9rem] font-bold">
          &rarr;
        </span>
        {/* Step 3: Formulation */}
        <span className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full shadow border bg-[#1E3F2B] text-white border-gray-300 font-instrument-serif min-w-[1.5rem] min-h-[1.5rem]"
          >
            3
          </span>
          <span className="text-md font-medium text-gray-700 font-instrument-serif">
            Formulation
          </span>
        </span>
      </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex gap-3 justify-center pt-0"
      >
        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-200 cursor-pointer  border-1 border-[#1E3F2B]"
          style={{ backgroundColor: '#1E3F2B' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3528'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E3F2B'}
        >
          Get started
        </button>
        
        {/* <button
          onClick={onSkip}
          className="px-8 py-3.5 rounded-lg font-semibold border-2  text-[#1E3F2B] hover:bg-gray-50 transition-all duration-200"
        >
          Skip for now
        </button> */}
      </motion.div>
    </motion.div>
  )
}

