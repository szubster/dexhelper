import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prefetchMsgpack } from '../prefetchMsgpack';

type MockLink = { href?: string; as?: string; crossOrigin?: string; rel?: string };

describe('prefetchMsgpack', () => {
  beforeEach(() => {
    // Clear document head before each test
    // Ensure we are testing in a mocked document environment if it doesn't exist
    if (typeof document === 'undefined') {
      global.document = {
        head: {
          innerHTML: '',
          querySelector: vi.fn<(selector: string) => Element | null>(),
          appendChild: vi.fn<(node: Node) => Node>(),
          querySelectorAll: vi.fn<(selector: string) => NodeList>(),
        },
        createElement: vi.fn<(tagName: string) => HTMLElement>(),
      } as unknown as Document;
    } else {
      document.head.innerHTML = '';
    }

    // Mock import.meta.env.BASE_URL
    vi.stubEnv('BASE_URL', '/');
  });

  it('should append prefetch link tags for gen1, gen2, and gen3 msgpack files', () => {
    // We have to mock the DOM if we are not in a browser environment
    const appendedLinks: MockLink[] = [];
    const querySelectorMock = vi.fn<(selector: string) => Element | null>().mockReturnValue(null);
    const createElementMock = vi.fn<(tagName: string) => HTMLElement>().mockImplementation((tag: string) => {
      if (tag === 'link') {
        return {
          rel: '',
          href: '',
          as: '',
          crossOrigin: '',
          getAttribute(name: string) {
            return (this as Record<string, unknown>)[name];
          },
        } as unknown as HTMLElement;
      }
      return {} as HTMLElement;
    });

    global.document = {
      head: {
        querySelector: querySelectorMock,
        appendChild: vi.fn<(node: Node) => Node>().mockImplementation((el: Node) => {
          appendedLinks.push(el as unknown as MockLink);
          return el;
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
    const appendedLinks: MockLink[] = [];
    // Mock that one link already exists
    const querySelectorMock = vi.fn<(selector: string) => Element | null>().mockImplementation((selector: string) => {
      if (selector.includes('pokedata-gen1.msgpack')) {
        return {} as Element; // truthy, meaning it exists
      }
      return null;
    });
    const createElementMock = vi.fn<(tagName: string) => HTMLElement>().mockImplementation((tag: string) => {
      if (tag === 'link') {
        return {
          rel: '',
          href: '',
          as: '',
          crossOrigin: '',
        } as unknown as HTMLElement;
      }
      return {} as HTMLElement;
    });

    global.document = {
      head: {
        querySelector: querySelectorMock,
        appendChild: vi.fn<(node: Node) => Node>().mockImplementation((el: Node) => {
          appendedLinks.push(el as unknown as MockLink);
          return el;
        }),
      },
      createElement: createElementMock,
    } as unknown as Document;

    prefetchMsgpack();

    expect(appendedLinks).toHaveLength(2); // Should only append gen2 and gen3
  });

  it('should use import.meta.env.BASE_URL correctly', () => {
    vi.stubEnv('BASE_URL', '/dexhelper/');
    const appendedLinks: MockLink[] = [];
    const querySelectorMock = vi.fn<(selector: string) => Element | null>().mockReturnValue(null);
    const createElementMock = vi.fn<(tagName: string) => HTMLElement>().mockImplementation((tag: string) => {
      if (tag === 'link') return {} as HTMLElement;
      return {} as HTMLElement;
    });

    global.document = {
      head: {
        querySelector: querySelectorMock,
        appendChild: vi.fn<(node: Node) => Node>().mockImplementation((el: Node) => {
          appendedLinks.push(el as unknown as MockLink);
          return el;
        }),
      },
      createElement: createElementMock,
    } as unknown as Document;

    prefetchMsgpack();

    const hrefs = appendedLinks.map((l) => l.href);
    expect(hrefs).toContain('/dexhelper/data/pokedata-gen1.msgpack');
  });

  it('should return early if document is undefined', () => {
    const originalDocument = global.document;
    // @ts-expect-error Mocking missing document for test coverage
    delete global.document;

    expect(() => prefetchMsgpack()).not.toThrow();

    global.document = originalDocument;
  });

  it('should default to / if import.meta.env.BASE_URL is undefined', () => {
      // Mock import.meta.env.BASE_URL
      vi.stubEnv('BASE_URL', '');
      const appendedLinks: MockLink[] = [];
      const querySelectorMock = vi.fn<(selector: string) => Element | null>().mockReturnValue(null);
      const createElementMock = vi.fn<(tagName: string) => HTMLElement>().mockImplementation((tag: string) => {
        if (tag === 'link') return {} as HTMLElement;
        return {} as HTMLElement;
      });

      global.document = {
        head: {
          querySelector: querySelectorMock,
          appendChild: vi.fn<(node: Node) => Node>().mockImplementation((el: Node) => {
            appendedLinks.push(el as unknown as MockLink);
            return el;
          }),
        },
        createElement: createElementMock,
      } as unknown as Document;

      prefetchMsgpack();

      const hrefs = appendedLinks.map((l) => l.href);
      expect(hrefs).toContain('/data/pokedata-gen1.msgpack');
  });
});
