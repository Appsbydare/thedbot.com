"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MoreVertical, Flag, CheckCircle2, X, Plus,
  Trash2, Edit3, ChevronRight, Loader2, AlertTriangle, CheckSquare, Square
} from "lucide-react";

interface Subtask { id: string; title: string; completed: boolean; }
interface Task {
  id: string; title: string; description?: string; status: string; priority: string;
  start_date?: string; due_date?: string; assignee_name?: string; color_tag?: string;
  subtasks: Subtask[];
}

const PRIORITY_STYLES: Record<string, string> = {
  low: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  high: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  critical: "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

const COLUMNS = [
  { id: "todo", title: "To Do", color: "text-gray-400", bg: "bg-white/5", ring: "ring-gray-500/20" },
  { id: "in_progress", title: "In Progress", color: "text-amber-400", bg: "bg-amber-500/10", ring: "ring-amber-500/20" },
  { id: "done", title: "Done", color: "text-emerald-400", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20" },
  { id: "blocked", title: "Blocked", color: "text-rose-400", bg: "bg-rose-500/10", ring: "ring-rose-500/20" },
];

const COLOR_OPTIONS = ["#6366f1","#8b5cf6","#ec4899","#f59e0b","#10b981","#3b82f6","#ef4444","#06b6d4"];

function fmtDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ──────────────────────────────────────────────────
// Add/Edit Task Modal
// ──────────────────────────────────────────────────
function TaskModal({ task, onClose, onSave }: {
  task?: Task | null;
  onClose: () => void;
  onSave: (t: Task) => void;
}) {
  const [form, setForm] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? "todo",
    priority: task?.priority ?? "medium",
    start_date: task?.start_date?.split("T")[0] ?? "",
    due_date: task?.due_date?.split("T")[0] ?? "",
    assignee_name: task?.assignee_name ?? "",
    color_tag: task?.color_tag ?? "#6366f1",
  });
  const [subtasks, setSubtasks] = useState<{ title: string }[]>(
    task?.subtasks.map(s => ({ title: s.title })) ?? []
  );
  const [newSub, setNewSub] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const addSubtask = () => {
    if (!newSub.trim()) return;
    setSubtasks(s => [...s, { title: newSub.trim() }]);
    setNewSub("");
  };
  const removeSubtask = (i: number) => setSubtasks(s => s.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    setSaving(true); setError("");
    try {
      const method = task ? "PATCH" : "POST";
      const url = task ? `/api/admin/tasks/${task.id}` : "/api/admin/tasks";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subtasks: task ? undefined : subtasks }),
      });
      if (!res.ok) throw new Error("Save failed");
      const saved: Task = await res.json();

      // If editing, sync subtasks that were added/removed
      if (task) {
        // Add new subtasks
        for (const s of subtasks) {
          if (!task.subtasks.find(o => o.title === s.title)) {
            await fetch(`/api/admin/tasks/${task.id}/subtasks`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title: s.title }),
            });
          }
        }
        // Fetch updated
        const fresh = await fetch(`/api/admin/tasks/${task.id}`);
        const freshTask: Task = await fresh.json();
        onSave(freshTask);
      } else {
        onSave(saved);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#0f0f1a] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl shadow-black/50 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Color accent bar */}
        <div className="h-1 w-full" style={{ backgroundColor: form.color_tag }} />

        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{task ? "Edit Task" : "New Task"}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-sm">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Title *</label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              placeholder="Task title..."
              value={form.title}
              onChange={e => set("title", e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Description</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none h-20"
              placeholder="Optional description..."
              value={form.description}
              onChange={e => set("description", e.target.value)}
            />
          </div>

          {/* Status + Priority row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Status</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
                value={form.status}
                onChange={e => set("status", e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Priority</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
                value={form.priority}
                onChange={e => set("priority", e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Dates + Assignee row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Start Date</label>
              <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all [color-scheme:dark]" value={form.start_date} onChange={e => set("start_date", e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Due Date</label>
              <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all [color-scheme:dark]" value={form.due_date} onChange={e => set("due_date", e.target.value)} />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Assignee</label>
            <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all" placeholder="Assignee name..." value={form.assignee_name} onChange={e => set("assignee_name", e.target.value)} />
          </div>

          {/* Color tag */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Color Tag</label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_OPTIONS.map(c => (
                <button key={c} onClick={() => set("color_tag", c)} className="w-7 h-7 rounded-full border-2 transition-all" style={{ backgroundColor: c, borderColor: form.color_tag === c ? "#fff" : "transparent" }} />
              ))}
            </div>
          </div>

          {/* Subtasks */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Subtasks</label>
            <div className="space-y-2">
              {subtasks.map((s, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                  <CheckCircle2 size={14} className="text-gray-500 flex-shrink-0" />
                  <span className="text-sm flex-1">{s.title}</span>
                  <button onClick={() => removeSubtask(i)} className="text-gray-600 hover:text-rose-400 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                  placeholder="Add a subtask..."
                  value={newSub}
                  onChange={e => setNewSub(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addSubtask()}
                />
                <button onClick={addSubtask} className="px-3 py-2 bg-indigo-600/30 border border-indigo-500/30 text-indigo-400 rounded-xl hover:bg-indigo-600/50 transition-all text-sm font-medium">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20">
              {saving ? <Loader2 size={16} className="animate-spin" /> : null}
              {task ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ──────────────────────────────────────────────────
// Task Detail Drawer (slides in from right)
// ──────────────────────────────────────────────────
function TaskDrawer({ task: initialTask, onClose, onUpdate, onDelete }: {
  task: Task;
  onClose: () => void;
  onUpdate: (t: Task) => void;
  onDelete: (id: string) => void;
}) {
  const [task, setTask] = useState(initialTask);
  const [newSub, setNewSub] = useState("");
  const [addingSub, setAddingSub] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const done = task.subtasks.filter(s => s.completed).length;
  const pct = task.subtasks.length ? Math.round((done / task.subtasks.length) * 100) : 0;

  const toggleSubtask = async (sub: Subtask) => {
    const res = await fetch(`/api/admin/tasks/${task.id}/subtasks`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subtaskId: sub.id, completed: !sub.completed }),
    });
    if (res.ok) {
      const updated = { ...task, subtasks: task.subtasks.map(s => s.id === sub.id ? { ...s, completed: !s.completed } : s) };
      setTask(updated);
      onUpdate(updated);
    }
  };

  const addSubtask = async () => {
    if (!newSub.trim()) return;
    setAddingSub(true);
    const res = await fetch(`/api/admin/tasks/${task.id}/subtasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newSub.trim() }),
    });
    if (res.ok) {
      const sub: Subtask = await res.json();
      const updated = { ...task, subtasks: [...task.subtasks, sub] };
      setTask(updated);
      onUpdate(updated);
      setNewSub("");
    }
    setAddingSub(false);
  };

  const deleteSubtask = async (sub: Subtask) => {
    const res = await fetch(`/api/admin/tasks/${task.id}/subtasks`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subtaskId: sub.id }),
    });
    if (res.ok) {
      const updated = { ...task, subtasks: task.subtasks.filter(s => s.id !== sub.id) };
      setTask(updated);
      onUpdate(updated);
    }
  };

  const deleteTask = async () => {
    if (!confirm("Delete this task?")) return;
    setDeleting(true);
    await fetch(`/api/admin/tasks/${task.id}`, { method: "DELETE" });
    onDelete(task.id);
  };

  return (
    <>
      {editOpen && (
        <TaskModal
          task={task}
          onClose={() => setEditOpen(false)}
          onSave={t => { setTask(t); onUpdate(t); setEditOpen(false); }}
        />
      )}
      <div className="fixed inset-0 z-40 flex justify-end" onClick={onClose}>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          className="w-full max-w-md bg-[#0d0d18]/95 backdrop-blur-xl border-l border-white/10 h-full overflow-y-auto shadow-2xl shadow-black/50"
          onClick={e => e.stopPropagation()}
        >
          {/* Color bar */}
          <div className="h-1" style={{ backgroundColor: task.color_tag ?? "#6366f1" }} />

          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${PRIORITY_STYLES[task.priority]}`}>{task.priority}</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">{task.status.replace("_", " ")}</span>
                </div>
                <h2 className="text-xl font-bold leading-tight">{task.title}</h2>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => setEditOpen(true)} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white">
                  <Edit3 size={16} />
                </button>
                <button onClick={deleteTask} disabled={deleting} className="p-2 hover:bg-rose-500/10 rounded-xl transition-colors text-gray-400 hover:text-rose-400">
                  {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300 leading-relaxed">
                {task.description}
              </div>
            )}

            {/* Meta */}
            <div className="grid grid-cols-2 gap-3">
              {task.assignee_name && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-[11px] text-gray-500 font-medium mb-1">Assignee</div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">{task.assignee_name.charAt(0)}</div>
                    <span className="text-sm font-medium">{task.assignee_name}</span>
                  </div>
                </div>
              )}
              {task.due_date && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-[11px] text-gray-500 font-medium mb-1">Due Date</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-indigo-400" />
                    <span>{fmtDate(task.due_date)}</span>
                  </div>
                </div>
              )}
              {task.start_date && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-[11px] text-gray-500 font-medium mb-1">Start Date</div>
                  <div className="text-sm flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    {fmtDate(task.start_date)}
                  </div>
                </div>
              )}
            </div>

            {/* Subtasks */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-indigo-400" />
                  Subtasks
                  {task.subtasks.length > 0 && (
                    <span className="text-xs text-gray-500 font-normal">{done}/{task.subtasks.length} done</span>
                  )}
                </h3>
              </div>

              {/* Progress bar */}
              {task.subtasks.length > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
                    <span>{pct}% complete</span>
                    <span>{done}/{task.subtasks.length}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Subtask list */}
              <div className="space-y-2">
                {task.subtasks.map(sub => (
                  <div key={sub.id} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 group">
                    <button onClick={() => toggleSubtask(sub)} className="flex-shrink-0">
                      {sub.completed
                        ? <CheckSquare size={16} className="text-indigo-400" />
                        : <Square size={16} className="text-gray-500 hover:text-indigo-400 transition-colors" />
                      }
                    </button>
                    <span className={`text-sm flex-1 ${sub.completed ? "line-through text-gray-500" : "text-white"}`}>
                      {sub.title}
                    </span>
                    <button onClick={() => deleteSubtask(sub)} className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-rose-400 transition-all">
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {/* Add subtask input */}
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                    placeholder="Add a subtask..."
                    value={newSub}
                    onChange={e => setNewSub(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addSubtask()}
                  />
                  <button
                    onClick={addSubtask}
                    disabled={addingSub}
                    className="px-3 py-2 bg-indigo-600/30 border border-indigo-500/30 text-indigo-400 rounded-xl hover:bg-indigo-600/50 transition-all"
                  >
                    {addingSub ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────
// Three-dot context menu
// ──────────────────────────────────────────────────
function TaskMenu({ task, onEdit, onDelete, onClose }: {
  task: Task; onEdit: () => void; onDelete: () => void; onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute right-0 top-8 z-50 min-w-[140px] bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1">
      <button onClick={(e) => { e.stopPropagation(); onEdit(); onClose(); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors text-left">
        <Edit3 size={14} className="text-indigo-400" /> Edit
      </button>
      <button onClick={(e) => { e.stopPropagation(); onDelete(); onClose(); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-rose-500/10 text-rose-400 transition-colors text-left">
        <Trash2 size={14} /> Delete
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────
// Main KanbanBoard
// ──────────────────────────────────────────────────
export function KanbanBoard({ initialTasks }: { initialTasks: any[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [addModal, setAddModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [menuTaskId, setMenuTaskId] = useState<string | null>(null);

  const updateTask = (t: Task) => setTasks(prev => prev.map(x => x.id === t.id ? t : x));
  const removeTask = (id: string) => setTasks(prev => prev.filter(x => x.id !== id));
  const addTask = (t: Task) => setTasks(prev => [t, ...prev]);

  const handleDrop = async (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("taskId");
    const task = tasks.find(t => t.id === id);
    if (!task || task.status === status) return;
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    await fetch(`/api/admin/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const deleteTask = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    await fetch(`/api/admin/tasks/${id}`, { method: "DELETE" });
    removeTask(id);
    if (detailTask?.id === id) setDetailTask(null);
  };

  return (
    <>
      {/* Add Task button (rendered here for external use via column buttons) */}
      <AnimatePresence>
        {addModal && (
          <TaskModal onClose={() => setAddModal(false)} onSave={t => { addTask(t); setAddModal(false); }} />
        )}
        {editTask && (
          <TaskModal task={editTask} onClose={() => setEditTask(null)} onSave={t => { updateTask(t); setEditTask(null); }} />
        )}
        {detailTask && (
          <TaskDrawer
            task={detailTask}
            onClose={() => setDetailTask(null)}
            onUpdate={t => { updateTask(t); setDetailTask(t); }}
            onDelete={id => { removeTask(id); setDetailTask(null); }}
          />
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Task Board</h1>
            <p className="text-gray-400 mt-1 text-sm">Manage and track your project progress</p>
          </div>
          <button
            onClick={() => setAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] flex items-center gap-2"
          >
            <Plus size={18} /> New Task
          </button>
        </div>

        {/* Columns */}
        <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-220px)] custom-scrollbar">
          {COLUMNS.map(col => (
            <div
              key={col.id}
              className="flex-shrink-0 w-80 flex flex-col"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              {/* Column Header */}
              <div className={`flex items-center justify-between mb-4 p-4 rounded-2xl border border-white/5 backdrop-blur-xl ${col.bg}`}>
                <h2 className={`font-bold flex items-center space-x-2 ${col.color}`}>
                  <div className={`w-2 h-2 rounded-full ring-2 ${col.ring} bg-current`} />
                  <span>{col.title}</span>
                </h2>
                <span className="text-xs font-bold text-gray-500 bg-black/20 px-2 py-1 rounded-full">
                  {tasks.filter(t => t.status === col.id).length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 space-y-4 rounded-2xl bg-white/[0.02] border border-white/5 p-4 overflow-y-auto custom-scrollbar shadow-inner shadow-black/50">
                <AnimatePresence>
                  {tasks.filter(t => t.status === col.id).map(task => (
                    <motion.div
                      key={task.id}
                      id={`task-${task.id}`}
                      draggable
                      onDragStart={(e) => { (e as any).dataTransfer.setData("taskId", task.id); }}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-[#12121a]/80 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-lg cursor-pointer group relative overflow-hidden"
                      onClick={() => { if (!menuTaskId) setDetailTask(task); }}
                    >
                      {/* Color accent */}
                      <div className="absolute top-0 inset-x-0 h-1" style={{ backgroundColor: task.color_tag ?? "#6366f1" }} />
                      <div className="absolute -right-12 -top-12 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity blur-3xl rounded-full" style={{ backgroundColor: task.color_tag ?? "#6366f1" }} />

                      {/* Top row */}
                      <div className="flex justify-between items-start mb-3 relative z-10">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${PRIORITY_STYLES[task.priority]}`}>
                          {task.priority}
                        </span>
                        <div className="relative">
                          <button
                            className="text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                            onClick={e => { e.stopPropagation(); setMenuTaskId(prev => prev === task.id ? null : task.id); }}
                          >
                            <MoreVertical size={16} />
                          </button>
                          {menuTaskId === task.id && (
                            <TaskMenu
                              task={task}
                              onEdit={() => { setEditTask(task); setMenuTaskId(null); }}
                              onDelete={() => deleteTask(task.id)}
                              onClose={() => setMenuTaskId(null)}
                            />
                          )}
                        </div>
                      </div>

                      <h3 className="font-semibold text-[15px] mb-2 leading-snug group-hover:text-indigo-200 transition-colors relative z-10">
                        {task.title}
                      </h3>

                      {task.description && (
                        <p className="text-xs text-gray-500 line-clamp-2 mb-4 relative z-10">{task.description}</p>
                      )}

                      {/* Subtask progress */}
                      {task.subtasks?.length > 0 && (
                        <div className="mb-4 relative z-10">
                          <div className="flex justify-between text-[11px] text-gray-400 mb-1.5 font-medium">
                            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-indigo-400" /> Progress</span>
                            <span>{task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                              style={{ width: `${(task.subtasks.filter(s => s.completed).length / task.subtasks.length) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4 relative z-10">
                        <div className="flex items-center gap-3 text-gray-500">
                          {task.due_date && (
                            <div className="flex items-center text-[11px] font-medium hover:text-indigo-300 transition-colors">
                              <Calendar size={12} className="mr-1.5" />
                              {fmtDate(task.due_date)}
                            </div>
                          )}
                          {task.subtasks?.length > 0 && (
                            <div className="flex items-center text-[11px] font-medium">
                              <CheckCircle2 size={12} className="mr-1" />
                              {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {task.assignee_name && (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-md ring-2 ring-[#12121a]" title={task.assignee_name}>
                              {task.assignee_name.charAt(0)}
                            </div>
                          )}
                          <ChevronRight size={14} className="text-gray-600 group-hover:text-indigo-400 transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {tasks.filter(t => t.status === col.id).length === 0 && (
                  <div className="h-24 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center text-sm text-gray-600 font-medium italic select-none">
                    Drop tasks here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
