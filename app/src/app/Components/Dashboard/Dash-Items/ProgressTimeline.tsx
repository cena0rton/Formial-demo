'use client'
import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FormialPrescription, createPrescription } from '../../../utils/formialApi'
import { IconMountain } from '@tabler/icons-react'
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

      <div className="relative pl-10">
        {/* Vertical Timeline Line */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/40 rounded-full"></div>

        <div className="space-y-10 pb-8">
          {/* Today Section with Upload */}
          <div className="relative">
            <div className="absolute -left-10 top-2 w-8 h-0.5 bg-black"></div>
            <div className="mb-4 flex items-center gap-2">
              <p className="text-sm font-medium text-black">Today</p>
              {/* Purple "A" Badge */}
              <div className="w-6 h-6 rounded-full bg-[#6B46C1] border border-black flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-bold">A</span>
              </div>
            </div>
            <div className="relative">
              {/* Upload Placeholder */}
              <div
                onClick={handleUploadClick}
                className="rounded-xl border-2 border-dashed border-black/50 bg-gray-50 p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors w-40"
              >
                <IconMountain className="h-8 w-8 text-black" />
                <p className="text-sm text-black font-medium">Click to upload</p>
              </div>
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
                <div className="absolute -left-10 top-3 w-8 h-0.5 bg-black"></div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-black">
                    {formatDate(group.date)}
                  </p>
                </div>
                <div className="flex gap-3 w-full">
                  {/* Front Image */}
                  <div className="flex-1 min-w-0 aspect-square rounded-xl bg-[#6B46C1] border border-black overflow-hidden relative">
                    {group.front_image ? (
                      <Image
                        src={group.front_image}
                        alt={`Week ${group.week} - Front`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-[#6B46C1]" />
                    )}
                  </div>
                  {/* Left Image */}
                  <div className="flex-1 min-w-0 aspect-square rounded-xl bg-[#6B46C1] border border-black overflow-hidden relative">
                    {group.left_image ? (
                      <Image
                        src={group.left_image}
                        alt={`Week ${group.week} - Left`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-[#6B46C1]" />
                    )}
                  </div>
                  {/* Right Image */}
                  <div className="flex-1 min-w-0 aspect-square rounded-xl bg-[#6B46C1] border border-black overflow-hidden relative">
                    {group.right_image ? (
                      <Image
                        src={group.right_image}
                        alt={`Week ${group.week} - Right`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-[#6B46C1]" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">Week-{group.week}</p>
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
              className="bg-white rounded-2xl max-w-3xl w-full h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-[#1E3F2B]">Upload Progress Photos</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>
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

