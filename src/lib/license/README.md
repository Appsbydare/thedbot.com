# License Management System

## Overview
This module provides a complete license validation system for your Windows application using environment variables for secure data storage.

## Architecture
```
Windows EXE → License Validation API → Encrypted Environment Variables
```

## File Structure
```
src/lib/license/
├── validator.ts          # Core license validation logic
├── initializer.ts        # Setup and initialization utilities
└── README.md            # This documentation

src/app/api/license/
├── validate/route.ts     # Public license validation endpoint
└── admin/generate/route.ts # Admin license generation endpoint
```

## Environment Variables Required

### Required Variables
```bash
LICENSE_ENCRYPTION_KEY=your_32_byte_hex_key
LICENSE_DATA_ENCRYPTED=encrypted_json_data
ADMIN_API_KEY=your_admin_api_key
```

### How to Generate
Run the setup script to generate all required keys:
```typescript
import { setupLicenseSystem } from '@/lib/license/initializer';
setupLicenseSystem();
```

## API Endpoints

### 1. License Validation
**Endpoint:** `POST /api/license/validate`

**Request Body:**
```json
{
  "licenseKey": "ABCD-1234-EFGH-5678",
  "hardwareFingerprint": "CPU123-MAC456",
  "appVersion": "1.0.0",
  "clientTimestamp": "2024-01-20T10:30:00Z"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "License valid",
  "data": {
    "expiresAt": "2024-12-31T23:59:59Z",
    "daysRemaining": 345,
    "maxOfflineDays": 7
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid license key",
  "error": "INVALID_LICENSE"
}
```

### 2. License Generation (Admin)
**Endpoint:** `POST /api/license/admin/generate`

**Headers:**
```
Authorization: Bearer your_admin_api_key
```

**Request Body:**
```json
{
  "userEmail": "customer@example.com",
  "productId": "trading-bot-pro",
  "durationDays": 365
}
```

**Response:**
```json
{
  "success": true,
  "message": "License generated successfully",
  "data": {
    "licenseKey": "ABCD-1234-EFGH-5678",
    "userEmail": "customer@example.com",
    "productId": "trading-bot-pro",
    "durationDays": 365
  }
}
```

## License Data Structure

### License Object
```typescript
interface LicenseData {
  id: string;                    // License key
  userEmail: string;             // Customer email
  createdAt: string;             // Creation timestamp
  expiresAt: string;             // Expiration timestamp
  hardwareFingerprint: string;   // Hardware binding
  status: 'active' | 'expired' | 'revoked' | 'suspended';
  lastValidated: string;         // Last validation timestamp
  validationCount: number;       // Daily validation count
  maxOfflineDays: number;        // Grace period for offline usage
  productId: string;             // Product identifier
}
```

### Database Structure
```typescript
interface LicenseDatabase {
  licenses: Record<string, LicenseData>;
  settings: {
    gracePeriodDays: number;     // Default grace period
    maxValidationsPerDay: number; // Daily validation limit
    encryptionKey: string;       // Encryption key
  };
}
```

## Security Features

### 1. Data Encryption
- All license data is encrypted using AES-256-CBC
- Encryption key stored in environment variables
- No sensitive data in source code

### 2. Hardware Binding
- Licenses are bound to hardware fingerprint
- Allows up to 2 hardware changes
- Prevents license sharing

### 3. Rate Limiting
- Maximum validations per day per license
- Prevents abuse and brute force attacks

### 4. Admin Protection
- Admin API requires authentication
- Separate API key for admin operations

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_LICENSE` | License key not found |
| `LICENSE_INACTIVE` | License is suspended/revoked |
| `LICENSE_EXPIRED` | License has expired |
| `HARDWARE_MISMATCH` | Hardware fingerprint doesn't match |
| `VALIDATION_LIMIT_EXCEEDED` | Daily validation limit reached |
| `CONFIG_ERROR` | Server configuration issue |
| `INTERNAL_ERROR` | Server internal error |

## Windows Application Integration

### Hardware Fingerprint Generation
```typescript
// In your Windows application
const hardwareFingerprint = LicenseValidator.generateHardwareFingerprint(
  cpuId,      // Get from WMI or registry
  macAddress  // Get from network adapter
);
```

### License Validation Request
```typescript
const response = await fetch('https://yourdomain.com/api/license/validate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    licenseKey: userLicenseKey,
    hardwareFingerprint: hardwareFingerprint,
    appVersion: '1.0.0',
    clientTimestamp: new Date().toISOString()
  })
});

const result = await response.json();
if (!result.success) {
  // Handle license error
  showLicenseError(result.message);
} else {
  // License is valid
  const daysRemaining = result.data.daysRemaining;
  showLicenseInfo(daysRemaining);
}
```

## Setup Instructions

### 1. Initialize License System
```bash
# Run this once to generate environment variables
npm run setup-license
```

### 2. Add Environment Variables to Vercel
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the three required variables

### 3. Test the System
```bash
# Test license validation
curl -X POST https://yourdomain.com/api/license/validate \
  -H "Content-Type: application/json" \
  -d '{"licenseKey":"ABCD-1234-EFGH-5678","hardwareFingerprint":"CPU123-MAC456","appVersion":"1.0.0","clientTimestamp":"2024-01-20T10:30:00Z"}'

# Generate a test license (replace with your admin key)
curl -X POST https://yourdomain.com/api/license/admin/generate \
  -H "Authorization: Bearer your_admin_api_key" \
  -H "Content-Type: application/json" \
  -d '{"userEmail":"test@example.com","productId":"trading-bot-pro","durationDays":365}'
```

## Maintenance

### Adding New Licenses
Use the admin API or create a simple admin interface to generate licenses for customers.

### Updating License Data
The system automatically updates validation timestamps and counts. For manual updates, you'll need to decrypt, modify, and re-encrypt the data.

### Backup
Regularly backup your environment variables, especially the `LICENSE_DATA_ENCRYPTED` variable.

## Migration to Database
When you outgrow the JSON approach (1000+ customers), you can migrate to:
- Vercel Postgres
- PlanetScale
- Supabase
- Any other database service

The API structure remains the same, only the data storage layer changes.

## Troubleshooting

### Common Issues
1. **"License service configuration error"** - Check environment variables
2. **"Invalid license key"** - License doesn't exist in database
3. **"Hardware mismatch"** - Customer changed hardware
4. **"Daily validation limit exceeded"** - Too many validation requests

### Debug Mode
Add logging to track validation attempts and identify issues.

## Security Best Practices
1. Never commit environment variables to Git
2. Use HTTPS for all API calls
3. Implement proper admin authentication
4. Regular security audits
5. Monitor for unusual validation patterns
6. Keep encryption keys secure and rotate periodically
