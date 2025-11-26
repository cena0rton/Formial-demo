'use client'
import React, { useMemo, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FormialPrescription } from '../../../utils/formialApi'
import { IconMountain, IconUpload } from '@tabler/icons-react'

interface ProgressTimelineProps {
  prescriptions?: FormialPrescription[]
  isLoading?: boolean
}

interface PhotoGroup {
  week: number
  date: string
  photos: string[]
}

const ProgressTimeline = ({ prescriptions = [], isLoading }: ProgressTimelineProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])

  // Group photos by date and create week-based structure
  const photoGroups = useMemo(() => {
    const groups: PhotoGroup[] = []
    const allPhotos: { url: string; date: string }[] = []

    // Collect all photos from prescriptions
    prescriptions.forEach((prescription) => {
      const date = prescription.createdAt
      ;["front_image", "left_image", "right_image"].forEach((key) => {
        const url = prescription[key as keyof FormialPrescription]
        if (url && typeof url === "string") {
          allPhotos.push({ url, date })
        }
      })
    })

    // Add uploaded photos
    uploadedPhotos.forEach((url) => {
      allPhotos.push({ url, date: new Date().toISOString() })
    })

    // Group by date (group photos taken on the same day)
    const dateMap = new Map<string, string[]>()
    allPhotos.forEach((photo) => {
      const photoDate = new Date(photo.date)
      const dateKey = photoDate.toISOString().split('T')[0]
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, [])
      }
      dateMap.get(dateKey)!.push(photo.url)
    })

    // Convert to groups with week numbers
    let weekCounter = 1
    const sortedDates = Array.from(dateMap.keys()).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    )

    sortedDates.forEach((dateKey) => {
      const photos = dateMap.get(dateKey)!
      // Split into groups of 3
      for (let i = 0; i < photos.length; i += 3) {
        groups.push({
          week: weekCounter++,
          date: dateKey,
          photos: photos.slice(i, i + 3),
        })
      }
    })

    return groups
  }, [prescriptions, uploadedPhotos])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newPhotos: string[] = []
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (result) {
          newPhotos.push(result)
          if (newPhotos.length === Array.from(files).length) {
            setUploadedPhotos((prev) => [...prev, ...newPhotos])
          }
        }
      }
      reader.readAsDataURL(file)
    })
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
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black"></div>

        <div className="space-y-10 pb-8">
          {/* Today Section with Upload */}
          <div className="relative">
            <div className="absolute -left-10 top-3 w-8 h-0.5 bg-black"></div>
            <div className="mb-4">
              <p className="text-sm font-medium text-black">Today</p>
            </div>
            <div className="relative">
              {/* Upload Placeholder */}
              <div
                onClick={handleUploadClick}
                className="rounded-xl border-2 border-dashed border-black bg-gray-50 p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <IconMountain className="h-8 w-8 text-black" />
                <p className="text-sm text-black font-medium">Click to upload</p>
              </div>
              
          
             
            </div>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {isLoading && (
            <div className="space-y-4 animate-pulse">
              {[1, 2].map((item) => (
                <div key={item} className="h-32 bg-gray-200 rounded-xl" />
              ))}
            </div>
          )}

          {!isLoading && photoGroups.length === 0 && (
            <p className="text-sm text-gray-600">
              Upload your first photos to start tracking your progress.
            </p>
          )}

          {/* Photo Groups - 3 photos per row */}
          {!isLoading &&
            photoGroups.map((group, groupIndex) => (
              <div className="relative" key={`${group.date}-${groupIndex}`}>
                <div className="absolute -left-10 top-3 w-8 h-0.5 bg-black"></div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-black">
                    {formatDate(group.date)}
                  </p>
                </div>
                <div className="flex gap-3">
                  {group.photos.map((photoUrl, photoIndex) => (
                    <div
                      key={photoIndex}
                      className="flex-1 aspect-square rounded-xl bg-[#6B46C1] border border-black overflow-hidden"
                    >
                      <img
                        src={photoUrl}
                        alt={`Week ${group.week} - Photo ${photoIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {/* Fill remaining slots if less than 3 */}
                  {group.photos.length < 3 &&
                    Array.from({ length: 3 - group.photos.length }).map((_, index) => (
                      <div
                        key={`empty-${index}`}
                        className="flex-1 aspect-square rounded-xl bg-[#6B46C1] border border-black"
                      />
                    ))}
                </div>
                <p className="text-xs text-gray-600 mt-2">Week-{group.week}</p>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ProgressTimeline

