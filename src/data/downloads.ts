/**
 * Download links configuration
 * 
 * To update download links:
 * 1. Upload your .exe to GitHub Releases or other hosting
 * 2. Update the downloadUrl below
 * 3. Update version number and changelog
 */

export type DownloadVersion = {
  version: string;
  releaseDate: string;
  downloadUrl: string;
  fileSize: string;
  changelog: string[];
  isLatest: boolean;
}

export type ProductDownload = {
  productId: string;
  productName: string;
  description: string;
  systemRequirements: string[];
  versions: DownloadVersion[];
}

export const downloads: ProductDownload[] = [
  {
    productId: 'telegram-auto-executor',
    productName: 'Telegram Auto Executor (AutoTrader Gold V8)',
    description: 'Professional automation bridge that moves Telegram signal instructions into MetaTrader 5.',
    systemRequirements: [
      'Windows 10 or later (64-bit)',
      'MetaTrader 5 platform installed',
      'Active Telegram account',
      'Stable internet connection',
      'Minimum 4GB RAM',
      'Valid license key',
    ],
    versions: [
      {
        version: 'V8.2.11',
        releaseDate: '2024-10-20',
        // TODO: Replace with your actual GitHub release URL or hosting URL
        downloadUrl: 'https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v8.2.11/AutoExecutor_V8.2.11.exe',
        fileSize: '45 MB',
        changelog: [
          'Enhanced signal parsing with 35+ regex patterns',
          'Multi-Take Profit and Trailing Stop strategies',
          'Improved PyQt5 GUI with dark theme',
          'Better error handling and logging',
          'Hardware-based license system',
        ],
        isLatest: true,
      },
      // Add older versions here if needed
    ],
  },
  // Add more products here as needed
];

/**
 * Get download info for a specific product
 */
export function getProductDownload(productId: string): ProductDownload | undefined {
  return downloads.find(d => d.productId === productId);
}

/**
 * Get latest version for a product
 */
export function getLatestVersion(productId: string): DownloadVersion | undefined {
  const product = getProductDownload(productId);
  return product?.versions.find(v => v.isLatest);
}



