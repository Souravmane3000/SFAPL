"use client";

import { useState } from "react";
import { EnquiryForm } from "@/components/enquiry-form";

const pathways = [
  { title: "Wholesale buyers", product: "Wholesale partnership", copy: "Discuss product category, approximate volume, destination, and the commercial information needed for evaluation." },
  { title: "Distributors & dealers", product: "Distribution enquiry", copy: "Start a direct conversation about product fit and the practical requirements of a distribution relationship." },
  { title: "Business buyers", product: "Wholesale partnership", copy: "Share your ingredient, food-manufacturing, bakery, or gift-packing requirement with the team." },
];

export function BusinessPathways() {
  const [active, setActive] = useState(0);
  const pathway = pathways[active] ?? pathways[0];
  if (!pathway) return null;
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div role="tablist" aria-label="Business pathways" className="space-y-3">
          {pathways.map((item, index) => (
            <button key={item.title} role="tab" type="button" aria-selected={index === active} className={`focus-ring w-full rounded-2xl border p-5 text-left ${index === active ? "border-forest-800 bg-forest-900 text-white" : "border-stone-200 bg-white"}`} onClick={() => setActive(index)}>
              <span className="block text-lg font-bold">{item.title}</span>
              <span className={`mt-2 block text-sm leading-6 ${index === active ? "text-stone-200" : "text-stone-600"}`}>{item.copy}</span>
            </button>
          ))}
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-card md:p-9">
          <p className="eyebrow">Business enquiry</p>
          <h3 className="mt-3 font-sans text-3xl font-bold">Start with your requirement.</h3>
          <p className="mt-3 text-sm leading-6 text-stone-600">This enquiry is prepared for {pathway.title.toLowerCase()}.</p>
          <div className="mt-7"><EnquiryForm key={pathway.product} defaultProduct={pathway.product} /></div>
        </div>
      </div>
    </>
  );
}
