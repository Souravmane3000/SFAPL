import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/content-components";
import { EnquiryForm } from "@/components/enquiry-form";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Sourav Food & Agro for product, wholesale, distribution, and business enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Sourav Food & Agro"
        title="Tell us what you need."
        copy="Send a product or business enquiry, or use the verified contact routes below."
      />
      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <aside>
            <p className="eyebrow">Direct contact</p>
            <h2 className="section-title mt-5">Start the conversation.</h2>
            <div className="mt-9 space-y-4">
              <ContactLink icon={Phone} label="Official landline" value={company.contact.officialLandline} href={`tel:${company.contact.officialLandline.replaceAll(" ", "")}`} />
              <ContactLink icon={Mail} label="General enquiries" value={company.contact.primaryEmail} href={`mailto:${company.contact.primaryEmail}`} />
              <ContactLink icon={Mail} label="Director email" value={company.contact.directorEmail} href={`mailto:${company.contact.directorEmail}`} />
              <div className="flex gap-4 rounded-xl border border-stone-200 bg-white p-5">
                <MapPin className="mt-1 size-5 shrink-0 text-forest-700" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold text-stone-500">Manufacturing reference</p>
                  <p className="mt-1 font-semibold text-stone-900">{company.manufacturingLocation}</p>
                </div>
              </div>
              {company.contact.linkedin ? (
                <ContactLink icon={ExternalLink} label="Company profile" value="LinkedIn" href={company.contact.linkedin} external />
              ) : null}
            </div>
            <p className="mt-6 text-sm leading-6 text-stone-500">
              The preferred public office address and map location are being verified and are intentionally omitted.
            </p>
          </aside>
          <div className="rounded-2xl bg-amber-50 p-6 md:p-10">
            <h2 className="font-sans text-2xl font-bold">Request an enquiry</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">Required fields are marked with an asterisk.</p>
            <div className="mt-7"><EnquiryForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactLink({
  icon: Icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      className="focus-ring flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition-colors hover:border-forest-300"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <Icon className="mt-1 size-5 shrink-0 text-forest-700" aria-hidden="true" />
      <span>
        <span className="block text-xs font-bold text-stone-500">{label}</span>
        <span className="mt-1 block break-all font-semibold text-stone-900">{value}</span>
      </span>
    </a>
  );
}
