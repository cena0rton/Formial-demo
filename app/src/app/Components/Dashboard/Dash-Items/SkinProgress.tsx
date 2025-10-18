'use client'
import React, { useState } from 'react'
import { motion, } from 'framer-motion'
import { 
  
  IconUpload,

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
 
  const [isUploading, setIsUploading] = useState(false)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

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



  const handleUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
    }, 2000)
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
            <motion.div className="flex items-center justify-start space-x-2">

            <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
                <Image src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face" alt="Skin Progress" width={100} height={100}/>
               </motion.div>

                <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
                <Image src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face" alt="Skin Progress" width={100} height={100}/>
                </motion.div>

                <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
                <Image src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face" alt="Skin Progress" width={100} height={100}/>
            </motion.div>
            </motion.div>
        </div>
     
      </div>
    </div>
  )
}

export default SkinProgress