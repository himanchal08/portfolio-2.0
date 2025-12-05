import { siteData } from "@/lib/data";

export async function GET() {
  const {
    hero,
    about,
    services,
    works,
    whyMe,
    testimonials,
    techMarquee,
    footer,
    navbar,
  } = siteData;

  const content = `
# ${navbar.logoText} - Portfolio Summary

## Overview
${hero.subtitle}
${about.title}

## Core Services
${services.map((s) => `- ${s.title}: ${s.description}`).join("\n")}

## Tech Stack & Philosophy
${techMarquee.techItems.join(", ")}

## Featured Projects
${works.projects
  .map(
    (p) =>
      `- ${p.title} (${p.year}): ${p.description} [Tags: ${p.tags.join(", ")}]`
  )
  .join("\n")}

## Why Choose Me?
${whyMe.pitch}
Stats:
${whyMe.stats.map((s) => `- ${s.label}: ${s.value}`).join("\n")}

## Testimonials
${testimonials.items
  .map((t) => `- "${t.text}" — ${t.author}, ${t.role}`)
  .join("\n")}

## Contact
${footer.ctaText}
${footer.socialLinks.map((s) => `- ${s.name}: ${s.url}`).join("\n")}
  `.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
