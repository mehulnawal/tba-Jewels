import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const [show, setShow] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show only once per browser session
    const seen = sessionStorage.getItem("tba_loaded");
    if (seen) {
      document.documentElement.setAttribute("data-loaded", "true");
      setShow(false);
      return;
    }

    // Capture each vector path of the letters T, B, A
    const paths = document.querySelectorAll<SVGPathElement>(".loader-letter");
    paths.forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("tba_loaded", "true");
        document.documentElement.setAttribute("data-loaded", "true");
        setShow(false);
      }
    });

    // Phase 1: SVG contours draw themselves elegantly
    tl.to(".loader-letter", {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.inOut",
      stagger: 0.3,
    })
    // Phase 2: Fade fill color to warm luxury cream, then clear stroke border
    .to(".loader-letter", {
      fill: "var(--color-cream)",
      stroke: "transparent",
      duration: 0.5,
      ease: "power1.inOut",
    })
    // Phase 3: Pause for visual impact
    .to({}, { duration: 0.5 })
    // Phase 4: Curtain Split revealing the home page
    .to(topRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "power3.inOut"
    }, "split")
    .to(bottomRef.current, {
      y: "100%",
      duration: 0.8,
      ease: "power3.inOut"
    }, "split");

    return () => {
      tl.kill();
    };
  }, []);

  if (!show) return null;

  return (
    <div 
      ref={loaderRef} 
      style={{ 
        position: "fixed", 
        inset: 0, 
        zIndex: "var(--z-loader)",
        display: "flex",
        flexDirection: "column",
        pointerEvents: "all"
      }}
    >
      {/* Top half Curtain */}
      <div 
        ref={topRef} 
        style={{
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          height: "50%",
          backgroundColor: "var(--color-teal)",
          display: "flex", 
          alignItems: "flex-end", 
          justifyContent: "center",
          overflow: "hidden", 
          paddingBottom: "2px",
          borderBottom: "1px solid rgba(228, 213, 195, 0.15)"
        }}
      >
        <svg 
          viewBox="0 0 300 80" 
          width="200" 
          height="53"
          style={{ overflow: "visible", marginBottom: "-26px" }}
        >
          {/* T Letter path */}
          <path 
            className="loader-letter"
            d="M 10,10 H 90 M 50,10 V 70"
            fill="none" 
            stroke="var(--color-cream)"
            strokeWidth="3.5" 
            strokeLinecap="round"
          />
          {/* B Letter path */}
          <path 
            className="loader-letter"
            d="M 110,10 V 70 M 110,10 Q 155,10 155,28 Q 155,40 110,40 Q 155,40 155,55 Q 155,70 110,70"
            fill="none" 
            stroke="var(--color-cream)"
            strokeWidth="3.5" 
            strokeLinecap="round"
          />
          {/* A Letter path */}
          <path 
            className="loader-letter"
            d="M 200,70 L 240,10 L 280,70 M 215,48 H 265"
            fill="none" 
            stroke="var(--color-cream)"
            strokeWidth="3.5" 
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Bottom half Curtain */}
      <div 
        ref={bottomRef} 
        style={{
          position: "absolute", 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: "50%",
          backgroundColor: "var(--color-teal)",
          display: "flex", 
          alignItems: "flex-start", 
          justifyContent: "center",
          overflow: "hidden", 
          paddingTop: "2px",
          borderTop: "1px solid rgba(228, 213, 195, 0.15)"
        }}
      >
        <svg 
          viewBox="0 0 300 80" 
          width="200" 
          height="53"
          style={{ overflow: "visible", marginTop: "-26px" }}
        >
          {/* Mirror of SVG vector letters */}
          <path 
            className="loader-letter"
            d="M 10,10 H 90 M 50,10 V 70" 
            fill="none"
            stroke="var(--color-cream)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          />
          <path 
            className="loader-letter"
            d="M 110,10 V 70 M 110,10 Q 155,10 155,28 Q 155,40 110,40 Q 155,40 155,55 Q 155,70 110,70"
            fill="none" 
            stroke="var(--color-cream)"
            strokeWidth="3.5" 
            strokeLinecap="round"
          />
          <path 
            className="loader-letter"
            d="M 200,70 L 240,10 L 280,70 M 215,48 H 265"
            fill="none" 
            stroke="var(--color-cream)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
