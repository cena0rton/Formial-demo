"use client"

import React from "react"
import { motion } from "framer-motion"

interface WelcomeStep2Props {
  onNext: () => void
}

export default function WelcomeStep2({ onNext }: WelcomeStep2Props) {
  const text = "We got you! We will guide you step by step"
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
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex flex-row  md:items-center items-start md:gap-3 gap-8 w-full">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex md:flex-row flex-col md:items-center items-start gap-2">
                  <span className="flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full border bg-[#1E3F2B] text-white border-gray-300 shadow-inner shadow-white">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-gray-400 text-xl font-bold md:mx-1 md:block hidden">
                    &rarr;
                  </span>
                )}
                {/* {idx < steps.length - 1 && (
                  <span className="text-gray-400 text-xl font-bold md:hidden block my-1">
                    &darr;
                  </span>
                )} */}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <p className="text-base text-gray-600 font-medium font-instrument-serif max-w-lg mb-8">
          {"We are excited to help you achieve your skin goals!".split("").map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + idx * 0.03, duration: 0.2 }}
            >
              {char}
            </motion.span>
          ))}
        </p>
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
