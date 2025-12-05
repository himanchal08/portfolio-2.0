"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteData } from "@/lib/data";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { useIsMobile } from "@/hooks/use-mobile";

// --- Card Sub-Component ---
const Card = ({
  i,
  text,
  author,
  role,
  progress,
  range,
  color,
  total,
}: any) => {
  // Each card's animation is now tied to its specific segment of the scroll
  const y = useTransform(progress, range, [0, -300]);
  const rotate = useTransform(progress, range, [0, -15]);
  const scale = useTransform(progress, range, [1, 0.9]);
  const opacity = useTransform(
    progress,
    [range[0], (range[0] + range[1]) / 2, range[1]],
    [1, 1, 0]
  );

  return (
    <motion.div
      style={{
        y,
        rotate,
        scale,
        opacity,
        zIndex: total - i, // Ensure cards stack correctly
        backgroundColor: color, // Apply the unique color here
      }}
      className="absolute w-[80vw] h-[40vh] md:w-[400px] md:h-[400px] p-8 rounded-2xl shadow-2xl flex flex-col justify-center items-center text-center text-black"
    >
      <p className="text-xl md:text-2xl font-normal text-gray-700 italic mb-6">
        "{text}"
      </p>
      <div className="mt-auto">
        <h3 className="text-xl font-bold text-gray-800">{author}</h3>
        <p className="text-md text-gray-600">{role}</p>
      </div>
    </motion.div>
  );
};

export function Testimonials() {
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef(null);
  const { sectionTitle, titlePart1, titlePart2, items } = siteData.testimonials;

  // Add colors to items since they aren't in the data file yet
  const colors = ["#fff0f0", "#f0f2ff", "#f0fff2", "#fffdef"];
  const itemsWithColors = items.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
  }));

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    // The animation now starts when the top of the container reaches the center of the screen
    offset: ["start center", "end end"],
  });

  return (
    <section className="w-full pb-12 xl:pb-24 bg-background text-white relative">
      {/* Background - Sticky to stay in view */}
      <div className="absolute inset-0 z-0 pointer-events-none h-full">
        <div className="sticky top-0 h-screen w-full opacity-40">
          {!isMobile && <GLSLHills />}
          {isMobile && (
            <div className="w-full h-full bg-gradient-to-b from-background to-purple-900/20" />
          )}
        </div>
      </div>

      {/* Added relative and z-10 to ensure the header stays above the sticky cards */}
      <div className="relative z-10 w-full px-4 md:px-12 pt-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">
            {sectionTitle}
          </h2>
          <motion.h2
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-wrap items-center gap-4 text-4xl md:text-6xl font-light leading-tight cursor-default"
          >
            {titlePart1}
            <span className="inline-block rounded-[20%] overflow-hidden w-12 h-12 md:w-20 md:h-20 align-middle bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <span className="text-2xl md:text-4xl">💬</span>
            </span>
            {titlePart2}
          </motion.h2>
        </motion.div>
      </div>

      {/* Increased height for a longer scroll animation duration */}
      <div ref={scrollContainerRef} className="relative h-[300vh] z-10">
        {/* The sticky container is now positioned lower and aligns cards to the top */}
        <div className="sticky top-[20vh] left-0 right-0 flex justify-center items-start">
          {itemsWithColors.map((testimonial, i) => {
            // Define the start and end points for this card's main animation
            const animationStart = i / itemsWithColors.length;
            const animationEnd = (i + 1) / itemsWithColors.length;

            return (
              <Card
                key={i}
                i={i}
                total={itemsWithColors.length}
                {...testimonial}
                progress={scrollYProgress}
                range={[animationStart, animationEnd]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
