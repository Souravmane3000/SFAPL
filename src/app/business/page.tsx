import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/content-components";
import { EnquiryForm } from "@/components/enquiry-form";

export const metadata: Metadata = {
  title: "Business Opportunities",
  description: "Wholesale, distribution, dealer, and channel-partner enquiries for Sourav Food & Agro products.",
  alternates: { canonical: "/business" },
};

const audiences = [
  {
    title: "Wholesale buyers",
    copy: "Discuss product category, approximate volume, destination, and the commercial information needed for evaluation.",
  },
  {
    title: "Distributors & dealers",
    copy: "Start a direct conversation about product fit and the practical requirements of a distribution relationship.",
  },
  {
    title: "Business buyers",
    copy: "Share your ingredient, food-manufacturing, bakery, or gift-packing requirement with the team.",
  },
];

const strengths = [
  "A focused portfolio of agricultural food products",
  "Direct enquiry routes for product and quantity requirements",
  "Quality checks described from procurement to dispatch",
  "Packaging and promotional support discussed against requirement",
  "A company history rooted in Maharashtra since 2013",
];

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Business opportunities"
        title="Build the next relationship with us."
        copy="For wholesalers, distributors, dealers, channel partners, and other business buyers."
      />
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading eyebrow="Who we work with" title="A direct path for every business enquiry." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {audiences.map((audience) => (
              <article key={audience.title} className="rounded-2xl border border-stone-200 bg-white p-7">
                <h2 className="font-sans text-xl font-bold">{audience.title}</h2>
                <p className="mt-4 text-sm leading-7 text-stone-600">{audience.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space bg-forest-50">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Why start a conversation"
            title="Grounded in product and practical support."
            copy="The official business information emphasizes product quality, supply relationships, promotional support, and transparent transactions."
          />
          <ul className="space-y-4">
            {strengths.map((strength) => (
              <li key={strength} className="flex gap-4 rounded-xl bg-white p-5 font-semibold text-stone-800">
                <Check className="mt-0.5 size-5 shrink-0 text-forest-700" aria-hidden="true" />
                {strength}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-space bg-amber-50">
        <div className="container-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Business enquiry</p>
            <h2 className="section-title mt-5">Start with your requirement.</h2>
            <p className="body-large mt-5">Tell us the product, quantity, destination, and the kind of relationship you are exploring.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-card md:p-9">
            <EnquiryForm defaultProduct="Wholesale partnership" />
          </div>
        </div>
      </section>
    </>
  );
}
