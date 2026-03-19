"use client";

import SoftAurora from '@/components/SoftAurora';
import AnimatedHeading from '@/components/AnimatedHeading';
import RevealOnScroll from '@/components/RevealOnScroll';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe, MapPin } from '@/components/icons';
import InteractiveGlobe from '@/components/InteractiveGlobe';

export default function AboutPage() {
    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* Hero Section - Black Background */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-black text-white">
                {/* SoftAurora Background */}
                <div className="absolute inset-0 w-full h-full opacity-100 pointer-events-none z-0">
                    <SoftAurora
                speed={1.8}
                scale={1.6}
                brightness={1}
                color1="#0520eb"
                color2="#6500e0"
                noiseFrequency={3}
                noiseAmplitude={1}
                bandHeight={0.4}
                bandSpread={0.5}
                octaveDecay={0.1}
                layerOffset={0}
                colorSpeed={0.7}
                enableMouseInteraction
                mouseInfluence={0.1}
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
                            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading inline-block text-white"
                        >
                            ABOUT US
                        </AnimatedHeading>
                        
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-6 tracking-tight">
                            Innovating Tomorrow's Software, Today
                        </h2>
                        
                        <p className="text-xl sm:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium">
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

                    <div className="space-y-32">
                        {/* Project 1: Synexa HR System */}
                        <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 group">
                                <div className="aspect-video bg-gray-900/50 relative">
                                    <Image 
                                        src="/hr.png" 
                                        alt="Synexa HR System Dashboard" 
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold text-white tracking-tight">Synexa HR System</h3>
                                    <div className="flex flex-wrap gap-2 text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                                        <span className="px-2 py-0.5 rounded border border-indigo-500/30 bg-indigo-500/5">Next.js</span>
                                        <span className="px-2 py-0.5 rounded border border-indigo-500/30 bg-indigo-500/5">Supabase</span>
                                        <span className="px-2 py-0.5 rounded border border-indigo-500/30 bg-indigo-500/5">PostgreSQL</span>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    A comprehensive HR management dashboard built for scale with Next.js and Supabase. It streamlines workforce operations by centralizing employee master data, real-time leave and attendance tracking, and automated multi-step payroll processing.
                                </p>
                                <a 
                                    href="https://synexa-hr-system.vercel.app/dashboard"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-white font-semibold group/link hover:text-indigo-400 transition-colors"
                                >
                                    Visit Site
                                    <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </RevealOnScroll>

                        {/* Project 2: Dynamic Design Factory */}
                        <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.1}>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 group lg:order-2">
                                <div className="aspect-video bg-gray-900/50 relative">
                                    <Image 
                                        src="/ddf.png" 
                                        alt="Dynamic Design Factory Digital Solutions" 
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6 lg:order-1">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold text-white tracking-tight">Dynamic Design Factory</h3>
                                    <div className="flex flex-wrap gap-2 text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                                        <span className="px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/5">Next.js</span>
                                        <span className="px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/5">Custom Design</span>
                                        <span className="px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/5">React</span>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    A digital solutions agency specializing in scalable, high-performance web applications and e-commerce platforms. Leveraging modern frameworks like Next.js and React, it transforms complex business requirements into elegant technological realities.
                                </p>
                                <a 
                                    href="https://www.dynamicdesignfactory.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-white font-semibold group/link hover:text-purple-400 transition-colors"
                                >
                                    Visit Site
                                    <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </RevealOnScroll>

                        {/* Project 3: SignalTradingBots */}
                        <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.2}>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 group">
                                <div className="aspect-video bg-gray-900/50 relative">
                                    <Image 
                                        src="/signal.png" 
                                        alt="SignalTradingBots Automation Tool" 
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold text-white tracking-tight">SignalTradingBots</h3>
                                    <div className="flex flex-wrap gap-2 text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                                        <span className="px-2 py-0.5 rounded border border-blue-500/30 bg-blue-500/5">Next.js</span>
                                        <span className="px-2 py-0.5 rounded border border-blue-500/30 bg-blue-500/5">Algorithms</span>
                                        <span className="px-2 py-0.5 rounded border border-blue-500/30 bg-blue-500/5">Automation</span>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    An advanced automation tool that seamlessly bridges Telegram trading signals with MetaTrader 5 for high-speed execution. Engineered for strict risk management, the bot enforces absolute discipline by applying your pre-set rules and limits to every trade.
                                </p>
                                <a 
                                    href="https://signaltradingbots.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-white font-semibold group/link hover:text-blue-400 transition-colors"
                                >
                                    Visit Site
                                    <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </RevealOnScroll>

                        {/* Project 4: Easyfinder */}
                        <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.3}>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10 group lg:order-2">
                                <div className="aspect-video bg-gray-900/50 relative">
                                    <Image 
                                        src="/easyfinder.png" 
                                        alt="Easyfinder Business Directory" 
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6 lg:order-1">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold text-white tracking-tight">Easyfinder</h3>
                                    <div className="flex flex-wrap gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                                        <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/5">Next.js</span>
                                        <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/5">Supabase</span>
                                        <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/5">Framer Motion</span>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    A premier business directory and service discovery platform tailored for the Sri Lankan market. Offers a seamless user experience with intelligent categorization, local search optimization, and comprehensive business profiles.
                                </p>
                                <a 
                                    href="https://www.easyfinder.lk/en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-white font-semibold group/link hover:text-emerald-400 transition-colors"
                                >
                                    Visit Site
                                    <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>            {/* Locations Section - Dark Background */}
            <section className="py-24 sm:py-32 bg-[#07091a] text-white relative overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(148,163,255,0.8) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                {/* Background glow blobs */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="mx-auto max-w-[1400px] px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-center">
                        <RevealOnScroll className="space-y-12 lg:pl-20">
                            <div >
                                <h2 className="text-4xl sm:text-7xl font-heading font-bold mb-6 text-white uppercase tracking-tighter leading-[0.9]">
                                    OUR<br />LOCATIONS
                                </h2>
                                <p className="text-xl text-indigo-200/60 max-w-sm leading-relaxed">
                                    Operating globally with a strategic presence in the United States and South Asia.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <div className="group flex items-start space-x-5 p-7 rounded-[2rem] bg-white/5 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/10">
                                    <div className="w-14 h-14 bg-indigo-500/20 border border-indigo-400/30 text-indigo-400 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-500/10">
                                        <Globe className="size-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-bold mb-2 uppercase tracking-[0.25em] text-indigo-400">Head Office</h3>
                                        <p className="text-lg font-bold leading-snug text-white">
                                            1207 Delaware Ave #2685,<br />
                                            Wilmington, DE 19806
                                        </p>
                                    </div>
                                </div>

                                <div className="group flex items-start space-x-5 p-7 rounded-[2rem] bg-white/5 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10">
                                    <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-500/10">
                                        <MapPin className="size-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-bold mb-2 uppercase tracking-[0.25em] text-emerald-400">Strategic Branch</h3>
                                        <p className="text-lg font-bold leading-snug text-white">
                                            Pelawatte, Western Province,<br />
                                            Sri Lanka
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2} className="flex items-start">
                            <InteractiveGlobe />
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
                            Partner with our expert software team to create AI‑driven solutions for your business.
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
