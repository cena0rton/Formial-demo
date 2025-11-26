"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

import WelcomeStep1 from "./onboarding/welcome-step-1"
import WelcomeStep2 from "./onboarding/welcome-step-2"
import WelcomeStep3 from "./onboarding/welcome-step-3"
import UploadStep from "./onboarding/upload-step"
import FormulationStep from "./onboarding/formulation-step"
import Image from "next/image"

interface OnboardingModalProps {
  onComplete?: () => void
}

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
  const [userDetails] = useState({
    name: "Pawan",
    phone: "+91 98765 43210",
    address: "123, Main Street, blr, INDIA",
  })
  const userFirstName = userDetails.name.split(" ")[0] || userDetails.name

  const handleRefreshDetails = useCallback(() => {
    console.info("Refresh user details requested")
  }, [])

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    if (currentStep < 4) {
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
    
    // Notify parent component that onboarding is complete
    if (onComplete) {
      onComplete()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col overflow-x-hidden"
        style={{ backgroundColor: "#F2F0E0" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 md:py-6 py-6 border-b border-gray-200 bg-[#1E3F2B]">
          <div className="flex items-center gap-3">
           <Image src="https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240" alt="Formial" width={120} height={40} className="md:h-8 h-6 w-auto " />
          </div>
          {/* <button onClick={handleClose} className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <IconX className="h-5 w-5 text-[#1E3F2B]" />
          </button> */}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-7xl mx-auto w-full pb-12">
          {/* Mobile Progress Bar */}
          {currentStep > 0 && (
            <div className="lg:hidden w-full px-6 pt-6  md:-pb-0 flex items-center justify-center">
              <div className="w-full bg-[#7CB58D] rounded-full px-8 py-4 flex items-center justify-between gap-6 border border-black/50 tracking-tighter font-lexend-exa"
              
              >
                <span className={`text-xs font-medium ${currentStep >= 1 && currentStep <= 2 ? 'text-[#1E3F2B] font-bold' : 'text-[#5B4331]/70'}`}>
                  Verification
                </span>
                <span className={`text-xs font-medium ${currentStep === 3 ? 'text-[#1E3F2B] font-bold' : 'text-[#5B4331]/70'}`}>
                 Upload Photos
                </span>
                <span className={`text-xs font-medium ${currentStep === 4 ? 'text-[#1E3F2B] font-bold' : 'text-[#5B4331]/70'}`}>
                  Consult
                </span>
              </div>
            </div>
          )}
          <div className="px-0 items-center justify-center -mt-6 md:-mt-0">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <WelcomeStep1 key="welcome1" userName={userFirstName} onNext={handleNext} />
              )}
              {currentStep === 1 && (
                <WelcomeStep2
                  key="welcome2"
                  userDetails={userDetails}
                  onNext={handleNext}
                  onBack={handleBack}
                  onRefresh={handleRefreshDetails}
                />
              )}
              {currentStep === 2 && (
                <WelcomeStep3
                  key="welcome3"
                  userDetails={userDetails}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              )}
              {currentStep === 3 && (
                <div className="px-4 sm:px-6 md:px-10">
                  <UploadStep
                    key="upload"
                    uploadedPhotos={uploadedPhotos}
                    setUploadedPhotos={setUploadedPhotos}
                    onNext={handleNext}
                    onBack={handleBack}
                    onSkip={handleSkip}
                  />
                </div>
              )}
              {currentStep === 4 && (
                <div className="px-4 sm:px-6 md:px-10">
                  <FormulationStep key="formulation" onBack={handleBack} onComplete={handleComplete} />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer with Progress */}
        {currentStep >= 3 && (
          <div className="flex items-center justify-center gap-3 py-4">
            {[0, 1].map((step) => {
              // Map main step indices (upload, formulation) to progress dots
              const stepProgress = currentStep - 3
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
