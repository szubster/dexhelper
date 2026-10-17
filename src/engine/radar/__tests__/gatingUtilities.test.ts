import { describe, expect, it, vi } from 'vitest';
import { evaluateRequirement } from '../gatingUtilities';
import type { GatingContext } from '../types';

describe('evaluateRequirement', () => {
  const createMockContext = (overrides?: Partial<GatingContext>): GatingContext => ({
    hasItem: vi.fn<(itemId: string) => boolean>().mockReturnValue(false),
    hasHM: vi.fn<(hmId: string) => boolean>().mockReturnValue(false),
    hasBike: vi.fn<(bikeType: 'mach' | 'acro' | 'any') => boolean>().mockReturnValue(false),
    ...overrides,
  });

  it('evaluates item requirements', () => {
    const context = createMockContext({
      hasItem: vi.fn<(itemId: string) => boolean>().mockImplementation((id) => id === 'storage_key'),
    });
    expect(evaluateRequirement({ type: 'item', itemId: 'storage_key' }, context)).toBe(true);
    expect(evaluateRequirement({ type: 'item', itemId: 'old_rod' }, context)).toBe(false);
  });

  it('evaluates hm requirements', () => {
    const context = createMockContext({
      hasHM: vi.fn<(hmId: string) => boolean>().mockImplementation((id) => id === 'surf'),
    });
    expect(evaluateRequirement({ type: 'hm', hmId: 'surf' }, context)).toBe(true);
    expect(evaluateRequirement({ type: 'hm', hmId: 'dive' }, context)).toBe(false);
  });

  it('evaluates bike requirements', () => {
    const context = createMockContext({
      hasBike: vi.fn<(bikeType: 'mach' | 'acro' | 'any') => boolean>().mockImplementation((type) => type === 'acro'),
    });
    expect(evaluateRequirement({ type: 'bike', bikeType: 'acro' }, context)).toBe(true);
    expect(evaluateRequirement({ type: 'bike', bikeType: 'mach' }, context)).toBe(false);
  });

  it('evaluates logical AND requirements', () => {
    const context = createMockContext({
      hasHM: vi.fn<(hmId: string) => boolean>().mockImplementation((id) => id === 'dive'),
      hasItem: vi.fn<(itemId: string) => boolean>().mockImplementation((id) => id === 'storage_key'),
    });
    const req = {
      type: 'logical' as const,
      operator: 'AND' as const,
      requirements: [
        { type: 'hm' as const, hmId: 'dive' },
        { type: 'item' as const, itemId: 'storage_key' },
      ],
    };
    expect(evaluateRequirement(req, context)).toBe(true);
  });

  it('evaluates logical AND requirements - failure (missing one)', () => {
    const context = createMockContext({
      hasHM: vi.fn<(hmId: string) => boolean>().mockImplementation((id) => id === 'dive'),
      hasItem: vi.fn<(itemId: string) => boolean>().mockReturnValue(false),
    });
    const req = {
      type: 'logical' as const,
      operator: 'AND' as const,
      requirements: [
        { type: 'hm' as const, hmId: 'dive' },
        { type: 'item' as const, itemId: 'storage_key' },
      ],
    };
    expect(evaluateRequirement(req, context)).toBe(false);
  });

  it('evaluates logical OR requirements', () => {
    const context = createMockContext({
      hasBike: vi.fn<(bikeType: 'mach' | 'acro' | 'any') => boolean>().mockImplementation((type) => type === 'acro'),
    });
    const req = {
      type: 'logical' as const,
      operator: 'OR' as const,
      requirements: [
        { type: 'bike' as const, bikeType: 'mach' as const },
        { type: 'bike' as const, bikeType: 'acro' as const },
      ],
    };
    expect(evaluateRequirement(req, context)).toBe(true);
  });

  it('evaluates logical OR requirements - failure (missing all)', () => {
    const context = createMockContext({
      hasBike: vi.fn<(bikeType: 'mach' | 'acro' | 'any') => boolean>().mockReturnValue(false),
    });
    const req = {
      type: 'logical' as const,
      operator: 'OR' as const,
      requirements: [
        { type: 'bike' as const, bikeType: 'mach' as const },
        { type: 'bike' as const, bikeType: 'acro' as const },
      ],
    };
    expect(evaluateRequirement(req, context)).toBe(false);
  });

  it('evaluates unknown logical operators gracefully', () => {
    const context = createMockContext();
    const req = {
      type: 'logical' as const,
      // biome-ignore lint/suspicious/noExplicitAny: Testing graceful degradation
      operator: 'UNKNOWN' as any,
      requirements: [],
    };
    expect(evaluateRequirement(req, context)).toBe(false);
  });

  it('evaluates unknown requirement types gracefully', () => {
    const context = createMockContext();
    const req = {
      // biome-ignore lint/suspicious/noExplicitAny: Testing graceful degradation
      type: 'unknown' as any,
      // biome-ignore lint/suspicious/noExplicitAny: Testing graceful degradation
    } as any;
    expect(evaluateRequirement(req, context)).toBe(false);
  });
});
