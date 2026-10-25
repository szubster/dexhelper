import { describe, expect, it, type Mock, vi } from 'vitest';
import type { SafariArea } from '../../engine/data/shared/safariZoneTypes';
import { getMissingSafariEncounters } from '../../engine/safariZone/missingEncounters';
import { useStore } from '../../store';
import { useSafariZoneMissingEncounters } from './useSafariZoneMissingEncounters';

vi.mock('react', () => ({
  useMemo: (fn: () => unknown) => fn(),
}));

vi.mock('../../store', () => ({
  useStore: vi.fn<() => unknown>(),
}));

vi.mock('../../engine/safariZone/missingEncounters', () => ({
  getMissingSafariEncounters: vi.fn<() => SafariArea[]>(),
}));

describe('useSafariZoneMissingEncounters', () => {
  it('should return empty array if no save data', () => {
    (useStore as unknown as Mock).mockReturnValue(null);

    const result = useSafariZoneMissingEncounters();

    expect(result).toEqual([]);
  });

  it('should call getMissingSafariEncounters for gen 1 save', () => {
    const mockSaveData = { generation: 1, gameVersion: 'red' };
    (useStore as unknown as Mock).mockReturnValue(mockSaveData);

    const mockEncounters = [{ name: 'Test', encounters: {} }];
    (getMissingSafariEncounters as Mock).mockReturnValue(mockEncounters);

    const result = useSafariZoneMissingEncounters();

    expect(getMissingSafariEncounters).toHaveBeenCalledWith(mockSaveData);
    expect(result).toEqual(mockEncounters);
  });

  it('should call getMissingSafariEncounters for gen 3 save', () => {
    const mockSaveData = { generation: 3, gameVersion: 'emerald' };
    (useStore as unknown as Mock).mockReturnValue(mockSaveData);

    const mockEncounters = [{ name: 'Test Gen 3', encounters: {} }];
    (getMissingSafariEncounters as Mock).mockReturnValue(mockEncounters);

    const result = useSafariZoneMissingEncounters();

    expect(getMissingSafariEncounters).toHaveBeenCalledWith(mockSaveData);
    expect(result).toEqual(mockEncounters);
  });
});
