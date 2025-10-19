'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  IconCamera, 
  IconChevronLeft, 
  IconChevronRight, 
  IconUpload,
  IconCalendar,
  IconTrendingUp,
  IconEye,
  IconStar,
  IconProgress,
  IconCheck,
  IconInfoCircle,
  IconPlus,
  IconDownload,
  IconShare
} from '@tabler/icons-react'
import Image from 'next/image'

interface ProgressPhoto {
  id: number
  week: number
  date: string
  image: string
  notes: string
  improvements: string[]
  rating: number
}

const SkinProgress = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // Mock data for skin progress photos
  const progressPhotos: ProgressPhoto[] = [
    {
      id: 1,
      week: 0,
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face',
      notes: 'Initial baseline photo - starting treatment',
      improvements: ['Baseline established'],
      rating: 3
    },
    {
      id: 2,
      week: 4,
      date: '2024-02-12',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      notes: 'First month progress - some initial purging',
      improvements: ['Texture improvement', 'Reduced inflammation'],
      rating: 4
    },
    {
      id: 3,
      week: 8,
      date: '2024-03-11',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      notes: 'Significant improvement in skin clarity',
      improvements: ['Clearer skin', 'Reduced acne', 'Better texture'],
      rating: 5
    },
    {
      id: 4,
      week: 12,
      date: '2024-04-08',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      notes: 'Excellent progress - skin looking healthy',
      improvements: ['Smooth texture', 'Even tone', 'Reduced scarring'],
      rating: 5
    }
  ]

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % progressPhotos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + progressPhotos.length) % progressPhotos.length)
  }

  const handleUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
    }, 2000)
  }

  return (
    <div className="md:p-6 overflow-x-hidden bg-[#e5e1d2] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8 space-x-4 bg-[#90C494]/20 rounded-xl px-4 py-2">
          <div className="flex items-center justify-start space-x-4">
            <div className="p-2 rounded-full bg-[#1E3F2B]/10">
              <IconProgress className="text-[#1E3F2B] h-6 w-6" />
            </div>
            <h1 className="md:text-3xl text-xl font-bold text-[#1E3F2B] tracking-tight">
              Skin Progress Journey
            </h1>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpload}
              disabled={isUploading}
              className="flex items-center space-x-2 bg-[#1E3F2B] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1E3F2B]/80 transition-colors disabled:opacity-50"
            >
              <IconUpload className="h-4 w-4" />
              <span className="hidden md:inline">{isUploading ? 'Uploading...' : 'Add Photo'}</span>
            </motion.button>
          </div>
        </div>

        {/* Progress Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
          {[
            { 
              label: 'Total Weeks', 
              value: '12', 
              icon: IconCalendar, 
              color: 'bg-blue-500',
              description: 'Treatment duration'
            },
            { 
              label: 'Photos Taken', 
              value: '4', 
              icon: IconCamera, 
              color: 'bg-green-500',
              description: 'Progress captured'
            },
            { 
              label: 'Improvement', 
              value: '+67%', 
              icon: IconTrendingUp, 
              color: 'bg-purple-500',
              description: 'Skin quality boost'
            },
            { 
              label: 'Overall Rating', 
              value: '4.5/5', 
              icon: IconStar, 
              color: 'bg-yellow-500',
              description: 'Average score'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-[#f8f6ee] rounded-xl p-5 md:p-6 shadow-sm border border-[#1E3F2B]/20 hover:shadow-md hover:border-[#1E3F2B]/30 transition-all duration-300"
            >
              {/* Icon and Value */}
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${stat.color} shadow-sm`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-[#1E3F2B]">
                  {stat.value}
                </span>
              </div>

              {/* Label and Description */}
              <div>
                <h3 className="text-sm md:text-base font-semibold text-[#1E3F2B] mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-[#1E3F2B]/60">
                  {stat.description}
                </p>
              </div>

              {/* Progress bar for improvement */}
              {stat.label === 'Improvement' && (
                <div className="mt-3">
                  <div className="w-full bg-[#1E3F2B]/10 rounded-full h-1.5">
                    <motion.div 
                      className="bg-purple-500 h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '67%' }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    />
                  </div>
                </div>
              )}

              {/* Stars for rating */}
              {stat.label === 'Overall Rating' && (
                <div className="mt-3 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IconStar
                      key={star}
                      className={`h-3 w-3 ${
                        star <= 4
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Main Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Current Photo Display */}
          <div className="bg-[#f8f6ee] rounded-xl p-6 shadow-sm border border-[#1E3F2B]/50">
            <div className="flex items-center justify-between mb-4 tracking-tight border-b border-[#1E3F2B]/50 pb-2">
              <div className="flex items-center space-x-2">
                <IconCamera className="text-[#1E3F2B] h-5 w-5" />
                <h2 className="text-xl font-semibold text-[#1E3F2B]">Current Progress</h2>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevPhoto}
                  className="p-1 rounded-full bg-[#1E3F2B]/10 hover:bg-[#1E3F2B]/20 transition-colors"
                >
                  <IconChevronLeft className="h-4 w-4 text-[#1E3F2B]" />
                </motion.button>
                <span className="text-sm text-[#1E3F2B]/70 font-medium">
                  {currentIndex + 1} of {progressPhotos.length}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextPhoto}
                  className="p-1 rounded-full bg-[#1E3F2B]/10 hover:bg-[#1E3F2B]/20 transition-colors"
                >
                  <IconChevronRight className="h-4 w-4 text-[#1E3F2B]" />
                </motion.button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl bg-gray-100 mb-4">
              <Image
                src={progressPhotos[currentIndex].image}
                alt={`Week ${progressPhotos[currentIndex].week} progress`}
                width={400}
                height={300}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#1E3F2B] text-white px-3 py-1 rounded-full text-sm font-medium">
                Week {progressPhotos[currentIndex].week}
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#1E3F2B]">
                {progressPhotos[currentIndex].date}
              </div>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: star * 0.1 }}
                >
                  <IconStar
                    className={`h-4 w-4 ${
                      star <= progressPhotos[currentIndex].rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.div>
              ))}
              <span className="ml-2 text-sm text-[#1E3F2B]/70">
                {progressPhotos[currentIndex].rating}/5
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-[#1E3F2B] mb-2">Progress Notes</h4>
                <p className="text-sm text-[#1E3F2B]/80 leading-relaxed">
                  {progressPhotos[currentIndex].notes}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#1E3F2B] mb-2 flex items-center">
                  <IconTrendingUp className="h-4 w-4 mr-2" />
                  Improvements
                </h4>
                <div className="space-y-1">
                  {progressPhotos[currentIndex].improvements.map((improvement, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <IconCheck className="text-green-500 h-4 w-4" />
                      <span className="text-sm text-[#1E3F2B]/80">{improvement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="bg-[#f8f6ee] rounded-xl p-6 shadow-sm border border-[#1E3F2B]/50">
            <div className="flex items-center justify-between mb-4 tracking-tight border-b border-[#1E3F2B]/50 pb-2">
              <div className="flex items-center space-x-2">
                <IconCalendar className="text-[#1E3F2B] h-5 w-5" />
                <h2 className="text-xl font-semibold text-[#1E3F2B]">Timeline</h2>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-[#1E3F2B]/10 hover:bg-[#1E3F2B]/20 transition-colors"
                >
                  <IconDownload className="h-4 w-4 text-[#1E3F2B]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-[#1E3F2B]/10 hover:bg-[#1E3F2B]/20 transition-colors"
                >
                  <IconShare className="h-4 w-4 text-[#1E3F2B]" />
                </motion.button>
              </div>
            </div>

            <div className="space-y-4">
              {progressPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
                    index === currentIndex ? 'ring-2 ring-[#1E3F2B] bg-[#1E3F2B]/5' : 'hover:bg-[#1E3F2B]/5'
                  }`}
                >
                  <div className="flex items-center space-x-4 p-3">
                    <div className="relative">
                      <Image
                        src={photo.image}
                        alt={`Week ${photo.week}`}
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded-lg object-cover"
                      />
                      <div className="absolute -top-1 -right-1 bg-[#1E3F2B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {photo.week}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-[#1E3F2B]">Week {photo.week}</h4>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <IconStar
                              key={star}
                              className={`h-3 w-3 ${
                                star <= photo.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#1E3F2B]/70 mb-1">{photo.date}</p>
                      <p className="text-xs text-[#1E3F2B]/80 line-clamp-2">{photo.notes}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 bg-[#1E3F2B] text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-[#1E3F2B]/80 transition-colors flex items-center justify-center space-x-2"
            >
              <IconPlus className="h-4 w-4" />
              <span>Add New Entry</span>
            </motion.button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mb-6">
          {progressPhotos.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-[#1E3F2B]'
                  : 'bg-[#1E3F2B]/30 hover:bg-[#1E3F2B]/50'
              }`}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-[#f8f6ee] rounded-xl p-6 shadow-sm border border-[#1E3F2B]/50">
          <div className="flex items-center justify-start space-x-2 mb-4 tracking-tight border-b border-[#1E3F2B]/50 pb-2">
            <IconInfoCircle className="text-[#1E3F2B] h-5 w-5" />
            <h2 className="text-xl font-semibold text-[#1E3F2B]">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 p-4 bg-[#1E3F2B]/10 rounded-lg hover:bg-[#1E3F2B]/20 transition-colors"
            >
              <IconCamera className="text-[#1E3F2B] h-6 w-6" />
              <div className="text-left">
                <p className="text-sm font-medium text-[#1E3F2B]">Take Photo</p>
                <p className="text-xs text-[#1E3F2B]/70">Capture progress</p>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 p-4 bg-[#1E3F2B]/10 rounded-lg hover:bg-[#1E3F2B]/20 transition-colors"
            >
              <IconEye className="text-[#1E3F2B] h-6 w-6" />
              <div className="text-left">
                <p className="text-sm font-medium text-[#1E3F2B]">View Analysis</p>
                <p className="text-xs text-[#1E3F2B]/70">Detailed insights</p>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 p-4 bg-[#1E3F2B]/10 rounded-lg hover:bg-[#1E3F2B]/20 transition-colors"
            >
              <IconShare className="text-[#1E3F2B] h-6 w-6" />
              <div className="text-left">
                <p className="text-sm font-medium text-[#1E3F2B]">Share Progress</p>
                <p className="text-xs text-[#1E3F2B]/70">With your doctor</p>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkinProgress