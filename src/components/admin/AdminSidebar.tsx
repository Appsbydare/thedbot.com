'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, CheckSquare, GanttChartIcon, Settings, ExternalLink } from 'lucide-react';
import { authClient } from '@/lib/auth/client';

export default function AdminSidebar() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push('/admin/login');
  }

  return (
    <aside className="w-64 border-r border-white/10 bg-white/5 p-6 space-y-6 flex flex-col">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20">D</div>
        <span className="text-xl font-semibold tracking-tight">theDBot Admin</span>
      </div>

      <nav className="flex flex-col space-y-1 mt-8 flex-1">
        <Link href="/admin/dashboard" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 rounded-xl transition-all group">
          <LayoutDashboard size={18} className="text-gray-400 group-hover:text-indigo-400" />
          <span className="font-medium text-sm">Dashboard</span>
        </Link>
        <Link href="/admin/tasks" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 rounded-xl transition-all group">
          <CheckSquare size={18} className="text-gray-400 group-hover:text-indigo-400" />
          <span className="font-medium text-sm">Tasks (Kanban)</span>
        </Link>
        <Link href="/admin/gantt" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 rounded-xl transition-all group">
          <GanttChartIcon size={18} className="text-gray-400 group-hover:text-indigo-400" />
          <span className="font-medium text-sm">Gantt Chart</span>
        </Link>
        <div className="pt-4 mt-4 border-t border-white/5">
          <Link href="/admin/settings" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-white/10 rounded-xl transition-all group text-gray-500">
            <Settings size={18} className="group-hover:text-gray-300" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
        </div>
      </nav>

      <div className="space-y-2 mt-auto">
        {/* Exit to App */}
        <Link
          href="/"
          className="flex items-center space-x-3 text-indigo-300 hover:text-indigo-200 transition-all w-full px-4 py-2.5 hover:bg-indigo-500/10 rounded-xl border border-indigo-500/20 hover:border-indigo-400/30"
        >
          <ExternalLink size={18} />
          <span className="font-medium text-sm">Exit to App</span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-rose-400 hover:text-rose-300 transition-all w-full px-4 py-2.5 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/20"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
