import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

// POST add subtask to a task
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { title } = await req.json();
  const [subtask] = await sql`
    INSERT INTO admin_subtasks (task_id, title) VALUES (${id}, ${title}) RETURNING *
  `;
  return NextResponse.json(subtask, { status: 201 });
}

// PATCH toggle subtask completion
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { subtaskId, completed } = await req.json();
  const [subtask] = await sql`
    UPDATE admin_subtasks SET completed = ${completed} WHERE id = ${subtaskId} AND task_id = ${id} RETURNING *
  `;
  return NextResponse.json(subtask);
}

// DELETE a subtask
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { subtaskId } = await req.json();
  await sql`DELETE FROM admin_subtasks WHERE id = ${subtaskId} AND task_id = ${id}`;
  return NextResponse.json({ success: true });
}
