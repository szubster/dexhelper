import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prefetchMsgpack } from '../prefetchMsgpack';

describe('prefetchMsgpack', () => {
  beforeEach(() => {
    // Clear document head before each test
    // Ensure we are testing in a mocked document environment if it doesn't exist
    if (typeof document === 'undefined') {
      global.document = {
        head: {
          innerHTML: '',
          querySelector: vi.fn(),
          appendChild: vi.fn(),
          querySelectorAll: vi.fn(),
        },
        createElement: vi.fn(),
      } as unknown as Document;
    } else {
      document.head.innerHTML = '';
    }

    // Mock import.meta.env.BASE_URL
    vi.stubEnv('BASE_URL', '/');
  });

  it('should append prefetch link tags for gen1, gen2, and gen3 msgpack files', () => {
    // We have to mock the DOM if we are not in a browser environment
    const appendedLinks: Record<string, unknown>[] = [];
    const querySelectorMock = vi.fn().mockReturnValue(null);
    const createElementMock = vi.fn().mockImplementation((tag) => {
      if (tag === 'link') {
        return {
          rel: '',
          href: '',
          as: '',
          crossOrigin: '',
          getAttribute(name: string) {
            return (this as Record<string, unknown>)[name];
          },
        };
      }
      return {};
    });

    global.document = {
      head: {
        querySelector: querySelectorMock,
        appendChild: vi.fn().mockImplementation((el) => {
          appendedLinks.push(el);
        }),
      },
      createElement: createElementMock,
    } as unknown as Document;

    prefetchMsgpack();

    expect(appendedLinks).toHaveLength(3);

    const hrefs = appendedLinks.map((l) => l.href);
    expect(hrefs).toContain('/data/pokedata-gen1.msgpack');
    expect(hrefs).toContain('/data/pokedata-gen2.msgpack');
    expect(hrefs).toContain('/data/pokedata-gen3.msgpack');

    // Check attributes
    appendedLinks.forEach((link) => {
      expect(link.as).toBe('fetch');
      expect(link.crossOrigin).toBe('anonymous');
    });
  });

  it('should not append duplicate link tags if they already exist', () => {
    const appendedLinks: Record<string, unknown>[] = [];
    // Mock that one link already exists
    const querySelectorMock = vi.fn().mockImplementation((selector) => {
      if (selector.includes('pokedata-gen1.msgpack')) {
        return {}; // truthy, meaning it exists
      }
      return null;
    });
    const createElementMock = vi.fn().mockImplementation((tag) => {
      if (tag === 'link') {
        return {
          rel: '',
          href: '',
          as: '',
          crossOrigin: '',
        };
      }
      return {};
    });

    global.document = {
      head: {
        querySelector: querySelectorMock,
        appendChild: vi.fn().mockImplementation((el) => {
          appendedLinks.push(el);
        }),
      },
      createElement: createElementMock,
    } as unknown as Document;

    prefetchMsgpack();

    expect(appendedLinks).toHaveLength(2); // Should only append gen2 and gen3
  });

  it('should use import.meta.env.BASE_URL correctly', () => {
    vi.stubEnv('BASE_URL', '/dexhelper/');
    const appendedLinks: Record<string, unknown>[] = [];
    const querySelectorMock = vi.fn().mockReturnValue(null);
    const createElementMock = vi.fn().mockImplementation((tag) => {
      if (tag === 'link') return {};
      return {};
    });

    global.document = {
      head: {
        querySelector: querySelectorMock,
        appendChild: vi.fn().mockImplementation((el) => {
          appendedLinks.push(el);
        }),
      },
      createElement: createElementMock,
    } as unknown as Document;

    prefetchMsgpack();

    const hrefs = appendedLinks.map((l) => l.href);
    expect(hrefs).toContain('/dexhelper/data/pokedata-gen1.msgpack');
  });
});
