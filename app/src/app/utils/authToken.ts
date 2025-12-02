"use client"

const TOKEN_STORAGE_KEY = "formial_dashboard_token"

export const setAuthToken = (token: string) => {
  if (typeof window === "undefined") {
    console.warn('[setAuthToken] Window is undefined, cannot save token')
    return
  }
  
  if (!token || !token.trim()) {
    console.warn('[setAuthToken] Token is empty or invalid:', token)
    return
  }
  
  // Use localStorage for persistent sessions across browser sessions
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token.trim())
    console.log('[setAuthToken] Token saved successfully to localStorage')
  } catch (error) {
    console.error('[setAuthToken] Failed to save token to localStorage:', error)
  }
}

export const getAuthToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export const clearAuthToken = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}


