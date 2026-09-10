"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HomeHero() {
  const reducedMotion = useReducedMotion();
  const transition = (delay: number) =>
    reducedMotion ? { duration: 0 } : { delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const };
  const initial = reducedMotion ? false : { opacity: 0, y: 22 };

  return (
    <section className="overflow-hidden bg-stone-50">
      <div className="grid min-h-[calc(100svh-5rem)] lg:grid-cols-[1.03fr_.97fr]">
        <div className="container-shell flex items-center py-16 lg:w-full lg:max-w-none lg:pl-[max(2.5rem,calc((100vw-80rem)/2))] lg:pr-16">
          <div className="max-w-3xl">
            <motion.p initial={initial} animate={{ opacity: 1, y: 0 }} transition={transition(0)} className="eyebrow">
              Established in 2013 · Maharashtra, India
            </motion.p>
            <motion.h1
              initial={initial}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.08)}
              className="display-title mt-6"
            >
              Premium Indian raisins and agricultural products.
            </motion.h1>
            <motion.p
              initial={initial}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.16)}
              className="body-large mt-7 max-w-xl"
            >
              A farming-family-founded company serving wholesale, distribution, and business buyers from the Sangli region.
            </motion.p>
            <motion.div
              initial={initial}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.24)}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/products" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest-900 px-6 text-sm font-bold text-white hover:bg-forest-800">
                Explore products <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-500 px-6 text-sm font-bold text-forest-950 hover:bg-amber-400">
                Request an enquiry <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="relative min-h-[23rem] lg:min-h-full">
          <Image
            src="/images/products/raisins-hero.png"
            alt="Assorted golden, green, brown, and black raisins in a stone bowl"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
