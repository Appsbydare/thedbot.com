import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";

const sql = neon(process.env.DATABASE_URL!);

async function requireAdmin() {
  const { data: session } = await auth.getSession();
  if (!session?.user) return null;
  return session;
}

// GET all tasks with subtasks
export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  return NextResponse.json(tasks);
}

// POST create task (with optional subtasks)
export async function POST(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { title, description, status = "todo", priority = "medium", start_date, due_date, assignee_name, color_tag = "#6366f1", subtasks = [] } = body;
  if (!title || typeof title !== "string" || title.trim() === "") {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  // Convert empty strings to null so Postgres doesn't try to parse "" as a date
  const orNull = (v: string | undefined | null) => (v && v.trim() !== "" ? v : null);

  const [task] = await sql`
    INSERT INTO admin_tasks (title, description, status, priority, start_date, due_date, assignee_name, color_tag)
    VALUES (
      ${title},
      ${orNull(description)},
      ${status},
      ${priority},
      ${orNull(start_date)},
      ${orNull(due_date)},
      ${orNull(assignee_name)},
      ${color_tag}
    )
    RETURNING *
  `;

  if (subtasks.length > 0) {
    for (const st of subtasks) {
      await sql`INSERT INTO admin_subtasks (task_id, title) VALUES (${task.id}, ${st.title})`;
    }
  }

  const [full] = await sql`
    SELECT t.*, 
      COALESCE(json_agg(json_build_object('id', s.id, 'title', s.title, 'completed', s.completed)) FILTER (WHERE s.id IS NOT NULL), '[]') as subtasks
    FROM admin_tasks t LEFT JOIN admin_subtasks s ON s.task_id = t.id
    WHERE t.id = ${task.id} GROUP BY t.id
  `;

  return NextResponse.json(full, { status: 201 });
}
