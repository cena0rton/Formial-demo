"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { IconUpload, IconArrowLeft } from "@tabler/icons-react"

interface UploadStepProps {
  uploadedPhotos: File[]
  setUploadedPhotos: (photos: File[]) => void
  onNext: () => void
  onBack: () => void
  onSkip: () => void
}

export default function UploadStep({ uploadedPhotos, setUploadedPhotos, onNext, onBack, onSkip }: UploadStepProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullText = "Upload Pictures"

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 50)
      return () => clearTimeout(timer)
    } else {
      setTimeout(() => setIsTypingComplete(true), 500)
    }
  }, [displayedText, fullText])

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = [...uploadedPhotos]
      filesArray[index] = e.target.files[0]
      setUploadedPhotos(filesArray)
    }
  }

  const steps = [
    { id: 1, label: "Ensure proper lighting" },
    { id: 2, label: "No makeup" },
    { id: 3, label: "Avoid shadows & use recent image only" },
  ]

  const views = [
    { id: "left", label: "Left", src: "/left.png" },
    { id: "front", label: "Front", src: "/front.png" },
    { id: "right", label: "Right", src: "/right.png" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="text-center space-y-8"
    >
      {/* Upload Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center justify-center mb-6"
      >
        <div className="w-16 h-16 bg-[#1E3F2B] rounded-full flex items-center justify-center shadow-lg">
          <IconUpload size={32} className="text-white" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: '#1E3F2B', fontFamily: 'var(--font-instrument-serif), serif' }}>
          {displayedText}
          {!isTypingComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
              className="ml-1 inline-block"
            >
              |
            </motion.span>
          )}
        </h1>

        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-10">
          Let&apos;s capture your starting point - this is where your transformation begins!
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 mb-12"
      >
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-[#1E3F2B] rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {step.id}
              </span>
              <span>{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <span className="hidden sm:inline-block text-[#1E3F2B]/70 text-xl">&rarr;</span>
            )}
          </React.Fragment>
        ))}
      </motion.div>

      {/* Upload Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12"
      >
        {views.map((view, index) => {
          const hasPhoto = uploadedPhotos[index]
          const isHighlighted = index === 0 // Left view is highlighted
          
          return (
            <div
              key={view.id}
              className={`rounded-lg p-6 shadow-lg ${
                isHighlighted
                  ? 'bg-[#1E3F2B] text-white transform scale-105'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-instrument-serif), serif', color: isHighlighted ? 'white' : '#1E3F2B' }}>
                {view.label}
              </h3>

              {/* Image Container */}
              <div
                className={`rounded p-3 mb-6 ${
                  hasPhoto
                    ? isHighlighted
                      ? 'bg-white/10'
                      : 'bg-gray-50'
                    : isHighlighted
                    ? 'bg-white/10'
                    : 'bg-[#F2F0E0] border-2 border-dashed border-gray-300'
                } flex items-center justify-center ${hasPhoto ? '' : 'aspect-square'}`}
              >
                {hasPhoto ? (
                  <Image
                    src={URL.createObjectURL(uploadedPhotos[index])}
                    alt={`Your ${view.label}`}
                    width={200}
                    height={200}
                    className="w-full h-auto rounded object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="text-center w-full">
                    <Image
                      src={view.src}
                      alt={`Reference ${view.label}`}
                      width={150}
                      height={150}
                      className="w-3/4 mx-auto mb-2 opacity-50"
                      unoptimized
                    />
                    <IconUpload size={32} className="mx-auto text-gray-400" />
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <button
                type="button"
                className={`w-full font-semibold py-3 px-6 rounded-full transition-all duration-300 ${
                  isHighlighted
                    ? hasPhoto
                      ? 'bg-white/90 hover:bg-white text-[#1E3F2B] shadow-sm'
                      : 'bg-white/90 hover:bg-white text-[#1E3F2B] shadow-sm'
                    : hasPhoto
                    ? 'bg-transparent hover:bg-[#1E3F2B]/10 text-[#1E3F2B] border border-[#1E3F2B]'
                    : 'bg-transparent hover:bg-[#1E3F2B]/10 text-[#1E3F2B] border border-[#1E3F2B]'
                }`}
                onClick={() => document.getElementById(`upload-${view.id}`)?.click()}
              >
                {hasPhoto ? 'Change Photo' : 'Upload Photo'}
              </button>

              <input
                id={`upload-${view.id}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(index, e)}
              />
            </div>
          )
        })}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button
          onClick={onBack}
          className="text-[#1E3F2B] hover:text-[#1E3F2B]/80 transition-colors"
        >
          <IconArrowLeft size={24} className="align-middle" />
        </button>

        <button
          onClick={onNext}
          disabled={uploadedPhotos.length < 3}
          className="bg-[#1E3F2B] hover:bg-[#1E3F2B]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-12 rounded-full transition-all duration-300 shadow-md order-first sm:order-none"
        >
          Continue
        </button>

        <button
          onClick={onSkip}
          className="bg-transparent hover:bg-[#1E3F2B]/10 text-[#1E3F2B] border border-[#1E3F2B] font-semibold py-3 px-12 rounded-full transition-all duration-300"
        >
          I will do it later
        </button>
      </motion.div>
    </motion.div>
  )
}
