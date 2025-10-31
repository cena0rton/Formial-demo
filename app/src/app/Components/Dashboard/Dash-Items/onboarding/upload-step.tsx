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
<div className="flex flex-row items-center justify-center gap-3  mt-1">
  {/* Step 1 */}
  <span className="flex items-center gap-2">
    <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full shadow border bg-[#1E3F2B] text-white border-gray-300 min-w-[1.5rem] min-h-[1.5rem]">
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
    <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full shadow border bg-[#1E3F2B] text-white border-gray-300 min-w-[1.5rem] min-h-[1.5rem]">
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
    <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full shadow border bg-[#1E3F2B] text-white border-gray-300 min-w-[1.5rem] min-h-[1.5rem]">
      3
    </span>
    <span className="text-sm font-medium text-gray-700 font-instrument-serif">
      Avoid shadows & use recent image only
    </span>
  </span>
</div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.4 }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {/* Left View */}
        <div className="flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg p-2">
          <span className="font-semibold text-base mb-1" style={{ color: "#1E3F2B", fontFamily: 'var(--font-instrument-serif), serif' }}>
            Left
          </span>
          <div className="grid grid-cols-2 gap-2 items-center">
            {/* Reference image */}
            <div className="w-24 h-24 border rounded-lg flex items-center justify-center bg-gray-100">
              <Image 
                src="/left.png" 
                alt="Reference Left"
                width={96}
                height={96}
                className="object-cover w-full h-full rounded-lg"
                unoptimized
              />
            </div>
            {/* Uploaded photo */}
            <div className="w-24 h-24 rounded-lg border flex items-center justify-center bg-white overflow-hidden">
              {uploadedPhotos[0] ? (
                <Image
                  src={URL.createObjectURL(uploadedPhotos[0])}
                  alt="Your Left"
                  width={96}
                  height={96}
                  className="object-cover rounded-lg w-full h-full"
                  unoptimized
                />
              ) : (
                <span className="text-gray-300"><IconUpload size={24} className="text-gray-500" /></span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="mt-1 px-3 py-1.5 rounded-full text-sm font-semibold border border-[#1E3F2B]/30 text-[#1E3F2B]  hover:bg-gray-50 transition cursor-pointer"
            onClick={() => document.getElementById('upload-left')?.click()}
          >
            {uploadedPhotos[0] ? "Change Photo" : "Upload Photo"}
          </button>
          <input
            id="upload-left"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                const filesArray = [...uploadedPhotos]
                filesArray[0] = e.target.files[0]
                setUploadedPhotos(filesArray)
              }
            }}
          />
        </div>
        {/* Front View */}
        <div className="flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg p-2">
          <span className="font-semibold text-base mb-1" style={{ color: "#1E3F2B", fontFamily: 'var(--font-instrument-serif), serif' }}>
            Front
          </span>
          <div className="grid grid-cols-2 gap-2 items-center">
            {/* Reference image */}
            <div className="w-24 h-24 border rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden">
              <Image 
                src="/front.png" 
                alt="Reference Front"
                width={96}
                height={96}
                className="object-cover w-full h-full rounded-lg"
                unoptimized
              />
            </div>
            {/* Uploaded photo */}
            <div className="w-24 h-24 rounded-lg border flex items-center justify-center bg-white overflow-hidden">
              {uploadedPhotos[1] ? (
                <Image
                  src={URL.createObjectURL(uploadedPhotos[1])}
                  alt="Your Front"
                  width={96}
                  height={96}
                  className="object-cover rounded-lg w-full h-full"
                  unoptimized
                />
              ) : (
                <span className="text-gray-300"><IconUpload size={24} className="text-gray-500" /></span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="mt-1 px-3 py-1.5 rounded-full text-sm font-semibold border border-[#1E3F2B]/30 text-[#1E3F2B] b hover:bg-gray-50 transition cursor-pointer"
            onClick={() => document.getElementById('upload-front')?.click()}
          >
            {uploadedPhotos[1] ? "Change Photo" : "Upload Photo"}
          </button>
          <input
            id="upload-front"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                const filesArray = [...uploadedPhotos]
                filesArray[1] = e.target.files[0]
                setUploadedPhotos(filesArray)
              }
            }}
          />
        </div>
        {/* Right View */}
        <div className="flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg p-2">
          <span className="font-semibold text-base mb-1" style={{ color: "#1E3F2B", fontFamily: 'var(--font-instrument-serif), serif' }}>
            Right
          </span>
          <div className="grid grid-cols-2 gap-2 items-center">
            {/* Reference image */}
            <div className="w-24 h-24 border rounded-lg flex items-center justify-center bg-gray-100">
              <Image 
                src="/right.png" 
                alt="Reference Right"
                width={96}
                height={96}
                className="object-cover w-full h-full rounded-lg"
                unoptimized
              />
            </div>
            {/* Uploaded photo */}
            <div className="w-24 h-24 rounded-lg border flex items-center justify-center bg-white overflow-hidden">
              {uploadedPhotos[2] ? (
                <Image
                  src={URL.createObjectURL(uploadedPhotos[2])}
                  alt="Your Right"
                  width={96}
                  height={96}
                  className="object-cover rounded-lg w-full h-full"
                  unoptimized
                />
              ) : (
                <span className="text-gray-300"><IconUpload size={24} className="text-gray-500" /></span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="mt-1 px-3 py-1.5 rounded-full text-sm font-semibold border border-[#1E3F2B]/30 text-[#1E3F2B]  hover:bg-gray-50 transition cursor-pointer"
            onClick={() => document.getElementById('upload-right')?.click()}
          >
            {uploadedPhotos[2] ? "Change Photo" : "Upload Photo"}
          </button>
          <input
            id="upload-right"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                const filesArray = [...uploadedPhotos]
                filesArray[2] = e.target.files[0]
                setUploadedPhotos(filesArray)
              }
            }}
          />
        </div>
      </div>
      </motion.div>

     

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

