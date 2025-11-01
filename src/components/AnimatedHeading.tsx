"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedHeading({ children, className = "" }: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!headingRef.current || hasAnimated.current) return;

    const heading = headingRef.current;
    const container = containerRef.current;
    
    // Function to process text nodes and convert characters to spans
    const processTextNode = (node: Node): void => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        const parent = node.parentNode;
        if (!parent || !text.trim()) return;

        const chars = text.split("");
        const fragment = document.createDocumentFragment();

        chars.forEach((char) => {
          const span = document.createElement("span");
          if (char === " ") {
            span.innerHTML = "&nbsp;";
          } else {
            span.textContent = char;
            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.transform = "translateY(30px)";
          }
          fragment.appendChild(span);
        });

        parent.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (element.tagName === "BR") {
          return;
        }
        const childNodes = Array.from(element.childNodes);
        childNodes.forEach(processTextNode);
      }
    };

    // Process all nodes in the heading
    const childNodes = Array.from(heading.childNodes);
    childNodes.forEach(processTextNode);

    const charSpans = Array.from(heading.querySelectorAll("span")) as HTMLElement[];

    // Initial scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    charSpans.forEach((span, index) => {
      const text = span.textContent || "";
      if (text.trim() !== "" && text !== "\u00A0") {
        tl.to(
          span,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          index * 0.03
        );
      }
    });

    // Mouse interaction states
    let isHovering = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (mouseX - centerX) / (rect.width / 2);
      const deltaY = (mouseY - centerY) / (rect.height / 2);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // If mouse is outside heading area, apply movement effect
      if (!isHovering && distance > 0.3) {
        const moveX = deltaX * 15;
        const moveY = deltaY * 15;
        
        gsap.to(heading, {
          x: moveX,
          y: moveY,
          duration: 0.5,
          ease: "power2.out",
        });
      } else if (!isHovering) {
        // Return to center when close
        gsap.to(heading, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const handleMouseEnter = () => {
      isHovering = true;
      heading.classList.add("heading-hover");
      heading.classList.remove("heading-default");
      
      // Reset position when hovering
      gsap.to(heading, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isHovering = false;
      heading.classList.remove("heading-hover");
      heading.classList.add("heading-default");
    };

    // Initially set to default state
    heading.classList.add("heading-default");

    document.addEventListener("mousemove", handleMouseMove);
    containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === heading) {
          trigger.kill();
        }
      });
      document.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="heading-container">
      <h1 ref={headingRef} className={className}>
        {children}
      </h1>
    </div>
  );
}
