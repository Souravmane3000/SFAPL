import type { Metadata } from "next";
import { ButtonLink, PageHero, SectionHeading } from "@/components/content-components";
import { QualityJourney } from "@/components/quality-journey";
import { publishedCertifications, qualitySteps } from "@/data/quality";

export const metadata: Metadata = {
  title: "Quality Assurance",
  description: "Explore Sourav Food & Agro's stated quality process from procurement checks through pre-dispatch inspection.",
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality assurance"
        title="Care from procurement to dispatch."
        copy="A concise view of the working practices described by Sourav Food & Agro."
      />
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Our process"
            title="Five stages of attention."
            copy="The process below reflects the company’s official quality-assurance information without adding unsupported standards or claims."
          />
          <QualityJourney steps={qualitySteps} />
        </div>
      </section>
      <section className="section-space bg-forest-50">
        <div className="container-shell grid items-start gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Manufacturing reference"
            title="Connected to the Sangli agricultural region."
            copy="The company’s official story identifies a manufacturing and packing unit at Bolwad in western Maharashtra. Facility capacity and technical specifications are shared only when confirmed."
          />
          <div className="rounded-2xl bg-white p-8 md:p-10">
            <p className="eyebrow">Current documentation</p>
            {publishedCertifications.length ? (
              <ul className="mt-6 space-y-4">
                {publishedCertifications.map((certification) => <li key={certification.id} className="font-bold">{certification.name}</li>)}
              </ul>
            ) : (
              <>
                <h2 className="mt-5 text-3xl font-semibold">Quality documentation on request.</h2>
                <p className="mt-5 leading-7 text-stone-600">
                  Current certification names and badges will appear here only after the relevant company documents are verified.
                </p>
                <div className="mt-7"><ButtonLink href="/contact">Contact the team</ButtonLink></div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
