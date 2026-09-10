import type { Metadata } from "next";
import { BusinessCta, PageHero, SectionHeading } from "@/components/content-components";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Sourav Food & Agro, founded in 2013 by K. T. Mane and Sandhya Mane in Maharashtra.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Sourav Food & Agro"
        title="A farming-family story, growing since 2013."
        copy="An agricultural company shaped by its roots in Maharashtra’s Sangli–Miraj region."
      />
      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div className="rounded-3xl bg-amber-50 p-8 md:p-10">
            <p className="eyebrow">Company facts</p>
            <dl className="mt-8 space-y-7">
              <Fact term="Founded" detail="14 January 2013" />
              <Fact term="Founders" detail={company.founders.join(" and ")} />
              <Fact term="Region" detail="Sangli–Miraj, Maharashtra" />
              <Fact term="Core products" detail="Raisins, turmeric, jaggery, and rice" />
            </dl>
          </div>
          <div>
            <SectionHeading
              eyebrow="Our beginning"
              title="From agricultural roots to a focused food portfolio."
              copy="K. T. Mane and Sandhya Mane established Sourav Food & Agro in January 2013. Coming from a farming family, they began with the objective of connecting raisins and other agricultural products with buyers."
            />
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-stone-700">
              <p>
                The company story is connected to the agricultural belt around Sangli and Miraj in western Maharashtra. Its official public information references a manufacturing and packing unit at Bolwad.
              </p>
              <p>
                Raisins remain central to the company’s identity, supported by turmeric, jaggery, and rice. The website presents only confirmed product categories and routes every commercial detail through a direct enquiry.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-space bg-forest-50">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-8 md:p-10">
            <p className="eyebrow">Our mission</p>
            <h2 className="mt-5 text-3xl font-semibold text-stone-900">Create value through agricultural products.</h2>
            <p className="mt-5 leading-7 text-stone-600">
              Serve customers with clear product information, responsible working practices, and direct business relationships while respecting the effort behind agriculture.
            </p>
          </article>
          <article className="rounded-2xl bg-forest-900 p-8 text-white md:p-10">
            <p className="text-xs font-bold tracking-[0.08em] text-amber-400">Our outlook</p>
            <h2 className="mt-5 text-3xl font-semibold text-white">Grow with buyers and partners.</h2>
            <p className="mt-5 leading-7 text-stone-300">
              Build enduring relationships with wholesalers, distributors, and business buyers through quality-focused products and transparent communication.
            </p>
          </article>
        </div>
      </section>
      <BusinessCta />
    </>
  );
}

function Fact({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <dt className="text-xs font-bold text-stone-500">{term}</dt>
      <dd className="mt-1 font-semibold text-stone-900">{detail}</dd>
    </div>
  );
}
