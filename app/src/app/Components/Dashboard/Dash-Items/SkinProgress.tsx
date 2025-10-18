'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { 
  IconCamera, 
  IconChevronLeft, 
  IconChevronRight, 
  IconUpload,
  IconCalendar,
  IconTrendingUp,
  IconEye,
  IconStar,
  IconProgress
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <div className="p-6 bg-[#e5e1d2] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-[#1E3F2B]/10">
              <IconProgress className="text-[#1E3F2B] h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-[#1E3F2B] tracking-tight">
              Skin Progress Journey
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center space-x-2 bg-[#1E3F2B] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1E3F2B]/80 transition-colors disabled:opacity-50"
          >
            <IconUpload className="h-5 w-5" />
            <span>{isUploading ? 'Uploading...' : 'Add Photo'}</span>
          </motion.button>
        </motion.div>

        
        <div>
            <motion.div>
                
            </motion.div>
        </div>
     
      </div>
    </div>
  )
}

export default SkinProgress