// Single-active preview: only one reel may play at a time across the whole site.
type Listener = () => void;
let active: string | null = null;
const listeners = new Set<Listener>();

export function getActivePreview(): string | null {
  return active;
}

export function setActivePreview(id: string | null): void {
  if (active === id) return;
  active = id;
  listeners.forEach((l) => l());
}

export function subscribePreview(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
