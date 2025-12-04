'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IconEdit } from '@tabler/icons-react'
import { FormialUser } from '../../../utils/formialApi'

interface PersonalDetailsProps {
  user?: FormialUser | null
  isLoading?: boolean
  onSave?: (payload: { firstName: string; lastName: string; whatsapp: string; address?: AddressFormData }) => Promise<void>
}

interface AddressObject {
  first_name?: string
  last_name?: string
  company?: string | null
  address1?: string
  address2?: string
  city?: string
  province?: string
  zip?: string
  country?: string
  phone?: string
}

export interface AddressFormData {
  address1: string
  address2: string
  city: string
  state: string
  pincode: string
}

const extractAddressData = (user?: FormialUser | null): AddressFormData => {
  const defaultAddress: AddressFormData = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
  }

  const addresses = user?.addresses
  if (!Array.isArray(addresses) || addresses.length === 0) return defaultAddress
  
  const first = addresses[0]
  if (typeof first === 'string') {
    // Legacy string format - put it in address1
    return { ...defaultAddress, address1: first }
  }
  
  if (first && typeof first === 'object') {
    const addrObj = first as AddressObject
    return {
      address1: addrObj.address1 || '',
      address2: addrObj.address2 || '',
      city: addrObj.city || '',
      state: addrObj.province || '',
      pincode: addrObj.zip || '',
    }
  }
  
  return defaultAddress
}

const sanitizePhone = (value: string) => {
  const digits = value.replace(/[^\d]/g, '')
  if (!digits) return ''
  return digits.startsWith('0') ? `+${digits.slice(1)}` : `+${digits}`
}

const PersonalDetails = ({ user, isLoading, onSave }: PersonalDetailsProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    whatsapp: '',
  })
  const [addressData, setAddressData] = useState<AddressFormData>({
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [originalData, setOriginalData] = useState({
    firstName: '',
    lastName: '',
    whatsapp: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      pincode: '',
    },
  })
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  // Refs for input fields
  const firstNameInputRef = useRef<HTMLInputElement>(null)
  const lastNameInputRef = useRef<HTMLInputElement>(null)
  const whatsappInputRef = useRef<HTMLInputElement>(null)
  const address1InputRef = useRef<HTMLInputElement>(null)
  const address2InputRef = useRef<HTMLInputElement>(null)
  const cityInputRef = useRef<HTMLInputElement>(null)
  const stateInputRef = useRef<HTMLInputElement>(null)
  const pincodeInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) {
      const firstName = user.first_name || (user.name ? user.name.split(' ')[0] : '') || ''
      const lastName = user.last_name || (user.name ? user.name.split(' ').slice(1).join(' ') : '') || ''
      const whatsapp = user.contact || ''
      const address = extractAddressData(user)
      
      setFormData({ firstName, lastName, whatsapp })
      setAddressData(address)
      setOriginalData({
        firstName,
        lastName,
        whatsapp,
        address,
      })
    }
  }, [user])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddressChange = (field: keyof AddressFormData, value: string) => {
    setAddressData((prev) => ({ ...prev, [field]: value }))
  }

  const hasChanges = useMemo(() => {
    return (
      formData.firstName !== originalData.firstName ||
      formData.lastName !== originalData.lastName ||
      formData.whatsapp !== originalData.whatsapp ||
      addressData.address1 !== originalData.address.address1 ||
      addressData.address2 !== originalData.address.address2 ||
      addressData.city !== originalData.address.city ||
      addressData.state !== originalData.address.state ||
      addressData.pincode !== originalData.address.pincode
    )
  }, [formData, addressData, originalData])

  const handleSave = async () => {
    if (!onSave) return
    setErrorMessage(null)
    setStatusMessage(null)
    setIsSaving(true)
    try {
      await onSave({
        firstName: formData.firstName,
        lastName: formData.lastName,
        whatsapp: sanitizePhone(formData.whatsapp || user?.contact || ''),
        address: addressData,
      })
      
      // Update original data after successful save
      setOriginalData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        whatsapp: formData.whatsapp,
        address: { ...addressData },
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
              Personal Details
            </div>
          </div>
          <p className="text-center text-sm text-[#3D2D1F]/70 mb-6">{headerDescription}</p>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3D2D1F]">First Name</label>
                  <div className="relative">
                    <input
                      ref={firstNameInputRef}
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      disabled={isLoading}
                      placeholder="First Name"
                      className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => firstNameInputRef.current?.focus()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 text-[#6F5B4C] hover:opacity-70 transition-opacity cursor-pointer mt-1"
                      aria-label="Edit first name"
                    >
                      <IconEdit className="h-5 w-5" strokeWidth={2} />
                    </button>
                  </div>
                </div>
                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3D2D1F]">Last Name</label>
                  <div className="relative">
                    <input
                      ref={lastNameInputRef}
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      disabled={isLoading}
                      placeholder="Last Name"
                      className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => lastNameInputRef.current?.focus()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 text-[#6F5B4C] hover:opacity-70 transition-opacity cursor-pointer mt-1"
                      aria-label="Edit last name"
                    >
                      <IconEdit className="h-5 w-5" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
          </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#3D2D1F]">WhatsApp Number</label>
              <div className="relative w-fit">
                <input
                  ref={whatsappInputRef}
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  disabled={isLoading}
                  className="w-fit rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => whatsappInputRef.current?.focus()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 mt-1 w-5 text-[#6F5B4C] hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Edit WhatsApp number"
                >
                  <IconEdit className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Address Fields */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-[#3D2D1F]">Address</label>
              
              {/* Address Line 1 */}
              <div className="relative">
                <input
                  ref={address1InputRef}
                  type="text"
                  value={addressData.address1}
                  onChange={(e) => handleAddressChange('address1', e.target.value)}
                  disabled={isLoading}
                  placeholder="Address Line 1"
                  className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => address1InputRef.current?.focus()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 mt-1 w-5 text-[#6F5B4C] hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Edit address line 1"
                >
                  <IconEdit className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              {/* Address Line 2 */}
              <div className="relative">
                <input
                  ref={address2InputRef}
                  type="text"
                  value={addressData.address2}
                  onChange={(e) => handleAddressChange('address2', e.target.value)}
                  disabled={isLoading}
                  placeholder="Address Line 2 (Optional)"
                  className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => address2InputRef.current?.focus()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 mt-1 w-5 text-[#6F5B4C] hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Edit address line 2"
                >
                  <IconEdit className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              {/* City, State, Pincode Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* City */}
                <div className="relative w-fit">
                  <input
                    ref={cityInputRef}
                    type="text"
                    value={addressData.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    disabled={isLoading}
                    placeholder="City"
                    className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => cityInputRef.current?.focus()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 mt-1 w-5 text-[#6F5B4C] hover:opacity-70 transition-opacity cursor-pointer"
                    aria-label="Edit city"
                  >
                    <IconEdit className="h-5 w-5" strokeWidth={2} />
                  </button>
                </div>

                {/* State */}
                <div className="relative w-fit">
                  <input
                    ref={stateInputRef}
                    type="text"
                    value={addressData.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    disabled={isLoading}
                    placeholder="State"
                    className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => stateInputRef.current?.focus()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 mt-1 w-5 text-[#6F5B4C] hover:opacity-70 transition-opacity cursor-pointer"
                    aria-label="Edit state"
                  >
                    <IconEdit className="h-5 w-5" strokeWidth={2} />
                  </button>
                </div>

                {/* Pincode */}
                <div className="relative w-fit">
                  <input
                    ref={pincodeInputRef}
                    type="text"
                    value={addressData.pincode}
                    onChange={(e) => handleAddressChange('pincode', e.target.value.replace(/\D/g, ''))}
                    disabled={isLoading}
                    placeholder="Pincode"
                    maxLength={6}
                    className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => pincodeInputRef.current?.focus()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 mt-1 w-5 text-[#6F5B4C] hover:opacity-70 transition-opacity cursor-pointer"
                    aria-label="Edit pincode"
                  >
                    <IconEdit className="h-5 w-5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving || isLoading || !hasChanges}
              className="w-full py-3 rounded-full bg-[#1E3F2B] text-white text-sm font-bold hover:bg-[#1E3F2B]/90 transition-colors mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-lexend-exa), sans-serif' }}
            >
              {isSaving ? 'Updating...' : hasChanges ? 'UPDATE' : 'SAVE'}
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

