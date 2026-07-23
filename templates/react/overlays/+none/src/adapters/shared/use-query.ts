import { useCallback, useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseQueryOptions {
  /** Re-use cached data matching this key. Omit to skip cache. */
  readonly cacheKey?: string;
  /** Milliseconds to keep cached data. Default: 5 000. */
  readonly cacheTime?: number;
  /** Poll every N ms. Omit to disable. */
  readonly refetchInterval?: number;
  /** Set to false to pause execution. Default: true. */
  readonly enabled?: boolean;
}

interface UseQueryResult<T> {
  readonly data: T | null;
  readonly status: Status;
  readonly error: Error | null;
  readonly refetch: () => Promise<void>;
}

// ── in-memory cache ──────────────────────────────────────────────

interface CacheEntry<T> {
  readonly data: T;
  readonly expiry: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

function readCache<T>(key: string): T | undefined {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return undefined;
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return undefined;
  }
  return entry.data;
}

function writeCache<T>(key: string, data: T, ttl: number): void {
  cache.set(key, { data, expiry: Date.now() + ttl });
}

// ── hook ─────────────────────────────────────────────────────────

const DEFAULT_CACHE_TIME = 5_000;

/**
 * Bridges a use-case read operation to React state with optional
 * caching and polling.
 */
export function useQuery<T>(
  queryFn: () => Promise<T>,
  options: UseQueryOptions = {}
): UseQueryResult<T> {
  const { cacheKey, cacheTime = DEFAULT_CACHE_TIME, refetchInterval, enabled = true } = options;

  const [data, setData] = useState<T | null>(() =>
    cacheKey ? (readCache<T>(cacheKey) ?? null) : null
  );
  const [status, setStatus] = useState<Status>(() => (cacheKey && readCache<T>(cacheKey) != null ? 'success' : 'idle'));
  const [error, setError] = useState<Error | null>(null);

  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const refetch = useCallback(async () => {
    if (!enabled) return;

    setStatus('loading');
    setError(null);

    try {
      const result = await queryFnRef.current();
      setData(result);
      setStatus('success');
      if (optionsRef.current.cacheKey) {
        writeCache(optionsRef.current.cacheKey, result, optionsRef.current.cacheTime ?? DEFAULT_CACHE_TIME);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      setStatus('error');
    }
  }, [enabled]);

  // initial fetch
  useEffect(() => {
    if (!enabled) return;
    if (cacheKey && readCache<T>(cacheKey) != null) return;
    void refetch();
  }, [refetch, enabled, cacheKey]);

  // interval
  useEffect(() => {
    if (!enabled || !refetchInterval || refetchInterval <= 0) return;
    const id = setInterval(() => void refetch(), refetchInterval);
    return () => clearInterval(id);
  }, [refetch, enabled, refetchInterval]);

  return { data, status, error, refetch };
}
