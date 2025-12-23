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
  /**
   * Enables the per-character perspective/scale effect.
   * Set to false to keep entrance/hover motion without the 3D stretch.
   */
  enablePerspective?: boolean;
  /**
   * Controls the line style for single-line headings.
   * "first" = outline text, left-aligned on leave
   * "second" = solid text, right-aligned on leave
   */
  lineStyle?: "first" | "second";
  /**
   * When true, disables individual hover handling.
   * Used when multiple headings should be coordinated by a parent group hover.
   */
  groupHover?: boolean;
}

export default function AnimatedHeading({ children, className = "", enablePerspective = true, lineStyle = "first", groupHover = false }: AnimatedHeadingProps) {
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

    // Check if this is the why-choose section (no 3D perspective)
    const isWhyChoose = heading.classList.contains("cursor-heading-why-choose");
    const perspectiveEnabled = enablePerspective && !isWhyChoose;

    // Apply 3D perspective scaling to letters (skip for why-choose)
    lines.forEach((line, lineIndex) => {
      line.forEach((span, charIndex) => {
        const text = span.textContent || "";
        if (text.trim() !== "" && text !== "\u00A0") {
          const totalChars = line.length;
          let scale = 1;

          if (perspectiveEnabled) {
            // Only apply 3D perspective when enabled and not the why-choose variant
            if (lineIndex === 0) {
              const progress = charIndex / (totalChars - 1 || 1);
              scale = 1.5 - (progress * 0.6); // From 1.5 to 0.9 (more dramatic)
              span.setAttribute("data-line", "first");
            } else if (lineIndex === 1) {
              const progress = charIndex / (totalChars - 1 || 1);
              scale = 0.9 + (progress * 0.6); // From 0.9 to 1.5 (more dramatic)
              span.setAttribute("data-line", "second");
            }
          } else {
            // Without perspective, still tag lines for hover motion
            // For single-line headings, use the lineStyle prop
            if (lines.length === 1) {
              span.setAttribute("data-line", lineStyle);
            } else if (lineIndex === 0) {
              span.setAttribute("data-line", "first");
            } else if (lineIndex === 1) {
              span.setAttribute("data-line", "second");
            }
          }

          span.style.transform = perspectiveEnabled ? `scaleY(${scale})` : "none";
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
          scaleY: perspectiveEnabled ? initialScale : 1,
          x: -200,
        });

        tl.to(
          span,
          {
            opacity: 1,
            x: 0,
            duration: isWhyChoose ? 1.2 : 0.8,
            ease: isWhyChoose ? "power2.out" : "power3.out",
          },
          index * (isWhyChoose ? 0.03 : 0.02)
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
          scaleY: perspectiveEnabled ? initialScale : 1,
          x: 200,
        });

        tl.to(
          span,
          {
            opacity: 1,
            x: 0,
            duration: isWhyChoose ? 1.2 : 0.8,
            ease: isWhyChoose ? "power2.out" : "power3.out",
          },
          (firstLineSpans.length * (isWhyChoose ? 0.03 : 0.02)) + (index * (isWhyChoose ? 0.03 : 0.02))
        );
      }
    });

    // Mouse interaction states
    let isHovering = false;

    const handleMouseEnter = () => {
      if (isWhyChoose || groupHover) return; // Skip hover effects for why-choose section or when using group hover

      isHovering = true;
      heading.classList.add("heading-hover");
      heading.classList.remove("heading-default");

      // Calculate offset to center the heading
      const containerRect = container?.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();
      const parentElement = container?.parentElement;
      const parentRect = parentElement?.getBoundingClientRect();

      if (containerRect && parentRect) {
        // Calculate where center should be relative to parent
        const parentCenter = parentRect.width / 2;
        const headingCenter = (headingRect.left - parentRect.left) + (headingRect.width / 2);
        const centerOffset = parentCenter - headingCenter;

        // Animate all spans to center position
        charSpans.forEach((span) => {
          gsap.to(span, {
            x: centerOffset,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      }

      // For single-line headings, also apply additional styling
      if (lines.length === 1) {
        // No additional effects needed, centering is handled above
      } else {
        // Multi-line heading logic - apply font size changes
        charSpans.forEach((span) => {
          const isFirstLine = span.getAttribute("data-line") === "first";

          gsap.to(span, {
            scaleY: perspectiveEnabled ? 1 : 1,
            fontSize: isFirstLine ? "1.3em" : "1.0em",
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }
    };

    const handleMouseLeave = () => {
      if (isWhyChoose || groupHover) return; // Skip hover effects for why-choose section or when using group hover

      isHovering = false;
      heading.classList.remove("heading-hover");
      heading.classList.add("heading-default");

      // Restore 3D perspective to all spans and reset font size
      charSpans.forEach((span) => {
        const defaultScale = parseFloat(span.getAttribute("data-default-scale") || "1");
        gsap.to(span, {
          scaleY: perspectiveEnabled ? defaultScale : 1,
          fontSize: "",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      // Animate back to original position (x: 0)
      charSpans.forEach((span) => {
        gsap.to(span, {
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    // Initially set to default state
    heading.classList.add("heading-default");

    // Apply default positioning: no x offset - alignment is handled by parent container
    // Skip default x positioning for all headings

    containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    // Group hover handling - listen for hover on parent .hero-headings-group
    let heroGroupParent: HTMLElement | null = null;

    const handleGroupMouseEnter = () => {
      heading.classList.add("heading-hover");
      heading.classList.remove("heading-default");

      // Calculate offset to center the heading with smooth animation
      // Find the .hero-headings-group parent for proper centering
      const heroGroup = container?.closest('.hero-headings-group') as HTMLElement | null;
      const headingRect = heading.getBoundingClientRect();
      const heroGroupRect = heroGroup?.getBoundingClientRect();

      if (heroGroupRect) {
        // Calculate where center should be relative to hero-headings-group
        const groupCenter = heroGroupRect.width / 2;
        const headingCenter = (headingRect.left - heroGroupRect.left) + (headingRect.width / 2);
        const centerOffset = groupCenter - headingCenter;

        // Animate all spans to center position with smooth stagger
        // Using same timing as WHY CHOOSE entrance animation
        charSpans.forEach((span, index) => {
          gsap.to(span, {
            x: centerOffset,
            duration: 1.2,
            delay: index * 0.03,
            ease: "power2.out",
            overwrite: true, // Smoothly overwrite existing animations
          });
        });
      }

      // Subtle Y movement for a wave effect
      charSpans.forEach((span, index) => {
        gsap.to(span, {
          y: -3,
          duration: 0.4,
          delay: index * 0.02,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            gsap.to(span, {
              y: 0,
              duration: 0.5,
              ease: "power2.inOut",
            });
          }
        });
      });
    };

    const handleGroupMouseLeave = () => {
      heading.classList.remove("heading-hover");
      heading.classList.add("heading-default");

      // Reset to original position smoothly with stagger effect
      // Using same timing as WHY CHOOSE entrance animation
      charSpans.forEach((span, index) => {
        gsap.to(span, {
          x: 0,
          y: 0,
          duration: 1.2,
          delay: index * 0.03,
          ease: "power2.out",
          overwrite: true, // Smoothly overwrite existing animations
        });
      });
    };

    if (groupHover) {
      // Find the parent .hero-headings-group element
      heroGroupParent = container?.closest('.hero-headings-group') as HTMLElement | null;
      if (heroGroupParent) {
        heroGroupParent.addEventListener("mouseenter", handleGroupMouseEnter);
        heroGroupParent.addEventListener("mouseleave", handleGroupMouseLeave);
      }
    }

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === heading) {
          trigger.kill();
        }
      });
      containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);

      if (heroGroupParent) {
        heroGroupParent.removeEventListener("mouseenter", handleGroupMouseEnter);
        heroGroupParent.removeEventListener("mouseleave", handleGroupMouseLeave);
      }
    };
  }, [groupHover]);

  return (
    <div ref={containerRef} className="heading-container">
      <h1 ref={headingRef} className={className}>
        {children}
      </h1>
    </div>
  );
}
