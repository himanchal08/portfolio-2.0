import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Works } from "@/components/works";
import { WhyMe } from "@/components/why-me";
import { Testimonials } from "@/components/testimonials";
import { TechMarquee } from "@/components/marquee";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SectionBlend } from "@/components/section-blend";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <main>
        <Hero />
        <SectionBlend />
        <TechMarquee />
        <About />
        <Works />
        <WhyMe />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
