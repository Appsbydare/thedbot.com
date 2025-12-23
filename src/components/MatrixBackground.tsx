'use client';

import { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

export default function MatrixBackground({ containerRef }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef?.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container or window
    const resizeCanvas = () => {
      if (container) {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix effect settings
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    // Only animate a fraction of possible columns (20% for less visual noise)
    const activeColumns = Math.floor(columns * 0.2);
    const drops: number[] = Array(columns).fill(-1); // Start with no drops
    
    // Randomly select which columns will be active
    const activeColumnIndices = new Set<number>();
    while (activeColumnIndices.size < activeColumns) {
      activeColumnIndices.add(Math.floor(Math.random() * columns));
    }
    
    // Initialize only active columns
    activeColumnIndices.forEach(index => {
      drops[index] = Math.random() * -20; // Staggered start
    });

    // Binary characters (0 and 1)
    const binary = '01';

    // Animation function
    const draw = () => {
      // Fade effect for trailing
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      // Draw binary characters - only for active columns
      for (let i = 0; i < drops.length; i++) {
        if (drops[i] < 0) continue; // Skip inactive columns
        
        // Random binary character
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Blue gradient effect - brighter at the leading edge
        const gradient = ctx.createLinearGradient(x, y - fontSize * 10, x, y);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.5)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 1)');
        ctx.fillStyle = gradient;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly - less frequent
        if (y > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }

        drops[i] += 0.5; // Slower movement
      }
    };

    // Animation loop - slower speed
    const interval = setInterval(draw, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        background: 'rgba(0, 0, 0, 0.9)',
        zIndex: 0
      }}
    />
  );
}

