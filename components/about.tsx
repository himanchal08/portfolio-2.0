"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { siteData } from "@/lib/data";

import Image from "next/image";

export function About() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the cursor follower
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full bg-background pt-20 text-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="mb-8 font-mono text-sm text-muted-foreground">
            {siteData.about.sectionTitle}
          </h2>
          <motion.p
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="max-w-full text-3xl font-light leading-tight md:text-5xl cursor-default"
          >
            {siteData.about.title}
          </motion.p>
        </motion.div>

        {/* The List */}
        <div className="flex flex-col">
          {siteData.services.map((service, index) => (
            <ListItem
              key={index}
              index={index}
              title={service.title}
              description={service.description}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
          {/* Bottom border for the last item */}
          <div className="h-[1px] w-full bg-white/20" />
        </div>
      </div>

      {/* Floating Cursor Image */}
      <FloatingImage
        x={cursorX}
        y={cursorY}
        hoveredIndex={hoveredIndex}
        services={siteData.services}
      />
    </section>
  );
}

function ListItem({
  index,
  title,
  description,
  hoveredIndex,
  setHoveredIndex,
}: {
  index: number;
  title: string;
  description: string;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) {
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`group relative flex w-full cursor-pointer items-center justify-between border-t border-white/20 py-8 transition-all duration-500 ${
        !isEven ? "md:flex-row-reverse" : ""
      }`}
      initial={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      animate={{
        paddingTop: isHovered ? "4rem" : "2rem",
        paddingBottom: isHovered ? "4rem" : "2rem",
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{
        opacity: isDimmed ? 0.3 : 1,
      }}
    >
      <div className="flex items-center gap-4 md:gap-16">
        <span className="font-mono text-xl text-muted-foreground shrink-0">
          {`0${index + 1}`}
        </span>
        <h3 className="text-2xl font-bold uppercase tracking-tighter md:text-6xl">
          {title}
        </h3>
      </div>

      <div className="flex items-center gap-8">
        <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
          {description}
        </p>
        <motion.div
          animate={{ rotate: isHovered ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
    </motion.div>
  );
}

function FloatingImage({
  x,
  y,
  hoveredIndex,
  services,
}: {
  x: any;
  y: any;
  hoveredIndex: number | null;
  services: typeof siteData.services;
}) {
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[200px] w-[300px] overflow-hidden rounded-xl md:block"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{
        scale: hoveredIndex !== null ? 1 : 0,
        opacity: hoveredIndex !== null ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <AnimatePresence mode="wait">
        {hoveredIndex !== null && (
          <motion.div
            key={hoveredIndex}
            className="absolute inset-0 h-full w-full bg-zinc-800"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={services[hoveredIndex].image}
              alt={services[hoveredIndex].title}
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
