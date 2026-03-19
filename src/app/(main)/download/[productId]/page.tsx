'use client'

import Link from 'next/link'
import { ArrowLeft, Download, CheckCircle } from '@/components/icons'
import { getProductDownload } from '@/data/downloads'

export default function DownloadPage({ params }: { params: { productId: string } }) {
  const downloadInfo = getProductDownload(params.productId)

  if (!downloadInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Download Not Found</h1>
          <Link href="/products" className="text-blue-400 hover:text-blue-300">
            ← Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const latestVersion = downloadInfo.versions.find(v => v.isLatest)

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link 
            href={`/products/${params.productId}`}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Product
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
            <Download className="size-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-heading text-white mb-4">
            Download {downloadInfo.productName}
          </h1>
          <p className="text-xl text-gray-300">
            {downloadInfo.description}
          </p>
        </div>

        {/* Latest Version Download */}
        {latestVersion && (
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                LATEST
              </span>
              <span className="text-white font-semibold text-lg">
                Version {latestVersion.version}
              </span>
              <span className="text-blue-200 text-sm">
                ({latestVersion.fileSize})
              </span>
            </div>
            
            <p className="text-blue-100 mb-6">
              Released on {new Date(latestVersion.releaseDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>

            <a
              href={latestVersion.downloadUrl}
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              <Download className="size-6" />
              Download for Windows
            </a>

            <p className="text-blue-100 text-sm mt-4">
              ⚠️ You will need a valid license key to activate the application
            </p>
          </div>
        )}

        {/* What's New */}
        {latestVersion && (
          <div className="bg-gray-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-heading text-white mb-4">What&apos;s New in {latestVersion.version}</h2>
            <ul className="space-y-2">
              {latestVersion.changelog.map((change, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="size-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* System Requirements */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-heading text-white mb-4">System Requirements</h2>
          <ul className="space-y-2">
            {downloadInfo.systemRequirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <CheckCircle className="size-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Installation Instructions */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-heading text-white mb-4">Installation Instructions</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Download the application</h3>
                <p className="text-gray-300 text-sm">Click the download button above to get the latest version.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Run the installer</h3>
                <p className="text-gray-300 text-sm">Double-click the downloaded file and follow the installation wizard.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Get your hardware fingerprint</h3>
                <p className="text-gray-300 text-sm mb-2">
                  When you first run the app, it will display your hardware fingerprint. Copy this for purchasing.
                </p>
                <Link 
                  href="/get-fingerprint"
                  className="text-blue-400 hover:text-blue-300 text-sm underline"
                >
                  Learn more about hardware fingerprints →
                </Link>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Purchase a license</h3>
                <p className="text-gray-300 text-sm mb-2">
                  Use your hardware fingerprint to purchase a license key.
                </p>
                <Link 
                  href={`/products/${params.productId}`}
                  className="text-blue-400 hover:text-blue-300 text-sm underline"
                >
                  Purchase license →
                </Link>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                5
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Activate your license</h3>
                <p className="text-gray-300 text-sm">
                  Enter your license key in the app to activate and start executing!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-heading text-white mb-2">Need Help?</h3>
          <p className="text-gray-300 mb-4">
            Our support team is here to assist with installation and activation.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  )
}



