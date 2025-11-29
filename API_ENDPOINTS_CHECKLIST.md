# API Endpoints Implementation Checklist

## 📋 Complete Endpoint Comparison

### ✅ **IMPLEMENTED ENDPOINTS (6/8 = 75%)**

| # | Endpoint | Status | Function | File | Usage |
|---|----------|--------|----------|------|-------|
| 1 | **GET /sendWAOTPUser** | ✅ | `sendWhatsAppOtp()` | `utils/otpService.ts` | Onboarding Step 2 |
| 2 | **GET /VerifyWAOTPUser** | ✅ | `verifyWhatsAppOtp()` | `utils/otpService.ts` | Onboarding Step 2 |
| 3 | **GET /get-user/:contact** | ✅ | `getUser()` | `utils/formialApi.ts` | Onboarding, Auth checks |
| 4 | **GET /get-user/:contact/with-all-data** | ✅ | `getUserWithAllData()` | `utils/formialApi.ts` | Dashboard, Completion check |
| 5 | **POST /prescription** | ✅ | `createPrescription()` | `utils/formialApi.ts` | Photo upload |
| 6 | **PATCH /update-user/:contact** | ✅ | `updateUserByContact()` | `utils/formialApi.ts` | User updates |

---

### ⚠️ **MISSING ENDPOINTS (2/8 = 25%)**

| # | Endpoint | Status | Impact | Recommendation |
|---|----------|--------|--------|----------------|
| 7 | **GET /get-user/:contact/with-prescriptions** | ❌ | **LOW** | Optional - We use `/with-all-data` instead |
| 8 | **POST /add-conversation/:contact** | ❌ | **MEDIUM** | Optional - Support page uses iframe |

---

## 🔍 Detailed Endpoint Verification

### 1. ✅ GET /sendWAOTPUser

**Specification:**
- Query params: `phonenumber`, `name` (optional)
- Response: OTP string or phone number
- Phone format: No "+" sign, country code only (e.g., `91800xxxxxx`)

**Our Implementation:**
```typescript
// utils/otpService.ts
sendWhatsAppOtp({ phoneNumber, name })
```

**Verification:**
- ✅ Query params match spec
- ✅ Phone sanitization (removes non-digits)
- ✅ Optional name parameter
- ✅ Returns OTP string or phone number

**Status**: ✅ **CORRECT** - Matches specification

---

### 2. ✅ GET /VerifyWAOTPUser

**Specification:**
- Query params: `phonenumber`, `code`
- Response: `{ message, profile, token? }`
- Cases: User exists/new user

**Our Implementation:**
```typescript
// utils/otpService.ts
verifyWhatsAppOtp({ phoneNumber, code })
```

**Verification:**
- ✅ Query params match spec
- ✅ Returns correct response format
- ✅ Handles all response cases
- ✅ Error handling

**Status**: ✅ **CORRECT** - Matches specification

---

### 3. ✅ GET /get-user/:contact

**Specification:**
- Path param: `:contact` (e.g., `+919656263177`)
- Returns: User object

**Our Implementation:**
```typescript
// utils/formialApi.ts
getUser(contact) // contact is URL encoded
```

**Verification:**
- ✅ Path param correctly encoded
- ✅ Returns `FormialUser` interface
- ✅ Error handling (404, 500)

**Status**: ✅ **CORRECT** - Matches specification

---

### 4. ✅ GET /get-user/:contact/with-all-data

**Specification:**
- Path param: `:contact`
- Returns: `{ user, prescriptions, conversations }`

**Our Implementation:**
```typescript
// utils/formialApi.ts
getUserWithAllData(contact)
```

**Verification:**
- ✅ Path param correctly encoded
- ✅ Returns complete response with all data
- ✅ Used for dashboard and completion checks

**Status**: ✅ **CORRECT** - Matches specification

---

### 5. ⚠️ GET /get-user/:contact/with-prescriptions

**Specification:**
- Path param: `:contact`
- Returns: `{ user, prescriptions }` (no conversations)

**Our Implementation:**
❌ **NOT IMPLEMENTED**

**Why Missing:**
- We use `/with-all-data` everywhere which includes prescriptions
- No use case currently requires lighter response (prescriptions only)

**Impact**: **LOW**
- `/with-all-data` covers our needs
- Can add later if performance optimization needed

**Status**: ⚠️ **OPTIONAL** - Not needed currently

---

### 6. ✅ POST /prescription

**Specification:**
- Query param: `?number={contact}`
- Form data: `front_image`, `left_image`, `right_image` (multipart/form-data)
- Response: `{ success, prescription }`
- Delay: 5-7 seconds

**Our Implementation:**
```typescript
// utils/formialApi.ts
createPrescription(contact, { front_image, left_image, right_image })
```

**Verification:**
- ✅ Query param: `?number={contact}` ✓
- ✅ Multipart/form-data handling ✓
- ✅ Form fields match spec ✓
- ✅ Response interface matches ✓
- ✅ Error handling ✓

**Status**: ✅ **CORRECT** - Matches specification

---

### 7. ❌ POST /add-conversation/:contact

**Specification:**
- Path param: `:contact`
- Body: `{ remark, clinical?, behavioural?, emotional? }`
- Response: `{ message, conversation }`

**Our Implementation:**
❌ **NOT IMPLEMENTED**

**Why Missing:**
- Support page uses external iframe (SagePilot)
- No conversation saving functionality needed currently

**Impact**: **MEDIUM**
- Could be useful if we want to save chat history
- Currently not required

**Potential Use Case:**
- Save conversation remarks from Support page
- Track user interactions

**Status**: ⚠️ **OPTIONAL** - Not needed currently

---

### 8. ✅ PATCH /update-user/:contact

**Specification:**
- Path param: `:contact`
- Body: Partial user object (JSON)
- Returns: Updated user

**Our Implementation:**
```typescript
// utils/formialApi.ts
updateUserByContact(contact, payload)
```

**Verification:**
- ✅ Path param correctly encoded
- ✅ Partial update support
- ✅ JSON body format
- ✅ Returns updated user

**Status**: ✅ **CORRECT** - Matches specification

---

## 📊 Implementation Summary

### Coverage Statistics:
- **Fully Implemented**: 6/8 endpoints (75%)
- **Missing (Optional)**: 2/8 endpoints (25%)

### Critical Endpoints Status:
- ✅ All **required** endpoints are implemented
- ⚠️ Missing endpoints are **optional** (have alternatives or not needed)

---

## 🔍 Potential Issues / Discrepancies

### 1. Phone Number Format Consistency ⚠️

**Issue**: Different endpoints might expect different formats

**Check:**
- ✅ `/sendWAOTPUser` - Expects: `91800xxxxxx` (no +)
- ✅ `/VerifyWAOTPUser` - Expects: `91800xxxxxx` (no +)
- ✅ `/get-user/:contact` - Expects: `+919656263177` (with +)
- ✅ `/prescription?number={contact}` - Should match user format

**Our Handling:**
- OTP endpoints: Sanitize phone (remove +), send digits only
- User endpoints: Use normalized format with +
- Prescription: Uses same contact format as user

**Status**: ✅ **CORRECT** - We handle format differences properly

---

### 2. Base URL Configuration ✅

**Specification**: `https://formialbackend.onrender.com/`

**Our Implementation:**
```typescript
// utils/formialApi.ts
const DEFAULT_API_BASE_URL = "https://formialbackend.onrender.com"

// utils/otpService.ts  
const DEFAULT_API_BASE_URL = "https://formialbackend.onrender.com"
```

**Status**: ✅ **CORRECT** - Base URLs match specification

---

### 3. Authorization Headers ✅

**Specification**: Not explicitly mentioned, but JWT tokens are used

**Our Implementation:**
- ✅ JWT token included in Authorization header when available
- ✅ Token stored after OTP verification

**Status**: ✅ **CORRECT** - Token handling implemented

---

## 🎯 Missing Endpoints Assessment

### Endpoint #7: GET /get-user/:contact/with-prescriptions

**Should We Implement?**
- ❌ **NO** - Not needed currently
- We use `/with-all-data` everywhere
- No performance issues observed
- Simpler codebase with one endpoint

**If Needed Later:**
- Easy to add (similar to existing endpoints)
- Would reduce payload size slightly
- Not a priority

---

### Endpoint #8: POST /add-conversation/:contact

**Should We Implement?**
- ❌ **NO** - Not needed currently
- Support page uses external iframe
- No conversation saving functionality required
- External chat widget handles conversations

**If Needed Later:**
- Useful for saving chat history
- Track user interactions
- Display conversation timeline

**Status**: ⚠️ **OPTIONAL** - Implement only if needed

---

## ✅ Final Verdict

### All Critical Endpoints: ✅ **IMPLEMENTED**

**Required for Current Functionality:**
- ✅ OTP sending/verification
- ✅ User data fetching
- ✅ Photo upload (prescription creation)
- ✅ User updates

**Missing Endpoints:**
- ⚠️ `/with-prescriptions` - Optional (have alternative)
- ⚠️ `/add-conversation` - Optional (not needed currently)

### Conclusion:
**✅ All required endpoints are properly implemented. No critical gaps.**

The 2 missing endpoints are optional enhancements that can be added later if needed.

---

## 📝 Recommendations

### No Action Required:
- ✅ All critical functionality is covered
- ✅ Current endpoints work correctly
- ✅ No breaking changes needed

### Future Enhancements (Optional):
1. Add `/get-user/:contact/with-prescriptions` if we need lighter responses
2. Add `/add-conversation/:contact` if Support page needs conversation saving

### Current Status: **PRODUCTION READY** ✅

