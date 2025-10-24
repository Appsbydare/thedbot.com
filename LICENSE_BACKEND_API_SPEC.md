# License Backend API Specification

## Overview
Your backend at `https://thedbot.com/api/license` needs to handle license generation and validation.

## Required API Endpoints

### 1. Generate License (After Payment)
**Called by:** Payment Gateway Webhook OR Admin Panel

**Endpoint:** `POST /api/license/generate`

**Request Body:**
```json
{
  "email": "customer@example.com",
  "hardwareFingerprint": "D4A04F41A74CF788",
  "plan": "monthly|yearly|lifetime",
  "paymentId": "payment_confirmation_id"
}
```

**Response:**
```json
{
  "success": true,
  "licenseKey": "DBOT-XXXX-XXXX-XXXX-XXXX",
  "expiresAt": "2026-10-24T00:00:00Z",
  "message": "License generated successfully"
}
```

**Backend Actions:**
1. Verify payment was successful
2. Generate unique license key
3. Store in database:
   - License key
   - Hardware fingerprint
   - Email
   - Created date
   - Expiry date
   - Status (active/expired/revoked)
4. Send email to customer with license key
5. Return license key in response

---

### 2. Validate License (Called by App)
**Called by:** Trading Bot Application on Startup

**Endpoint:** `POST /api/license/validate`

**Request Body:**
```json
{
  "licenseKey": "DBOT-XXXX-XXXX-XXXX-XXXX",
  "hardwareFingerprint": "D4A04F41A74CF788",
  "appVersion": "V8_2.11",
  "clientTimestamp": "2025-10-24T12:00:00Z"
}
```

**Response (Valid License):**
```json
{
  "success": true,
  "message": "License valid",
  "data": {
    "licenseKey": "DBOT-XXXX-XXXX-XXXX-XXXX",
    "status": "active",
    "expiresAt": "2026-10-24T00:00:00Z",
    "daysRemaining": 365,
    "email": "customer@example.com"
  }
}
```

**Response (Invalid License):**
```json
{
  "success": false,
  "message": "License not found or expired",
  "data": {}
}
```

**Backend Validation Checks:**
1. License key exists in database
2. License status is "active"
3. Hardware fingerprint matches
4. Not expired (expiresAt > current date)
5. Optional: Check if app version is allowed
6. Log validation attempt (for security)

---

## Database Schema

### licenses table
```sql
CREATE TABLE licenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    license_key VARCHAR(50) UNIQUE NOT NULL,
    hardware_fingerprint VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    plan VARCHAR(20) NOT NULL,
    status ENUM('active', 'expired', 'revoked') DEFAULT 'active',
    created_at DATETIME NOT NULL,
    expires_at DATETIME NOT NULL,
    last_validated_at DATETIME,
    payment_id VARCHAR(100),
    INDEX idx_license_key (license_key),
    INDEX idx_hardware_fp (hardware_fingerprint),
    INDEX idx_email (email)
);
```

---

## Payment Gateway Integration Flow

### After Successful Payment:

1. **Payment Gateway** sends webhook to your backend:
   ```
   POST https://thedbot.com/api/payment/webhook
   ```

2. **Your Backend** receives payment confirmation:
   - Verify payment signature
   - Extract customer email and hardware fingerprint
   - Call internal license generation API
   - Send license key via email

3. **Customer** receives email with:
   - License key
   - Instructions to activate
   - Download link (if needed)

---

## Testing Without Payment Gateway

### Option 1: Manual License Generation (Admin Panel)
Create an admin interface to manually generate licenses for testing:
- Input: Email, Hardware Fingerprint
- Output: License Key
- Send email manually or via script

### Option 2: Direct Database Insert
For quick testing, directly insert into database:
```sql
INSERT INTO licenses (
    license_key, 
    hardware_fingerprint, 
    email, 
    plan, 
    status, 
    created_at, 
    expires_at
) VALUES (
    'DBOT-TEST-1234-5678-ABCD',
    'D4A04F41A74CF788',
    'test@example.com',
    'lifetime',
    'active',
    NOW(),
    DATE_ADD(NOW(), INTERVAL 1 YEAR)
);
```

### Option 3: Test API Endpoint (Development Only)
```
POST /api/license/generate-test
{
  "email": "test@example.com",
  "hardwareFingerprint": "D4A04F41A74CF788"
}
```

---

## Security Considerations

1. **License Key Format:**
   - Use cryptographically secure random generation
   - Include checksum for basic validation
   - Format: `DBOT-XXXX-XXXX-XXXX-XXXX`

2. **Hardware Fingerprint Binding:**
   - Allow 1-2 hardware changes (for reinstalls)
   - Track activation count
   - Lock after suspicious activity

3. **API Security:**
   - Rate limiting on validation endpoint
   - Log all validation attempts
   - Block after multiple failed attempts
   - Use HTTPS only

4. **Payment Verification:**
   - Always verify payment webhook signatures
   - Double-check payment amount
   - Prevent duplicate license generation

---

## Next Steps for Development

1. ✅ Frontend (App) - DONE
   - License dialog created
   - Hardware fingerprint generation
   - API validation integrated

2. ⏳ Backend API - PENDING
   - Implement `/api/license/validate` endpoint
   - Implement `/api/license/generate` endpoint
   - Set up database schema

3. ⏳ Payment Integration - PENDING
   - Configure payment gateway
   - Set up webhook handler
   - Implement automatic license generation

4. ⏳ Admin Panel (Optional)
   - View all licenses
   - Manually generate licenses
   - Revoke/extend licenses
   - View validation logs

