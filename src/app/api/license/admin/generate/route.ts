import { NextRequest, NextResponse } from 'next/server';
import { LicenseValidator } from '@/lib/license/validator';

// Simple admin authentication (you should implement proper auth)
function isAdminAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminKey = process.env.ADMIN_API_KEY;
  
  if (!adminKey) {
    console.error('ADMIN_API_KEY environment variable not set');
    return false;
  }
  
  return authHeader === `Bearer ${adminKey}`;
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    if (!isAdminAuthorized(request)) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized access',
        error: 'UNAUTHORIZED'
      }, { status: 401 });
    }

    const body = await request.json();
    const { userEmail, productId, durationDays = 365 } = body;

    // Validate required fields
    if (!userEmail || !productId) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: userEmail, productId',
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
    
    // Generate license
    const licenseKey = await validator.createLicense(userEmail, productId, durationDays);
    
    return NextResponse.json({
      success: true,
      message: 'License generated successfully',
      data: {
        licenseKey,
        userEmail,
        productId,
        durationDays
      }
    });

  } catch (error) {
    console.error('License generation API error:', error);
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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
