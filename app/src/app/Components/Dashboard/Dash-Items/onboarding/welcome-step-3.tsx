"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { IconUser, IconCamera, IconRocket, IconEdit } from "@tabler/icons-react"
import { getUser, updateUserByContact, FormialUser } from "../../../../utils/formialApi"
import { getUserContact } from "../../../../utils/userContact"

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

// formatAddress function - kept for potential future use
// const formatAddress = (address: AddressObject): string => {
//   const parts: string[] = []
//   
//   if (address.address1) parts.push(address.address1)
//   if (address.address2 && address.address2.trim()) parts.push(address.address2)
//   if (address.city) parts.push(address.city)
//   
//   const stateZip = [address.province, address.zip].filter(Boolean).join(' ')
//   if (stateZip) parts.push(stateZip)
//   
//   if (address.country) parts.push(address.country)
//   
//   return parts.join(', ')
// }

interface AddressFormData {
  address1: string
  address2: string
  city: string
  state: string
  pincode: string
}

const extractAddressData = (user: FormialUser | null | undefined): AddressFormData => {
  const defaultAddress: AddressFormData = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
  }

  if (!user?.addresses || !Array.isArray(user.addresses) || user.addresses.length === 0) {
    return defaultAddress
  }
  
  const firstAddress = user.addresses[0]
  if (typeof firstAddress === 'string') {
    return { ...defaultAddress, address1: firstAddress }
  }
  
  if (firstAddress && typeof firstAddress === 'object') {
    const addrObj = firstAddress as AddressObject
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

interface WelcomeStep3Props {
  userDetails: {
    name: string
    phone: string
    address: string
  }
  onNext: () => void
  onBack?: () => void
  mobileNumber?: string | null
}

const timeline = [
  {
    title: "Verify your details",
    subtitle: "Verify your WhatsApp number",
    icon: <IconUser size={20} stroke={1.8} />,
  },
  {
    title: "Upload your pictures",
    subtitle: "Ensure quality for higher accuracy",
    icon: <IconCamera size={20} stroke={1.8} className="text-[#937272]" />,
  },
  {
    title: "Welcome to Formial",
    subtitle: "Here's your personalised dashboard",
    icon: <IconRocket size={20} stroke={1.8} className="text-[#937272]" />,
  },
]

export default function WelcomeStep3({ userDetails: _userDetails, onNext, onBack, mobileNumber }: WelcomeStep3Props) {
  const [addressData, setAddressData] = useState<AddressFormData>({
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [originalAddress, setOriginalAddress] = useState<AddressFormData>({
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateMessage, setUpdateMessage] = useState<string | null>(null)

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const contact = mobileNumber || getUserContact()
      if (!contact) return
      
      try {
        const user = await getUser(contact)
        if (user) {
          const address = extractAddressData(user)
          setAddressData(address)
          setOriginalAddress(address)
        }
      } catch {
        // User doesn't exist or failed to fetch - use provided userDetails
      }
    }
    
    fetchUserData()
  }, [mobileNumber])

  const handleAddressChange = (field: keyof AddressFormData, value: string) => {
    setAddressData((prev) => ({ ...prev, [field]: value }))
  }

  const hasAddressChanged = () => {
    return (
      addressData.address1 !== originalAddress.address1 ||
      addressData.address2 !== originalAddress.address2 ||
      addressData.city !== originalAddress.city ||
      addressData.state !== originalAddress.state ||
      addressData.pincode !== originalAddress.pincode
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col w-full max-w-6xl mx-auto text-[#3D2D1F]"
      style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
    >
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center px-0 sm:px-6 md:px-10 py-0 md:py-30">
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
        className="w-full lg:max-w-sm h-full"
      >
        <div className="relative lg:bg-[#7CB58D] bg-transparent text-[#1E3F2B] rounded-[32px] px-6 py-2 lg:px-8 lg:py-10 lg:border border-[#325A3C] lg:shadow-[0_10px_30px_rgba(50,90,60,0.25)]">
          <div className="absolute left-12 top-16 bottom-16 w-[2px] bg-[#1E3F2B]/50 hidden md:block" />
          <div className="flex lg:flex-col flex-row lg:gap-8 gap-2 justify-center items-center lg:justify-start lg:items-start">
            {timeline.map((step, idx) => (
              <div key={step.title} className="relative flex lg:items-start gap-4">
                <div
                  className={`
                    hidden lg:flex relative z-10 mt-1 h-10 w-10 items-center justify-center rounded-2xl text-[#1E3F2B] shadow-md border border-black/60
                    ${idx === 0 ? "bg-white" : "bg-gray-300"}
                  `}
                >
                  {step.icon}
                </div>
                <div>
                  <p className="hidden lg:block font-medium text-lg tracking-tight">
                    {step.title}
                  </p>
                  <p className="hidden lg:block text-sm text-[#1E3F2B]/80">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className="relative flex-1 rounded-[32px] px-8 md:px-12"
      >
        <div className="space-y-4">
          <h2
            className="text-xl md:text-2xl text-[#5B4331] tracking-tight font-medium leading-tight"
            style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
          >
            Please review your details before proceeding.
          </h2>
          <p className="text-sm md:text-base text-[#6F5B4C] max-w-xl">
            Providing accurate information ensures smooth communication and better service.
          </p>
          <div className="w-full h-px bg-[#5B4331]/30 mt-4" />
        </div>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <span className="text-sm font-semibold text-[#6F5B4C] tracking-tight">Address</span>
            
            {/* Address Line 1 */}
            <div className="relative">
              <input
                type="text"
                value={addressData.address1}
                onChange={(e) => handleAddressChange('address1', e.target.value)}
                className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
                placeholder="Address Line 1"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 p-1 hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Edit address"
              >
                <IconEdit size={18} className="text-[#6F5B4C]" strokeWidth={2} />
              </button>
            </div>

            {/* Address Line 2 */}
            <div className="relative">
              <input
                type="text"
                value={addressData.address2}
                onChange={(e) => handleAddressChange('address2', e.target.value)}
                className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
                placeholder="Address Line 2 (Optional)"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 p-1 hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Edit address"
              >
                <IconEdit size={18} className="text-[#6F5B4C]" strokeWidth={2} />
              </button>
            </div>

            {/* City, State, Pincode Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City */}
              <div className="relative">
                <input
                  type="text"
                  value={addressData.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
                  placeholder="City"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 p-1 hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Edit city"
                >
                  <IconEdit size={18} className="text-[#6F5B4C]" strokeWidth={2} />
                </button>
              </div>

              {/* State */}
              <div className="relative">
                <input
                  type="text"
                  value={addressData.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
                  placeholder="State"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 p-1 hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Edit state"
                >
                  <IconEdit size={18} className="text-[#6F5B4C]" strokeWidth={2} />
                </button>
              </div>

              {/* Pincode */}
              <div className="relative">
                <input
                  type="text"
                  value={addressData.pincode}
                  onChange={(e) => handleAddressChange('pincode', e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white px-5 py-3 pr-10 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
                  placeholder="Pincode"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 p-1 hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Edit pincode"
                >
                  <IconEdit size={18} className="text-[#6F5B4C]" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-[#5B4331]/30 px-6 py-3 text-sm font-semibold text-[#5B4331] hover:bg-[#5B4331]/5 transition-colors"
            >
              Go back
            </button>
          )}
          <button
            type="button"
            onClick={async () => {
              const contact = mobileNumber || getUserContact()
              if (!contact) {
                onNext()
                return
              }

              // Check if address has changed and needs to be updated
              const changed = hasAddressChanged()
              
              // If there are changes, send PATCH request to update address
              if (changed) {
                setIsUpdating(true)
                setUpdateMessage(null)
                try {
                  const addressUpdate: AddressObject = {
                    address1: addressData.address1.trim() || '',
                    address2: addressData.address2.trim() || '',
                    city: addressData.city.trim() || '',
                    province: addressData.state.trim() || '',
                    zip: addressData.pincode.trim() || '',
                    country: 'India',
                  }
                  
                  // Send PATCH request to update address in database
                  await updateUserByContact(contact, {
                    addresses: [addressUpdate]
                  })
                  
                  setUpdateMessage("Address updated successfully")
                  // Update original address after successful save
                  setOriginalAddress({ ...addressData })
                  
                  // Small delay to show success message, then proceed
                  setTimeout(() => {
                    onNext()
                  }, 500)
                } catch (error) {
                  console.error("Failed to update address:", error)
                  setUpdateMessage("Failed to update address. Continuing...")
                  // Continue anyway - don't block user progress
                  setTimeout(() => {
                    onNext()
                  }, 1000)
                } finally {
                  setIsUpdating(false)
                }
              } else {
                // No changes - move forward normally without API call
                onNext()
              }
            }}
            disabled={!addressData.address1.trim() || isUpdating}
            className="box-border px-6 py-3 bg-[#1E3F2B] border-[0.767442px] border-[#1F3F2A] shadow-[0px_3.06977px_3.06977px_rgba(0,0,0,0.25)] rounded-full font-medium text-white flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-sm uppercase ml-auto"
          >
            {isUpdating ? "Updating..." : hasAddressChanged() ? "Update & Next" : "Next"}
          </button>
        </div>
        
        {updateMessage && (
          <div className="mt-3 min-h-[1.5rem]" aria-live="polite">
            <p className={`text-xs ${updateMessage.includes("successfully") ? "text-green-700" : "text-yellow-600"}`}>
              {updateMessage}
            </p>
          </div>
        )}
      </motion.div>
      </div>
    </motion.div>
  )
}
