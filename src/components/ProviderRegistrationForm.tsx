'use client';

import { useState } from 'react';

interface ProviderRegistrationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  telegramUsername: string;

  // Experience
  yearsOfExperience: string;
  tradingStyle: 'scalping' | 'day-trading' | 'swing' | 'long-term' | '';
  specialization: 'forex' | 'digital-assets' | 'stocks' | 'indices' | 'mixed' | '';
  averageMonthlyVolume: string;

  // Performance Metrics
  winRate: string;
  averageProfitPerTrade: string;
  maxDrawdown: string;
  sharpeRatio: string;
  totalSignalsSent: string;

  // Risk Management
  riskLevel: 'low' | 'medium' | 'high' | '';
  maxLeverage: string;
  stopLossStrategy: string;

  // Business Information
  telegramChannelUrl: string;
  website?: string;
  linkedin?: string;
  description: string;

  // Verification Documents
  tradingStatement: File | null;
  idDocument: File | null;
  certificate?: File | null;

  // Terms and Agreement
  agreeToTerms: boolean;
  agreeToDataProcessing: boolean;
}

export default function ProviderRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProviderRegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    telegramUsername: '',
    yearsOfExperience: '',
    tradingStyle: '',
    specialization: '',
    averageMonthlyVolume: '',
    winRate: '',
    averageProfitPerTrade: '',
    maxDrawdown: '',
    sharpeRatio: '',
    totalSignalsSent: '',
    riskLevel: '',
    maxLeverage: '',
    stopLossStrategy: '',
    telegramChannelUrl: '',
    website: '',
    linkedin: '',
    description: '',
    tradingStatement: null,
    idDocument: null,
    certificate: null,
    agreeToTerms: false,
    agreeToDataProcessing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (field: keyof ProviderRegistrationData, value: string | File | null | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: 'tradingStatement' | 'idDocument' | 'certificate', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone && formData.country);
      case 2:
        return !!(formData.yearsOfExperience && formData.tradingStyle && formData.specialization);
      case 3:
        return !!(formData.winRate && formData.averageProfitPerTrade && formData.maxDrawdown && formData.sharpeRatio);
      case 4:
        return !!(formData.riskLevel && formData.stopLossStrategy && formData.telegramChannelUrl && formData.description);
      case 5:
        return !!(formData.tradingStatement && formData.idDocument && formData.agreeToTerms && formData.agreeToDataProcessing);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(5)) {
      setSubmitMessage('Please complete all required fields and accept the terms.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your API
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitMessage('Registration submitted successfully! We will review your application and contact you within 3-5 business days.');

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        telegramUsername: '',
        yearsOfExperience: '',
        tradingStyle: '',
        specialization: '',
        averageMonthlyVolume: '',
        winRate: '',
        averageProfitPerTrade: '',
        maxDrawdown: '',
        sharpeRatio: '',
        totalSignalsSent: '',
        riskLevel: '',
        maxLeverage: '',
        stopLossStrategy: '',
        telegramChannelUrl: '',
        website: '',
        linkedin: '',
        description: '',
        tradingStatement: null,
        idDocument: null,
        certificate: null,
        agreeToTerms: false,
        agreeToDataProcessing: false,
      });
      setCurrentStep(1);

    } catch {
      setSubmitMessage('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === currentStep
              ? 'bg-blue-600 text-white'
              : step < currentStep
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {step < currentStep ? '✓' : step}
          </div>
          {step < 5 && (
            <div className={`w-12 h-0.5 mx-2 ${
              step < currentStep ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {renderStepIndicator()}

      {submitMessage && (
        <div className={`p-4 rounded-lg ${submitMessage.includes('successfully') ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
          {submitMessage}
        </div>
      )}

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="SG">Singapore</option>
                <option value="AE">UAE</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Telegram Username
              </label>
              <input
                type="text"
                value={formData.telegramUsername}
                onChange={(e) => handleInputChange('telegramUsername', e.target.value)}
                placeholder="@yourusername"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Execution Experience */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Execution Experience</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Years of Experience *
              </label>
              <select
                value={formData.yearsOfExperience}
                onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Experience</option>
                <option value="1-2">1-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Execution Style *
              </label>
              <select
                value={formData.tradingStyle}
                onChange={(e) => handleInputChange('tradingStyle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Style</option>
                <option value="scalping">Scalping</option>
                <option value="day-trading">Day Execution</option>
                <option value="swing">Swing Entries</option>
                <option value="long-term">Long-term Investing</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Specialization *
              </label>
              <select
                value={formData.specialization}
                onChange={(e) => handleInputChange('specialization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Specialization</option>
                <option value="forex">Forex</option>
                <option value="digital-assets">Digital Assets</option>
                <option value="stocks">Stocks</option>
                <option value="indices">Indices</option>
                <option value="mixed">Mixed/Portfolio</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Average Monthly Volume
              </label>
              <input
                type="text"
                value={formData.averageMonthlyVolume}
                onChange={(e) => handleInputChange('averageMonthlyVolume', e.target.value)}
                placeholder="e.g., $100,000"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Performance Metrics */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Metrics</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please provide your historical performance data for evaluation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Win Rate (%) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.winRate}
                onChange={(e) => handleInputChange('winRate', e.target.value)}
                placeholder="e.g., 68.5"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Average Profit per Trade (%) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.averageProfitPerTrade}
                onChange={(e) => handleInputChange('averageProfitPerTrade', e.target.value)}
                placeholder="e.g., 1.25"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Maximum Drawdown (%) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.maxDrawdown}
                onChange={(e) => handleInputChange('maxDrawdown', e.target.value)}
                placeholder="e.g., 12.3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sharpe Ratio *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.sharpeRatio}
                onChange={(e) => handleInputChange('sharpeRatio', e.target.value)}
                placeholder="e.g., 1.85"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Total Signals Sent
            </label>
            <input
              type="number"
              value={formData.totalSignalsSent}
              onChange={(e) => handleInputChange('totalSignalsSent', e.target.value)}
              placeholder="e.g., 1247"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Step 4: Risk Management & Business Info */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Management & Business Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Risk Level *
              </label>
              <select
                value={formData.riskLevel}
                onChange={(e) => handleInputChange('riskLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Risk Level</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Maximum Leverage Used
              </label>
              <input
                type="text"
                value={formData.maxLeverage}
                onChange={(e) => handleInputChange('maxLeverage', e.target.value)}
                placeholder="e.g., 10:1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Stop Loss Strategy *
            </label>
            <textarea
              value={formData.stopLossStrategy}
              onChange={(e) => handleInputChange('stopLossStrategy', e.target.value)}
              rows={3}
              placeholder="Describe your stop loss strategy and risk management approach..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Telegram Channel URL *
            </label>
            <input
              type="url"
              value={formData.telegramChannelUrl}
              onChange={(e) => handleInputChange('telegramChannelUrl', e.target.value)}
              placeholder="https://t.me/your_channel"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website (Optional)
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LinkedIn Profile (Optional)
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              placeholder="Describe your strategy, experience, and what makes you unique as a signal provider..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      )}

      {/* Step 5: Document Upload & Terms */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Document Upload & Terms</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Strategy Statement (3-6 months) *
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange('tradingStatement', e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Upload a recent statement (PDF preferred, max 5MB)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Government ID Document *
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange('idDocument', e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Upload a clear photo/scan of your passport or driver&apos;s license (max 5MB)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Professional Certificate (Optional)
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange('certificate', e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Upload any relevant certificates or qualifications (max 5MB)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the{' '}
                <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:text-blue-800">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:text-blue-800">
                  Privacy Policy
                </a>{' '}
                *
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToDataProcessing"
                checked={formData.agreeToDataProcessing}
                onChange={(e) => handleInputChange('agreeToDataProcessing', e.target.checked)}
                className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="agreeToDataProcessing" className="text-sm text-gray-700 dark:text-gray-300">
                I consent to the processing of my personal data for the purpose of evaluating my application as a signal provider *
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-6 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {currentStep < 5 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!validateStep(currentStep)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || !validateStep(5)}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        )}
      </div>
    </form>
  );
}
