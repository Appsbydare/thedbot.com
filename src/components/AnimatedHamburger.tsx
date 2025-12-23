"use client";

import { motion } from "framer-motion";

interface AnimatedHamburgerProps {
    isOpen: boolean;
    onClick: () => void;
}

export default function AnimatedHamburger({ isOpen, onClick }: AnimatedHamburgerProps) {
    return (
        <button
            onClick={onClick}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-accent/10 transition-colors duration-300 group"
            aria-label="Toggle mobile menu"
        >
            <div className="w-6 h-5 flex flex-col justify-between relative">
                {/* Top line */}
                <motion.span
                    className="w-full h-0.5 bg-accent rounded-full origin-center"
                    animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                        boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                    }}
                />

                {/* Middle line */}
                <motion.span
                    className="w-full h-0.5 bg-accent rounded-full origin-center"
                    animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{
                        boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                    }}
                />

                {/* Bottom line */}
                <motion.span
                    className="w-full h-0.5 bg-accent rounded-full origin-center"
                    animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                        boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                    }}
                />
            </div>

            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 rounded-lg bg-accent/20 blur-md"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                style={{ zIndex: -1 }}
            />
        </button>
    );
}
