"use client"

const CONTACT_STORAGE_KEY = "formial_dashboard_contact"

export const setUserContact = (contact: string) => {
  if (typeof window === "undefined") return
  // Use localStorage for persistent sessions across browser sessions
  localStorage.setItem(CONTACT_STORAGE_KEY, contact)
}

export const getUserContact = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem(CONTACT_STORAGE_KEY)
}

export const clearUserContact = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem(CONTACT_STORAGE_KEY)
}


