"use client";

import DarkVeil from '@/components/DarkVeil';
import AnimatedHeading from '@/components/AnimatedHeading';
import RevealOnScroll from '@/components/RevealOnScroll';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@/components/icons';

export default function AboutPage() {
    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* Hero Section - White Background */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-white text-black">
                {/* DarkVeil Background (Light Mode) */}
                <div className="absolute inset-0 w-full h-full opacity-100 pointer-events-none">
                    <DarkVeil
                        hueShift={180}
                        noiseIntensity={0}
                        scanlineIntensity={0.8}
                        speed={0.5}
                        scanlineFrequency={0}
                        warpAmount={0}
                        lightMode={true}
                    />
                </div>

                <div className="relative z-10 mx-auto max-w-6xl px-4 py-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <AnimatedHeading
                            enablePerspective={false}
                            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading cursor-heading-light inline-block text-black mix-blend-multiply"
                        >
                            ABOUT US
                        </AnimatedHeading>
                        
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6 tracking-tight">
                            Innovating Tomorrow's Software, Today
                        </h2>
                        
                        <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                            We combine creativity, engineering, and artificial intelligence to deliver future‑ready platforms.
                        </p>

                        <div className="pt-8">
                            <Link
                                href="/products"
                                className="group inline-flex items-center gap-3 rounded-full bg-black text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-gray-800"
                            >
                                Explore Our Work
                                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission Section - Black Background */}
            <section className="py-24 sm:py-32 bg-black text-white">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        <RevealOnScroll className="space-y-6">
                            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">OUR VISION</h2>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                To empower businesses and individuals through intelligent, adaptive software solutions that harness AI and emerging technologies.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2} className="space-y-6">
                            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">OUR MISSION</h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                We create scalable, secure, and user‑centric platforms that merge creativity with engineering excellence. Our mission is to stay ahead of digital trends, delivering solutions that inspire growth and transformation.
                            </p>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* Meet the Team Section - White Background */}
            <section className="py-24 sm:py-32 bg-white text-black">
                <div className="mx-auto max-w-6xl px-4">
                    <RevealOnScroll className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-4xl sm:text-6xl font-heading font-bold mb-6 text-black">MEET THE TEAM</h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Six minds, one vision. Our diverse expertise spans frontend development, AI integration, UX design, and project management.
                        </p>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { role: "Frontend Developer", keyword: "React Specialist" },
                            { role: "AI Engineer", keyword: "Machine Learning" },
                            { role: "UX Designer", keyword: "User Centric" },
                            { role: "Backend Engineer", keyword: "Scalable Systems" },
                            { role: "Project Manager", keyword: "Agile Leadership" },
                            { role: "QA Engineer", keyword: "Quality Assurance" }
                        ].map((member, index) => (
                            <RevealOnScroll key={index} delay={index * 0.1}>
                                <div className="group relative overflow-hidden rounded-2xl bg-gray-50 aspect-[3/4]">
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse group-hover:bg-gray-300 transition-colors" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                        <h3 className="text-xl font-bold">Team Member {index + 1}</h3>
                                        <p className="text-sm text-gray-300">{member.role}</p>
                                        <span className="text-xs text-accent mt-1 block opacity-0 group-hover:opacity-100 transition-opacity">{member.keyword}</span>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Projects Section - Black Background */}
            <section id="projects" className="py-24 sm:py-32 bg-black text-white border-t border-white/10">
                <div className="mx-auto max-w-6xl px-4">
                    <RevealOnScroll className="mb-16">
                        <h2 className="text-4xl sm:text-6xl font-heading font-bold mb-6">RECENT PROJECTS</h2>
                        <p className="text-xl text-gray-400">Innovations in AI & Software Development</p>
                    </RevealOnScroll>

                    <div className="space-y-24">
                        {/* Project 1: JO-Furniture */}
                        <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 group">
                                <div className="aspect-video bg-gray-800 relative">
                                    <Image 
                                        src="/jo.png" 
                                        alt="JO-Furniture Modern E-commerce Platform" 
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-3xl font-bold text-white">JO-Furniture</h3>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    A modern furniture e-commerce platform offering a seamless shopping experience with real-time inventory and 3D product previews.
                                </p>
                                <div className="flex flex-wrap gap-2 text-sm text-accent font-medium">
                                    <span className="px-3 py-1 rounded-full bg-white/10">Next.js</span>
                                    <span className="px-3 py-1 rounded-full bg-white/10">React</span>
                                    <span className="px-3 py-1 rounded-full bg-white/10">Tailwind CSS</span>
                                    <span className="px-3 py-1 rounded-full bg-white/10">Framer Motion</span>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Project 2: Signaltradingbots */}
                        <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 group lg:order-2">
                                <div className="aspect-video bg-gray-800 relative">
                                    <Image 
                                        src="/signal.png" 
                                        alt="Signaltradingbots high-performance trading automation" 
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6 lg:order-1">
                                <h3 className="text-3xl font-bold text-white">SignalTradingBots</h3>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    High-performance trading automation interface featuring real-time data visualization and complex algorithmic controls.
                                </p>
                                <div className="flex flex-wrap gap-2 text-sm text-accent font-medium">
                                    <span className="px-3 py-1 rounded-full bg-white/10">Next.js</span>
                                    <span className="px-3 py-1 rounded-full bg-white/10">React</span>
                                    <span className="px-3 py-1 rounded-full bg-white/10">Tailwind CSS</span>
                                    <span className="px-3 py-1 rounded-full bg-white/10">Framer Motion</span>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* Our Roots - White Background */}
            <section className="py-24 sm:py-32 bg-white text-black">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <RevealOnScroll className="space-y-6">
                            <h2 className="text-4xl sm:text-6xl font-heading font-bold mb-6 text-black">OUR ROOTS IN SRI LANKA</h2>
                            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    <strong className="text-black">Base:</strong> Pelawatte, Western Province, Sri Lanka
                                </p>
                                <p>
                                    We draw inspiration from Sri Lanka’s rich culture and vibrant landscapes, blending local creativity with global technology trends.
                                </p>
                            </div>
                        </RevealOnScroll>
                        
                        <RevealOnScroll delay={0.2} className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-8">
                                <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                    <span className="absolute bottom-4 left-4 text-xs font-bold bg-white/80 px-2 py-1 rounded">Modern Workspace</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                    <span className="absolute bottom-4 left-4 text-xs font-bold bg-white/80 px-2 py-1 rounded">Local Scenery</span>
                                </div>
                                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                    <span className="absolute bottom-4 left-4 text-xs font-bold bg-white/80 px-2 py-1 rounded">Collaboration</span>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* Contact Section - Black Background */}
            <section className="min-h-screen flex items-center justify-center py-24 sm:py-32 bg-black text-white relative overflow-hidden">
                {/* Background Element */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black pointer-events-none" />
                
                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                    <RevealOnScroll className="space-y-8">
                        <AnimatedHeading
                            enablePerspective={false}
                            className="text-5xl sm:text-7xl md:text-8xl font-heading tracking-tight leading-[0.9] cursor-heading "
                        >
                            LET'S BUILD
                            <br />
                            THE FUTURE
                        </AnimatedHeading>
                        
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Partner with our Sri Lanka software team to create AI‑driven solutions for your business.
                        </p>

                        <div className="flex flex-col items-center gap-6 justify-center pt-8">
                            <Link
                                href="/contact"
                                className="inline-flex justify-center items-center gap-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                                Contact Us
                                <ArrowRight className="size-5" />
                            </Link>
                            
                            <div className="flex gap-8 items-center justify-center">
                                {/* Social Icons Placeholders */}
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
        </div>
    );
}
