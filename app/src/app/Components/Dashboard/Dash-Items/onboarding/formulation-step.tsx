"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { IconFlask, IconArrowLeft } from "@tabler/icons-react"

interface FormulationStepProps {
  onBack: () => void
  onComplete: () => void
}

export default function FormulationStep({ onBack, onComplete }: FormulationStepProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullText = "Formulation & Skincare Guidance"

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-4 text-center"
    >
      <div className="flex items-center justify-center mb-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#1E3F2B' }}
        >
          <IconFlask size={32} className="text-white" />
        </motion.div>
      </div>

      <div className="space-y-5">
        <h2 className="text-4xl font-semibold tracking-normal" style={{ color: '#1E3F2B', fontFamily: 'var(--font-instrument-serif), serif' }}>
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
        </h2>

        <p className="text-gray-500 font-light max-w-lg mx-auto tracking-tight">
          {"Your photos are saved to your ".split("").map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + idx * 0.03, duration: 0.2 }}
            >
              {char}
            </motion.span>
          ))}
          <span className="font-semibold" style={{ color: '#1E3F2B' }}>
            {"Skin Progress".split("").map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + idx * 0.03, duration: 0.2 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {" tab with date and time. Your journey to amazing skin starts now!".split("").map((char, idx) => (
            <motion.span
              key={idx + 12}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + idx * 0.03, duration: 0.2 }}
            >
              {char}
            </motion.span>
          ))}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="flex gap-3 justify-center items-center mt-6"
      >
        <button onClick={onBack} className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <IconArrowLeft size={20} className="text-gray-600" />
        </button>
        <button
          onClick={onComplete}
          className="px-8 py-3.5 rounded-full font-medium text-white transition-all duration-200"
          style={{ backgroundColor: '#1E3F2B' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3528'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E3F2B'}
        >
          Go to SkinHub
        </button>
      </motion.div>
    </motion.div>
  )
}

