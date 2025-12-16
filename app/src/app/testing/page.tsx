'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingModal from '../Components/Dashboard/Dash-Items/OnboardingModal-new'
import { setUserContact, getUserContact } from '../utils/userContact'
import { setAuthToken } from '../utils/authToken'

// Mock data for testing
const MOCK_USER = {
  _id: 'test-user-123',
  first_name: 'Test',
  last_name: 'User',
  name: 'Test User',
  contact: '+919876543210',
  email: 'test@formial.in',
  shopify_user_id: 'test-shopify-123',
  shopify_order_id: 'test-order-123',
  image_uploaded: true,
  prescribed: true,
  concerns: ['acne', 'hyperpigmentation'],
  skin_issues: ['acne'],
  addresses: [{
    address1: '123 Test Street',
    address2: 'Apt 4B',
    city: 'Mumbai',
    province: 'Maharashtra',
    zip: '400001',
    country: 'India'
  }],
  onboardingCompleted: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

const MOCK_PRESCRIPTIONS = [
  {
    _id: 'prescription-1',
    createdAt: new Date().toISOString(),
    front_image: 'https://via.placeholder.com/300x400?text=Front+Image',
    left_image: 'https://via.placeholder.com/300x400?text=Left+Image',
    right_image: 'https://via.placeholder.com/300x400?text=Right+Image',
    prescription_completed: true,
    formulation_completed: true,
    clinician_name: 'Dr. Test Dermatologist',
    clinician_remarks: 'Test prescription remarks',
    azelaic_acid: 5,
    niacinamide: 4,
    tretinoin: 0.025
  }
]

const MOCK_CONVERSATIONS = [
  {
    _id: 'conv-1',
    remark: 'Test conversation message',
    clinical: true,
    createdAt: new Date().toISOString()
  }
]

// Mock data constants (actual mocking is done in API utility files via test mode flag)

export default function TestingPage() {
  const router = useRouter()
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showDashboard, setShowDashboard] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize test environment
    const initTest = async () => {
      // Set mock contact and token
      setUserContact('+919876543210')
      setAuthToken('mock-jwt-token-for-testing')
      
      // Mark as test mode
      if (typeof window !== 'undefined') {
        ;(window as any).__FORMIAL_TEST_MODE__ = true
      }
      
      setIsInitialized(true)
    }
    
    initTest()
  }, [])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setShowDashboard(true)
  }

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F0E0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3F2B] mx-auto mb-4"></div>
          <p className="text-[#3D2D1F]">Initializing test environment...</p>
        </div>
      </div>
    )
  }

  // Show onboarding with test wrapper
  if (showOnboarding && !showDashboard) {
    return (
      <TestOnboardingWrapper onComplete={handleOnboardingComplete} />
    )
  }

  // Show dashboard with mock data
  if (showDashboard) {
    return (
      <div className="relative">
        <div className="absolute top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg text-sm font-semibold z-50">
          🧪 TEST MODE - Mock Dashboard Data
        </div>
        <TestDashboard />
      </div>
    )
  }

  return null
}

// Test Onboarding Wrapper - APIs are already mocked via test mode flag
function TestOnboardingWrapper({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="fixed inset-0 bg-[#F2F0E0] z-50">
      <div className="absolute top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg text-sm font-semibold z-50">
        🧪 TEST MODE - Mocked API calls
      </div>
      <OnboardingModal
        onComplete={onComplete}
        mobileNumber="+919876543210"
        initialUserName="Test User"
      />
    </div>
  )
}

// Test Dashboard Component - APIs are already mocked via test mode flag
function TestDashboard() {
  // Use the actual Page component - APIs will return mock data due to test mode flag
  const Page = require('../Components/Dashboard/Page').default
  return <Page />
}

