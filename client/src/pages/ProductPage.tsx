import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Heart,
    SlidersHorizontal,
    ArrowUpDown,
    X,
    Check,
    ChevronDown,
    Sparkles,
    ShieldCheck
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */
interface StoneConfig {
    type: "Diamond" | "Emerald" | "Ruby" | "Sapphire" | "Pearl" | "None";
    carat: number;
    estimatedValue: number;
}

interface JewelryProduct {
    name: string;
    slug: string;
    description: string;
    category: "Rings" | "Necklaces" | "Earrings" | "Bangles" | "Pendants";
    subCategory: string;
    certifications: ("BIS Hallmarked" | "GIA Certified" | "IGI Certified")[];
    goldWeight: number; // in grams
    makingChargePerGram: number; // in INR
    availableKarats: ("14K" | "18K" | "22K" | "24K")[];
    stones: StoneConfig[];
    images: string[]; // [Primary, Secondary/Hover]
    videos?: string[];
    metaTitle: string;
    metaDescription: string;
    isActive: boolean;
    isFeatured: boolean;
    inStock: boolean;
    averageRating: number;
    totalReviews: number;
}

/* ==========================================================================
   REALISTIC MOCK GOLD PRICE REGIME (Aligned with Project ecosystem)
   ========================================================================== */
const LIVE_GOLD_PER_GRAM = {
    "14K": 6230,
    "18K": 9611,
    "22K": 11746,
    "24K": 12815,
};

const MOCK_PRODUCTS: JewelryProduct[] = [
    {
        name: "The Mayur Royal Heritage Ring",
        slug: "mayur-royal-heritage-ring",
        description: "An exquisite statement cocktail ring depicting archival heritage peacock motifs, encrusted with flawless brilliant-cut diamonds.",
        category: "Rings",
        subCategory: "Cocktail Rings",
        certifications: ["BIS Hallmarked", "IGI Certified"],
        goldWeight: 8.5,
        makingChargePerGram: 950,
        availableKarats: ["18K", "22K"],
        stones: [{ type: "Diamond", carat: 1.2, estimatedValue: 85000 }],
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Mayur Royal Heritage Ring | TBA",
        metaDescription: "Purchase handcrafted luxury diamond wedding rings from The Brilliance Atelier.",
        isActive: true,
        isFeatured: true,
        inStock: true,
        averageRating: 4.9,
        totalReviews: 24
    },
    {
        name: "Aura Infinite Diamond Band",
        slug: "aura-infinite-diamond-band",
        description: "A seamless eternity band structured with precision channel-set VS-GH conflict-free natural diamonds.",
        category: "Rings",
        subCategory: "Eternity Bands",
        certifications: ["BIS Hallmarked", "GIA Certified"],
        goldWeight: 4.2,
        makingChargePerGram: 1200,
        availableKarats: ["14K", "18K"],
        stones: [{ type: "Diamond", carat: 2.1, estimatedValue: 140000 }],
        images: [
            "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Aura Infinite Diamond Band | TBA",
        metaDescription: "Minimalist stackable eternity bands handcrafted in pure gold.",
        isActive: true,
        isFeatured: false,
        inStock: true,
        averageRating: 4.8,
        totalReviews: 19
    },
    {
        name: "Nizami Empress Choker Necklace",
        slug: "nizami-empress-choker",
        description: "A grand imperial choker marrying deep Zambian untreated emerald drop beads with traditional gold kundan craft work.",
        category: "Necklaces",
        subCategory: "Chokers",
        certifications: ["BIS Hallmarked"],
        goldWeight: 42.0,
        makingChargePerGram: 1400,
        availableKarats: ["22K"],
        stones: [
            { type: "Emerald", carat: 14.5, estimatedValue: 195000 },
            { type: "Pearl", carat: 8.0, estimatedValue: 35000 }
        ],
        images: [
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Nizami Empress Emerald Choker | TBA",
        metaDescription: "Experience bespoke royal Indian bridal chokers designed for modern luxury.",
        isActive: true,
        isFeatured: true,
        inStock: true,
        averageRating: 5.0,
        totalReviews: 8
    },
    {
        name: "Dewdrop Luminescence Pendant",
        slug: "dewdrop-luminescence-pendant",
        description: "A signature solitaire pear-cut diamond suspended gracefully from a delicate, micro-polished yellow gold chain loop.",
        category: "Pendants",
        subCategory: "Solitaires",
        certifications: ["BIS Hallmarked", "GIA Certified"],
        goldWeight: 3.1,
        makingChargePerGram: 850,
        availableKarats: ["18K"],
        stones: [{ type: "Diamond", carat: 0.9, estimatedValue: 72000 }],
        images: [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Dewdrop Luminescence Pendant | TBA",
        metaDescription: "Classic elegant diamond solitaire pendants perfect for daily statement wear.",
        isActive: true,
        isFeatured: false,
        inStock: true,
        averageRating: 4.7,
        totalReviews: 31
    },
    {
        name: "Gulmarg Blossom Kada Jhumkas",
        slug: "gulmarg-blossom-kada-jhumkas",
        description: "Intricately detailed architectural tier chandelier earrings capturing the pristine beauty of Kashmiri spring floral motifs.",
        category: "Earrings",
        subCategory: "Jhumkas",
        certifications: ["BIS Hallmarked"],
        goldWeight: 18.2,
        makingChargePerGram: 1100,
        availableKarats: ["22K"],
        stones: [{ type: "Ruby", carat: 3.4, estimatedValue: 48000 }],
        images: [
            "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Gulmarg Blossom Chandelier Earrings | TBA",
        metaDescription: "Bespoke traditional chandelier earrings sculpted in high-grade 22 karat gold.",
        isActive: true,
        isFeatured: true,
        inStock: true,
        averageRating: 4.9,
        totalReviews: 15
    },
    {
        name: "Rajputana Heritage Polki Bangles",
        slug: "rajputana-heritage-polki-bangles",
        description: "A pair of heavy classic luxury open-able kadas featuring hand-cut unpolished diamonds (Polki) set in pure red-wax minakari channels.",
        category: "Bangles",
        subCategory: "Kadas",
        certifications: ["BIS Hallmarked"],
        goldWeight: 56.0,
        makingChargePerGram: 1500,
        availableKarats: ["22K"],
        stones: [{ type: "Diamond", carat: 4.8, estimatedValue: 210000 }],
        images: [
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Rajputana Heritage Polki Bangles | TBA",
        metaDescription: "Authentic artisanal Polki and Kundan bangles meant for generational inheritance.",
        isActive: true,
        isFeatured: true,
        inStock: true,
        averageRating: 5.0,
        totalReviews: 6
    },
    {
        name: "Celestial Stella Studs",
        slug: "celestial-stella-studs",
        description: "Refined minimalist multi-faceted starburst clusters designed with micro-pave ideal cut premium white gold settings.",
        category: "Earrings",
        subCategory: "Studs",
        certifications: ["BIS Hallmarked", "IGI Certified"],
        goldWeight: 3.8,
        makingChargePerGram: 900,
        availableKarats: ["14K", "18K"],
        stones: [{ type: "Diamond", carat: 0.6, estimatedValue: 38000 }],
        images: [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Celestial Stella Diamond Studs | TBA",
        metaDescription: "Shop versatile everyday architectural real gold diamond stud earrings.",
        isActive: true,
        isFeatured: false,
        inStock: true,
        averageRating: 4.6,
        totalReviews: 42
    },
    {
        name: "Victorian Elegance Ruby Riviera",
        slug: "victorian-elegance-ruby-riviera",
        description: "An evocative continuous graduated statement necklace holding intense Pigeon-Blood red rubies framed within fine micro-pave diamond halos.",
        category: "Necklaces",
        subCategory: "Riviera",
        certifications: ["BIS Hallmarked", "IGI Certified"],
        goldWeight: 34.5,
        makingChargePerGram: 1600,
        availableKarats: ["18K"],
        stones: [
            { type: "Ruby", carat: 12.2, estimatedValue: 310000 },
            { type: "Diamond", carat: 3.5, estimatedValue: 180000 }
        ],
        images: [
            "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Victorian Ruby Riviera Necklace | TBA",
        metaDescription: "A glorious continuous array of brilliant rubies structured for high-end luxury formal events.",
        isActive: true,
        isFeatured: true,
        inStock: false,
        averageRating: 4.9,
        totalReviews: 11
    },
    {
        name: "The Nizam Crescent Balis",
        slug: "nizam-crescent-balis",
        description: "Traditional dynamic crescent hooped balis encrusted with table-cut gemstones and finished with delicate premium saltwater seed pearls.",
        category: "Earrings",
        subCategory: "Hoops",
        certifications: ["BIS Hallmarked"],
        goldWeight: 14.0,
        makingChargePerGram: 1050,
        availableKarats: ["18K", "22K"],
        stones: [
            { type: "Sapphire", carat: 1.8, estimatedValue: 29000 },
            { type: "Pearl", carat: 3.0, estimatedValue: 12000 }
        ],
        images: [
            "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Nizam Crescent Hoop Balis | TBA",
        metaDescription: "Exquisite heritage-style hooped earrings using multi-gem stone combinations.",
        isActive: true,
        isFeatured: false,
        inStock: true,
        averageRating: 4.8,
        totalReviews: 17
    },
    {
        name: "Mayfair Contemporary Sleek Bracelet",
        slug: "mayfair-contemporary-sleek-bracelet",
        description: "A fluid, highly flexible architectural mesh bracelet constructed in standard white gold with a singular secure diamond toggle clasp.",
        category: "Bangles",
        subCategory: "Bracelets",
        certifications: ["BIS Hallmarked", "GIA Certified"],
        goldWeight: 22.4,
        makingChargePerGram: 1300,
        availableKarats: ["18K"],
        stones: [{ type: "Diamond", carat: 0.5, estimatedValue: 45000 }],
        images: [
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Mayfair Contemporary Sleek Bracelet | TBA",
        metaDescription: "Fluidic sleek modern geometric daily wear hand wrist luxury orchestrations.",
        isActive: true,
        isFeatured: false,
        inStock: true,
        averageRating: 4.5,
        totalReviews: 22
    },
    {
        name: "Ayodhya Floral Opulence Laxmi Pendant",
        slug: "ayodhya-floral-opulence-laxmi-pendant",
        description: "A classic fine temple art design showcasing deep hand-repousse carvings of divine motifs nested in textured heavy gold foliage.",
        category: "Pendants",
        subCategory: "Temple Craft",
        certifications: ["BIS Hallmarked"],
        goldWeight: 19.5,
        makingChargePerGram: 1150,
        availableKarats: ["22K", "24K"],
        stones: [{ type: "Ruby", carat: 0.8, estimatedValue: 15000 }],
        images: [
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Ayodhya Laxmi Temple Craft Pendant | TBA",
        metaDescription: "Pure devotional premium high-carat statement temple medallions from India.",
        isActive: true,
        isFeatured: true,
        inStock: true,
        averageRating: 4.9,
        totalReviews: 35
    },
    {
        name: "Kashmiri Royale Solitaire Drop Medallion",
        slug: "kashmiri-royale-solitaire-drop-medallion",
        description: "A masterpiece design hosting an emerald-cut deep blue Ceylon Sapphire floating gracefully above twin tiers of tapered diamond baguettes.",
        category: "Necklaces",
        subCategory: "Medallions",
        certifications: ["BIS Hallmarked", "GIA Certified"],
        goldWeight: 28.0,
        makingChargePerGram: 1550,
        availableKarats: ["18K"],
        stones: [
            { type: "Sapphire", carat: 5.4, estimatedValue: 230000 },
            { type: "Diamond", carat: 1.8, estimatedValue: 98000 }
        ],
        images: [
            "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
        ],
        metaTitle: "Kashmiri Royale Sapphire Medallion | TBA",
        metaDescription: "Impeccable deep sapphire royal ceremonial collection necklaces.",
        isActive: true,
        isFeatured: false,
        inStock: true,
        averageRating: 4.9,
        totalReviews: 14
    }
];

function calculateStartingPrice(product: JewelryProduct): number {
    // Find the lowest available karat grade option for base setting evaluation
    const sortedKarats = [...product.availableKarats].sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });
    const lowestKarat = sortedKarats[0] || "18K";
    const baseGoldPriceRate = LIVE_GOLD_PER_GRAM[lowestKarat];

    // (Weight * Rate) + (Weight * Making Charge per Gram)
    const structuralGoldCost = product.goldWeight * baseGoldPriceRate;
    const artisanCraftCost = product.goldWeight * product.makingChargePerGram;

    // Aggregate all mounted gemstone configurations
    const preciousStonesCost = product.stones.reduce((accumulated, stone) => {
        return accumulated + stone.estimatedValue;
    }, 0);

    return Math.round(structuralGoldCost + artisanCraftCost + preciousStonesCost);
}

export default function ProductsPage() {
    // --- UI Filter & Sort States ---
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedKarat, setSelectedKarat] = useState<string>("All");
    const [selectedCert, setSelectedCert] = useState<string>("All");
    const [priceRange, setPriceRange] = useState<number>(1000000); // 10 Lakhs Max Range Bound
    const [toggleFeaturedOnly, setToggleFeaturedOnly] = useState<boolean>(false);
    const [toggleInStockOnly, setToggleInStockOnly] = useState<boolean>(false);
    const [currentSortOption, setCurrentSortOption] = useState<string>("featured");

    // --- Mobile Filter Sheet States ---
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
    const [isMobileSortOpen, setIsMobileSortOpen] = useState<boolean>(false);

    // --- Local Wishlist Simulation Storage State ---
    const [wishlist, setWishlist] = useState<string[]>([]);

    // --- Wishlist Interaction Handler ---
    const toggleWishlist = (slug: string) => {
        setWishlist((prev) =>
            prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]
        );
    };

    // --- Synchronized Mobile Scroll Interlocking Lock ---
    useEffect(() => {
        const shouldLock = isMobileFilterOpen || isMobileSortOpen;
        if (shouldLock) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [isMobileFilterOpen, isMobileSortOpen]);

    // --- Highly Optimized Derived State Calculations ---
    const filteredAndSortedProducts = useMemo(() => {
        let dataset = [...MOCK_PRODUCTS];

        // 1. Structural Categorization Filtering
        if (selectedCategory !== "All") {
            dataset = dataset.filter(
                (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // 2. Metallurgical Purity Grading Filtering
        if (selectedKarat !== "All") {
            dataset = dataset.filter((p) => p.availableKarats.includes(selectedKarat as any));
        }

        // 3. Authenticity Certification Agency Filtering
        if (selectedCert !== "All") {
            dataset = dataset.filter((p) => p.certifications.includes(selectedCert as any));
        }

        // 4. Highlighted Curated Flag Filtering
        if (toggleFeaturedOnly) {
            dataset = dataset.filter((p) => p.isFeatured);
        }

        // 5. Inventory Allocation Status Filtering
        if (toggleInStockOnly) {
            dataset = dataset.filter((p) => p.inStock);
        }

        // 6. Computational Dynamic Budget Cap Boundary Filtering
        dataset = dataset.filter((p) => calculateStartingPrice(p) <= priceRange);

        // 7. Structural Sort Matrix Execution
        switch (currentSortOption) {
            case "price-asc":
                dataset.sort((a, b) => calculateStartingPrice(a) - calculateStartingPrice(b));
                break;
            case "price-desc":
                dataset.sort((a, b) => calculateStartingPrice(b) - calculateStartingPrice(a));
                break;
            case "reviews":
                dataset.sort((a, b) => b.totalReviews - a.totalReviews);
                break;
            case "featured":
            default:
                // Prioritize explicit flag, fall back to review rank weightings
                dataset.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
                break;
        }

        return dataset;
    }, [
        selectedCategory,
        selectedKarat,
        selectedCert,
        priceRange,
        toggleFeaturedOnly,
        toggleInStockOnly,
        currentSortOption,
    ]);

    // --- Reset Application Handlers ---
    const clearAllFilters = () => {
        setSelectedCategory("All");
        setSelectedKarat("All");
        setSelectedCert("All");
        setPriceRange(1000000);
        setToggleFeaturedOnly(false);
        setToggleInStockOnly(false);
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

            <main className="w-full pb-4 bg-[var(--color-bg)] min-h-screen font-secondary text-[var(--color-text)]">



                {/* SECTION 1: EDITORIAL HERO BANNER */}
                <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden flex items-center justify-center bg-[var(--color-teal-dark)]">
                    {/* Deep Ambient Luxury Overlay */}
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=75"
                        alt="Luxury Jewelry Craftsmanship Exhibition Canvas"
                        className="absolute inset-0 w-full h-full object-cover scale-105 motion-safe:animate-[shimmer_60s_infinite_linear]"
                        style={{ transformOrigin: "center center" }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                        className="relative z-20 text-center px-4 max-w-2xl"
                    >
                        <span className="font-display text-[10px] md:text-xs tracking-[0.4em] uppercase text-[var(--color-cream)] font-medium mb-3 block">
                            The Haute Couture Collection
                        </span>
                        <h1 className="font-primary text-3xl md:text-5xl text-[var(--color-white)] font-normal tracking-wide mb-4 leading-tight">
                            Exquisite Artistry, Eternal Stories
                        </h1>
                        <p className="font-secondary text-xs md:text-sm text-[var(--color-cream-light)]/80 font-light max-w-lg mx-auto leading-relaxed">
                            Immerse yourself in precision-crafted heirloom formulations where classical Indian heritage motifs find a harmonious equilibrium with pristine minimal modernity.
                        </p>
                    </motion.div>
                </section>

                {/* SECTION 2: PRODUCTS LAYOUT ORCHESTRATION ARCHITECTURE */}
                <div className="container mt-6 flex gap-8 items-start min-h-[calc(100vh-var(--navbar-height)-var(--category-bar-height))]">
                    <div className="w-full flex gap-8 items-start">

                        {/* DESKTOP DEDICATED STICKY SIDEBAR SYSTEM */}
                        <aside className="hidden lg:block w-[280px] xl:w-[310px] shrink-0 sticky top-10 bg-[var(--color-bg-secondary)] border border-border-subtle rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-sm)] max-h-[calc(100vh-160px)] overflow-y-auto styled-scrollbar">

                            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4 mb-5">
                                <h2 className="font-primary text-lg text-[var(--color-teal)] font-medium tracking-wide">
                                    Refine Matrix
                                </h2>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-[10px] font-secondary uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-teal)] transition-colors cursor-pointer border-b border-transparent hover:border-[var(--color-teal)] pb-0.5"
                                >
                                    Reset All
                                </button>
                            </div>

                            {/* Filter Group: Category Block */}
                            <div className="mb-6">
                                <h3 className="text-[11px] font-secondary uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-bold mb-3">
                                    Collections
                                </h3>
                                <div className="flex flex-col gap-1.5">
                                    {["All", "Rings", "Necklaces", "Earrings", "Bangles", "Pendants"].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`flex items-center justify-between text-xs text-left py-1.5 px-2 rounded-[var(--radius-sm)] transition-all cursor-pointer ${selectedCategory === cat
                                                ? "bg-[var(--color-teal)] text-white font-medium"
                                                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-cream-light)]/40"
                                                }`}
                                        >
                                            <span>{cat}</span>
                                            {selectedCategory === cat && <Check size={12} className="text-white" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filter Group: Computational Metallurgical Purity Option */}
                            <div className="mb-6">
                                <h3 className="text-[11px] font-secondary uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-bold mb-3">
                                    Gold Purity
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {["All", "14K", "18K", "22K", "24K"].map((k) => (
                                        <button
                                            key={k}
                                            onClick={() => setSelectedKarat(k)}
                                            className={`text-xs text-center py-2 border rounded-[var(--radius-sm)] transition-all cursor-pointer ${selectedKarat === k
                                                ? "border-[var(--color-teal)] bg-[var(--color-teal)] text-white"
                                                : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)] bg-white"
                                                }`}
                                        >
                                            {k}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filter Group: Price Bound Slider Control */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-[11px] font-secondary uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-bold">
                                        Max Pricing threshold
                                    </h3>
                                </div>
                                <input
                                    type="range"
                                    min="30000"
                                    max="1000000"
                                    step="10000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full accent-[var(--color-teal)] cursor-pointer"
                                />
                                <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] font-mono mt-1.5">
                                    <span>₹30,000</span>
                                    <span className="text-[var(--color-teal)] font-semibold">₹{priceRange.toLocaleString("en-IN")}</span>
                                </div>
                            </div>

                            {/* Filter Group: Certifications Matrix Checklist */}
                            <div className="mb-6">
                                <h3 className="text-[11px] font-secondary uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-bold mb-3">
                                    Assurance Seal
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {["All", "BIS Hallmarked", "GIA Certified", "IGI Certified"].map((cert) => (
                                        <label
                                            key={cert}
                                            className="flex items-center gap-2.5 text-xs text-[var(--color-text-secondary)] cursor-pointer select-none"
                                        >
                                            <input
                                                type="radio"
                                                name="desktopCert"
                                                checked={selectedCert === cert}
                                                onChange={() => setSelectedCert(cert)}
                                                className="accent-[var(--color-teal)] w-3.5 h-3.5"
                                            />
                                            <span>{cert}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Filter Group: Binary Flag Toggle Toggles */}
                            <div className="border-t border-[var(--color-border-subtle)] pt-4 flex flex-col gap-3">
                                <label className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] cursor-pointer">
                                    <span className="font-medium">Curated Highlights Only</span>
                                    <input
                                        type="checkbox"
                                        checked={toggleFeaturedOnly}
                                        onChange={(e) => setToggleFeaturedOnly(e.target.checked)}
                                        className="accent-[var(--color-teal)] w-4 h-4 rounded"
                                    />
                                </label>

                                <label className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] cursor-pointer">
                                    <span className="font-medium">Ready to Dispatch (In Stock)</span>
                                    <input
                                        type="checkbox"
                                        checked={toggleInStockOnly}
                                        onChange={(e) => setToggleInStockOnly(e.target.checked)}
                                        className="accent-[var(--color-teal)] w-4 h-4 rounded"
                                    />
                                </label>
                            </div>

                            {/* Sorting Module directly integrated inside Sidebar for desktop */}
                            <div className="border-t border-[var(--color-border-subtle)] pt-4 mt-4">
                                <h3 className="text-[11px] font-secondary uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-bold mb-3">
                                    Sequence Order
                                </h3>
                                <select
                                    value={currentSortOption}
                                    onChange={(e) => setCurrentSortOption(e.target.value)}
                                    className="w-full bg-white border border-[var(--color-border)] rounded-[var(--radius-sm)] py-2 px-3 text-xs outline-none focus:border-[var(--color-teal)] text-[var(--color-text-secondary)] font-secondary cursor-pointer"
                                >
                                    <option value="featured">Curated Connoisseur Choice</option>
                                    <option value="price-asc">Price Sequence: Low to High</option>
                                    <option value="price-desc">Price Sequence: High to Low</option>
                                    <option value="reviews">Customer Appreciation Rank</option>
                                </select>
                            </div>
                        </aside>

                        {/* DYNAMIC RIGHT SIDE MAIN GALLERY HUB PORTAL */}
                        <section className="flex-1 w-full">

                            {/* Gallery Control Bar Stats Subhead */}
                            <div className="w-full flex items-center justify-between mb-6 text-xs text-[var(--color-text-muted)] border-b border-[var(--color-border-subtle)] pb-3">
                                <div>
                                    Showing <span className="font-semibold text-[var(--color-teal)]">{filteredAndSortedProducts.length}</span> Masterpieces
                                </div>
                                <div className="hidden lg:flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-[var(--color-cream)]" />
                                    <span className="italic text-[11px]">All items include free insured shipping pan-India.</span>
                                </div>
                            </div>

                            {/* Product Empty Screen Handlers */}
                            {filteredAndSortedProducts.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-full py-24 text-center border border-dashed border-[var(--color-border)] rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)]"
                                >
                                    <Sparkles className="mx-auto text-[var(--color-cream)] mb-3" size={32} />
                                    <h3 className="font-primary text-xl text-[var(--color-teal)] mb-1">No Matching Manifestations</h3>
                                    <p className="text-xs text-[var(--color-text-muted)] max-w-sm mx-auto px-4">
                                        We could not track items aligning precisely to your criteria. Try loosening bounds or resetting structural parameter filters.
                                    </p>
                                    <button
                                        onClick={clearAllFilters}
                                        className="mt-4 bg-[var(--color-teal)] text-white text-xs uppercase tracking-widest font-secondary py-2 px-6 rounded-[var(--radius-full)] hover:bg-[var(--color-teal-light)] transition-colors cursor-pointer shadow-sm"
                                    >
                                        Restore Full Vault
                                    </button>
                                </motion.div>
                            ) : (
                                /* Essential Product Architectural Grid Presentation Context Layout */
                                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 xl:gap-8 gap-y-10 gap-x-4 sm:gap-6">
                                    <AnimatePresence mode="popLayout">
                                        {filteredAndSortedProducts.map((product) => {
                                            const dynamicStartingPrice = calculateStartingPrice(product);
                                            const isWishlisted = wishlist.includes(product.slug);

                                            return (
                                                <motion.article
                                                    layout
                                                    key={product.slug}
                                                    initial={{ opacity: 0, y: 12 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                                    className="group relative flex flex-col bg-[var(--color-white)] rounded-[var(--radius-md)] overflow-hidden shadow-sm hover:shadow-[var(--shadow-md)] border border-[var(--color-border-subtle)] lg:border-transparent lg:hover:border-[var(--color-border-subtle)] transition-all duration-[var(--transition-base)]"
                                                >
                                                    {/* Image Canvas Frame Enclosure - Strict Portrait 4:5 Aspect Constraints */}
                                                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-[var(--color-bg-secondary)] select-none">

                                                        {/* Structural Badge Markers Overlay Layers */}
                                                        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 pointer-events-none">
                                                            {product.isFeatured && (
                                                                <span className="bg-[var(--color-teal-dark)] text-[var(--color-cream)] text-[8px] md:text-[9px] uppercase tracking-[0.15em] font-medium py-1 px-2 rounded-sm shadow-sm">
                                                                    Curated Masterpiece
                                                                </span>
                                                            )}
                                                            {!product.inStock && (
                                                                <span className="bg-red-900/90 text-white text-[8px] md:text-[9px] uppercase tracking-[0.15em] font-medium py-1 px-2 rounded-sm shadow-sm">
                                                                    Consigned Vault
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Absolute Wishlist Heart Vector Interactivity */}
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                toggleWishlist(product.slug);
                                                            }}
                                                            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[var(--color-teal)] hover:text-red-500 shadow-sm transition-all duration-200 backdrop-blur-xs cursor-pointer group/wishlist"
                                                            aria-label={`Secure item ${product.name} inside internal wishlist archive.`}
                                                        >
                                                            <Heart
                                                                size={15}
                                                                className={`transition-transform duration-300 group-hover/wishlist:scale-110 ${isWishlisted ? "fill-red-500 text-red-500" : "text-[var(--color-text-muted)]"
                                                                    }`}
                                                            />
                                                        </button>

                                                        {/* Double Dual Layer Alternate Asset Crossfade Machine Framework */}
                                                        <div className="w-full h-full relative">
                                                            {/* Primary Vector Layer Asset */}
                                                            <img
                                                                src={product.images[0]}
                                                                alt={`${product.name} Premium Fine Facet Composition`}
                                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[var(--transition-slow)]"
                                                                loading="lazy"
                                                            />

                                                            {/* Secondary Desktop Vector Layer Asset (Revealed purely on hover actions) */}
                                                            {product.images[1] && (
                                                                <img
                                                                    src={product.images[1]}
                                                                    alt={`${product.name} Macro Detailing Perspective Component`}
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--transition-slow)] hidden lg:block"
                                                                    loading="lazy"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Product Detail Text Metadata Informational Cluster Block */}
                                                    <div className="p-3 md:p-4 flex-1 flex flex-col justify-between bg-white z-10">
                                                        <div>
                                                            {/* Category Label */}
                                                            <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-medium mb-1">
                                                                {product.category} • {product.subCategory}
                                                            </span>

                                                            {/* Architectural Core Title String */}
                                                            <h4 className="font-primary text-sm md:text-base text-[var(--color-text)] font-normal group-hover:text-[var(--color-teal-light)] transition-colors line-clamp-1 leading-snug mb-2">
                                                                {product.name}
                                                            </h4>
                                                        </div>

                                                        {/* Dynamic Computed Calculated Initial Base Price Array Frame */}
                                                        <div className="mt-2 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                                                            <div>
                                                                <span className="block text-[8px] uppercase tracking-widest text-[var(--color-text-muted)]">
                                                                    Base Value
                                                                </span>
                                                                <span className="font-secondary text-xs md:text-sm font-medium text-[var(--color-teal)] font-mono">
                                                                    {dynamicStartingPrice.toLocaleString("en-IN")}
                                                                </span>
                                                            </div>

                                                            {/* Explicit Minimal Verification Indicator */}
                                                            <span className="text-[9px] text-[var(--color-text-muted)] italic hidden sm:inline-block">
                                                                {product.availableKarats[0]} Pure
                                                            </span>
                                                        </div>
                                                    </div>
                                                </motion.article>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                {/* SECTION 3: MOBILE STICKY FLOATING GLASS BAR COMPONENT ARCHITECTURE */}
                <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[250] bg-[var(--color-teal-dark)]/90 text-white backdrop-blur-md rounded-full shadow-[var(--shadow-lg)] px-6 py-3 flex items-center gap-6 border border-white/10 w-[85%] max-w-xs justify-around">
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="flex items-center gap-2 text-xs font-secondary uppercase tracking-widest cursor-pointer hover:text-[var(--color-cream)] transition-colors p-1"
                    >
                        <SlidersHorizontal size={14} className="text-[var(--color-cream)]" />
                        <span>Filter</span>
                    </button>

                    <div className="w-[1px] h-4 bg-white/20" />

                    <button
                        onClick={() => setIsMobileSortOpen(true)}
                        className="flex items-center gap-2 text-xs font-secondary uppercase tracking-widest cursor-pointer hover:text-[var(--color-cream)] transition-colors p-1"
                    >
                        <ArrowUpDown size={14} className="text-[var(--color-cream)]" />
                        <span>Sort</span>
                    </button>
                </div>

                {/* SECTION 4: MOBILE DEDICATED ANCHORED FILTER BOTTOM SHEET MODAL */}
                <AnimatePresence>
                    {isMobileFilterOpen && (
                        <>
                            {/* Dark Sheet Matte Backdrop Context Layer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="fixed inset-0 bg-black/60 z-[350]"
                            />

                            {/* Bottom Form Sheet Drawer */}
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-[var(--color-bg)] rounded-t-[var(--radius-xl)] z-[360] overflow-y-auto p-6 shadow-[0_-8px_32px_rgba(0,0,0,0.15)] pb-24"
                            >
                                {/* Sheet Sub-Header Controls */}
                                <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4 mb-4">
                                    <h3 className="font-primary text-lg text-[var(--color-teal)] font-medium">Refinement Filter</h3>
                                    <button
                                        onClick={() => setIsMobileFilterOpen(false)}
                                        className="p-1 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text)] cursor-pointer"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Mobile Category Block */}
                                <div className="mb-5">
                                    <h4 className="text-[10px] font-secondary uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-bold mb-2">
                                        Collections Category
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["All", "Rings", "Necklaces", "Earrings", "Bangles", "Pendants"].map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${selectedCategory === cat
                                                    ? "bg-[var(--color-teal)] text-white"
                                                    : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Karat Allocation Block */}
                                <div className="mb-5">
                                    <h4 className="text-[10px] font-secondary uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-bold mb-2">
                                        Gold Karat Purity
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["All", "14K", "18K", "22K", "24K"].map((k) => (
                                            <button
                                                key={k}
                                                onClick={() => setSelectedKarat(k)}
                                                className={`text-xs px-4 py-1.5 rounded-sm transition-all cursor-pointer ${selectedKarat === k
                                                    ? "bg-[var(--color-teal)] text-white border border-[var(--color-teal)]"
                                                    : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                                                    }`}
                                            >
                                                {k}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Range Dynamic Price Framework Slider */}
                                <div className="mb-5">
                                    <h4 className="text-[10px] font-secondary uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-bold mb-1">
                                        Financial Boundary Threshold
                                    </h4>
                                    <input
                                        type="range"
                                        min="30000"
                                        max="1000000"
                                        step="10000"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full accent-[var(--color-teal)] cursor-pointer mt-2"
                                    />
                                    <div className="flex justify-between text-[11px] font-mono mt-1 text-[var(--color-text-muted)]">
                                        <span>₹30K</span>
                                        <span className="text-[var(--color-teal)] font-bold">₹{priceRange.toLocaleString("en-IN")} Max</span>
                                    </div>
                                </div>

                                {/* Mobile Cert Radios Block */}
                                <div className="mb-5">
                                    <h4 className="text-[10px] font-secondary uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-bold mb-2">
                                        Assurance Agency Seal
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["All", "BIS Hallmarked", "GIA Certified", "IGI Certified"].map((cert) => (
                                            <button
                                                key={cert}
                                                onClick={() => setSelectedCert(cert)}
                                                className={`text-xs py-2 px-3 text-left border rounded-xs transition-all cursor-pointer flex items-center justify-between ${selectedCert === cert
                                                    ? "border-[var(--color-teal)] bg-[var(--color-teal)]/5 text-[var(--color-teal)] font-medium"
                                                    : "border-[var(--color-border)] text-[var(--color-text-secondary)] bg-white"
                                                    }`}
                                            >
                                                <span>{cert}</span>
                                                {selectedCert === cert && <Check size={12} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Binary Checks Area Block */}
                                <div className="border-t border-[var(--color-border-subtle)] pt-4 flex flex-col gap-3">
                                    <label className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                                        <span>Show Highlighted Curator Choices Only</span>
                                        <input
                                            type="checkbox"
                                            checked={toggleFeaturedOnly}
                                            onChange={(e) => setToggleFeaturedOnly(e.target.checked)}
                                            className="accent-[var(--color-teal)] w-4 h-4"
                                        />
                                    </label>
                                    <label className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                                        <span>Show Immediate Ready Dispatch Only</span>
                                        <input
                                            type="checkbox"
                                            checked={toggleInStockOnly}
                                            onChange={(e) => setToggleInStockOnly(e.target.checked)}
                                            className="accent-[var(--color-teal)] w-4 h-4"
                                        />
                                    </label>
                                </div>

                                {/* Floating Trigger Submission Button inside Mobile Drawer */}
                                <div className="mt-6 pt-2">
                                    <button
                                        onClick={() => setIsMobileFilterOpen(false)}
                                        className="w-full bg-[var(--color-teal)] text-white text-xs font-secondary uppercase tracking-widest py-3 rounded-[var(--radius-md)] cursor-pointer"
                                    >
                                        Apply Selections ({filteredAndSortedProducts.length} Items)
                                    </button>
                                    <button
                                        onClick={() => {
                                            clearAllFilters();
                                            setIsMobileFilterOpen(false);
                                        }}
                                        className="w-full bg-transparent text-[var(--color-text-muted)] text-xs font-secondary uppercase tracking-widest py-2.5 mt-2 cursor-pointer"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* SECTION 5: MOBILE DEDICATED ANCHORED SORT ORDER BOTTOM SHEET */}
                <AnimatePresence>
                    {isMobileSortOpen && (
                        <>
                            {/* Sheet Matte Background Backdrop Context Overlay Layer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileSortOpen(false)}
                                className="fixed inset-0 bg-black/60 z-[350]"
                            />

                            {/* Mobile Sorting Panel Sheet Matrix Box */}
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                                className="fixed bottom-0 left-0 right-0 bg-[var(--color-bg)] rounded-t-[var(--radius-xl)] z-[360] p-6 shadow-[0_-8px_32px_rgba(0,0,0,0.15)] pb-12"
                            >
                                <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4 mb-4">
                                    <h3 className="font-primary text-lg text-[var(--color-teal)] font-medium">Sequence Sequence Matrix</h3>
                                    <button
                                        onClick={() => setIsMobileSortOpen(false)}
                                        className="p-1 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text)] cursor-pointer"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-1">
                                    {[
                                        { value: "featured", label: "Curated Connoisseur Choices" },
                                        { value: "price-asc", label: "Financial Scaling: Low to High" },
                                        { value: "price-desc", label: "Financial Scaling: High to Low" },
                                        { value: "reviews", label: "Appreciation Volume Reviews Rank" },
                                    ].map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => {
                                                setCurrentSortOption(opt.value);
                                                setIsMobileSortOpen(false);
                                            }}
                                            className={`w-full text-left py-3 px-3 rounded-xs text-xs font-secondary transition-all cursor-pointer flex items-center justify-between ${currentSortOption === opt.value
                                                ? "bg-[var(--color-teal)] text-white font-semibold"
                                                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                                                }`}
                                        >
                                            <span>{opt.label}</span>
                                            {currentSortOption === opt.value && <Check size={14} />}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

            </main >

            <Footer onCategoryChange={setActiveCategory} />
        </>
    );
}