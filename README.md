# Portfolio 2.0

A luxurious, motion-rich portfolio website built with Next.js, TypeScript, and Three.js. Designed to be performant, responsive, and SEO-friendly.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics:** [React Three Fiber](https://docs.pmndrs.assets/react-three-fiber) / [Three.js](https://threejs.org/)
- **Smooth Scroll:** [Lenis](https://github.com/studio-freight/lenis)

## Features

- **Immersive 3D Hero Section:** Interactive 3D elements using R3F.
- **Smooth Scrolling:** Premium scroll experience with Lenis.
- **Responsive Design:** Optimized for all devices, with heavy animations disabled on mobile for performance.
- **SEO Optimized:** Dynamic metadata, sitemap, and robots.txt generation.
- **AI Ready:** Includes an `llm.txt` for AI agents to parse site content.
- **Centralized Content:** All text and data managed via `lib/data.ts` for easy updates.

## 🛠️ Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/himanchal08/portfolio-2.0.git
    cd portfolio-2.0
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    pnpm dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (Hero, About, Works, etc.).
- `lib/data.ts`: Centralized configuration file for site content.
- `public/`: Static assets (images, textures).

## 🎨 Customization

To customize the content, simply edit `lib/data.ts`. This file controls:

- Navigation links
- Hero text
- Projects list
- Services
- Testimonials
- Footer content
