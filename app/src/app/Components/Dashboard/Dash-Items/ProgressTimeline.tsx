'use client'
import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FormialPrescription, createPrescription } from '../../../utils/formialApi'
import { IconArrowUp, IconCheck } from '@tabler/icons-react'
import UploadStep from './onboarding/upload-step'
import { getUserContact } from '../../../utils/userContact'

interface ProgressTimelineProps {
  prescriptions?: FormialPrescription[]
  isLoading?: boolean
  onRefetch?: () => void
  contact?: string | null
}

interface PrescriptionGroup {
  week: number
  date: string
  front_image: string | null
  left_image: string | null
  right_image: string | null
}

const ProgressTimeline = ({ prescriptions = [], isLoading, onRefetch, contact }: ProgressTimelineProps) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Group prescriptions by date - each prescription has 3 images (front, left, right)
  const prescriptionGroups = useMemo(() => {
    const groups: PrescriptionGroup[] = []
    
    // Sort prescriptions by date (newest first)
    const sortedPrescriptions = [...prescriptions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    let weekCounter = 1
    sortedPrescriptions.forEach((prescription) => {
      const date = new Date(prescription.createdAt)
      const dateKey = date.toISOString().split('T')[0]
      
      // Extract image URLs - handle both string and null/undefined
      const frontImg = typeof prescription.front_image === 'string' ? prescription.front_image : null
      const leftImg = typeof prescription.left_image === 'string' ? prescription.left_image : null
      const rightImg = typeof prescription.right_image === 'string' ? prescription.right_image : null
      
      groups.push({
        week: weekCounter++,
        date: dateKey,
        front_image: frontImg,
        left_image: leftImg,
        right_image: rightImg,
      })
    })

    return groups
  }, [prescriptions])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const handleUploadClick = () => {
    setIsUploadModalOpen(true)
    setUploadedPhotos([])
    setUploadError(null)
  }

  const handleCloseModal = () => {
    setIsUploadModalOpen(false)
    setUploadedPhotos([])
    setUploadError(null)
  }

  const handleUploadComplete = async () => {
    if (uploadedPhotos.length !== 3) {
      setUploadError("Please upload all three photos (front, left, right).")
      return
    }

    const userContact = contact || getUserContact()
    if (!userContact) {
      setUploadError("User contact not found. Cannot upload photos.")
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      await createPrescription(userContact, {
        front_image: uploadedPhotos[0],
        left_image: uploadedPhotos[1],
        right_image: uploadedPhotos[2],
      })
      
      // Close modal and refresh data
      handleCloseModal()
      if (onRefetch) {
        onRefetch()
      }
    } catch (error) {
      console.error("Photo upload failed:", error)
      setUploadError(error instanceof Error ? error.message : "Failed to upload photos. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <motion.div
      key="progress"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Button */}
      <div className="flex items-center justify-center mb-6">
        <div className="px-6 py-3 rounded-full bg-[#7CB58D] border border-[#1E3F2B] text-[#1E3F2B] text-sm tracking-tighter font-bold"
          style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
        >
          Progress Timeline
        </div>
      </div>

      <div className="relative pl-12 md:pl-14">
        {/* Vertical Timeline Line - Subtle green */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#7CB58D]/30 rounded-full"></div>

        <div className="space-y-10 pb-8">
          {/* Today Section with Upload */}
          <div className="relative">
            {/* Green circular marker for Today */}
            <div className="absolute -left-8 md:-left-10 top-0 w-4 h-4 rounded-full bg-[#7CB58D] border-2 border-white shadow-sm z-10"></div>
            
            <div className="mb-6 flex items-center gap-2">
              <p className="text-sm font-semibold text-[#1E3F2B]">Today</p>
            </div>
            
            {/* Beautiful Upload Button */}
            <div className="relative">
              <motion.button
                onClick={handleUploadClick}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full max-w-[280px] rounded-2xl bg-[#7CB58D]/20 border-2 border-[#1E3F2B]/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Animated background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative px-8 py-6 flex flex-col items-center justify-center gap-3">
                  {/* Icon with animated background */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:bg-white/30 transition-all duration-300"></div>
                    <div className="relative size-12 rounded-full bg-white/20 flex items-center justify-center border border-[#1E3F2B]/20 transition-all duration-300">
                      <IconArrowUp className="size-6 text-[#1E3F2B] group-hover:text-[#7CB58D] transition-colors duration-300" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="text-center">
                    <p className="text-base font-medium text-[#1E3F2B] mb-1 group-hover:text-white/95 transition-colors tracking-tight">
                      Click to upload
                    </p>
                    <p className="text-xs text-[#1E3F2B]/80 font-medium tracking-tight">
                      Track your progress
                    </p>
                  </div>
                </div>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </motion.button>
            </div>
          </div>

          {isLoading && (
            <div className="space-y-4 animate-pulse">
              {[1, 2].map((item) => (
                <div key={item} className="h-32 bg-gray-200 rounded-xl" />
              ))}
            </div>
          )}

          {!isLoading && prescriptionGroups.length === 0 && (
            <p className="text-sm text-gray-600">
              Upload your first photos to start tracking your progress.
            </p>
          )}

          {/* Prescription Groups - 3 photos per row (front, left, right) */}
          {!isLoading &&
            prescriptionGroups.map((group, groupIndex) => (
              <div className="relative" key={`${group.date}-${groupIndex}`}>
                {/* Green circular marker for dated entries */}
                <div className="absolute -left-8 md:-left-10 top-1 w-4 h-4 rounded-full bg-[#7CB58D] border-2 border-white shadow-sm z-10"></div>
                {/* Connecting line from marker */}
               
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-[#1E3F2B]">
                    {formatDate(group.date)}
                  </p>
                </div>
                <div className="flex gap-3 w-full mb-2">
                  {/* Front Image */}
                  <div className="flex-1 min-w-0 aspect-square rounded-xl bg-white border border-[#CBBEAD] p-1.5 shadow-sm relative">
                    {group.front_image ? (
                      <div className="w-full h-full rounded-lg overflow-hidden relative">
                        <Image
                          src={group.front_image}
                          alt={`Week ${group.week} - Front`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 33vw"
                          unoptimized
                        />
                        {/* Checkmark icon */}
                        <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#7CB58D] flex items-center justify-center shadow-sm z-10">
                          <IconCheck className="h-3 w-3 text-white" strokeWidth={3} />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg" />
                    )}
                  </div>
                  {/* Left Image */}
                  <div className="flex-1 min-w-0 aspect-square rounded-xl bg-white border border-[#CBBEAD] p-1.5 shadow-sm relative">
                    {group.left_image ? (
                      <div className="w-full h-full rounded-lg overflow-hidden relative">
                        <Image
                          src={group.left_image}
                          alt={`Week ${group.week} - Left`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 33vw"
                          unoptimized
                        />
                        {/* Checkmark icon */}
                        <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#7CB58D] flex items-center justify-center shadow-sm z-10">
                          <IconCheck className="h-3 w-3 text-white" strokeWidth={3} />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg" />
                    )}
                  </div>
                  {/* Right Image */}
                  <div className="flex-1 min-w-0 aspect-square rounded-xl bg-white border border-[#CBBEAD] p-1.5 shadow-sm relative">
                    {group.right_image ? (
                      <div className="w-full h-full rounded-lg overflow-hidden relative">
                        <Image
                          src={group.right_image}
                          alt={`Week ${group.week} - Right`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 33vw"
                          unoptimized
                        />
                        {/* Checkmark icon */}
                        <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#7CB58D] flex items-center justify-center shadow-sm z-10">
                          <IconCheck className="h-3 w-3 text-white" strokeWidth={3} />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-[#1E3F2B]/70 font-medium mt-1">Week-{group.week}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
           
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
               
                <UploadStep
                  uploadedPhotos={uploadedPhotos}
                  setUploadedPhotos={setUploadedPhotos}
                  onNext={handleUploadComplete}
                  onBack={handleCloseModal}
                  onSkip={handleCloseModal}
                  isUploading={isUploading}
                  uploadError={uploadError}
                  hideTimeline={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProgressTimeline

