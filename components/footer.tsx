"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/data";
import { Twitter, Linkedin, Github } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { PulseBeams } from "@/components/ui/pulse-beams";

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const beams = [
    {
      // Path tuned to wrap around the button (approx 190x60)
      // Center: 150, 75.
      // Width: 240. Height: 80.
      // Left: 30, Right: 270. Top: 35, Bottom: 115. Radius: 40.
      path: "M 70 35 L 230 35 A 40 40 0 0 1 230 115 L 70 115 A 40 40 0 0 1 70 35 Z",
    },
  ];

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative"
    >
      <motion.div
        animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <PulseBeams
          beams={beams}
          width={300}
          height={150}
          baseColor="rgba(0,0,0,0.05)"
          accentColor="#8b5cf6" // Purple
          duration={2}
        >
          <div className="bg-black text-white rounded-full px-10 py-4 font-bold text-lg uppercase tracking-wider relative z-20 cursor-pointer whitespace-nowrap">
            {children}
          </div>
        </PulseBeams>
      </motion.div>
    </div>
  );
};

export function Footer() {
  const { navLinks } = siteData.navbar;
  const { socialLinks } = siteData.footer;

  return (
    <footer className="w-full min-h-screen bg-[#Ececec] text-black relative flex flex-col justify-between pt-24 pb-12 px-8 overflow-hidden">
      <BackgroundBeams />
      {/* Navigation & Content Layer */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-20">
        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 md:gap-2 mb-12 md:mb-0">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-xl md:text-2xl font-bold font-sans hover:underline decoration-2 underline-offset-4 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Magnetic CTA Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block">
          <MagneticButton>{siteData.footer.buttonText}</MagneticButton>
        </div>
        {/* Mobile CTA Button */}
        <div className="md:hidden mb-12">
          <MagneticButton>{siteData.footer.buttonText}</MagneticButton>
        </div>
      </div>

      {/* Hero Element: Massive Stroke Text */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <h1
          className="font-serif text-[15vw] leading-none tracking-tighter text-transparent transition-colors duration-500 hover:text-black cursor-default select-none break-all md:break-normal text-center"
          style={{ WebkitTextStroke: "1px #000" }}
        >
          {siteData.footer.bigText}
        </h1>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-end border-t border-black/10 pt-8 gap-4">
        {/* Logo */}
        <div className="font-bold text-xl tracking-tighter">
          {siteData.navbar.logoText}
        </div>

        {/* Center Text */}
        <div className="text-sm font-mono text-gray-500 uppercase tracking-widest text-center md:text-left">
          {siteData.footer.copyright}
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">
          {socialLinks.map((link, index) => {
            // Mapping simple string names to icons for demo purposes
            // In a real scenario, you might want a map or object in data.ts
            let Icon = Github;
            if (link.name.toLowerCase().includes("twitter")) Icon = Twitter;
            if (link.name.toLowerCase().includes("linkedin")) Icon = Linkedin;

            return (
              <a
                key={index}
                href={link.url}
                className="text-black hover:text-gray-600 transition-colors"
                aria-label={link.name}
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
