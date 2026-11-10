import "server-only";

export interface ProcessedEventStore {
  has(id: string): Promise<boolean>;
  add(id: string): Promise<void>;
}

// Memory store keeps the last few thousand event IDs per server instance.
// Swap for a shared store (Vercel KV, Redis, or a database table) in production.
class MemoryEventStore implements ProcessedEventStore {
  private ids = new Set<string>();
  async has(id: string) {
    return this.ids.has(id);
  }
  async add(id: string) {
    this.ids.add(id);
    if (this.ids.size > 5000) {
      const oldest = this.ids.values().next().value;
      if (oldest) this.ids.delete(oldest);
    }
  }
}

export const processedEvents: ProcessedEventStore = new MemoryEventStore();
