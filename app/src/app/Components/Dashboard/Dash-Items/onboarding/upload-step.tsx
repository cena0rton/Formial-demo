"use client"

import type React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { IconUpload, IconX, IconArrowLeft, IconCheck } from "@tabler/icons-react"

interface UploadStepProps {
  uploadedPhotos: File[]
  setUploadedPhotos: (photos: File[]) => void
  onNext: () => void
  onBack: () => void
  onSkip: () => void
}

export default function UploadStep({ uploadedPhotos, setUploadedPhotos, onNext, onBack }: UploadStepProps) {
  const handleDeletePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index))
  }

  return (
    <div className="h-full overflow-y-auto pb-20 -mt-16 md:mt-0">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="text-left overflow-y-auto"
      >
        {/* Title */}
        <h2 className="md:text-4xl text-2xl font-medium tracking-tight text-[#1E3F2B] mb-4">
          {"Upload Your Photos".split("").map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03, duration: 0.2 }}
            >
              {char}
            </motion.span>
          ))}
        </h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-lg text-gray-600 font-normal max-w-2xl mb-4 font-instrument-serif"
        >
          You are few steps away from getting your personalized skincare plan!
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mb-10 list-disc list-inside pl-2 text-[#1E3F2B] space-y-2 text-xs font-medium tracking-tight"
        >
          <li>No filters or editing – upload your RAW, unaltered photos.</li>
          <li>Use clean and bright lighting (natural daylight works best).</li>
          <li>Make sure your face is clearly visible and in focus.</li>
          <li>Remove glasses, hats, and keep hair away from the face.</li>
        </motion.ul>

        {/* Photo Upload Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left View Card */}
            <div className="relative bg-[#F2F0E0] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 min-h-[300px] transition-all">
              {uploadedPhotos[0] ? (
                <>
                  <div className="relative w-full h-full mb-4">
                    <Image
                      src={URL.createObjectURL(uploadedPhotos[0])}
                      alt="Uploaded Left"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                      onClick={() => handleDeletePhoto(0)}
                      type="button"
                      aria-label="Remove uploaded photo"
                    >
                      <IconX size={14} className="text-white" strokeWidth={3} />
                    </button>
                    <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <IconCheck size={14} className="text-white" strokeWidth={3} />
                    </div>
                  </div>
                  <label htmlFor="upload-left" className="cursor-pointer">
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1E3F2B] text-white font-medium hover:bg-[#1a3528] transition-colors">
                      <IconUpload size={18} />
                      Replace Photo
                    </span>
                    <input
                      id="upload-left"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const updatedPhotos = [...uploadedPhotos]
                          updatedPhotos[0] = e.target.files[0]
                          setUploadedPhotos(updatedPhotos.slice(0, 3))
                        }
                      }}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full mb-4">
                    <Image
                      src="/FormialLeft.png"
                      alt="Left View Reference"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-lg opacity-50"
                    />
                  </div>
                  <label htmlFor="upload-left" className="cursor-pointer">
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3F2B] text-white font-medium hover:bg-[#1a3528] transition-colors">
                      <IconUpload size={18} />
                      Upload Photo
                    </span>
                    <input
                      id="upload-left"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const updatedPhotos = [...uploadedPhotos]
                          updatedPhotos[0] = e.target.files[0]
                          setUploadedPhotos(updatedPhotos.slice(0, 3))
                        }
                      }}
                    />
                  </label>
                </>
              )}
            </div>

            {/* Front View Card */}
            <div className="relative bg-[#F2F0E0] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 min-h-[300px] transition-all">
              {uploadedPhotos[1] ? (
                <>
                  <div className="relative w-full h-full mb-4">
                    <Image
                      src={URL.createObjectURL(uploadedPhotos[1])}
                      alt="Uploaded Front"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                      onClick={() => handleDeletePhoto(1)}
                      type="button"
                      aria-label="Remove uploaded photo"
                    >
                      <IconX size={14} className="text-white" strokeWidth={3} />
                    </button>
                    <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <IconCheck size={14} className="text-white" strokeWidth={3} />
                    </div>
                  </div>
                  <label htmlFor="upload-front" className="cursor-pointer">
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3F2B] text-white font-medium hover:bg-[#1a3528] transition-colors">
                      <IconUpload size={18} />
                      Replace Photo
                    </span>
                    <input
                      id="upload-front"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const updatedPhotos = [...uploadedPhotos]
                          updatedPhotos[1] = e.target.files[0]
                          setUploadedPhotos(updatedPhotos.slice(0, 3))
                        }
                      }}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full mb-4">
                    <Image
                      src="/FormialFront.png"
                      alt="Front View Reference"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-lg opacity-50"
                    />
                  </div>
                  <label htmlFor="upload-front" className="cursor-pointer">
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3F2B] text-white font-medium hover:bg-[#1a3528] transition-colors">
                      <IconUpload size={18} />
                      Upload Photo
                    </span>
                    <input
                      id="upload-front"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const updatedPhotos = [...uploadedPhotos]
                          updatedPhotos[1] = e.target.files[0]
                          setUploadedPhotos(updatedPhotos.slice(0, 3))
                        }
                      }}
                    />
                  </label>
                </>
              )}
            </div>

            {/* Right View Card */}
            <div className="relative bg-[#F2F0E0] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 min-h-[300px] transition-all">
              {uploadedPhotos[2] ? (
                <>
                  <div className="relative w-full h-full mb-4">
                    <Image
                      src={URL.createObjectURL(uploadedPhotos[2])}
                      alt="Uploaded Right"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                      onClick={() => handleDeletePhoto(2)}
                      type="button"
                      aria-label="Remove uploaded photo"
                    >
                      <IconX size={14} className="text-white" strokeWidth={3} />
                    </button>
                    <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <IconCheck size={14} className="text-white" strokeWidth={3} />
                    </div>
                  </div>
                  <label htmlFor="upload-right" className="cursor-pointer">
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3F2B] text-white font-medium hover:bg-[#1a3528] transition-colors">
                      <IconUpload size={18} />
                      Replace Photo
                    </span>
                    <input
                      id="upload-right"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const updatedPhotos = [...uploadedPhotos]
                          updatedPhotos[2] = e.target.files[0]
                          setUploadedPhotos(updatedPhotos.slice(0, 3))
                        }
                      }}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full mb-4">
                    <Image
                      src="/Formialright.png"
                      alt="Right View Reference"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-lg opacity-50"
                    />
                  </div>
                  <label htmlFor="upload-right" className="cursor-pointer">
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3F2B] text-white font-medium hover:bg-[#1a3528] transition-colors">
                      <IconUpload size={18} />
                      Upload Photo
                    </span>
                    <input
                      id="upload-right"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const updatedPhotos = [...uploadedPhotos]
                          updatedPhotos[2] = e.target.files[0]
                          setUploadedPhotos(updatedPhotos.slice(0, 3))
                        }
                      }}
                    />
                  </label>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex gap-3 justify-start items-center mt-12"
        >
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <IconArrowLeft size={20} className="text-gray-600" />
          </button>
          <button
            onClick={onNext}
            disabled={uploadedPhotos.length < 3}
            className="px-10 py-3 rounded-full bg-[#1E3F2B] text-white font-medium hover:bg-[#1a3528] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all tracking-tight"
          >
            Next
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
