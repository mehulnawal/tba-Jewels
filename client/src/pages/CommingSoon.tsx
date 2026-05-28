import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import logo from "../assets/logo/logo.png";

const BRAND_NAME = "TBA";
const BRAND_SUBTEXT = "THE BRILLIANCE ATELIER";
const HERO_TITLE = "Coming Soon";
const HERO_SUBTEXT = "Crafting a timeless jewelry experience designed for elegance, luxury, and modern sophistication.";

// Framer Motion Animation Variants
const containerVariants = {
    // hidden: { opacity: 0 },
    // visible: {
    //     opacity: 1,
    //     transition: {
    //         staggerChildren: 0.2,
    //         delayChildren: 0.15,
    //     },
    // },
};

const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1], // Premium Apple-like cinematic ease-out
        },
    },
};

const lineRevealVariants = {
    // hidden: { width: 0, opacity: 0 },
    // visible: {
    //     width: "5rem",
    //     opacity: 0.25,
    //     transition: { duration: 2, ease: "easeInOut", delay: 0.5 },
    // },
};

export default function ComingSoonPage() {
    const [currentYear, setCurrentYear] = useState<number>(2026);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <div
            className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between select-none"
            style={{
                backgroundColor: 'var(--color-bg, #faf8f5)',
                fontFamily: 'var(--font-primary, serif)'
            }}
        >
            {/* --- LUXURY AMBIENT BACKGROUND SYSTEM --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Soft Radial Cream Base Glow */}
                <div
                    className="absolute inset-0 mix-blend-multiply opacity-60"
                    style={{
                        background: 'radial-gradient(circle at 50% 45%, var(--color-cream, #fffdfa) 0%, transparent 70%)'
                    }}
                />

                {/* Elegant Animated Teal Accent Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.12, 1],
                        x: [0, 15, 0],
                        y: [0, -25, 0],
                    }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full blur-[140px] opacity-[0.05] mix-blend-screen pointer-events-none"
                    style={{ backgroundColor: 'var(--color-teal, #005c53)' }}
                />

                <motion.div
                    animate={{
                        scale: [1.1, 0.98, 1.1],
                        x: [0, -20, 0],
                        y: [0, 25, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full blur-[160px] opacity-[0.04] mix-blend-screen pointer-events-none"
                    style={{ backgroundColor: 'var(--color-teal, #005c53)' }}
                />

                {/* Tasteful Micro Detail: Subtle Ambient Blur Circle Center */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] opacity-45 pointer-events-none"
                    style={{ boxShadow: 'var(--shadow-cream, 0 0 80px rgba(255,253,250,0.8))' }}
                />

                {/* Faint Monochromatic Film Grain/Noise Simulation Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.012] pointer-events-none bg-repeat mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
            </div>

            {/* --- HEADER LOGO & BRAND SECTION --- */}
            <header className="relative z-10 w-full pt-3 md:pt-16 px-6 flex justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center space-x-5 md:space-x-6"
                >
                    {/* Centered Logo Asset */}
                    {/* <img
                        src={logo}
                        alt="TBA Logo"
                        className="w-10 h-10 md:w-12 md:h-12 object-contain shrink-0"
                    /> */}

                    {/* Vertically Styled Minimalist Brand Text Frame */}
                    <div className="flex flex-col justify-center" style={{ borderColor: 'rgba(0, 92, 83, 0.15)' }}>
                        <span
                            className="text-2xl md:text-3xl font-light tracking-[0.25em] leading-none text-center"
                            style={{ color: 'var(--color-teal, #0f1a1c)' }}
                        >
                            {BRAND_NAME}
                        </span>
                        <span
                            className="text-[8px] md:text-[9px] tracking-[0.35em] uppercase font-medium mt-1.5 opacity-70 text-center"
                            style={{ color: 'var(--color-teal, #1c2b29)', fontFamily: 'var(--font-secondary, sans-serif)' }}
                        >
                            {BRAND_SUBTEXT}
                        </span>
                    </div>
                </motion.div>
            </header>

            {/* --- MAIN HERO CONTENT SECTION --- */}
            <main className="relative z-10 flex-grow flex items-center justify-center px-6 py-3">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl w-full mx-auto flex flex-col items-center text-center space-y-8 md:space-y-10"
                >
                    {/* Decorative Shimmer Line Detail */}
                    <motion.div
                        variants={lineRevealVariants}
                        className="h-[1px] bg-current"
                        style={{ color: 'var(--color-teal, #1c2b29)' }}
                    />

                    {/* Core Typography Block */}
                    <div className="space-y-4 md:space-y-6">
                        <motion.h1
                            variants={fadeUpVariants}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-none text-balance"
                            style={{ color: 'var(--color-teal, #0f1a1c)' }}
                        >
                            {HERO_TITLE}
                        </motion.h1>

                        <motion.p
                            variants={fadeUpVariants}
                            className="max-w-xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide text-balance opacity-80"
                            style={{ color: 'var(--color-teal, #2c3e40)', fontFamily: 'var(--font-secondary, sans-serif)' }}
                        >
                            {HERO_SUBTEXT}
                        </motion.p>
                    </div>

                    {/* Optional Micro Luxury Accent: Tiny Glowing Pulse/Sparkle */}
                    <motion.div
                        variants={fadeUpVariants}
                        className="flex items-center justify-center gap-2 text-[10px] tracking-[0.25em] uppercase opacity-40 font-medium"
                        style={{ color: 'var(--color-teal, #1c2b29)', fontFamily: 'var(--font-secondary, sans-serif)' }}
                    >
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Sparkles className="w-3 h-3 stroke-[1.2]" />
                        </motion.div>
                        <span>Excellence Awaiting</span>
                    </motion.div>

                    {/* CTA Section (Disabled Luxury Experience Button) */}
                    <motion.div variants={fadeUpVariants} className="pt-2">
                        <button
                            disabled
                            aria-disabled="true"
                            className="relative group px-9 py-4 rounded-full text-xs font-light tracking-[0.2em] uppercase overflow-hidden border backdrop-blur-md transition-all duration-700 cursor-not-allowed opacity-75"
                            style={{
                                backgroundColor: 'rgba(255, 253, 250, 0.4)',
                                borderColor: 'rgba(0, 92, 83, 0.15)',
                                color: 'var(--color-teal, #1c2b29)',
                                fontFamily: 'var(--font-secondary, sans-serif)',
                                boxShadow: 'var(--shadow-cream, 0 4px 20px rgba(255,253,250,0.5))'
                            }}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Launching Soon
                                <ArrowRight className="w-3.5 h-3.5 opacity-60 stroke-[1.5]" />
                            </span>
                            <div
                                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out pointer-events-none opacity-5"
                                style={{ backgroundColor: 'var(--color-teal, #005c53)' }}
                            />
                        </button>
                    </motion.div>
                </motion.div>
            </main>

            {/* --- FOOTER SECTION --- */}
            <footer className="relative z-10 w-full pb-8 md:pb-10 px-6 flex flex-col items-center space-y-4">
                {/* Minimal Separator Line */}
                <div
                    className="w-16 h-[1px] opacity-10"
                    style={{ backgroundColor: 'var(--color-teal, #005c53)' }}
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="text-[10px] md:text-xs tracking-widest text-center font-light"
                    style={{ color: 'var(--color-teal, #1c2b29)', fontFamily: 'var(--font-secondary, sans-serif)' }}
                >
                    &copy; {currentYear} {BRAND_SUBTEXT}. All Rights Reserved.
                </motion.div>
            </footer>
        </div>
    );
}