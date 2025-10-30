"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface WelcomeStepProps {
  userName: string
  onNext: () => void
  onSkip: () => void
}

export default function WelcomeStep({ userName, onNext, onSkip }: WelcomeStepProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="text-center space-y-8"
    >
      <div className="space-y-5">
        <div className="min-h-16 flex items-center justify-center">
          <h1 className="md:text-5xl text-4xl font-semibold tracking-tight" style={{ color: '#1E3F2B' }}>
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
          className="text-xl text-gray-500 font-light max-w-lg mx-auto leading-relaxed"
        >
          Welcome to your Skin-HUB — where your journey to amazing skin begins! 🚀
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex gap-3 justify-center pt-0"
      >
        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-lg font-medium text-white transition-all duration-200 cursor-pointer" 
          style={{ backgroundColor: '#1E3F2B' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3528'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E3F2B'}
        >
          Get started
        </button>
        
        <button
          onClick={onSkip}
          className="px-8 py-3.5 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
        >
          Skip for now
        </button>
      </motion.div>
    </motion.div>
  )
}

