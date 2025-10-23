import crypto from "crypto";
import { LicenseDatabase } from "./validator";

/**
 * Initialize license database with default settings
 * This should be run once to create the initial encrypted data
 */
export function initializeLicenseDatabase(): string {
  const defaultDatabase: LicenseDatabase = {
    licenses: {},
    settings: {
      gracePeriodDays: 7,
      maxValidationsPerDay: 10,
      encryptionKey: process.env.LICENSE_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex')
    }
  };

  // Encrypt the database
  const cipher = crypto.createCipher('aes-256-cbc', defaultDatabase.settings.encryptionKey);
  let encrypted = cipher.update(JSON.stringify(defaultDatabase), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

/**
 * Generate sample license data for testing
 */
export function generateSampleLicenses(): LicenseDatabase {
  const now = new Date();
  const oneYearFromNow = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000));

  return {
    licenses: {
      "ABCD-1234-EFGH-5678": {
        id: "ABCD-1234-EFGH-5678",
        userEmail: "test@example.com",
        createdAt: now.toISOString(),
        expiresAt: oneYearFromNow.toISOString(),
        hardwareFingerprint: "CPU123-MAC456",
        status: "active",
        lastValidated: "",
        validationCount: 0,
        maxOfflineDays: 7,
        productId: "trading-bot-pro"
      },
      "WXYZ-9876-QRST-4321": {
        id: "WXYZ-9876-QRST-4321",
        userEmail: "demo@example.com",
        createdAt: now.toISOString(),
        expiresAt: oneYearFromNow.toISOString(),
        hardwareFingerprint: "",
        status: "active",
        lastValidated: "",
        validationCount: 0,
        maxOfflineDays: 7,
        productId: "trading-bot-basic"
      }
    },
    settings: {
      gracePeriodDays: 7,
      maxValidationsPerDay: 10,
      encryptionKey: process.env.LICENSE_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex')
    }
  };
}

/**
 * Script to initialize the license system
 * Run this once to set up your environment variables
 */
export function setupLicenseSystem() {
  console.log("=== License System Setup ===");
  
  // Generate encryption key
  const encryptionKey = crypto.randomBytes(32).toString('hex');
  console.log("Generated encryption key:", encryptionKey);
  
  // Generate admin API key
  const adminApiKey = crypto.randomBytes(32).toString('hex');
  console.log("Generated admin API key:", adminApiKey);
  
  // Initialize database
  const encryptedData = initializeLicenseDatabase();
  console.log("Encrypted license data length:", encryptedData.length);
  
  console.log("\n=== Environment Variables to Set ===");
  console.log("LICENSE_ENCRYPTION_KEY=" + encryptionKey);
  console.log("LICENSE_DATA_ENCRYPTED=" + encryptedData);
  console.log("ADMIN_API_KEY=" + adminApiKey);
  
  console.log("\n=== Next Steps ===");
  console.log("1. Add these environment variables to your Vercel project");
  console.log("2. Test the license validation API");
  console.log("3. Generate your first license using the admin API");
  
  return {
    encryptionKey,
    adminApiKey,
    encryptedData
  };
}
