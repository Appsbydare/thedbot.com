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
 * Run this once offline to generate env variables — do NOT call in production routes.
 */
export function setupLicenseSystem() {
  // Generate encryption key
  const encryptionKey = crypto.randomBytes(32).toString('hex');

  // Generate admin API key
  const adminApiKey = crypto.randomBytes(32).toString('hex');

  // Initialize database
  const encryptedData = initializeLicenseDatabase();

  // Return values to be set as env vars — write to .env.local, never log in prod
  return {
    encryptionKey,
    adminApiKey,
    encryptedData
  };
}
