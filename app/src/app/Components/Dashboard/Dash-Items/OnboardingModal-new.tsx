"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconX } from "@tabler/icons-react"
import WelcomeStep from "./onboarding/welcome-step"
import UploadStep from "./onboarding/upload-step"
import DoctorReviewStep from "./onboarding/doctor-review-step"
import FormulationStep from "./onboarding/formulation-step"
import Image from "next/image"

export default function OnboardingModal() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isOpen, setIsOpen] = useState(true)
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
  const [userName] = useState("User")

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleComplete = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col"
        style={{ backgroundColor: "#F2F0E0" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
           <Image src="/Formial.webp" alt="Formial" width={120} height={40} className="h-8 w-auto" />
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <IconX className="h-5 w-5 text-[#1E3F2B]" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 overflow-y-auto">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <WelcomeStep key="welcome" userName={userName} onNext={handleNext} onSkip={handleSkip} />
              )}
              {currentStep === 1 && (
                <UploadStep
                  key="upload"
                  uploadedPhotos={uploadedPhotos}
                  setUploadedPhotos={setUploadedPhotos}
                  onNext={handleNext}
                  onBack={handleBack}
                  onSkip={handleSkip}
                />
              )}
              {currentStep === 2 && (
                <DoctorReviewStep key="doctor" onNext={handleNext} onBack={handleBack} onSkip={handleSkip} />
              )}
              {currentStep === 3 && (
                <FormulationStep key="formulation" onBack={handleBack} onComplete={handleComplete} />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer with Progress */}
        <div className="flex items-center justify-center gap-3 pb-8">
          {[1, 2, 3].map((step) => (
            <motion.div
              key={step}
              className="h-2 rounded-full transition-all"
              animate={{
                width: currentStep >= step ? 32 : 8,
                backgroundColor: currentStep >= step ? "#1E3F2B" : "#D1D5DB",
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
