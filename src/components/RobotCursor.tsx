"use client";

import { useEffect, useRef, useState } from "react";

type RobotState = "running" | "idle";

export default function RobotCursor() {
  const robotRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [robotState, setRobotState] = useState<RobotState>("idle");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [robotX, setRobotX] = useState(0);
  const [robotY, setRobotY] = useState(0);
  const lastMoveTimeRef = useRef<number>(Date.now());
  const throttleTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  // Use refs to store current values to avoid dependency issues
  const mousePosRef = useRef({ x: 0, y: 0 });
  const robotPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const robot = robotRef.current;
    if (!robot) return;

    // Throttle mouse move events for better performance
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimerRef.current) return;
      
      throttleTimerRef.current = setTimeout(() => {
        mousePosRef.current.x = e.clientX;
        mousePosRef.current.y = e.clientY;
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
      robotPosRef.current.x += (mousePosRef.current.x - robotPosRef.current.x) * easing;
      robotPosRef.current.y += (mousePosRef.current.y - robotPosRef.current.y) * easing;
      setRobotX(robotPosRef.current.x);
      setRobotY(robotPosRef.current.y);

      if (robot) {
        // Position robot slightly offset to the right of cursor
        const offsetX = 40;
        const offsetY = 20;
        robot.style.transform = `translate(${robotPosRef.current.x + offsetX}px, ${robotPosRef.current.y + offsetY}px)`;
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
          width="48"
          height="64"
          viewBox="0 0 60 80"
          className="robot-svg"
          style={{
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
          }}
        >
          {/* Futuristic Humanoid Robot */}
          
          {/* Head with swept-back crest */}
          <ellipse
            cx="30"
            cy="13"
            rx="9"
            ry="10"
            fill="#f5f5f5"
            className="robot-head"
          />
          <path
            d="M 25 8 Q 28 4 32 5 Q 35 6 35 8 L 35 10 Q 33 8 30 8 Q 27 8 25 10 Z"
            fill="#e8e8e8"
            className="robot-crest"
          />
          
          {/* Narrow horizontal eye slits */}
          <rect
            x="22"
            y="11.5"
            width="6"
            height="1.5"
            rx="0.75"
            fill="#ffffff"
            className="robot-eye-left"
          />
          <rect
            x="32"
            y="11.5"
            width="6"
            height="1.5"
            rx="0.75"
            fill="#ffffff"
            className="robot-eye-right"
          />
          
          {/* Neck with segmented design */}
          <rect
            x="27"
            y="20"
            width="6"
            height="4"
            rx="1"
            fill="#d4af37"
            opacity="0.8"
          />
          
          {/* Segmented torso - hourglass shape */}
          {/* Upper chest plate */}
          <ellipse
            cx="30"
            cy="28"
            rx="12"
            ry="8"
            fill="#f5f5f5"
            className="robot-body"
          />
          <ellipse
            cx="30"
            cy="28"
            rx="9"
            ry="5"
            fill="#ffffff"
            opacity="0.3"
          />
          
          {/* Mid torso - segmented plates */}
          <rect
            x="20"
            y="32"
            width="20"
            height="6"
            rx="2"
            fill="#f5f5f5"
          />
          <path
            d="M 22 32 L 24 34 L 24 36 L 22 38 Z"
            fill="#d4af37"
            opacity="0.6"
          />
          <path
            d="M 38 32 L 36 34 L 36 36 L 38 38 Z"
            fill="#d4af37"
            opacity="0.6"
          />
          
          {/* Lower torso - narrow waist */}
          <ellipse
            cx="30"
            cy="42"
            rx="8"
            ry="6"
            fill="#f5f5f5"
          />
          
          {/* Left shoulder joint */}
          <circle
            cx="18"
            cy="28"
            r="4"
            fill="#d4af37"
            opacity="0.8"
          />
          
          {/* Left arm - contoured */}
          <ellipse
            cx="14"
            cy="30"
            rx="3.5"
            ry="12"
            fill="#f5f5f5"
            className="robot-arm-left"
          />
          {/* Left elbow joint */}
          <circle
            cx="14"
            cy="42"
            r="3"
            fill="#d4af37"
            opacity="0.8"
          />
          {/* Left forearm */}
          <ellipse
            cx="12"
            cy="48"
            rx="2.5"
            ry="8"
            fill="#f5f5f5"
          />
          {/* Left hand */}
          <ellipse
            cx="12"
            cy="56"
            rx="2.5"
            ry="3"
            fill="#f5f5f5"
          />
          
          {/* Right shoulder joint */}
          <circle
            cx="42"
            cy="28"
            r="4"
            fill="#d4af37"
            opacity="0.8"
          />
          
          {/* Right arm - contoured */}
          <ellipse
            cx="46"
            cy="30"
            rx="3.5"
            ry="12"
            fill="#f5f5f5"
            className="robot-arm-right"
          />
          {/* Right elbow joint */}
          <circle
            cx="46"
            cy="42"
            r="3"
            fill="#d4af37"
            opacity="0.8"
          />
          {/* Right forearm */}
          <ellipse
            cx="48"
            cy="48"
            rx="2.5"
            ry="8"
            fill="#f5f5f5"
          />
          {/* Right hand */}
          <ellipse
            cx="48"
            cy="56"
            rx="2.5"
            ry="3"
            fill="#f5f5f5"
          />
          
          {/* Left hip joint */}
          <circle
            cx="22"
            cy="50"
            r="3.5"
            fill="#d4af37"
            opacity="0.8"
          />
          
          {/* Left leg - contoured thigh */}
          <ellipse
            cx="20"
            cy="56"
            rx="4"
            ry="10"
            fill="#f5f5f5"
            className="robot-leg-left"
          />
          {/* Left knee joint */}
          <circle
            cx="20"
            cy="64"
            r="3"
            fill="#d4af37"
            opacity="0.8"
          />
          {/* Left calf */}
          <ellipse
            cx="18"
            cy="70"
            rx="3"
            ry="8"
            fill="#f5f5f5"
          />
          {/* Left foot - futuristic shoe design */}
          <ellipse
            cx="18"
            cy="78"
            rx="4"
            ry="2"
            fill="#f5f5f5"
          />
          
          {/* Right hip joint */}
          <circle
            cx="38"
            cy="50"
            r="3.5"
            fill="#d4af37"
            opacity="0.8"
          />
          
          {/* Right leg - contoured thigh */}
          <ellipse
            cx="40"
            cy="56"
            rx="4"
            ry="10"
            fill="#f5f5f5"
            className="robot-leg-right"
          />
          {/* Right knee joint */}
          <circle
            cx="40"
            cy="64"
            r="3"
            fill="#d4af37"
            opacity="0.8"
          />
          {/* Right calf */}
          <ellipse
            cx="42"
            cy="70"
            rx="3"
            ry="8"
            fill="#f5f5f5"
          />
          {/* Right foot - futuristic shoe design */}
          <ellipse
            cx="42"
            cy="78"
            rx="4"
            ry="2"
            fill="#f5f5f5"
          />
        </svg>
      </div>
      
      <style jsx global>{`
        .robot-svg {
          color: #f5f5f5;
        }
        
        :root[class~="dark"] .robot-svg {
          color: #f5f5f5;
        }
        
        /* Running animation - arms and legs move */
        [data-state="running"] .robot-arm-left {
          transform-origin: 14px 30px;
          animation: armSwingLeft 0.4s ease-in-out infinite;
        }
        
        [data-state="running"] .robot-arm-right {
          transform-origin: 46px 30px;
          animation: armSwingRight 0.4s ease-in-out infinite;
        }
        
        [data-state="running"] .robot-leg-left {
          transform-origin: 20px 56px;
          animation: legSwingLeft 0.4s ease-in-out infinite;
        }
        
        [data-state="running"] .robot-leg-right {
          transform-origin: 40px 56px;
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
          transform: translateX(-3px) translateY(0px);
          transform-origin: 20px 56px;
          transition: transform 0.3s ease;
        }
        
        [data-state="idle"] .robot-leg-right {
          transform: translateX(3px) translateY(0px);
          transform-origin: 40px 56px;
          transition: transform 0.3s ease;
        }
        
        [data-state="idle"] .robot-arm-left {
          transform: translateX(-2px) translateY(3px) rotate(-15deg);
          transform-origin: 14px 30px;
          transition: transform 0.3s ease;
        }
        
        [data-state="idle"] .robot-arm-right {
          transform: translateX(2px) translateY(3px) rotate(15deg);
          transform-origin: 46px 30px;
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

