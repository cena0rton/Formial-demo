"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { IconUser, IconCamera, IconRocket } from "@tabler/icons-react"

interface DoctorReviewStepProps {
  onNext: () => void
  onBack: () => void
  onSkip?: () => void
}

const timeline = [
  {
    title: "Verify your details",
    subtitle: "Verify your WhatsApp number",
    icon: <IconUser size={20} stroke={1.8} />,
  },
  {
    title: "Upload your pictures",
    subtitle: "Ensure quality for higher accuracy",
    icon: <IconCamera size={20} stroke={1.8} />,
  },
  {
    title: "Welcome to Formial",
    subtitle: "Here's your personalised dashboard",
    icon: <IconRocket size={20} stroke={1.8} className="text-[#937272]" />,
  },
]

export default function DoctorReviewStep({ onNext, onBack }: DoctorReviewStepProps) {
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

  const currentStepIndex: number = 2 // Welcome step

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col w-full max-w-6xl mx-auto text-[#3D2D1F] -mt-16 md:-mt-0"
      style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
    >
      {/* Mobile Progress Bar */}
      <div className="lg:hidden w-full px-8 pt-12">
        <div className="w-full bg-[#7CB58D] rounded-full px-8 py-4 flex items-center justify-between">
          <span className={`text-sm font-medium ${currentStepIndex === 0 ? 'text-black font-bold' : 'text-[#1E3F2B]'}`}>
            Verification
          </span>
          <span className={`text-sm font-medium ${currentStepIndex === 1 ? 'text-black font-bold' : 'text-[#1E3F2B]'}`}>
            Photo Upload
          </span>
          <span className={`text-sm font-medium ${currentStepIndex === 2 ? 'text-black font-bold' : 'text-[#1E3F2B]'}`}>
            Welcome
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-center justify-start px-4 sm:px-6 md:px-10 py-0 md:py-10">
      {/* Left Panel - Timeline */}
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
        className="w-full lg:max-w-sm h-full"
      >
        <div className="relative lg:bg-[#7CB58D] bg-transparent text-[#1E3F2B] rounded-[32px] px-6 py-2 lg:px-8 lg:py-10 lg:border border-[#325A3C] lg:shadow-[0_10px_30px_rgba(50,90,60,0.25)]">
          <div className="absolute left-12 top-16 bottom-16 w-[2px] bg-[#1E3F2B]/50 hidden md:block" />
          <div className="flex lg:flex-col flex-row lg:gap-8 gap-2 justify-center items-center lg:justify-start lg:items-start">
            {timeline.map((step, idx) => (
              <div key={step.title} className="relative flex lg:items-start gap-4">
                <div
                  className={`
                    hidden lg:flex relative z-10 mt-1 h-10 w-10 items-center justify-center rounded-2xl text-[#1E3F2B] shadow-md border border-black/60
                    ${idx <= 1 ? "bg-white" : "bg-gray-300"}
                  `}
                >
                  {step.icon}
                </div>
                <div>
                  <p className="hidden lg:block font-medium text-lg tracking-tight">
                    {step.title}
                  </p>
                  <p className="hidden lg:block text-sm text-[#1E3F2B]/80">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Content */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className="relative flex-1 rounded-[32px] px-8 md:px-12"
      >
        <div className="space-y-4">
          <h2
            className="text-2xl md:text-xl text-[#5B4331] tracking-tight font-medium leading-tight"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
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
          <div className="w-full h-px bg-[#5B4331]/30 mt-4" />
        </div>

        <div className="mt-6 space-y-6">
          <p className="text-sm md:text-base text-[#6F5B4C] max-w-xl leading-relaxed">
            Thank you, Pawan. Your photos are with our dermatology team now.<br/><br/>They&apos;ll review your skin carefully and discuss your tailored treatment plan within the next 8–12 hours (or sooner).<br/><br/>We&apos;ll message you on your verified WhatsApp number, and your consultation will appear in your Consultation tab.<br/><br/>This dashboard is your skin&apos;s personal space :)
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-[#5B4331]/30 px-6 py-3 text-sm font-semibold text-[#5B4331] hover:bg-[#5B4331]/5 transition-colors"
          >
           Back
          </button>
          <button
            type="button"
            onClick={onNext}
            className="box-border px-6 py-3 bg-[#1E3F2B] border-[0.767442px] border-[#1F3F2A] shadow-[0px_3.06977px_3.06977px_rgba(0,0,0,0.25)] rounded-full font-medium text-white flex items-center justify-center transition-opacity hover:opacity-90 text-sm"
          >
            Continue
          </button>
        </div>
      </motion.div>
      </div>
    </motion.div>
  )
}
