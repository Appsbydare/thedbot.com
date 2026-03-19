import { LogOut, LayoutDashboard, CheckSquare, GanttChartIcon, Settings, ExternalLink } from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#0a0a0f] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-white/5 p-6 space-y-6 flex flex-col">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20">D</div>
          <span className="text-xl font-semibold tracking-tight">theDBot Admin</span>
        </div>
        
        <nav className="flex flex-col space-y-1 mt-8 flex-1">
          <a href="/admin/dashboard" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 rounded-xl transition-all group">
            <LayoutDashboard size={18} className="text-gray-400 group-hover:text-indigo-400" />
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="/admin/tasks" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 rounded-xl transition-all group">
            <CheckSquare size={18} className="text-gray-400 group-hover:text-indigo-400" />
            <span className="font-medium text-sm">Tasks (Kanban)</span>
          </a>
          <a href="/admin/gantt" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 rounded-xl transition-all group">
            <GanttChartIcon size={18} className="text-gray-400 group-hover:text-indigo-400" />
            <span className="font-medium text-sm">Gantt Chart</span>
          </a>
          <div className="pt-4 mt-4 border-t border-white/5">
            <a href="/admin/settings" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 rounded-xl transition-all group text-gray-500">
              <Settings size={18} className="group-hover:text-gray-300" />
              <span className="font-medium text-sm">Settings</span>
            </a>
          </div>
        </nav>

        <div className="space-y-2 mt-auto">
          {/* Exit to App */}
          <a
            href="/"
            className="flex items-center space-x-3 text-indigo-300 hover:text-indigo-200 transition-all w-full px-4 py-2.5 hover:bg-indigo-500/10 rounded-xl border border-indigo-500/20 hover:border-indigo-400/30"
          >
            <ExternalLink size={18} />
            <span className="font-medium text-sm">Exit to App</span>
          </a>

          {/* Logout */}
          <form action="/api/auth/sign-out" method="POST">
            <button type="submit" className="flex items-center space-x-3 text-rose-400 hover:text-rose-300 transition-all w-full px-4 py-2.5 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/20">
              <LogOut size={18} />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </form>
        </div>
      </aside>

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
