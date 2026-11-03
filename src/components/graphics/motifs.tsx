export function Grapevine({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 360 640" fill="none" aria-hidden="true">
      <path d="M300 20c-30 70-18 120-62 154-48 36-92 28-126 68" stroke="currentColor" strokeWidth="1.4" />
      <path d="M238 174c42 8 68 38 72 78M176 242c-36 22-48 58-34 102" stroke="currentColor" strokeWidth="1.2" />
      <path d="M214 168c18-28 18-48 6-72M168 250c-24-18-52-16-78 4M196 338c22 20 28 48 16 82" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="198" cy="146" rx="18" ry="8" transform="rotate(-28 198 146)" stroke="currentColor" />
      <ellipse cx="154" cy="228" rx="16" ry="7" transform="rotate(24 154 228)" stroke="currentColor" />
      <ellipse cx="214" cy="322" rx="17" ry="7" transform="rotate(-18 214 322)" stroke="currentColor" />
      <circle cx="126" cy="286" r="7" stroke="currentColor" />
      <circle cx="248" cy="214" r="6" stroke="currentColor" />
      <circle cx="188" cy="404" r="8" stroke="currentColor" />
    </svg>
  );
}

export function ContourField({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 420" fill="none" aria-hidden="true">
      <path d="M-20 80c120 40 180-30 300-10 130 22 180 80 320 40 90-26 150-10 230 24" stroke="currentColor" />
      <path d="M-20 150c140 30 190-46 330-18 150 30 190 92 340 42 80-28 130-6 190 28" stroke="currentColor" />
      <path d="M-20 230c150 18 180-58 340-24 160 34 180 104 330 48" stroke="currentColor" />
      <path d="M-10 310c170 10 190-62 360-22 150 36 190 86 300 34" stroke="currentColor" />
    </svg>
  );
}

export function RegionMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 420 320" fill="none" aria-hidden="true">
      <path d="M78 46c42-24 86-18 112 16 18 24 18 42 42 54 34 16 48 48 42 86-8 46-46 70-96 76-58 8-92-18-126-18-28 0-58 16-86 8-22-6-34-34-28-62 8-36 38-48 42-84 4-34 28-58 62-76Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="214" cy="126" r="5" fill="currentColor" />
      <path d="M214 126c28 18 42 24 70 22" stroke="currentColor" />
      <circle cx="168" cy="168" r="4" fill="currentColor" />
    </svg>
  );
}

export function QualityPath({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 760 80" fill="none" aria-hidden="true">
      <path d="M30 40h700" stroke="currentColor" strokeDasharray="4 8" />
      {[70, 230, 390, 550, 690].map((x) => <circle key={x} cx={x} cy="40" r="6" fill="currentColor" />)}
    </svg>
  );
}

export function CategoryMark({ category }: { category: string }) {
  const paths: Record<string, string> = {
    raisins: "M8 18c4-8 8-8 12 0-4 7-8 7-12 0Zm8-8c3 2 4 5 3 8",
    turmeric: "M7 20c2-8 5-12 8-14 1 6 1 10-2 16-3-1-5-1-6-2Zm8-12 6-3",
    jaggery: "M7 16h14l-2 6H9l-2-6Zm3-4h8l2 4H8l2-4Z",
    rice: "M8 20c4-10 8-10 12 0M12 20c2-6 4-6 6 0M10 12h8",
  };
  return (
    <svg viewBox="0 0 28 28" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d={paths[category] ?? paths.raisins} />
    </svg>
  );
}
