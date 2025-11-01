const DEFAULT_TTL = 1000 * 60 * 60 * 24;

interface CacheEntry<T> {
  value: T;
  expiry: number;
}
export class ExpiringCache {
  private static instance: ExpiringCache;
  private cache: Map<string, CacheEntry<any>>;

  private constructor() {
    this.cache = new Map<string, CacheEntry<any>>();
  }

  public static getInstance(): ExpiringCache {
    if (!ExpiringCache.instance) {
      ExpiringCache.instance = new ExpiringCache();
    }
    return ExpiringCache.instance;
  }
  public set<T>(key: string, value: T, ttl_ms: number = DEFAULT_TTL): void {
    const now = Date.now();
    const expiry = now + ttl_ms;
    const entry: CacheEntry<T> = { value, expiry };
    this.cache.set(key, entry);
    
    setTimeout(() => {
      const currentEntry = this.cache.get(key);
      if (currentEntry && currentEntry.expiry === expiry) {
        this.cache.delete(key);
      }
    }, ttl_ms);
  }
  public get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    const now = Date.now();
    
    if (now > entry.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.value as T;
  }
  public delete(key: string): void {
    this.cache.delete(key);
  }
  public clear(): void {
    this.cache.clear();
  }
}