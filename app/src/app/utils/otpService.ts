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

const isTestMode = () => {
  if (typeof window === 'undefined') return false
  return !!(window as any).__FORMIAL_TEST_MODE__
}

export const sendWhatsAppOtp = async ({
  phoneNumber,
  name,
}: {
  phoneNumber: string
  name?: string
}) => {
  console.log('[sendWhatsAppOtp] 🚀 Starting OTP send request', {
    phoneNumberLength: phoneNumber.length,
    hasName: !!name,
    nameLength: name?.length || 0,
    isTestMode: isTestMode()
  })

  if (isTestMode()) {
    console.log('[sendWhatsAppOtp] 🧪 TEST MODE - Simulating OTP send')
    await new Promise(resolve => setTimeout(resolve, 800))
    console.log('[sendWhatsAppOtp] ✅ TEST MODE - OTP sent successfully')
    return {
      success: true,
      message: 'OTP sent successfully (TEST MODE)'
    }
  }

  const baseUrl = ensureBaseUrl()
  const sanitizedPhone = sanitizePhoneNumber(phoneNumber)

  console.log('[sendWhatsAppOtp] 📱 Phone number processing', {
    originalLength: phoneNumber.length,
    sanitizedLength: sanitizedPhone.length,
    sanitizedPhone: sanitizedPhone.substring(0, 3) + '***' + sanitizedPhone.substring(sanitizedPhone.length - 2) // Mask for privacy
  })

  if (!sanitizedPhone) {
    console.error('[sendWhatsAppOtp] ❌ Invalid phone number - empty after sanitization')
    throw new Error("Please provide a valid phone number with country code.")
  }

  if (sanitizedPhone.length < 10) {
    console.error('[sendWhatsAppOtp] ❌ Invalid phone number - too short', {
      length: sanitizedPhone.length,
      minRequired: 10
    })
    throw new Error("Please provide a valid phone number with country code.")
  }

  const params = new URLSearchParams({
    phonenumber: sanitizedPhone,
  })

  if (name?.trim()) {
    params.append("name", name.trim())
    console.log('[sendWhatsAppOtp] ✅ Name included in request')
  }

  const requestUrl = `${baseUrl}/sendWAOTPUser?${params.toString()}`
  console.log('[sendWhatsAppOtp] 📡 Making API request', {
    baseUrl,
    endpoint: '/sendWAOTPUser',
    method: 'GET',
    hasName: !!name?.trim(),
    phoneLength: sanitizedPhone.length
  })

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      cache: "no-store",
    })

    console.log('[sendWhatsAppOtp] 📥 Received response', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    })

    if (!response.ok) {
      let errorMessage = ''
      try {
        const errorText = await response.text()
        errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`
        console.error('[sendWhatsAppOtp] ❌ API Error Response', {
          status: response.status,
          statusText: response.statusText,
          errorMessage,
          requestUrl: requestUrl.replace(sanitizedPhone, '***') // Mask phone in logs
        })
      } catch (parseError) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
        console.error('[sendWhatsAppOtp] ❌ Failed to read error response', parseError)
      }
      throw new Error(errorMessage || "Failed to send OTP. Please try again.")
    }

    // Try to parse JSON response
    let responseData
    const contentType = response.headers.get('content-type') || ''
    
    try {
      if (contentType.includes('application/json')) {
        responseData = await response.json()
        console.log('[sendWhatsAppOtp] ✅ Successfully parsed JSON response', {
          hasMessage: !!responseData.message,
          hasSuccess: !!responseData.success,
          responseKeys: Object.keys(responseData)
        })
      } else {
        const textResponse = await response.text()
        console.log('[sendWhatsAppOtp] 📄 Received text response', {
          contentType,
          textLength: textResponse.length,
          preview: textResponse.substring(0, 100)
        })
        try {
          responseData = JSON.parse(textResponse)
        } catch {
          responseData = { message: textResponse || 'OTP sent successfully' }
        }
      }
    } catch (parseError) {
      console.error('[sendWhatsAppOtp] ⚠️ Failed to parse response', parseError)
      // Return a success response even if parsing fails, as the status was OK
      responseData = { message: 'OTP sent successfully' }
    }

    console.log('[sendWhatsAppOtp] ✅ OTP sent successfully', {
      response: responseData
    })

    return responseData
  } catch (error) {
    console.error('[sendWhatsAppOtp] ❌ Request failed', {
      error: error instanceof Error ? error.message : String(error),
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      stack: error instanceof Error ? error.stack : undefined
    })
    throw error
  }
}

export const verifyWhatsAppOtp = async ({
  phoneNumber,
  code,
}: {
  phoneNumber: string
  code: string
}) => {
  if (isTestMode()) {
    // Accept any 4-digit code for testing
    const trimmedCode = code.trim()
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (trimmedCode.length === 4 && /^\d{4}$/.test(trimmedCode)) {
      return {
        message: 'User is Verified!!',
        profile: true,
        token: 'mock-jwt-token-for-testing-' + Date.now()
      }
    }
    throw new Error('Invalid OTP (TEST MODE: Use any 4 digits)')
  }

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

  // CRITICAL: Read response body once and store it
  // We need to read it before checking status because response body can only be read once
  type ResponseBody = {
    message?: string
    profile?: boolean
    token?: string
  } | null
  
  let responseBody: ResponseBody = null
  const contentType = response.headers.get('content-type') || ''
  
  try {
    if (contentType.includes('application/json')) {
      responseBody = await response.json() as ResponseBody
    } else {
      const textBody = await response.text()
      try {
        responseBody = JSON.parse(textBody) as ResponseBody
      } catch {
        responseBody = { message: textBody || 'Unknown error' } as ResponseBody
      }
    }
  } catch (parseError) {
    console.error('[verifyWhatsAppOtp] Failed to parse response:', parseError)
    throw new Error("Invalid response from server. Please try again.")
  }

  // CRITICAL: Handle error responses (400 status) - According to API docs, 400 means wrong OTP
  // Check status code FIRST before processing response
  if (response.status === 400) {
    const errorMessage = responseBody?.message || "Wrong phone number or code :("
    console.error('[verifyWhatsAppOtp] ❌ OTP verification FAILED - Status 400:', {
      errorMessage,
      responseBody,
      phoneNumber: sanitizedPhone,
      codeLength: trimmedCode.length
    })
    throw new Error(errorMessage)
  }

  // CRITICAL: Only accept 200 OK status for successful verification
  // If backend returns any other status, reject it
  if (response.status !== 200) {
    const errorMessage = responseBody?.message || `Unexpected response status: ${response.status}`
    console.error('[verifyWhatsAppOtp] ❌ Unexpected status code:', {
      status: response.status,
      statusText: response.statusText,
      responseBody,
      phoneNumber: sanitizedPhone
    })
    throw new Error(errorMessage)
  }

  // At this point, we have a 200 OK response
  console.log('[verifyWhatsAppOtp] ✅ Received 200 OK response')

  // Use the already-parsed response body
  const payload = responseBody

  // Validate response structure
  if (typeof payload !== 'object' || payload === null) {
    throw new Error("Invalid response format from server")
  }

  // CRITICAL: Validate that the response indicates successful verification
  // According to API docs, successful response should have message "User is Verified!!"
  const message = payload.message?.toLowerCase() || ''
  // Log response for debugging
  console.log('[verifyWhatsAppOtp] Response:', { 
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


