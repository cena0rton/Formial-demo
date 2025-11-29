# Onboarding Completion Verification - Discussion Document

## Current Problem

The current implementation uses a **heuristic approach** to determine if a user has completed onboarding:

```typescript
const hasCompletedOnboarding = user?.prescribed !== undefined || 
                               user?.concerns?.length > 0 ||
                               Boolean(user?.email)
```

### Issues with Current Approach:
1. **Unreliable**: User might have email but haven't completed all steps
2. **Unclear**: Uses side-effect fields, not explicit completion tracking
3. **Incomplete**: Doesn't verify if all 5 onboarding steps are done
4. **Fragile**: Relies on fields that might exist for other reasons

---

## Onboarding Steps Overview

1. **Welcome Step 1**: Name display (no data saved)
2. **Welcome Step 2**: OTP verification + name/phone update (creates user record)
3. **Welcome Step 3**: Address update (optional)
4. **Upload Step**: Photo upload (optional, can skip)
5. **Formulation Step**: Final step - marks onboarding complete

---

## Recommended Approaches

### Approach 1: Dedicated Boolean Field ✅ **RECOMMENDED**

**Implementation:**
- Add `onboardingCompleted: boolean` field to user model
- Set to `true` when FormulationStep calls `handleComplete()`
- Also store `onboardingCompletedAt: timestamp`

**Pros:**
- ✅ Explicit and clear - single source of truth
- ✅ Easy to check: `if (user.onboardingCompleted)`
- ✅ Can track completion date
- ✅ Simple query for analytics
- ✅ Works even if some optional steps are skipped

**Cons:**
- ⚠️ Requires backend support (new field)
- ⚠️ Need migration for existing users

**Backend API Update:**
```json
{
  "onboardingCompleted": true,
  "onboardingCompletedAt": "2025-01-15T10:30:00.000Z"
}
```

**Frontend Check:**
```typescript
import { hasCompletedOnboarding } from '../utils/onboardingStatus'

if (hasCompletedOnboarding(user)) {
  // Show dashboard
} else {
  // Show onboarding
}
```

---

### Approach 2: Milestone-Based Tracking

**Implementation:**
- Track completion of each step individually
- Store in user model: `onboardingSteps: { step1: boolean, step2: boolean, ... }`
- Or use flags: `step2Completed`, `step3Completed`, etc.

**Pros:**
- ✅ Granular tracking - know exactly which step user is on
- ✅ Can resume from specific step
- ✅ Better analytics on drop-off points

**Cons:**
- ⚠️ More complex data model
- ⚠️ Need to maintain state for each step
- ⚠️ Overkill for simple use case

---

### Approach 3: Hybrid Approach (Current Implementation)

**Implementation:**
- Primary: Check `onboardingCompleted` boolean if available
- Fallback: Use heuristic check for backward compatibility

**Code:**
```typescript
export const hasCompletedOnboarding = (user: FormialUser): boolean => {
  // Primary: Check explicit flag
  if (typeof user.onboardingCompleted === 'boolean') {
    return user.onboardingCompleted === true
  }
  
  // Fallback: Heuristic check (for old users or if backend doesn't support flag yet)
  return (
    Boolean(user.name || user.first_name) &&
    Boolean(user.contact) &&
    Boolean(
      (user.concerns && user.concerns.length > 0) ||
      (user.skin_issues && user.skin_issues.length > 0) ||
      user.prescribed !== undefined
    )
  )
}
```

**Pros:**
- ✅ Works immediately without backend changes
- ✅ Gradual migration path
- ✅ Backward compatible

---

### Approach 4: JWT Claims

**Implementation:**
- Store completion status in JWT token
- Backend includes `onboardingCompleted: true` in token payload
- Frontend decodes and checks

**Pros:**
- ✅ Fast - no API call needed
- ✅ Works offline

**Cons:**
- ⚠️ Token refresh issues
- ⚠️ Hard to update if status changes
- ⚠️ Security concerns with client-side token handling

---

## Recommended Solution

**Use Approach 1 (Dedicated Boolean) with Approach 3 (Hybrid Fallback)**

### Step 1: Backend Implementation
```typescript
// User Model
{
  onboardingCompleted: boolean,
  onboardingCompletedAt: Date
}

// PATCH /update-user/:contact
// When FormulationStep completes:
{
  onboardingCompleted: true,
  onboardingCompletedAt: new Date().toISOString()
}
```

### Step 2: Frontend Implementation

**Utility Function** (`utils/onboardingStatus.ts`):
- Checks `onboardingCompleted` first (primary)
- Falls back to heuristic check (backward compatibility)

**FormulationStep** (`handleComplete`):
- Calls API to set `onboardingCompleted: true`
- Sets timestamp

**UserPage** (`[mobile]/page.tsx`):
- Uses `hasCompletedOnboarding(user)` utility
- Shows onboarding if false, dashboard if true

---

## Implementation Status

✅ Created utility function: `utils/onboardingStatus.ts`
✅ Updated `FormialUser` interface with `onboardingCompleted` field
✅ Updated `[mobile]/page.tsx` to use new utility
✅ Updated `OnboardingModal-new.tsx` to mark completion on finish
⏳ **Pending**: Backend needs to accept and store `onboardingCompleted` field

---

## Testing Checklist

- [ ] New user completes all steps → `onboardingCompleted: true`
- [ ] Existing user (old data) → falls back to heuristic check
- [ ] User visits `/{mobile}` → shows onboarding if incomplete
- [ ] User visits `/{mobile}` → shows dashboard if complete
- [ ] Backend rejects unknown field → graceful fallback to heuristic

---

## Migration Plan

1. **Phase 1** (Current): Use hybrid approach with heuristic fallback
2. **Phase 2**: Backend adds `onboardingCompleted` field to new users
3. **Phase 3**: Backend migration script sets flag for existing users based on heuristic
4. **Phase 4**: Remove heuristic fallback, use explicit flag only

---

## Edge Cases to Handle

1. **User skips optional steps** (address, photos)
   - ✅ Still marked as complete if FormulationStep finishes
   
2. **User partially completes, then returns later**
   - ✅ Shows onboarding from where they left off
   
3. **Backend doesn't support new field yet**
   - ✅ Falls back to heuristic check
   
4. **JWT token expires during onboarding**
   - ✅ User redirected to verify again
   
5. **Multiple devices/tabs**
   - ✅ Each device checks completion independently

---

## Questions for Backend Team

1. Can we add `onboardingCompleted: boolean` and `onboardingCompletedAt: Date` to user model?
2. Should we set this flag when FormulationStep completes, or at a different point?
3. Do we need to migrate existing users to set this flag?
4. Should this be a required field or optional (with fallback)?

