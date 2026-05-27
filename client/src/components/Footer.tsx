import { motion } from "motion/react";
import { SOCIAL_LINKS } from "../constants/assets";
import { Phone, Mail, MapPin, Instagram, MessageCircle, Heart, Shield, Award } from "lucide-react";
import logo from "../assets/logo/logo2.png";

export default function Footer({ onCategoryChange }: { onCategoryChange: (category: string) => void }) {
  const handleExploreClick = (category: string) => {
    onCategoryChange(category);
    const mainSection = document.getElementById("featured-collection-section");
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[var(--color-teal-dark)] text-white pt-4">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-4 lg-pb-2">

        {/* COLUMN 1: BRAND PLATFORM */}
        <div className="flex flex-col gap-5 pb-4">
          <div className="flex items-center gap-2 select-none">
            <a href="/" className="flex items-center select-none shrink-0" aria-label="Home">
              <img
                src={logo}
                alt="TBA"
                className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto object-contain"
              />
            </a>
          </div>

          <p className="font-primary italic text-[var(--color-cream)] text-lg leading-snug">
            Where Every Piece Tells a Story
          </p>

          <p className="font-secondary  text-xs leading-relaxed max-w-[280px]">
            Exquisite handcrafted jewelry marrying rich Indian heritage with modern design aesthetics. Curated for the sophisticated connoisseur.
          </p>

          {/* Social icons row */}
          <div className="flex gap-4 mt-2">
            <motion.a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all"
              style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}
              aria-label="Instagram Profile"
              id="footer-insta-social-btn"
            >
              <Instagram size={18} />
            </motion.a>
            <motion.a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all bg-[#25D366]"
              aria-label="WhatsApp Hotline"
              id="footer-wa-social-btn"
            >
              <MessageCircle size={18} />
            </motion.a>
          </div>
        </div>

        {/* COLUMN 2: EXPLORE SECTIONS */}
        <div className="flex flex-col gap-4">
          <h4 className="font-secondary text-xs uppercase tracking-[0.3em] font-bold mb-2 !text-[var(--color-cream)]">Explore</h4>
          <ul className="flex flex-col gap-3 font-secondary text-xs ">
            <li>
              <button onClick={() => handleExploreClick("All")} className="hover:text-[var(--color-cream)] bg-transparent border-none text-left cursor-pointer p-0 hover:pl-1 transition-all duration-300">
                All Collections
              </button>
            </li>
            <li>
              <button onClick={() => handleExploreClick("Rings")} className="hover:text-[var(--color-cream)] bg-transparent border-none text-left cursor-pointer p-0 hover:pl-1 transition-all duration-300">
                Gold & Diamond Rings
              </button>
            </li>
            <li>
              <button onClick={() => handleExploreClick("Necklaces")} className="hover:text-[var(--color-cream)] bg-transparent border-none text-left cursor-pointer p-0 hover:pl-1 transition-all duration-300">
                Designer Necklaces
              </button>
            </li>
            <li>
              <button onClick={() => handleExploreClick("Earrings")} className="hover:text-[var(--color-cream)] bg-transparent border-none text-left cursor-pointer p-0 hover:pl-1 transition-all duration-300">
                Statement Earrings
              </button>
            </li>
            <li>
              <button onClick={() => handleExploreClick("Bracelets")} className="hover:text-[var(--color-cream)] bg-transparent border-none text-left cursor-pointer p-0 hover:pl-1 transition-all duration-300">
                Luxury Bracelets
              </button>
            </li>
          </ul>
        </div>

        {/* COLUMN 3: POLICIES */}
        {/* <div className="flex flex-col gap-4">
          <h4 className="font-secondary text-xs uppercase tracking-[0.3em] !text-[var(--color-cream)] font-bold mb-2">Policies</h4>
          <ul className="flex flex-col gap-3 font-secondary text-xs ">
            <li><a href="#" className="hover:text-[var(--color-cream)] hover:pl-1 transition-all duration-300 block">BIS Hallmarking Certificate</a></li>
            <li><a href="#" className="hover:text-[var(--color-cream)] hover:pl-1 transition-all duration-300 block">Lifetime Exchange & Buyback</a></li>
            <li><a href="#" className="hover:text-[var(--color-cream)] hover:pl-1 transition-all duration-300 block">Insured Free Shipping Policy</a></li>
            <li><a href="#" className="hover:text-[var(--color-cream)] hover:pl-1 transition-all duration-300 block">15-Day Easy Refund & Returns</a></li>
            <li><a href="#" className="hover:text-[var(--color-cream)] hover:pl-1 transition-all duration-300 block">Terms & Conditions</a></li>
          </ul>
        </div> */}

        {/* COLUMN 4: DIRECT CONNECT */}
        <div className="flex flex-col gap-4">
          <h4 className="font-secondary text-xs uppercase tracking-[0.3em] !text-[var(--color-cream)] font-bold mb-2">Get In Touch</h4>
          <ul className="flex flex-col gap-4 font-secondary text-xs ">
            <li className="flex gap-3 items-start">
              <Phone size={14} className="text-[var(--color-cream)] shrink-0 mt-0.5" />
              <a href="tel:+919999999999" className="hover:text-[var(--color-cream)] transition-colors">+91 99999 99999</a>
            </li>
            <li className="flex gap-3 items-start">
              <Mail size={14} className="text-[var(--color-cream)] shrink-0 mt-0.5" />
              <a href="mailto: customercare.tba@gmail.com" className="hover:text-[var(--color-cream)] transition-colors">customercare.tba@gmail.com</a>
            </li>
            <li className="flex gap-3 items-start">
              <MapPin size={14} className="text-[var(--color-cream)] shrink-0 mt-0.5" />
              <span>Surat, Gujarat, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT ROW */}
      <div className="border-t border-white/10 w-full">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-secondary text-white/40 tracking-wider">
          <span>© 2026 TBA - The Brilliance Atelier. All rights reserved.</span>
          <span className="flex items-center gap-1">Crafted with <Heart size={10} className="text-red-500 fill-red-500" /> in India</span>
        </div>
      </div>
    </footer>
  );
}
