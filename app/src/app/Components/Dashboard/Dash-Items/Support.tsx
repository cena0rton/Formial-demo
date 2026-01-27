'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSagepilotWidget } from '../../../hooks/useSagepilotWidget'
import { getUserContact } from '../../../utils/userContact'

/**
 * Chat Skeleton Loader Component
 * Displays a skeleton that mimics a chat interface while loading
 */
const ChatSkeleton = () => {
  return (
    <div 
      className="w-full rounded-3xl overflow-hidden bg-white"
      style={{ height: 'calc(100vh - 250px)', minHeight: '600px' }}
    >
      {/* Chat Header Skeleton */}
      <div className="h-16 bg-gray-100 border-b border-gray-200 flex items-center px-4">
        <div className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
          <div className="flex-1">
            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse mb-2" />
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 space-y-4" style={{ height: 'calc(100% - 140px)' }}>
        {/* Incoming message skeleton */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Outgoing message skeleton */}
        <div className="flex items-start gap-3 justify-end">
          <div className="flex-1 space-y-2 flex items-end flex-col">
            <div className="h-4 w-2/3 bg-[#7CB58D] bg-opacity-30 rounded-lg animate-pulse" />
            <div className="h-4 w-1/2 bg-[#7CB58D] bg-opacity-30 rounded-lg animate-pulse" />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
        </div>

        {/* Incoming message skeleton */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-4/5 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Spacer to push input to bottom */}
        <div className="flex-1" />
      </div>

      {/* Input Area Skeleton */}
      <div className="h-20 border-t border-gray-200 px-4 flex items-center">
        <div className="flex-1 h-12 bg-gray-100 rounded-full animate-pulse mr-3" />
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  )
}

const Support = () => {
  const contact = getUserContact()
  const { isLoading, isReady, error, iframeUrl } = useSagepilotWidget(contact)
  const [showSkeleton, setShowSkeleton] = useState(true)

  // Hide skeleton when iframe URL is ready
  useEffect(() => {
    if (iframeUrl && !error) {
      // Hide skeleton after a short delay to allow iframe to start loading
      const timer = setTimeout(() => {
        setShowSkeleton(false)
      }, 1500) // 1.5 seconds should be enough
      return () => clearTimeout(timer)
    } else if (isLoading) {
      setShowSkeleton(true)
    }
  }, [iframeUrl, error, isLoading])

  const handleIframeLoad = () => {
    setShowSkeleton(false)
  }

  return (
    <div className="w-full min-h-screen bg-[#F2F0E0]">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <motion.div
          key="support"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col"
        >
          {/* Header Button */}
          <div className="flex items-center justify-center mb-6">
            <div className="px-6 py-3 rounded-full bg-[#7CB58D] border border-[#1E3F2B] text-[#1E3F2B] text-sm tracking-tighter font-bold"
              style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
            >
              Support
            </div>
          </div>

          {/* Error State */}
          {error && !isLoading && (
            <div className="w-full rounded-3xl bg-red-50 border border-red-200 p-6 mb-4">
              <div className="text-red-800 text-sm font-medium mb-2">Error loading chat</div>
              <div className="text-red-600 text-xs">{error}</div>
            </div>
          )}

          {/* Chat Container with Skeleton or Iframe */}
          <div className="relative">
            {/* Skeleton Loader */}
            {showSkeleton && (
              <div className="absolute inset-0 z-10 pointer-events-none">
                <ChatSkeleton />
              </div>
            )}

            {/* Embedded Chat Iframe - Show as soon as URL is available */}
            {iframeUrl && !error ? (
              <div 
                className="w-full rounded-3xl overflow-hidden relative"
                style={{ height: 'calc(100vh - 250px)', minHeight: '600px' }}
              >
                <iframe
                  src={iframeUrl}
                  onLoad={handleIframeLoad}
                  className="w-full h-full border-none outline-none shadow-none"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none', 
                    outline: 'none',
                    display: 'block'
                  }}
                  allow="microphone; camera"
                  title="Support Chat"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                />
              </div>
            ) : isLoading ? (
              <div 
                className="w-full rounded-3xl overflow-hidden"
                style={{ height: 'calc(100vh - 250px)', minHeight: '600px' }}
              >
                <ChatSkeleton />
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Support

