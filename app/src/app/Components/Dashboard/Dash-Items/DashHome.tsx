'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconMessageCircle,
  IconSend,
  IconPlus,
  IconX,
  IconDroplet,
  IconFilter,
  IconMoon,
} from '@tabler/icons-react'



const DashHome = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const prescriptionItems = [
    {
      id: 1,
      icon: <IconDroplet className="h-6 w-6" />,
      title: "Gentle Hydrating Cleanser",
      description: "Use twice daily, morning and night.",
    },
    {
      id: 2,
      icon: <IconFilter className="h-6 w-6" />,
      title: "Morning Serum",
      description: "Apply 3-4 drops to clean skin each morning.",
    },
    {
      id: 3,
      icon: <IconMoon className="h-6 w-6" />,
      title: "Restorative Night Cream",
      description: "Apply a pea-sized amount before bed.",
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-8 lg:py-12 min-h-screen">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3 mb-8">
        <h1 className="md:text-3xl text-2xl text-[#1E3F2B] tracking-tight min-w-72">
          Hi Pawan! Let&apos;s get your skin glowing.
        </h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-0 border border-[#E0E0E0] rounded-xl">
        {/* Left Column */}
        <div className="lg:col-span-3 flex flex-col gap-2 ">
          {/* Current Prescription Section */}
          <section>
            <h2 className="text-[#3C403D] text-lg lg:text-2xl font-medium leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Your Current Prescription
            </h2>
            
            {/* Subscription Status and Dates */}
            <div className="px-4 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 border border-green-500">
                    <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-[#585C5B] mb-1">Next shipment</p>
                  <p className="font-medium text-[#3C403D] text-xs">Nov 29, 2025</p>
                </div>
                <div>
                  <p className="text-xs text-[#585C5B] mb-1">Request changes by</p>
                  <p className="font-medium text-[#3C403D] text-xs">Nov 26, 2025</p>
                </div>
                <div>
                  <p className="text-xs text-[#585C5B] mb-1">Expires on</p>
                  <p className="font-medium text-[#3C403D text-xs">Nov 12, 2025</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              {prescriptionItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-transparent px-4 min-h-[72px] py-2 justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-[#3C403D] flex items-center justify-center rounded-lg bg-[#EAE0D5]/60 shrink-0 size-12">
                      {item.icon}
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[#3C403D] text-sm lg:text-base font-medium leading-normal line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[#585C5B] text-xs lg:text-sm font-normal leading-normal line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <button className="text-[#A3B18A] text-sm font-medium leading-normal hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <hr className="border-t border-[#E0E0E0]" />

          {/* Upload Photos Section */}
          <section>
            <h2 className="text-[#3C403D] text-lg lg:text-2xl] font-medium leading-tight tracking-[-0.015em] px-4 pt-4 ">
              Track Your Progress
            </h2>
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-[#E0E0E0] bg-[#EAE0D5]/30 p-8 m-8 text-center">
              <div className="flex items-center justify-center size-14 rounded-full bg-[#A3B18A]/20 text-[#A3B18A]">
                <IconPlus className="text-3xl" />
              </div>
              <p className="text-[#3C403D] font-medium">Upload photos for your consultant</p>
              <p className="text-[#585C5B] text-sm max-w-xs">
                Drag & drop your files here or click the button below to select them from your device.
              </p>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 mt-2 bg-[#1E3F2B] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                <span className="truncate">Upload Photos</span>
              </button>
            </div>
          </section>
        </div>

        {/* Right Column (Chat) - Desktop Only */}
        <div className="hidden lg:flex lg:col-span-2 flex-col bg-[#F5F2ED] rounded-xl overflow-hidden h-full border-l border-[#E0E0E0]">
          <div className="p-4 border-b border-[#E0E0E0] border">
            <h3 className="text-[#3C403D] text-xl font-medium text-left ">Formial Consultant</h3>
          </div>
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
            {/* Chat Messages */}
            <div className="flex gap-3">
              <div className="size-8 rounded-full bg-center bg-cover shrink-0 bg-gray-300"></div>
              <div className="flex flex-col gap-1">
                <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-xs">
                  <p className="text-[#585C5B] text-sm">Hi there! How has your skin been feeling this week?</p>
                </div>
                <span className="text-xs text-[#585C5B]/60 px-1">Dr. Anya Sharma - 2:30 PM</span>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <div className="flex flex-col gap-1 items-end">
                <div className="bg-[#1E3F2B]/90 text-white p-3 rounded-lg rounded-tr-none max-w-xs">
                  <p className="text-sm">Much better, thanks! The new cleanser isn&apos;t drying out my skin at all.</p>
                </div>
                <span className="text-xs text-[#585C5B]/60 px-1">You - 2:32 PM</span>
              </div>
              <div className="size-8 rounded-full bg-center bg-cover shrink-0 bg-gray-300"></div>
            </div>
            <div className="flex gap-3">
              <div className="size-8 rounded-full bg-center bg-cover shrink-0 bg-gray-300"></div>
              <div className="flex flex-col gap-1">
                <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-xs">
                  <p className="text-[#585C5B] text-sm">That&apos;s great to hear! Consistency is key. Let&apos;s check in again next week.</p>
                </div>
                <span className="text-xs text-[#585C5B]/60 px-1">Dr. Anya Sharma - 2:35 PM</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-[#E0E0E0] mt-auto">
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
        </div>
      </div>

      {/* Mobile Chat Icon Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="lg:hidden fixed bottom-4 right-4 z-40 w-fit h-fit bg-[#A3B18A] text-white rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity px-4 py-2"
          aria-label="Open chat"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs">Formial Consultant</span>
            <IconMessageCircle className="h-6 w-6" />
          </div>
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
              <div className="p-4 border-b border-[#E0E0E0] flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#3C403D]">Chat with Your Consultant</h2>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <IconX className="h-5 w-5 text-[#585C5B]" />
                </button>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-center bg-cover shrink-0 bg-gray-300"></div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="text-[#585C5B] text-sm">Hi there! How has your skin been feeling this week?</p>
                    </div>
                    <span className="text-xs text-[#585C5B]/60 px-1">Dr. Anya Sharma - 2:30 PM</span>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="flex flex-col gap-1 items-end">
                    <div className="bg-[#A3B18A]/90 text-white p-3 rounded-lg rounded-tr-none max-w-[80%]">
                      <p className="text-sm">Much better, thanks! The new cleanser isn&apos;t drying out my skin at all.</p>
                    </div>
                    <span className="text-xs text-[#585C5B]/60 px-1">You - 2:32 PM</span>
                  </div>
                  <div className="size-8 rounded-full bg-center bg-cover shrink-0 bg-gray-300"></div>
                </div>
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-center bg-cover shrink-0 bg-gray-300"></div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="text-[#585C5B] text-sm">That&apos;s great to hear! Consistency is key. Let&apos;s check in again next week.</p>
                    </div>
                    <span className="text-xs text-[#585C5B]/60 px-1">Dr. Anya Sharma - 2:35 PM</span>
                  </div>
                </div>
              </div>

              {/* Chat Input Area */}
              <div className="p-4 border-t border-[#E0E0E0]">
                <div className="flex items-center gap-2">
                  <input
                    className="w-full h-10 px-4 bg-white rounded-full border border-[#E0E0E0] focus:ring-2 focus:ring-[#A3B18A]/50 focus:border-[#A3B18A] transition-shadow text-[#585C5B] text-sm"
                    placeholder="Type your message..."
                    type="text"
                  />
                  <button className="flex items-center justify-center shrink-0 size-10 rounded-full bg-[#A3B18A] text-white hover:opacity-90 transition-opacity">
                    <IconSend className="text-xl" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DashHome