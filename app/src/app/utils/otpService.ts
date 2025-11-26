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

  if (!sanitizedPhone || !code) {
    throw new Error("Phone number and OTP code are required.")
  }

  const params = new URLSearchParams({
    phonenumber: sanitizedPhone,
    code: code.trim(),
  })

  const response = await fetch(`${baseUrl}/VerifyWAOTPUser?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  })

  const payload = await response.json().catch(async () => {
    const fallback = await response.text()
    return { message: fallback }
  })

  if (!response.ok) {
    throw new Error(payload?.message || "OTP verification failed. Please try again.")
  }

  return payload as {
    message: string
    profile: boolean
    token?: string
  }
}

export const formatPhoneForDisplay = (value: string) =>
  sanitizePhoneNumber(value)


