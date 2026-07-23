import { useCallback, useRef, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseMutationOptions<TInput, TOutput> {
  readonly onSuccess?: (data: TOutput, input: TInput) => void;
  readonly onError?: (error: Error, input: TInput) => void;
}

interface UseMutationResult<TInput, TOutput> {
  readonly execute: (input: TInput) => Promise<TOutput>;
  readonly data: TOutput | null;
  readonly status: Status;
  readonly error: Error | null;
  readonly reset: () => void;
}

/**
 * Bridges a use-case write operation to React state.
 */
export function useMutation<TInput, TOutput>(
  mutator: (input: TInput) => Promise<TOutput>,
  options: UseMutationOptions<TInput, TOutput> = {}
): UseMutationResult<TInput, TOutput> {
  const [data, setData] = useState<TOutput | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<Error | null>(null);

  const optionsRef = useRef(options);
  optionsRef.current = options;
  const mutatorRef = useRef(mutator);
  mutatorRef.current = mutator;

  const execute = useCallback(async (input: TInput): Promise<TOutput> => {
    setStatus('loading');
    setError(null);

    try {
      const result = await mutatorRef.current(input);
      setData(result);
      setStatus('success');
      optionsRef.current.onSuccess?.(result, input);
      return result;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      setError(err);
      setStatus('error');
      optionsRef.current.onError?.(err, input);
      throw e;
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { execute, data, status, error, reset };
}
