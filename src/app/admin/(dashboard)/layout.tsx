import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#0a0a0f] text-white">
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-8 relative">
        <div className="absolute top-0 inset-x-0 h-80 bg-indigo-500/5 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
