import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    Heart,
    ChevronDown,
    X,
    Play,
    Truck,
    ShieldCheck,
    RotateCcw,
    Gem,
    Maximize2,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ==========================================================================
   MOCK DATA STRUCTURE (Luxury Editorial Product)
   ========================================================================== */
const MOCK_PRODUCT = {
    name: "The Aurelia Eternal Cascade Diamond Necklace",
    slug: "aurelia-eternal-cascade-diamond-necklace",
    shortDescription: "An exquisite composition of cascading brilliant-cut pear diamonds, individually hand-set in flowing ripples of liquid 18-karat gold.",
    storyDescription: "Inspired by the architectural fluidities of classical European fountains, the Aurelia Eternal Cascade Necklace captures the precise kinetic poetry of falling water. Each diamond is selected through a rigorous multi-tier audit and mounted using our signature micro-claw technique, allowing maximum luminescence to pierce each stone. Crafted over eighty-four hours by our master artisans, it is a timeless heirloom designed to breathe with your movements, resting gracefully against the collarbone as an extension of form itself.",
    category: "Jewellery",
    subCategory: "Necklaces",
    sku: "AU-NCK-0092-2026",
    collection: "L'Oasis Lumineuse",
    occasion: "Gala & High Atelier",
    gender: "Women",
    certifications: ["SGL Certified", "BIS Hallmarked (916)", "GIA Graded Accents"],
    goldWeight: 14.20,
    makingChargePerGram: 850,
    availableKarats: [14, 18, 22],
    availableSizes: [14, 16, 18],
    stones: [
        { type: "Pear Diamond", weight: "1.45 ct", count: 7, quality: "VVS1, E-F Color" },
        { type: "Round Brilliant Diamond", weight: "0.85 ct", count: 42, quality: "VVS2, F Color" }
    ],
    media: [
        {
            type: "image",
            url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
            alt: "The Aurelia Eternal Cascade Necklace on an elegant stand - Primary View",
            isPrimary: true
        },
        {
            type: "image",
            url: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=85",
            alt: "Close-up detail of the hand-crafted micro-claw diamond settings",
            isPrimary: false
        },
        {
            type: "image",
            url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85",
            alt: "Editorial atmospheric styling of the L'Oasis Lumineuse collection pieces",
            isPrimary: false
        },
        {
            type: "video",
            youtubeId: "dQw4w9WgXcQ",
            thumbnail: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=85"
        }
    ],
    highlights: [
        "Individually hand-selected VVS1 exceptional clarity accents",
        "Conflict-free certified ethical diamond supply chain",
        "Ergonomically continuous articulate linkage system",
        "Signature secure dual-lock high-jewelry security clasp"
    ],
    specifications: {
        productCode: "JN-2026-AURELIA",
        height: "32 mm",
        width: "14 mm",
        length: "406 mm",
        productWeight: "14.66 grams",
        chainLength: "16 inches (Adjustable to 18 inches)"
    },
    estimatedDeliveryDays: "5–7 business days",
    returnEligible: true,
    warranty: "Lifetime Brilliance Warranty & Complimentary Annual Servicing",
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    inStock: true,
    averageRating: 4.9,
    totalReviews: 6,
    faq: [
        {
            question: "How can I verify the authenticity of the diamonds and gold weight?",
            answer: "Every piece from our atelier arrives accompanied by an independent laboratory certificate from the SGL or GIA, alongside a legal Bureau of Indian Standards (BIS) hallmark stamped into the metal framework. This physically guarantees both purity metrics and carat authenticity."
        },
        {
            question: "What does the Lifetime Brilliance Warranty and maintenance entail?",
            answer: "Our lifetime commitment covers complimentary professional ultrasonic deep cleaning, structural prong tightening, security clasp inspections, and rhodium replating. Shipping arrangements to and from our atelier are fully insured and coordinated through our white-glove concierges."
        },
        {
            question: "Can the length of the delicate chain be adjusted post-purchase?",
            answer: "Yes. The necklace features discrete built-in loops permitting lengths of 14, 16, and 18 inches. Should you require bespoke modifications or an entirely different sizing run, our physical boutiques offer true complimentary tailor fittings."
        },
        {
            question: "What precautions are taken for secure home delivery?",
            answer: "All orders are dispatched via temperature-regulated high-security logistical couriers. Each package is tracked, fully transit-insured, and requires a direct multi-factor verification OTP code and state-issued signature upon final delivery."
        }
    ]
};

const MOCK_REVIEWS = [
    {
        customerName: "Eleanora Vance",
        customerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
        rating: 5,
        review: "The balance of this necklace is extraordinary. It doesn't shift or twist when walking; it contours precisely against the skin. The diamond clarity is blinding under soft evening dining lights. Exquisite engineering and worth every single rupee.",
        createdAt: "October 14, 2025"
    },
    {
        customerName: "Rajesh K. Mehta",
        customerImage: "",
        rating: 5,
        review: "Purchased as a landmark milestone gift for my wife's anniversary. The packaging experience was theatrical, and the weight of the gold feels substantial yet effortless. Truly exceptional customer care followed up throughout delivery.",
        createdAt: "January 03, 2026"
    },
    {
        customerName: "Dr. Clara Thorne",
        customerImage: "",
        rating: 4.8,
        review: "The craftsmanship around the cascade loops is flawless. My only small note is that the clasp is so secure that it takes deliberate patience to open yourself, which is ultimately a profound benefit for a high-value piece. Highly recommended.",
        createdAt: "February 24, 2026"
    },
    {
        customerName: "Anya Henderson",
        customerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
        rating: 4.2,
        review: "A beautifully understated luxury statement. It is significantly more subtle and elegant in person than the close-up macro studio photographs convey. Ideal for those who value quiet luxury and artisanal focus over sheer mass.",
        createdAt: "April 11, 2026"
    }
];

const MOCK_SIMILAR_PRODUCTS = [
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
   PRICE UTILITY (Simulated Baseline Calculation Engine)
   ========================================================================== */
const BASE_GOLD_RATE_22K = 7250;

const calculateDynamicPrice = (product, selectedKarat) => {
    const karatMultiplier = selectedKarat === 22 ? 1.0 : selectedKarat === 18 ? 0.82 : 0.65;
    const rawGoldCost = product.goldWeight * (BASE_GOLD_RATE_22K * karatMultiplier);
    const totalMakingCharges = product.goldWeight * product.makingChargePerGram;
    const stonePremiumEstimation = 165000;

    return Math.round(rawGoldCost + totalMakingCharges + stonePremiumEstimation);
};

const formatPriceINR = (amount) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
};

export default function ProductDetailPage() {
    const [selectedKarat, setSelectedKarat] = useState(18);
    const [selectedSize, setSelectedSize] = useState(16);
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    const [activeReviewIndex, setActiveReviewIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const [videoModalUrl, setVideoModalUrl] = useState(null);
    const [isFullscreenZoomOpen, setIsFullscreenZoomOpen] = useState(false);

    const mainImageRef = useRef(null);
    const mobileScrollRef = useRef(null);
    const [zoomStyle, setZoomStyle] = useState({ display: "none" });

    const activeMedia = MOCK_PRODUCT.media[activeMediaIndex] || MOCK_PRODUCT.media[0];

    const currentPrice = useMemo(() => {
        return calculateDynamicPrice(MOCK_PRODUCT, selectedKarat);
    }, [selectedKarat]);

    useEffect(() => {
        if (videoModalUrl || isFullscreenZoomOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [videoModalUrl, isFullscreenZoomOpen]);

    const handleMouseMove = (e) => {
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
        setZoomStyle({ display: "none" });
    };

    // Sync Mobile Swipe Track with Active Media Index Indicator
    const handleMobileScroll = useCallback(() => {
        if (!mobileScrollRef.current) return;
        const { scrollLeft, clientWidth } = mobileScrollRef.current;
        if (clientWidth > 0) {
            const index = Math.round(scrollLeft / clientWidth);
            if (index !== activeMediaIndex && index >= 0 && index < MOCK_PRODUCT.media.length) {
                setActiveMediaIndex(index);
            }
        }
    }, [activeMediaIndex]);

    // Programmatically click next/prev slide on mobile track
    const scrollMobileGalleryTo = (index) => {
        if (!mobileScrollRef.current) return;
        const clientWidth = mobileScrollRef.current.clientWidth;
        mobileScrollRef.current.scrollTo({
            left: index * clientWidth,
            behavior: "smooth"
        });
        setActiveMediaIndex(index);
    };

    const handlePrevReview = () => {
        setActiveReviewIndex((prev) => (prev === 0 ? MOCK_REVIEWS.length - 1 : prev - 1));
    };

    const handleNextReview = () => {
        setActiveReviewIndex((prev) => (prev === MOCK_REVIEWS.length - 1 ? 0 : prev + 1));
    };

    const getInitials = (name) => {
        return name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "AN";
    };

    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>

            <Navbar
                onSearchChange={setSearchQuery}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-[var(--font-secondary)] selection:bg-[var(--color-cream)] overflow-x-hidden">

                {/* SECTION 2 — MAIN PDP HERO */}
                <main className="container mx-auto px-6 py-1 md:py-1 max-w-[1320px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

                        {/* LEFT SIDE — MEDIA GALLERY (Controlled ~55% Proportion on Pro Desktop Layout) */}
                        <div className="lg:col-span-7 space-y-6 max-w-[720px] mx-auto w-full">

                            {/* DESKTOP INTEGRATED SYSTEM */}
                            <div className="hidden md:flex flex-row gap-4 items-start">
                                {/* Vertical Thumbnails */}
                                <div className="flex flex-col space-y-3 w-[76px] shrink-0">
                                    {MOCK_PRODUCT.media.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveMediaIndex(index)}
                                            className={`relative aspect-[4/5] w-full rounded-[var(--radius-sm)] border overflow-hidden transition-all duration-300 ${activeMediaIndex === index
                                                ? "border-[var(--color-teal)] opacity-100 shadow-[var(--shadow-sm)]"
                                                : "border-[var(--color-border-subtle)] opacity-50 hover:opacity-90"
                                                }`}
                                        >
                                            <img
                                                src={item.type === "video" ? item.thumbnail : item.url}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover select-none"
                                            />
                                            {item.type === "video" && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(28,59,72,0.25)]">
                                                    <Play className="w-4 h-4 text-white fill-white" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Controlled Primary Frame */}
                                <div className="relative flex-1 aspect-[4/5] max-h-[640px] bg-[var(--color-bg-secondary)] rounded-[var(--radius-sm)] overflow-hidden border border-[var(--color-border-subtle)]">
                                    {activeMedia.type === "image" ? (
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
                                                transition={{ duration: 0.3 }}
                                                src={activeMedia.url}
                                                alt={activeMedia.alt}
                                                className="w-full h-full object-cover"
                                            />
                                            <div
                                                className="absolute inset-0 pointer-events-none bg-no-repeat transition-opacity duration-150"
                                                style={{
                                                    ...zoomStyle,
                                                    backgroundSize: "200%",
                                                    opacity: zoomStyle.display === "block" ? 1 : 0
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="relative w-full h-full cursor-pointer group"
                                            onClick={() => setVideoModalUrl(activeMedia.youtubeId)}
                                        >
                                            <img
                                                src={activeMedia.thumbnail}
                                                alt="Presentation Cover"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-[var(--color-teal)] transition-transform group-hover:scale-105">
                                                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* REFINED MOBILE SWIPE GALLERY (Touch Gestures + Navigation Buttons Snapping) */}
                            <div className="block md:hidden relative group">
                                <div
                                    ref={mobileScrollRef}
                                    onScroll={handleMobileScroll}
                                    className="w-full aspect-[4/5] flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth rounded-[var(--radius-sm)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]"
                                    style={{ WebkitOverflowScrolling: "touch" }}
                                >
                                    {MOCK_PRODUCT.media.map((item, index) => (
                                        <div
                                            key={index}
                                            className="w-full h-full shrink-0 snap-start snap-always relative"
                                        >
                                            {item.type === "image" ? (
                                                <img
                                                    src={item.url}
                                                    alt={item.alt}
                                                    onClick={() => setIsFullscreenZoomOpen(true)}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div
                                                    className="w-full h-full relative"
                                                    onClick={() => setVideoModalUrl(item.youtubeId)}
                                                >
                                                    <img src={item.thumbnail} alt="Video preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                                                            <Play className="w-5 h-5 ml-0.5 text-[var(--color-teal)] fill-current" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Subtle Swipe Chevron Navigation Buttons */}
                                {activeMediaIndex > 0 && (
                                    <button
                                        onClick={() => scrollMobileGalleryTo(activeMediaIndex - 1)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/85 shadow-sm text-[var(--color-teal)] active:scale-95"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                )}
                                {activeMediaIndex < MOCK_PRODUCT.media.length - 1 && (
                                    <button
                                        onClick={() => scrollMobileGalleryTo(activeMediaIndex + 1)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/85 shadow-sm text-[var(--color-teal)] active:scale-95"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                )}

                                {/* Fullscreen indicator on mobile */}
                                {activeMedia.type === "image" && (
                                    <button
                                        onClick={() => setIsFullscreenZoomOpen(true)}
                                        className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 text-[var(--color-teal)] shadow-sm"
                                    >
                                        <Maximize2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            {/* Mobile Navigation Dots */}
                            <div className="flex md:hidden justify-center items-center space-x-2 pt-1">
                                {MOCK_PRODUCT.media.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => scrollMobileGalleryTo(index)}
                                        className={`h-1 rounded-full transition-all duration-300 ${activeMediaIndex === index ? "w-5 bg-[var(--color-teal)]" : "w-1 bg-[var(--color-border)]"
                                            }`}
                                    />
                                ))}
                            </div>

                        </div>

                        {/* RIGHT SIDE — STICKY PRODUCT INFORMATION PANEL (~45% Balanced Proportion) */}
                        <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-8 pb-0 lg:pb-0 w-full">

                            {/* Header Metadata */}
                            <div className="space-y-2">
                                <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)] block">
                                    {MOCK_PRODUCT.collection} Collection
                                </span>
                                <h1 className="font-[var(--font-primary)] text-2xl md:text-3xl lg:text-4xl text-[var(--color-teal)] font-normal leading-tight tracking-wide">
                                    {MOCK_PRODUCT.name}
                                </h1>

                                {/* Clean Initial Rating Wrapper */}
                                <div className="flex items-center space-x-2.5 pt-1 text-xs tracking-wider text-[var(--color-text-secondary)]">
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-3.5 h-3.5 fill-[var(--color-teal)] text-[var(--color-teal)]" />
                                        <span className="font-semibold">{MOCK_PRODUCT.averageRating}</span>
                                    </div>
                                    <span className="text-[var(--color-border-subtle)]">|</span>
                                    <a href="#patron-reviews" className="underline underline-offset-4 decoration-[var(--color-border)] hover:text-[var(--color-teal-light)] transition-colors">
                                        {MOCK_PRODUCT.totalReviews} Customer Reviews
                                    </a>
                                </div>
                            </div>

                            {/* Premium Dynamic Pricing Module */}
                            <div className="border-y border-[var(--color-border-subtle)] py-5">
                                <div className="flex items-baseline space-x-3">
                                    <span className="text-2xl font-light text-[var(--color-text-secondary)] tracking-tight">
                                        Starting From {formatPriceINR(currentPrice)}
                                    </span>
                                </div>
                                <p className="text-[10px] tracking-widest text-[var(--color-text-muted)] uppercase mt-1">
                                    Inclusive of all bespoke VAT & luxury atelier duties
                                </p>
                            </div>

                            {/* Product short presentation text */}
                            <p className="text-sm text-[var(--color-text-muted)] font-light leading-relaxed">
                                {MOCK_PRODUCT.shortDescription}
                            </p>

                            {/* Karat Selection */}
                            <div className="space-y-3">
                                <label className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-text-muted)] block font-medium">
                                    Alloy Karat Purity: <span className="text-[var(--color-text-secondary)] font-semibold">{selectedKarat}K</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {MOCK_PRODUCT.availableKarats.map((karat) => (
                                        <button
                                            key={karat}
                                            onClick={() => setSelectedKarat(karat)}
                                            className={`px-4 py-2 text-xs tracking-wider rounded-[var(--radius-sm)] border transition-all duration-200 ${selectedKarat === karat
                                                ? "border-[var(--color-teal)] bg-[var(--color-teal)] text-white font-medium"
                                                : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-teal-light)] bg-transparent"
                                                }`}
                                        >
                                            {karat}K Gold
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="space-y-3">
                                <label className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-text-muted)] block font-medium">
                                    Chain Length Option: <span className="text-[var(--color-text-secondary)] font-semibold">{selectedSize} Inches</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {MOCK_PRODUCT.availableSizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 text-xs tracking-wider rounded-[var(--radius-sm)] border transition-all duration-200 ${selectedSize === size
                                                ? "border-[var(--color-teal)] bg-[var(--color-teal)] text-white font-medium"
                                                : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-teal-light)] bg-transparent"
                                                }`}
                                        >
                                            {size}" Run
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Highlights List Box */}
                            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-4 rounded-[var(--radius-md)] space-y-2.5">
                                {MOCK_PRODUCT.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start space-x-2.5 text-xs text-[var(--color-text-secondary)]">
                                        <Gem className="w-3.5 h-3.5 text-[var(--color-cream)] shrink-0 mt-0.5" />
                                        <span className="font-light leading-snug">{highlight}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Action Hub Buttons */}
                            <div className="hidden md:flex items-center space-x-3 pt-2">
                                <div className="flex-1 grid grid-cols-2 gap-3">
                                    <button className="bg-transparent hover:bg-[var(--color-teal-dark)] hover:text-white text-[var(--color-teal)] border border-[var(--color-teal)] py-3.5 text-xs tracking-[0.2em] uppercase rounded-[var(--radius-sm)] transition-all duration-300 font-medium">
                                        Add to Cart
                                    </button>
                                    <button className="bg-[var(--color-teal)] hover:bg-[var(--color-teal-light)] text-white py-3.5 text-xs tracking-[0.2em] uppercase rounded-[var(--radius-sm)] shadow-[var(--shadow-sm)] transition-all duration-300 font-medium">
                                        Buy Now
                                    </button>
                                </div>
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`p-3.5 border rounded-[var(--radius-sm)] transition-colors duration-300 shrink-0 ${isWishlisted
                                        ? "bg-red-50/40 border-red-200 text-red-500"
                                        : "border-[var(--color-border)] hover:border-[var(--color-teal)] text-[var(--color-text-muted)]"
                                        }`}
                                >
                                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                                </button>
                            </div>

                            {/* Delivery & Trust Badges Row */}
                            <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 pt-4 border-t border-[var(--color-border-subtle)] text-[11px] font-light text-[var(--color-text-muted)]">
                                <div className="flex items-center space-x-2.5">
                                    <Truck className="w-4 h-4 text-[var(--color-cream)] shrink-0" />
                                    <span>Delivery within {MOCK_PRODUCT.estimatedDeliveryDays}</span>
                                </div>
                                <div className="flex items-center space-x-2.5">
                                    <ShieldCheck className="w-4 h-4 text-[var(--color-cream)] shrink-0" />
                                    <span>Certified Jewelry Registry</span>
                                </div>
                                <div className="flex items-center space-x-2.5">
                                    <RotateCcw className="w-4 h-4 text-[var(--color-cream)] shrink-0" />
                                    <span>Complimentary Annual Exchange</span>
                                </div>
                                <div className="flex items-center space-x-2.5">
                                    <Gem className="w-4 h-4 text-[var(--color-cream)] shrink-0" />
                                    <span>Secure Fully Insured Transit</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>

                {/* SECTION 3 — PRODUCT STORY */}
                <section className="bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)] py-16 md:py-20 my-16 md:my-24">
                    <div className="container mx-auto px-6 max-w-[800px] text-center space-y-6">
                        <span className="text-[0.65rem] tracking-[0.35em] uppercase text-[var(--color-text-muted)] block">
                            Atelier Heritage & Narrative
                        </span>
                        <h2 className="font-[var(--font-primary)] text-3xl md:text-4xl text-[var(--color-teal)] font-normal tracking-wide">
                            Sculpting Kinetic Light
                        </h2>
                        <div className="w-12 h-[1px] bg-[var(--color-cream)] mx-auto" />
                        <p className="text-sm md:text-base text-[var(--color-text-muted)] font-light leading-relaxed italic text-justify md:text-center px-2">
                            "{MOCK_PRODUCT.storyDescription}"
                        </p>
                    </div>
                </section>

                {/* SECTION 4 — SPECIFICATIONS & DETAILS */}
                <section className="container mx-auto px-6 py-1 md:py-1 max-w-[1320px] my-1">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        <div className="lg:col-span-4 space-y-2">
                            <h3 className="font-[var(--font-primary)] text-xl md:text-2xl text-[var(--color-teal)] tracking-wide">
                                Technical Composition
                            </h3>
                            <p className="text-xs text-[var(--color-text-muted)] font-light leading-relaxed">
                                Verifiable specifications verified by inner hallmark engravings and external certificate registry files.
                            </p>
                        </div>

                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                            {[
                                { label: "Product Identifier Code", value: MOCK_PRODUCT.specifications.productCode },
                                { label: "Structural Framework Size", value: `${MOCK_PRODUCT.specifications.width} x ${MOCK_PRODUCT.specifications.height}` },
                                { label: "Chain Track Profile Length", value: MOCK_PRODUCT.specifications.chainLength },
                                { label: "Total Net Weight Estimation", value: MOCK_PRODUCT.specifications.productWeight },
                                { label: "Authorized Authenticity Seals", value: MOCK_PRODUCT.certifications.join(", ") },
                                ...MOCK_PRODUCT.stones.map((s, i) => ({ label: `Gemstone Element Layer ${i + 1}`, value: `${s.count}x ${s.type} (${s.weight}, ${s.quality})` }))
                            ].map((spec, index) => (
                                <div key={index} className="flex justify-between items-center py-3.5 border-b border-[var(--color-border-subtle)] text-xs">
                                    <span className="text-[var(--color-text-muted)] font-light tracking-wide">{spec.label}</span>
                                    <span className="text-[var(--color-text-secondary)] font-medium text-right pl-4">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 5 — REFINED CENTERED EDITORIAL LUXURY REVIEWS MODULE */}
                <section id="patron-reviews" className="bg-[var(--color-bg)] border-y border-[var(--color-border-subtle)] py-20 my-12">
                    <div className="container mx-auto px-6 max-w-[900px] text-center space-y-12 relative">

                        <div className="space-y-1">
                            <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)] block">
                                Atelier Chronicle Reports
                            </span>
                            <h3 className="font-[var(--font-primary)] text-2xl md:text-3xl text-[var(--color-teal)] font-normal tracking-wide">
                                Patron Testimonials
                            </h3>
                        </div>

                        {/* Centered Editorial Slide Structure */}
                        <div className="relative min-h-[220px] flex items-center justify-center px-4 md:px-16">

                            {/* Left Control Arrow (Desktop Absolute Placement) */}
                            <button
                                onClick={handlePrevReview}
                                className="hidden md:flex absolute left-0 p-2.5 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-teal)] hover:border-[var(--color-teal)] transition-all duration-300 items-center justify-center bg-transparent backdrop-blur-sm opacity-70 hover:opacity-100"
                                aria-label="Previous Review"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {/* Middle Main Narrative Text Container */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeReviewIndex}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                    className="space-y-6 max-w-[640px] mx-auto flex flex-col items-center"
                                >
                                    {/* Circular Customer Avatar Layer */}
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-inner flex items-center justify-center shrink-0">
                                        {MOCK_REVIEWS[activeReviewIndex].customerImage ? (
                                            <img
                                                src={MOCK_REVIEWS[activeReviewIndex].customerImage}
                                                alt={MOCK_REVIEWS[activeReviewIndex].customerName}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-xs font-semibold tracking-wider text-[var(--color-teal)]">
                                                {getInitials(MOCK_REVIEWS[activeReviewIndex].customerName)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Score rating representation */}
                                    <div className="flex space-x-1 justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < Math.floor(MOCK_REVIEWS[activeReviewIndex].rating) ? "fill-[var(--color-teal)] text-[var(--color-teal)]" : "text-[var(--color-border-subtle)]"}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Main Insight Narrative */}
                                    <p className="text-sm md:text-base text-[var(--color-text-secondary)] font-light leading-relaxed italic max-w-prose">
                                        "{MOCK_REVIEWS[activeReviewIndex].review}"
                                    </p>

                                    {/* Sign-off Identity block */}
                                    <div className="space-y-0.5">
                                        <h4 className="text-xs font-medium tracking-widest text-[var(--color-text-secondary)] uppercase">
                                            {MOCK_REVIEWS[activeReviewIndex].customerName}
                                        </h4>
                                        <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider">
                                            Verified Acquisition Date — {MOCK_REVIEWS[activeReviewIndex].createdAt}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Right Control Arrow (Desktop Absolute Placement) */}
                            <button
                                onClick={handleNextReview}
                                className="hidden md:flex absolute right-0 p-2.5 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-teal)] hover:border-[var(--color-teal)] transition-all duration-300 items-center justify-center bg-transparent backdrop-blur-sm opacity-70 hover:opacity-100"
                                aria-label="Next Review"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Integrated Arrow & Indicator controls stack on Mobile Screen Viewports */}
                        <div className="flex md:hidden items-center justify-center space-x-6 pt-4">
                            <button
                                onClick={handlePrevReview}
                                className="p-2 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] active:scale-95"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="flex space-x-2">
                                {MOCK_REVIEWS.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveReviewIndex(index)}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${activeReviewIndex === index ? "bg-[var(--color-teal)]" : "bg-[var(--color-border)]"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNextReview}
                                className="p-2 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] active:scale-95"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                </section>

                {/* SECTION 6 — CURATED COEFICIENT COMPANION SELECTION GRID */}
                <section className="bg-[var(--color-bg)] py-16">
                    <div className="container mx-auto px-6 max-w-[1320px] space-y-10">
                        <div>
                            <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)] block mb-1">
                                Complete The Intended Presentation
                            </span>
                            <h3 className="font-[var(--font-primary)] text-2xl md:text-3xl text-[var(--color-teal)] font-normal tracking-wide">
                                Companion Creations
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {MOCK_SIMILAR_PRODUCTS.map((prod, index) => (
                                <div
                                    key={index}
                                    className="group bg-[var(--color-bg)] border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)] overflow-hidden hover:shadow-[var(--shadow-sm)] transition-all duration-300"
                                >
                                    <div className="aspect-[4/5] overflow-hidden bg-[var(--color-bg-secondary)] relative border-b border-[var(--color-border-subtle)]">
                                        <img
                                            src={prod.image}
                                            alt={prod.name}
                                            className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500 ease-out"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-5 space-y-1 bg-[var(--color-bg)]">
                                        <span className="text-[9px] tracking-widest text-[var(--color-text-muted)] uppercase block">
                                            {prod.collection}
                                        </span>
                                        <div className="flex justify-between items-baseline gap-4">
                                            <h4 className="font-[var(--font-primary)] text-base text-[var(--color-teal)] truncate flex-1">
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

                {/* SECTION 7 — EDITORIAL ACCORDION FAQ SYSTEM */}
                {/* <section className="container mx-auto px-6 py-16 max-w-[800px] space-y-10">
                <div className="text-center space-y-1">
                    <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)] block">
                        Acquisition Mechanics
                    </span>
                    <h3 className="font-[var(--font-primary)] text-2xl md:text-3xl text-[var(--color-teal)] font-normal tracking-wide">
                        Frequently Exchanged Details
                    </h3>
                </div>

                <div className="border-t border-[var(--color-border-subtle)]">
                    {MOCK_PRODUCT.faq.map((item, index) => {
                        const [isOpen, setIsOpen] = useState(false);
                        return (
                            <div key={index} className="border-b border-[var(--color-border-subtle)]">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="w-full flex justify-between items-center py-5 text-left text-xs md:text-sm text-[var(--color-text-secondary)] font-medium tracking-wide group transition-colors"
                                >
                                    <span className="group-hover:text-[var(--color-teal-light)] transition-colors pr-6">{item.question}</span>
                                    <ChevronDown className={`w-4 h-4 text-[var(--color-text-muted)] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-5 text-xs text-[var(--color-text-muted)] font-light leading-relaxed text-justify">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </section> */}

                {/* ==========================================================================
         MODAL LAYER COMPONENTS (Overlay Controls)
         ========================================================================== */}
                {/* MODAL 1: FULLSCREEN CINEMATIC YOUTUBE VIDEO PLAYER OVERLAY */}
                <AnimatePresence>
                    {videoModalUrl && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[var(--z-modal)] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
                            onClick={() => setVideoModalUrl(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.96 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.96 }}
                                className="relative w-full max-w-[960px] aspect-video bg-black rounded-sm overflow-hidden shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setVideoModalUrl(null)}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoModalUrl}?autoplay=1&rel=0`}
                                    title="Atelier Video Presentation Component"
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MODAL 2: FULLSCREEN COMPREHENSIVE IMAGE ZOOM BACKDROP */}
                <AnimatePresence>
                    {isFullscreenZoomOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[var(--z-modal)] bg-black/90 backdrop-blur-md flex items-center justify-center p-3"
                            onClick={() => setIsFullscreenZoomOpen(false)}
                        >
                            <button
                                onClick={() => setIsFullscreenZoomOpen(false)}
                                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <motion.div
                                initial={{ scale: 0.98 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.98 }}
                                className="max-w-full max-h-full overflow-auto flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={activeMedia.url}
                                    alt={activeMedia.alt}
                                    className="max-w-screen max-h-screen object-contain pointer-events-none select-none rounded-[var(--radius-sm)] shadow-xl"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ==========================================================================
         STICKY BOTTOM BAR ACTION STRIP (MOBILE VIEWPORT CONTEXT ATTACHMENT)
         ========================================================================== */}
                <div
                    className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-bg)] border-t border-[var(--color-border)] px-5 py-3.5 z-[var(--z-sticky)] shadow-[0_-5px_25px_rgba(0,0,0,0.03)] flex items-center space-x-3"
                    style={{ paddingBottom: "calc(14px + env(safe-area-inset-bottom))" }}
                >
                    <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`p-3.5 border rounded-[var(--radius-sm)] flex items-center justify-center shrink-0 transition-colors ${isWishlisted ? "bg-red-50 border-red-200 text-red-500" : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                            }`}
                        aria-label="Add product to wishlist"
                    >
                        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                    </button>

                    <button className="flex-1 bg-transparent border border-[var(--color-teal)] text-[var(--color-teal)] text-xs font-semibold uppercase tracking-widest py-3.5 rounded-[var(--radius-sm)] transition-all">
                        Add Box
                    </button>

                    <button className="flex-1 bg-[var(--color-teal)] text-white text-xs font-semibold uppercase tracking-widest py-3.5 rounded-[var(--radius-sm)] text-center transition-all shadow-sm">
                        Acquire
                    </button>
                </div>

            </div>

            <Footer onCategoryChange={setActiveCategory} />
        </>
    );
}