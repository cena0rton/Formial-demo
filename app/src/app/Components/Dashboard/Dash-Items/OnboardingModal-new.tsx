"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import WelcomeStep1 from "./onboarding/welcome-step-1"
import WelcomeStep2 from "./onboarding/welcome-step-2"
import UploadStep from "./onboarding/upload-step"
import DoctorReviewStep from "./onboarding/doctor-review-step"
import FormulationStep from "./onboarding/formulation-step"
import Image from "next/image"

interface OnboardingModalProps {
  onComplete?: () => void
}

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if onboarding was already completed
    const onboardingCompleted = localStorage.getItem('formial-onboarding-completed')
    if (!onboardingCompleted) {
      setIsOpen(true)
    }
  }, [])
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
  const [userName] = useState("User")


  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleComplete = async () => {
    // Save uploaded photos to localStorage as data URLs
    if (uploadedPhotos.length > 0) {
      const photoDataUrls: string[] = []
      for (const photo of uploadedPhotos) {
        if (photo) {
          try {
            const dataUrl = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader()
              reader.onload = () => resolve(reader.result as string)
              reader.onerror = reject
              reader.readAsDataURL(photo)
            })
            photoDataUrls.push(dataUrl)
          } catch (error) {
            console.error('Error converting photo to data URL:', error)
          }
        }
      }
      if (photoDataUrls.length > 0) {
        localStorage.setItem('formial-uploaded-photos', JSON.stringify(photoDataUrls))
      }
    }
    
    localStorage.setItem('formial-onboarding-completed', 'true')
    setIsOpen(false)
    // Notify parent component to show dashboard
    if (onComplete) {
      onComplete()
    }
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
        <div className="flex items-center justify-between px-8 md:py-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
           <Image src="/Formial.webp" alt="Formial" width={120} height={40} className="md:h-8 h-6 w-auto " />
          </div>
          {/* <button onClick={handleClose} className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <IconX className="h-5 w-5 text-[#1E3F2B]" />
          </button> */}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-7xl mx-auto">
          <div className="px-0 items-center justify-center">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <WelcomeStep1 key="welcome1" userName={userName} onNext={handleNext} />
              )}
              {currentStep === 1 && (
                <WelcomeStep2 key="welcome2" onNext={handleNext} />
              )}
              {currentStep === 2 && (
                <div className="px-8 mt-20">
                  <div className="w-full max-w-4xl mx-auto">
                    <UploadStep
                      key="upload"
                      uploadedPhotos={uploadedPhotos}
                      setUploadedPhotos={setUploadedPhotos}
                      onNext={handleNext}
                      onBack={handleBack}
                      onSkip={handleSkip}
                    />
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="px-8 mt-20">
                  <div className="w-full max-w-4xl mx-auto">
                    <DoctorReviewStep key="doctor" onNext={handleNext} onBack={handleBack} onSkip={handleSkip} />
                  </div>
                </div>
              )}
              {currentStep === 4 && (
                <div className="px-8 mt-20">
                  <div className="w-full max-w-4xl mx-auto">
                    <FormulationStep key="formulation" onBack={handleBack} onComplete={handleComplete} />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer with Progress */}
        {currentStep > 0 && (
          <div className="flex items-center justify-center gap-3 py-4">
            {[0, 1, 2].map((step) => {
              // Map step indices to progress dots (0,1 are welcome, 2-4 are main steps)
              const stepProgress = currentStep - 2
              return (
                <motion.div
                  key={step}
                  className="h-2 rounded-full transition-all"
                  animate={{
                    width: stepProgress >= step ? 32 : 8,
                    backgroundColor: stepProgress >= step ? "#1E3F2B" : "#D1D5DB",
                  }}
                />
              )
            })}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
