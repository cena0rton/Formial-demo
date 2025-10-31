"use client"

import React from "react"
import { motion } from "framer-motion"

interface WelcomeStep2Props {
  onNext: () => void
}

export default function WelcomeStep2({ onNext }: WelcomeStep2Props) {
  const text = "We got you! We will guide you step by step"
  const steps = [
    { id: 1, label: "Photos" },
    { id: 2, label: "Consultation" },
    { id: 3, label: "Formulation" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="text-center space-y-8 mt-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-semibold tracking-normal" style={{ color: '#1E3F2B', fontFamily: 'var(--font-instrument-serif), serif' }}>
          {text.split("").map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.2 }}
            >
              {char}
            </motion.span>
          ))}
        </h2>

    

        

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="flex items-center justify-center gap-3 mt-8"
        >
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full shadow-md border bg-[#1E3F2B] text-white border-gray-300 font-instrument-serif">
                  {step.id}
                </span>
                <span className="text-sm font-medium text-gray-700 font-instrument-serif sm:inline">
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <span className="text-gray-400 mx-1 text-xl font-bold">
                  &rarr;
                </span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        <p className="text-base text-gray-600 font-light max-w-lg mx-auto">
          {"3 Simple Steps and you're on your way to a better skin!".split("").map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 + idx * 0.05, duration: 0.2 }}
            >
              {char}
            </motion.span>
          ))}
        </p>
    
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.4 }}
        className="flex justify-center pt-4"
      >
        
        <button
          onClick={onNext}
          className="px-12 py-4 rounded-full font-semibold text-white transition-all duration-200 cursor-pointer border border-[#1E3F2B] shadow-lg hover:shadow-xl"
          style={{ backgroundColor: '#1E3F2B' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3528'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E3F2B'}
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  )
}

