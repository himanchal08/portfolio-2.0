"use client";

import { useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function MagneticCTA({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  // Motion values for the button position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics
  const springConfig = {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const dist = Math.sqrt(
        Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2)
      );

      if (dist < 150) {
        const targetX = (clientX - centerX) * 0.3;
        const targetY = (clientY - centerY) * 0.3;
        x.set(targetX);
        y.set(targetY);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.8,
      }}
      className={`z-20 flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:bg-white/10 group cursor-pointer ${className}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-white group-hover:scale-110 transition-transform">
        Start Project
      </span>
    </motion.button>
  );
}
