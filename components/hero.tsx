"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import * as THREE from "three/webgpu";
import { Blob, PostProcessing } from "./sentient-sphere";
import { siteData } from "@/lib/data";
import Link from "next/link";

import { useIsMobile } from "@/hooks/use-mobile";

// Ensure THREE is extended for R3F
extend(THREE as any);

// --- Magnetic CTA Component ---
function MagneticCapsule() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    if (isMobile) return; // Disable magnetic effect on mobile

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const dist = Math.sqrt(
        Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2)
      );

      if (dist < 200) {
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
  }, [x, y, isMobile]);

  return (
    <motion.button
      ref={ref}
      style={{ x: isMobile ? 0 : xSpring, y: isMobile ? 0 : ySpring }}
      className="group relative flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3 backdrop-blur-md transition-colors hover:bg-white/10"
    >
      <span className="text-sm font-medium uppercase tracking-widest text-white">
        {siteData.hero.buttonText}
      </span>
    </motion.button>
  );
}

// --- R3F Scene Wrapper for Scroll Scaling ---
function SceneContent({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const progress = scrollYProgress.get();
      // Scale down from 1 to 0.5 based on scroll
      const scale = 1 - progress * 0.5;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      <Blob />
    </group>
  );
}

function RainingLines() {
  const [lines, setLines] = useState<
    { left: string; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const newLines = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      // Duration controls speed: Lower numbers = faster, Higher numbers = slower
      // Increased duration for slower animation (10s to 20s)
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setLines(newLines);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute -top-[150px] w-[1px] h-[150px] bg-gradient-to-b from-transparent via-white/30 to-transparent"
          animate={{ y: "120vh" }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            delay: line.delay,
            ease: "linear",
          }}
          style={{
            left: line.left,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const topLeftX = useTransform(scrollYProgress, [0, 0.8], ["0%", "30vw"]);
  const topLeftY = useTransform(scrollYProgress, [0, 0.8], ["0%", "82vh"]);

  const lowerRightX = useTransform(scrollYProgress, [0, 0.8], ["0%", "-30vw"]);
  const lowerRightY = useTransform(scrollYProgress, [0, 0.8], ["0%", "0vh"]);

  const centerY = useTransform(scrollYProgress, [0, 0.8], ["0%", "48vh"]);
  const centerScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Layer 0: Background & Blob (Z-0) */}
      <div className="absolute inset-0 z-0">
        {!isMobile && (
          <Canvas
            dpr={[1, 2]} // Optimize for high DPI screens
            flat
            gl={
              (async (props: any) => {
                const renderer = new THREE.WebGPURenderer(props as any);
                await renderer.init();
                return renderer;
              }) as any
            }
          >
            <PostProcessing fullScreenEffect={true} />
            <SceneContent scrollYProgress={scrollYProgress} />
          </Canvas>
        )}
        {isMobile && (
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
        )}
      </div>

      {/* Layer 1: Background Accents (Z-10) */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <RainingLines />
      </div>

      {/* Layer 2: Foreground UI & Text (Z-20) */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {/* Top Left Element - "Build" */}
        <motion.div
          style={{ x: topLeftX, y: topLeftY }}
          className="absolute left-8 top-8"
        >
          <span className="text-4xl font-bold tracking-tighter text-white md:text-6xl lg:text-7xl">
            {siteData.hero.titleWords[0]}
          </span>
        </motion.div>

        {/* Lower Right Element - "Scale" */}
        <motion.div
          style={{ x: lowerRightX, y: lowerRightY }}
          className="absolute bottom-8 right-8"
        >
          <span className="text-4xl font-bold tracking-tighter text-white md:text-6xl lg:text-7xl">
            {siteData.hero.titleWords[2]}
          </span>
        </motion.div>

        {/* Lower Left Element (Static/Subtle) */}
        <div className="absolute bottom-8 left-8 max-w-xs">
          <p className="text-xs text-white/60">{siteData.hero.subtitle}</p>
        </div>

        {/* Center Headline & CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
          {/* Headline with Filter - "Ship" */}
          <motion.div
            style={{ scale: centerScale, y: centerY }}
            className="relative rounded-xl bg-black/10 p-6 "
          >
            <h1 className="text-center text-4xl font-bold tracking-tighter text-white md:text-6xl lg:text-7xl">
              {siteData.hero.titleWords[1]}
            </h1>
          </motion.div>

          {/* Magnetic CTA */}
          <Link href="/contact">
            <motion.div className="pointer-events-auto  mt-8">
              <MagneticCapsule />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
