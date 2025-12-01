"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getUserContact } from "../../../utils/userContact"
import { extractMobileNumber } from "../../../utils/auth"
import { getUser, createPrescription, FormialUser } from "../../../utils/formialApi"

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

const formatAddress = (address: AddressObject): string => {
  const parts: string[] = []
  
  if (address.address1) parts.push(address.address1)
  if (address.address2 && address.address2.trim()) parts.push(address.address2)
  if (address.city) parts.push(address.city)
  
  const stateZip = [address.province, address.zip].filter(Boolean).join(' ')
  if (stateZip) parts.push(stateZip)
  
  if (address.country) parts.push(address.country)
  
  return parts.join(', ')
}

const extractAddress = (user: FormialUser | null | undefined): string => {
  if (!user?.addresses || !Array.isArray(user.addresses) || user.addresses.length === 0) {
    return ''
  }
  
  const firstAddress = user.addresses[0]
  if (typeof firstAddress === 'string') {
    return firstAddress
  }
  
  if (firstAddress && typeof firstAddress === 'object') {
    const addrObj = firstAddress as AddressObject
    return formatAddress(addrObj)
  }
  
  return ''
}

import { motion, AnimatePresence } from "framer-motion"

import WelcomeStep1 from "./onboarding/welcome-step-1"
import WelcomeStep2 from "./onboarding/welcome-step-2"
import WelcomeStep3 from "./onboarding/welcome-step-3"
import UploadStep from "./onboarding/upload-step"
import FormulationStep from "./onboarding/formulation-step"
import Image from "next/image"

interface OnboardingModalProps {
  onComplete?: () => void
  mobileNumber?: string | null
  initialUserName?: string | null
}

export default function OnboardingModal({ onComplete, mobileNumber, initialUserName }: OnboardingModalProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [userDetails, setUserDetails] = useState({
    name: initialUserName || "",
    phone: mobileNumber || "",
    address: "",
  })
  
  const userFirstName = userDetails.name.split(" ")[0] || userDetails.name || "there"

  // Fetch user data when mobile number is available
  useEffect(() => {
    const fetchUserData = async () => {
      if (!mobileNumber) {
        // Try to get from stored contact
        const storedContact = getUserContact()
        if (storedContact) {
          try {
            const user = await getUser(storedContact)
            if (user) {
              setUserDetails({
                name: user.name || user.first_name || "",
                phone: user.contact || storedContact,
                address: extractAddress(user),
              })
            }
          } catch {
            console.error("Failed to fetch user data")
          }
        }
        return
      }

      // Fetch user data using mobile number
      try {
        const user = await getUser(mobileNumber)
        if (user) {
          setUserDetails({
            name: user.name || user.first_name || "",
            phone: user.contact || mobileNumber,
            address: extractAddress(user),
          })
        }
      } catch {
        // User doesn't exist yet - that's okay, they'll create it during onboarding
        // Name will be entered by user during onboarding
      }
    }

    fetchUserData()
  }, [mobileNumber])

  const handleRefreshDetails = useCallback(async () => {
    const contact = getUserContact() || mobileNumber
    if (!contact) return
    
    try {
      const user = await getUser(contact)
      if (user) {
        setUserDetails({
          name: user.name || user.first_name || "",
          phone: user.contact || contact,
          address: extractAddress(user),
        })
      }
    } catch {
      console.error("Failed to refresh user details")
    }
  }, [mobileNumber])

  const handleNext = async () => {
    // If user just completed UploadStep (step 3), upload photos to backend
    if (currentStep === 3 && uploadedPhotos.length === 3) {
      const contact = getUserContact() || mobileNumber
      if (!contact) {
        setUploadError("Contact number not found. Please verify your number.")
        return
      }

      // Check if all 3 photos are valid File objects
      const [frontImage, leftImage, rightImage] = uploadedPhotos
      if (!frontImage || !leftImage || !rightImage) {
        setUploadError("Please upload all 3 photos before continuing.")
        return
      }

      setIsUploadingPhotos(true)
      setUploadError(null)

      try {
        await createPrescription(contact, {
          front_image: frontImage,
          left_image: leftImage,
          right_image: rightImage,
        })
        
        // Upload successful, proceed to next step
        setCurrentStep(4)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to upload photos. Please try again."
        setUploadError(errorMessage)
        console.error("Photo upload error:", error)
        // Don't proceed if upload fails
        return
      } finally {
        setIsUploadingPhotos(false)
      }
    } else {
      // For other steps, just proceed normally
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleComplete = async () => {
    // Photos are already uploaded to backend in handleNext when user completes UploadStep
    // No need to save to localStorage anymore
    
    // Get user contact and redirect to their mobile number URL
    const contact = getUserContact() || mobileNumber
    if (contact) {
      const mobileForUrl = extractMobileNumber(contact)
      // Notify parent first (if in user page context)
      if (onComplete) {
        onComplete()
      } else {
        // If standalone, redirect directly
        router.push(`/${mobileForUrl}`)
      }
    } else {
      // No contact found, just notify parent
      if (onComplete) {
        onComplete()
      }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col overflow-x-hidden"
        style={{ backgroundColor: "#F2F0E0" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 md:py-6 py-6 border-b border-gray-200 bg-[#1E3F2B]">
          <div className="flex items-center gap-3">
           <Image src="https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240" alt="Formial" width={120} height={40} className="md:h-8 h-6 w-auto " />
          </div>
          {/* <button onClick={handleClose} className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <IconX className="h-5 w-5 text-[#1E3F2B]" />
          </button> */}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-7xl mx-auto w-full pb-12">
          {/* Mobile Progress Bar */}
          {currentStep > 0 && (
            <div className="lg:hidden w-full px-6 pt-6  md:-pb-0 flex items-center justify-center">
              <div className="w-full bg-[#7CB58D] rounded-full px-8 py-4 flex items-center justify-between gap-6 border border-black/50 tracking-tighter font-lexend-exa"
              
              >
                <span className={`text-xs font-medium ${currentStep >= 1 && currentStep <= 2 ? 'text-[#1E3F2B] font-bold' : 'text-[#5B4331]/70'}`}>
                  Verification
                </span>
                <span className={`text-xs font-medium ${currentStep === 3 ? 'text-[#1E3F2B] font-bold' : 'text-[#5B4331]/70'}`}>
                 Upload Photos
                </span>
                <span className={`text-xs font-medium ${currentStep === 4 ? 'text-[#1E3F2B] font-bold' : 'text-[#5B4331]/70'}`}>
                  Consult
                </span>
              </div>
            </div>
          )}
          <div className="px-0 items-center justify-center -mt-6 md:-mt-0">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <WelcomeStep1 key="welcome1" userName={userFirstName} onNext={handleNext} />
              )}
              {currentStep === 1 && (
                <WelcomeStep2
                  key="welcome2"
                  userDetails={userDetails}
                  onNext={handleNext}
                  onBack={handleBack}
                  onRefresh={handleRefreshDetails}
                  mobileNumber={mobileNumber}
                />
              )}
              {currentStep === 2 && (
                <WelcomeStep3
                  key="welcome3"
                  userDetails={userDetails}
                  onBack={handleBack}
                  onNext={handleNext}
                  mobileNumber={mobileNumber}
                />
              )}
              {currentStep === 3 && (
                <div className="px-4 sm:px-6 md:px-10">
                  <UploadStep
                    key="upload"
                    uploadedPhotos={uploadedPhotos}
                    setUploadedPhotos={setUploadedPhotos}
                    onNext={handleNext}
                    onBack={handleBack}
                    onSkip={handleSkip}
                    isUploading={isUploadingPhotos}
                    uploadError={uploadError}
                  />
                </div>
              )}
              {currentStep === 4 && (
                <div className="px-4 sm:px-6 md:px-10">
                  <FormulationStep key="formulation" onBack={handleBack} onComplete={handleComplete} />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer with Progress */}
        {currentStep >= 3 && (
          <div className="flex items-center justify-center gap-3 py-4">
            {[0, 1].map((step) => {
              // Map main step indices (upload, formulation) to progress dots
              const stepProgress = currentStep - 3
              return (
                <motion.div
                  key={step}
                  className="h-2 rounded-full transition-all"
                  animate={{
                    width: stepProgress >= step ? 32 : 8,
                    backgroundColor: stepProgress >= step ? "#1E3F2B" : "#D1D5DB",
                  }}
                />
              )
            })}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
