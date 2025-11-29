# Photo Upload & Onboarding Completion Analysis

## Current State Analysis

### ✅ What We HAVE:

1. **Upload Step UI** (`upload-step.tsx`)
   - ✅ 3-step photo upload interface (front, left, right)
   - ✅ File selection and preview
   - ✅ Photos stored in component state as `File[]`
   - ✅ Navigation between upload steps
   - ✅ Delete/replace functionality

2. **State Management** (`OnboardingModal-new.tsx`)
   - ✅ `uploadedPhotos` state array stores File objects
   - ✅ Photos passed from UploadStep to OnboardingModal
   - ✅ Photos currently saved to localStorage as data URLs (in `handleComplete`)

3. **Onboarding Completion Check** (`onboardingStatus.ts` & `[mobile]/page.tsx`)
   - ✅ Currently checks: `onboardingCompleted` flag OR heuristic (prescribed/concerns/email)
   - ✅ Has `image_uploaded` check in milestones but not primary completion check

4. **User Model** (`formialApi.ts`)
   - ✅ `FormialUser` interface with `image_uploaded?: boolean`
   - ✅ `FormialPrescription` interface exists
   - ✅ API utility functions exist (`apiRequest`, `getUser`, `updateUserByContact`)

5. **Backend API Structure**
   - ✅ Base URL configured
   - ✅ Auth token handling
   - ✅ Request utilities ready

---

### ❌ What We DON'T HAVE:

1. **Photo Upload API Function**
   - ❌ No function to call `POST /prescription` endpoint
   - ❌ No multipart/form-data handling
   - ❌ No prescription upload implementation

2. **Actual Backend Upload**
   - ❌ Photos never uploaded to backend
   - ❌ Only saved to localStorage (which user doesn't want)
   - ❌ No prescription record created

3. **Photo-Based Completion Check**
   - ❌ Onboarding completion doesn't check for prescriptions
   - ❌ Still using `image_uploaded` flag or heuristic
   - ❌ Should check: "Does user have at least one prescription?"

4. **Upload Timing**
   - ❌ Photos uploaded too late (in `handleComplete` at FormulationStep)
   - ❌ Should upload immediately after user completes UploadStep

---

## Required Changes

### 1. **API Function for Photo Upload** 🔴 **CRITICAL**

**Location**: `utils/formialApi.ts`

**Need to Create**:
```typescript
export interface CreatePrescriptionResponse {
  success: boolean
  prescription: FormialPrescription
}

export const createPrescription = async (
  contact: string,
  files: {
    front_image: File
    left_image: File
    right_image: File
  }
): Promise<CreatePrescriptionResponse>
```

**Implementation Notes**:
- Use `multipart/form-data` encoding
- Query param: `?number={contact}` (contact number)
- Form fields: `front_image`, `left_image`, `right_image`
- Each field accepts one file (maxCount: 1)
- Wait 5-7 seconds for response (backend processing delay)
- Handle loading states

---

### 2. **Upload Photos After UploadStep** 🔴 **CRITICAL**

**Location**: `OnboardingModal-new.tsx`

**Current Flow**:
1. User uploads 3 photos → stored in state
2. User clicks "Continue" → goes to FormulationStep
3. User completes FormulationStep → calls `handleComplete`
4. Photos saved to localStorage ❌

**New Flow**:
1. User uploads 3 photos → stored in state
2. User clicks "Continue" on UploadStep → **Upload to backend immediately**
3. Show loading state during upload (5-7 seconds)
4. On success → proceed to FormulationStep
5. On error → show error, allow retry
6. Remove localStorage saving entirely

**Implementation**:
- Create `handleUploadComplete` function
- Call `createPrescription()` when user finishes UploadStep
- Handle success/error/loading states
- Update `onNext` from UploadStep to trigger upload

---

### 3. **Change Onboarding Completion Check** 🔴 **CRITICAL**

**Location**: `utils/onboardingStatus.ts` & `[mobile]/page.tsx`

**Current Logic**:
```typescript
// Checks: onboardingCompleted flag OR prescribed/concerns/email
```

**New Logic**:
```typescript
// Check: Does user have at least one prescription?
// If YES → onboarding complete → show dashboard
// If NO → onboarding incomplete → show onboarding
```

**Implementation**:
- Fetch user data with prescriptions: `getUserWithAllData(contact)`
- Check: `prescriptions.length > 0`
- If prescriptions exist → user has uploaded photos → onboarding complete
- Remove browser storage checks entirely
- Remove `onboardingCompleted` flag dependency

---

### 4. **Update UploadStep Completion Handler** 🟡 **IMPORTANT**

**Location**: `onboarding/upload-step.tsx`

**Current**:
- `onNext()` just calls parent's `onNext()`
- No upload happens

**New**:
- When user clicks "Continue" after uploading all 3 photos:
  - Disable button
  - Show "Uploading..." state
  - Call upload API
  - On success → proceed to next step
  - On error → show error, allow retry

**OR**:
- Keep UploadStep simple
- Handle upload in OnboardingModal when UploadStep completes

---

### 5. **Remove Browser Storage** 🟡 **IMPORTANT**

**Location**: `OnboardingModal-new.tsx` → `handleComplete()`

**Remove**:
- ❌ `localStorage.setItem('formial-uploaded-photos', ...)`
- ❌ FileReader conversion to data URLs

**Keep**:
- ✅ Only upload to backend
- ✅ Photos already uploaded during UploadStep

---

### 6. **Handle Upload Errors** 🟡 **IMPORTANT**

**Scenarios to Handle**:
- Network errors
- File size too large
- Invalid file format
- Backend 404 (user not found)
- Backend 500 (server error)
- 5-7 second delay feedback

**UX Considerations**:
- Loading spinner during upload
- Progress indicator
- Error messages
- Retry button
- Don't block user if upload fails (allow to continue and retry later)

---

## New Onboarding Flow

### Step-by-Step:

1. **Welcome Step 1**: Display name
2. **Welcome Step 2**: OTP verification → User created in backend
3. **Welcome Step 3**: Address update (optional)
4. **Upload Step**: 
   - User uploads 3 photos (front, left, right)
   - On "Continue" → **Upload to backend via POST /prescription**
   - Show loading (5-7 seconds)
   - On success → proceed to FormulationStep
   - On error → show error, allow retry
5. **FormulationStep**: Final step → redirect to dashboard

### Completion Check:

When user visits `/{mobile}`:
1. Fetch user data with prescriptions
2. Check: `prescriptions.length > 0`
3. If YES → Show dashboard
4. If NO → Show onboarding

---

## API Endpoint Details

### POST /prescription

**Query Parameter**:
- `number`: User's contact number (e.g., `+917387690252`)

**Form Data** (multipart/form-data):
- `front_image`: File (required)
- `left_image`: File (required)
- `right_image`: File (required)

**Response**:
```json
{
  "success": true,
  "prescription": {
    "_id": "...",
    "front_image": "https://cdn.example.com/front.png",
    "left_image": "https://cdn.example.com/left.png",
    "right_image": "https://cdn.example.com/right.png",
    "prescription_completed": false,
    "fresh_consultation": true,
    "createdAt": "...",
    ...
  }
}
```

**Notes**:
- 5-7 second delay expected
- Images uploaded and URLs returned
- Creates prescription record linked to user

---

## Files to Modify

### 1. `utils/formialApi.ts`
- ✅ Add `CreatePrescriptionResponse` interface
- ✅ Add `createPrescription()` function
- ✅ Handle multipart/form-data
- ✅ Handle query parameters

### 2. `utils/onboardingStatus.ts`
- ✅ Update `hasCompletedOnboarding()` to check prescriptions
- ✅ Remove `onboardingCompleted` flag dependency
- ✅ Check `getUserWithAllData()` → prescriptions array

### 3. `[mobile]/page.tsx`
- ✅ Fetch prescriptions when checking completion
- ✅ Use `getUserWithAllData()` instead of `getUser()`
- ✅ Check `prescriptions.length > 0`

### 4. `OnboardingModal-new.tsx`
- ✅ Add `handleUploadComplete()` function
- ✅ Upload photos when UploadStep completes
- ✅ Remove localStorage saving
- ✅ Handle upload loading/error states
- ✅ Pass upload handler to UploadStep

### 5. `onboarding/upload-step.tsx`
- ✅ Accept upload handler prop
- ✅ Call upload before proceeding
- ✅ Show upload loading state
- ✅ Handle upload errors

---

## Implementation Priority

1. **🔴 CRITICAL**: Create `createPrescription()` API function
2. **🔴 CRITICAL**: Update onboarding completion check to use prescriptions
3. **🔴 CRITICAL**: Upload photos when user completes UploadStep
4. **🟡 IMPORTANT**: Remove browser storage
5. **🟡 IMPORTANT**: Handle upload errors and loading states

---

## Questions/Considerations

1. **Upload Timing**: Upload immediately after UploadStep or wait until FormulationStep?
   - **Recommendation**: Upload immediately after UploadStep (before FormulationStep)
   
2. **Skip Functionality**: Can users skip photo upload?
   - **Current**: `onSkip` function exists
   - **Question**: Should skipping photos prevent dashboard access?
   - **Recommendation**: If skipped, show onboarding again

3. **Error Handling**: What if upload fails?
   - **Option A**: Block progression, require retry
   - **Option B**: Allow progression, show warning
   - **Recommendation**: Block progression, show clear error, allow retry

4. **Multiple Prescriptions**: User might have multiple prescriptions over time
   - **Check**: `prescriptions.length > 0` (at least one)
   - **Latest**: Always use most recent prescription

5. **Backend Delay**: 5-7 second delay - how to handle UX?
   - Show loading spinner
   - Disable navigation
   - Optional: Progress indicator if possible

---

## Current vs. Proposed Flow Comparison

### CURRENT (Broken):
```
UploadStep → Photos in state → FormulationStep → localStorage → Dashboard
                      ❌ No backend upload
```

### PROPOSED (Fixed):
```
UploadStep → Upload to backend → FormulationStep → Dashboard
              ✅ POST /prescription
              ✅ Creates prescription record
              ✅ Onboarding check: prescriptions.length > 0
```

---

## Summary

**What Works**: ✅ Upload UI, state management, navigation

**What's Missing**: ❌ Backend upload, prescription-based completion check

**What Needs Fixing**: 
1. Upload photos to backend when user completes UploadStep
2. Check for prescriptions (not localStorage) to determine onboarding completion
3. Remove browser storage dependency

**Next Steps**:
1. Create `createPrescription()` API function
2. Update completion check logic
3. Implement upload flow in OnboardingModal
4. Test with backend endpoint

