import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSignalProviderBySlug } from '@/data/signalProviders';
import ProviderDashboard from '@/components/ProviderDashboard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const provider = getSignalProviderBySlug(id);

  if (!provider) {
    return {
      title: 'Provider Not Found - theDBot',
    };
  }

  return {
    title: `${provider.name} - Signal Provider Dashboard | theDBot`,
    description: `View ${provider.name}'s detailed performance analytics, trading statistics, and signal history. ${provider.description}`,
  };
}

export default async function ProviderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const provider = getSignalProviderBySlug(id);

  if (!provider) {
    notFound();
  }

  return <ProviderDashboard provider={provider} />;
}


