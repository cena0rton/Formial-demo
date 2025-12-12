'use client'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import Dash from './Dash'
import DashHome from './Dash-Items/DashHome'
import SkinProgress from './Dash-Items/SkinProgress'
import PersonalDetails from './Dash-Items/PersonalDetails'
import Support from './Dash-Items/Support'
import Discover from './Dash-Items/Discover'
import Orders from './Dash-Items/Orders'
import Navbar from './Navbar'
import { useDashboardData } from '../../hooks/useDashboardData'
import { FormialUser, updateUserByContact } from '../../utils/formialApi'

type SectionType = 'treatment' | 'progress' | 'refer'

const normalizeContactInput = (value: string) => {
  const digits = value.replace(/[^\d]/g, '')
  if (!digits) return ''
  return digits.startsWith('0') ? `+${digits.slice(1)}` : `+${digits}`
}

const Page = () => {
  const [activeItem, setActiveItem] = useState(0)
  const [activeSection, setActiveSection] = useState<SectionType>('treatment')
  const ref = useRef<number>(0)

  const { contact, data, isLoading, error, refetch } = useDashboardData()
  const user = data?.user
  const prescriptions = data?.prescriptions || []

  const handleSavePersonalDetails = useCallback(
    async (payload: { firstName: string; lastName: string; whatsapp: string; address?: { address1: string; address2: string; city: string; state: string; pincode: string } }) => {
      if (!contact) throw new Error('Contact not available. Please verify your number again.')

      const updatePayload: Partial<FormialUser> = {}
      if (payload.firstName) updatePayload.first_name = payload.firstName
      if (payload.lastName) updatePayload.last_name = payload.lastName
      if (payload.whatsapp) {
        updatePayload.contact = normalizeContactInput(payload.whatsapp)
      }
      
      // Update address in new format
      if (payload.address) {
        updatePayload.addresses = [{
          address1: payload.address.address1 || '',
          address2: payload.address.address2 || '',
          city: payload.address.city || '',
          province: payload.address.state || '',
          zip: payload.address.pincode || '',
          country: 'India', // Default to India, can be made configurable
        }]
      }

      await updateUserByContact(contact, updatePayload)
      await refetch(contact)
    },
    [contact, refetch]
  )

  const showDataWarning = useMemo(() => !contact && !isLoading, [contact, isLoading])

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#F8F7F3]">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          ref={ref}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 text-sm text-center">
            {error}
          </div>
        )}
        {showDataWarning && (
          <div className="bg-yellow-50 text-yellow-800 px-4 py-3 text-sm text-center">
            Verify your WhatsApp number to unlock the dashboard.
          </div>
        )}
        <Dash>
          {ref.current === 0 && (
            <DashHome
              activeSection={activeSection}
              user={user}
              prescriptions={prescriptions}
              isLoading={isLoading}
              onRefetch={() => refetch(contact)}
            />
          )}
          {ref.current === 1 && <SkinProgress />}
          {ref.current === 2 && <Discover />}
          {ref.current === 4 && (
            <Support />
          )}
          {ref.current === 6 && (
            <PersonalDetails
              user={user}
              isLoading={isLoading}
              onSave={handleSavePersonalDetails}
            />
          )}
          {ref.current === 7 && <Orders />}
        </Dash>
      </div>
    </div>
  )
}

export default Page