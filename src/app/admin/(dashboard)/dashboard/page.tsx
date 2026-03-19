import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { DashboardClientView, Stats, RecentTask } from "./DashboardClientView";
import { neon } from "@neondatabase/serverless";

export default async function AdminDashboardPage() {
  const { data: session } = await auth.getSession();
  
  if (!session?.user) {
    redirect("/admin/login");
  }

  const sql = neon(process.env.DATABASE_URL!);

  // Fetch real stats in a single query with type casting
  const statsResult = await sql`
    SELECT
      COUNT(*)::int                                                           AS total,
      COUNT(*) FILTER (WHERE status = 'in_progress')::int                    AS in_progress,
      COUNT(*) FILTER (WHERE status = 'done')::int                           AS done,
      COUNT(*) FILTER (WHERE status = 'blocked')::int                        AS blocked,
      COUNT(*) FILTER (WHERE due_date < NOW() AND status != 'done')::int     AS overdue
    FROM admin_tasks
  `;
  
  const stats = (statsResult[0] as Stats) || { 
    total: 0, 
    in_progress: 0, 
    done: 0, 
    blocked: 0, 
    overdue: 0 
  };

  // Recent tasks for activity feed with type casting
  const recent = (await sql`
    SELECT id, title, status, updated_at::text
    FROM admin_tasks
    ORDER BY updated_at DESC
    LIMIT 5
  `) as RecentTask[];

  return (
    <DashboardClientView
      sessionName={session.user.name ?? "Admin"}
      stats={stats}
      recent={recent}
    />
  );
}
