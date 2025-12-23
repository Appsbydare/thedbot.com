"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface RevealOnScrollProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export default function RevealOnScroll({
    children,
    width = "fit-content",
    delay = 0,
    direction = "up",
    className = ""
}: RevealOnScrollProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-75px" });

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
            scale: 0.95,
            filter: "blur(4px)" // Premium blur effect check
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: delay
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
}
