"use client";

import { siteData } from "@/lib/data";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { Home, Code, FolderGit2, Mail, User } from "lucide-react";

export function Navbar() {
  const { logoText, navLinks, brandLabel } = siteData.navbar;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "home":
        return <Home className="w-6 h-6" />;
      case "services":
        return <Code className="w-6 h-6" />;
      case "my work":
        return <FolderGit2 className="w-6 h-6" />;
      case "contact us":
        return <Mail className="w-6 h-6" />;
      default:
        return <User className="w-6 h-6" />;
    }
  };

  return (
    <>
      {/* Top Bar for Logo */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-40 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <span className="font-mono text-xs text-neutral-500">
            {brandLabel}
          </span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xl font-bold text-white tracking-tighter mix-blend-difference"
          >
            {logoText}
          </a>
        </div>
      </nav>

      {/* Bottom Dock Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <Dock className="bg-white/10 backdrop-blur-md border border-white/10 dark:bg-black/10">
          {navLinks.map((link) => (
            <DockItem key={link.label} className="aspect-square rounded-full">
              <DockLabel>{link.label}</DockLabel>
              <DockIcon>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="w-full h-full flex items-center justify-center text-white hover:text-white/80 transition-colors"
                >
                  {getIcon(link.label)}
                </button>
              </DockIcon>
            </DockItem>
          ))}
        </Dock>
      </div>
    </>
  );
}
