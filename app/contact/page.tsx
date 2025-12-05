"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  FileText,
  ArrowRight,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";

// --- Components ---

const MagneticText = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
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

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative inline-block p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
    >
      {children}
    </motion.a>
  );
};

const ContactCard = ({
  title,
  description,
  icon: Icon,
  buttonText,
  href,
  delay,
}: {
  title: string;
  description: string;
  icon: any;
  buttonText: string;
  href: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative w-full md:w-[400px] h-[300px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
    >
      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-serif text-white mb-2">{title}</h3>
        <p className="text-neutral-400 font-sans leading-relaxed">
          {description}
        </p>
      </div>

      <div className="relative z-10">
        <Link
          href={href}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-white group-hover:gap-4 transition-all duration-300"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden selection:bg-white/20">
      {/* Background Grain/Fog */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            transform: "scale(1.5)",
          }}
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 tracking-tight">
            START THE CONVERSATION
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl font-sans max-w-xl mx-auto">
            Choose how you want to collaborate.
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24 w-full max-w-4xl">
          <ContactCard
            title="The Strategy Session"
            description="Book a 15-min discovery call to discuss your vision and see if we're a good fit."
            icon={Calendar}
            buttonText="Book Now"
            href="https://calendly.com/your-link" // Placeholder
            delay={0.2}
          />
          <ContactCard
            title="The Project Brief"
            description="Already have a spec? Fill out the brief form to get a detailed proposal."
            icon={FileText}
            buttonText="Fill Form"
            href="https://docs.google.com/forms/u/0/" // Placeholder
            delay={0.4}
          />
        </div>

        {/* Footer/Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <a
            href="mailto:hello@himanchal.dev"
            className="text-white font-mono text-lg hover:text-neutral-300 transition-colors"
          >
            hello@himanchal.dev
          </a>

          <div className="flex items-center gap-8">
            <MagneticText href="https://linkedin.com">
              <Linkedin className="w-5 h-5" />
            </MagneticText>
            <MagneticText href="https://twitter.com">
              <Twitter className="w-5 h-5" />
            </MagneticText>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
