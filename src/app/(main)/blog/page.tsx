"use client";

import Link from "next/link";
import { blogPosts } from "@/data/blog";
import AnimatedHeading from "@/components/AnimatedHeading";
import RevealOnScroll from "@/components/RevealOnScroll";
import { ArrowRight } from "@/components/icons";
import { motion } from "framer-motion";

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-35 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-black dark:bg-black">
                <div className="absolute inset-0 hero-gradient opacity-30"></div>
                <div className="relative mx-auto max-w-6xl px-4">
                    <div className="text-center space-y-5">
                        <div className="space-y-2 hero-headings-group">
                            <div className="hero-line hero-line-left">
                                <AnimatedHeading enablePerspective={false} groupHover={true} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading inline-block">
                                    TRADING
                                </AnimatedHeading>
                            </div>
                            <div className="hero-line hero-line-left">
                                <AnimatedHeading enablePerspective={false} groupHover={true} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading inline-block">
                                    INSIGHTS
                                </AnimatedHeading>
                            </div>
                            <div className="hero-line hero-line-right">
                                <AnimatedHeading enablePerspective={false} groupHover={true} lineStyle="second" className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading inline-block">
                                    & RESOURCES
                                </AnimatedHeading>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                            className="space-y-2 pt-8 px-4 sm:px-0"
                        >
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 opacity-90 leading-relaxed">
                                Stay updated with the latest in trading automation, software tools, and market strategies.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Blog Feed */}
            <section className="py-20 relative z-10">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <RevealOnScroll key={post.slug} delay={index * 0.1}>
                                <Link href={`/blog/${post.slug}`} className="group">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-500 h-full flex flex-col">
                                        <div className="aspect-video bg-white/10 relative overflow-hidden">
                                            {/* Placeholder for blog image */}
                                            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl font-bold">
                                                {post.category}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-xs font-semibold text-accent uppercase tracking-wider px-2 py-1 bg-accent/10 rounded">
                                                    {post.category}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(post.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                                                {post.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                                                {post.description}
                                            </p>
                                            <div className="mt-auto flex items-center text-accent font-semibold text-sm">
                                                Read More
                                                <ArrowRight className="size-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
