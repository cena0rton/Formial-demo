'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconInfoCircle,
  IconCamera,
  IconTruck,
  IconBell,
  IconUser,
  IconMessageCircle,
  IconSend,
  IconPlus,
  IconCheck,
  IconX,
} from '@tabler/icons-react'
import { IconHome } from '@tabler/icons-react'



const DashHome = () => {
  
  const [showNotification, setShowNotification] = useState<number | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)



  type NotificationType = {
    id: number
    message: string
    time: string
    icon: React.ReactNode
  }

  const Notifications: NotificationType[] = [
    {
      id: 1,
      message: 'Your order has been shipped',
      time: '04:20 PM',
      icon: (
        <IconBell className="text-[#1E3F2B] h-6 w-6 cursor-pointer" />
      ),
    },
    {
      id: 2,
      message: 'You have 2 new messages from Dr. Jeet',
      time: '04:20 PM',
      icon: (
        <IconMessageCircle className="text-[#1E3F2B] h-6 w-6 cursor-pointer" />
      ),
    },
    {
      id: 0,
      message: 'heelo there',
      time: '04:20 PM',
      icon: (
        <IconUser className="text-[#1E3F2B] h-6 w-6 cursor-pointer" />
      ),
    },
  ]

  return (
    <div className="md:p-6 overflow-x-hidden bg-[#f8f6ee] min-h-screen rounded-xl">
     
      

      <div className="mx-auto">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8 space-x-4 bg-[#90C494]/20 rounded-xl px-6 py-4">
          <div className="flex items-center justify-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <IconUser className="h-6 w-6 text-gray-600" />
            </div>
            <h1 className="md:text-3xl text-xl font-bold text-[#1E3F2B] tracking-tight">
              Welcome, User!
            </h1>
          </div>
          <div className="md:flex hidden items-center justify-end space-x-4">
            <button
              onClick={() => {
                localStorage.removeItem('formial-onboarding-completed')
                window.location.reload()
              }}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              <IconInfoCircle className="h-4 w-4" />
              <span>Test Onboarding</span>
            </button>
            {Notifications.map((notification, index) => (
              <button
                onMouseEnter={() => setShowNotification(index)}
                onMouseLeave={() => setShowNotification(null)}
                key={index}
              >
                <Notification count={notification.id}>
                  {notification.icon}
                  {showNotification === index && notification.id > 0 && (
                    <div className="absolute top-8 right-0 z-10 bg-[#1E3F2B] text-white text-xs rounded-xl text-nowrap flex items-center justify-between p-2 text-left space-x-2">
                      
                      <IconTruck className="text-white h-5 w-5" />
                      <p>{notification.message}</p>
                    </div>
                  )}
                </Notification>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 tracking-tight">
          {/* Left Column: Prescription and Photos */}
          <div className="lg:col-span-2 space-y-8">
            {/* Your Current Prescription Card */}
            <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <IconHome className="text-[#1E3F2B] h-6 w-6" />
                <h2 className="md:text-xl text-lg font-semibold text-[#343434]">Your Current Prescription</h2>
              </div>
              
              {/* Prescription Details Box */}
              <div className="bg-[#F8F7F4] rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="md:text-xl text-lg font-medium text-gray-800 mb-1">0.025% tretinoin cream</h3>
                    <p className="text-sm text-gray-500">Prescription</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 border border-green-200">
                    <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                </div>
                
                {/* Date Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Next shipment</p>
                    <p className="font-medium text-gray-800">Nov 29, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Request changes by</p>
                    <p className="font-medium text-gray-800">Nov 26, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Expires on</p>
                    <p className="font-medium text-gray-800">Nov 12, 2025</p>
                  </div>
                </div>
              </div>

              {/* Daily Routine Section */}
              <div>
                <p className="text-base font-medium text-gray-700 mb-3">Daily routine:</p>
                <div className="flex flex-wrap gap-3">
                  {['Cleanser', 'Treatment', 'Moisturizer'].map((item, index) => (
                    <span
                      key={index}
                      className="flex items-center px-4 py-2 text-sm font-medium rounded-full bg-[#F2F8F5] text-[#1E4D31]"
                    >
                      <IconCheck className="h-4 w-4 mr-1.5" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Upload Your Photos Card */}
            <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <IconCamera className="text-[#1E3F2B] h-6 w-6" />
                <h2 className="md:text-xl text-lg font-semibold text-[#343434]">Upload Your Photos Here</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Upload Area */}
                <div className="md:col-span-1 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <IconPlus className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="font-medium text-gray-800 mb-1">Upload Photos</p>
                  <p className="text-xs text-gray-500">Track your progress</p>
                </div>
                
                {/* Progress Photos Grid */}
                <div className="md:col-span-2 grid grid-cols-3 gap-4">
                  {[
                    { week: 'Week 0', src: '/leftMain.png' },
                    { week: 'Week 4', src: '/centerAI.png' },
                    { week: 'Week 8', src: '/rightMain.png' }
                  ].map((photo, index) => (
                    <div key={index} className="relative group aspect-square">
                      <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden relative">
                        {photo.src ? (
                          <Image
                            alt={`Skincare progress ${photo.week}`}
                            className="object-cover rounded-xl"
                            src={photo.src}
                            fill
                          />
                        ) : (
                          <span className="text-xs text-gray-500">{photo.week}</span>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/10 rounded-xl flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <p className="text-white text-xs font-semibold">{photo.week}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chat Section - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col h-full ">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-100 mt-2">
                <h2 className="text-xl font-semibold text-left text-[#343434]">Formial Consultant</h2>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-grow p-6 overflow-y-auto space-y-6">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-green-100 text-gray-800 p-3 rounded-lg rounded-br-none max-w-xs shadow-sm">
                    <p className="text-sm">How is my skin progress looking?</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none max-w-xs shadow-sm">
                    <p className="text-sm text-gray-700">
                      Your skin is showing great improvement! Based on your latest photos, I can see a 67% improvement in texture and clarity. Keep up with your current routine!
                    </p>
                  </div>
                </div>

                {/* Quick Replies */}
                <div className="pt-4">
                  <p className="text-center text-xs text-gray-400 mb-3">Quick Replies</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="text-sm text-center p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                      Need refill
                    </button>
                    <button className="text-sm text-center p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                      Skin Analysis
                    </button>
                    <button className="text-sm text-center p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                      My skin feels dry
                    </button>
                    <button className="text-sm text-center p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                      Get Help
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Input Area */}
              <div className="p-4 border-t border-gray-200 mt-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full bg-gray-100 border-gray-200 rounded-full py-3 pl-5 pr-12 text-sm focus:ring-2 focus:ring-[#1E3F2B] focus:border-[#1E3F2B] placeholder-gray-500"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#1E3F2B] text-white rounded-full flex items-center justify-center hover:bg-[#1a3528] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3F2B]">
                    <IconSend className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Chat Icon Button */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="lg:hidden fixed bottom-4 right-4 z-40 w-fit h-fit bg-[#1E3F2B] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1a3528] transition-colors px-4 py-2"
            aria-label="Open chat"
          >
           <div className='flex items-center justify-center gap-2'><span className='text-xs'>Formial Consultant</span><IconMessageCircle className="h-6 w-6" /></div> 
          </button>
        )}

        {/* Mobile Chat Modal */}
        <AnimatePresence>
          {isChatOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsChatOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />
              
              {/* Chat Modal */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[100vh]"
              >
                {/* Chat Header with Close Button */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#343434]">Formial Consultant</h2>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close chat"
                  >
                    <IconX className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-green-100 text-gray-800 p-3 rounded-lg rounded-br-none max-w-[80%] shadow-sm">
                      <p className="text-sm">How is my skin progress looking?</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-700">
                        Your skin is showing great improvement! Based on your latest photos, I can see a 67% improvement in texture and clarity. Keep up with your current routine!
                      </p>
                    </div>
                  </div>

                  {/* Quick Replies */}
                  <div className="pt-4">
                    <p className="text-center text-xs text-gray-400 mb-3">Quick Replies</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="text-sm text-center p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                        Need refill
                      </button>
                      <button className="text-sm text-center p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                        Skin Analysis
                      </button>
                      <button className="text-sm text-center p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                        My skin feels dry
                      </button>
                      <button className="text-sm text-center p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                        Get Help
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chat Input Area */}
                <div className="p-4 border-t border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="w-full bg-gray-100 border-gray-200 rounded-full py-3 pl-5 pr-12 text-sm focus:ring-2 focus:ring-[#1E3F2B] focus:border-[#1E3F2B] placeholder-gray-500"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#1E3F2B] text-white rounded-full flex items-center justify-center hover:bg-[#1a3528] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3F2B]">
                      <IconSend className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DashHome

export const Notification = ({
  children,
  count,
}: {
  children: React.ReactNode
  count?: number
}) => {
  return (
    <div className="relative">
      {children}
      {typeof count === 'number' && count > 0 && (
        <div className="absolute -top-1 right-0 z-10 bg-[#1E3F2B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {count}
        </div>
      )}
    </div>
  )
}