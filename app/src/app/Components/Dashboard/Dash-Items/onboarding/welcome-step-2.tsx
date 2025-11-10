"use client"

import React from "react"
import { motion } from "framer-motion"
import { IconCheck, IconRefresh, IconShieldLock, IconUser, IconPhone, IconMail } from "@tabler/icons-react"

interface WelcomeStep2Props {
  userDetails: {
    name: string
    phone: string
    email: string
  }
  onNext: () => void
  onBack: () => void
  onRefresh?: () => void
}

export default function WelcomeStep2({ userDetails, onNext, onBack, onRefresh }: WelcomeStep2Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col md:flex-col tracking-tight md:items-center md:justify-between gap-10 px-6 md:px-16 py-12 w-full max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 space-y-6"
      >
        
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-2xl md:text-3xl font-medium text-[#1E3F2B] leading-tight"
        >
          Let’s make sure we’ve got
          <br />
          your details correct.
        </motion.h2>

        <p className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-xl">
          These details help&apos;s us personalise your treatment plan and keep you updated at every step.
          Please confirm everything looks perfect before we proceed.
        </p>

        <div className="flex items-center w-fit rounded-xl gap-3 text-sm text-gray-500 border-1 border-neutral-300 px-2 py-1">
          <IconShieldLock size={18} className="text-[#1E3F2B]" />
          <span>We encrypt your details and never share them without your permission.</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.45, type: "spring", stiffness: 120 }}
        className="flex-1 w-full"
      >
        <div className="bg-[#f2f0e0] relative rounded-[20px] border border-[#1E3F2B] px-6 md:px-10 py-8 space-y-8 ">
          
          <div className="flex relative z-10 items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#1E3F2B]/60 font-semibold">
                profile snapshot
              </p>
              <h3 className="text-xl font-medium text-[1E3F2B] mt-1">Confirm your Details</h3>
            </div>
          </div>

          <div className="space-y-5">
            <DetailRow icon={<IconUser size={20} />} label="Full name" value={userDetails.name} />
            <DetailRow icon={<IconPhone size={20} />} label="Mobile number" value={userDetails.phone} />
            <DetailRow icon={<IconMail size={20} />} label="Email address" value={userDetails.email} />
          </div>

          {/* <div className="rounded-2xl border border-dashed border-[#1E3F2B]/20 bg-[#F2F0E0]/60 px-5 py-4 text-sm text-gray-600 leading-relaxed">
            <strong className="text-[#1E3F2B]">Need a change?</strong> Let our care team know during your doctor
            consultation or reach us at{" "}
            <a href="mailto:care@formial.in" className="underline hover:text-[#1E3F2B] font-medium">
              care@formial.in
            </a>
            . We’ll update it instantly.
          </div> */}

        
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2 mt-6">
            <button
              type="button"
              onClick={onBack}
              className="w-full bg-[#F2F0E0] md:w-auto rounded-full border border-[#1E3F2B]/30 text-[#1E3F2B] px-6 py-3 font-medium hover:bg-[#1E3F2B]/10 transition-all"
            >
              Go back
            </button>
            <button
              type="button"
              onClick={onNext}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3F2B] px-8 py-3 font-semibold text-white hover:bg-[#163021] transition-all"
            >
              <IconCheck size={18} />
              Looks good, continue
            </button>
          </div>
      </motion.div>
    </motion.div>
  )
}

interface DetailRowProps {
  icon: React.ReactNode
  label: string
  value: string
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 rounded-xl border border-[#1E3F2B]/10 bg-[#F8F7EF] px-4 py-4"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F7EF] text-[#1E3F2B] shadow-inner border-1 border-[#dad9d6]">
        {icon}
      </div>
      <div className="w-full">
        <p className="text-xs uppercase tracking-[0.2em] text-[#1E3F2B]/60 px-2 font-semibold">{label}</p>
        <input
        value={value}
        
        className="text-base md:text-lg w-full font-medium text-[#1E3F2B] mt-1 px-2 outline-none focus:ring-1 focus:ring-[#1E3F2B]/30 rounded-xl"></input>
      </div>
    </motion.div>
  )
}


