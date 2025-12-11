'use client';

import { useEffect, useRef } from 'react';

export default function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Snowflake properties
    interface Snowflake {
      x: number;
      y: number;
      radius: number;
      speed: number;
      drift: number;
    }

    const snowflakes: Snowflake[] = [];
    const snowflakeCount = 50; // Reduced count for less distraction

    // Create snowflakes with slower speeds
    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5, // Smaller snowflakes
        speed: Math.random() * 0.3 + 0.2, // Much slower
        drift: Math.random() * 0.2 - 0.1, // Less horizontal movement
      });
    }

    // Animation function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // More subtle opacity
        ctx.fill();

        // Update position
        flake.y += flake.speed;
        flake.x += flake.drift;

        // Reset snowflake when it goes off screen
        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width) {
          flake.x = 0;
        } else if (flake.x < 0) {
          flake.x = canvas.width;
        }
      });
    };

    // Animation loop
    const interval = setInterval(draw, 1000 / 60); // 60 FPS

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        background: 'transparent',
        zIndex: 9999, // Very high z-index to appear on top
        mixBlendMode: 'screen' // Makes snowflakes blend better
      }}
    />
  );
}

