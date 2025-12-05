"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
