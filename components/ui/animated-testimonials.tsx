"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { siteData } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { IconCode, IconDeviceMobile, IconBrain, IconProps } from "@tabler/icons-react";

type IconName = "code" | "smartphone" | "brain";

const iconMap: Record<IconName, React.ComponentType<IconProps>> = {
  code: IconCode,
  smartphone: IconDeviceMobile,
  brain: IconBrain,
};

export function AnimatedTestimonials() {
  const { sectionTitle, title } = siteData.about;
  const services = siteData.services;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const smoothX = useSpring(x, { damping: 50, stiffness: 400 });

  return (
    <div className="flex flex-col">
      {/* Text Section */}
      <section
        ref={containerRef}
        className="relative py-15 overflow-hidden md:py-0"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-8 md:px-12 mb-0 py-10"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
            {sectionTitle}
          </p>
          <h2 className="font-sans text-3xl md:text-5xl font-light italic">
            {title}
          </h2>
        </motion.div>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon as IconName]
                if (!IconComponent) {
                    console.error("Missing icon:", service.icon);
                    return (
                      <div key={index} className="animate-in">
                        <Card>
                          <CardContent>
                            <div style={{ color: "red" }}>
                              Missing icon: {service.icon}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  }
                return (
                  <div key={index} className="skill-card">
                    <Card className="h-full border-t-4 border-t-primary">
                      <CardContent className="p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-full bg-primary/10">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold">{service.title}</h3>
                        </div>

                        <p className="text-muted-foreground mb-4 flex-1">{service.description}</p>

                        <div className="space-y-3 mb-4">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center text-sm">
                              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




import { useState } from "react";

const images = [
  "https://pbs.twimg.com/media/G6dpB9JaAAA2wDS?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpEiebIAEHrOS?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpGJZbsAEg1tp?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpHzVbkAERJI3?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpKpcbgAAj7ce?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpNYzawAAniIt?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpPilbcAAH3jU?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpRFBbsAEvquO?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpUL-aUAAUqGZ?format=png&name=small",
];

const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);

  const getImageWidth = (index: number) =>
    index === expandedImage ? "24rem" : "5rem";

  return (
    <div className="w-full h-screen bg-[#f5f4f3]">
      <div className="relative grid min-h-screen grid-cols-1 items-center justify-center p-2 transition-all duration-300 ease-in-out lg:flex w-full">
        <div className="w-full h-full overflow-hidden rounded-3xl">
          <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
            <div className="relative w-full max-w-6xl px-5">
              <div className="flex w-full items-center justify-center gap-1">
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out"
                    style={{
                      width: getImageWidth(idx + 1),
                      height: "24rem",
                    }}
                    onMouseEnter={() => setExpandedImage(idx + 1)}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={src}
                      alt={`Image ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;
