'use client';

import { useEffect, useRef, useState } from 'react';

const LOCATIONS = [
  {
    lat: 39.744655,
    lng: -75.5483,
    label: 'Head Office',
    city: 'Wilmington, DE',
    color: '#818cf8',
    size: 28,
  },
  {
    lat: 6.9271,
    lng: 79.8612,
    label: 'Branch',
    city: 'Pelawatte, Sri Lanka',
    color: '#34d399',
    size: 28,
  },
];

const markerSvg = (color: string) => `
<svg viewBox="-4 0 36 36" xmlns="http://www.w3.org/2000/svg">
  <path fill="${color}" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"/>
  <circle fill="white" cx="14" cy="12" r="6"/>
</svg>`;

export default function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!containerRef.current || globeRef.current) return;

    let Globe: any;

    const init = async () => {
      // Dynamically import to avoid SSR issues
      const mod = await import('globe.gl');
      Globe = mod.default;

      const mobile = window.innerWidth < 1024;
      const width = containerRef.current!.clientWidth;
      const height = containerRef.current!.clientHeight || (mobile ? 400 : 700);

      const globe = Globe()(containerRef.current!)
        // Earth texture — beautiful dark night earth from CDN
        .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg')
        .bumpImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png')
        // Atmosphere
        .showAtmosphere(true)
        .atmosphereColor('#3b82f6')
        .atmosphereAltitude(0.18)
        // Graticule lines
        .showGraticules(true)
        // Background — transparent so section bg shows
        .backgroundColor('rgba(0,0,0,0)')
        // Size
        .width(width)
        .height(height)
        // HTML pin markers
        .htmlElementsData(LOCATIONS)
        .htmlLat('lat')
        .htmlLng('lng')
        .htmlAltitude(0.01)
        .htmlElement((d: any) => {
          const wrapper = document.createElement('div');
          wrapper.style.cursor = 'pointer';
          wrapper.style.transition = 'transform 0.2s ease';
          wrapper.addEventListener('mouseenter', () => {
            wrapper.style.transform = 'scale(1.2)';
          });
          wrapper.addEventListener('mouseleave', () => {
            wrapper.style.transform = 'scale(1)';
          });

          // Pin SVG
          const pin = document.createElement('div');
          pin.innerHTML = markerSvg(d.color);
          pin.style.width = `${d.size}px`;
          pin.style.filter = `drop-shadow(0 0 8px ${d.color})`;

          // Label
          const label = document.createElement('div');
          label.style.cssText = `
            position: absolute;
            top: -38px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(10,12,30,0.92);
            border: 1px solid ${d.color}55;
            border-radius: 8px;
            padding: 4px 10px;
            white-space: nowrap;
            font-family: Inter, sans-serif;
            pointer-events: none;
            backdrop-filter: blur(8px);
          `;
          label.innerHTML = `
            <div style="font-size:10px;font-weight:700;color:${d.color};letter-spacing:0.1em;text-transform:uppercase;">${d.label}</div>
            <div style="font-size:11px;color:#e2e8f0;font-weight:600;">${d.city}</div>
          `;

          wrapper.style.position = 'relative';
          wrapper.appendChild(label);
          wrapper.appendChild(pin);
          return wrapper;
        })
        .htmlElementVisibilityModifier((el: HTMLElement, isVisible: boolean) => {
          el.style.opacity = isVisible ? '1' : '0';
          el.style.transition = 'opacity 300ms ease';
        });

      // Altitude tuned responsively to ensure globe is centered and fits on all screens
      globe.pointOfView({ lat: 20, lng: -10, altitude: mobile ? 3.2 : 1.8 }, 0);

      // Auto rotate
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.6;
      globe.controls().enableDamping = true;
      globe.controls().dampingFactor = 0.1;
      globe.controls().minDistance = 150;
      globe.controls().maxDistance = 700;

      // Stop auto-rotate on drag, resume after
      const controls = globe.controls();
      const resumeTimer = { current: 0 };
      controls.addEventListener('start', () => {
        controls.autoRotate = false;
        clearTimeout(resumeTimer.current);
      });
      controls.addEventListener('end', () => {
        resumeTimer.current = window.setTimeout(() => {
          controls.autoRotate = true;
        }, 2500);
      });

      globeRef.current = globe;

      // Responsive resize
      const handleResize = () => {
        if (!containerRef.current) return;
        const mobileResized = window.innerWidth < 1024;
        globe.width(containerRef.current.clientWidth);
        globe.height(containerRef.current.clientHeight || (mobileResized ? 400 : 700));
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resumeTimer.current);
      };
    };

    init();

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center lg:items-start">
      {/* Globe container */}
      <div
        ref={containerRef}
        style={{ 
          width: isMobile ? '100%' : '200%', 
          height: isMobile ? 400 : 700, 
          marginLeft: isMobile ? '0' : '10%',
        }}
        className="max-w-none"
      />
      {/* Legend */}
      <div 
        className="flex flex-row items-center justify-center lg:justify-start gap-6 sm:gap-10 mt-6 text-xs sm:text-sm font-medium whitespace-nowrap" 
        style={{ marginLeft: isMobile ? '0' : '35%' }}
      >
        {LOCATIONS.map((loc) => (
          <span key={loc.city} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: loc.color, boxShadow: `0 0 8px ${loc.color}` }}
            />
            <span style={{ color: loc.color }}>{loc.city}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
