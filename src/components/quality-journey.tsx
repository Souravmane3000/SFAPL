"use client";

import { PackageCheck, SearchCheck, Settings2, ShieldCheck, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import type { QualityStep } from "@/types";

const icons = { SearchCheck, Settings2, ShieldCheck, UserCheck, PackageCheck };

export function QualityJourney({ steps }: { steps: QualityStep[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = steps.map((step) => document.getElementById(`quality-${step.id}`)).filter((item): item is HTMLElement => Boolean(item));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const index = sections.findIndex((section) => section === visible?.target);
      if (index >= 0) setActive(index);
    }, { rootMargin: "-30% 0px -45% 0px", threshold: [0.2, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [steps]);

  return (
    <div>
      <ol className="sticky top-20 z-20 hidden grid-cols-5 gap-3 bg-stone-50/90 py-4 backdrop-blur lg:grid">
        {steps.map((step, index) => (
          <li key={step.id}>
            <a href={`#quality-${step.id}`} className={`focus-ring block rounded-full border px-3 py-3 text-center text-xs font-bold ${index === active ? "border-forest-800 bg-forest-900 text-white" : "border-stone-200 bg-white text-stone-500"}`} aria-current={index === active ? "step" : undefined}>{index + 1}. {step.title}</a>
          </li>
        ))}
      </ol>
      <div className="mt-8 space-y-6">
        {steps.map((step, index) => {
          const Icon = icons[step.icon];
          return (
            <article id={`quality-${step.id}`} key={step.id} className="scroll-mt-36 grid gap-6 rounded-[2rem] bg-white p-6 shadow-card md:grid-cols-[auto_1fr] md:p-10">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-full bg-forest-900 text-amber-300"><Icon aria-hidden="true" /></span>
                <span className="font-display text-5xl text-stone-200 lg:hidden">{index + 1}</span>
              </div>
              <div>
                <h3 className="font-sans text-2xl font-bold">{step.title}</h3>
                <p className="mt-3 max-w-3xl text-base leading-8 text-stone-600">{step.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
