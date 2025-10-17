'use client'
import React, { useState } from 'react'
import { 
  IconCheck, 
  IconInfoCircle, 
  IconCamera, 
  IconChevronDown, 
  IconPlayerPlay, 
  IconTruck, 
  IconRefresh,
  IconHelp,
  IconBell,
  IconUser,
  IconMessageCircle
} from '@tabler/icons-react'
import Image from 'next/image'

const DashHome = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

  const toggleAccordion = (item: string) => {
    setActiveAccordion(activeAccordion === item ? null : item)
  }

  const [showNotification, setShowNotification] = useState<number | null>(null);

  type NotificationType = {
    id: number;
    message: string;
    time: string;
    icon: React.ReactNode;
  }

  const Notifications:NotificationType[]=[
  {id: 1, message: 'heelo there', time: '04:20 PM', icon: <IconBell className="text-[#1E3F2B] h-6 w-6 cursor-pointer"/>},
  {id: 2, message: 'heelo there', time: '04:20 PM', icon: <IconMessageCircle className="text-[#1E3F2B] h-6 w-6 cursor-pointer"/>},
  {id: 0, message: 'heelo there', time: '04:20 PM', icon: <IconUser className="text-[#1E3F2B] h-6 w-6 cursor-pointer"/>},
  ]

  return (
    <div className="p-6 bg-[#e5e1d2] min-h-screen">
      <div className="max-w-7xl mx-auto">



        <div className="flex items-center justify-between mb-8 space-x-4 bg-[#90C494]/20 rounded-xl px-4 py-2">

 <div className="flex items-center justify-start space-x-4">
        <div className=" p-1 rounded-full bg-white">
        <Image src="https://formial.in/cdn/shop/files/dr.jeet-colored.png?v=1760612748&width=800" alt="Formial Logo" height={50} width={50} className="rounded-full"/>
        </div>
        <h1 className="text-3xl font-bold text-[#1E3F2B]  tracking-tight">Good Evening, Jeet!</h1>
</div>
        <div className="flex items-center justify-end space-x-4">

          { Notifications.map((notification, index) => (
            <button
            onMouseEnter={() => setShowNotification(index)} onMouseLeave={() => setShowNotification(null)}
            key={index}
            >
              <Notification  count={notification.id}>
              
              {notification.icon}
              {showNotification === index && notification.id > 0 && <div className='absolute top-8 right-0 z-10 bg-[#1E3F2B] text-white text-xs rounded-xl size-fit flex items-center justify-center p-2'>
                 <p>{notification.message}</p>
              </div>}
              </Notification>
            </button>
          ))}

    
    </div>

        </div>
        
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Home Section */}
          <div className="bg-[#f8f6ee] rounded-xl p-6 shadow-sm border border-[#1E3F2B]/50">
            <h2 className="text-xl font-semibold text-[#1E3F2B] mb-4 tracking-tight border-b border-[#1E3F2B]/50 pb-2">Home</h2>
            
            <div className="mb-4">
              <p className="text-sm text-[#1E3F2B]/60 mb-1">Prescription:</p>
              <p className="font-bold text-[#1E3F2B]">0.025% tretinoin cream</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">Daily routine:</p>
              <div className="space-y-2">
                {['Cleanser', 'Treatment', 'Moisturizer'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <IconCheck className="text-[#1E3F2B] h-5 w-5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1E3F2B]/80 text-white border border-[#1E3F2B]/50 border-dashed rounded-lg p-3 flex justify-center items-center space-x-2">
              <IconInfoCircle className="text-white h-5 w-5 mt-0.5" />
              <p className="text-sm text-white">Possible dryness and peeling</p>
            </div>
          </div>

          {/* Skin Progress Section */}
          <div className="bg-[#f8f6ee] rounded-xl p-6 shadow-sm border border-[#1E3F2B]/50">
            <h2 className="text-xl font-semibold text-[#1E3F2B] mb-4 tracking-tight border-b border-[#1E3F2B]/50 pb-2">Skin Progress</h2>
            
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
              <div className='text-center'>
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
          <div className="bg-[#f8f6ee] rounded-xl p-6 shadow-sm border border-[#1E3F2B]/50">
            <h2 className="text-xl font-semibold text-[#1E3F2B] mb-4 tracking-tight border-b border-[#1E3F2B]/50 pb-2">Learn & FAQs</h2>
            
            <div className="space-y-2 mb-4">
              {['Side effects', 'Purging', 'What to expect'].map((item, index) => (
                <div key={index} className="border border-[#1E3F2B]/50 rounded-lg">
                  <button
                    onClick={() => toggleAccordion(item)}
                    className="w-full flex items-center justify-between p-3 text-left transition-colors"
                  >
                    <span className="text-sm font-medium">{item}</span>
                    <IconChevronDown 
                      className={`h-4 w-4 transition-transform ${
                        activeAccordion === item ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {activeAccordion === item && (
                    <div className="px-3 pb-3 text-sm text-gray-600">
                      Content for {item} would go here...
                    </div>
                  )}
                </div>
              ))}
            </div>

            <a href="#" className="text-[#1E3F2B] text-sm hover:underline">Essential readings</a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Videos Section */}
          <div className="bg-[#f8f6ee] rounded-xl p-6 shadow-sm border border-[#1E3F2B]/50">
            <h2 className="text-xl font-semibold text-[#1E3F2B] mb-4 tracking-tight border-b border-[#1E3F2B]/50 pb-2">Videos</h2>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-[#1E3F2B]/10 rounded-lg">
                <IconPlayerPlay className="text-[#1E3F2B] h-6 w-6" />
                <span className="text-sm font-medium">How to apply Formial</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-[#1E3F2B]/10 rounded-lg">
                <IconPlayerPlay className="text-[#1E3F2B] h-6 w-6" />
                <span className="text-sm font-medium">Skincare basics</span>
              </div>
            </div>
          </div>

          {/* Conversations / Chat Section */}
          <div className="bg-[#f8f6ee] rounded-xl p-6 shadow-sm border border-[#1E3F2B]/50">
            <h2 className="text-xl font-semibold text-[#1E3F2B] mb-4 tracking-tight border-b border-[#1E3F2B]/50 pb-2">Conversations / Chat</h2>
            
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-[#1E3F2B] text-white rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Hi, I have some questions</p>
                  <p className="text-xs opacity-75 mt-1">04:20 PM</p>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-[#1E3F2B]/10 text-[#1E3F2B] rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Sure, please go ahead!</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-[#1E3F2B] text-white rounded-lg p-3 max-w-xs flex items-center space-x-2">
                  <span className="text-sm">I will upload a photo</span>
                  <IconCamera className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-[#f8f6ee] rounded-xl p-6 shadow-sm border border-[#1E3F2B]/50">
            <h2 className="text-xl font-semibold text-[#1E3F2B] mb-4 tracking-tight border-b border-[#1E3F2B]/50 pb-2">Support</h2>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <IconTruck className="text-gray-600 h-5 w-5" />
                <span className="text-sm font-medium">Delivery status</span>
              </div>
              <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <IconRefresh className="text-gray-600 h-5 w-5" />
                <span className="text-sm font-medium">Replace pump</span>
              </div>
              <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <IconHelp className="text-gray-600 h-5 w-5" />
                <span className="text-sm font-medium">Contact support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashHome


export const Notification   = ({children, count}: {children: React.ReactNode, count?: number}) => {
  return (
   
      
      <div className="relative">
              
             {children}
                  <div className="absolute -top-1 right-0 z-10 bg-[#1E3F2B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {count}
                    </div>

        </div>
   
  )
}