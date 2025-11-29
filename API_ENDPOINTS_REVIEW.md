# API Endpoints Review - Complete Checklist

## Endpoints Provided vs. Implementation Status

### ✅ **FULLY IMPLEMENTED:**

1. **GET /sendWAOTPUser** ✅
   - **Location**: `utils/otpService.ts`
   - **Function**: `sendWhatsAppOtp()`
   - **Status**: ✅ Complete
   - **Notes**: Handles query params, sanitization, error handling

2. **GET /VerifyWAOTPUser** ✅
   - **Location**: `utils/otpService.ts`
   - **Function**: `verifyWhatsAppOtp()`
   - **Status**: ✅ Complete
   - **Notes**: Returns token and profile flag, handles all response cases

3. **GET /get-user/:contact** ✅
   - **Location**: `utils/formialApi.ts`
   - **Function**: `getUser(contact)`
   - **Status**: ✅ Complete
   - **Notes**: Uses path params with encoded contact

4. **GET /get-user/:contact/with-all-data** ✅
   - **Location**: `utils/formialApi.ts`
   - **Function**: `getUserWithAllData(contact)`
   - **Status**: ✅ Complete
   - **Notes**: Returns user + prescriptions + conversations

5. **POST /prescription** ✅
   - **Location**: `utils/formialApi.ts`
   - **Function**: `createPrescription(contact, files)`
   - **Status**: ✅ Complete
   - **Notes**: Handles multipart/form-data, query params

6. **PATCH /update-user/:contact** ✅
   - **Location**: `utils/formialApi.ts`
   - **Function**: `updateUserByContact(contact, payload)`
   - **Status**: ✅ Complete
   - **Notes**: Handles partial updates, JSON body

---

### ⚠️ **MISSING / NOT IMPLEMENTED:**

1. **GET /get-user/:contact/with-prescriptions** ⚠️
   - **Status**: ❌ NOT IMPLEMENTED
   - **Impact**: Low - We have `/with-all-data` which includes prescriptions
   - **Recommendation**: 
     - Option A: Add this endpoint if we need lighter responses (without conversations)
     - Option B: Continue using `/with-all-data` everywhere (current approach)
   - **Current Usage**: We use `getUserWithAllData()` everywhere, which includes prescriptions

2. **POST /add-conversation/:contact** ❌
   - **Status**: ❌ NOT IMPLEMENTED
   - **Impact**: Medium - Might be useful for Support page chat history
   - **Use Case**: Adding conversation remarks (clinical, behavioural, emotional)
   - **Recommendation**: Implement if Support page needs to save conversation history
   - **Current Status**: Not used anywhere in the codebase

---

## Detailed Endpoint Analysis

### 1. GET /sendWAOTPUser ✅

**Implementation**: `utils/otpService.ts` → `sendWhatsAppOtp()`

**What Works**:
- ✅ Query params: `phonenumber`, `name` (optional)
- ✅ Phone number sanitization (removes non-digits)
- ✅ Error handling
- ✅ Returns OTP string or phone number

**Used In**:
- `onboarding/welcome-step-2.tsx` - Sends OTP when user clicks "Send OTP"

**Status**: ✅ Complete - No changes needed

---

### 2. GET /VerifyWAOTPUser ✅

**Implementation**: `utils/otpService.ts` → `verifyWhatsAppOtp()`

**What Works**:
- ✅ Query params: `phonenumber`, `code`
- ✅ Returns: `{ message, profile, token? }`
- ✅ Handles all response cases (user exists/new user)
- ✅ Error handling

**Used In**:
- `onboarding/welcome-step-2.tsx` - Verifies OTP and redirects based on profile

**Status**: ✅ Complete - No changes needed

---

### 3. GET /get-user/:contact ✅

**Implementation**: `utils/formialApi.ts` → `getUser(contact)`

**What Works**:
- ✅ Path param: `:contact` (URL encoded)
- ✅ Returns: `FormialUser`
- ✅ Error handling (404, 500)

**Used In**:
- `OnboardingModal-new.tsx` - Fetches user data for onboarding
- `auth.ts` - Verifies user exists
- `PersonalDetails.tsx` - Fetches user for editing

**Status**: ✅ Complete - No changes needed

---

### 4. GET /get-user/:contact/with-prescriptions ⚠️

**Status**: ❌ NOT IMPLEMENTED

**Impact**: Low

**Why It's Missing**:
- We're using `/with-all-data` everywhere which includes prescriptions
- This endpoint would be lighter (no conversations), but we don't have that use case yet

**Recommendation**:
- If we need a lighter endpoint (prescriptions only, no conversations), add this
- Currently not critical since `/with-all-data` works fine

**Potential Implementation**:
```typescript
export interface UserWithPrescriptionsResponse {
  user: FormialUser
  prescriptions: FormialPrescription[]
}

export const getUserWithPrescriptions = (contact: string) =>
  apiRequest<UserWithPrescriptionsResponse>(`/get-user/${encodeContact(contact)}/with-prescriptions`)
```

---

### 5. GET /get-user/:contact/with-all-data ✅

**Implementation**: `utils/formialApi.ts` → `getUserWithAllData(contact)`

**What Works**:
- ✅ Path param: `:contact` (URL encoded)
- ✅ Returns: `{ user, prescriptions, conversations }`
- ✅ Error handling

**Used In**:
- `[mobile]/page.tsx` - Checks onboarding completion (checks prescriptions)
- `hooks/useDashboardData.ts` - Fetches all dashboard data
- `Page.tsx` - Dashboard main page

**Status**: ✅ Complete - No changes needed

---

### 6. POST /prescription ✅

**Implementation**: `utils/formialApi.ts` → `createPrescription(contact, files)`

**What Works**:
- ✅ Query param: `?number={contact}`
- ✅ Multipart/form-data: `front_image`, `left_image`, `right_image`
- ✅ Returns: `{ success, prescription }`
- ✅ Error handling (404, 500)
- ✅ Handles 5-7 second delay (loading states)

**Used In**:
- `OnboardingModal-new.tsx` - Uploads photos when user completes UploadStep

**Status**: ✅ Complete - No changes needed

---

### 7. POST /add-conversation/:contact ❌

**Status**: ❌ NOT IMPLEMENTED

**Impact**: Medium

**Why It's Missing**:
- Support page currently uses iframe chat widget (SagePilot)
- No conversation history saving functionality
- Might be useful if we want to save chat history

**Potential Use Cases**:
- Save conversation remarks from Support page
- Track clinical/behavioural/emotional interactions
- Display conversation history in dashboard

**Recommendation**:
- If Support page needs to save conversation history, implement this
- Currently not critical since Support uses external iframe

**Potential Implementation**:
```typescript
export interface AddConversationRequest {
  remark: string
  clinical?: boolean
  behavioural?: boolean
  emotional?: boolean
}

export interface AddConversationResponse {
  message: string
  conversation: FormialConversation
}

export const addConversation = (
  contact: string,
  payload: AddConversationRequest
) =>
  apiRequest<AddConversationResponse>(`/add-conversation/${encodeContact(contact)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
```

---

### 8. PATCH /update-user/:contact ✅

**Implementation**: `utils/formialApi.ts` → `updateUserByContact(contact, payload)`

**What Works**:
- ✅ Path param: `:contact` (URL encoded)
- ✅ Partial updates (only provided fields)
- ✅ JSON body
- ✅ Returns updated user

**Used In**:
- `onboarding/welcome-step-2.tsx` - Updates name/phone after OTP verification
- `onboarding/welcome-step-3.tsx` - Updates address
- `PersonalDetails.tsx` - Updates user details from dashboard

**Status**: ✅ Complete - No changes needed

---

## Summary

### ✅ Fully Implemented: 6/8 endpoints (75%)

1. ✅ GET /sendWAOTPUser
2. ✅ GET /VerifyWAOTPUser
3. ✅ GET /get-user/:contact
4. ✅ GET /get-user/:contact/with-all-data
5. ✅ POST /prescription
6. ✅ PATCH /update-user/:contact

### ⚠️ Missing: 2/8 endpoints (25%)

1. ⚠️ GET /get-user/:contact/with-prescriptions (Low priority - have alternative)
2. ❌ POST /add-conversation/:contact (Medium priority - might be useful)

---

## Recommendations

### **Priority 1: Implement POST /add-conversation** (if needed)

**If** you want to:
- Save conversation history from Support page
- Track user interactions (clinical/behavioural/emotional)
- Display conversation history in dashboard

**Then** implement this endpoint.

**Otherwise**, skip it since Support page uses external iframe.

---

### **Priority 2: Consider GET /get-user/:contact/with-prescriptions** (optional)

**If** you need:
- Lighter API responses (prescriptions only, no conversations)
- Better performance for pages that don't need conversations

**Then** implement this endpoint.

**Otherwise**, continue using `/with-all-data` everywhere.

---

## Current API Coverage

### Endpoints We Use Regularly:

- ✅ `sendWhatsAppOtp()` - Onboarding OTP flow
- ✅ `verifyWhatsAppOtp()` - Onboarding OTP verification
- ✅ `getUser()` - Fetch user data during onboarding
- ✅ `getUserWithAllData()` - Dashboard data (prescriptions + conversations)
- ✅ `createPrescription()` - Photo upload during onboarding
- ✅ `updateUserByContact()` - Update user details (name, phone, address)

### Endpoints Not Used:

- ❌ `getUserWithPrescriptions()` - Not implemented (use getAllData instead)
- ❌ `addConversation()` - Not implemented (Support uses iframe)

---

## Action Items

### Required (Based on Current Usage):
- ✅ None - All required endpoints are implemented

### Optional (Future Enhancements):
1. ⚠️ Add `getUserWithPrescriptions()` if we need lighter responses
2. ⚠️ Add `addConversation()` if Support page needs conversation saving

---

## Verification Checklist

- [x] OTP sending works
- [x] OTP verification works
- [x] User data fetching works
- [x] User data with prescriptions works
- [x] User data with all data works
- [x] Photo upload works
- [x] User updates work
- [ ] Conversation adding (not implemented - not needed currently)
- [ ] Lightweight prescriptions endpoint (not implemented - using all-data)

---

## Conclusion

**Current Status**: ✅ **All critical endpoints are implemented**

The missing endpoints (`/with-prescriptions` and `/add-conversation`) are:
- Either covered by existing endpoints (`/with-all-data` includes prescriptions)
- Or not needed for current functionality (Support uses iframe, no conversation saving needed)

**No immediate action required** unless you need:
1. Lighter API responses (add `/with-prescriptions`)
2. Conversation history saving (add `/add-conversation`)

