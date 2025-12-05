"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const words = ["INITIALIZING", "BREAKING GRID", "RENDERING", "READY"];

export function Preloader() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState(words[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Lock body scroll manually if useLockBodyScroll is not available or just to be safe
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsMounted(false);
      },
    });

    // Counter Animation
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.floor(counterObj.value));
      },
    });

    // Text Scramble Logic
    let wordIndex = 0;
    const interval = setInterval(() => {
      wordIndex++;
      if (wordIndex < words.length) {
        setText(words[wordIndex]);
      }
    }, 3000 / words.length);

    // Exit Animation
    // Hide text elements
    tl.to(
      ".preloader-text",
      {
        opacity: 0,
        duration: 0.2,
      },
      "-=0.5"
    );

    // Liquid Pull Animation
    // We animate the container up, and the SVG path to create the curve
    const curve = "M0,0 L100,0 L100,100 Q50,0 0,100 Z"; // Arch shape
    const flat = "M0,0 L100,0 L100,100 L0,100 Z"; // Flat rectangle

    tl.to(
      containerRef.current,
      {
        y: "-100%",
        duration: 1.5,
        ease: "power4.inOut",
      },
      "exit"
    );

    tl.to(
      pathRef.current,
      {
        attr: { d: curve },
        duration: 1.5,
        ease: "power4.inOut",
      },
      "exit"
    );

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col bg-transparent text-foreground"
    >
      {/* Main Black Background Area */}
      <div className="relative flex-1 w-full bg-[#0f0f0f] flex items-center justify-center">
        {/* Center Status Text */}
        <div className="preloader-text font-mono text-sm md:text-base tracking-widest uppercase animate-pulse">
          [{text}]
        </div>

        {/* Bottom Right Counter */}
        <div className="preloader-text absolute bottom-8 right-8 md:bottom-12 md:right-12 font-serif text-[15vw] md:text-[10rem] leading-none opacity-90">
          {count}%
        </div>
      </div>

      {/* SVG Curve Area */}
      <div className="relative w-full h-[20vh] -mt-[1px]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full fill-[#0f0f0f]"
        >
          <path ref={pathRef} d="M0,0 L100,0 L100,100 L0,100 Z" />
        </svg>
      </div>
    </div>
  );
}
