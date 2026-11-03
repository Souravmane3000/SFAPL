import type { Metadata } from "next";
import { BusinessCta, PageHero, SectionHeading } from "@/components/content-components";
import { RegionMark } from "@/components/graphics/motifs";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Sourav Food & Agro, founded in 2013 by K. T. Mane and Sandhya Mane in Maharashtra.",
  alternates: { canonical: "/about" },
};

const timeline = [
  { year: "2013", title: "The company is established", copy: "K. T. Mane and Sandhya Mane founded Sourav Food & Agro on 14 January 2013." },
  { year: "Bolwad", title: "A manufacturing reference", copy: "Official public information references a manufacturing and packing unit at Bolwad in western Maharashtra." },
  { year: "Today", title: "A focused food portfolio", copy: "Raisins remain central, supported by turmeric, jaggery, and rice. Commercial details stay in a direct enquiry." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Sourav Food & Agro"
        title="A farming-family story, growing since 2013."
        copy="An agricultural company shaped by its roots in Maharashtra’s Sangli–Miraj region."
      />
      <section className="section-space">
        <div className="container-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-forest-950 p-8 text-white md:p-10">
            <RegionMark className="absolute -right-16 bottom-0 h-64 text-amber-200/25" />
            <p className="eyebrow text-amber-300">Company facts</p>
            <dl className="relative mt-8 space-y-8">
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
            <ol className="mt-10 space-y-6 border-l border-forest-200 pl-6">
              {timeline.map((item) => (
                <li key={item.year}>
                  <p className="font-display text-4xl text-forest-800">{item.year}</p>
                  <h3 className="mt-2 font-sans text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 max-w-xl leading-7 text-stone-600">{item.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="section-space bg-forest-50">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          <article className="rounded-[2rem] bg-white p-8 md:p-10">
            <p className="eyebrow">Our mission</p>
            <h2 className="mt-5 font-display text-4xl font-semibold text-stone-900">Create value through agricultural products.</h2>
            <p className="mt-5 leading-7 text-stone-600">
              Serve customers with clear product information, responsible working practices, and direct business relationships while respecting the effort behind agriculture.
            </p>
          </article>
          <article className="rounded-[2rem] bg-forest-900 p-8 text-white md:p-10">
            <p className="text-xs font-bold tracking-[0.08em] text-amber-400">Our outlook</p>
            <h2 className="mt-5 font-display text-4xl font-semibold text-white">Grow with buyers and partners.</h2>
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
      <dt className="text-xs font-bold tracking-[0.08em] text-amber-300">{term}</dt>
      <dd className="mt-2 font-display text-3xl leading-tight">{detail}</dd>
    </div>
  );
}
