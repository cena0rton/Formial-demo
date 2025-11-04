"use client"

import React from "react"
import { motion } from "framer-motion"

interface WelcomeStep2Props {
  onNext: () => void
}

export default function WelcomeStep2({ onNext }: WelcomeStep2Props) {
  const text = "We are excited to help you achieve your skin goals!"
  const steps = [
    { id: 1, label: "Upload Photos" },
    { id: 2, label: "Consultation" },
    { id: 3, label: "Formulation" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="md:mt-50 mt-30 px-8 m-auto"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-6"
      >
        <h2 className="md:text-4xl text-2xl font-medium tracking-tight text-[#1E3F2B] mb-6">
          {text.split("").map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03, duration: 0.2 }}
            >
              {char}
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="flex flex-col items-start gap-6 mb-6"
        >
          <div className="flex flex-col w-full gap-8">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-row items-center gap-4">
                  <span className="flex items-center justify-center w-fit h-fit px-2 py-1 text-sm font-medium rounded-full border bg-[#1E3F2B] text-white border-gray-300 shadow-inner shadow-white">
                    Step {step.id}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex flex-col items-start ml-6">
                    <svg
                      className="block"
                      width="4"
                      height="32"
                      viewBox="0 0 4 32"
                      fill="none"
                    >
                      <line
                        x1="2"
                        y1="0"
                        x2="2"
                        y2="32"
                        stroke="#1E3F2B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.4 }}
        className="flex justify-start"
      >
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
