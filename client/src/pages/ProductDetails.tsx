import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    Heart,
    Play,
    Truck,
    ShieldCheck,
    RotateCcw,
    Gem,
    Maximize2,
    ChevronLeft,
    ChevronRight,
    Award,
    Scale,
    Layers,
    Clock,
    HelpCircle,
    ChevronDown
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//    PRODUCT DATA STRUCTURE 
const PRODUCT_DATA = {
    name: "The Aurelia Eternal Cascade Diamond Necklace",
    slug: "aurelia-eternal-cascade-diamond-necklace",
    shortDescription: "An exquisite composition of cascading brilliant-cut pear diamonds, individually hand-set in flowing ripples of liquid 18-karat gold.",
    storyDescription: "Inspired by the fluid beauty of falling water, the Aurelia Cascade Necklace rests gracefully against the collarbone. Handcrafted over 84 hours by our master artisans, it uses a signature micro-claw setting to maximize the natural brilliance and fire of every diamond.",
    category: "Jewellery",
    subCategory: "Necklaces",
    sku: "AU-NCK-0092-2026",
    collection: "L'Oasis Lumineuse",
    goldWeight: 14.20, // Converted to number for dynamic pricing accuracy
    makingChargePerGram: 850,
    availableKarats: [14, 18, 22],
    availableSizes: [14, 16, 18],
    metalDetails: {
        type: "18k Solid Yellow Gold",
        hallmark: "BIS Hallmarked (916 Pure Gold Engraving)",
        weight: "14.20g Net Weight"
    },
    diamondDetails: {
        totalCarat: "2.30 carats total weight",
        composition: [
            { type: "Pear Cut Diamonds", weight: "1.45 ct total", count: "7 stones", quality: "VVS1 Clarity, E-F Colorless" },
            { type: "Round Brilliant Diamonds", weight: "0.85 ct total", count: "42 stones", quality: "VVS2 Clarity, F Color" }
        ]
    },
    certifications: [
        { title: "GIA Graded Accents", desc: "Global gemstone authority verification" },
        { title: "SGL Certified", desc: "Independent laboratory authenticity registry" },
        { title: "BIS 916 Hallmarked", desc: "Government guaranteed metal purity" }
    ],
    media: [
        {
            type: "image",
            url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
            alt: "The Aurelia Eternal Cascade Necklace on elegant display"
        },
        {
            type: "image",
            url: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=85",
            alt: "Close-up detail of the hand-crafted diamond settings"
        },
        {
            type: "image",
            url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85",
            alt: "Editorial perspective of the collection styling"
        },
        {
            type: "video",
            youtubeId: "dQw4w9WgXcQ",
            thumbnail: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=85"
        }
    ],
    highlights: [
        "Ethically sourced, conflict-free certified diamonds",
        "Articulated links designed to contour seamlessly to your movement",
        "Signature secure dual-lock luxury safety clasp",
        "Includes Lifetime Brilliance Warranty & annual complimentary maintenance"
    ],
    specifications: {
        productCode: "JN-2026-AURELIA",
        height: "32 mm",
        width: "14 mm",
        length: "406 mm",
        chainLength: "16 inches (Adjustable built-in loops up to 18 inches)"
    },
    shippingAndReturns: {
        delivery: "5–7 business days via high-security fully insured transit",
        security: "Requires state-issued signature and secure multi-factor OTP code upon arrival",
        returns: "Complimentary 14-day absolute exchange window"
    },
    averageRating: 4.9,
    totalReviews: 4,
    faq: [
        {
            question: "How can I verify the authenticity of the materials?",
            answer: "Every piece arrives accompanied by independent laboratory grading certificates from the GIA or SGL, alongside a physical Bureau of Indian Standards (BIS) hallmark laser-engraved into the inner gold framework."
        },
        {
            question: "What does the Lifetime Warranty cover?",
            answer: "Our lifetime commitment covers professional ultrasonic deep cleaning, prong tightening, clasp safety inspections, and gold re-polishing. Insured transit to our atelier is fully arranged by our white-glove concierges."
        },
        {
            question: "Can the chain length be customized further?",
            answer: "Yes, the necklace arrives with built-in loop adjustments at 14, 16, and 18 inches. If you require a bespoke custom sizing run, our physical boutiques offer complimentary tailored adjustments anytime."
        }
    ]
};

const REVIEWS_DATA = [
    {
        name: "Eleanora Vance",
        rating: 5,
        text: "The balance of this necklace is extraordinary. It doesn't shift or twist when walking; it contours precisely against the skin. The diamond clarity is blinding under soft evening dining lights.",
        date: "October 14, 2025",
        initials: "EV"
    },
    {
        name: "Rajesh K. Mehta",
        rating: 5,
        text: "Purchased as a landmark milestone gift for my wife's anniversary. The packaging experience was theatrical, and the weight of the gold feels substantial yet effortless.",
        date: "January 03, 2026",
        initials: "RM"
    },
    {
        name: "Dr. Clara Thorne",
        rating: 5,
        text: "The craftsmanship around the cascade loops is flawless. The clasp is deeply secure, which is a profound benefit for a piece of this magnitude. Truly remarkable engineering.",
        date: "February 24, 2026",
        initials: "CT"
    },
    {
        name: "Anya Henderson",
        rating: 4,
        text: "A beautifully understated luxury statement. It is significantly more subtle and elegant in person than close-up studio photography conveys. Ideal for those who value quiet luxury.",
        date: "April 11, 2026",
        initials: "AH"
    }
];

const SIMILAR_PRODUCTS = [
    {
        name: "Aurelia Cascade Drop Earrings",
        price: 185000,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
        collection: "L'Oasis Lumineuse"
    },
    {
        name: "Eternity Contour Diamond Ring",
        price: 142000,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
        collection: "L'Oasis Lumineuse"
    },
    {
        name: "Lumine Minimalist Cuff Bangle",
        price: 295000,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
        collection: "Quiet Splendour"
    }
];

/* ==========================================================================
   PRICING & FORMATTING UTILITIES (REMOVED FIXED CODES)
   ========================================================================== */
const BASE_GOLD_RATE_22K = 7250;

const calculateDynamicPrice = (selectedKarat: number, weight: number, makingCharge: number) => {
    const karatMultiplier = selectedKarat === 22 ? 1.0 : selectedKarat === 18 ? 0.82 : 0.65;
    const rawGoldCost = weight * (BASE_GOLD_RATE_22K * karatMultiplier);
    const totalMakingCharges = weight * makingCharge;
    const stonePremiumEstimation = 165000;
    return Math.round(rawGoldCost + totalMakingCharges + stonePremiumEstimation);
};

const formatPriceINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
};

/* ==========================================================================
   SUB-COMPONENT: FAQ ACCORDION
   ========================================================================== */
function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-[var(--color-border-subtle)] py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-2 text-sm text-[var(--color-text-secondary)] font-medium transition-colors hover:text-[var(--color-teal-light)]"
            >
                <span>{question}</span>
                <ChevronDown className={`w-4 h-4 text-[var(--color-text-muted)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 pt-1 text-xs text-[var(--color-text-muted)] leading-relaxed font-light">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
export default function ProductDetailPage() {
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo({ top: 0, left: 0 });
    }, []);

    const [selectedKarat, setSelectedKarat] = useState(18);
    const [selectedSize, setSelectedSize] = useState(16);
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    const [activeReviewIndex, setActiveReviewIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
    const [isFullscreenZoomOpen, setIsFullscreenZoomOpen] = useState(false);

    const mainImageRef = useRef<HTMLDivElement>(null);
    const [zoomStyle, setZoomStyle] = useState({ display: "none", backgroundPosition: "0% 0%", backgroundImage: "" });

    const activeMedia = PRODUCT_DATA.media[activeMediaIndex] || PRODUCT_DATA.media[0];

    // Dynamic pricing now utilizes live variables from our data source config
    const currentPrice = useMemo(() => {
        return calculateDynamicPrice(selectedKarat, PRODUCT_DATA.goldWeight, PRODUCT_DATA.makingChargePerGram);
    }, [selectedKarat]);

    useEffect(() => {
        document.body.style.overflow = (videoModalUrl || isFullscreenZoomOpen) ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [videoModalUrl, isFullscreenZoomOpen]);

    // Zoom Handling
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!mainImageRef.current) return;
        const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomStyle({
            display: "block",
            backgroundPosition: `${x}% ${y}%`,
            backgroundImage: `url(${activeMedia.url})`
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle(prev => ({ ...prev, display: "none" }));
    };

    const handlePrevMedia = () => {
        setActiveMediaIndex((prev) => (prev === 0 ? PRODUCT_DATA.media.length - 1 : prev - 1));
    };

    const handleNextMedia = () => {
        setActiveMediaIndex((prev) => (prev === PRODUCT_DATA.media.length - 1 ? 0 : prev + 1));
    };

    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Simple redirection strategy handler mock for navigation actions
    useEffect(() => {
        if (searchQuery) {
            console.log(`Redirecting/Filtering items for query: ${searchQuery}`);
        }
    }, [searchQuery]);

    return (
        <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen selection:bg-[var(--color-bg-secondary)] antialiased font-secondary">
            <Navbar
                onSearchChange={setSearchQuery}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            {/* MAIN CONTAINER */}
            <main className="container mx-auto px-4 md:px-6 pt-6 pb-16 max-w-[1320px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                    {/* FIXED & RESPONSIVE MEDIA PANEL (WORKS ON DESKTOP & MOBILE SIMULTANEOUSLY) */}
                    <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4 items-start w-full relative">

                        {/* Thumbnails list sidebar tracker layout (Always visible on all screen sizes now) */}
                        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-[76px] overflow-x-auto sm:overflow-x-visible shrink-0 order-2 sm:order-1 py-1 sm:py-0 no-scrollbar">
                            {PRODUCT_DATA.media.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveMediaIndex(index)}
                                    className={`relative aspect-[4/5] w-14 sm:w-full rounded-[var(--radius-sm)] border overflow-hidden transition-all shrink-0 ${activeMediaIndex === index
                                        ? "border-[var(--color-teal)] opacity-100 shadow-[var(--shadow-sm)] scale-95"
                                        : "border-[var(--color-border-subtle)] opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <img
                                        src={item.type === "video" ? item.thumbnail : item.url}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover select-none"
                                    />
                                    {item.type === "video" && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <Play className="w-4 h-4 text-white fill-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Focus Stage Panel Frame */}
                        <div className="relative flex-1 w-full aspect-[4/5] max-h-[660px] bg-[var(--color-bg-secondary)] rounded-[var(--radius-sm)] overflow-hidden border border-[var(--color-border-subtle)] order-1 sm:order-2 group">
                            {activeMedia.type !== "video" ? (
                                <div
                                    ref={mainImageRef}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => setIsFullscreenZoomOpen(true)}
                                    className="relative w-full h-full cursor-zoom-in"
                                >
                                    <motion.img
                                        key={activeMedia.url}
                                        initial={{ opacity: 0.85 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.25 }}
                                        src={activeMedia.url}
                                        alt={activeMedia.alt}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Desktop Hover Zoom Layer */}
                                    <div
                                        className="absolute inset-0 pointer-events-none bg-no-repeat transition-opacity duration-150 hidden md:block"
                                        style={{
                                            ...zoomStyle,
                                            backgroundSize: "220%",
                                            opacity: zoomStyle.display === "block" ? 1 : 0
                                        }}
                                    />
                                </div>
                            ) : (
                                <div
                                    className="relative w-full h-full cursor-pointer"
                                    onClick={() => setVideoModalUrl(activeMedia.youtubeId || null)}
                                >
                                    <img src={activeMedia.thumbnail} alt="Video cover display" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md text-[var(--color-teal)] transition-transform group-hover:scale-105">
                                            <Play className="w-5 h-5 ml-0.5 fill-current" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Manual Swipe/Navigation Buttons (Accessible on mobile/tablet views directly) */}
                            <button
                                onClick={handlePrevMedia}
                                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-[var(--color-teal)] shadow-sm md:opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Previous Media"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleNextMedia}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-[var(--color-teal)] shadow-sm md:opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Next Media"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            {activeMedia.type !== "video" && (
                                <button
                                    onClick={() => setIsFullscreenZoomOpen(true)}
                                    className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 text-[var(--color-teal)] shadow-sm"
                                    aria-label="Zoom Image"
                                >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* PRODUCT CONFIGURATOR SIDEBAR PANEL */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 w-full">
                        <div className="space-y-1">
                            <span className="text-[10px] tracking-[0.25em] font-medium text-[var(--color-text-muted)] uppercase block">
                                {PRODUCT_DATA.collection} Collection
                            </span>
                            <h1 className="font-primary text-2xl md:text-3xl lg:text-4xl text-[var(--color-teal)] font-normal leading-snug tracking-wide">
                                {PRODUCT_DATA.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[var(--color-text-muted)]">
                                <div className="flex items-center space-x-1 text-[var(--color-teal)]">
                                    <Star className="w-3.5 h-3.5 fill-current" />
                                    <span className="font-semibold">{PRODUCT_DATA.averageRating}</span>
                                </div>
                                <span>•</span>
                                <a href="#reviews-anchor" className="underline underline-offset-4 hover:text-[var(--color-teal)] transition-colors">
                                    {PRODUCT_DATA.totalReviews} Verified Reviews
                                </a>
                                <span>•</span>
                                <span className="font-mono text-[11px]">SKU: {PRODUCT_DATA.sku}</span>
                            </div>
                        </div>

                        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-4 rounded-[var(--radius-sm)]">
                            <div className="text-xl font-light tracking-tight text-[var(--color-text-secondary)]">
                                {formatPriceINR(currentPrice)}
                            </div>
                            <p className="text-[10px] tracking-wider text-[var(--color-text-muted)] mt-1 uppercase">
                                Transparent Price Breakdown • Inclusive of All Taxes & Custom Duties
                            </p>
                        </div>

                        <p className="text-xs md:text-sm text-[var(--color-text-muted)] font-light leading-relaxed">
                            {PRODUCT_DATA.shortDescription}
                        </p>

                        {/* PRODUCT CONFIG OPTIONS */}
                        <div className="space-y-4 pt-1">
                            {/* Karats Option */}
                            <div className="space-y-2">
                                <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-text-muted)] block font-medium">
                                    Gold Purity: <span className="text-[var(--color-text-secondary)] font-semibold">{selectedKarat}K Gold</span>
                                </span>
                                <div className="flex gap-2">
                                    {PRODUCT_DATA.availableKarats.map((karat) => (
                                        <button
                                            key={karat}
                                            onClick={() => setSelectedKarat(karat)}
                                            className={`px-4 py-2 text-xs tracking-wider rounded-[var(--radius-sm)] border transition-all ${selectedKarat === karat
                                                ? "border-[var(--color-teal)] bg-[var(--color-teal)] text-white font-medium"
                                                : "border-[var(--color-border)] text-[var(--color-text-muted)] bg-transparent hover:border-[var(--color-teal-light)] hover:text-[var(--color-teal)]"
                                                }`}
                                        >
                                            {karat}K
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sizing Option */}
                            <div className="space-y-2">
                                <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-text-muted)] block font-medium">
                                    Chain Length: <span className="text-[var(--color-text-secondary)] font-semibold">{selectedSize} Inches</span>
                                </span>
                                <div className="flex gap-2">
                                    {PRODUCT_DATA.availableSizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 text-xs tracking-wider rounded-[var(--radius-sm)] border transition-all ${selectedSize === size
                                                ? "border-[var(--color-teal)] bg-[var(--color-teal)] text-white font-medium"
                                                : "border-[var(--color-border)] text-[var(--color-text-muted)] bg-transparent hover:border-[var(--color-teal-light)] hover:text-[var(--color-teal)]"
                                                }`}
                                        >
                                            {size}"
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Highlight Features */}
                        <div className="border-t border-[var(--color-border-subtle)] pt-4 space-y-2">
                            {PRODUCT_DATA.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-start space-x-2 text-xs text-[var(--color-text-muted)] font-light">
                                    <Gem className="w-3.5 h-3.5 text-[var(--color-cream)] shrink-0 mt-0.5" />
                                    <span>{highlight}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA ACTION BUTTONS*/}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                            <button className="flex-1 border border-[var(--color-teal)] text-[var(--color-teal)] hover:bg-[var(--color-teal)] hover:text-white py-3.5 text-xs font-semibold tracking-widest uppercase rounded-[var(--radius-sm)] transition-colors">
                                Add To Cart
                            </button>
                            <button className="flex-1 bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white py-3.5 text-xs font-semibold tracking-widest uppercase rounded-[var(--radius-sm)] transition-colors shadow-sm">
                                Secure Purchase
                            </button>
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`p-3.5 border rounded-[var(--radius-sm)] transition-colors flex items-center justify-center shrink-0 ${isWishlisted ? "bg-red-50/50 border-red-200 text-red-500" : "border-[var(--color-border)] hover:border-[var(--color-teal)] text-[var(--color-text-muted)]"
                                    }`}
                                aria-label="Add to Wishlist"
                            >
                                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* DESIGN STORY BANNER */}
            <section className="bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)] py-12 my-8">
                <div className="container mx-auto px-4 max-w-[760px] text-center space-y-3">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] block">
                        Design Character & Heritage
                    </span>
                    <h2 className="font-primary text-2xl text-[var(--color-teal)] font-normal tracking-wide">
                        The Artisan Story
                    </h2>
                    <div className="w-8 h-[1px] bg-[var(--color-cream)] mx-auto" />
                    <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed italic font-light">
                        "{PRODUCT_DATA.storyDescription}"
                    </p>
                </div>
            </section>

            {/* TECHNICAL DETAILS SECTION */}
            <section className="container mx-auto px-4 md:px-6 py-12 max-w-[1320px]">
                <div className="text-center space-y-1 mb-10">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] block">
                        Specifications Matrix
                    </span>
                    <h2 className="font-primary text-2xl text-[var(--color-teal)] tracking-wide">
                        Product Specifications
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {/* Block 1: Diamonds */}
                    <div className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-6 rounded-[var(--radius-sm)] flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-[var(--color-teal)]">
                                <Gem className="w-4 h-4" />
                                <h3 className="font-primary text-base font-normal tracking-wide">Diamond Details</h3>
                            </div>
                            <p className="text-xs text-[var(--color-text-muted)] font-mono">{PRODUCT_DATA.diamondDetails.totalCarat}</p>

                            <div className="space-y-3 pt-1 border-t border-[var(--color-border-subtle)]">
                                {PRODUCT_DATA.diamondDetails.composition.map((stone, idx) => (
                                    <div key={idx} className="space-y-0.5">
                                        <div className="text-xs font-semibold text-[var(--color-text-secondary)]">{stone.type}</div>
                                        <div className="text-[11px] text-[var(--color-text-muted)] font-light leading-normal">
                                            {stone.count} • {stone.weight} • {stone.quality}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Block 2: Metal */}
                    <div className="border border-[var(--color-border-subtle)] bg-white p-6 rounded-[var(--radius-sm)] flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-[var(--color-teal)]">
                                <Scale className="w-4 h-4" />
                                <h3 className="font-primary text-base font-normal tracking-wide">Metal Specifications</h3>
                            </div>
                            <p className="text-xs text-[var(--color-text-muted)] font-light">Solid gold metrics configured dynamically to specifications.</p>

                            <div className="space-y-2 pt-2 border-t border-[var(--color-border-subtle)] text-xs">
                                <div className="flex justify-between py-1 border-b border-[var(--color-border-tertiary)]">
                                    <span className="text-[var(--color-text-muted)] font-light">Metal Classification</span>
                                    <span className="text-[var(--color-text-secondary)] font-medium">{PRODUCT_DATA.metalDetails.type}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-[var(--color-border-tertiary)]">
                                    <span className="text-[var(--color-text-muted)] font-light">Net Weight Allocation</span>
                                    <span className="text-[var(--color-text-secondary)] font-medium">{PRODUCT_DATA.metalDetails.weight}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-[var(--color-text-muted)] font-light">Purity Hallmarking</span>
                                    <span className="text-[var(--color-text-secondary)] font-medium">{PRODUCT_DATA.metalDetails.hallmark}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Block 3: Size Dimensions */}
                    <div className="border border-[var(--color-border-subtle)] bg-white p-6 rounded-[var(--radius-sm)] flex flex-col justify-between space-y-4 md:col-span-2 lg:col-span-1">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-[var(--color-teal)]">
                                <Layers className="w-4 h-4" />
                                <h3 className="font-primary text-base font-normal tracking-wide">Dimensions & Fit</h3>
                            </div>
                            <p className="text-xs text-[var(--color-text-muted)] font-light">Laser checked scale measurements of the polished artisan piece.</p>

                            <div className="space-y-2 pt-2 border-t border-[var(--color-border-subtle)] text-xs">
                                <div className="flex justify-between py-1 border-b border-[var(--color-border-tertiary)]">
                                    <span className="text-[var(--color-text-muted)] font-light">Product Identifier</span>
                                    <span className="text-[var(--color-text-secondary)] font-mono">{PRODUCT_DATA.specifications.productCode}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-[var(--color-border-tertiary)]">
                                    <span className="text-[var(--color-text-muted)] font-light">Size (W x H)</span>
                                    <span className="text-[var(--color-text-secondary)] font-medium">{PRODUCT_DATA.specifications.width} × {PRODUCT_DATA.specifications.height}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-[var(--color-text-muted)] font-light">Total Length</span>
                                    <span className="text-[var(--color-text-secondary)] font-medium">{PRODUCT_DATA.specifications.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CERTIFICATIONS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-4 border-t border-[var(--color-border-subtle)]">
                    {PRODUCT_DATA.certifications.map((cert, i) => (
                        <div key={i} className="flex items-start space-x-3 p-3 bg-white border border-[var(--color-border-tertiary)] rounded-[var(--radius-sm)]">
                            <Award className="w-4 h-4 text-[var(--color-cream)] shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-semibold text-[var(--color-text-secondary)]">{cert.title}</h4>
                                <p className="text-[11px] text-[var(--color-text-muted)] font-light mt-0.5">{cert.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FULFILLMENT & FAQ INTEGRATION */}
            <section className="bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)] py-12 my-4">
                <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Shipping details */}
                        <div className="lg:col-span-5 space-y-4 bg-white border border-[var(--color-border-subtle)] p-6 rounded-[var(--radius-sm)]">
                            <div className="flex items-center space-x-2 text-[var(--color-teal)]">
                                <Clock className="w-4 h-4" />
                                <h3 className="font-primary text-lg font-normal tracking-wide">Shipping & Delivery</h3>
                            </div>

                            <div className="space-y-4 text-xs pt-2 border-t border-[var(--color-border-subtle)] text-[var(--color-text-muted)] font-light">
                                <div className="flex items-start space-x-3">
                                    <Truck className="w-4 h-4 text-[var(--color-cream)] shrink-0" />
                                    <span>{PRODUCT_DATA.shippingAndReturns.delivery}</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <ShieldCheck className="w-4 h-4 text-[var(--color-cream)] shrink-0" />
                                    <span>{PRODUCT_DATA.shippingAndReturns.security}</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <RotateCcw className="w-4 h-4 text-[var(--color-cream)] shrink-0" />
                                    <span>{PRODUCT_DATA.shippingAndReturns.returns}</span>
                                </div>
                            </div>
                        </div>

                        {/* FAQs Accordion */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="flex items-center space-x-2 text-[var(--color-teal)] mb-2">
                                <HelpCircle className="w-4 h-4" />
                                <h3 className="font-primary text-lg font-normal tracking-wide">Frequently Asked Questions</h3>
                            </div>
                            <div className="bg-white border border-[var(--color-border-subtle)] p-4 md:p-6 rounded-[var(--radius-sm)]">
                                {PRODUCT_DATA.faq.map((item, index) => (
                                    <FaqItem key={index} question={item.question} answer={item.answer} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VERIFIED CUSTOMER REVIEWS */}
            <section id="reviews-anchor" className="container mx-auto px-4 md:px-6 py-12 max-w-[900px]">
                <div className="text-center space-y-1 mb-8">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] block">
                        Customer Testimonials
                    </span>
                    <h2 className="font-primary text-2xl text-[var(--color-teal)] tracking-wide">
                        Verified Reviews
                    </h2>
                </div>

                <div className="relative min-h-[200px] bg-white border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)] p-6 md:p-10 flex flex-col items-center justify-center text-center">
                    <button
                        onClick={() => setActiveReviewIndex(prev => prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1)}
                        className="hidden md:flex absolute left-4 p-2 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-teal)] hover:border-[var(--color-teal)] transition-all"
                        aria-label="Previous Review"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setActiveReviewIndex(prev => prev === REVIEWS_DATA.length - 1 ? 0 : prev + 1)}
                        className="hidden md:flex absolute right-4 p-2 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-teal)] hover:border-[var(--color-teal)] transition-all"
                        aria-label="Next Review"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeReviewIndex}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4 max-w-[620px] mx-auto flex flex-col items-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-xs font-semibold text-[var(--color-teal)]">
                                {REVIEWS_DATA[activeReviewIndex].initials}
                            </div>

                            <div className="flex space-x-0.5 justify-center">
                                {[...Array(5)].map((_, idx) => (
                                    <Star
                                        key={idx}
                                        className={`w-3.5 h-3.5 ${idx < REVIEWS_DATA[activeReviewIndex].rating ? "fill-[var(--color-teal)] text-[var(--color-teal)]" : "text-[var(--color-border-subtle)]"}`}
                                    />
                                ))}
                            </div>

                            <p className="text-xs md:text-sm text-[var(--color-text-secondary)] font-light leading-relaxed italic">
                                "{REVIEWS_DATA[activeReviewIndex].text}"
                            </p>

                            <div className="space-y-0.5">
                                <h4 className="text-[11px] font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
                                    {REVIEWS_DATA[activeReviewIndex].name}
                                </h4>
                                <span className="text-[10px] text-[var(--color-text-muted)] block font-light">
                                    Verified Buyer — {REVIEWS_DATA[activeReviewIndex].date}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Carousel dots indicator navigation panel */}
                    <div className="flex md:hidden items-center justify-center space-x-2 pt-6">
                        {REVIEWS_DATA.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveReviewIndex(idx)}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${activeReviewIndex === idx ? "bg-[var(--color-teal)]" : "bg-[var(--color-cream)]"}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CURATED SUITE SELECTIONS */}
            <section className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-subtle)] py-16">
                <div className="container mx-auto px-4 md:px-6 max-w-[1320px] space-y-8">
                    <div>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] block mb-1">
                            Complete The Suite Selection
                        </span>
                        <h3 className="font-primary text-xl md:text-2xl text-[var(--color-teal)] tracking-wide font-normal">
                            Companion Masterpieces
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SIMILAR_PRODUCTS.map((prod, index) => (
                            <div key={index} className="group bg-white border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)] overflow-hidden shadow-none hover:shadow-[var(--shadow-sm)] transition-all">
                                <div className="aspect-[4/5] overflow-hidden bg-[var(--color-bg-secondary)] relative border-b border-[var(--color-border-subtle)]">
                                    <img
                                        src={prod.image}
                                        alt={prod.name}
                                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-4 space-y-1">
                                    <span className="text-[9px] tracking-widest text-[var(--color-text-muted)] uppercase block font-light">
                                        {prod.collection}
                                    </span>
                                    <div className="flex justify-between items-baseline gap-4">
                                        <h4 className="font-primary text-sm text-[var(--color-teal)] truncate flex-1 font-normal tracking-wide">
                                            {prod.name}
                                        </h4>
                                        <span className="text-xs text-[var(--color-text-secondary)] font-medium shrink-0">
                                            {formatPriceINR(prod.price)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VIDEO MODAL WINDOW PORTAL */}
            <AnimatePresence>
                {videoModalUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[var(--z-modal)] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setVideoModalUrl(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.98 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.98 }}
                            className="relative w-full max-w-[860px] aspect-video bg-black rounded-[var(--radius-sm)] overflow-hidden shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={`https://www.youtube.com/embed/${videoModalUrl}?autoplay=1&rel=0`}
                                title="Video Player"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FULLSCREEN IMAGE ZOOM PORTAL */}
            <AnimatePresence>
                {isFullscreenZoomOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[var(--z-modal)] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setIsFullscreenZoomOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.98 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.98 }}
                            className="max-w-full max-h-full overflow-hidden flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={activeMedia.url}
                                alt={activeMedia.alt}
                                className="max-w-screen max-h-screen object-contain select-none rounded-[var(--radius-sm)]"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MOBILE THUMB-SAFE STICKY CTA BOTTOM PANEL (PRESERVED & LANGUAGE NORMALIZED) */}
            <div
                className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] px-4 py-3 z-[var(--z-sticky)] shadow-md flex items-center space-x-3"
                style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
            >
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3.5 border rounded-[var(--radius-sm)] flex items-center justify-center shrink-0 transition-colors ${isWishlisted ? "bg-red-50 border-red-200 text-red-500" : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                        }`}
                    aria-label="Wishlist Page Action"
                >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                </button>

                <button className="flex-1 bg-transparent border border-[var(--color-teal)] text-[var(--color-teal)] text-xs font-semibold uppercase tracking-widest py-3.5 rounded-[var(--radius-sm)]">
                    Add To Cart
                </button>

                <button className="flex-1 bg-[var(--color-teal)] text-white text-xs font-semibold uppercase tracking-widest py-3.5 rounded-[var(--radius-sm)] text-center shadow-sm">
                    Buy It Now
                </button>
            </div>

            <Footer onCategoryChange={setActiveCategory} />
        </div>
    );
}