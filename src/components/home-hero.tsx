"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { Grapevine } from "@/components/graphics/motifs";
import { ParallaxMedia } from "@/components/motion/primitives";

const lines = ["Premium Indian", "raisins and", "agricultural products."];

export function HomeHero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-forest-950 text-white">
      <ParallaxMedia src="/images/products/raisins-hero.png" alt="Assorted golden, green, brown, and black raisins in a stone bowl" priority sizes="100vw" />
      <div className="photo-scrim absolute inset-0" />
      <Grapevine className="absolute -right-10 top-16 hidden h-[80%] text-amber-200/30 lg:block" />
      <div className="container-shell relative flex min-h-[100svh] items-end pb-16 pt-24">
        <LazyMotion features={domAnimation}>
          <div className="max-w-3xl rounded-[2rem] bg-forest-950/80 p-7 shadow-2xl backdrop-blur-md md:p-10">
            <m.p initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-xs font-bold tracking-[0.14em] text-amber-300">ESTABLISHED IN 2013 · MAHARASHTRA, INDIA</m.p>
            <h1 className="mt-5 font-display text-[clamp(2.7rem,5.6vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              {lines.map((line, index) => (
                <m.span key={line} className="block" initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}>{line}</m.span>
              ))}
            </h1>
            <m.p initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-7 max-w-xl text-lg leading-8 text-stone-200">A farming-family-founded company serving wholesale, distribution, and business buyers from the Sangli region.</m.p>
            <m.div initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-forest-950 hover:bg-amber-100">Explore products <ArrowRight className="size-4" aria-hidden="true" /></Link>
              <Link href="/contact" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-500 px-6 text-sm font-bold text-forest-950 hover:bg-amber-400">Request an enquiry <ArrowRight className="size-4" aria-hidden="true" /></Link>
            </m.div>
          </div>
        </LazyMotion>
      </div>
      <a href="#products" className="focus-ring absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xs font-bold tracking-[0.16em] text-white/80 lg:block">SCROLL</a>
    </section>
  );
}
