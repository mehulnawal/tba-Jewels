import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT_ASSETS, HERO_ASSETS, PRIME_ASSETS, AVATAR_ASSETS } from "../constants/assets";
import { Product, PrimeLook, PrimeHotspot, FAQ, Testimonial } from "../types";
import { useGoldPrice } from "../hooks/useGoldPrice";
import FloatingButtons from "../components/FloatingButtons";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import banner1 from '../assets/banner/banner1.png'
import banner2 from '../assets/banner/banner2.png'
import banner3 from '../assets/banner/banner3.png'

// import { useLenis } from "../providers/LenisProvider";

import {
    ChevronLeft,
    ChevronRight,
    Heart,
    ShoppingBag,
    X,
    Plus,
    Minus,
    Shield,
    RefreshCw,
    Award,
    TrendingUp,
    Star,
    Trash2,
    CheckCircle2,
    Sparkles,
    ShoppingBag as BagIcon,
    MapPin,
    Mail,
    Phone,
    ArrowRight
} from "lucide-react";
import { AuthModal } from "./AuthModal";
import PrimeSelection from "../components/PrimeCollection";


gsap.registerPlugin(ScrollTrigger);

const FEATURED_PRODUCTS: Product[] = [
    { id: "1", name: "Sia Gold Ring", category: "Rings", karat: "18K", image: PRODUCT_ASSETS.p1, tags: ["NEW", "HOT"] },
    { id: "2", name: "Elvira Necklace", category: "Necklaces", karat: "22K", image: PRODUCT_ASSETS.p2, tags: ["BESTSELLER"], couponTag: "SAVE10" },
    { id: "3", name: "Zara Earrings", category: "Earrings", karat: "14K", image: PRODUCT_ASSETS.p3, tags: ["NEW"] },
    { id: "4", name: "Aria Bracelet", category: "Bracelets", karat: "18K", image: PRODUCT_ASSETS.p4, tags: ["HOT"] },
    { id: "5", name: "Celeste Ring", category: "Rings", karat: "22K", image: PRODUCT_ASSETS.p5, tags: ["BESTSELLER"] },
    { id: "6", name: "Mira Pendant", category: "Necklaces", karat: "18K", image: PRODUCT_ASSETS.p6, tags: ["NEW"], couponTag: "FLAT500" },
];

const HERO_SLIDES = [
    {
        id: "1",
        image: banner1,
        mobileImage: banner1
    },
    {
        id: "2",
        image: banner2,
        mobileImage: banner2
    },
    {
        id: "3",
        image: banner3,
        mobileImage: banner3
    },
];

const PRIME_LOOKS: PrimeLook[] = [
    {
        id: "1",
        image: PRIME_ASSETS.look1,
        hotspots: [
            { id: "h1", x: 42, y: 28, product: { id: "1", name: "Sia Gold Ring", karat: "18K", image: PRODUCT_ASSETS.p1 } },
            { id: "h2", x: 58, y: 60, product: { id: "2", name: "Elvira Necklace", karat: "22K", image: PRODUCT_ASSETS.p2 } },
        ]
    },
    {
        id: "2",
        image: PRIME_ASSETS.look2,
        hotspots: [
            { id: "h3", x: 35, y: 32, product: { id: "4", name: "Aria Bracelet", karat: "18K", image: PRODUCT_ASSETS.p4 } },
            { id: "h4", x: 62, y: 48, product: { id: "3", name: "Zara Earrings", karat: "14K", image: PRODUCT_ASSETS.p3 } },
        ]
    },
    {
        id: "3",
        image: PRIME_ASSETS.look3,
        hotspots: [
            { id: "h5", x: 48, y: 22, product: { id: "5", name: "Celeste Ring", karat: "22K", image: PRODUCT_ASSETS.p5 } },
            { id: "h6", x: 38, y: 68, product: { id: "6", name: "Mira Pendant", karat: "18K", image: PRODUCT_ASSETS.p6 } },
        ]
    },
];

const TESTIMONIALS: Testimonial[] = [
    {
        id: "1", name: "Priya Mehta", location: "Mumbai", rating: 5, avatar: AVATAR_ASSETS.a1,
        review: "TBA's craftsmanship is unmatched. The 22K necklace for my daughter's wedding was breathtaking — every detail perfect."
    },
    {
        id: "2", name: "Rajan Shah", location: "Surat", rating: 5, avatar: AVATAR_ASSETS.a2,
        review: "Transparent pricing, BIS certified, delivered on time. TBA has completely changed how I buy gold jewelry."
    },
    {
        id: "3", name: "Ananya Iyer", location: "Bangalore", rating: 5, avatar: AVATAR_ASSETS.a3,
        review: "The quality speaks for itself. Two years as a loyal customer. The lifetime exchange policy is a true game changer."
    },
    {
        id: "4", name: "Kavita Desai", location: "Ahmedabad", rating: 5, avatar: AVATAR_ASSETS.a4,
        review: "Purchased earrings as an anniversary gift. The packaging, finish, weight — all premium. Highly recommended."
    },
];

const FAQS: FAQ[] = [
    {
        id: "1", question: "Is TBA jewelry BIS Hallmarked?",
        answer: "Yes. Every piece sold by TBA carries official BIS hallmarking that certifies gold purity as per Indian government standards."
    },
    {
        id: "2", question: "What karats of gold do you offer?",
        answer: "We offer jewelry in 9K, 14K, 18K, 22K, and 24K gold. Each product page clearly displays the karat and purity percentage."
    },
    {
        id: "3", question: "How is the gold price calculated?",
        answer: "Prices are calculated using live market gold rates multiplied by the gold weight and purity percentage of each piece, plus making charges and stone charges. No hidden fees."
    },
    {
        id: "4", question: "Do you offer a lifetime exchange policy?",
        answer: "Yes. TBA offers lifetime exchange on all jewelry — zero deductions on making charges, no questions asked, no time limit."
    },
    {
        id: "5", question: "How long does delivery take?",
        answer: "Standard delivery takes 5–7 business days across India. Express delivery options are available at checkout. All orders are insured and tracked."
    },
    {
        id: "6", question: "Are online payments secure?",
        answer: "All payments are processed through PCI-DSS compliant payment gateways. We support UPI, credit/debit cards, net banking, and EMI options."
    },
];

interface CartItem {
    product: Product;
    quantity: number;
}

export default function HomePage() {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");


    // const lenis = useLenis();

    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

    const [activeSlide, setActiveSlide] = useState(0);
    const [isHoveringHero, setIsHoveringHero] = useState(false);

    const [currentLookIndex, setCurrentLookIndex] = useState(0);
    const [selectedHotspot, setSelectedHotspot] = useState<PrimeHotspot | null>(null);
    const [isPrimeModalOpen, setIsPrimeModalOpen] = useState(false);

    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [faqOpenId, setFaqOpenId] = useState<string | null>(null);

    const { data: goldRates } = useGoldPrice();
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // useEffect(() => {
    //     const ctx = gsap.context(() => {

    //         gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
    //             gsap.fromTo(section,
    //                 { y: 50, opacity: 0 },
    //                 {
    //                     y: 0,
    //                     opacity: 1,
    //                     duration: 1,
    //                     ease: "power2.out",
    //                     scrollTrigger: {
    //                         trigger: section,
    //                         start: "top 85%",
    //                         toggleActions: "play none none none"
    //                     }
    //                 }
    //             );
    //         });

    //         gsap.fromTo(`.hero-slide-${activeSlide} img`,
    //             { scale: 1.08 },
    //             { scale: 1, duration: 2.5, ease: "power2.out" }
    //         );
    //     });
    //     return () => ctx.revert();
    // }, [activeSlide]);

    // Autoplay Hero banner timers

    useEffect(() => {
        if (isHoveringHero) return;
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5500);
        return () => clearInterval(interval);
    }, [isHoveringHero]);

    // Escape keys listeners to close popups
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsPrimeModalOpen(false);
                setIsCartOpen(false);
                setIsWishlistOpen(false);
                setShowCheckoutSuccess(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Update body scroll blocking depending on modals status
    // Update body scroll blocking depending on modals status
    useEffect(() => {
        const shouldLock = isPrimeModalOpen || isCartOpen || isWishlistOpen || showCheckoutSuccess || isAuthOpen;

        if (shouldLock) {
            // If you use Lenis scroll provider, uncomment the line below:
            // lenis.stop();
            document.body.style.overflow = "hidden";
            document.body.classList.add("modal-open");
        } else {
            // If you use Lenis scroll provider, uncomment the line below:
            // lenis.start();
            document.body.style.overflow = "unset";
            document.body.classList.remove("modal-open");
        }

        return () => {
            document.body.style.overflow = "unset";
            document.body.classList.remove("modal-open");
        };
    }, [isPrimeModalOpen, isCartOpen, isWishlistOpen, showCheckoutSuccess, isAuthOpen]);

    // Hero navigate handlers
    const nextHeroSlide = () => {
        setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    };
    const prevHeroSlide = () => {
        setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    };

    // Filtered jewelry products collection
    const filteredProducts = FEATURED_PRODUCTS.filter((p) => {
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.karat.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Calculate pricing estimates of a specific product using its Karat multiplier
    const getProductPrice = (product: Product) => {
        const defaultWeights: { [key: string]: number } = {
            "Rings": 4.5,
            "Necklaces": 32,
            "Earrings": 8.2,
            "Bracelets": 15.5,
        };

        const weight = defaultWeights[product.category] || 10;
        let baseGramRate = 6000; // Safe standard state rates

        if (goldRates) {
            const k = product.karat as keyof typeof goldRates;
            const rateValue = goldRates[k];
            if (typeof rateValue === "number") baseGramRate = rateValue;
        } else {
            // General backup mapping
            if (product.karat === "14K") baseGramRate = 3800;
            else if (product.karat === "18K") baseGramRate = 4900;
            else if (product.karat === "22K") baseGramRate = 5900;
            else if (product.karat === "24K") baseGramRate = 6500;
        }

        const rawGoldValue = baseGramRate * weight;
        const makingCharges = rawGoldValue * 0.12; // 12% craftsmanship
        const gstAndInsurance = (rawGoldValue + makingCharges) * 0.03; // tax levies
        return Math.round(rawGoldValue + makingCharges + gstAndInsurance);
    };

    // Shopping Ops Cart / Wishlist Actions
    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
        // Add visual notification
        setIsCartOpen(true);
    };

    const removeFromCart = (pId: string) => {
        setCart((prev) => prev.filter((item) => item.product.id !== pId));
    };

    const updateQuantity = (pId: string, delta: number) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.product.id === pId) {
                    const nextQty = item.quantity + delta;
                    return { ...item, quantity: nextQty < 1 ? 1 : nextQty };
                }
                return item;
            })
        );
    };

    const toggleWishlist = (product: Product) => {
        setWishlist((prev) => {
            const exists = prev.find((w) => w.id === product.id);
            if (exists) {
                return prev.filter((w) => w.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const isProductInWishlist = (productId: string) => {
        return wishlist.some((item) => item.id === productId);
    };

    // Total cart calculations
    const cartSubtotal = cart.reduce((total, item) => {
        return total + getProductPrice(item.product) * item.quantity;
    }, 0);

    const cartDiscount = cart.some(item => item.product.couponTag) ? Math.round(cartSubtotal * 0.05) : 0;
    const cartTotalAmount = Math.max(0, cartSubtotal - cartDiscount);

    // Prime look switching
    const handleLookChange = (index: number) => {
        setCurrentLookIndex(index);
    };

    const openHotspotModal = (hotspot: PrimeHotspot) => {
        setSelectedHotspot(hotspot);
        setIsPrimeModalOpen(true);
    };

    // Checkout submission handler
    const handleCheckoutProcess = () => {
        setIsCartOpen(false);
        setShowCheckoutSuccess(true);
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] flex flex-col relative antialiased selection:bg-[var(--color-cream)] selection:text-[var(--color-teal)]">

            {/* GLOBAL HEADINGS & HEADER SYSTEM */}
            <Navbar
                onSearchChange={setSearchQuery}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                onAuthOpen={() => setIsAuthOpen(true)}
            />

            <main className="flex-1 w-full flex flex-col gap-0">

                {/* Banner */}
                <section
                    onMouseEnter={() => setIsHoveringHero(true)}
                    onMouseLeave={() => setIsHoveringHero(false)}
                    className="relative w-full bg-[var(--color-bg)] py-3 md:py-4"
                    id="hero-banner-section"
                >
                    <div className="w-full px-2 md:px-4">
                        <div
                            className="relative w-full overflow-hidden rounded-[18px] md:rounded-[28px] bg-[var(--color-teal)]"
                            style={{ aspectRatio: "16/9", maxHeight: "520px" }}
                        >

                            {/* SLIDES */}
                            {HERO_SLIDES.map((slide, i) => (
                                <div
                                    key={slide.id}
                                    className={`absolute inset-0 hero-slide-${i}`}
                                    style={{
                                        opacity: i === activeSlide ? 1 : 0,
                                        zIndex: i === activeSlide ? 1 : 0,
                                        transition: "opacity 1000ms ease-in-out",
                                    }}
                                >
                                    <img
                                        src={slide.image}
                                        alt={`Banner slide ${i + 1}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "left center",
                                            display: "block",
                                            pointerEvents: "none",
                                        }}
                                    />
                                </div>
                            ))}

                            {/* Slide indicator lines */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 20,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    zIndex: 10,
                                }}
                            >
                                {HERO_SLIDES.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveSlide(i)}
                                        aria-label={`Go to slide ${i + 1}`}
                                        style={{
                                            background: "transparent",
                                            border: "none",
                                            padding: "6px 2px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "block",
                                                height: 2,
                                                borderRadius: 2,
                                                transition: "width 500ms ease, background-color 500ms ease",
                                                width: i === activeSlide ? 40 : 14,
                                                backgroundColor:
                                                    i === activeSlide
                                                        ? "rgba(255,255,255,1)"
                                                        : "rgba(255,255,255,0.35)",
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* buttons */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 16,
                                    left: 20,
                                    display: "flex",
                                    gap: 10,
                                    zIndex: 10,
                                }}
                            >
                                <button
                                    onClick={prevHeroSlide}
                                    aria-label="Previous slide"
                                    style={{
                                        width: 38,
                                        height: 38,
                                        borderRadius: "50%",
                                        border: "1px solid rgba(255,255,255,0.3)",
                                        background: "rgba(0,0,0,0.15)",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        backdropFilter: "blur(4px)",
                                        transition: "background 300ms, color 300ms",
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = "white";
                                        e.currentTarget.style.color = "var(--color-teal)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = "rgba(0,0,0,0.15)";
                                        e.currentTarget.style.color = "white";
                                    }}
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button
                                    onClick={nextHeroSlide}
                                    aria-label="Next slide"
                                    style={{
                                        width: 38,
                                        height: 38,
                                        borderRadius: "50%",
                                        border: "1px solid rgba(255,255,255,0.3)",
                                        background: "rgba(0,0,0,0.15)",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        backdropFilter: "blur(4px)",
                                        transition: "background 300ms, color 300ms",
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = "white";
                                        e.currentTarget.style.color = "var(--color-teal)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = "rgba(0,0,0,0.15)";
                                        e.currentTarget.style.color = "white";
                                    }}
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Prime collection */}
                <PrimeSelection />

                {/* best seller */}
                <section className="reveal-section py-3 bg-[var(--color-bg)]" id="collection-grid">
                    <div className="container">

                        {/* Section Title Header */}
                        <div className="flex flex-col items-center mb-16 text-center">
                            <span className="section-label">Selected Statement Masterpieces</span>
                            <h2 className="font-primary text-3xl md:text-4xl text-[var(--color-text)] tracking-wide font-light">
                                The Best Seller Showcase
                            </h2>
                            <div className="w-12 h-[1px] bg-[var(--color-cream)] mt-4" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {filteredProducts.map((product) => {
                                const isInWishlist = isProductInWishlist(product.id);
                                const standardPrice = getProductPrice(product);

                                return (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5 }}
                                        className="group relative flex flex-col justify-between bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-[var(--color-border-subtle)] hover:border-[var(--color-cream)] hover:shadow-xl hover:shadow-[var(--color-cream)]/10 transition-all duration-500 ease-out"
                                    >
                                        {/* 1. Wrap Image and Title Meta details inside a Link to route to details view */}
                                        <Link
                                            to={`/product/${product.slug}`}
                                            className="no-underline text-inherit flex flex-col flex-1"
                                        >
                                            {/* Image Preview Window Frame Container */}
                                            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[var(--color-bg-secondary)] mb-5">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                                                    loading="lazy"
                                                />

                                                {/* Badge Indicators Layer */}
                                                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                                                    {product.tags?.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className={`font-secondary text-[9px] tracking-widest font-semibold uppercase px-2 py-1 rounded-sm text-white ${tag === "BESTSELLER" ? "bg-[var(--color-teal)]" : "bg-amber-700"}`}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Text Metadata Specifications Block */}
                                            <div className="flex flex-col flex-1 px-1">
                                                <div className="flex justify-between items-start gap-2 mb-1">
                                                    <h3 className="font-primary text-base text-[var(--color-text)] tracking-wide font-light line-clamp-1 group-hover:text-[var(--color-teal-light)] transition-colors duration-300">
                                                        {product.name}
                                                    </h3>
                                                    <span className="font-secondary text-[11px] font-medium tracking-wider text-[var(--color-teal)] bg-[var(--color-cream-light)] px-2 py-0.5 rounded-full whitespace-nowrap self-center">
                                                        {product.karat}
                                                    </span>
                                                </div>

                                                <p className="font-secondary text-xs text-[var(--color-text-muted)] tracking-wider mb-4">
                                                    {product.category}
                                                </p>
                                            </div>
                                        </Link>

                                        {/* 2. Floating Wishlist Button placed outside Link context using stopPropagation */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation(); // Prevents link navigation click trigger
                                                if (!isLoggedIn) {
                                                    setIsAuthOpen(true);
                                                } else {
                                                    toggleWishlist(product);
                                                }
                                            }}
                                            aria-label={isInWishlist ? "Remove from vault" : "Add to vault"}
                                            className="absolute top-7 right-7 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md text-[var(--color-text-muted)] hover:text-rose-600 border border-[var(--color-border-subtle)] hover:border-transparent transition-all duration-300 cursor-pointer z-20 focus:outline-none"
                                        >
                                            <Heart
                                                className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isInWishlist ? "fill-rose-600 stroke-rose-600" : "stroke-[1.5]"}`}
                                            />
                                        </button>

                                        {/* Action Row Pricing Tag & Intercept Checkout Cart Triggers outside Link context */}
                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--color-border-subtle)] px-1 z-20">
                                            <div className="flex flex-col">
                                                <span className="font-secondary text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest leading-none mb-1">
                                                    Estimated Price
                                                </span>
                                                <span className="font-secondary text-sm font-semibold text-[var(--color-text)]">
                                                    ₹{standardPrice.toLocaleString("en-IN")}
                                                </span>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation(); // Prevents link navigation click trigger
                                                    if (!isLoggedIn) {
                                                        setIsAuthOpen(true);
                                                    } else {
                                                        addToCart(product);
                                                    }
                                                }}
                                                className="flex items-center gap-2 bg-[var(--color-teal)] hover:bg-[var(--color-teal-light)] text-white px-4 py-2.5 rounded-md font-secondary text-xs uppercase tracking-widest transition-all duration-300 ease-out border-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-teal)]"
                                            >
                                                <ShoppingBag className="w-3.5 h-3.5 stroke-[1.75]" />
                                                <span>Acquire</span>
                                            </button>
                                        </div>

                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>


                {/* Why Choose Us */}
                <section className="bg-[var(--color-bg-secondary)]" id="brand-promise-section">

                    {/* Part 1: Why Choose Us */}
                    <div className="section-padding container">
                        <div className="text-center mb-16 reveal-section">
                            <span className="section-label">Our Promise</span>
                            <h2 className="text-4xl md:text-5xl font-primary text-[var(--color-teal)] font-normal tracking-wide">
                                Why Choose TBA
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">

                            {/* Card 1 */}
                            <div className="bg-[var(--color-white)] rounded-lg p-8 border border-[var(--color-border-subtle)] shadow-xs flex flex-col gap-4 reveal-section">
                                <Shield size={36} className="text-[var(--color-teal)] shrink-0" />
                                <h3 className="font-primary text-xl font-medium text-[var(--color-teal)]">
                                    BIS Hallmarked
                                </h3>
                                <p className="font-secondary text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                    Every jewelry item carries raw certification and physical BIS Hallmark verifying gold purity, guaranteeing official government standards.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-[var(--color-white)] rounded-lg p-8 border border-[var(--color-border-subtle)] shadow-xs flex flex-col gap-4 reveal-section">
                                <RefreshCw size={36} className="text-[var(--color-teal)] shrink-0" />
                                <h3 className="font-primary text-xl font-medium text-[var(--color-teal)]">
                                    Lifetime Exchange
                                </h3>
                                <p className="font-secondary text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                    Gain extreme resale flexibility with our policy: exchange or trade-in anytime, with zero deductions on your gold value weight rates.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-[var(--color-white)] rounded-lg p-8 border border-[var(--color-border-subtle)] shadow-xs flex flex-col gap-4 reveal-section">
                                <Award size={36} className="text-[var(--color-teal)] shrink-0" />
                                <h3 className="font-primary text-xl font-medium text-[var(--color-teal)]">
                                    Master Craftsmanship
                                </h3>
                                <p className="font-secondary text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                    Engineered and finished by direct generational artisans pulling centuries of traditional jewelry expertise into every detail.
                                </p>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-[var(--color-white)] rounded-lg p-8 border border-[var(--color-border-subtle)] shadow-xs flex flex-col gap-4 reveal-section">
                                <TrendingUp size={36} className="text-[var(--color-teal)] shrink-0" />
                                <h3 className="font-primary text-xl font-medium text-[var(--color-teal)]">
                                    Live Gold Pricing
                                </h3>
                                <p className="font-secondary text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                    Complete buying transparency. Items prices are calculated directly from market spot-prices, without hidden overhead.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Part 2: Brand Promise Stats Strip Container (teal background) */}
                    <div className="w-full bg-[var(--color-teal)] py-4 md:py-10 text-white border-t border-white/5">
                        <div className="container max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">

                            {/* Stat 1 */}
                            <div className="text-center flex flex-col items-center gap-2 reveal-section">
                                <span className="font-primary text-4xl m-0 font-bold tracking-tight text-[var(--color-cream)]">100%</span>
                                <span className="font-secondary text-[10px] tracking-[0.25em] text-white/80 uppercase">BIS HALLMARKED</span>
                            </div>

                            {/* Stat 2 */}
                            <div className="text-center flex flex-col items-center gap-2 reveal-section">
                                <span className="font-primary text-4xl m-0 font-bold tracking-tight text-[var(--color-cream)]">∞</span>
                                <span className="font-secondary text-[10px] tracking-[0.25em] text-white/80 uppercase">LIFETIME EXCHANGE</span>
                            </div>

                            {/* Stat 3 */}
                            <div className="text-center flex flex-col items-center gap-2 reveal-section">
                                <span className="font-primary text-4xl m-0 font-bold tracking-tight text-[var(--color-cream)]">5 ★</span>
                                <span className="font-secondary text-[10px] tracking-[0.25em] text-white/80 uppercase">CUSTOMER RATING</span>
                            </div>

                            {/* Stat 4 */}
                            <div className="text-center flex flex-col items-center gap-2 reveal-section">
                                <span className="font-primary text-4xl m-0 font-bold tracking-tight text-[var(--color-cream)]">10+</span>
                                <span className="font-secondary text-[10px] tracking-[0.25em] text-white/80 uppercase">YEARS OF CRAFT</span>
                            </div>

                        </div>
                    </div>

                </section>

                {/* Testimonials  */}
                <section className="section-padding bg-[var(--color-bg)] overflow-hidden" id="testimonials-section">
                    <div className="container flex flex-col items-center gap-12">

                        <div className="text-center reveal-section">
                            <span className="section-label">Testimonials</span>
                            <h2 className="text-4xl md:text-5xl font-primary text-[var(--color-teal)] font-normal tracking-wide">
                                Atelier Chronicles
                            </h2>
                            <p className="mt-3 font-secondary text-sm text-[var(--color-text-muted)] max-w-lg mx-auto">
                                Read the stories from our clients who have acquired pieces of unmatched brilliance.
                            </p>
                        </div>

                        <div className="w-full max-w-2xl relative flex flex-col items-center reveal-section min-h-[300px]">

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={testimonialIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full bg-[var(--color-white)] rounded-2xl border border-[var(--color-border-subtle)] p-8 md:p-10 shadow-lg relative flex flex-col gap-6"
                                >
                                    <div className="flex gap-1.5">
                                        {Array.from({ length: TESTIMONIALS[testimonialIndex].rating }).map((_, i) => (
                                            <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
                                        ))}
                                    </div>

                                    <blockquote className="font-primary text-lg md:text-xl text-[var(--color-teal)] italic leading-relaxed font-normal">
                                        "{TESTIMONIALS[testimonialIndex].review}"
                                    </blockquote>

                                    <div className="flex items-center gap-3 border-t border-[var(--color-border-subtle)] pt-5">
                                        <img
                                            src={TESTIMONIALS[testimonialIndex].avatar}
                                            alt={TESTIMONIALS[testimonialIndex].name}
                                            className="w-12 h-12 rounded-full object-cover shrink-0 border border-cream"
                                            referrerPolicy="no-referrer"
                                        />
                                        <div>
                                            <h4 className="font-secondary text-sm font-semibold text-[var(--color-teal)]">
                                                {TESTIMONIALS[testimonialIndex].name}
                                            </h4>
                                            <address className="font-secondary text-xs text-[var(--color-text-muted)] not-italic">
                                                {TESTIMONIALS[testimonialIndex].location}
                                            </address>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Side cards preview fading boundaries (visual mockup layers) */}
                            <div className="absolute right-[-2.5%] top-4 bottom-4 w-4 bg-[var(--color-cream-light)] rounded-r-2xl border-y border-r border-[var(--color-border-subtle)] opacity-40 -z-1 hidden lg:block" />
                            <div className="absolute left-[-2.5%] top-4 bottom-4 w-4 bg-[var(--color-cream-light)] rounded-l-2xl border-y border-l border-[var(--color-border-subtle)] opacity-40 -z-1 hidden lg:block" />

                        </div>

                        <div className="flex items-center gap-5 reveal-section">
                            <button
                                onClick={() => setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                                className="w-11 h-11 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-teal)] hover:bg-[var(--color-teal)] hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                                aria-label="Previous Testimonial"
                                id="testimonial-btn-prev"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            {/* Dots active metrics */}
                            <div className="flex gap-2">
                                {TESTIMONIALS.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setTestimonialIndex(i)}
                                        className={`h-2 rounded-full transition-all duration-300 border-none cursor-pointer p-0 ${i === testimonialIndex ? 'w-6 bg-[var(--color-teal)]' : 'w-2 bg-[var(--color-border)]'}`}
                                        aria-label={`Go to Testimonial ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
                                className="w-11 h-11 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-teal)] hover:bg-[var(--color-teal)] hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                                aria-label="Next Testimonial"
                                id="testimonial-btn-next"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </section >

                {/* FAQS */}
                <section className="section-padding bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-subtle)]" id="faq-section" >
                    <div className="container max-w-4xl flex flex-col gap-10">

                        {/* Titles headings */}
                        <div className="text-center reveal-section">
                            {/* <span className="section-label">Got Questions?</span> */}
                            <h2 className="text-4xl md:text-5xl font-primary text-[var(--color-teal)] font-normal tracking-wide">
                                Top Customer Questions
                            </h2>
                        </div>

                        {/* Accordions container list */}
                        <div className="w-full flex flex-col gap-3 reveal-section">
                            {FAQS.map((faq) => {
                                const isOpen = faqOpenId === faq.id;
                                return (
                                    <div
                                        key={faq.id}
                                        className="bg-[var(--color-white)] rounded-lg border border-[var(--color-border)] overflow-hidden transition-all duration-300 shadow-xs"
                                    >
                                        <button
                                            onClick={() => setFaqOpenId(isOpen ? null : faq.id)}
                                            className="w-full flex justify-between items-center px-6 py-5 bg-transparent border-none text-left cursor-pointer transition-all duration-200"
                                        >
                                            <span className="font-secondary font-semibold text-[var(--color-teal)] text-sm md:text-base tracking-wide pr-4">
                                                {faq.question}
                                            </span>
                                            <span
                                                className="text-2xl font-light text-[var(--color-teal)] flex shrink-0 transition-transform duration-300"
                                                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                                            >
                                                +
                                            </span>
                                        </button>

                                        {/* Animated heights drawers */}
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                                                >
                                                    <div className="px-6 pb-6 pt-1 border-t border-[var(--color-border-subtle)] font-secondary text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                                        {faq.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </section >

                {/* Footer */}
                <Footer onCategoryChange={setActiveCategory} />

                {/* SECTION G: SEO STRUCTURAL DIRECTORY DIRECT LINK GROUPS */}
                {/* <section className="bg-[var(--color-white)] border-t border-[var(--color-border-subtle)] pt-2" id="seo-links-directory">
                    <div className="container max-w-5xl flex flex-col gap-8">


                        <div className="flex flex-col gap-2 reveal-section">
                            <h5 className="font-secondary font-semibold text-xs tracking-wider text-[var(--color-teal)] uppercase">
                                Top Searches in Gold Jewelry
                            </h5>
                            <p className="font-secondary text-xs text-[var(--color-text-muted)] leading-relaxed">
                                {["Gold Jewellery", "Gold Rings", "Gold Earrings", "Gold Necklaces", "Gold Pendants", "Gold Bangles", "Gold Bracelets", "Women Gold Rings", "Men's Gold Chains", "Dailywear Gold Earrings", "Dailywear Gold Bangles"].map((term, i, arr) => (
                                    <span key={term}>
                                        <a href="#featured-collection-section" className="text-[var(--color-teal)] hover:underline active:opacity-85" onClick={() => { setActiveCategory("All"); setSearchQuery(term); }}>{term}</a>
                                        {i < arr.length - 1 && " | "}
                                    </span>
                                ))}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 border-t border-[var(--color-border-subtle)] pt-6 reveal-section">
                            <h5 className="font-secondary font-semibold text-xs tracking-wider text-[var(--color-teal)] uppercase">
                                Top Searches in Diamond Jewelry
                            </h5>
                            <p className="font-secondary text-xs text-[var(--color-text-muted)] leading-relaxed">
                                {["Diamond Jewellery", "Diamond Rings", "Diamond Earrings", "Diamond Pendants", "Diamond Necklaces", "Diamond Bangles", "Diamond Bracelets", "Women Diamond Rings", "Men's Diamond Bracelets"].map((term, i, arr) => (
                                    <span key={term}>
                                        <a href="#featured-collection-section" className="text-[var(--color-teal)] hover:underline active:opacity-85" onClick={() => { setActiveCategory("All"); setSearchQuery(term); }}>{term}</a>
                                        {i < arr.length - 1 && " | "}
                                    </span>
                                ))}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 border-t border-[var(--color-border-subtle)] pt-6 reveal-section">
                            <h5 className="font-secondary font-semibold text-xs tracking-wider text-[var(--color-teal)] uppercase">
                                Women's Jewelry Collection
                            </h5>
                            <p className="font-secondary text-xs text-[var(--color-text-muted)] leading-relaxed">
                                {["Jewellery For Women", "Rings for Women", "Earrings for Women", "Bangles for Women", "Necklaces for Women", "Bracelets for Women", "Pendants for Women"].map((term, i, arr) => (
                                    <span key={term}>
                                        <a href="#featured-collection-section" className="text-[var(--color-teal)] hover:underline active:opacity-85" onClick={() => { setActiveCategory("All"); setSearchQuery(term); }}>{term}</a>
                                        {i < arr.length - 1 && " | "}
                                    </span>
                                ))}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 border-t border-[var(--color-border-subtle)] pt-6 reveal-section">
                            <h5 className="font-secondary font-semibold text-xs tracking-wider text-[var(--color-teal)] uppercase">
                                Bridal & Occasion
                            </h5>
                            <p className="font-secondary text-xs text-[var(--color-text-muted)] leading-relaxed">
                                {["Bridal Jewellery", "Wedding Rings", "Engagement Rings", "Anniversary Gifts", "Festival Collection", "Gift Jewelry"].map((term, i, arr) => (
                                    <span key={term}>
                                        <a href="#featured-collection-section" className="text-[var(--color-teal)] hover:underline active:opacity-85" onClick={() => { setActiveCategory("All"); setSearchQuery(term); }}>{term}</a>
                                        {i < arr.length - 1 && " | "}
                                    </span>
                                ))}
                            </p>
                        </div>

                    </div>
                </section> */}

            </main >


            {/* Floating buttons */}
            <FloatingButtons />

            {/* Add to cart drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[var(--z-overlay)] cursor-pointer"
                        />

                        {/* Cart Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 220 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-white z-[var(--z-overlay)] flex flex-col border-l border-[var(--color-border-subtle)] shadow-xl"
                            id="shopping-cart-drawer"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-[var(--color-border-subtle)] flex justify-between items-center">
                                <div className="flex items-center gap-2.5">
                                    <ShoppingBag size={20} className="text-[var(--color-teal)]" />
                                    <span className="font-primary font-bold text-xl text-[var(--color-teal)]">My Atelier Bag</span>
                                    <span className="bg-[var(--color-cream-light)] text-[var(--color-teal)] text-xs font-mono font-bold px-2 py-0.5 rounded-sm">
                                        {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-[var(--color-teal)] hover:text-red-500 cursor-pointer p-1.5 transition-colors border-none bg-transparent"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Items Panel */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar flex flex-col gap-4">
                                {cart.length === 0 ? (
                                    <div className="my-auto flex flex-col items-center gap-4 text-center py-10">
                                        <BagIcon size={48} className="text-[var(--color-border)] stroke-[1.25px]" />
                                        <p className="font-primary italic text-lg text-[var(--color-teal)]">Your bag has yet to hold brilliance</p>
                                        <button
                                            onClick={() => {
                                                setIsCartOpen(false);
                                                const collectionsSec = document.getElementById("featured-collection-section");
                                                if (collectionsSec) collectionsSec.scrollIntoView({ behavior: "smooth" });
                                            }}
                                            className="bg-[var(--color-teal)] text-white hover:bg-[var(--color-cream)] hover:text-[var(--color-teal)] font-secondary text-[11px] font-bold tracking-widest uppercase py-3.5 px-8 rounded-sm cursor-pointer transition-colors border-none"
                                        >
                                            Browse Best Sellers
                                        </button>
                                    </div>
                                ) : (
                                    cart.map((item) => {
                                        const priceEst = getProductPrice(item.product);
                                        return (
                                            <div
                                                key={item.product.id}
                                                className="flex gap-4 border border-[var(--color-border-subtle)] p-4 rounded-lg bg-[var(--color-bg-secondary)] shadow-2xs relative group"
                                            >
                                                {/* Image aspect */}
                                                <div className="w-18 h-22 bg-zinc-200 rounded-sm overflow-hidden shrink-0">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover object-center"
                                                    />
                                                </div>

                                                {/* Title weights */}
                                                <div className="flex-1 flex flex-col justify-between py-0.5">
                                                    <div>
                                                        <h5 className="font-primary text-sm font-semibold text-[var(--color-teal)]">{item.product.name}</h5>
                                                        <span className="font-secondary text-[10px] text-[var(--color-text-muted)] block">
                                                            {item.product.karat} Gold · {item.product.category}
                                                        </span>
                                                    </div>

                                                    {/* Quantities switchers */}
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center gap-2 border border-[var(--color-border)] bg-white rounded-full p-1 scale-90 -ml-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, -1)}
                                                                className="w-5 h-5 rounded-full hover:bg-neutral-100 flex items-center justify-center cursor-pointer border-none bg-transparent"
                                                            >
                                                                <Minus size={10} />
                                                            </button>
                                                            <span className="font-mono text-xs font-bold text-[var(--color-teal)] px-1">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, 1)}
                                                                className="w-5 h-5 rounded-full hover:bg-neutral-100 flex items-center justify-center cursor-pointer border-none bg-transparent"
                                                            >
                                                                <Plus size={10} />
                                                            </button>
                                                        </div>

                                                        <div className="font-mono text-xs font-bold text-[var(--color-teal)]">
                                                            ₹{(priceEst * item.quantity).toLocaleString("en-IN")}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Delete Action button */}
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="absolute top-2 right-2 text-[var(--color-text-muted)] hover:text-red-500 transition-colors p-1 bg-transparent border-none cursor-pointer"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Totals checkout Summary Panel (Only if items exist) */}
                            {cart.length > 0 && (
                                <div className="p-6 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] flex flex-col gap-4">
                                    <div className="flex flex-col gap-2 font-secondary text-xs text-[var(--color-text-secondary)]">
                                        <div className="flex justify-between">
                                            <span className="text-[var(--color-text-muted)]">Atelier subtotal:</span>
                                            <span>₹{cartSubtotal.toLocaleString("en-IN")}</span>
                                        </div>
                                        {cartDiscount > 0 && (
                                            <div className="flex justify-between text-emerald-600 font-semibold">
                                                <span>VIP Campaign Discount (5% Off):</span>
                                                <span>- ₹{cartDiscount.toLocaleString("en-IN")}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-[var(--color-text-muted)]">Insured shipping:</span>
                                            <span className="text-emerald-600 font-semibold">FREE</span>
                                        </div>
                                        <div className="flex justify-between border-t border-[var(--color-border-subtle)] pt-3 font-primary text-base text-[var(--color-teal)] font-bold">
                                            <span>Grand Total:</span>
                                            <span className="font-mono">₹{cartTotalAmount.toLocaleString("en-IN")}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckoutProcess}
                                        className="w-full bg-[var(--color-teal)] hover:bg-[var(--color-cream)] text-white hover:text-[var(--color-teal)] font-secondary text-[11px] font-bold tracking-widest uppercase py-4 rounded-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 border-none"
                                    >
                                        Proceed To Atelier Checkout <ArrowRight size={14} />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Wishlist drawer */}
            <AnimatePresence>
                {isWishlistOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsWishlistOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[var(--z-overlay)] cursor-pointer"
                        />

                        {/* Wishlist Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 220 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-white z-[var(--z-overlay)] flex flex-col border-l border-[var(--color-border-subtle)] shadow-xl"
                            id="wishlist-drawer"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-[var(--color-border-subtle)] flex justify-between items-center">
                                <div className="flex items-center gap-2.5">
                                    <Heart size={20} className="text-red-500 fill-red-500" />
                                    <span className="font-primary font-bold text-xl text-[var(--color-teal)]">My Atelier Wishlist</span>
                                    <span className="bg-red-50 text-red-500 text-xs font-mono font-bold px-2 py-0.5 rounded-sm">
                                        {wishlist.length} item{wishlist.length !== 1 && 's'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsWishlistOpen(false)}
                                    className="text-[var(--color-teal)] hover:text-red-500 cursor-pointer p-1.5 transition-colors border-none bg-transparent"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Items Panel */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar flex flex-col gap-4">
                                {wishlist.length === 0 ? (
                                    <div className="my-auto flex flex-col items-center gap-4 text-center py-10">
                                        <Heart size={48} className="text-[var(--color-border)] stroke-[1.25px]" />
                                        <p className="font-primary italic text-lg text-[var(--color-teal)]">Your wishlist is currently tranquil</p>
                                        <button
                                            onClick={() => {
                                                setIsWishlistOpen(false);
                                                const collectionsSec = document.getElementById("featured-collection-section");
                                                if (collectionsSec) collectionsSec.scrollIntoView({ behavior: "smooth" });
                                            }}
                                            className="bg-[var(--color-teal)] text-white hover:bg-[var(--color-cream)] hover:text-[var(--color-teal)] font-secondary text-[11px] font-bold tracking-widest uppercase py-3.5 px-8 rounded-sm cursor-pointer transition-colors border-none"
                                        >
                                            Explore Jewels
                                        </button>
                                    </div>
                                ) : (
                                    wishlist.map((item) => {
                                        const priceEst = getProductPrice(item);
                                        return (
                                            <div
                                                key={item.id}
                                                className="flex gap-4 border border-[var(--color-border-subtle)] p-4 rounded-lg bg-[var(--color-bg-secondary)] shadow-2xs relative group"
                                            >
                                                {/* Image aspect */}
                                                <div className="w-18 h-22 bg-zinc-200 rounded-sm overflow-hidden shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover object-center"
                                                    />
                                                </div>

                                                {/* Title weights */}
                                                <div className="flex-1 flex flex-col justify-between py-0.5">
                                                    <div>
                                                        <h5 className="font-primary text-sm font-semibold text-[var(--color-teal)]">{item.name}</h5>
                                                        <span className="font-secondary text-[10px] text-[var(--color-text-muted)] block">
                                                            {item.karat} Gold · {item.category}
                                                        </span>
                                                        <div className="font-mono text-xs font-bold text-[var(--color-teal)] mt-1.5">
                                                            ₹{priceEst.toLocaleString("en-IN")}
                                                        </div>
                                                    </div>

                                                    {/* Actions button */}
                                                    <div className="flex gap-2 mt-2">
                                                        <button
                                                            onClick={() => {
                                                                addToCart(item);
                                                                toggleWishlist(item);
                                                            }}
                                                            className="text-[10px] uppercase tracking-wider font-semibold font-secondary bg-[var(--color-teal)] text-white hover:bg-[var(--color-cream)] hover:text-[var(--color-teal)] py-1.5 px-3 rounded-sm transition-colors border-none cursor-pointer flex-1 text-center"
                                                        >
                                                            Move To Bag
                                                        </button>
                                                        <button
                                                            onClick={() => toggleWishlist(item)}
                                                            className="text-[10px] uppercase tracking-wider font-semibold font-secondary border border-[var(--color-border)] text-red-500 hover:bg-red-50 py-1.5 px-3 rounded-sm transition-colors cursor-pointer bg-white"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* DYNAMIC PRIME LOOK INTERACTIVE DIALOG MODAL (JOCKEY-STYLE DETAILS POPUP) */}
            {/* <AnimatePresence>
                {isPrimeModalOpen && selectedHotspot && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsPrimeModalOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[var(--z-modal)] cursor-pointer"
                        />

                        <motion.div
                            initial={{ scale: 0.94, opacity: 0, x: "-50%", y: "-40%" }}
                            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                            exit={{ scale: 0.94, opacity: 0, x: "-50%", y: "-40%" }}
                            transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[var(--z-modal)] bg-white rounded-xl shadow-2xl p-6 md:p-8 w-[92%] max-w-[480px]"
                            id="prime-lookbook-modal"
                        >
                            <div className="flex justify-between items-center mb-6 border-b border-[var(--color-border-subtle)] pb-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={16} className="text-[var(--color-cream)]" />
                                    <span className="font-secondary font-semibold text-xs tracking-wider uppercase text-[var(--color-text-muted)]">
                                        Atelier Spotlight Look
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsPrimeModalOpen(false)}
                                    className="text-[var(--color-teal)] hover:text-red-500 cursor-pointer p-1 transition-colors border-none bg-transparent"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="flex gap-5">
                                <div className="w-24 h-30 bg-neutral-100 rounded-lg overflow-hidden shrink-0 border border-[var(--color-border-subtle)]">
                                    <img
                                        src={selectedHotspot.product.image}
                                        alt={selectedHotspot.product.name}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>

                                <div className="flex flex-col justify-between py-1">
                                    <div>
                                        <h4 className="font-primary text-xl font-bold text-[var(--color-teal)] leading-snug">
                                            {selectedHotspot.product.name}
                                        </h4>
                                        <span className="font-secondary text-[10px] md:text-xs text-[var(--color-text-muted)] block mt-1.5">
                                            {selectedHotspot.product.karat} Certified Purity
                                        </span>
                                        <p className="font-secondary text-[10px] text-[var(--color-text-muted)] leading-relaxed mt-2.5 max-w-[200px]">
                                            Handcrafted using certified gold conforming to global hallmark criteria
                                        </p>
                                    </div>

                                    <div className="mt-4 flex flex-col gap-1.5">
                                        <span className="font-mono text-base md:text-lg font-bold text-[var(--color-teal)] leading-none">
                                            ₹{getProductPrice(selectedHotspot.product).toLocaleString("en-IN")}
                                        </span>
                                        <span className="text-[9px] font-secondary text-[var(--color-text-muted)] italic">
                                            Making charges & tax levies aggregated
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={() => {
                                        const fullProduct = FEATURED_PRODUCTS.find((p) => p.id === selectedHotspot.product.id) || {
                                            id: selectedHotspot.product.id,
                                            name: selectedHotspot.product.name,
                                            category: "Rings",
                                            karat: selectedHotspot.product.karat,
                                            image: selectedHotspot.product.image,
                                            tags: ["NEW"]
                                        };
                                        addToCart(fullProduct);
                                        setIsPrimeModalOpen(false);
                                    }}
                                    className="flex-1 bg-[var(--color-teal)] hover:bg-[var(--color-cream)] text-white hover:text-[var(--color-teal)] font-secondary text-xs uppercase tracking-widest font-bold py-3.5 px-4 rounded-sm transition-all cursor-pointer shadow-sm border-none flex items-center justify-center gap-2"
                                >
                                    <BagIcon size={14} /> Add To Bag
                                </button>
                                <button
                                    onClick={() => {
                                        const fullProduct = FEATURED_PRODUCTS.find((p) => p.id === selectedHotspot.product.id) || {
                                            id: selectedHotspot.product.id,
                                            name: selectedHotspot.product.name,
                                            category: "Rings",
                                            karat: selectedHotspot.product.karat,
                                            image: selectedHotspot.product.image,
                                            tags: ["NEW"]
                                        };
                                        toggleWishlist(fullProduct);
                                        setIsPrimeModalOpen(false);
                                    }}
                                    className="px-4 border border-[var(--color-border)] hover:bg-neutral-50 rounded-sm transition-all cursor-pointer bg-white"
                                    aria-label="Wishlist"
                                >
                                    <Heart
                                        size={16}
                                        className={isProductInWishlist(selectedHotspot.product.id) ? "fill-red-500 text-red-500" : "text-[var(--color-teal)]"}
                                    />
                                </button>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence> */}

            {/* DYNAMIC CHECKOUT SUCCESS POPUP MODAL */}
            <AnimatePresence>
                {showCheckoutSuccess && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-[var(--z-modal)]"
                        />

                        {/* Success Box Body */}
                        <motion.div
                            initial={{ scale: 0.94, opacity: 0, x: "-50%", y: "-40%" }}
                            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                            exit={{ scale: 0.94, opacity: 0, x: "-50%", y: "-40%" }}
                            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[var(--z-modal)] bg-white rounded-xl shadow-2xl p-8 max-w-[420px] w-[90%] text-center flex flex-col items-center gap-4"
                            id="checkout-success-popup"
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2">
                                <CheckCircle2 size={36} className="stroke-[1.5px]" />
                            </div>

                            <h4 className="font-primary text-2xl font-bold text-[var(--color-teal)] leading-none">
                                Atelier Acquired
                            </h4>

                            <p className="font-secondary text-xs text-[var(--color-text-muted)] leading-relaxed max-w-[280px]">
                                Your jewelry reservation has been filed with TBA — The Brilliance Atelier. Our certified secure gateway has generated order receipt {`#TBA-${Math.floor(Math.random() * 900000 + 100000)}`}.
                            </p>

                            <div className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-4 rounded-lg my-2 text-left font-secondary text-xs text-[var(--color-text-secondary)] flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-text-muted)]">Reservation status:</span>
                                    <span className="font-bold text-emerald-600">INSURED PENDING</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-text-muted)]">Atelier address:</span>
                                    <span>Surat main depository</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-text-muted)]">Client dispatch:</span>
                                    <span>5-7 business days</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setCart([]);
                                    setShowCheckoutSuccess(false);
                                }}
                                className="w-full bg-[var(--color-teal)] hover:bg-[var(--color-cream)] text-white hover:text-[var(--color-teal)] font-secondary text-xs uppercase tracking-widest font-bold py-3.5 rounded-sm transition-colors border-none cursor-pointer mt-4"
                            >
                                Conclude Transaction
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isAuthOpen && (
                    <AuthModal
                        isOpen={isAuthOpen}
                        onClose={() => setIsAuthOpen(false)}
                    />
                )}
            </AnimatePresence>

        </div >
    );
}
