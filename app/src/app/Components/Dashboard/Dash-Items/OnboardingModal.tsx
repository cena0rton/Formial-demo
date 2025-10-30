'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  IconX, 
  IconUpload,
  IconUser,
  IconFlask,
  IconArrowLeft
} from '@tabler/icons-react'

interface OnboardingFlowProps {
  onComplete?: () => void
}

// Typing effect component
const TypingText = ({ text, className = '', delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay + (currentIndex * 3)) // 30ms per character
      return () => clearTimeout(timeout)
    } else {
      // Hide cursor after typing is complete
      const cursorTimeout = setTimeout(() => setShowCursor(false), 500)
      return () => clearTimeout(cursorTimeout)
    }
  }, [currentIndex, text, delay])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  )
}

export function OnboardingModal({ onComplete }: OnboardingFlowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [photos, setPhotos] = useState<File[]>([])

  useEffect(() => {
    const hasCompleted = localStorage.getItem('formial-onboarding-completed')
    if (!hasCompleted) {
      setTimeout(() => {
        setIsOpen(true)
      }, 500)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('formial-onboarding-completed', 'true')
  }

  const handleSkip = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setIsOpen(false)
    localStorage.setItem('formial-onboarding-completed', 'true')
    if (onComplete) onComplete()
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setPhotos(prev => [...prev, ...files])
    }
  }

  const handleDeletePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50"
        style={{ backgroundColor: '#F2F0E0' }}
      >
        {/* Header with Logo */}
        <div className="absolute top-0 left-0 w-full backdrop-blur-sm z-20 border-b border-green-800/30" style={{ backgroundColor: '#F2F0E0' }}>
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            <Image
              src="/Formial.webp"
              alt="Formial"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <IconX className="h-5 w-5 text-gray-500" />
            </button>
              </div>
            </div>

        {/* Main Content */}
        <div className="h-full pt-24 flex items-center justify-center px-6 overflow-y-auto">
          <div className="w-full max-w-2xl py-24">
            <AnimatePresence mode="wait">
              {/* Step 0 - Welcome */}
              {currentStep === 0 && (
              <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="text-center space-y-8"
                >
                  <div className="space-y-5">
                    <h1 className="text-5xl font-semibold tracking-tight" style={{ color: '#1E3F2B' }}>
                      <TypingText text="Hi Pawan!" delay={3} />
                      <br className="block mt-2" />
                      <TypingText text="Welcome to Formial :)" delay={3} />
                    </h1>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-xl text-gray-500 font-light max-w-lg mx-auto leading-relaxed"
                    >
                      We are excited to help you unlock amazing skin !
                    </motion.p>
            </div>
                  <div className="pt-0 space-y-3 w-full max-w-sm mx-auto">
                    <button
                      onClick={handleNext}
                      className="w-full text-white py-3.5 px-6 rounded-lg transition-all duration-200 font-medium text-[15px] shadow-sm hover:shadow-md cursor-pointer" style={{ backgroundColor: '#1E3F2B' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3528'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E3F2B'}
                    >
                      Get started
                    </button>
                    <button
                      onClick={handleSkip}
                      className="w-full text-gray-400 py-2.5 px-4 hover:text-gray-600 transition-colors text-sm font-medium"
                    >
                      Skip for now
                    </button>
          </div>
                </motion.div>
              )}

              {/* Step 1 - Upload Pictures */}
              {currentStep === 1 && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1E3F2B' }}>
                        <IconUpload className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h2 className="text-4xl font-semibold tracking-tight" style={{ color: '#1E3F2B' }}>
                      <TypingText text="Upload Pictures" delay={3} />
                    </h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-lg text-gray-500 font-light"
                    >
                      Upload your skin photos for our doctor to review
                    </motion.p>
                    </div>

                  {/* Upload Area */}
                  <label className="block w-full">
                    <motion.div
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                      className="border-2 border-dashed border-gray-200 rounded-xl p-16 text-center hover:border-gray-300 transition-all duration-200 cursor-pointer bg-white/50 hover:bg-white/80 group"
                    >
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                          <IconUpload className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-base font-medium mb-1" style={{ color: '#1E3F2B' }}>
                            Click to upload photos
                          </p>
                          <p className="text-sm text-gray-500">
                            Take clear photos for best results
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </motion.div>
                  </label>

                  {/* Uploaded Photos Preview */}
                  {photos.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="w-full"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        {photos.map((photo, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative aspect-square bg-gray-100 rounded-lg border border-gray-200 group overflow-hidden"
                          >
                          <Image
                              src={URL.createObjectURL(photo)}
                              alt={`Upload ${index + 1}`}
                              fill
                              className="object-cover rounded-lg"
                            />
                            <button
                              onClick={() => handleDeletePhoto(index)}
                              className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/90 rounded-full flex items-center justify-center transition-opacity"
                            >
                              <IconX className="h-4 w-4 text-white" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-4 space-y-3">
                    <button
                      onClick={handleNext}
                      disabled={photos.length === 0}
                      className="w-full bg-gray-900 text-white py-3.5 px-6 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium text-[15px] shadow-sm hover:shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="flex-1 flex items-center justify-center text-gray-600 py-2.5 px-4 hover:bg-gray-100 transition-colors text-sm font-medium rounded-lg"
                        onMouseEnter={(e) => e.currentTarget.style.color = '#1E3F2B'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#4B5563'}
                      >
                        <IconArrowLeft className="h-4 w-4 mr-1" />
                        Back
                      </button>
                      <button
                        onClick={handleSkip}
                        className="flex-1 text-gray-400 py-2.5 px-4 hover:text-gray-600 transition-colors text-sm font-medium"
                      >
                        Skip
                          </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2 - Doctor Review */}
                {currentStep === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="text-center space-y-8"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center">
                      <IconUser className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <h2 className="text-4xl font-semibold tracking-tight" style={{ color: '#1E3F2B' }}>
                      <TypingText text="Doctor Review" delay={3} />
                    </h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-lg text-gray-500 font-light max-w-lg mx-auto leading-relaxed"
                    >
                      Our dermatologist will review your photos and assess your skin condition to provide personalized recommendations.
                    </motion.p>
                  </div>
                  <div className="pt-4 space-y-3 w-full max-w-sm mx-auto">
                    <button
                      onClick={handleNext}
                      className="w-full text-white py-3.5 px-6 rounded-lg transition-all duration-200 font-medium text-[15px] shadow-sm hover:shadow-md" style={{ backgroundColor: '#1E3F2B' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3528'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E3F2B'}
                    >
                      Continue
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="flex-1 flex items-center justify-center text-gray-600 py-2.5 px-4 hover:bg-gray-100 transition-colors text-sm font-medium rounded-lg"
                        onMouseEnter={(e) => e.currentTarget.style.color = '#1E3F2B'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#4B5563'}
                      >
                        <IconArrowLeft className="h-4 w-4 mr-1" />
                        Back
                      </button>
                      <button
                        onClick={handleSkip}
                        className="flex-1 text-gray-400 py-2.5 px-4 hover:text-gray-600 transition-colors text-sm font-medium"
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3 - Formulation and Skincare Guidance */}
              {currentStep === 3 && (
                <motion.div
                  key="formulation"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="text-center space-y-8"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center">
                      <IconFlask className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <h2 className="text-4xl font-semibold tracking-tight" style={{ color: '#1E3F2B' }}>
                      <TypingText text="Formulation & Skincare Guidance" delay={3} />
                    </h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-lg text-gray-500 font-light max-w-lg mx-auto leading-relaxed"
                    >
                      Receive a custom formulation and personalized skincare guidance based on your skin analysis and goals.
                    </motion.p>
                  </div>
                  <div className="pt-4 space-y-3 w-full max-w-sm mx-auto">
                    <button
                      onClick={handleComplete}
                      className="w-full text-white py-3.5 px-6 rounded-lg transition-all duration-200 font-medium text-[15px] shadow-sm hover:shadow-md" style={{ backgroundColor: '#1E3F2B' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3528'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E3F2B'}
                    >
                      Go to Dashboard
                    </button>
                    <div className="flex gap-3">
                    <button
                        onClick={handleBack}
                        className="flex-1 flex items-center justify-center text-gray-600 py-2.5 px-4 hover:bg-gray-100 transition-colors text-sm font-medium rounded-lg"
                        onMouseEnter={(e) => e.currentTarget.style.color = '#1E3F2B'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#4B5563'}
                    >
                        <IconArrowLeft className="h-4 w-4 mr-1" />
                        Back
                    </button>
                  <button
                        onClick={handleSkip}
                        className="flex-1 text-gray-400 py-2.5 px-4 hover:text-gray-600 transition-colors text-sm font-medium"
                  >
                        Skip
                  </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Indicator */}
        {currentStep < 3 && (
          <div className="absolute bottom-0 left-0 w-full border-t border-green-800/30 backdrop-blur-sm" style={{ backgroundColor: '#F2F0E0' }}>
            <div className="max-w-7xl mx-auto px-8 py-6">
              <div className="flex items-center justify-center space-x-2">
                {[0, 1, 2].map((step) => (
                  <motion.div
                    key={step}
                    initial={false}
                    animate={{
                      width: step === currentStep ? 24 : 8,
                      backgroundColor: step === currentStep ? '#1E3F2B' : '#E5E7EB',
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-2 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default OnboardingModal