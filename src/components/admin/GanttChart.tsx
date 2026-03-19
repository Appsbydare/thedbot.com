"use client";

import { useMemo } from "react";

interface GanttTask {
  id: string;
  title: string;
  start_date: string;
  due_date: string;
  status: string;
  color_tag: string;
}

export function GanttChart({ tasks }: { tasks: any[] }) {
  const chartData = useMemo(() => {
    if (!tasks.length) return null;

    const startDates = tasks.map(t => new Date(t.start_date).getTime());
    const endDates = tasks.map(t => new Date(t.due_date).getTime());
    
    const minDate = new Date(Math.min(...startDates));
    const maxDate = new Date(Math.max(...endDates));
    
    // Add 1 day padding
    minDate.setDate(minDate.getDate() - 2);
    maxDate.setDate(maxDate.getDate() + 5);

    const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return { minDate, maxDate, totalDays };
  }, [tasks]);

  if (!chartData || !tasks.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No scheduled tasks found with start and due dates.
      </div>
    );
  }

  const { minDate, totalDays } = chartData;
  const dayWidth = 40; // px per day
  const rowHeight = 60;
  const headerHeight = 50;

  const getPosition = (dateStr: string) => {
    const date = new Date(dateStr);
    const diff = Math.ceil((date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    return diff * dayWidth;
  };

  return (
    <div className="h-full overflow-auto custom-scrollbar">
      <div 
        className="relative" 
        style={{ 
          width: totalDays * dayWidth + 200, 
          height: tasks.length * rowHeight + headerHeight 
        }}
      >
        {/* Timeline Header */}
        <div className="sticky top-0 z-20 flex bg-[#0d0d12] border-b border-white/10" style={{ height: headerHeight }}>
          <div className="w-[200px] border-r border-white/10 shrink-0 sticky left-0 bg-[#0d0d12] z-30 px-4 flex items-center font-semibold text-xs text-gray-400">
            TASKS
          </div>
          <div className="flex relative">
            {Array.from({ length: totalDays }).map((_, i) => {
              const d = new Date(minDate);
              d.setDate(d.getDate() + i);
              const isFirstOfMonth = d.getDate() === 1;
              const isToday = d.toDateString() === new Date().toDateString();
              
              return (
                <div 
                  key={i} 
                  className={`border-r border-white/5 shrink-0 flex flex-col items-center justify-center text-[10px] ${isToday ? 'bg-indigo-500/10' : ''}`}
                  style={{ width: dayWidth }}
                >
                  <span className={isFirstOfMonth ? 'text-indigo-400 font-bold' : 'text-gray-600'}>
                    {d.getDate()}
                  </span>
                  {isFirstOfMonth && (
                    <span className="absolute -top-1 font-bold text-white uppercase text-[8px]">
                      {d.toLocaleString('default', { month: 'short' })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart Body */}
        <div className="flex flex-col">
          {tasks.map((task, idx) => {
            const startX = getPosition(task.start_date);
            const endX = getPosition(task.due_date);
            const width = Math.max(endX - startX, dayWidth);
            
            return (
              <div key={task.id} className="flex border-b border-white/5 group" style={{ height: rowHeight }}>
                {/* Task Name Column */}
                <div className="w-[200px] border-r border-white/10 shrink-0 sticky left-0 bg-[#0a0a0f] z-10 px-4 flex items-center text-sm font-medium group-hover:bg-white/5 transition-colors">
                  <div className="truncate">{task.title}</div>
                </div>

                {/* Grid Rows */}
                <div className="flex relative flex-1">
                  {/* The Bar */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 rounded-full h-8 flex items-center px-4 text-[10px] font-bold shadow-lg transition-all hover:scale-[1.02] hover:z-10 cursor-pointer overflow-hidden group/bar"
                    style={{ 
                      left: startX, 
                      width: width, 
                      backgroundColor: `${task.color_tag}20`,
                      border: `1px solid ${task.color_tag}40`,
                      color: task.color_tag
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                    <span className="truncate relative z-10">{task.title}</span>
                  </div>

                  {/* Vertical dividers */}
                  {Array.from({ length: totalDays }).map((_, i) => (
                    <div key={i} className="border-r border-white/[0.02] shrink-0 h-full pointer-events-none" style={{ width: dayWidth }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
