'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IconUser } from '@tabler/icons-react'

const Support = () => {
  const [message, setMessage] = useState('')

  // Mock messages - in a real app, these would come from an API
  const messages = [
    { id: 1, sender: 'assistant', text: "Hello! I'm the Formial Labs assistant. How can I help you today? Lorem Ipsum Lorem Ipsum" },
    { id: 2, sender: 'user', text: "Hello! I'm the Formial Labs assistant. How can I help you today? Lorem Ipsum Lorem Ipsum" },
    { id: 3, sender: 'assistant', text: "Hello! I'm the Formial Labs assistant. How can I help you today? Lorem Ipsum Lorem Ipsum" },
    { id: 4, sender: 'user', text: "Hello! I'm the Formial Labs assistant. How can I help you today? Lorem Ipsum Lorem Ipsum" },
    { id: 5, sender: 'assistant', text: "Hello! I'm the Formial Labs assistant. How can I help you today? Lorem Ipsum Lorem Ipsum" },
  ]

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // TODO: Send message to API
      setMessage('')
    }
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
          className="flex flex-col h-[calc(100vh-200px)] max-h-[800px]"
        >
          {/* Header Button */}
          <div className="flex items-center justify-center mb-6">
            <div className="px-6 py-3 rounded-full bg-[#7CB58D] border border-[#1E3F2B] text-[#1E3F2B] text-sm tracking-tighter font-bold"
              style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
            >
              Support
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-6 mb-4 px-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7CB58D] flex items-center justify-center">
                    <IconUser className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'assistant'
                      ? 'bg-gray-200 text-[#3D2D1F]'
                      : 'bg-[#1E3F2B] text-white'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                {msg.sender === 'user' && (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <IconUser className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSend} className="mt-auto">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message......"
                className="flex-1 rounded-xl border border-[#1E3F2B] bg-white px-4 py-3 text-sm text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]/20"
              />
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Support

