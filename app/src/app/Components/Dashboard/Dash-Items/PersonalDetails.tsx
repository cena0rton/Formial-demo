/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  IconUser,
  IconMail,
  IconPhone,
  IconEdit,
  IconCheck,
  IconX,
} from '@tabler/icons-react'

const PersonalDetails = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'Jeet',
    email: 'jeet@example.com',
    whatsapp: '+91 9876543210',
  })

  const [editedData, setEditedData] = useState(formData)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedData(formData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedData(formData)
  }

  const handleSave = () => {
    // TODO: API call to update user details
    setFormData(editedData)
    setIsEditing(false)
    // Here you would make an API call to save the data
    // await updateUserDetails(editedData)
  }

  const handleChange = (field: string, value: string) => {
    setEditedData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="md:p-6 overflow-x-hidden bg-[#f8f6ee] min-h-screen rounded-xl">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 space-x-4 bg-[#90C494]/20 rounded-xl px-6 py-4">
          <div className="flex items-center justify-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1E3F2B] to-[#1E3F2B]/80 rounded-full flex items-center justify-center shadow-md">
              <IconUser className="h-6 w-6 text-white" />
            </div>
            <h1 className="md:text-3xl text-xl font-bold text-[#1E3F2B] tracking-tight">
              Personal Details
            </h1>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-[#f8f6ee] rounded-xl shadow-lg border border-gray-300">
          {/* Card Header */}
          <div className="flex items-center justify-between h-20 border-b border-gray-300 bg-[#F2EEE0] rounded-t-xl px-6">
            <div className="flex items-center space-x-2 tracking-tight">
              <IconUser className="text-gray-800 h-5 w-5" />
              <h2 className="text-xl font-semibold text-gray-800">
                Your Information
              </h2>
            </div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 bg-[#1E3F2B] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1E3F2B]/90 transition-colors"
              >
                <IconEdit className="h-4 w-4" />
                <span>Edit Details</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  <IconX className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-[#1E3F2B] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1E3F2B]/90 transition-colors"
                >
                  <IconCheck className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#F2EEE0] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <IconUser className="h-6 w-6 text-green-900" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E3F2B]/20 focus:border-[#1E3F2B] transition-colors"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-lg text-[#1E3F2B] font-semibold">
                      {formData.name}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    This is your display name
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#F2EEE0] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <IconMail className="h-6 w-6 text-green-900" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E3F2B]/20 focus:border-[#1E3F2B] transition-colors"
                      placeholder="Enter your email address"
                    />
                  ) : (
                    <p className="text-lg text-[#1E3F2B] font-semibold">
                      {formData.email}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    We'll use this for important updates and notifications
                  </p>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#F2EEE0] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <IconPhone className="h-6 w-6 text-green-900" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.whatsapp}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E3F2B]/20 focus:border-[#1E3F2B] transition-colors"
                      placeholder="Enter your WhatsApp number"
                    />
                  ) : (
                    <p className="text-lg text-[#1E3F2B] font-semibold">
                      {formData.whatsapp}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    We'll send reminders and updates via WhatsApp
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Info Banner */}
            {!isEditing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-[#1E3F2B]/10 to-[#90C494]/10 border border-[#1E3F2B]/20 rounded-xl p-4 mt-6"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1E3F2B] rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-700 font-medium mb-1">
                      Your information is secure
                    </p>
                    <p className="text-xs text-gray-600">
                      All personal details are encrypted and stored securely. We
                      never share your information with third parties.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails

