import { NextRequest, NextResponse } from 'next/server';
import { LicensesRepo } from '@/lib/repos';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { licenseKey, hardwareFingerprint, appVersion, clientTimestamp } = body;

    // Validate required fields
    if (!licenseKey || !hardwareFingerprint) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: licenseKey, hardwareFingerprint',
        data: {}
      }, { status: 400 });
    }

    // Get license from database
    const license = LicensesRepo.get(licenseKey);

    if (!license) {
      return NextResponse.json({
        success: false,
        message: 'License not found',
        data: {}
      }, { status: 404 });
    }

    // Check if license is revoked
    if (license.status === 'revoked') {
      return NextResponse.json({
        success: false,
        message: 'License has been revoked',
        data: {}
      }, { status: 403 });
    }

    // Check hardware fingerprint match
    if (license.hardwareFingerprint && license.hardwareFingerprint !== hardwareFingerprint) {
      return NextResponse.json({
        success: false,
        message: 'Hardware fingerprint mismatch. This license is bound to a different computer.',
        data: {
          expectedFingerprint: license.hardwareFingerprint,
          providedFingerprint: hardwareFingerprint
        }
      }, { status: 403 });
    }

    // Check expiration
    const now = Date.now();
    if (license.expiresAt && license.expiresAt < now) {
      return NextResponse.json({
        success: false,
        message: 'License has expired',
        data: {
          expiresAt: new Date(license.expiresAt).toISOString(),
          expiredDaysAgo: Math.floor((now - license.expiresAt) / (1000 * 60 * 60 * 24))
        }
      }, { status: 403 });
    }

    // Calculate days remaining
    const daysRemaining = license.expiresAt 
      ? Math.floor((license.expiresAt - now) / (1000 * 60 * 60 * 24))
      : 999999; // Lifetime license

    // License is valid!
    return NextResponse.json({
      success: true,
      message: 'License valid',
      data: {
        licenseKey: license.key,
        status: license.status,
        expiresAt: license.expiresAt ? new Date(license.expiresAt).toISOString() : null,
        daysRemaining,
        productId: license.productId,
        hardwareFingerprint: license.hardwareFingerprint
      }
    });

  } catch (error) {
    console.error('License validation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      data: {}
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
