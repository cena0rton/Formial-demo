/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  IconHeart, 
  IconTarget, 
  IconSparkles, 
  IconCamera, 
  IconX, 
  IconCheck, 
  IconArrowLeft
} from '@tabler/icons-react'

export type OnboardingStepType =
  | "welcome"
  | "dashboard-tour"
  | "progress-tracking"
  | "photo-guide"
  | "chat-intro"
  | "action"

export interface OnboardingStep {
  id: number
  title: string
  subtitle: string
  description?: string
  ctaLabel: string
  secondaryCtaLabel?: string
  successMessage: string
  helpText: string[]
  icon: React.ComponentType<{ className?: string }>
  type: OnboardingStepType
  features?: string[]
  imageUrl?: string
}

export const postTreatmentSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Start by uploading your photos",
    subtitle: "Your skin progress begins here",
    description: "Taking your first photos helps us and you track real progress from day one.",
    ctaLabel: "Upload photo",
    successMessage: "Photo uploaded! This is your first step towards better skin.",
    helpText: [
      "Use good lighting for best results",
      "Consistent, regular photos help visualize your progress",
    ],
    icon: IconCamera,
    type: "photo-guide",
  },
  {
    id: 2,
    title: "Formial will take care of your skin",
    subtitle: "We monitor and guide you",
    description: "Let us handle the science and reminders. Just follow your plan—Formial is here to support your skin journey.",
    ctaLabel: "Continue",
    successMessage: "You’re in good hands. We’ll guide you each step.",
    helpText: [
      "Personalized treatments are always up to date",
      "Get advice and reminders tailored just for you"
    ],
    icon: IconHeart,
    type: "welcome",
  },
  {
    id: 3,
    title: "Track, improve, and celebrate",
    subtitle: "Stay motivated as your skin transforms",
    description: "View your progress, reflect on changes, and celebrate milestones as you achieve your goals.",
    ctaLabel: "Let’s go",
    successMessage: "You're ready to get started!",
    helpText: [
      "Check your dashboard to see your journey",
      "Reach out to our experts anytime you need help"
    ],
    icon: IconSparkles,
    type: "progress-tracking",
  }
]

interface OnboardingFlowProps {
  onComplete?: (action: "photo" | "chat") => void
}

export function OnboardingModal({ onComplete }: OnboardingFlowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const step = postTreatmentSteps[currentStep]
  const progress = ((currentStep + 1) / postTreatmentSteps.length) * 100
  const isLastStep = currentStep === postTreatmentSteps.length - 1

  useEffect(() => {
    const hasCompleted = localStorage.getItem('formial-onboarding-completed')
    if (!hasCompleted) {
      setTimeout(() => {
        setIsOpen(true)
      }, 500)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < postTreatmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = (action?: "photo" | "chat") => {
    setIsCompleted(true)
    localStorage.setItem('formial-onboarding-completed', 'true')
    
    setTimeout(() => {
      setIsOpen(false)
      if (action && onComplete) {
        onComplete(action)
      }
    }, 1500)
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('formial-onboarding-completed', 'true')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed  inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center tracking-tight"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-gradient-to-br from-[#f8f6ee] to-[#e5e1d2] shadow-2xl w-full overflow-hidden flex flex-col h-screen"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#1E3F2B] to-[#1E3F2B]/90 p-6 text-white">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 bg-white/30 cursor-pointer rounded-full transition-colors"
            >
               <span className='text-sm font-medium '> Skip for now ?</span>
            </button>
            
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-transparent">
                {React.createElement(step.icon, { className: "h-6 w-6 text-green-200" })}
              </div>
              <div>
                <h2 className="text-xl font-zillaSlabHighlight">{step.title}</h2>
                <p className="text-sm opacity-90">Step {currentStep + 1} of {postTreatmentSteps.length}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-full h-2"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex-1 overflow-y-auto scrollbar-thin [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100/20
  [&::-webkit-scrollbar-thumb]:bg-green-900/20
  [&::-webkit-scrollbar-thumb]:rounded-full
  max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              {/* Context/Content - Left Side */}
              <div className="flex-1 min-w-0">
                {/* Step-specific content */}
{currentStep === 0 && (
                  <div className="space-y-6">
                    {/* Header Section */}
                    <div className="space-y-3">
                      <h3 className="text-3xl font-semibold text-[#1E3F2B]">Welcome to Formial!</h3>
                      <p className="text-lg text-gray-700">To get started please <span className='bg-[#e6f7ed]  px-2'>upload your photos</span></p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Your photos are visible only to the clinician dermatologist for the duration until a prescription is reached. They are securely stored and encrypted.
                      </p>
                    </div>
                    
                    {/* Progress Tracker */}
                    <div className="inline-block bg-[#1E3F2B] text-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium">
                      0/3 uploaded
                    </div>

                    {/* Front Image Upload Section */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6'>
                    <div className="bg-white rounded-xl p-6 border border-gray-200 min-w-md">
                      <div className="flex gap-6">
                        {/* Main Image Preview */}
                        <div className="flex-1">
                          <div className="aspect-square bg-gray-50 rounded-lg border border-gray-200 overflow-hidden relative">
                            <Image
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                              alt="Front view"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Secondary Preview & Upload */}
                        <div className="flex-1 flex flex-col gap-4">
                          <div className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                            <span className="text-sm text-gray-400">No image</span>
                          </div>
                        </div>
                        
                      </div>
                      <button className="bg-[#1E3F2B] text-white px-6 py-3 mt-4 rounded-lg font-medium hover:bg-[#1E3F2B]/90 transition-colors">
                            Upload Front Image
                          </button>
                    </div>

                    {/* Right Image Upload Section */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 min-w-md">
                      <div className="flex gap-6">
                        {/* Main Image Preview */}
                        <div className="flex-1">
                          <div className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden relative">
                          <Image
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                              alt="Front view"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Secondary Preview & Upload */}
                        <div className="flex-1 flex flex-col gap-4">
                          <div className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                            <span className="text-sm text-gray-400">No image</span>
                          </div>
                        </div>
                        
                      </div>
                      <button className="bg-[#1E3F2B] text-white px-6 py-3 mt-4 rounded-lg font-medium hover:bg-[#1E3F2B]/90 transition-colors">
                            Upload Right Image
                          </button>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-200 min-w-md">
                      <div className="flex gap-6">
                        {/* Main Image Preview */}
                        <div className="flex-1">
                          <div className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden relative">
                          <Image
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                              alt="Front view"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Secondary Preview & Upload */}
                        <div className="flex-1 flex flex-col gap-4">
                          <div className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                            <span className="text-sm text-gray-400">No image</span>
                          </div>
                        </div>
                        
                      </div>
                      <button className="bg-[#1E3F2B] text-white px-6 py-3 mt-4 rounded-lg font-medium hover:bg-[#1E3F2B]/90 transition-colors">
                            Upload Left Image
                          </button>
                    </div>
                    </div>
                  </div>
                )}

 {currentStep === 1 && (
        <div>
         <h3 className="text-3xl font-extrabold text-[#21513a] mb-4 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
       <span>
         <IconHeart className="inline-block h-7 w-7 text-[#70bc79] mr-1 animate-pulse" />
       </span>
       We&apos;re Here for You
     </h3>
     <p className="text-gray-600 mb-8 text-center md:text-left max-w-2xl mx-auto md:mx-0">
       Your dedicated care team <span className="bg-[#e6f7ed] px-1.5 rounded text-[#1E3F2B] font-medium">monitors your progress</span> and provides 
       <span className="ml-1 bg-[#e6f7ed] px-1.5 rounded text-[#1E3F2B] font-medium">personalized guidance</span>—every step of the way.
     </p>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
       <div className="bg-gradient-to-tr from-[#eafaf0] to-[#f6fff9] rounded-2xl p-6 shadow-lg border-2 border-green-200 relative overflow-hidden group hover:shadow-xl transition-shadow">
         <div className="absolute -top-5 -right-5 opacity-10 blur-2xl text-green-300 group-hover:opacity-20 transition-all">
           <IconTarget className="h-16 w-16" />
         </div>
         <div className="flex items-center space-x-3 relative z-10">
           <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
             <IconTarget className="h-7 w-7 text-green-600 drop-shadow" />
           </div>
           <div>
             <span className="text-base font-bold text-[#1a3a27]">Personalized Treatment Plan</span>
             <p className="text-xs text-[#4a6b59] mt-1">Tailored for you, always kept up-to-date</p>
           </div>
         </div>
       </div>
       <div className="bg-gradient-to-tr from-[#eafaf0] to-[#f6fff9] rounded-2xl p-6 shadow-lg border-2 border-green-200 relative overflow-hidden group hover:shadow-xl transition-shadow">
         <div className="absolute -bottom-7 -left-7 opacity-10 blur-2xl text-green-300 group-hover:opacity-20 transition-all">
           <IconSparkles className="h-16 w-16" />
         </div>
         <div className="flex items-center space-x-3 relative z-10">
           <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
             <IconSparkles className="h-7 w-7 text-green-600 drop-shadow" />
           </div>
           <div>
             <span className="text-base font-bold text-[#1a3a27]">Formial Consultant</span>
             <p className="text-xs text-[#4a6b59] mt-1">Chat anytime for support, advice &amp; motivation</p>
           </div>
         </div>
       </div>

       <div className="bg-gradient-to-tr from-[#eafaf0] to-[#f6fff9] rounded-2xl p-6 shadow-lg border-2 border-green-200 relative overflow-hidden group hover:shadow-xl transition-shadow">
         <div className="absolute -bottom-7 -left-7 opacity-10 blur-2xl text-green-300 group-hover:opacity-20 transition-all">
           <IconSparkles className="h-16 w-16" />
         </div>
         <div className="flex items-center space-x-3 relative z-10">
           <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
             <IconSparkles className="h-7 w-7 text-green-600 drop-shadow" />
           </div>
           <div>
             <span className="text-base font-bold text-[#1a3a27]">Formial Consultant</span>
             <p className="text-xs text-[#4a6b59] mt-1">Chat anytime for support, advice &amp; motivation</p>
           </div>
         </div>
       </div>

       <div className="bg-gradient-to-tr from-[#eafaf0] to-[#f6fff9] rounded-2xl p-6 shadow-lg border-2 border-green-200 relative overflow-hidden group hover:shadow-xl transition-shadow">
         <div className="absolute -bottom-7 -left-7 opacity-10 blur-2xl text-green-300 group-hover:opacity-20 transition-all">
           <IconSparkles className="h-16 w-16" />
         </div>
         <div className="flex items-center space-x-3 relative z-10">
           <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
             <IconSparkles className="h-7 w-7 text-green-600 drop-shadow" />
           </div>
           <div>
             <span className="text-base font-bold text-[#1a3a27]">Formial Consultant</span>
             <p className="text-xs text-[#4a6b59] mt-1">Chat anytime for support, advice &amp; motivation</p>
           </div>
         </div>
       </div>


     </div>
     <div className="mt-8 flex items-center justify-center md:justify-start gap-2 mb-6">
       <div className="flex items-center gap-1">
         <IconCheck className="h-4 w-4 text-green-500" />
         <span className="text-xs text-green-800 font-medium">Real humans, not bots</span>
       </div>
       <span className="text-[#cbd5c3] text-xl">|</span>
       <div className="flex items-center gap-1">
         <IconCheck className="h-4 w-4 text-green-500" />
         <span className="text-xs text-green-800 font-medium">Daily accountability</span>
       </div>
     </div>
   </div>
 )}

                {currentStep === 2 && (
                  <div>
                    <h3 className="text-3xl font-extrabold text-[#21513a] mb-4 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
                      <span>
                        <IconSparkles className="inline-block h-7 w-7 text-[#70bc79] mr-1 animate-pulse" />
                      </span>
                      You're Doing Great
                    </h3>
                    <p className="text-gray-600 mb-8 text-center md:text-left max-w-2xl mx-auto md:mx-0">
                      Stay consistent and remember: every step you take is moving you closer to your <span className="bg-[#e6f7ed] px-1.5 rounded text-[#1E3F2B] font-medium">healthiest skin yet</span>. 
                      We're here to support you with <span className="ml-1 bg-[#e6f7ed] px-1.5 rounded text-[#1E3F2B] font-medium">expert advice</span> at every stage.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="bg-gradient-to-tr from-[#eafaf0] to-[#f6fff9] rounded-2xl p-6 shadow-lg border-2 border-green-200 relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute -top-5 -right-5 opacity-10 blur-2xl text-green-300 group-hover:opacity-20 transition-all">
                          <IconTarget className="h-16 w-16" />
                        </div>
                        <div className="flex items-center space-x-3 relative z-10">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
                            <IconTarget className="h-7 w-7 text-green-600 drop-shadow" />
                          </div>
                          <div>
                            <span className="text-base font-bold text-[#1a3a27]">Track Your Progress</span>
                            <p className="text-xs text-[#4a6b59] mt-1">Monitor changes and celebrate milestones</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-tr from-[#eafaf0] to-[#f6fff9] rounded-2xl p-6 shadow-lg border-2 border-green-200 relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute -bottom-7 -left-7 opacity-10 blur-2xl text-green-300 group-hover:opacity-20 transition-all">
                          <IconHeart className="h-16 w-16" />
                        </div>
                        <div className="flex items-center space-x-3 relative z-10">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
                            <IconHeart className="h-7 w-7 text-green-600 drop-shadow" />
                          </div>
                          <div>
                            <span className="text-base font-bold text-[#1a3a27]">Stay Motivated</span>
                            <p className="text-xs text-[#4a6b59] mt-1">Consistent care leads to amazing results</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-tr from-[#eafaf0] to-[#f6fff9] rounded-2xl p-6 shadow-lg border-2 border-green-200 relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute -top-5 -right-5 opacity-10 blur-2xl text-green-300 group-hover:opacity-20 transition-all">
                          <IconSparkles className="h-16 w-16" />
                        </div>
                        <div className="flex items-center space-x-3 relative z-10">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
                            <IconSparkles className="h-7 w-7 text-green-600 drop-shadow" />
                          </div>
                          <div>
                            <span className="text-base font-bold text-[#1a3a27]">Expert Support</span>
                            <p className="text-xs text-[#4a6b59] mt-1">Our consultants are always here to help</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-tr from-[#eafaf0] to-[#f6fff9] rounded-2xl p-6 shadow-lg border-2 border-green-200 relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute -bottom-7 -left-7 opacity-10 blur-2xl text-green-300 group-hover:opacity-20 transition-all">
                          <IconCheck className="h-16 w-16" />
                        </div>
                        <div className="flex items-center space-x-3 relative z-10">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
                            <IconCheck className="h-7 w-7 text-green-600 drop-shadow" />
                          </div>
                          <div>
                            <span className="text-base font-bold text-[#1a3a27]">You're Ready</span>
                            <p className="text-xs text-[#4a6b59] mt-1">Time to start your skin transformation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex items-center justify-center md:justify-start gap-2 mb-6">
                      <div className="flex items-center gap-1">
                        <IconCheck className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-800 font-medium">Progress starts with you</span>
                      </div>
                      <span className="text-[#cbd5c3] text-xl">|</span>
                      <div className="flex items-center gap-1">
                        <IconCheck className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-800 font-medium">We're here to support you</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Help Text */}
                {step.helpText && step.helpText.length > 0 && (
                  <div className="bg-gradient-to-r from-[#1E3F2B]/10 to-[#90C494]/10 border border-[#1E3F2B]/20 rounded-2xl p-6 space-y-3">
                    {step.helpText.map((text, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#1E3F2B] rounded-full"></div>
                        <p className="text-sm text-gray-700 font-medium">{text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Success Message (shown briefly after completion) */}
                <AnimatePresence>
                  {isCompleted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg"
                    >
                      <div className="flex items-center space-x-3 text-green-700">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <IconCheck className="h-5 w-5" />
                        </div>
                        <span className="font-semibold text-lg">{step.successMessage}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Images/Big Icons - Right Side */}
              {/* <div className="hidden lg:flex flex-1 min-w-[300px] flex-col items-center justify-center">
                {currentStep === 0 && (
                  <div className="w-full max-w-sm">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200">
                      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <IconCamera className="h-16 w-16 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="w-full max-w-sm">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200">
                      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <IconHeart className="h-16 w-16 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="w-full max-w-sm">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200">
                      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <IconSparkles className="h-16 w-16 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}
              </div> */}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-white">
            {/* CTA Buttons */}
            <div className="flex gap-4 justify-between items-center max-w-5xl mx-auto">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#1E3F2B] hover:bg-gray-50'
                }`}
              >
                <IconArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back</span>
              </button>

              <div className="flex gap-4">
                {isLastStep ? (
                  <>
                    <button
                      onClick={() => handleComplete("chat")}
                      className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      {step.secondaryCtaLabel}
                    </button>
                    <button
                      onClick={() => handleComplete("photo")}
                      className="bg-[#1E3F2B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1E3F2B]/90 transition-colors"
                    >
                      {step.ctaLabel}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-[#1E3F2B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1E3F2B]/90 transition-colors"
                  >
                    {step.ctaLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OnboardingModal