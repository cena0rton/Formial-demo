"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface WelcomeStep1Props {
  userName: string
  onNext: () => void
}

export default function WelcomeStep1({ userName, onNext }: WelcomeStep1Props) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullText = `Welcome to Formial`

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 50)
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
      className="text-center space-y-4"
    >
      {/* User Greeting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="font-instrument-serif text-3xl text-[#1E3F2B] mb-8 flex items-center justify-center gap-3">
          Hi {userName}!
          <motion.div
            animate={{ rotate: [0, 15, -15, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-[#1E3F2B]">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                d="M5 21c.5 -4.5 2.5 -8 7 -10" 
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                d="M7.5 15q -3.5 0 -4.5 -6a8.4 8.4 0 0 1 3.438 .402a12 12 0 0 1 -.052 -.793c0 -3.606 3.204 -5.609 3.204 -5.609s2.003 1.252 2.842 3.557q 2.568 -1.557 6.568 -1.557q .396 3.775 -1.557 6.568c2.305 .839 3.557 2.842 3.557 2.842s-3 2.59 -7 2.59c0 1 0 1 .5 3q -6 0 -7 -5" 
              />
            </svg>
          </motion.div>
        </p>
      </motion.div>

      {/* Animated Flower SVG */}

      <div className="space-y-5">
        <div className="flex items-center justify-center">
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
      </div>
<p>Let&apos;s make feeling confident in your skin an everyday thing!</p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className="flex justify-center pt-4"
      >
        <button
          onClick={onNext}
          className="px-12 py-4 rounded-full font-semibold text-white transition-all duration-200 cursor-pointer border border-[#1E3F2B] shadow-lg hover:shadow-xl"
          style={{ backgroundColor: '#1E3F2B' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3528'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E3F2B'}
        >
          Better Skin Starts Here
        </button>
      </motion.div>
    </motion.div>
  )
}

