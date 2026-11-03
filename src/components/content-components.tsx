import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageCheck, SearchCheck, Settings2, ShieldCheck, UserCheck } from "lucide-react";
import { CategoryMark, ContourField } from "@/components/graphics/motifs";
import type { Product, QualityStep } from "@/types";

export function ButtonLink({ href, children, tone = "primary" }: { href: string; children: React.ReactNode; tone?: "primary" | "accent" | "outline" | "light" }) {
  const tones = {
    primary: "bg-forest-900 text-white hover:bg-forest-800",
    accent: "bg-amber-500 text-forest-950 hover:bg-amber-400",
    outline: "border border-stone-300 bg-white/70 text-stone-800 hover:border-forest-700 hover:text-forest-800",
    light: "bg-white text-forest-950 hover:bg-amber-50",
  };
  return (
    <Link href={href} className={`focus-ring group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-all hover:-translate-y-0.5 active:translate-y-0 ${tones[tone]}`}>
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

export function SectionHeading({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="body-large mt-5 max-w-2xl">{copy}</p> : null}
    </div>
  );
}

export function PageHero({ eyebrow, title, copy, image, imageAlt }: { eyebrow: string; title: string; copy: string; image?: string; imageAlt?: string }) {
  return (
    <section className="relative overflow-hidden bg-forest-950 text-white">
      {image ? <Image src={image} alt={imageAlt ?? ""} fill priority sizes="100vw" className="object-cover opacity-35" /> : null}
      <div className="photo-scrim absolute inset-0" />
      <ContourField className="absolute right-0 top-0 h-full w-1/2 text-white/20" />
      <div className="container-shell relative py-20 md:py-28">
        <p className="mb-5 text-xs font-bold tracking-[0.08em] text-amber-400">{eyebrow}</p>
        <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200">{copy}</p>
      </div>
    </section>
  );
}

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return (
    <Link href={`/products/${product.slug}`} className={`focus-ring interactive-media group overflow-hidden rounded-3xl bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover ${featured ? "md:col-span-2" : ""}`}>
      <div className={`media-frame rounded-none ${featured ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
        <Image src={product.heroImage} alt={`${product.name} presented for business buyers`} fill sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"} className="object-cover" />
        <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-full bg-white/90 text-forest-800"><CategoryMark category={product.id} /></span>
      </div>
      <div className="p-6 md:p-7">
        <p className="eyebrow">{product.eyebrow}</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-sans text-2xl font-bold text-stone-900">{product.name}</h3>
            <p className="mt-2 max-w-lg text-sm leading-6 text-stone-500">{product.description}</p>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-amber-50 text-amber-700 transition-colors group-hover:bg-amber-500 group-hover:text-forest-950"><ArrowRight className="size-4" aria-hidden="true" /></span>
        </div>
      </div>
    </Link>
  );
}

const qualityIcons = { SearchCheck, Settings2, ShieldCheck, UserCheck, PackageCheck };

export function QualityProcess({ steps }: { steps: QualityStep[] }) {
  return (
    <ol className="relative mt-12 space-y-5 lg:grid lg:grid-cols-5 lg:gap-5 lg:space-y-0">
      <span className="absolute bottom-8 left-7 top-8 w-px bg-forest-200 lg:hidden" aria-hidden="true" />
      {steps.map((step, index) => {
        const Icon = qualityIcons[step.icon];
        return (
          <li key={step.id} className="relative rounded-3xl border border-stone-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-full bg-forest-900 text-amber-300"><Icon className="size-5" aria-hidden="true" /></span>
              <span className="font-display text-3xl text-stone-300">{index + 1}</span>
            </div>
            <h3 className="mt-6 font-sans text-lg font-bold text-stone-900">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function BusinessCta({ title = "Looking for a reliable agricultural product partner?", copy = "Tell us the product, approximate quantity, and destination. We will route your enquiry to the right contact." }: { title?: string; copy?: string }) {
  return (
    <section className="relative overflow-hidden bg-forest-900 py-16 text-white md:py-24">
      <ContourField className="absolute -right-20 top-0 h-full w-2/3 text-white/15" />
      <div className="container-shell relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-bold tracking-[0.08em] text-amber-400">Start a conversation</p>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-6xl">{title}</h2>
          <p className="mt-5 max-w-2xl leading-7 text-stone-300">{copy}</p>
        </div>
        <ButtonLink href="/contact" tone="accent">Request an enquiry</ButtonLink>
      </div>
    </section>
  );
}
