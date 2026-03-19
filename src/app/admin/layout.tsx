import { NeonAuthUIProvider } from '@neondatabase/auth/react';
import { authClient } from '@/lib/auth/client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-white">
      <NeonAuthUIProvider authClient={authClient}>
        {children}
      </NeonAuthUIProvider>
    </div>
  );
}
