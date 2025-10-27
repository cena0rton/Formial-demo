'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  IconShare,
  IconX,
  IconArrowRight,
  IconArrowLeft
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
      image:  "https://cdn.shopify.com/s/files/1/0410/9608/5665/t/3/assets/pf-4645773e--cover-image-3.jpg?v=1611040721",
      notes: 'Initial baseline photo - starting treatment',
      improvements: ['Baseline established'],
      rating: 3
    },
    {
      id: 2,
      week: 4,
      date: '2024-02-12',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_hlzybvaZIvGOm9Oij7FVsxxKHsdiGxxHMw&s',
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
    <div className="md:p-6 overflow-x-hidden bg-[#e5e1d2] min-h-screen tracking-tight">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8 space-x-4 bg-[#90C494]/20 rounded-xl px-4 py-4">
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

        {/* Progress Overview - New Design */}
        <div className="mb-6">
          {/* Main Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
            {/* Treatment Progress */}
            <div className="bg-[#f8f6ee] rounded-2xl p-6 border border-[#1E3F2B]/50">
              <div className="flex items-center justify-between mb-4 border-b border-[#1E3F2B]/50 pb-4">

                <div className="flex items-center space-x-3 h-full ">
                  <div className="p-3 bg-[#1E3F2B]/90 rounded-xl">
                    <IconCalendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1E3F2B]">Treatment Progress</h3>
                    <p className="text-sm text-[#1E3F2B]/60">Week 12 of 16</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold text-[#1E3F2B]">75%</div>
                  <div className="text-xs text-green-600">+3% this week</div>
                </div>
              </div>
              <div className="w-full bg-[#1E3F2B]/10 rounded-full h-2 my-6">
                <motion.div 
                  className="bg-green-800 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: 0.2, duration: 1 }}
                />
             
              </div>
              <p className="text-sm text-[#1E3F2B]/80 mt-6">Treatment Plan:</p>
              <p className="font-bold text-[#1E3F2B] flex items-center space-x-2 justify-between">
                0.025% tretinoin cream 
                <span className="text-sm text-green-500 px-2 py-1 bg-green-500/10 rounded-full flex items-center gap-2"><span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>active</span>
              </p>
            </div>

            {/* Skin Quality Score */}
            <div className="bg-[#f8f6ee] rounded-2xl p-6 border border-[#1E3F2B]/50">
              <div className="flex items-center justify-between mb-4 border-b border-[#1E3F2B]/50 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#1E3F2B]/90 rounded-xl">
                    <IconTrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1E3F2B]">Skin Quality</h3>
                    <p className="text-sm text-[#1E3F2B]/60">Overall improvement</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold text-[#1E3F2B]">8.2</div>
                  <div className="text-xs text-green-600">+0.8 this month</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 my-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <div
                    key={num}
                    className={`w-2 h-2 rounded-full ${
                      num <= 8 ? 'bg-green-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
                
                <span className="text-xs text-[#1E3F2B]/60 ml-2">/10</span>
                
                
              </div>
              <p className="text-sm text-[#1E3F2B]/80 mt-6">Skin Type</p>
              <p className="font-bold text-[#1E3F2B] flex items-center space-x-2 justify-between">
                Oily 
                <span className="text-sm text-yellow-500 px-2 py-1 bg-yellow-500/10 rounded-full flex items-center gap-2"><span className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></span>Treating</span>
              </p>
            </div>

            {/* Photo Collection */}
            <div className="bg-[#f8f6ee] rounded-2xl p-6 border border-[#1E3F2B]/50">
              <div className="flex items-center justify-between mb-4 border-b border-[#1E3F2B]/50 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#1E3F2B]/90 rounded-xl">
                    <IconCamera className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1E3F2B]">Photo Collection</h3>
                    <p className="text-sm text-[#1E3F2B]/60">Progress documented</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold text-[#1E3F2B]">4</div>
                  <div className="text-xs text-green-600">+1 this week</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500">W{i * 3}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Insights Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Days Active', value: '84', icon: IconCalendar, },
              { label: 'Consistency', value: '92%', icon: IconCheck, },
              { label: 'Side Effects', value: 'Minimal', icon: IconInfoCircle, },
              { label: 'Next Check', value: 'Week 16', icon: IconStar, }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/50 rounded-xl p-4 border border-[#1E3F2B]/10"
              >
                <div className="flex items-center justify-start space-x-3">
                  <stat.icon className={`h-5 w-5 text-[#1E3F2B]`} />
                  <div>
                    <div className="md:text-lg text-md font-semibold text-[#1E3F2B]">{stat.value}</div>
                    <div className="text-xs text-[#1E3F2B]/60">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
                        ? 'text-[#1E3F2B] fill-current'
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
                    index === currentIndex ? 'ring-1 ring-[#1E3F2B] bg-[#1E3F2B]/5' : 'hover:bg-[#1E3F2B]/5'
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
                                  ? 'text-[#1E3F2B] fill-current'
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