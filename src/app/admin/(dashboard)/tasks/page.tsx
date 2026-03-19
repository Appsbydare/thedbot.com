import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { KanbanBoard } from "@/components/admin/KanbanBoard";
import { neon } from "@neondatabase/serverless";

export default async function AdminTasksPage() {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const sql = neon(process.env.DATABASE_URL!);
  const tasks = await sql`
    SELECT t.*, 
      COALESCE(
        json_agg(
          json_build_object('id', s.id, 'title', s.title, 'completed', s.completed)
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'
      ) as subtasks
    FROM admin_tasks t
    LEFT JOIN admin_subtasks s ON s.task_id = t.id
    GROUP BY t.id
    ORDER BY t.created_at DESC
  `;

  return (
    <div className="animate-in fade-in duration-700">
      <KanbanBoard initialTasks={tasks} />
    </div>
  );
}
