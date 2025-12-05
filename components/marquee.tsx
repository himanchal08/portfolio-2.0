"use client";

import { motion } from "framer-motion";
import { siteData } from "@/lib/data";

function MarqueeRow({
  items,
  direction = "left",
  speed = 30,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="relative flex overflow-hidden py-4">
      <MarqueeContent items={items} direction={direction} speed={speed} />
      <MarqueeContent items={items} direction={direction} speed={speed} />
    </div>
  );
}

function MarqueeContent({
  items,
  direction,
  speed,
}: {
  items: string[];
  direction: "left" | "right";
  speed: number;
}) {
  return (
    <motion.div
      initial={{ x: direction === "left" ? 0 : "-100%" }}
      animate={{ x: direction === "left" ? "-100%" : 0 }}
      transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      className="flex flex-shrink-0 gap-8 pr-8"
    >
      {items.map((item, index) => (
        <span
          key={index}
          className="group font-sans text-5xl md:text-7xl lg:text-8xl font-light tracking-tight whitespace-nowrap cursor-default"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.3)",
            color: "transparent",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "white";
            e.currentTarget.style.webkitTextStroke = "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "transparent";
            e.currentTarget.style.webkitTextStroke =
              "1px rgba(255,255,255,0.3)";
          }}
        >
          {item}
          <span className="mx-8 text-muted-foreground/20">&bull;</span>
        </span>
      ))}
    </motion.div>
  );
}

export function TechMarquee() {
  const { techItems } = siteData.techMarquee;

  return (
    <section className="relative py-24 overflow-hidden md:py-10 border-y border-border bg-background">
      {/* Marquee Rows */}
      <div className="space-y-4">
        <MarqueeRow items={techItems} direction="left" speed={40} />
      </div>
    </section>
  );
}
