import { Building2, CalendarDays, Leaf, ShieldCheck } from "lucide-react";
import { BusinessCta, ButtonLink, QualityProcess, SectionHeading } from "@/components/content-components";
import { RegionMark } from "@/components/graphics/motifs";
import { HomeHero } from "@/components/home-hero";
import { Reveal } from "@/components/motion/primitives";
import { ProductStory } from "@/components/product-story";
import { publishedProducts } from "@/data/products";
import { qualitySteps } from "@/data/quality";

const proof = [
  { icon: CalendarDays, label: "Established in 2013" },
  { icon: Leaf, label: "Farming-family roots" },
  { icon: Building2, label: "Bolwad manufacturing reference" },
  { icon: ShieldCheck, label: "Checks at every stage" },
];

export default function Home() {
  return (
    <>
      <HomeHero />
      <section className="relative z-10 -mt-10">
        <div className="container-shell grid gap-3 rounded-[2rem] border border-white/50 bg-white/90 p-3 shadow-card backdrop-blur md:grid-cols-4">
          {proof.map(({ icon: Icon, label }) => (
            <div key={label} className="flex min-h-20 items-center gap-3 rounded-2xl px-4 py-3">
              <Icon className="size-5 text-forest-700" aria-hidden="true" />
              <span className="text-sm font-bold">{label}</span>
            </div>
          ))}
        </div>
      </section>
      <ProductStory products={publishedProducts} />
      <section className="section-space overflow-hidden bg-forest-50">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal className="relative min-h-[24rem] overflow-hidden rounded-[2rem] bg-forest-950 p-8 text-white md:p-12">
            <RegionMark className="absolute -right-8 bottom-0 h-64 text-amber-200/30" />
            <p className="font-display text-8xl leading-none text-amber-300">2013</p>
            <p className="mt-10 max-w-sm font-display text-4xl leading-tight">Founded by K. T. Mane and Sandhya Mane.</p>
            <p className="mt-5 max-w-sm leading-7 text-stone-300">A company story rooted in farming and the Sangli–Miraj region of Maharashtra.</p>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Our story" title="Built from an agricultural family’s perspective." copy="Sourav Food & Agro began with raisins and a clear objective: connect agricultural products with buyers who value consistency and a direct business relationship." />
            <div className="mt-8"><ButtonLink href="/about">Read our story</ButtonLink></div>
          </div>
        </div>
      </section>
      <section className="section-space contour-field">
        <div className="container-shell">
          <SectionHeading eyebrow="Quality assurance" title="Care across the working process." copy="The company’s stated quality practice spans procurement, processing, hygiene, personnel care, and dispatch." />
          <QualityProcess steps={qualitySteps.slice(0, 3)} />
          <div className="mt-8"><ButtonLink href="/quality" tone="outline">See the complete process</ButtonLink></div>
        </div>
      </section>
      <BusinessCta />
    </>
  );
}
