"use client"

import { getAuthToken } from "./authToken"

const DEFAULT_API_BASE_URL =
  process.env.NEXT_PUBLIC_FORMIAL_API_BASE_URL ??
  process.env.NEXT_PUBLIC_OTP_API_BASE_URL ??
  "https://formialbackend.onrender.com"

const normalizeBaseUrl = (base: string) => base.replace(/\/+$/, "")
const withLeadingSlash = (path: string) => (path.startsWith("/") ? path : `/${path}`)

const buildUrl = (path: string) =>
  `${normalizeBaseUrl(DEFAULT_API_BASE_URL)}${withLeadingSlash(path)}`

const defaultHeaders = () => {
  const headers = new Headers()
  const token = getAuthToken()

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  return headers
}

interface RequestOptions extends RequestInit {
  parseJson?: boolean
}

async function apiRequest<TResponse = unknown>(
  path: string,
  { parseJson = true, ...init }: RequestOptions = {}
): Promise<TResponse> {
  const url = buildUrl(path)
  const headers = defaultHeaders()

  if (init.headers) {
    const initHeaders = new Headers(init.headers)
    initHeaders.forEach((value, key) => headers.set(key, value))
  }

  const response = await fetch(url, {
    ...init,
    headers,
    cache: "no-store",
  })

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`
    try {
      const errorData = await response.json()
      errorMessage = errorData?.message || errorMessage
    } catch {
      const text = await response.text()
      if (text) {
        errorMessage = text
      }
    }
    throw new Error(errorMessage)
  }

  if (!parseJson) {
    return undefined as TResponse
  }

  return (await response.json()) as TResponse
}

export interface FormialUser {
  _id?: string
  name?: string
  first_name?: string
  last_name?: string
  purchases?: number
  email?: string
  subscribed?: boolean
  contact?: string
  image_uploaded?: boolean
  prescribed?: boolean
  referral_used?: boolean
  concerns?: string[]
  special_concern?: string | null
  skin_issues?: string[]
  gender?: string
  skin_routine?: string[]
  on_medication?: boolean
  allergic?: boolean
  allergy_details?: string | null
  pregnant?: boolean
  date_of_birth?: string | null
  skin_sensitivity?: string | null
  not_sure?: boolean
  duration?: string | null
  source?: string | null
  addresses?: unknown[]
  onboardingCompleted?: boolean // Explicit flag for onboarding completion
  onboardingCompletedAt?: string // Timestamp when onboarding was completed
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown
}

export interface FormialPrescription {
  _id: string
  createdAt: string
  updatedAt?: string
  clinician_name?: string
  clinician_remarks?: string
  front_image?: string | null
  left_image?: string | null
  right_image?: string | null
  prescription_completed?: boolean
  formulation_completed?: boolean
  fresh_consultation?: boolean
  azelaic_acid?: number
  niacinamide?: number
  tretinoin?: number
  [key: string]: unknown
}

export interface FormialConversation {
  _id: string
  remark: string
  clinical?: boolean
  behavioural?: boolean
  emotional?: boolean
  createdAt: string
  updatedAt?: string
}

export interface UserWithAllDataResponse {
  user: FormialUser
  prescriptions: FormialPrescription[]
  conversations: FormialConversation[]
}

const encodeContact = (contact: string) => encodeURIComponent(contact)

export const getUser = (contact: string) =>
  apiRequest<FormialUser>(`/get-user/${encodeContact(contact)}`)

export const getUserWithAllData = (contact: string) =>
  apiRequest<UserWithAllDataResponse>(`/get-user/${encodeContact(contact)}/with-all-data`)

export const updateUserByContact = (contact: string, payload: Partial<FormialUser>) =>
  apiRequest<FormialUser>(`/update-user/${encodeContact(contact)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

export interface CreatePrescriptionResponse {
  success: boolean
  prescription: FormialPrescription
}

/**
 * Upload photos and create a prescription record
 * @param contact User's contact number
 * @param files Object containing front_image, left_image, right_image File objects
 * @returns Created prescription response
 */
export const createPrescription = async (
  contact: string,
  files: {
    front_image: File
    left_image: File
    right_image: File
  }
): Promise<CreatePrescriptionResponse> => {
  const url = buildUrl(`/prescription?number=${encodeContact(contact)}`)
  const headers = defaultHeaders()
  
  // Don't set Content-Type - browser will set it with boundary for multipart/form-data
  headers.delete("Content-Type")

  const formData = new FormData()
  formData.append("front_image", files.front_image)
  formData.append("left_image", files.left_image)
  formData.append("right_image", files.right_image)

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
    cache: "no-store",
  })

  if (!response.ok) {
    let errorMessage = `Failed to upload photos: ${response.status}`
    try {
      const errorData = await response.json()
      errorMessage = errorData?.error || errorData?.message || errorMessage
    } catch {
      const text = await response.text()
      if (text) {
        errorMessage = text
      }
    }
    throw new Error(errorMessage)
  }

  return (await response.json()) as CreatePrescriptionResponse
}

