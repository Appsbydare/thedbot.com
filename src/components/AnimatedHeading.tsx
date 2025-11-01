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
    
    // Track which line we're processing
    let currentLineIndex = 0;
    
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
            span.setAttribute("data-line-index", currentLineIndex.toString());
          }
          fragment.appendChild(span);
        });

        parent.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (element.tagName === "BR") {
          currentLineIndex++;
          return;
        }
        const childNodes = Array.from(element.childNodes);
        childNodes.forEach(processTextNode);
      }
    };

    // Process all nodes in the heading
    currentLineIndex = 0;
    const childNodes = Array.from(heading.childNodes);
    childNodes.forEach(processTextNode);

    const charSpans = Array.from(heading.querySelectorAll("span")) as HTMLElement[];
    
    // Group characters by line using the data-line-index attribute
    const lines: HTMLElement[][] = [];
    const lineMap = new Map<number, HTMLElement[]>();
    
    charSpans.forEach((span) => {
      const text = span.textContent || "";
      if (text.trim() !== "" && text !== "\u00A0") {
        const lineIndex = parseInt(span.getAttribute("data-line-index") || "0");
        if (!lineMap.has(lineIndex)) {
          lineMap.set(lineIndex, []);
        }
        lineMap.get(lineIndex)!.push(span);
      }
    });
    
    // Sort by line index and push to lines array
    Array.from(lineMap.keys()).sort().forEach((lineIndex) => {
      const lineSpans = lineMap.get(lineIndex)!;
      if (lineSpans.length > 0) {
        lines.push(lineSpans);
      }
    });

    // Apply 3D perspective scaling to letters
    lines.forEach((line, lineIndex) => {
      line.forEach((span, charIndex) => {
        const text = span.textContent || "";
        if (text.trim() !== "" && text !== "\u00A0") {
          const totalChars = line.length;
          let scale = 1;
          
          if (lineIndex === 0) {
            // First line: start big, end small - increased perspective even more
            const progress = charIndex / (totalChars - 1 || 1);
            scale = 1.5 - (progress * 0.6); // From 1.5 to 0.9 (more dramatic)
            span.setAttribute("data-line", "first");
          } else if (lineIndex === 1) {
            // Second line: start small, end big (opposite) - increased perspective even more
            const progress = charIndex / (totalChars - 1 || 1);
            scale = 0.9 + (progress * 0.6); // From 0.9 to 1.5 (more dramatic)
            span.setAttribute("data-line", "second");
          }
          
          span.style.transform = `scaleY(${scale})`;
          span.setAttribute("data-default-scale", scale.toString());
        }
      });
    });

    // Group spans by line for entrance animations
    const firstLineSpans = lines[0] || [];
    const secondLineSpans = lines[1] || [];

    // Initial scroll-triggered animation with entrance from sides
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    // First line: animate from left
    firstLineSpans.forEach((span, index) => {
      const text = span.textContent || "";
      if (text.trim() !== "" && text !== "\u00A0") {
        const initialScale = parseFloat(span.getAttribute("data-default-scale") || "1");
        span.style.opacity = "0";
        gsap.set(span, {
          scaleY: initialScale,
          x: -200,
        });
        
        tl.to(
          span,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          index * 0.02
        );
      }
    });

    // Second line: animate from right
    secondLineSpans.forEach((span, index) => {
      const text = span.textContent || "";
      if (text.trim() !== "" && text !== "\u00A0") {
        const initialScale = parseFloat(span.getAttribute("data-default-scale") || "1");
        span.style.opacity = "0";
        gsap.set(span, {
          scaleY: initialScale,
          x: 200,
        });
        
        tl.to(
          span,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          (firstLineSpans.length * 0.02) + (index * 0.02)
        );
      }
    });

    // Mouse interaction states
    let isHovering = false;

    const handleMouseEnter = () => {
      isHovering = true;
      heading.classList.add("heading-hover");
      heading.classList.remove("heading-default");

      // Animate lines: first line slightly right, second line slightly left, then center both
      const firstLineContainer = heading.querySelector(".line-first") || firstLineSpans[0]?.parentElement;
      const secondLineContainer = heading.querySelector(".line-second") || secondLineSpans[0]?.parentElement;
      
      // Remove 3D perspective from all spans
      // Increase font size by 20% only for first line
      charSpans.forEach((span) => {
        const defaultScale = parseFloat(span.getAttribute("data-default-scale") || "1");
        const isFirstLine = span.getAttribute("data-line") === "first";
        
        gsap.to(span, {
          scaleY: 1,
          fontSize: isFirstLine ? "1.56em" : "1.0em",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      // Shift first line slightly right, then center
      firstLineSpans.forEach((span) => {
        gsap.to(span, {
          x: 30,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(span, {
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      });

      // Shift second line slightly left, then center
      secondLineSpans.forEach((span) => {
        gsap.to(span, {
          x: -30,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(span, {
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      });
    };

    const handleMouseLeave = () => {
      isHovering = false;
      heading.classList.remove("heading-hover");
      heading.classList.add("heading-default");

      // Restore 3D perspective to all spans and reset font size
      charSpans.forEach((span) => {
        const defaultScale = parseFloat(span.getAttribute("data-default-scale") || "1");
        gsap.to(span, {
          scaleY: defaultScale,
          fontSize: "",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      // Restore default positioning: first line left, second line right
      firstLineSpans.forEach((span) => {
        gsap.to(span, {
          x: -150,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      secondLineSpans.forEach((span) => {
        gsap.to(span, {
          x: 80,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    };

    // Initially set to default state
    heading.classList.add("heading-default");

    // Apply default positioning: first line left, second line right
    firstLineSpans.forEach((span) => {
      gsap.set(span, {
        x: -150,
      });
    });

    secondLineSpans.forEach((span) => {
      gsap.set(span, {
        x: 80,
      });
    });

    containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === heading) {
          trigger.kill();
        }
      });
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
