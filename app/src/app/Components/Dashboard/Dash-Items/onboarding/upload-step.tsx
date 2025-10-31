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

  const handleDeletePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="text-center space-y-8 overflow-auto"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mt-6 max-w-2xl mx-auto">
        {/* Photo Card - Left */}
        <div className="relative bg-white shadow-xl rounded-2xl border-[0.1px] border-green-900 flex flex-col overflow-hidden transform transition-all group">
          <div className="bg-[#1E3F2B] py-2 text-white text-lg font-instrument-serif text-center tracking-wide">
            Left
          </div>
          <div className="flex-grow flex items-center justify-center bg-[#F2EEE0] py-4 px-2 min-h-[130px] relative">
            {uploadedPhotos[0] ? (
              <>
                <Image
                  src={URL.createObjectURL(uploadedPhotos[0])}
                  alt="Uploaded Left"
                  width={120}
                  height={120}
                  className="object-cover rounded-xl transition-shadow duration-300 shadow-inner border border-gray-100 w-[120px] h-[120px]"
                />
                <button
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1 rounded-full shadow-md border transition-colors"
                  onClick={() => handleDeletePhoto(0)}
                  type="button"
                  aria-label="Remove uploaded photo"
                >
                  <IconX size={16} className="text-gray-600" strokeWidth={2.5} />
                </button>
              </>
            ) : (
              <Image
                src="/left.png"
                alt="Left"
                width={120}
                height={120}
                className="object-cover rounded-xl transition-shadow duration-300 shadow-inner border border-gray-100 w-[120px] h-[120px]"
              />
            )}
          </div>
          <div className="p-3 text-center bg-[#F2EEE0]">
            <label htmlFor="upload-left" className={`cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors duration-200 ${uploadedPhotos[0] ? 'bg-white/10 text-[#1E3F2B] border border-[#1E3F2B]' : 'bg-[#1E3F2B] text-white'}`}>
              <IconUpload size={18} className="mr-1" />
              {uploadedPhotos[0] ? 'Replace Image' : 'Upload'}
              <input
                id="upload-left"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  // Only add/replace Left photo
                  if (e.target.files && e.target.files[0]) {
                    const updatedPhotos = [...uploadedPhotos]
                    updatedPhotos[0] = e.target.files[0]
                    setUploadedPhotos(updatedPhotos.slice(0, 3))
                  }
                }}
              />
            </label>
          </div>
        </div>
        {/* Photo Card - Front */}
        <div className="relative bg-white shadow-xl rounded-2xl border-[0.1px] border-green-900 flex flex-col overflow-hidden transform transition-all group">
          <div className="bg-[#1E3F2B] py-2 text-white text-lg font-instrument-serif text-center tracking-wide">
            Front
          </div>
          <div className="flex-grow flex items-center justify-center bg-[#F2EEE0] py-4 px-2 min-h-[130px] relative">
            {uploadedPhotos[1] ? (
              <>
                <Image
                  src={URL.createObjectURL(uploadedPhotos[1])}
                  alt="Uploaded Front"
                  width={120}
                  height={120}
                  className="object-cover rounded-xl transition-shadow duration-300 shadow-inner border border-gray-100 w-[120px] h-[120px]"
                />
                <button
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1 rounded-full shadow-md border transition-colors"
                  onClick={() => handleDeletePhoto(1)}
                  type="button"
                  aria-label="Remove uploaded photo"
                >
                  <IconX size={16} className="text-gray-600" strokeWidth={2.5} />
                </button>
              </>
            ) : (
              <Image
                src="/front.png"
                alt="Front"
                width={120}
                height={120}
                className="object-cover rounded-xl transition-shadow duration-300 shadow-inner border border-gray-100 w-[120px] h-[120px]"
              />
            )}
          </div>
          <div className="p-3 text-center bg-[#F2EEE0]">
            <label htmlFor="upload-front" className={`cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors duration-200 shadow hover:shadow-lg ${uploadedPhotos[1] ? 'bg-white/10 text-[#1E3F2B] border border-[#1E3F2B]' : 'bg-[#1E3F2B] text-white'}`}>
              <IconUpload size={18} className="mr-1" />
              {uploadedPhotos[1] ? 'Replace Image' : 'Upload'}
              <input
                id="upload-front"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  // Only add/replace Front photo
                  if (e.target.files && e.target.files[0]) {
                    const updatedPhotos = [...uploadedPhotos]
                    updatedPhotos[1] = e.target.files[0]
                    setUploadedPhotos(updatedPhotos.slice(0, 3))
                  }
                }}
              />
            </label>
          </div>
        </div>
        {/* Photo Card - Right */}
        <div className="relative bg-white shadow-xl rounded-2xl border-[0.1px] border-green-900 flex flex-col overflow-hidden transform transition-all group">
          <div className="bg-[#1E3F2B] py-2 text-white text-lg font-instrument-serif text-center tracking-wide">
            Right
          </div>
          <div className="flex-grow flex items-center justify-center bg-[#F2EEE0] py-4 px-2 min-h-[130px] relative">
            {uploadedPhotos[2] ? (
              <>
                <Image
                  src={URL.createObjectURL(uploadedPhotos[2])}
                  alt="Uploaded Right"
                  width={120}
                  height={120}
                  className="object-cover rounded-xl transition-shadow duration-300 shadow-inner border border-gray-100 w-[120px] h-[120px]"
                />
                <button
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1 rounded-full shadow-md border transition-colors"
                  onClick={() => handleDeletePhoto(2)}
                  type="button"
                  aria-label="Remove uploaded photo"
                >
                  <IconX size={16} className="text-gray-600" strokeWidth={2.5} />
                </button>
              </>
            ) : (
              <Image
                src="/right.png"
                alt="Right"
                width={120}
                height={120}
                className="object-cover rounded-xl transition-shadow duration-300 shadow-inner border border-gray-100 w-[120px] h-[120px]"
              />
            )}
          </div>
          <div className="p-3 text-center bg-[#F2EEE0]">
            <label htmlFor="upload-right" className={`cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors duration-200 shadow hover:shadow-lg ${uploadedPhotos[2] ? 'bg-white/10 text-[#1E3F2B] border border-[#1E3F2B]' : 'bg-[#1E3F2B] text-white'}`}>
              <IconUpload size={18} className="mr-1" />
              {uploadedPhotos[2] ? 'Replace Image' : 'Upload'}
              <input
                id="upload-right"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  // Only add/replace Right photo
                  if (e.target.files && e.target.files[0]) {
                    const updatedPhotos = [...uploadedPhotos]
                    updatedPhotos[2] = e.target.files[0]
                    setUploadedPhotos(updatedPhotos.slice(0, 3))
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-3 text-md  mt-1">
  {/* Step 1 */}
  <span className="flex items-center gap-2">
    <span className="flex items-center justify-center w-6 h-6 text-md font-bold rounded-full shadow border bg-[#1E3F2B] text-white border-gray-300 min-w-[1.5rem] min-h-[1.5rem] font-instrument-serif">
      1
    </span>
    <span className="text-sm font-medium text-gray-700 font-instrument-serif">
      Ensure proper lighting
    </span>
  </span>
  {/* Arrow */}
  <span className="text-gray-400 mx-1 text-[0.9rem] font-bold select-none">
    &rarr;
  </span>
  {/* Step 2 */}
  <span className="flex items-center gap-2">
    <span className="flex items-center justify-center w-6 h-6 text-md font-bold rounded-full shadow border bg-[#1E3F2B] text-white border-gray-300 min-w-[1.5rem] min-h-[1.5rem] font-instrument-serif">
      2
    </span>
    <span className="text-sm font-medium text-gray-700 font-instrument-serif">
      No makeup
    </span>
  </span>
  {/* Arrow */}
  <span className="text-gray-400 mx-1 text-[0.9rem] font-bold select-none">
    &rarr;
  </span>
  {/* Step 3 */}
  <span className="flex items-center gap-2">
    <span className="flex items-center justify-center w-6 h-6 text-md font-bold rounded-full shadow border bg-[#1E3F2B] text-white border-gray-300 min-w-[1.5rem] min-h-[1.5rem] font-instrument-serif">
      3
    </span>
    <span className="text-sm font-medium text-gray-700 font-instrument-serif">
      Avoid shadows & use recent image only
    </span>
  </span>
</div>

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
          className="px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-90"
          style={{ backgroundColor: uploadedPhotos.length > 0 ? '#1E3F2B' : '#9CA3AF' }}
          onMouseEnter={(e) => uploadedPhotos.length > 0 && (e.currentTarget.style.backgroundColor = '#1a3528')}
          onMouseLeave={(e) => uploadedPhotos.length > 0 && (e.currentTarget.style.backgroundColor = '#1E3F2B')}
        >
          Continue
        </button>
        <button
          onClick={onSkip}
          className="px-8 py-3.5 rounded-full font-semibold border-1  text-[#1E3F2B] hover:bg-gray-50 transition-all duration-200"
        >
          I will do it later
        </button>
      </motion.div>
    </motion.div>
  )
}

