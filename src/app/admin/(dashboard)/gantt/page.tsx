import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { GanttChart } from "@/components/admin/GanttChart";
import { neon } from "@neondatabase/serverless";

export default async function AdminGanttPage() {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const sql = neon(process.env.DATABASE_URL!);
  const tasks = await sql`
    SELECT id, title, start_date, due_date, status, priority, color_tag 
    FROM admin_tasks 
    WHERE start_date IS NOT NULL AND due_date IS NOT NULL
    ORDER BY start_date ASC
  `;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 h-[calc(100vh-160px)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Timeline</h1>
          <p className="text-gray-400 mt-1">Visual schedule of all active tasks</p>
        </div>
        <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
          <button className="px-4 py-1.5 text-xs font-medium bg-white/10 rounded-lg">Month</button>
          <button className="px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-white transition-colors">Quarter</button>
          <button className="px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-white transition-colors">Year</button>
        </div>
      </div>

      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        <GanttChart tasks={tasks} />
      </div>
    </div>
  );
}
