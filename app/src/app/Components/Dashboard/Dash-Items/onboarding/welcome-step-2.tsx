"use client"

import React from "react"
import { motion } from "framer-motion"
import { IconCamera, IconUserCheck, IconFlask } from "@tabler/icons-react"

interface WelcomeStep2Props {
  onNext: () => void
}

const stepIcons = [
  <IconCamera size={26} className="text-[#1E3F2B]" key="icon1" />,
  <IconUserCheck size={26} className="text-[#1E3F2B]" key="icon2" />,
  <IconFlask size={26} className="text-[#1E3F2B]" key="icon3" />,
]

export default function WelcomeStep2({ onNext }: WelcomeStep2Props) {
  const text = "We will guide you through the simple steps below to unlock your best skin!"
  const steps = [
    { id: 1, label: "Upload Photos" },
    { id: 2, label: "Consultation" },
    { id: 3, label: "Formulation" },
  ]

  const detailSteps = [
    { id: 1, label: "Upload Photos", description: "Upload your photos to get started." },
    { id: 2, label: "Consultation", description: "Have a doctor review your photos and provide expert skin advice." },
    { id: 3, label: "Formulation", description: "Formulate your skin care products." },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="md:mt-0 mt-0 px-8 m-auto max-w-2xl bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-6"
      >
        <h2 className="md:text-3xl text-2xl font-medium tracking-tight text-[#1E3F2B] mb-12 text-center pt-10">
          {text.split("").map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03, duration: 0.18 }}
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
          {/* Stepper Progress */}
          <div className="flex items-center justify-center w-full gap-5 mb-8">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative">
                  <div
                    className="rounded-full flex items-center justify-center mb-2 border-4 border-[#1E3F2B] bg-transparent w-14 h-14 shadow-lg"
                  >
                    {stepIcons[idx]}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-[#1E3F2B]">
                    {step.label}
                  </span>
                  {/* {idx < steps.length - 1 && (
                    <div className="absolute right-[-31px] top-1/2 -translate-y-1/2 w-7 h-1 bg-[#1E3F2B] opacity-60 z-0 rounded-full" />
                  )} */}
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-col w-full gap-8 border border-[#1E3F2B]/5">
            {detailSteps.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35 + step.id * 0.13, duration: 0.5, type: "spring", stiffness: 120 }}
                className="flex flex-row items-center gap-5 rounded-xl px-6 py-4 w-full shadow bg-transparent hover:bg-[#1E3F2B]/5 transition-all"
              >
                <span className="flex items-center justify-center w-fit h-fit px-3 py-1 text-sm font-medium rounded-full border bg-[#1E3F2B]/90 text-[#F2F0E0] border-[#1E3F2B] shadow-inner shadow-white mr-3">
                  {step.id}
                </span>
                <span className="text-sm font-medium text-[#1E3F2B]">{step.description}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.4 }}
        className="flex justify-center mt-16 pb-12"
      >
        <button
          onClick={onNext}
          className="px-12 py-4 rounded-full font-medium text-white transition-all duration-200 bg-[#1E3F2B] hover:bg-[#163021] shadow-md hover:shadow-lg text-lg tracking-tight cursor-pointer"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  )
}
