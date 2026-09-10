import type { Certification, QualityStep } from "@/types";

export const qualitySteps: QualityStep[] = [
  {
    id: "procurement",
    title: "Raw material checks",
    description: "Quality testing takes place before raw materials are accepted for procurement.",
    icon: "SearchCheck",
  },
  {
    id: "processing",
    title: "Modern processing",
    description: "The company uses modern techniques in its raisin processing workflow.",
    icon: "Settings2",
  },
  {
    id: "hygiene",
    title: "Hygienic conditions",
    description: "Working conditions are maintained with minimal direct contact during processing.",
    icon: "ShieldCheck",
  },
  {
    id: "people",
    title: "Personnel care",
    description: "The stated quality process includes regular medical testing for employees.",
    icon: "UserCheck",
  },
  {
    id: "dispatch",
    title: "Pre-dispatch inspection",
    description: "Products are inspected and tested before they are cleared for dispatch.",
    icon: "PackageCheck",
  },
];

export const certifications: Certification[] = [
  { id: "fssai", name: "FSSAI", status: "pending", image: null },
  { id: "iso", name: "ISO 9001", status: "pending", image: null },
];

export const publishedCertifications = certifications.filter(
  (certification) => certification.status === "verified",
);
