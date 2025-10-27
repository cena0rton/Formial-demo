'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconX,
  IconArrowRight,
  IconArrowLeft,
  IconCheck,
  IconCamera,
  IconHeart,
  IconTarget,
  IconSparkles,
  IconShield,
} from '@tabler/icons-react'

interface OnboardingStep {
  id: number
  title: string
  subtitle: string
  ctaLabel: string
  successMessage: string
  helpText: [string, string]
  icon: React.ComponentType<{ className?: string }>
  type: 'welcome' | 'form' | 'photo' | 'results'
}

const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Welcome to Your Treatment Dashboard",
      subtitle: "Let's explore how to track your skincare journey effectively",
      ctaLabel: "Start Tour",
      successMessage: "Perfect! Let's show you everything you need to know.",
      helpText: [
        "We'll guide you through the key features of your dashboard.",
        "This will help you make the most of your skincare journey."
      ],
      icon: IconHeart,
      type: 'welcome'
    },
    {
      id: 2,
      title: "Track Your Progress",
      subtitle: "Learn how to monitor your skin transformation over time",
      ctaLabel: "Next: Get Insights",
      successMessage: "Great! You now know how to track your progress effectively.",
      helpText: [
        "Upload photos regularly to see your skin improvement with AI analysis.",
        "View detailed progress reports and celebrate your skincare milestones."
      ],
      icon: IconTarget,
      type: 'form'
    },
    {
      id: 3,
      title: "AI-Powered Insights",
      subtitle: "Discover how to get personalized recommendations and analysis",
      ctaLabel: "Next: Chat Support",
      successMessage: "Excellent! You can now access AI-powered skin analysis.",
      helpText: [
        "Our AI analyzes your skin photos to provide personalized recommendations.",
        "Get instant feedback on your skin condition and improvement suggestions."
      ],
      icon: IconSparkles,
      type: 'form'
    },
    {
      id: 4,
      title: "Chat with Your Care Team",
      subtitle: "Learn how to get instant support and ask questions",
      ctaLabel: "Next: Upload Photos",
      successMessage: "Awesome! You can now chat with your care team anytime.",
      helpText: [
        "Ask any skincare questions and get instant, personalized answers.",
        "Get product recommendations, routine advice, and expert guidance 24/7."
      ],
      icon: IconCamera,
      type: 'photo'
    },
    {
      id: 5,
      title: "Ready to Upload & Chat",
      subtitle: "You're all set! Start uploading photos or chat with your care team",
      ctaLabel: "Upload My First Photo",
      successMessage: "Welcome to Formial! Your dashboard is ready for your skincare journey.",
      helpText: [
        "Upload your first progress photo to start tracking your transformation.",
        "Or jump into chat to ask questions about your treatment routine."
      ],
      icon: IconShield,
      type: 'results'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCompleted(true)
      setTimeout(() => {
        setIsOpen(false)
        localStorage.setItem('formial-onboarding-completed', 'true')
      }, 2000)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    if (isCompleted || currentStep === 0) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    // Check if onboarding has been completed
    const hasCompleted = localStorage.getItem('formial-onboarding-completed')
    if (!hasCompleted) {
      // Small delay to ensure the page is fully loaded
      setTimeout(() => {
        setIsOpen(true)
      }, 500)
    }
    // For testing - uncomment the line below to always show the modal
    // setIsOpen(true)
  }, [])

  if (!isOpen) return null

  const currentStepData = steps[currentStep]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden"
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
              <div className="p-3 rounded-xl bg-white/20">
                {React.createElement(currentStepData.icon, { className: "h-6 w-6 text-white" })}
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentStepData.title}</h2>
                <p className="text-sm opacity-90">Step {currentStep + 1} of {steps.length}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-full h-2"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Subtitle */}
              <p className="text-gray-600 text-lg leading-relaxed text-center">
                {currentStepData.subtitle}
              </p>

              {/* Dashboard Feature Explanations */}
              {currentStep === 1 && (
                <div className="text-center space-y-4 w-full">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
                    <p className="text-gray-700 text-sm text-center">
                      We&apos;ll guide you through the key features of your dashboard.
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      This will help you make the most of your skincare journey.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconTarget className="h-5 w-5 text-blue-300" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Progress Tracking</h4>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Upload photos weekly to track your transformation</li>
                      <li>• View side-by-side comparisons of your progress</li>
                      <li>• Get AI-powered analysis of your skin improvement</li>
                      <li>• Celebrate milestones and achievements</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <IconSparkles className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">AI Insights</h4>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Get personalized skin analysis from your photos</li>
                      <li>• Receive product recommendations based on your progress</li>
                      <li>• Track skin health scores and improvement metrics</li>
                      <li>• Get alerts for routine adjustments</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <IconCamera className="h-5 w-5 text-yellow-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Chat Support</h4>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Ask questions about your treatment routine</li>
                      <li>• Get instant answers from AI and care team</li>
                      <li>• Share concerns or side effects</li>
                      <li>• Get product recommendations and usage tips</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconCheck className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">You&apos;re All Set!</h3>
                      <p className="text-gray-600 text-sm mb-4">Your dashboard is ready for your skincare journey.</p>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <button className="bg-[#1E3F2B] text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-[#1E3F2B]/90 transition-colors">
                          Upload First Photo
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                          Start Chatting
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Help Text */}
              <div className="space-y-2 text-sm text-gray-500">
                <p>{currentStepData.helpText[0]}</p>
                <p>{currentStepData.helpText[1]}</p>
              </div>

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
                      <span className="font-medium">{currentStepData.successMessage}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="w-full bg-[#1E3F2B] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#1E3F2B]/90 transition-colors text-lg"
              >
                {currentStepData.ctaLabel}
              </motion.button>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
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
                  <span>Previous</span>
                </button>

                <div className="flex space-x-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep ? 'bg-[#1E3F2B]' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 text-[#1E3F2B] hover:bg-[#1E3F2B]/10 px-4 py-2 rounded-lg transition-colors"
                >
                  <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
                  <IconArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OnboardingModal
