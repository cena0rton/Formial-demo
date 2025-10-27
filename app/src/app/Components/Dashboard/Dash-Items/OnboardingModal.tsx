'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  IconHeart, 
  IconTarget, 
  IconSparkles, 
  IconCamera, 
  IconShield, 
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
    title: "Welcome to your treatment journey",
    subtitle: "Your personalized skincare plan is now active",
    description: "Let's get you set up to track progress and achieve your best skin.",
    ctaLabel: "Get started",
    successMessage: "Great! Let's explore your dashboard.",
    helpText: ["This quick tour takes about 2 minutes", "You can skip anytime and return later"],
    icon: IconHeart,
    type: "welcome",
  },
  {
    id: 2,
    title: "Your dashboard",
    subtitle: "Everything you need in one place",
    description: "Here's what you'll find:",
    ctaLabel: "Continue",
    features: [
      "Progress tracking - Monitor your skin improvements",
      "Treatment plan - Your routine and recommendations",
      "Photo timeline - Visual proof of your results",
      "Expert chat - Get support anytime",
    ],
    successMessage: "Perfect! You've got the overview.",
    helpText: ["Check your dashboard daily to stay on track", "All your data is private and secure"],
    icon: IconTarget,
    type: "dashboard-tour",
  },
  {
    id: 3,
    title: "Track your progress",
    subtitle: "See real results over time",
    description: "We measure what matters:",
    ctaLabel: "Continue",
    features: [
      
      "Goal progress - How close you are to your goals",
      "Weekly insights - Trends and patterns",
      "Milestones - Celebrate your wins",
    ],
    successMessage: "Excellent! You understand the tracking system.",
    helpText: ["Most users see results in 4-8 weeks", "Consistency is key to success"],
    icon: IconSparkles,
    type: "progress-tracking",
  },
  {
    id: 4,
    title: "Upload photos",
    subtitle: "Visual tracking shows real transformation",
    description: "Regular photos help us provide better recommendations.",
    ctaLabel: "Continue",
    features: [
      "Before & after comparison - See your transformation",
      "AI analysis - Detailed skin assessment",
      "Personalized insights - Tailored recommendations",
      "Privacy protected - Your photos stay secure",
    ],
    successMessage: "Great! You're ready to track visually.",
    helpText: ["Upload every 2 weeks for best results", "Natural lighting works best"],
    icon: IconCamera,
    type: "photo-guide",
  },
  {
    id: 5,
    title: "Get expert support",
    subtitle: "Chat with our skincare specialists",
    description: "Have questions? We're here 24/7.",
    ctaLabel: "Continue",
    features: [
      "Instant answers - Get responses to your questions",
      "Expert guidance - Personalized advice",
      "Routine adjustments - Modify your plan as needed",
      "Educational content - Learn skincare science",
    ],
    successMessage: "Perfect! You have all the tools to succeed.",
    helpText: ["Don't hesitate to reach out", "The more you engage, the better our recommendations"],
    icon: IconShield,
    type: "chat-intro",
  },
  {
    id: 6,
    title: "You're all set",
    subtitle: "Choose your next step",
    description: "Ready to start your transformation.",
    ctaLabel: "Upload first photo",
    secondaryCtaLabel: "Go to chat",
    successMessage: "Welcome to your personalized skincare experience!",
    helpText: ["Start with a photo to establish your baseline", "Or jump into chat if you have questions"],
    icon: IconCheck,
    type: "action",
  },
]

interface OnboardingFlowProps {
  onComplete?: (action: "photo" | "chat") => void
  onSkip?: () => void
}

export function OnboardingModal({ onComplete, onSkip }: OnboardingFlowProps) {
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

  const handleSkip = () => {
    if (onSkip) {
      onSkip()
    }
    handleClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed  inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col h-180"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#1E3F2B] to-[#1E3F2B]/90 p-6 text-white">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <IconX className="h-5 w-5" />
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
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {/* Subtitle */}
              <p className="text-gray-600 text-lg leading-relaxed text-center font-bold">
                {step.subtitle}
              </p>

              {/* Description */}
              {step.description && (
                <p className="text-center text-gray-700 mb-6 text-sm">
                  {step.description}
                </p>
              )}

              {/* Features List */}
              {step.features && step.features.length > 0 && (
                <div className="space-y-3 mb-6">
                  {step.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-[#1E3F2B]/10 hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-[#1E3F2B] font-semibold mt-0.5 text-sm">→</div>
                      <p className="text-sm text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Help Text */}
              {step.helpText && step.helpText.length > 0 && (
                <div className="bg-[#1E3F2B]/5 border border-[#1E3F2B]/10 rounded-lg p-4 space-y-2">
                  {step.helpText.map((text, idx) => (
                    <p key={idx} className="text-xs text-gray-600 font-bold text-center">
                      {text}
                    </p>
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
                    className="bg-green-50 border border-green-200 rounded-xl p-4"
                  >
                    <div className="flex items-center space-x-2 text-green-700">
                      <IconCheck className="h-5 w-5" />
                      <span className="font-medium">{step.successMessage}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            {/* CTA Buttons */}
            <div className="flex gap-3 justify-between mb-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#1E3F2B] hover:bg-[#1E3F2B]/10'
                }`}
              >
                <IconArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <div className="flex gap-3">
                {isLastStep ? (
                  <>
                    <button
                      onClick={() => handleComplete("chat")}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                    >
                      {step.secondaryCtaLabel}
                    </button>
                    <button
                      onClick={() => handleComplete("photo")}
                      className="bg-[#1E3F2B] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1E3F2B]/90 transition-colors"
                    >
                      {step.ctaLabel}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-[#1E3F2B] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1E3F2B]/90 transition-colors"
                  >
                    {step.ctaLabel}
                  </button>
                )}
              </div>
            </div>

            {/* Skip Option */}
            {currentStep < postTreatmentSteps.length - 1 && (
              <div className="text-center">
                <button
                  onClick={handleSkip}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors font-medium"
                >
                  Skip tour
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OnboardingModal