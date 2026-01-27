"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { getUser, FormialUser } from "../utils/formialApi"
import { getUserContact } from "../utils/userContact"

/**
 * Sagepilot Widget Configuration
 */
const SAGEPILOT_CONFIG = {
  scriptUrl: "https://app.sagepilot.ai/chat-widget.js",
  scriptId: "sagepilot-widget-script",
  host: "https://app.sagepilot.ai",
  key: "54dd14e1-fed6-4990-8a1b-a181967f50b2:46d8b50c-9414-4e6b-a3a8-feaa061dc9cb",
} as const

/**
 * Extended user interface that includes sagepilot_user_hash from API
 */
interface UserWithSagepilotHash extends FormialUser {
  sagepilot_user_hash?: string
}

/**
 * Sagepilot Widget API types
 */
declare global {
  interface Window {
    ChatWidget?: {
      init: (config: { host: string; key: string }) => void
      identify: (params: {
        user_id: string
        user_hash: string
        email?: string
        name?: string
        phone?: string
      }) => void
      logout: () => void
    }
  }
}

/**
 * Hook return type
 */
interface UseSagepilotWidgetReturn {
  /** Whether user data is loading */
  isLoading: boolean
  /** Whether iframe is ready */
  isReady: boolean
  /** Error message if any */
  error: string | null
  /** Iframe URL */
  iframeUrl: string | null
  /** User data for identification */
  userData: UserWithSagepilotHash | null
}

/**
 * Custom hook to manage Sagepilot Chat Widget with identity verification
 * 
 * Features:
 * - Fetches user data from backend
 * - Loads Sagepilot JavaScript widget script for identity verification
 * - Builds iframe URL for embedded chat
 * - Identifies user using backend-provided hash via JavaScript API
 * - Handles loading and error states
 * 
 * @param contact - Optional contact number. If not provided, uses stored contact from localStorage
 * @returns Hook state with iframe URL and user data
 */
export const useSagepilotWidget = (contact?: string | null): UseSagepilotWidgetReturn => {
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserWithSagepilotHash | null>(null)

  // Refs to track state and prevent duplicate calls
  const scriptLoadedRef = useRef(false)
  const widgetInitializedRef = useRef(false)
  const identifyCalledRef = useRef(false)
  const fetchCalledRef = useRef(false)

  /**
   * Load Sagepilot widget script dynamically
   */
  const loadScript = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      const existingScript = document.getElementById(SAGEPILOT_CONFIG.scriptId)
      if (existingScript) {
        // Script already loaded
        if (window.ChatWidget) {
          resolve()
          return
        }
        // Script exists but widget not ready - wait for it
        const checkInterval = setInterval(() => {
          if (window.ChatWidget) {
            clearInterval(checkInterval)
            resolve()
          }
        }, 100)
        // Timeout after 5 seconds
        setTimeout(() => {
          clearInterval(checkInterval)
          if (!window.ChatWidget) {
            reject(new Error("Sagepilot widget failed to load"))
          }
        }, 5000)
        return
      }

      // Create and load script
      const script = document.createElement("script")
      script.id = SAGEPILOT_CONFIG.scriptId
      script.src = SAGEPILOT_CONFIG.scriptUrl
      script.async = true

      script.onload = () => {
        // Wait for ChatWidget to be available
        const checkWidget = setInterval(() => {
          if (window.ChatWidget) {
            clearInterval(checkWidget)
            scriptLoadedRef.current = true
            resolve()
          }
        }, 100)

        // Timeout after 5 seconds
        setTimeout(() => {
          clearInterval(checkWidget)
          if (!window.ChatWidget) {
            reject(new Error("Sagepilot widget API not available after script load"))
          }
        }, 5000)
      }

      script.onerror = () => {
        reject(new Error("Failed to load Sagepilot widget script"))
      }

      document.head.appendChild(script)
    })
  }, [])

  /**
   * Initialize Sagepilot widget (for identity verification)
   */
  const initializeWidget = useCallback((): void => {
    if (widgetInitializedRef.current || !window.ChatWidget) {
      return
    }

    try {
      // Initialize widget (without container - we use iframe instead)
      window.ChatWidget.init({
        host: SAGEPILOT_CONFIG.host,
        key: SAGEPILOT_CONFIG.key,
      })

      widgetInitializedRef.current = true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize Sagepilot widget"
      setError(errorMessage)
      console.error("[Sagepilot] Initialization error:", err)
      throw err
    }
  }, [])

  /**
   * Identify user in Sagepilot
   */
  const identifyUser = useCallback(
    (user: UserWithSagepilotHash): void => {
      if (identifyCalledRef.current || !window.ChatWidget) {
        return
      }

      try {
        if (!user._id || !user.sagepilot_user_hash) {
          throw new Error("User ID or hash missing")
        }

        window.ChatWidget.identify({
          user_id: user._id,
          user_hash: user.sagepilot_user_hash,
          email: user.email,
          name: user.name || `${user.first_name || ""} ${user.last_name || ""}`.trim() || undefined,
          phone: user.contact,
        })

        identifyCalledRef.current = true
        console.log("[Sagepilot] User identified successfully")
      } catch (err) {
        console.error("[Sagepilot] Identify error:", err)
        throw err
      }
    },
    []
  )

  /**
   * Build iframe URL
   */
  const buildIframeUrl = useCallback((): string => {
    const baseUrl = `${SAGEPILOT_CONFIG.host}/chat-widget-iframe.html`
    const params = new URLSearchParams({
      key: SAGEPILOT_CONFIG.key,
      host: SAGEPILOT_CONFIG.host,
    })
    return `${baseUrl}?${params.toString()}`
  }, [])

  /**
   * Main initialization flow
   */
  useEffect(() => {
    let isMounted = true

    const initialize = async () => {
      // Prevent duplicate calls
      if (fetchCalledRef.current) {
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        fetchCalledRef.current = true

        // Get contact number
        const userContact = contact || getUserContact()
        if (!userContact) {
          throw new Error("Contact number is required")
        }

        // Step 1: Build iframe URL (we can do this immediately)
        const iframeUrl = buildIframeUrl()
        setIframeUrl(iframeUrl)

        // Step 2: Fetch user data from backend
        const user = (await getUser(userContact)) as UserWithSagepilotHash

        if (!isMounted) return

        // Validate required fields
        if (!user._id) {
          throw new Error("User ID not found in API response")
        }

        if (!user.sagepilot_user_hash) {
          throw new Error("sagepilot_user_hash not found in API response. User may not be set up for chat.")
        }

        setUserData(user)

        // Step 3: Load script for identity verification
        await loadScript()
        if (!isMounted) return

        // Step 4: Initialize widget
        initializeWidget()
        if (!isMounted) return

        // Step 5: Wait for widget to initialize, then identify user
        await new Promise((resolve) => setTimeout(resolve, 500))
        if (!isMounted) return

        // Step 6: Identify user
        identifyUser(user)

        if (isMounted) {
          setIsReady(true)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to initialize Sagepilot widget"
          setError(errorMessage)
          console.error("[Sagepilot] Initialization error:", err)
          setIsReady(false)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    initialize()

    return () => {
      isMounted = false
    }
  }, [contact, loadScript, initializeWidget, identifyUser, buildIframeUrl])

  return {
    isLoading,
    isReady,
    error,
    iframeUrl,
    userData,
  }
}

