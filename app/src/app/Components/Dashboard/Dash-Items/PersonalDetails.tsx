'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IconEdit } from '@tabler/icons-react'
import { FormialUser } from '../../../utils/formialApi'

interface PersonalDetailsProps {
  user?: FormialUser | null
  isLoading?: boolean
  onSave?: (payload: { name: string; whatsapp: string; address?: string }) => Promise<void>
}

const extractAddress = (user?: FormialUser | null) => {
  const addresses = user?.addresses
  if (!Array.isArray(addresses) || addresses.length === 0) return ''
  const first = addresses[0]
  if (typeof first === 'string') return first
  if (first && typeof first === 'object') {
    return Object.values(first)
      .filter((value) => typeof value === 'string' && value.trim().length > 0)
      .join(', ')
  }
  return ''
}

const sanitizePhone = (value: string) => {
  const digits = value.replace(/[^\d]/g, '')
  if (!digits) return ''
  return digits.startsWith('0') ? `+${digits.slice(1)}` : `+${digits}`
}

const PersonalDetails = ({ user, isLoading, onSave }: PersonalDetailsProps) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    address: '',
  })
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [otp, setOtp] = useState(['', '', '', ''])
  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.first_name || '',
        whatsapp: user.contact || '',
        address: extractAddress(user),
      })
    }
  }, [user])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 3) {
      otpInputRefs[index + 1].current?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus()
    }
  }

  const handleSave = async () => {
    if (!onSave) return
    setErrorMessage(null)
    setStatusMessage(null)
    setIsSaving(true)
    try {
      await onSave({
        name: formData.name,
        whatsapp: sanitizePhone(formData.whatsapp || user?.contact || ''),
        address: formData.address,
      })
      setStatusMessage('Details updated successfully.')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to update details right now.'
      setErrorMessage(message)
    } finally {
      setIsSaving(false)
    }
  }

  const headerDescription = useMemo(() => {
    if (!user) {
      return 'Complete onboarding to view your personal details.'
    }
    return 'Update how we reach you and where we ship your formulations.'
  }, [user])

  return (
    <div className="w-full min-h-screen bg-[#F2F0E0]">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <motion.div
          key="details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div
              className="px-6 py-3 rounded-full bg-[#7CB58D] border border-[#1E3F2B] text-[#1E3F2B] text-sm tracking-tighter font-bold"
              style={{ fontFamily: 'var(--font-lexend-exa), sans-serif' }}
            >
              Details
            </div>
          </div>
          <p className="text-center text-sm text-[#3D2D1F]/70 mb-6">{headerDescription}</p>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#3D2D1F]">Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-[#1E3F2B] bg-white px-4 py-3 pr-10 text-sm text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]/20 disabled:opacity-60"
                />
                <IconEdit className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1E3F2B]" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#3D2D1F]">WhatsApp Number</label>
              <div className="flex items-start gap-3">
                <div className="relative flex-1">
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-[#1E3F2B] bg-white px-4 py-3 pr-10 text-sm text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]/20 disabled:opacity-60"
                  />
                  <IconEdit className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1E3F2B]" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={otpInputRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-10 h-10 rounded-full border border-[#1E3F2B] bg-white text-center text-sm text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]/20"
                      />
                    ))}
                  </div>
                  <button className="text-xs text-[#1E3F2B] font-medium hover:underline" type="button">
                    Verify OTP
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#3D2D1F]">Address</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-[#1E3F2B] bg-white px-4 py-3 pr-10 text-sm text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D]/20 disabled:opacity-60"
                />
                <IconEdit className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1E3F2B]" />
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="w-full py-3 rounded-full bg-[#1E3F2B] text-white text-sm font-bold hover:bg-[#1E3F2B]/90 transition-colors mt-6 disabled:opacity-60"
              style={{ fontFamily: 'var(--font-lexend-exa), sans-serif' }}
            >
              {isSaving ? 'Saving...' : 'SAVE'}
            </button>

            <div className="min-h-[1.5rem]" aria-live="polite">
              {statusMessage && !errorMessage && (
                <p className="text-xs text-green-700">{statusMessage}</p>
              )}
              {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PersonalDetails

