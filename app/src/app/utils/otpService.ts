"use client"

const DEFAULT_API_BASE_URL = "https://formialbackend.onrender.com"

const OTP_API_BASE_URL =
  process.env.NEXT_PUBLIC_OTP_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  DEFAULT_API_BASE_URL

const ensureBaseUrl = () => {
  if (!OTP_API_BASE_URL) {
    throw new Error(
      "OTP API base URL is not configured. Please set NEXT_PUBLIC_OTP_API_BASE_URL."
    )
  }
  return OTP_API_BASE_URL.replace(/\/+$/, "")
}

const sanitizePhoneNumber = (value: string) => value.replace(/\D/g, "")

export const sendWhatsAppOtp = async ({
  phoneNumber,
  name,
}: {
  phoneNumber: string
  name?: string
}) => {
  const baseUrl = ensureBaseUrl()
  const sanitizedPhone = sanitizePhoneNumber(phoneNumber)

  if (!sanitizedPhone) {
    throw new Error("Please provide a valid phone number with country code.")
  }

  const params = new URLSearchParams({
    phonenumber: sanitizedPhone,
  })

  if (name?.trim()) {
    params.append("name", name.trim())
  }

  const response = await fetch(`${baseUrl}/sendWAOTPUser?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  })

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage || "Failed to send OTP. Please try again.")
  }

  try {
    return await response.json()
  } catch {
    return await response.text()
  }
}

export const verifyWhatsAppOtp = async ({
  phoneNumber,
  code,
}: {
  phoneNumber: string
  code: string
}) => {
  const baseUrl = ensureBaseUrl()
  const sanitizedPhone = sanitizePhoneNumber(phoneNumber)
  const trimmedCode = code.trim()

  // Validate inputs before making API call
  if (!sanitizedPhone || sanitizedPhone.length < 10) {
    throw new Error("Please input a valid phone number")
  }

  if (!trimmedCode || trimmedCode.length !== 4) {
    throw new Error("Please input a valid 4-digit OTP code")
  }

  // Ensure code is exactly 4 digits
  if (!/^\d{4}$/.test(trimmedCode)) {
    throw new Error("OTP code must be exactly 4 digits")
  }

  const params = new URLSearchParams({
    phonenumber: sanitizedPhone,
    code: trimmedCode,
  })

  console.log('[verifyWhatsAppOtp] Verifying OTP:', { 
    phoneNumber: sanitizedPhone, 
    codeLength: trimmedCode.length,
    code: trimmedCode.replace(/\d/g, '*') // Mask code in logs for security
  })
  
  const response = await fetch(`${baseUrl}/VerifyWAOTPUser?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  })

  console.log('[verifyWhatsAppOtp] Response status:', response.status, response.statusText)

  // Handle error responses (400 status) - According to API docs, 400 means wrong OTP
  if (!response.ok) {
    let errorMessage = "Wrong phone number or code :("
    
    try {
      const errorPayload = await response.json()
      if (errorPayload?.message) {
        errorMessage = errorPayload.message
      }
    } catch {
      // If JSON parsing fails, try text
      try {
        const errorText = await response.text()
        if (errorText && errorText.trim()) {
          // Try to parse as JSON if it looks like JSON
          try {
            const parsed = JSON.parse(errorText)
            if (parsed?.message) {
              errorMessage = parsed.message
            }
          } catch {
            errorMessage = errorText
          }
        }
      } catch {
        // Use default error message
      }
    }
    
    console.error('[verifyWhatsAppOtp] OTP verification failed:', errorMessage)
    throw new Error(errorMessage)
  }

  // Parse successful response
  const payload = await response.json().catch(async () => {
    const fallback = await response.text()
    throw new Error(fallback || "Invalid response from server")
  })

  // Validate response structure
  if (typeof payload !== 'object' || payload === null) {
    throw new Error("Invalid response format from server")
  }

  // CRITICAL: Validate that the response indicates successful verification
  // According to API docs, successful response should have message "User is Verified!!"
  const message = payload.message?.toLowerCase() || ''
  console.log('[verifyWhatsAppOtp] Response payload:', { 
    message: payload.message, 
    profile: payload.profile, 
    hasToken: !!payload.token 
  })
  
  // Strict validation: Message must contain "verified" (case-insensitive)
  // According to API docs, all successful responses have "User is Verified!!"
  if (!message || !message.includes('verified')) {
    // If message doesn't indicate verification, treat as error
    console.error('[verifyWhatsAppOtp] Invalid verification response - message does not indicate verification:', payload)
    throw new Error(payload.message || "OTP verification failed. Please check your code and try again.")
  }

  // Additional validation: Ensure we have a valid response structure
  if (typeof payload.profile !== 'boolean') {
    console.error('[verifyWhatsAppOtp] Invalid response structure - profile is not boolean:', payload)
    throw new Error("Invalid response from server. Please try again.")
  }

  console.log('[verifyWhatsAppOtp] OTP verified successfully')
  return payload as {
    message: string
    profile: boolean
    token?: string
  }
}

export const formatPhoneForDisplay = (value: string) =>
  sanitizePhoneNumber(value)


