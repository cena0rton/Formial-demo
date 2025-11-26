"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { getUserWithAllData, UserWithAllDataResponse } from "../utils/formialApi"
import { getUserContact } from "../utils/userContact"

export const useDashboardData = () => {
  const [contact, setContact] = useState<string | null>(null)
  const [data, setData] = useState<UserWithAllDataResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setContact(getUserContact())
  }, [])

  const fetchData = useCallback(
    async (currentContact?: string | null) => {
      const activeContact = currentContact ?? contact
      if (!activeContact) {
        setData(null)
        return
      }

      setIsLoading(true)
      setError(null)
      try {
        const response = await getUserWithAllData(activeContact)
        setData(response)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load dashboard data."
        setError(message)
        setData(null)
      } finally {
        setIsLoading(false)
      }
    },
    [contact]
  )

  useEffect(() => {
    if (contact) {
      fetchData(contact)
    }
  }, [contact, fetchData])

  const hasProfile = Boolean(data?.user)

  return useMemo(
    () => ({
      contact,
      data,
      isLoading,
      error,
      hasProfile,
      refetch: fetchData,
    }),
    [contact, data, isLoading, error, hasProfile, fetchData]
  )
}


