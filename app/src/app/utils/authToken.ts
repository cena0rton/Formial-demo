"use client"

const TOKEN_STORAGE_KEY = "formial_dashboard_token"

export const setAuthToken = (token: string) => {
  if (typeof window === "undefined" || !token) return
  sessionStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export const getAuthToken = () => {
  if (typeof window === "undefined") return null
  return sessionStorage.getItem(TOKEN_STORAGE_KEY)
}

export const clearAuthToken = () => {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(TOKEN_STORAGE_KEY)
}


