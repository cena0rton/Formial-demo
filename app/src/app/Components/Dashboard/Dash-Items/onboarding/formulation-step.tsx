"use client"

import { motion } from "framer-motion"
import { IconUser, IconCamera, IconRocket } from "@tabler/icons-react"

interface FormulationStepProps {
  onBack?: () => void
  onComplete: () => void
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
    icon: <IconRocket size={20} stroke={1.8} />,
  },
]

export default function FormulationStep({ onComplete }: FormulationStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col w-full max-w-6xl mx-auto text-[#3D2D1F]"
      style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
    >
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center px-0 sm:px-6 md:px-10 py-0 md:py-30">
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
                      ${idx <= 2 ? "bg-white" : "bg-gray-300"}
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
          <div className="space-y-6">
            {/* Heading with Rocket Icon */}
            <div className="flex items-center gap-3">
              <h2
                className="text-xl md:text-4xl font-bold text-black leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
              >
                You&apos;re all set!
              </h2>
              <IconRocket size={32} className="text-black" strokeWidth={2} />
            </div>

            {/* Description Text */}
            <div className="space-y-4 mt-8">
              <p className="text-base md:text-lg text-black leading-relaxed tracking-tight"
              style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}>
                Your secure dashboard now contains your clinical photos, progress insights, and your tailored treatment plan.
              </p>
              <p className="text-base md:text-lg text-black leading-relaxed tracking-tight"
              style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}>
                You can access everything anytime
              </p>
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-10 flex items-center justify-start">
            <button
              type="button"
              onClick={onComplete}
              className="box-border px-8 py-3 bg-[#1E3F2B] border-[0.767442px] border-[#1F3F2A] shadow-[0px_3.06977px_3.06977px_rgba(0,0,0,0.25)] rounded-full font-medium text-white flex items-center justify-center transition-opacity hover:opacity-90 text-sm uppercase"
            >
              Next
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
