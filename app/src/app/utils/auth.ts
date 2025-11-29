"use client"

import { getAuthToken } from "./authToken"
import { getUser } from "./formialApi"

export interface AuthResult {
  isValid: boolean
  user?: {
    contact: string
    _id?: string
  } | null
  error?: string
}

/**
 * Verify if user exists and JWT token is valid
 */
export const verifyUserAuth = async (mobileNumber: string): Promise<AuthResult> => {
  try {
    const token = getAuthToken()
    
    if (!token) {
      return {
        isValid: false,
        error: "No authentication token found. Please verify your number.",
      }
    }

    // Normalize mobile number
    const normalizedMobile = mobileNumber.startsWith('+') 
      ? mobileNumber 
      : `+${mobileNumber.replace(/\D/g, '')}`

    // Try to fetch user data - this will verify JWT is valid
    try {
      const user = await getUser(normalizedMobile)
      
      if (!user || !user.contact) {
        return {
          isValid: false,
          error: "User not found. Please complete onboarding first.",
        }
      }

      // Verify mobile number matches
      if (user.contact !== normalizedMobile) {
        return {
          isValid: false,
          error: "Mobile number mismatch. Access denied.",
        }
      }

      return {
        isValid: true,
        user: {
          contact: user.contact,
          _id: user._id,
        },
      }
    } catch (error) {
      // If API call fails, token might be invalid or user doesn't exist
      return {
        isValid: false,
        error: error instanceof Error ? error.message : "Authentication failed. Please verify your number again.",
      }
    }
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Authentication verification failed.",
    }
  }
}

/**
 * Normalize mobile number from URL parameter
 * Handles formats like: 7387690252, +917387690252, 917387690252
 */
export const normalizeMobileFromUrl = (mobileParam: string): string => {
  // Remove any + signs, spaces, and non-digit characters
  const cleaned = mobileParam.replace(/[\s+]/g, '')
  if (!cleaned) return ''
  
  // If it already starts with +, return as is
  if (mobileParam.trim().startsWith('+')) {
    return mobileParam.trim()
  }
  
  // If it's a 10-digit number (Indian number without country code), add +91
  if (/^\d{10}$/.test(cleaned)) {
    return `+91${cleaned}`
  }
  
  // If it starts with 91 (11 digits total), add +
  if (/^91\d{10}$/.test(cleaned)) {
    return `+${cleaned}`
  }
  
  // Otherwise, just add + prefix
  return `+${cleaned}`
}

/**
 * Extract mobile number from contact string
 */
export const extractMobileNumber = (contact: string): string => {
  // Remove + sign for URL
  return contact.replace(/^\+/, '')
}

