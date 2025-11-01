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
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!headingRef.current || hasAnimated.current) return;

    const heading = headingRef.current;
    
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
        // Preserve BR tags, process text nodes within other elements
        if (element.tagName === "BR") {
          return;
        }
        // Recursively process child nodes
        const childNodes = Array.from(element.childNodes);
        childNodes.forEach(processTextNode);
      }
    };

    // Process all nodes in the heading
    const childNodes = Array.from(heading.childNodes);
    childNodes.forEach(processTextNode);

    const charSpans = Array.from(heading.querySelectorAll("span")) as HTMLElement[];

    // Create timeline animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    // Animate each character with stagger
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
