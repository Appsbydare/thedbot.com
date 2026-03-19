"use client";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  AlertCircle,
  Clock,
  CheckCircle2,
  TrendingUp,
  Activity,
  XCircle,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export interface Stats {
  total: number;
  in_progress: number;
  done: number;
  blocked: number;
  overdue: number;
}

export interface RecentTask {
  id: string;
  title: string;
  status: string;
  updated_at: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const STATUS_LABEL: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
  blocked: "Blocked",
};

export function DashboardClientView({
  sessionName,
  stats,
  recent,
}: {
  sessionName: string;
  stats: Stats;
  recent: RecentTask[];
}) {
  const completionPct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  const statCards = [
    { label: "Total Tasks", value: stats.total, icon: LayoutDashboard, color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { label: "In Progress", value: stats.in_progress, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Completed", value: stats.done, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Blocked", value: stats.blocked, icon: XCircle, color: "text-rose-400", bg: "bg-rose-500/10" },
  ];

  // Build a simple chart from real data (status breakdown as a single bar set)
  const chartData = [
    { name: "To Do", count: stats.total - stats.in_progress - stats.done - stats.blocked },
    { name: "In Progress", count: stats.in_progress },
    { name: "Done", count: stats.done },
    { name: "Blocked", count: stats.blocked },
    { name: "Overdue", count: stats.overdue },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Overview
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Welcome back, {sessionName}. Here&apos;s what&apos;s happening today.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-xl hover:bg-white/[0.06] transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/5 group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} blur-3xl opacity-30 group-hover:opacity-60 transition-opacity`} />
            <div className="flex justify-between items-start mb-6 relative">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} border border-white/5`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
            <div className="relative">
              <h3 className="text-4xl font-black tracking-tight">{stat.value}</h3>
              <p className="text-sm text-gray-400 font-medium mt-2">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart — Task Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 p-8 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <Activity className="text-indigo-400" size={24} />
                <span>Task Status Breakdown</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">Live count per status category</p>
            </div>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" tick={{ fill: "#ffffff80", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff40" tick={{ fill: "#ffffff80", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f1016", borderColor: "#ffffff20", borderRadius: "16px", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="count" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
          className="space-y-6"
        >
          {/* Completion score */}
          <div className="p-8 bg-gradient-to-br from-indigo-500/20 to-purple-500/5 border border-indigo-500/20 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
              <TrendingUp size={120} />
            </div>
            <h2 className="text-xl font-bold mb-2 relative z-10">Completion Rate</h2>
            <div className="text-6xl font-black mb-4 relative z-10">
              {completionPct}<span className="text-2xl text-indigo-300">%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3 relative z-10">
              <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${completionPct}%` }} />
            </div>
            <p className="text-indigo-200/80 text-sm relative z-10 leading-relaxed">
              {stats.done} of {stats.total} tasks completed.
              {stats.overdue > 0 && ` ${stats.overdue} task${stats.overdue > 1 ? "s" : ""} overdue.`}
            </p>
          </div>

          {/* Recent Activity */}
          <div className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">Recent Activity</h2>
              <a href="/admin/tasks" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                View all
              </a>
            </div>
            <div className="space-y-3">
              {recent.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No tasks yet.</p>
              )}
              {recent.map(task => (
                <div key={task.id} className="flex items-center space-x-3 p-3 border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
                    <CheckSquare className="text-indigo-400" size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate group-hover:text-indigo-300 transition-colors">{task.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {STATUS_LABEL[task.status] ?? task.status} • {timeAgo(task.updated_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
