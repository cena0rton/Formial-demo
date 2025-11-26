"use client"

const CONTACT_STORAGE_KEY = "formial_dashboard_contact"

export const setUserContact = (contact: string) => {
  if (typeof window === "undefined") return
  sessionStorage.setItem(CONTACT_STORAGE_KEY, contact)
}

export const getUserContact = () => {
  if (typeof window === "undefined") return null
  return sessionStorage.getItem(CONTACT_STORAGE_KEY)
}

export const clearUserContact = () => {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(CONTACT_STORAGE_KEY)
}


