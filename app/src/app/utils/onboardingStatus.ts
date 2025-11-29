/**
 * Utility functions for checking onboarding completion status
 */

import { FormialUser, UserWithAllDataResponse } from "./formialApi"

/**
 * Check if user has completed onboarding by checking if they have uploaded photos
 * Primary check: Does user have at least one prescription (photo upload)?
 */
export const hasCompletedOnboarding = (
  user: FormialUser | null | undefined,
  allData?: UserWithAllDataResponse | null | undefined
): boolean => {
  if (!user) return false
  
  // Primary check: If we have full data with prescriptions, check prescriptions
  if (allData && allData.prescriptions) {
    return allData.prescriptions.length > 0
  }
  
  // Fallback: Check image_uploaded flag if prescriptions data not available
  if (user.image_uploaded === true) {
    return true
  }
  
  // Final fallback: heuristic check
  return checkOnboardingHeuristic(user)
}

/**
 * Fallback heuristic check for onboarding completion
 * Use this only if backend doesn't support onboardingCompleted field yet
 */
const checkOnboardingHeuristic = (user: FormialUser): boolean => {
  // Check if all critical steps are completed:
  // 1. OTP verified (user exists with contact)
  // 2. Basic info provided (name exists)
  // 3. Address provided OR address step was skipped
  // 4. Photo uploaded OR photo step was skipped
  // 5. Formulation step completed (has concerns/skin_issues or prescribed status)
  
  const hasBasicInfo = Boolean(user.name || user.first_name)
  const hasContact = Boolean(user.contact)
  const hasAddress = user.addresses && Array.isArray(user.addresses) && user.addresses.length > 0
  const hasPhotoUploaded = user.image_uploaded === true
  const hasConsultationData = Boolean(
    (user.concerns && user.concerns.length > 0) ||
    (user.skin_issues && user.skin_issues.length > 0) ||
    user.prescribed !== undefined
  )
  
  // User has completed onboarding if:
  // - Basic info + contact (Step 2)
  // - AND (address OR consultation data exists)
  // - Consultation data indicates they reached formulation step
  return hasBasicInfo && 
         hasContact && 
         hasConsultationData
}

/**
 * Check onboarding completion using milestone-based approach
 */
export const checkOnboardingMilestones = (user: FormialUser | null | undefined): {
  completed: boolean
  milestones: {
    otpVerified: boolean
    basicInfo: boolean
    address: boolean
    photos: boolean
    consultation: boolean
  }
} => {
  if (!user) {
    return {
      completed: false,
      milestones: {
        otpVerified: false,
        basicInfo: false,
        address: false,
        photos: false,
        consultation: false,
      }
    }
  }

  const milestones = {
    otpVerified: Boolean(user.contact),
    basicInfo: Boolean(user.name || user.first_name),
    address: Boolean(user.addresses && Array.isArray(user.addresses) && user.addresses.length > 0),
    photos: user.image_uploaded === true,
    consultation: Boolean(
      (user.concerns && user.concerns.length > 0) ||
      (user.skin_issues && user.skin_issues.length > 0) ||
      user.prescribed !== undefined
    )
  }

  // All critical milestones must be completed
  const completed = milestones.otpVerified && 
                    milestones.basicInfo && 
                    milestones.consultation

  return { completed, milestones }
}

/**
 * Get onboarding progress percentage (0-100)
 */
export const getOnboardingProgress = (user: FormialUser | null | undefined): number => {
  if (!user) return 0
  
  const { milestones } = checkOnboardingMilestones(user)
  const totalSteps = 5
  const completedSteps = Object.values(milestones).filter(Boolean).length
  
  return Math.round((completedSteps / totalSteps) * 100)
}

