"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { IconUpload, IconX, IconArrowLeft } from "@tabler/icons-react"

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
      }, 3)
      return () => clearTimeout(timer)
    } else {
      setTimeout(() => setIsTypingComplete(true), 500)
    }
  }, [displayedText, fullText])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      const remainingSlots = 3 - uploadedPhotos.length
      if (remainingSlots > 0) {
        const filesToAdd = newFiles.slice(0, remainingSlots)
        setUploadedPhotos([...uploadedPhotos, ...filesToAdd])
      }
    }
  }

  const handleDeletePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="text-center space-y-8"
    >
      <div className="flex items-center justify-center mb-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#1E3F2B' }}
        >
          <IconUpload size={32} className="text-white" />
        </motion.div>
      </div>

      <div className="space-y-3 overflow-auto">
        <h2 className="text-4xl font-semibold tracking-normal" style={{ color: '#1E3F2B', fontFamily: 'var(--font-instrument-serif), serif' }}>
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
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-lg text-gray-500 font-light"
        >
          Let&apos;s capture your starting point - this is where your transformation begins! 
       
          
        </motion.p>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.4 }}>
        {uploadedPhotos.length < 3 ? (
          <label className="block border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-gray-300 transition-all duration-200">
            <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
            <IconUpload size={32} className="mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-600 font-medium mb-1"><span className="font-medium" style={{ color: '#1E3F2B' }}>We Need 3 Photos to get started. Left, Right and Front View of your face.</span></p>
            <p className="text-sm text-gray-500">Drag photos or click to select ({uploadedPhotos.length}/3 uploaded)</p>
          </label>
        ) : (
          <div className="border-2 border-green-200 rounded-lg p-8 text-center bg-green-50/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold" style={{ color: '#1E3F2B' }}>All Photos Uploaded!</p>
            </div>
            <p className="text-sm text-gray-600">You have uploaded all 3 required photos</p>
            <label className="inline-block mt-3">
              <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
              <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer underline">Replace photos</span>
            </label>
          </div>
        )}
      </motion.div>

      {uploadedPhotos.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-3">
          {uploadedPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-square bg-gray-100 rounded-lg border border-gray-200 group overflow-hidden"
            >
              <Image
                src={URL.createObjectURL(photo)}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
              <motion.button
                onClick={() => handleDeletePhoto(index)}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 z-10"
              >
                <IconX size={16} strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="flex gap-3 justify-center items-center"
      >
        <button onClick={onBack} className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <IconArrowLeft size={20} className="text-gray-600" />
        </button>
        <button
          onClick={onNext}
          disabled={uploadedPhotos.length === 0}
          className="px-8 py-3.5 rounded-lg font-semibold text-white transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ backgroundColor: uploadedPhotos.length > 0 ? '#1E3F2B' : '#9CA3AF' }}
          onMouseEnter={(e) => uploadedPhotos.length > 0 && (e.currentTarget.style.backgroundColor = '#1a3528')}
          onMouseLeave={(e) => uploadedPhotos.length > 0 && (e.currentTarget.style.backgroundColor = '#1E3F2B')}
        >
          Continue
        </button>
        <button
          onClick={onSkip}
          className="px-8 py-3.5 rounded-lg font-semibold border-2  text-[#1E3F2B] hover:bg-gray-50 transition-all duration-200"
        >
          I will do it later
        </button>
      </motion.div>
    </motion.div>
  )
}

