import crypto from "crypto";

export interface LicenseData {
  id: string;
  userEmail: string;
  createdAt: string;
  expiresAt: string;
  hardwareFingerprint: string;
  status: 'active' | 'expired' | 'revoked' | 'suspended';
  lastValidated: string;
  validationCount: number;
  maxOfflineDays: number;
  productId: string;
}

export interface LicenseDatabase {
  licenses: Record<string, LicenseData>;
  settings: {
    gracePeriodDays: number;
    maxValidationsPerDay: number;
    encryptionKey: string;
  };
}

export interface ValidationRequest {
  licenseKey: string;
  hardwareFingerprint: string;
  appVersion: string;
  clientTimestamp: string;
}

export interface ValidationResponse {
  success: boolean;
  message: string;
  data?: {
    expiresAt: string;
    daysRemaining: number;
    maxOfflineDays: number;
  };
  error?: string;
}

export class LicenseValidator {
  private encryptionKey: string;

  constructor(encryptionKey: string) {
    this.encryptionKey = encryptionKey;
  }

  /**
   * Decrypt license data from environment variable
   */
  private decryptLicenseData(encryptedData: string): LicenseDatabase | null {
    try {
      // Handle both old format (without IV) and new format (with IV)
      if (encryptedData.includes(':')) {
        // New format with IV
        const textParts = encryptedData.split(':');
        if (textParts.length !== 2) {
          throw new Error("Invalid encrypted data format");
        }
        const iv = Buffer.from(textParts[0], 'hex');
        const encryptedText = textParts[1];
        const keyBuffer = crypto.scryptSync(this.encryptionKey, 'salt', 32);
        const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
      } else {
        // Old format without IV - use simple XOR decryption
        const keyBuffer = Buffer.from(this.encryptionKey, 'hex');
        const dataBuffer = Buffer.from(encryptedData, 'hex');
        const decrypted = Buffer.alloc(dataBuffer.length);
        
        for (let i = 0; i < dataBuffer.length; i++) {
          decrypted[i] = dataBuffer[i] ^ keyBuffer[i % keyBuffer.length];
        }
        
        return JSON.parse(decrypted.toString('utf8'));
      }
    } catch (error) {
      console.error('Failed to decrypt license data:', error);
      return null;
    }
  }

  /**
   * Encrypt license data for storage
   */
  private encryptLicenseData(data: LicenseDatabase): string {
    // Use simple XOR encryption to match the setup script
    const dataStr = JSON.stringify(data);
    const keyBuffer = Buffer.from(this.encryptionKey, 'hex');
    const dataBuffer = Buffer.from(dataStr, 'utf8');
    const encrypted = Buffer.alloc(dataBuffer.length);
    
    for (let i = 0; i < dataBuffer.length; i++) {
      encrypted[i] = dataBuffer[i] ^ keyBuffer[i % keyBuffer.length];
    }
    
    return encrypted.toString('hex');
  }

  /**
   * Get license database from environment
   */
  private getLicenseDatabase(): LicenseDatabase | null {
    const encryptedData = process.env.LICENSE_DATA_ENCRYPTED;
    if (!encryptedData) {
      console.error('LICENSE_DATA_ENCRYPTED environment variable not set');
      return null;
    }
    return this.decryptLicenseData(encryptedData);
  }

  /**
   * Validate a license key
   */
  async validateLicense(request: ValidationRequest): Promise<ValidationResponse> {
    try {
      const db = this.getLicenseDatabase();
      if (!db) {
        return {
          success: false,
          message: 'License service unavailable',
          error: 'DATABASE_ERROR'
        };
      }

      const license = db.licenses[request.licenseKey];
      if (!license) {
        return {
          success: false,
          message: 'Invalid license key',
          error: 'INVALID_LICENSE'
        };
      }

      // Check if license is active
      if (license.status !== 'active') {
        return {
          success: false,
          message: `License is ${license.status}`,
          error: 'LICENSE_INACTIVE'
        };
      }

      // Check if license has expired
      const now = new Date();
      const expiresAt = new Date(license.expiresAt);
      if (now > expiresAt) {
        return {
          success: false,
          message: 'License has expired',
          error: 'LICENSE_EXPIRED'
        };
      }

      // Check hardware fingerprint (allow some flexibility)
      if (!this.isHardwareFingerprintValid(license.hardwareFingerprint, request.hardwareFingerprint)) {
        return {
          success: false,
          message: 'License is bound to different hardware',
          error: 'HARDWARE_MISMATCH'
        };
      }

      // Check daily validation limit
      const today = new Date().toISOString().split('T')[0];
      const lastValidationDate = new Date(license.lastValidated).toISOString().split('T')[0];
      
      if (today === lastValidationDate && license.validationCount >= db.settings.maxValidationsPerDay) {
        return {
          success: false,
          message: 'Daily validation limit exceeded',
          error: 'VALIDATION_LIMIT_EXCEEDED'
        };
      }

      // Update validation info
      license.lastValidated = now.toISOString();
      license.validationCount = today === lastValidationDate ? license.validationCount + 1 : 1;

      // Calculate days remaining
      const daysRemaining = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      return {
        success: true,
        message: 'License valid',
        data: {
          expiresAt: license.expiresAt,
          daysRemaining,
          maxOfflineDays: license.maxOfflineDays
        }
      };

    } catch (error) {
      console.error('License validation error:', error);
      return {
        success: false,
        message: 'Internal server error',
        error: 'INTERNAL_ERROR'
      };
    }
  }

  /**
   * Check if hardware fingerprint is valid (allows some changes)
   */
  private isHardwareFingerprintValid(stored: string, current: string): boolean {
    if (stored === current) return true;
    
    // Allow up to 2 changes in hardware fingerprint
    const storedParts = stored.split('-');
    const currentParts = current.split('-');
    
    if (storedParts.length !== currentParts.length) return false;
    
    let differences = 0;
    for (let i = 0; i < storedParts.length; i++) {
      if (storedParts[i] !== currentParts[i]) {
        differences++;
        if (differences > 2) return false;
      }
    }
    
    return true;
  }

  /**
   * Generate hardware fingerprint from system info
   */
  static generateHardwareFingerprint(cpuId: string, macAddress: string): string {
    const combined = `${cpuId}-${macAddress}`;
    const hash = crypto.createHash('sha256').update(combined).digest('hex');
    return hash.substring(0, 16).toUpperCase();
  }

  /**
   * Create new license
   */
  async createLicense(
    userEmail: string, 
    productId: string, 
    durationDays: number = 365
  ): Promise<string> {
    const db = this.getLicenseDatabase();
    if (!db) {
      throw new Error('License database unavailable');
    }

    const licenseKey = this.generateLicenseKey(productId, userEmail);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (durationDays * 24 * 60 * 60 * 1000));

    const newLicense: LicenseData = {
      id: licenseKey,
      userEmail,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      hardwareFingerprint: '', // Will be set on first validation
      status: 'active',
      lastValidated: '',
      validationCount: 0,
      maxOfflineDays: db.settings.gracePeriodDays,
      productId
    };

    db.licenses[licenseKey] = newLicense;
    
    // Update environment variable (this would need to be done via API)
    // For now, return the license key
    return licenseKey;
  }

  /**
   * Generate license key
   */
  private generateLicenseKey(productId: string, userEmail: string): string {
    const raw = `${productId}:${userEmail}:${crypto.randomUUID()}`;
    const hash = crypto.createHash("sha256").update(raw).digest("hex");
    const parts = [hash.slice(0, 8), hash.slice(8, 16), hash.slice(16, 24), hash.slice(24, 32)];
    return parts.join("-").toUpperCase();
  }
}
