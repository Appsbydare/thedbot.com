import { NextRequest, NextResponse } from 'next/server';
import { LicenseValidator, ValidationRequest } from '@/lib/license/validator';

export async function POST(request: NextRequest) {
  try {
    const body: ValidationRequest = await request.json();
    
    // Validate required fields
    if (!body.licenseKey || !body.hardwareFingerprint || !body.appVersion) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields',
        error: 'INVALID_REQUEST'
      }, { status: 400 });
    }

    // Initialize validator
    const encryptionKey = process.env.LICENSE_ENCRYPTION_KEY;
    if (!encryptionKey) {
      console.error('LICENSE_ENCRYPTION_KEY environment variable not set');
      return NextResponse.json({
        success: false,
        message: 'License service configuration error',
        error: 'CONFIG_ERROR'
      }, { status: 500 });
    }

    const validator = new LicenseValidator(encryptionKey);
    
    // Validate license
    const result = await validator.validateLicense(body);
    
    // Return appropriate status code
    const statusCode = result.success ? 200 : 400;
    
    return NextResponse.json(result, { status: statusCode });

  } catch (error) {
    console.error('License validation API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
