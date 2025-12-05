"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PulseBeamsProps {
  children?: React.ReactNode;
  className?: string;
  beams: { path: string }[];
  width?: number;
  height?: number;
  baseColor?: string;
  accentColor?: string;
  duration?: number;
}

export const PulseBeams = ({
  children,
  className,
  beams,
  width = 300,
  height = 150,
  baseColor = "rgba(255,255,255,0.1)",
  accentColor = "#8b5cf6",
  duration = 3,
}: PulseBeamsProps) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {beams.map((beam, index) => (
            <React.Fragment key={index}>
              {/* Track */}
              <path
                d={beam.path}
                stroke={baseColor}
                strokeWidth="1"
                fill="none"
              />
              {/* Moving Beam */}
              <motion.path
                d={beam.path}
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                pathLength={1}
                initial={{ strokeDasharray: "0.25 1", strokeDashoffset: 1.25 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </React.Fragment>
          ))}
        </svg>
      </div>
    </div>
  );
};
