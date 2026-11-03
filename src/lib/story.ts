export function revealMotion(reduced: boolean) {
  if (reduced) return { initial: false as const, animate: { opacity: 1, y: 0 } };
  return { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 } };
}

export function storyDeltaFromKey(key: string) {
  if (key === "ArrowRight" || key === "ArrowDown") return 1;
  if (key === "ArrowLeft" || key === "ArrowUp") return -1;
  return null;
}

export function nextStoryIndex(current: number, length: number, delta: number) {
  if (length <= 0) return 0;
  return (current + delta + length) % length;
}
