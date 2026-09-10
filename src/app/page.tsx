import { Building2, CalendarDays, Leaf, ShieldCheck } from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import {
  BusinessCta,
  ButtonLink,
  ProductCard,
  QualityProcess,
  SectionHeading,
} from "@/components/content-components";
import { publishedProducts } from "@/data/products";
import { qualitySteps } from "@/data/quality";

const trustSignals = [
  { icon: CalendarDays, label: "Established in 2013" },
  { icon: Leaf, label: "Farming-family roots" },
  { icon: Building2, label: "Bolwad manufacturing reference" },
  { icon: ShieldCheck, label: "Checks at every stage" },
];

export default function Home() {
  return (
    <>
      <HomeHero />
      <section className="border-y border-stone-200 bg-white">
        <div className="container-shell grid grid-cols-2 gap-px md:grid-cols-4">
          {trustSignals.map(({ icon: Icon, label }) => (
            <div key={label} className="flex min-h-28 items-center gap-3 border-stone-200 px-3 py-6 md:border-r md:px-6 last:border-r-0">
              <Icon className="size-5 shrink-0 text-forest-700" aria-hidden="true" />
              <span className="text-sm font-bold text-stone-800">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space bg-stone-50">
        <div className="container-shell">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Our products"
              title="A focused agricultural portfolio."
              copy="Four core categories, presented clearly for wholesale and business buyers."
            />
            <ButtonLink href="/products" tone="outline">View all products</ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-forest-50">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-3xl bg-forest-900 p-8 text-white md:p-12">
            <p className="text-sm font-bold text-amber-400">2013</p>
            <p className="mt-20 font-display text-4xl font-semibold leading-tight">
              Founded by K. T. Mane and Sandhya Mane.
            </p>
            <p className="mt-5 leading-7 text-stone-300">A company story rooted in farming and the Sangli–Miraj region of Maharashtra.</p>
          </div>
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Built from an agricultural family’s perspective."
              copy="Sourav Food & Agro began with raisins and a clear objective: connect agricultural products with buyers who value consistency and a direct business relationship."
            />
            <div className="mt-8"><ButtonLink href="/about">Read our story</ButtonLink></div>
          </div>
        </div>
      </section>

      <section className="section-space bg-stone-50">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Quality assurance"
            title="Care across the working process."
            copy="The company’s stated quality practice spans procurement, processing, hygiene, personnel care, and dispatch."
          />
          <QualityProcess steps={qualitySteps.slice(0, 3)} />
          <div className="mt-8"><ButtonLink href="/quality" tone="outline">See the complete process</ButtonLink></div>
        </div>
      </section>
      <BusinessCta />
    </>
  );
}
