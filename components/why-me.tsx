"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { siteData } from "@/lib/data";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-white/10 group", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center text-foreground/50 justify-between py-6 font-medium transition-all hover:text-white text-left",
        className
      )}
      {...props}
    >
      {children}
      <div className="relative flex items-center justify-center w-6 h-6">
        <Plus className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45 group-data-[state=open]:opacity-0 absolute" />
        <Minus className="h-4 w-4 shrink-0 transition-transform duration-200 rotate-90 group-data-[state=open]:rotate-0 opacity-0 group-data-[state=open]:opacity-100 absolute" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-6 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

export function WhyMe() {
  return (
    <section className="w-full bg-background text-white -mt-20 pb-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[#5c5cff]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-12 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">
            {siteData.whyMe.sectionTitle}
          </h2>
          <motion.p
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-4xl md:text-6xl font-light max-w-3xl leading-tight cursor-default"
          >
            {siteData.whyMe.title}
          </motion.p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"
        >
          {siteData.whyMe.accordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-white/10"
            >
              <AccordionTrigger className="text-xl md:text-3xl font-light py-8 group-hover:pl-4 transition-all duration-300">
                <span className="flex items-baseline gap-6">
                  <span className="text-xs font-mono text-gray-600 mb-auto pt-2">
                    (0{index + 1})
                  </span>
                  <span>{item.trigger}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base md:text-lg leading-relaxed pl-12 max-w-md">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
