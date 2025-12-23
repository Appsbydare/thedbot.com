#!/usr/bin/env node

/**
 * Simple License System Setup Script
 * Compatible with all Node.js versions
 */

const crypto = require('crypto');

function generateRandomKey(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function simpleEncrypt(data, key) {
  // Simple XOR encryption for compatibility
  const dataStr = JSON.stringify(data);
  const keyBuffer = Buffer.from(key, 'hex');
  const dataBuffer = Buffer.from(dataStr, 'utf8');
  const encrypted = Buffer.alloc(dataBuffer.length);
  
  for (let i = 0; i < dataBuffer.length; i++) {
    encrypted[i] = dataBuffer[i] ^ keyBuffer[i % keyBuffer.length];
  }
  
  return encrypted.toString('hex');
}

function initializeLicenseDatabase(encryptionKey) {
  const defaultDatabase = {
    licenses: {},
    settings: {
      gracePeriodDays: 7,
      maxValidationsPerDay: 10,
      encryptionKey: encryptionKey
    }
  };

  return simpleEncrypt(defaultDatabase, encryptionKey);
}

function main() {
  console.log('=== License System Setup ===\n');
  
  // Generate keys
  const encryptionKey = generateRandomKey(32);
  const adminApiKey = generateRandomKey(32);
  
  // Initialize database
  const encryptedData = initializeLicenseDatabase(encryptionKey);
  
  console.log('✅ Generated encryption key');
  console.log('✅ Generated admin API key');
  console.log('✅ Initialized license database');
  
  console.log('\n=== Environment Variables ===');
  console.log('Copy these to your Vercel project environment variables:\n');
  
  console.log('LICENSE_ENCRYPTION_KEY=' + encryptionKey);
  console.log('LICENSE_DATA_ENCRYPTED=' + encryptedData);
  console.log('ADMIN_API_KEY=' + adminApiKey);
  
  console.log('\n=== Next Steps ===');
  console.log('1. Add the environment variables to your Vercel project');
  console.log('2. Deploy your application');
  console.log('3. Test the license validation API');
  console.log('4. Generate your first license using the admin API');
  
  console.log('\n=== Test Commands ===');
  console.log('# Test license validation:');
  console.log('curl -X POST https://yourdomain.com/api/license/validate \\');
  console.log('  -H "Content-Type: application/json" \\');
  console.log('  -d \'{"licenseKey":"test","hardwareFingerprint":"test","appVersion":"1.0.0","clientTimestamp":"2024-01-20T10:30:00Z"}\'');
  
  console.log('\n# Generate a test license:');
  console.log('curl -X POST https://yourdomain.com/api/license/admin/generate \\');
  console.log('  -H "Authorization: Bearer ' + adminApiKey + '" \\');
  console.log('  -H "Content-Type: application/json" \\');
  console.log('  -d \'{"userEmail":"test@example.com","productId":"trading-bot-pro","durationDays":365}\'');
  
  console.log('\n=== Setup Complete ===');
}

if (require.main === module) {
  main();
}

module.exports = { generateRandomKey, simpleEncrypt, initializeLicenseDatabase };
