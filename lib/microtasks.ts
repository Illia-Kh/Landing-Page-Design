/**
 * Utility for breaking down heavy JavaScript tasks into microtasks
 * This helps reduce Total Blocking Time (TBT) by yielding control back to the browser
 */

/**
 * Yields control back to the browser using requestIdleCallback or setTimeout
 */
export function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(resolve, { timeout: 5 });
    } else {
      setTimeout(resolve, 0);
    }
  });
}

/**
 * Processes an array of items in chunks, yielding control between chunks
 * This prevents blocking the main thread for too long
 */
export async function processInChunks<T, R>(
  items: T[],
  processor: (item: T) => R,
  chunkSize: number = 10
): Promise<R[]> {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const chunkResults = chunk.map(processor);
    results.push(...chunkResults);
    
    // Yield control back to the browser
    if (i + chunkSize < items.length) {
      await yieldToMain();
    }
  }
  
  return results;
}

/**
 * Defers execution of a function until the browser is idle
 */
export function deferUntilIdle(fn: () => void): void {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(fn, { timeout: 100 });
  } else {
    setTimeout(fn, 0);
  }
}

/**
 * Creates a debounced function that yields control between calls
 */
export function createDebouncedFunction<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 16
): T {
  let timeoutId: NodeJS.Timeout;
  
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      deferUntilIdle(() => fn(...args));
    }, delay);
  }) as T;
}

/**
 * Schedules a task to run when the browser is idle
 */
export function scheduleIdleTask(task: () => void, timeout: number = 100): void {
  if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
    (window as any).scheduler.postTask(task, { priority: 'background' });
  } else if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(task, { timeout });
  } else {
    setTimeout(task, 0);
  }
}
