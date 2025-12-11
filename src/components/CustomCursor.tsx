"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const smokeContainerRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const smokeContainer = smokeContainerRef.current;
    if (!cursor || !cursorDot || !smokeContainer) return;

    // Create smoke trail particles with varying sizes
    const smokeCount = 20;
    trailRefs.current = [];
    for (let i = 0; i < smokeCount; i++) {
      const smoke = document.createElement("div");
      smoke.className = "cursor-smoke";
      smoke.style.opacity = "0";
      const size = 40 + Math.random() * 40;
      smoke.style.width = `${size}px`;
      smoke.style.height = `${size}px`;
      smokeContainer.appendChild(smoke);
      trailRefs.current.push(smoke);
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let prevX = 0;
    let prevY = 0;
    let velocity = 0;
    const smokeX: number[] = [];
    const smokeY: number[] = [];
    let lastMoveTime = Date.now();

    // Initialize smoke positions
    for (let i = 0; i < smokeCount; i++) {
      smokeX.push(0);
      smokeY.push(0);
    }

    const updateCursor = () => {
      // Smooth cursor movement with easing
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      // Calculate velocity
      const deltaX = mouseX - prevX;
      const deltaY = mouseY - prevY;
      velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      prevX = mouseX;
      prevY = mouseY;

      // Check if mouse is moving
      const timeSinceMove = Date.now() - lastMoveTime;
      const isMoving = velocity > 0.5 && timeSinceMove < 100;

      if (cursor) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }
      if (cursorDot) {
        cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }

      // Update smoke trail positions with organic movement
      let trailPrevX = cursorX;
      let trailPrevY = cursorY;

      trailRefs.current.forEach((smoke, index) => {
        const delay = index * 0.08;
        const ease = 0.15 + delay;
        
        smokeX[index] += (trailPrevX - smokeX[index]) * ease;
        smokeY[index] += (trailPrevY - smokeY[index]) * ease;

        const distance = Math.sqrt(
          Math.pow(smokeX[index] - trailPrevX, 2) + 
          Math.pow(smokeY[index] - trailPrevY, 2)
        );

        // Calculate opacity based on velocity and movement
        let opacity = 0;
        if (isMoving) {
          const baseOpacity = Math.min(velocity * 0.02, 0.8);
          opacity = baseOpacity * (1 - index * 0.06);
          opacity = Math.max(0, opacity);
        }

        smoke.style.opacity = opacity.toString();
        const scale = 0.8 - index * 0.04;
        smoke.style.transform = `translate(${smokeX[index]}px, ${smokeY[index]}px) scale(${scale}) rotate(${index * 10}deg)`;
        smoke.style.filter = `blur(${Math.min(index * 3 + 5, 25)}px)`;

        trailPrevX = smokeX[index];
        trailPrevY = smokeY[index];
      });

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime = Date.now();
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.opacity = "1";
      if (cursorDot) cursorDot.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = "0";
      if (cursorDot) cursorDot.style.opacity = "0";
      trailRefs.current.forEach((smoke) => {
        smoke.style.opacity = "0";
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
      
      // Check if hovering over heading lines
      const headingContainer = document.querySelector(".heading-container");
      const isOverHeading = headingContainer && headingContainer.contains(target);
      
      if (isOverHeading) {
        // 5x increase: 60px * 5 = 300px
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
      <div
        ref={smokeContainerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{ width: "100%", height: "100%" }}
      />
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
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform"
        style={{
          width: "0",
          height: "0",
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderBottom: "12px solid rgba(255, 255, 255, 1)",
          filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))",
          transform: "translate(-50%, -50%) rotate(-45deg)",
          pointerEvents: "none",
        }}
      />
      <style jsx global>{`
        .cursor-circle {
          mix-blend-mode: difference !important;
        }
        .cursor-smoke {
          position: fixed;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(200, 200, 200, 0.3) 30%,
            rgba(150, 150, 150, 0.2) 60%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: opacity 0.15s ease-out;
        }
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          .cursor-smoke,
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
