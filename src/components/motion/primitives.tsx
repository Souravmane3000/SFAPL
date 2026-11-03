"use client";

import Image from "next/image";
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";
import { revealMotion } from "@/lib/story";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  const motion = revealMotion(Boolean(reduced));
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={motion.initial}
        whileInView={motion.animate}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

export function ParallaxMedia({ src, alt, priority = false, sizes }: { src: string; alt: string; priority?: boolean; sizes: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useSyncExternalStore(subscribeToFinePointer, getFinePointerSnapshot, getServerFinePointerSnapshot);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <LazyMotion features={domAnimation}>
        <m.div className="absolute inset-[-8%]" style={reduced || !finePointer ? {} : { y }}>
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
        </m.div>
      </LazyMotion>
    </div>
  );
}

function subscribeToFinePointer(onChange: () => void) {
  const media = window.matchMedia("(pointer: fine)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerFinePointerSnapshot() {
  return false;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <LazyMotion features={domAnimation}>
      <m.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-amber-400" />
    </LazyMotion>
  );
}
