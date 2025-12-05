"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { siteData } from "@/lib/data";

export function Works() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { projects } = siteData.works;

  return (
    <section
      ref={containerRef}
      className="w-full bg-background text-white pt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 md:px-12 mb-2"
      >
        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">
          {siteData.works.sectionTitle}
        </h2>
        <motion.p
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-4xl md:text-5xl font-light max-w-2xl leading-tight cursor-default"
        >
          {siteData.works.title}
        </motion.p>
      </motion.div>

      <div className="flex flex-col items-center w-full">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={i}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

function Card({
  i,
  title,
  description,
  tags,
  image,
  progress,
  range,
  targetScale,
}: any) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-screen flex items-start justify-center sticky top-0 w-full pt-24 md:pt-32"
      style={{ top: `calc(0px + ${i * 25}px)` }}
    >
      <motion.div
        style={{ scale }}
        className="relative flex flex-col md:flex-row gap-8 bg-background/20 backdrop-blur-lg border border-white/50 rounded-3xl p-8 md:p-12 w-full max-w-full h-[50vh] md:h-[60vh] mx-10 overflow-hidden shadow-2xl"
      >
        {/* Left Content (40%) */}
        <div className="w-full md:w-[40%] flex flex-col justify-between z-10 order-2 md:order-1">
          <div>
            <div className="w-fit px-3 py-1 border border-white/20 rounded-full text-xs font-mono uppercase mb-6 md:mb-8 text-white/80">
              {tags[0]}
            </div>
            <h3 className="text-3xl md:text-6xl font-bold uppercase leading-[0.9] mb-6 text-white tracking-tighter">
              {title}
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
              {description}
            </p>
          </div>
          <button className="group w-fit px-6 py-3 rounded-lg bg-[#5c5cff] text-white font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 mt-8 md:mt-0">
            Visit The Site
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Image (60%) */}
        <div className="w-full md:w-[60%] h-full relative rounded-xl overflow-hidden order-1 md:order-2 bg-[#1a1a1a]">
          <motion.div style={{ scale: imageScale }} className="w-full h-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </motion.div>
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </motion.div>
    </div>
  );
}
