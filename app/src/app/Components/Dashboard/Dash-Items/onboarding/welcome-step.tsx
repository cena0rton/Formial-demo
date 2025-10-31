/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const fullText = `Welcome to Formial`

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
    <div className="flex flex-col items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="text-center space-y-8"
    >
      {/* Animated Flower SVG */}


<p className="font-instrument-serif text-2xl text-[#1E3F2B] mb-0 flex items-center justify-center">
  Hi Pawan!
  <div className="flex items-center justify-center">
        
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-leaf-2">
       
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        
        <motion.path 
        pathLength={0}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" , repeat: Infinity}}
        d="M5 21c.5 -4.5 2.5 -8 7 -10" />
        
        <motion.path
        pathLength={0}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" , repeat: Infinity}}
        d="M7.5 15q -3.5 0 -4.5 -6a8.4 8.4 0 0 1 3.438 .402a12 12 0 0 1 -.052 -.793c0 -3.606 3.204 -5.609 3.204 -5.609s2.003 1.252 2.842 3.557q 2.568 -1.557 6.568 -1.557q .396 3.775 -1.557 6.568c2.305 .839 3.557 2.842 3.557 2.842s-3 2.59 -7 2.59c0 1 0 1 .5 3q -6 0 -7 -5" />
        
        </svg>
        
        </div>
</p>
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
        <p className="text-gray-900 font-light max-w-lg mx-auto tracking-NORMAL border border-[#1E3F2B]/10 text-xs mt-4 p-2 bg-[#1E3F2B]/2 rounded-full">We will guide you through a few steps to get you started</p>
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
    </div>
  )
}

