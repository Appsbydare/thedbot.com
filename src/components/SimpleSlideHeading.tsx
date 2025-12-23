"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SimpleSlideHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SimpleSlideHeading({ children, className = "" }: SimpleSlideHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!headingRef.current || hasAnimated.current) return;

    const heading = headingRef.current;

    // Set initial position (off-screen to the left)
    gsap.set(heading, {
      x: -200,
      opacity: 0,
    });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    // Animate from left to center
    tl.to(heading, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    });

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === heading) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <h1 ref={headingRef} className={className}>
      {children}
    </h1>
  );
}



