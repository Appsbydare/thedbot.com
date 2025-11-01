"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Create trail elements
    const trailCount = 8;
    trailRefs.current = [];
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement("div");
      trail.className = "cursor-trail";
      trail.style.opacity = `${0.2 - i * 0.02}`;
      trail.style.transform = "scale(0.3)";
      document.body.appendChild(trail);
      trailRefs.current.push(trail);
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const trailX: number[] = [];
    const trailY: number[] = [];

    // Initialize trail positions
    for (let i = 0; i < trailCount; i++) {
      trailX.push(0);
      trailY.push(0);
    }

    const updateCursor = () => {
      // Smooth cursor movement with easing
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }
      if (cursorDot) {
        cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }

      // Update trail positions with delay
      let prevX = cursorX;
      let prevY = cursorY;

      trailRefs.current.forEach((trail, index) => {
        const delay = index * 0.03;
        trailX[index] += (prevX - trailX[index]) * (0.15 + delay);
        trailY[index] += (prevY - trailY[index]) * (0.15 + delay);

        trail.style.transform = `translate(${trailX[index]}px, ${trailY[index]}px) scale(${0.3 + index * 0.05})`;

        prevX = trailX[index];
        prevY = trailY[index];
      });

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.opacity = "1";
      if (cursorDot) cursorDot.style.opacity = "1";
      trailRefs.current.forEach((trail) => {
        trail.style.opacity = "0.3";
      });
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = "0";
      if (cursorDot) cursorDot.style.opacity = "0";
      trailRefs.current.forEach((trail) => {
        trail.style.opacity = "0";
      });
    };

    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.closest("[role='button']") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      if (isInteractive) {
        if (cursor) {
          cursor.style.width = "40px";
          cursor.style.height = "40px";
          cursor.style.background = "rgba(59, 130, 246, 0.3)";
        }
        if (cursorDot) {
          cursorDot.style.width = "12px";
          cursorDot.style.height = "12px";
        }
      } else {
        if (cursor) {
          cursor.style.width = "20px";
          cursor.style.height = "20px";
          cursor.style.background = "rgba(59, 130, 246, 0.5)";
        }
        if (cursorDot) {
          cursorDot.style.width = "8px";
          cursorDot.style.height = "8px";
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleLinkHover);

    updateCursor();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleLinkHover);
      trailRefs.current.forEach((trail) => trail.remove());
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 0.5)",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease, height 0.3s ease, background 0.3s ease",
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 1)",
          boxShadow: "0 0 10px rgba(59, 130, 246, 1)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease, height 0.3s ease",
        }}
      />
      <style jsx global>{`
        .cursor-trail {
          position: fixed;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.6);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease;
        }
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          .cursor-trail,
          .fixed.pointer-events-none.z-\\[9999\\] {
            display: none !important;
          }
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}

