import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import primeCollection from '../assets/primeCollection/img1.webp';

interface Product {
    id: string;
    code: string;
    name: string;
    price: string;
    image: string;
}

interface Hotspot {
    id: string;
    x: number;
    y: number;
    label: string;
    products: Product[];
}

interface Look {
    id: string;
    image: string;
    hotspots: Hotspot[];
}

const PRIME_LOOKS: Look[] = [
    {
        id: "look-1",
        image: primeCollection,
        hotspots: [
            {
                id: "spot-necklace",
                x: 49.5,
                y: 80.0,
                label: "Diamond Tier Necklace",
                products: [
                    {
                        id: "p-neck-1",
                        code: "#NK-409",
                        name: "Masterpiece Tiered Pear-Cut Diamond Necklace",
                        price: "₹4,50,000.00",
                        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80"
                    }
                ]
            }
        ]
    }
];

export default function PrimeSelection() {
    const [currentLookIndex, setCurrentLookIndex] = useState(0);
    const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();

        if (selectedHotspot) {
            // Calculate scrollbar width to prevent the page from shifting/wiggling
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollBarWidth}px`;

            // Hard lock scroll interactions
            window.addEventListener('wheel', preventDefault, { passive: false });
            window.addEventListener('touchmove', preventDefault, { passive: false });
        } else {
            // Unfreezes immediately when selectedHotspot is set to null
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            window.removeEventListener('wheel', preventDefault);
            window.removeEventListener('touchmove', preventDefault);
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            window.removeEventListener('wheel', preventDefault);
            window.removeEventListener('touchmove', preventDefault);
        };
    }, [selectedHotspot]);

    const handleHotspotClick = (e: React.MouseEvent, hotspot: Hotspot) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedHotspot(hotspot);
    };

    const handleCloseModal = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setSelectedHotspot(null);
    };

    const handlePrevLook = (e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedHotspot(null);
        setCurrentLookIndex((prev) => (prev - 1 + PRIME_LOOKS.length) % PRIME_LOOKS.length);
    };

    const handleNextLook = (e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedHotspot(null);
        setCurrentLookIndex((prev) => (prev + 1) % PRIME_LOOKS.length);
    };

    return (
        <section className="my-3 reveal-section py-12 bg-[var(--color-bg)] w-full" id="prime-selection-section">
            <div className="container mx-auto px-4 flex flex-col items-center w-full">

                {/* Headings */}
                <div className="flex flex-col items-center mb-2 text-center">
                    {/* <span className="section-label">Selected Statement Masterpieces</span> */}
                    <h2 className="font-primary text-3xl md:text-4xl text-[var(--color-text)] tracking-wide font-light">
                        Prime Collection
                    </h2>
                    <div className="w-12 h-[1px] bg-[var(--color-cream)] mt-4" />
                </div>

                {/* Canvas Viewport Container */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden bg-zinc-100 shadow-md border border-[var(--color-border-subtle)]">
                    <div className="w-full h-full relative">
                        <img
                            src={PRIME_LOOKS[currentLookIndex].image}
                            alt="Prime Collection Look"
                            className="w-full h-full object-cover object-center select-none pointer-events-none"
                        />

                        {/* Hotspots */}
                        {PRIME_LOOKS[currentLookIndex].hotspots.map((hotspot) => (
                            <div
                                key={hotspot.id}
                                className="absolute z-20"
                                style={{
                                    left: `${hotspot.x}%`,
                                    top: `${hotspot.y}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <div className="relative flex items-center justify-center w-8 h-8">
                                    <div className="absolute w-7 h-7 rounded-full border border-white/90 bg-white/10 animate-ping pointer-events-none" />

                                    <button
                                        type="button"
                                        onClick={(e) => handleHotspotClick(e, hotspot)}
                                        className="w-6 h-6 rounded-full bg-white text-zinc-900 border border-amber-200/80 font-secondary font-medium text-sm flex items-center justify-center cursor-pointer shadow-lg hover:bg-[var(--color-teal, #1c3b48)] hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110 z-30"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    {PRIME_LOOKS.length > 1 && (
                        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                            <button
                                type="button"
                                onClick={handlePrevLook}
                                className="w-9 h-9 rounded-full bg-white/90 text-zinc-800 hover:bg-white flex items-center justify-center cursor-pointer transition-all shadow-sm border-none"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={handleNextLook}
                                className="w-9 h-9 rounded-full bg-white/90 text-zinc-800 hover:bg-white flex items-center justify-center cursor-pointer transition-all shadow-sm border-none"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Clean and Buttery Smooth Popup/Drawer Layer System */}
                <AnimatePresence>
                    {selectedHotspot && (
                        <div className="fixed inset-0 z-[99999] flex items-end justify-center sm:items-center">

                            {/* Backdrop overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => handleCloseModal()}
                                className="absolute inset-0 bg-black/50 backdrop-blur-xs"
                            />

                            {/* Main Product Panel Drawer (Clean, Ease-out slide transition) */}
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ ease: "easeOut", duration: 0.3 }}
                                className="relative bg-white w-full max-w-md rounded-t-2xl sm:rounded-xl p-6 shadow-2xl border-t border-gray-100 mx-auto z-50 mb-0 sm:mb-4 pointer-events-auto"
                            >
                                <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mb-4 sm:hidden" />

                                <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3">
                                    <h3 className="font-secondary text-xs font-semibold tracking-wider uppercase text-zinc-800">
                                        Shop {selectedHotspot.label}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => handleCloseModal()}
                                        className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 cursor-pointer border-none bg-transparent transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto no-scrollbar">
                                    {selectedHotspot.products.map((product) => (
                                        <div key={product.id} className="flex gap-4 rounded-xl border border-zinc-100 p-2 bg-white">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-50 shrink-0">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div className="flex flex-col flex-1 justify-between py-1">
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-mono">
                                                        {product.code}
                                                    </span>
                                                    <h4 className="text-xs font-medium text-zinc-800 line-clamp-2 mt-0.5 font-secondary">
                                                        {product.name}
                                                    </h4>
                                                </div>

                                                <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-zinc-50">
                                                    <span className="text-xs font-bold text-zinc-900 font-secondary">
                                                        {product.price}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="flex items-center gap-1.5 rounded bg-zinc-900 hover:bg-[var(--color-teal,#1c3b48)] px-4 py-2 text-[10px] font-medium tracking-wider text-white uppercase transition-colors cursor-pointer border-none"
                                                    >
                                                        <ShoppingBag size={12} />
                                                        <span>Add</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}