import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/content-components";
import { BusinessPathways } from "@/components/business-pathways";

export const metadata: Metadata = {
  title: "Business Opportunities",
  description: "Wholesale, distribution, dealer, and channel-partner enquiries for Sourav Food & Agro products.",
  alternates: { canonical: "/business" },
};

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
          <SectionHeading eyebrow="Who we work with" title="A direct path for every business enquiry." copy="Choose the relationship you are exploring. The enquiry form keeps the same fields and opens with the matching intent." />
          <div className="mt-12"><BusinessPathways /></div>
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
    </>
  );
}
