'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Support = () => {
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

          {/* Chat Iframe */}
          {/* Note: The iframe content is from an external domain (sagepilot.ai).
              We can only style the container, not the content inside due to cross-origin restrictions.
              To customize the chat widget appearance, check SagePilot dashboard for theme/customization options. */}
          <div 
            className="w-full rounded-3xl overflow-hidden bg-white border border-black/10" 
            style={{ height: 'calc(100vh - 250px)', minHeight: '600px' }}
          >
            <iframe
              src="https://app.sagepilot.ai/chat-widget-iframe.html?key=54dd14e1-fed6-4990-8a1b-a181967f50b2:46d8b50c-9414-4e6b-a3a8-feaa061dc9cb&host=https://app.sagepilot.ai"
              className="w-full h-full border-none outline-none"
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
        </motion.div>
      </div>
    </div>
  )
}

export default Support

