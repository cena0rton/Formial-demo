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

const getDefaultHeaders = (): Record<string, string> => {
  const token = getAuthToken()
  const headers: Record<string, string> = {}

  if (token) {
    // Send just the token without "Bearer " prefix (backend expects raw JWT)
    headers['Authorization'] = token
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
  
  // Get default headers with auth token
  const defaultHeaders = getDefaultHeaders()
  
  // Merge with any custom headers from init, preserving Authorization
  const customHeaders = init.headers 
    ? (init.headers instanceof Headers 
        ? Object.fromEntries(init.headers.entries())
        : init.headers as Record<string, string>)
    : {}
  
  // Final headers: custom headers first, then default headers (so Authorization is preserved)
  const headers: Record<string, string> = {
    ...customHeaders,
    ...defaultHeaders, // This ensures Authorization from token is always included
  }

  const response = await fetch(url, {
    method: init.method || 'GET',
    headers: headers,
    body: init.body,
    cache: "no-store",
  })

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`
    try {
      // Read response as text first, then try to parse as JSON
      const text = await response.text()
      if (text) {
        try {
          const errorData = JSON.parse(text)
          errorMessage = errorData?.message || errorData?.error || errorMessage
        } catch {
          // If JSON parsing fails, use the text as error message
          errorMessage = text
        }
      }
    } catch {
      // If reading fails, use the default error message
    }
    
    // Special handling for 401 errors
    if (response.status === 401) {
      errorMessage = 'Authentication failed. Please log out and log in again.'
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

export interface BillingAddress {
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

export interface FormialOrder {
  _id: string
  user: string
  shopify_user_id?: string
  shopify_order_id?: string
  order_date?: string
  email?: string
  total_price?: string
  total_orders?: number
  contact?: string
  first_name?: string
  last_name?: string
  name?: string
  order_status_url?: string
  fillout_id?: string
  billing_address?: BillingAddress
  createdAt?: string
  updatedAt?: string
}

export interface GetOrdersResponse {
  success: boolean
  count: number
  orders: FormialOrder[]
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
  
  // Get headers with auth token - don't include Content-Type for multipart/form-data
  const headers = getDefaultHeaders()
  // Remove Content-Type if present - browser will set it with boundary for multipart/form-data
  delete headers['Content-Type']

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

export const getOrders = () =>
  apiRequest<GetOrdersResponse>('/getOrders')

// Subscription API interfaces and functions
export interface StartSubscriptionResponse {
  success: boolean
  message: string
  subscription_id: string
  payment_link: string
  start_date: string
  final_end_date: string
}

export interface GetSubscriptionResponse {
  success: boolean
  subscription?: {
    subscription_id?: string
    status?: string
    start_date?: string
    final_end_date?: string
    next_billing?: string | number
    plan_ends?: number
    valid_until?: string
    payment_link?: string
  }
}

export interface PauseSubscriptionResponse {
  success: boolean
  message: string
  status: string
  next_billing: string
}

export interface ResumeSubscriptionResponse {
  success: boolean
  message: string
  status: string
  next_billing: number
  plan_ends: number
}

export interface CancelSubscriptionResponse {
  success: boolean
  message: string
  status: string
  valid_until: string
}

export interface CancelSubscriptionRequest {
  cancel_at_cycle_end?: boolean
}

export const getSubscription = () =>
  apiRequest<GetSubscriptionResponse>('/get-subscription', {
    method: 'GET',
  })

export const startSubscription = () =>
  apiRequest<StartSubscriptionResponse>('/start-subscription', {
    method: 'POST',
    // No body required - JWT token in Authorization header identifies the user
  })

export const pauseSubscription = () =>
  apiRequest<PauseSubscriptionResponse>('/pause-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const resumeSubscription = () =>
  apiRequest<ResumeSubscriptionResponse>('/resume-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const cancelSubscription = (cancelAtCycleEnd: boolean = false) =>
  apiRequest<CancelSubscriptionResponse>('/cancel-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cancel_at_cycle_end: cancelAtCycleEnd }),
  })

