'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  IconInfoCircle,
  IconCamera,
  IconChevronDown,
  IconTruck,
  IconBell,
  IconUser,
  IconMessageCircle,
  IconSend,
  IconPlus,
  IconCheck,
  IconTrendingUp,
} from '@tabler/icons-react'
import { IconHome, IconProgress , IconQuestionMark, IconMessage } from '@tabler/icons-react'
import Image from 'next/image'
import OnboardingModal from './OnboardingModal'

const DashHome = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState<number | null>(null)

  const toggleAccordion = (item: string) => {
    setActiveAccordion(activeAccordion === item ? null : item)
  }

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
    <div className="md:p-6 overflow-x-hidden bg-[#e5e1d2] min-h-screen">
      {/* Onboarding Modal */}
      <OnboardingModal />
      
      {/* Onboarding Guide Modal */}
      

      <div className="mx-auto">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8 space-x-4 bg-[#90C494]/20 rounded-xl px-6 py-4">
          <div className="flex items-center justify-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <IconUser className="h-6 w-6 text-gray-600" />
            </div>
            <h1 className="md:text-3xl text-xl font-bold text-[#1E3F2B] tracking-tight">
              Welcome, Jeet!
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

        {/* Top Row */}
<div className="flex items-start justify-start max-w-[1440px] mx-auto gap-0 rounded-xl">

        <div className=" mr-auto flex-1 max-w-5xl">
        {/* Top Row */}
        <div className="grid grid-cols-1 gap-0 mb-6 ">
          {/* Home Section */}
          <div className="bg-[#f8f6ee] rounded-tl-xl p-6 shadow-lg border border-gray-300">

            <div className="flex items-center justify-start space-x-2 mb-4 tracking-tight border-b border-[#1E3F2B]/50 pb-2">
          <IconHome className="text-[#1E3F2B] h-5 w-5" />
            <h2 className="text-xl font-semibold text-[#1E3F2B] ">Home</h2>
            </div>

            <div className="mb-4">
              <p className="text-sm text-[#1E3F2B]/80 mb-1">Treatment Plan:</p>
              <p className="font-bold text-[#1E3F2B] flex items-center space-x-2 justify-between">
                0.025% tretinoin cream 
                <span className="text-sm text-green-500 px-2 py-1 bg-green-500/10 rounded-full flex items-center gap-2"><span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>active</span>
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">Daily routine:</p>
              <div className="space-y-2">
                {['Cleanser', 'Treatment', 'Moisturizer'].map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      <IconCheck className="text-[#1E3F2B] h-5 w-5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-[#1E3F2B]/80 text-white border border-white border-dashed rounded-lg px-3 py-2 flex justify-start w-fit items-center space-x-2 mt-8">
              <IconInfoCircle className="text-white h-5 w-5 " />
              <p className="text-sm text-white">
                Possible dryness and peeling
              </p>
            </div>
          </div>

          {/* Skin Progress Section */}
          <div className="bg-[#f8f6ee] rounded-bl-xl p-6 shadow-lg border border-gray-300">

             <div className="flex items-center justify-start space-x-2 mb-4 tracking-tight border-b border-[#1E3F2B]/50 pb-2">
          <IconProgress className="text-[#1E3F2B] h-5 w-5" />
            <h2 className="text-xl font-semibold text-[#1E3F2B] ">Skin Progress</h2>
            </div>

            <div className="text-center mb-4">
              <div className="bg-[#1E3F2B]/20 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-2">
                <IconCamera className="text-gray-600 h-8 w-8" />
              </div>
              <p className="text-sm text-gray-600">Upload photos</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="bg-gray-200 rounded-lg h-20 mb-1 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Week 0</span>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 rounded-lg h-20 mb-1 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Week 4</span>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 rounded-lg h-20 mb-1 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Week 8</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-[#1E3F2B] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#1E3F2B]/80 transition-colors">
              Add a journal entry
            </button>
          </div>

          {/* Learn & FAQs Section */}
        
        </div>

        {/* Bottom Row */}
       

            </div>

        
{/* Chat Section */}

         <div className="h-174 w-full bg-[#f8f6ee] rounded-tr-xl rounded-br-xl shadow-lg border border-gray-300 max-w-xl mx-auto flex flex-col tracking-tight scroll-none">
           {/* Chat Header */}
           <div className="flex items-center justify-between p-6 border-b border-gray-300">
             <div className="flex items-center space-x-3">
               <div className="w-10 h-10  rounded-xl flex items-center justify-center">
                 <IconMessage className="h-6 w-6 text-[#1E3F2B]" />
              </div>
               <div>
                 <h3 className="text-lg font-semibold text-gray-900">Formial Assistant</h3>
                 <p className="text-sm text-gray-500">Your skincare companion</p>
              </div>
            </div>
             <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
               <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>

           {/* Chat Messages Area */}
           <div className="flex-1 p-6 overflow-y-auto">
             <div className="space-y-6">
               {/* Welcome Message */}
               <div className="text-center py-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Formial Chat</h2>
                 <p className="text-gray-600 mb-8">Get started by asking about your skincare routine, treatment progress, or any questions you have. Not sure where to start?</p>
               
                 {/* Quick Action Cards */}
                 <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                   <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-left transition-colors border border-gray-200"
                   >
                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 bg-[#1E3F2B] rounded-lg flex items-center justify-center">
                           <IconCamera className="h-4 w-4 text-white" />
                         </div>
                         <span className="text-sm font-medium text-gray-900">Track Progress</span>
                       </div>
                       <IconPlus className="h-4 w-4 text-gray-400" />
                     </div>
                   </motion.button>

                   <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-left transition-colors border border-gray-200"
                   >
                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 bg-[#1E3F2B] rounded-lg flex items-center justify-center">
                           <IconTrendingUp className="h-4 w-4 text-white" />
                         </div>
                         <span className="text-sm font-medium text-gray-900">Skin Analysis</span>
                       </div>
                       <IconPlus className="h-4 w-4 text-gray-400" />
                     </div>
                   </motion.button>

                   <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-left transition-colors border border-gray-200"
                   >
                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 bg-[#1E3F2B] rounded-lg flex items-center justify-center">
                           <IconUser className="h-4 w-4 text-white" />
                         </div>
                         <span className="text-sm font-medium text-gray-900">Ask Doctor</span>
                       </div>
                       <IconPlus className="h-4 w-4 text-gray-400" />
                     </div>
                   </motion.button>

                   <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-left transition-colors border border-gray-200"
                   >
                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 bg-[#1E3F2B] rounded-lg flex items-center justify-center">
                           <IconInfoCircle className="h-4 w-4 text-white" />
                         </div>
                         <span className="text-sm font-medium text-gray-900">Get Help</span>
                       </div>
                       <IconPlus className="h-4 w-4 text-gray-400" />
            </div>
                   </motion.button>
                </div>
              </div>

               {/* Sample Messages */}
               <div className="space-y-4">
                 <div className="flex justify-end">
                   <div className="bg-[#90C494] text-white rounded-2xl rounded-br-md px-4 py-3 max-w-xs">
                     <p className="text-sm">How is my skin progress looking?</p>
                     <p className="text-xs opacity-75 mt-1">2:30 PM</p>
                </div>
              </div>

                 <div className="flex justify-start">
                   <div className="bg-[#1F3F2A] text-gray-100 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs">
                     <p className="text-sm">Your skin is showing great improvement! Based on your latest photos, I can see a 67% improvement in texture and clarity. Keep up with your current routine!</p>
                     <p className="text-xs text-gray-400 mt-1">2:31 PM</p>
                </div>
              </div>
            </div>
          </div>
            </div>

           {/* Chat Input Area */}
           <div className="p-6 border-t border-gray-100">
             <div className="relative">
               <input
                 type="text"
                 placeholder="Ask about your skincare routine, treatment progress, or any questions..."
                 className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3F2B]/20 focus:border-[#1E3F2B] transition-colors"
               />
               <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1E3F2B] text-white p-2 rounded-xl hover:bg-[#1E3F2B]/90 transition-colors">
                 <IconSend className="h-4 w-4" />
               </button>
              </div>
             
             {/* Additional Options */}
             <div className="flex items-center justify-between mt-4">
               <div className="flex items-center space-x-4">
                 <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                   <IconCamera className="h-4 w-4" />
                   <span className="text-xs">Attach Photo</span>
                 </button>
                 <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                   <IconBell className="h-4 w-4" />
                   <span className="text-xs">Voice Message</span>
                 </button>
                 <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                   <IconInfoCircle className="h-4 w-4" />
                   <span className="text-xs">Browse Prompts</span>
                 </button>
              </div>
               <div className="text-xs text-gray-400">
                 AI Assistant
              </div>
            </div>
          </div>
        </div>


  </div>

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