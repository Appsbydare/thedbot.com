"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      // Smooth cursor movement with easing
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }
      if (cursorDot) {
        cursorDot.style.transform = `translate(${mouseX - 8}px, ${mouseY - 8}px) rotate(-45deg)`;
      }

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.opacity = "1";
      if (cursorDot) cursorDot.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = "0";
      if (cursorDot) cursorDot.style.opacity = "0";
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
      
      // Check if hovering over heading lines
      const headingContainer = document.querySelector(".heading-container");
      const isOverHeading = headingContainer && headingContainer.contains(target);
      
      if (isOverHeading) {
        if (cursor) {
          cursor.style.width = "300px";
          cursor.style.height = "300px";
        }
      } else if (isInteractive) {
        if (cursor) {
          cursor.style.width = "75px";
          cursor.style.height = "75px";
        }
      } else {
        if (cursor) {
          cursor.style.width = "60px";
          cursor.style.height = "60px";
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
    };
  }, []);

  return (
    <>
      {/* Main circle cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform cursor-circle"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#ffffff",
          border: "2px solid rgba(255, 255, 255, 0.4)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease, height 0.3s ease",
        }}
      />
      {/* Arrow head cursor - triangle pointing top-left */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform"
        style={{
          width: "0",
          height: "0",
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderBottom: "12px solid white",
          filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))",
          transform: "translate(-8px, -8px) rotate(-45deg)",
          transformOrigin: "center",
          pointerEvents: "none",
        }}
      />
      <style jsx global>{`
        .cursor-circle {
          mix-blend-mode: difference !important;
        }
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          .fixed.pointer-events-none.z-\\[9999\\],
          .fixed.pointer-events-none.z-\\[10000\\] {
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
