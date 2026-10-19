import { describe, expect, it, type Mock, vi } from 'vitest';
import type { SafariArea } from '../../engine/data/shared/safariZoneTypes';
import { getMissingGen1SafariEncounters } from '../../engine/safariZone/gen1/missingEncounters';
import { getMissingGen3SafariEncounters } from '../../engine/safariZone/gen3/missingEncounters';
import { useStore } from '../../store';
import { useSafariZoneMissingEncounters } from './useSafariZoneMissingEncounters';

vi.mock('react', () => ({
  useMemo: (fn: () => unknown) => fn(),
}));

vi.mock('../../store', () => ({
  useStore: vi.fn<() => unknown>(),
}));

vi.mock('../../engine/safariZone/gen1/missingEncounters', () => ({
  getMissingGen1SafariEncounters: vi.fn<() => SafariArea[]>(),
}));

vi.mock('../../engine/safariZone/gen3/missingEncounters', () => ({
  getMissingGen3SafariEncounters: vi.fn<() => SafariArea[]>(),
}));

describe('useSafariZoneMissingEncounters', () => {
  it('should return empty array if no save data', () => {
    (useStore as unknown as Mock).mockReturnValue(null);

    const result = useSafariZoneMissingEncounters();

    expect(result).toEqual([]);
  });

  it('should call gen 1 function for gen 1 save', () => {
    const mockSaveData = { generation: 1 };
    (useStore as unknown as Mock).mockReturnValue(mockSaveData);

    const mockEncounters = [{ name: 'Test', encounters: {} }];
    (getMissingGen1SafariEncounters as Mock).mockReturnValue(mockEncounters);

    const result = useSafariZoneMissingEncounters();

    expect(getMissingGen1SafariEncounters).toHaveBeenCalledWith(mockSaveData);
    expect(result).toEqual(mockEncounters);
  });

  it('should call gen 3 function for gen 3 save', () => {
    const mockSaveData = { generation: 3 };
    (useStore as unknown as Mock).mockReturnValue(mockSaveData);

    const mockEncounters = [{ name: 'Test Gen 3', encounters: {} }];
    (getMissingGen3SafariEncounters as Mock).mockReturnValue(mockEncounters);

    const result = useSafariZoneMissingEncounters();

    expect(getMissingGen3SafariEncounters).toHaveBeenCalledWith(mockSaveData);
    expect(result).toEqual(mockEncounters);
  });

  it('should return empty array for unsupported generation', () => {
    const mockSaveData = { generation: 2 };
    (useStore as unknown as Mock).mockReturnValue(mockSaveData);

    const result = useSafariZoneMissingEncounters();

    expect(result).toEqual([]);
  });
});
