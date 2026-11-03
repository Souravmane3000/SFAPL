export function trapTabTarget(key: string, shiftKey: boolean, activeIsFirst: boolean, activeIsLast: boolean) {
  if (key === "Escape") return "close" as const;
  if (key !== "Tab") return null;
  if (shiftKey && activeIsFirst) return "last" as const;
  if (!shiftKey && activeIsLast) return "first" as const;
  return null;
}
