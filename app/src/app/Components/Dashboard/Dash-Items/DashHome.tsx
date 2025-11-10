'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  IconSend,
  IconPlus,
  IconDroplet,
  IconBook,
  IconClock,
  IconCamera,
  IconQuestionMark,
} from '@tabler/icons-react'

type TabType = 'home' | 'chat' | 'support'

const DashHome = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
  const userName = "Pawan" // You can make this dynamic later

  useEffect(() => {
    // Check if onboarding was just completed
    const onboardingCompleted = localStorage.getItem('formial-onboarding-completed')
    const welcomeMessageShown = localStorage.getItem('formial-welcome-message-shown')
    
    if (onboardingCompleted === 'true') {
      // Always show welcome message if onboarding is completed
      setShowWelcomeMessage(true)
      
      // If welcome message hasn't been shown before, redirect to chat tab
      if (welcomeMessageShown !== 'true') {
        setActiveTab('chat') // Redirect to chat tab
        // Auto-open chat on mobile to show welcome message
        if (window.innerWidth < 1024) {
          setIsChatOpen(true)
        }
        localStorage.setItem('formial-welcome-message-shown', 'true')
      }
    }

    // Load uploaded photos from localStorage
    const savedPhotos = localStorage.getItem('formial-uploaded-photos')
    if (savedPhotos) {
      try {
        const photos = JSON.parse(savedPhotos)
        setUploadedPhotos(photos)
      } catch (e) {
        console.error('Error parsing saved photos:', e)
      }
    }
  }, [])

  const treatmentTags = [
    { label: "pimples", color: "bg-red-200 text-red-900 border-red-300" },
    { label: "dullness", color: "bg-yellow-200 text-yellow-900 border-yellow-300" },
    { label: "fine lines", color: "bg-orange-200 text-orange-900 border-orange-300" },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-6">
        
        <h1 className="text-xl md:text-2xl font-medium text-[#1E3F2B] tracking-tight">
          Welcome {userName}
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-6 mb-6 border-b border-[#E0E0E0]">
        {(['home', 'chat', 'support'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 text-sm font-medium transition-colors capitalize relative ${
              activeTab === tab
                ? 'text-[#1E3F2B]'
                : 'text-[#585C5B] hover:text-[#3C403D]'
            }`}
          >
            {tab === 'home' ? 'Home' : tab === 'chat' ? 'Chat' : 'Support'}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3F2B]"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Skin/Treatment Card */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] px-6 pb-4 pt-3 relative overflow-hidden">
              <div className="flex items-center gap-1 mb-4 border-b border-[#E0E0E0] pb-1">
                <div className="p-2 rounded-lg bg-[#EAE0D5]/0">
                  <IconDroplet className="h-6 w-6 text-[#1E3F2B]" />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-[#1E3F2B]">Skin</h2>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-[#585C5B] mb-3 flex items-center justify-between gap-2 ">Your plan is <span className="font-medium text-green-500 border border-green-500 bg-green-500/10  rounded-full px-2 py-1 text-xs">active</span> </p>
                
                {/* Treatment Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {treatmentTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${tag.color}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                
                {/* Treatment Plan */}
                <p className="text-sm text-[#3C403D] mb-4">
                  <span className="font-semibold tracking-tight ">Treatment plan: <br/></span> Tretinoin 0.018% + Niacinamide 5% in a Hyaluronic Acid base AA - 24ml
                </p>
                
                {/* Dates */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-xs text-[#585C5B] mb-1">Next shipment</p>
                    <p className="font-medium text-[#3C403D]">Nov 29, 2025</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#585C5B] mb-1">Request changes by</p>
                    <p className="font-medium text-[#3C403D]">Nov 26, 2025</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#585C5B] mb-1">Expires on</p>
                    <p className="font-medium text-[#3C403D]">Nov 12, 2025</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-3 mt-3 rounded-full bg-[#1E3F2B] text-white font-medium hover:bg-[#1a3528] transition-colors mb-6">
                View Treatment Details
              </button>
              
              <p className="text-xs text-[#585C5B] text-center">
                If you were experiencing side effects or would like to change your treatment,{' '}
                <a href="#" className="text-[#A3B18A] hover:underline font-medium">
                  click here
                </a>{' '}
                to connect with our medical team.
              </p>
            </div>

            {/* Formial 101 Card */}
            <div className="bg-[#EAE0D5]/40 rounded-xl shadow-sm border border-[#E0E0E0] px-6 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#A3B18A]/0">
                    <IconBook className="h-5 w-5 text-[#1E3F2B]" />
                  </div>
                  <h3 className="text-lg font-medium text-[#1E3F2B] tracking-tight">Formial Guide</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#585C5B]">
                  <IconClock className="h-4 w-4" />
                  <span>2 MIN</span>
                </div>
              </div>
              <p className="text-sm text-[#585C5B] flex items-center justify-between gap-2">
                Improve your skin journey with our guide to getting started.
                <button className="ml-auto block px-6 py-2 rounded-lg bg-[#1E3F2B] text-white text-sm font-medium hover:bg-[#1a3528] transition-colors">
                Read
              </button>
              </p>
            
            </div>

            {/* Skin Progress Card */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0]  px-6 pb-4 pt-3">
              <div className="flex items-center gap-3 mb-4 border-b border-[#E0E0E0] pb-1">
                <div className="p-2 rounded-lg bg-[#EAE0D5]/0">
                  <IconCamera className="h-6 w-6 text-[#1E3F2B]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1E3F2B] tracking-tight">Your Skin Progress</h3>
              </div>
              <p className="text-sm text-[#585C5B] mb-4">
                Hi {userName}, how is your skin going today?
              </p>
              
              {uploadedPhotos.length > 0 ? (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {uploadedPhotos.map((photo, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-[#E0E0E0]">
                      <Image
                        src={photo}
                        alt={`Uploaded photo ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-[#E0E0E0] bg-[#EAE0D5]/20 p-6 text-center">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#A3B18A]/20 text-[#A3B18A]">
                    <IconPlus className="text-2xl" />
                  </div>
                  <p className="text-sm text-[#3C403D] font-medium">Upload photos for your consultant</p>
                  <button className="px-6 py-2 rounded-lg bg-[#1E3F2B] text-white text-sm font-medium hover:bg-[#1a3528] transition-colors">
                    Upload Photos
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] overflow-hidden flex flex-col h-[600px]"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-[#E0E0E0] bg-[#F5F2ED]">
              <h3 className="text-[#3C403D] text-xl font-medium">Formial Chat Assistant</h3>
            </div>
            
            {/* Chat Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-[#F5F2ED]">
              {/* Welcome Message - Show if onboarding is completed */}
              {showWelcomeMessage && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-center bg-cover shrink-0 bg-gray-300"></div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-xs">
                      <p className="text-[#585C5B] text-sm whitespace-pre-line">
                        Thank you, {userName}. Your photos are with our dermatology team now.{'\n\n'}
                        They&apos;ll review your skin carefully and discuss your tailored treatment plan within the next 8–12 hours (or sooner).{'\n\n'}
                        We&apos;ll message you on your verified WhatsApp number, and your consultation will appear in your Consultation tab.{'\n\n'}
                        This dashboard is your skin&apos;s personal space :)
                      </p>
                    </div>
                    <span className="text-xs text-[#585C5B]/60 px-1">Formial Consultant - Just now</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Chat Input Area */}
            <div className="p-4 border-t border-[#E0E0E0] bg-white">
              <div className="flex items-center gap-2">
                <input
                  className="w-full h-10 px-4 bg-white rounded-full border border-[#E0E0E0] focus:ring-2 focus:ring-[#A3B18A]/50 focus:border-[#A3B18A] transition-shadow text-[#585C5B] text-sm"
                  placeholder="Type your message..."
                  type="text"
                />
                <button className="flex items-center justify-center shrink-0 size-10 rounded-full bg-[#1E3F2B] text-white hover:opacity-90 transition-opacity">
                  <IconSend className="text-xl" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'support' && (
          <motion.div
            key="support"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Support Card */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[#EAE0D5]/60">
                  <IconQuestionMark className="h-6 w-6 text-[#1E3F2B]" />
                </div>
                <h2 className="text-xl font-semibold text-[#1E3F2B]">Need Help?</h2>
              </div>
              <p className="text-sm text-[#585C5B] mb-6">
                Our support team is here to help you with any questions about your treatment plan.
              </p>
              <button
                onClick={() => setIsChatOpen(true)}
                className="w-full py-3 rounded-lg bg-[#1E3F2B] text-white font-medium hover:bg-[#1a3528] transition-colors"
              >
                Chat with Support
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Chat Icon Button */}
   
    </div>
  )
}

export default DashHome