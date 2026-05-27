import { motion } from "motion/react";
import { SOCIAL_LINKS } from "../constants/assets";
import { Instagram, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[var(--z-float)] flex flex-col gap-3">
      {/* INSTAGRAM PORT */}
      <motion.a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.12 }}
        className="group relative w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center shadow-lg hover:shadow-[var(--shadow-cream)] transition-all cursor-pointer"
        style={{
          background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
        }}
        id="floating-insta-btn"
      >
        <Instagram className="w-5 h-5 md:w-5.5 md:h-5.5 text-white" />
        
        {/* Tooltip */}
        <span className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-[var(--color-teal)] text-white text-[10px] md:text-xs font-secondary tracking-wider py-1 px-3 rounded-sm opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 pointer-events-none transition-all duration-300 shadow-md">
          Follow on Instagram
        </span>
      </motion.a>

      {/* WHATSAPP CONSULTANCY PORT */}
      <motion.a
        href={SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.12 }}
        className="group relative w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center shadow-lg hover:shadow-[var(--shadow-cream)] transition-all cursor-pointer bg-[#25D366]"
        id="floating-wa-btn"
      >
        <MessageCircle className="w-5 h-5 md:w-5.5 md:h-5.5 text-white" />
        
        {/* Tooltip */}
        <span className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-[var(--color-teal)] text-white text-[10px] md:text-xs font-secondary tracking-wider py-1 px-3 rounded-sm opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 pointer-events-none transition-all duration-300 shadow-md">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
