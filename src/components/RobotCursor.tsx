"use client";

import { useEffect, useRef, useState } from "react";

type RobotState = "running" | "idle";

export default function RobotCursor() {
  const robotRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const [robotState, setRobotState] = useState<RobotState>("idle");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [robotX, setRobotX] = useState(0);
  const [robotY, setRobotY] = useState(0);
  const lastMoveTimeRef = useRef<number>(Date.now());
  const throttleTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const robot = robotRef.current;
    if (!robot) return;

    let currentRobotX = robotX;
    let currentRobotY = robotY;
    let currentMouseX = mouseX;
    let currentMouseY = mouseY;

    // Throttle mouse move events for better performance
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimerRef.current) return;
      
      throttleTimerRef.current = setTimeout(() => {
        currentMouseX = e.clientX;
        currentMouseY = e.clientY;
        setMouseX(e.clientX);
        setMouseY(e.clientY);
        lastMoveTimeRef.current = Date.now();
        setRobotState("running");
        throttleTimerRef.current = undefined;
      }, 16); // ~60fps throttle
    };

    // Update robot position smoothly
    const updateRobot = () => {
      const now = Date.now();
      const timeSinceMove = now - lastMoveTimeRef.current;

      // Check if mouse has stopped (idle after 150ms of no movement)
      if (timeSinceMove > 150) {
        setRobotState((prev) => prev === "running" ? "idle" : prev);
      }

      // Smooth easing for robot position (follows mouse)
      const easing = 0.15;
      currentRobotX += (currentMouseX - currentRobotX) * easing;
      currentRobotY += (currentMouseY - currentRobotY) * easing;
      setRobotX(currentRobotX);
      setRobotY(currentRobotY);

      if (robot) {
        // Position robot slightly offset to the right of cursor
        const offsetX = 40;
        const offsetY = 20;
        robot.style.transform = `translate(${currentRobotX + offsetX}px, ${currentRobotY + offsetY}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(updateRobot);
    };

    const handleMouseEnter = () => {
      if (robot) robot.style.opacity = "1";
      animationFrameRef.current = requestAnimationFrame(updateRobot);
    };

    const handleMouseLeave = () => {
      if (robot) robot.style.opacity = "0";
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    // Pause animation when tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(updateRobot);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initialize position
    animationFrameRef.current = requestAnimationFrame(updateRobot);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={robotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10001] will-change-transform"
        style={{
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        data-state={robotState}
      >
        <svg
          width="60"
          height="80"
          viewBox="0 0 60 80"
          className="robot-svg"
          style={{
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
          }}
        >
          {/* Robot body with detail */}
          <rect
            x="15"
            y="25"
            width="30"
            height="35"
            rx="4"
            fill="currentColor"
            className="robot-body"
          />
          <rect
            x="18"
            y="28"
            width="24"
            height="12"
            rx="2"
            fill="rgba(255, 255, 255, 0.2)"
          />
          
          {/* Robot head */}
          <circle
            cx="30"
            cy="15"
            r="12"
            fill="currentColor"
            className="robot-head"
          />
          <circle
            cx="30"
            cy="12"
            r="6"
            fill="rgba(255, 255, 255, 0.15)"
          />
          
          {/* Eyes */}
          <circle cx="25" cy="13" r="2.5" fill="#ffffff" className="robot-eye-left" />
          <circle cx="35" cy="13" r="2.5" fill="#ffffff" className="robot-eye-right" />
          <circle cx="25" cy="13" r="1" fill="currentColor" />
          <circle cx="35" cy="13" r="1" fill="currentColor" />
          
          {/* Left arm - tucked when idle, extended when running */}
          <rect
            x="8"
            y="28"
            width="8"
            height="15"
            rx="2"
            fill="currentColor"
            className="robot-arm-left"
          />
          
          {/* Right arm - tucked when idle, extended when running */}
          <rect
            x="44"
            y="28"
            width="8"
            height="15"
            rx="2"
            fill="currentColor"
            className="robot-arm-right"
          />
          
          {/* Left leg - wider when idle */}
          <rect
            x="18"
            y="58"
            width="10"
            height="20"
            rx="2"
            fill="currentColor"
            className="robot-leg-left"
          />
          
          {/* Right leg - wider when idle */}
          <rect
            x="32"
            y="58"
            width="10"
            height="20"
            rx="2"
            fill="currentColor"
            className="robot-leg-right"
          />
        </svg>
      </div>
      
      <style jsx global>{`
        .robot-svg {
          color: var(--accent, #3b82f6);
        }
        
        :root[class~="dark"] .robot-svg {
          color: #60a5fa;
        }
        
        /* Running animation - arms and legs move */
        [data-state="running"] .robot-arm-left {
          transform-origin: 12px 28px;
          animation: armSwingLeft 0.4s ease-in-out infinite;
        }
        
        [data-state="running"] .robot-arm-right {
          transform-origin: 48px 28px;
          animation: armSwingRight 0.4s ease-in-out infinite;
        }
        
        [data-state="running"] .robot-leg-left {
          transform-origin: 23px 58px;
          animation: legSwingLeft 0.4s ease-in-out infinite;
        }
        
        [data-state="running"] .robot-leg-right {
          transform-origin: 37px 58px;
          animation: legSwingRight 0.4s ease-in-out infinite;
        }
        
        [data-state="running"] .robot-body {
          animation: bodyBounce 0.4s ease-in-out infinite;
        }
        
        [data-state="running"] .robot-head {
          animation: headBob 0.4s ease-in-out infinite;
        }
        
        /* Idle state - legs spread, arms tucked */
        [data-state="idle"] .robot-leg-left {
          transform: translateX(-4px) translateY(0px);
          transform-origin: 23px 58px;
          transition: transform 0.3s ease;
        }
        
        [data-state="idle"] .robot-leg-right {
          transform: translateX(4px) translateY(0px);
          transform-origin: 37px 58px;
          transition: transform 0.3s ease;
        }
        
        [data-state="idle"] .robot-arm-left {
          transform: translateX(-2px) translateY(5px) rotate(-20deg);
          transform-origin: 12px 28px;
          transition: transform 0.3s ease;
        }
        
        [data-state="idle"] .robot-arm-right {
          transform: translateX(2px) translateY(5px) rotate(20deg);
          transform-origin: 48px 28px;
          transition: transform 0.3s ease;
        }
        
        [data-state="idle"] .robot-eye-left,
        [data-state="idle"] .robot-eye-right {
          transition: transform 0.3s ease;
        }
        
        @keyframes armSwingLeft {
          0%, 100% {
            transform: rotate(-30deg);
          }
          50% {
            transform: rotate(20deg);
          }
        }
        
        @keyframes armSwingRight {
          0%, 100% {
            transform: rotate(30deg);
          }
          50% {
            transform: rotate(-20deg);
          }
        }
        
        @keyframes legSwingLeft {
          0%, 100% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }
        
        @keyframes legSwingRight {
          0%, 100% {
            transform: rotate(15deg);
          }
          50% {
            transform: rotate(-10deg);
          }
        }
        
        @keyframes bodyBounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        @keyframes headBob {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-1px);
          }
        }
        
        /* Hide on mobile for performance */
        @media (max-width: 768px), (hover: none), (pointer: coarse) {
          .robot-svg {
            display: none !important;
          }
        }
        
        /* Hide default cursor */
        * {
          cursor: none !important;
        }
        
        @media (max-width: 768px), (hover: none), (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}

