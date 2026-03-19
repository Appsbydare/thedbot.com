import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

// GET single task with subtasks
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [task] = await sql`
    SELECT t.*, 
      COALESCE(json_agg(json_build_object('id', s.id, 'title', s.title, 'completed', s.completed)) FILTER (WHERE s.id IS NOT NULL), '[]') as subtasks
    FROM admin_tasks t LEFT JOIN admin_subtasks s ON s.task_id = t.id
    WHERE t.id = ${id} GROUP BY t.id
  `;
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(task);
}

// PATCH update task
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { title, description, status, priority, start_date, due_date, assignee_name, color_tag } = body;

  const orNull = (v: string | undefined | null) => (v && v.trim() !== "" ? v : null);

  await sql`
    UPDATE admin_tasks SET
      title = COALESCE(${orNull(title)}, title),
      description = COALESCE(${orNull(description)}, description),
      status = COALESCE(${orNull(status)}, status),
      priority = COALESCE(${orNull(priority)}, priority),
      start_date = COALESCE(${orNull(start_date)}, start_date),
      due_date = COALESCE(${orNull(due_date)}, due_date),
      assignee_name = COALESCE(${orNull(assignee_name)}, assignee_name),
      color_tag = COALESCE(${orNull(color_tag)}, color_tag),
      updated_at = now()
    WHERE id = ${id}
  `;

  const [task] = await sql`
    SELECT t.*, 
      COALESCE(json_agg(json_build_object('id', s.id, 'title', s.title, 'completed', s.completed)) FILTER (WHERE s.id IS NOT NULL), '[]') as subtasks
    FROM admin_tasks t LEFT JOIN admin_subtasks s ON s.task_id = t.id
    WHERE t.id = ${id} GROUP BY t.id
  `;
  return NextResponse.json(task);
}

// DELETE task
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await sql`DELETE FROM admin_tasks WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
