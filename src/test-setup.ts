import 'fake-indexeddb/auto';
import { vi } from 'vitest';

// Mock other browser APIs if needed
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn<(query: string) => MediaQueryList>().mockImplementation(
    (query) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn<() => void>(), // deprecated
        removeListener: vi.fn<() => void>(), // deprecated
        addEventListener: vi.fn<() => void>(),
        removeEventListener: vi.fn<() => void>(),
        dispatchEvent: vi.fn<() => void>(),
      }) as unknown as MediaQueryList,
  ),
});
