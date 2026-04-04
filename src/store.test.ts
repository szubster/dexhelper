import { expect, test, describe, beforeEach } from 'vitest';
import * as Store from './store';

// Helper to reset stores for tests
function resetStores() {
  Store.saveData.set(null);
  Store.error.set(null);
  Store.searchTerm.set('');
  Store.isSettingsOpen.set(false);
  Store.isVersionModalOpen.set(false);
  Store.settings.set({
    filters: [],
    manualVersion: null,
    isLivingDex: false,
    globalPokeball: 'poke',
  });
}

describe('AppStore (Nano Stores)', () => {
  beforeEach(() => {
    resetStores();
  });

  describe('Transient UI State', () => {
    test('searchTerm updates correctly', () => {
      expect(Store.searchTerm.get()).toBe('');
      Store.setSearchTerm('pikachu');
      expect(Store.searchTerm.get()).toBe('pikachu');
    });

    test('isSettingsOpen updates correctly', () => {
      expect(Store.isSettingsOpen.get()).toBe(false);
      Store.setIsSettingsOpen(true);
      expect(Store.isSettingsOpen.get()).toBe(true);
    });

    test('isVersionModalOpen updates correctly', () => {
      expect(Store.isVersionModalOpen.get()).toBe(false);
      Store.setIsVersionModalOpen(true);
      expect(Store.isVersionModalOpen.get()).toBe(true);
    });
  });

  describe('Persisted Settings', () => {
    test('toggleFilter works correctly', () => {
      Store.toggleFilter('secured');
      expect(Store.settings.get().filters).toContain('secured');

      Store.toggleFilter('missing');
      expect(Store.settings.get().filters).toContain('secured');
      expect(Store.settings.get().filters).toContain('missing');

      // Toggle off 'secured'
      Store.toggleFilter('secured');
      expect(Store.settings.get().filters).not.toContain('secured');
      expect(Store.settings.get().filters).toContain('missing');
    });

    test('setFilters replaces array', () => {
      Store.setFilters(['secured', 'dex-only']);
      expect(Store.settings.get().filters).toEqual(['secured', 'dex-only']);
    });

    test('setFilters to empty array', () => {
      Store.setFilters(['secured', 'missing']);
      Store.setFilters([]);
      expect(Store.settings.get().filters).toEqual([]);
    });

    test('manualVersion updates correctly', () => {
      Store.setManualVersion('red');
      expect(Store.settings.get().manualVersion).toBe('red');
    });

    test('isLivingDex updates correctly', () => {
      Store.setIsLivingDex(true);
      expect(Store.settings.get().isLivingDex).toBe(true);
    });

    test('globalPokeball updates correctly', () => {
      Store.setGlobalPokeball('ultra');
      expect(Store.settings.get().globalPokeball).toBe('ultra');
    });
  });

  describe('Derived State', () => {
    test('filtersSet computes correctly', () => {
      Store.setFilters(['secured', 'missing']);
      const result = Store.filtersSet.get();
      expect(result).toBeInstanceOf(Set);
      expect(result.has('secured')).toBe(true);
      expect(result.has('missing')).toBe(true);
      expect(result.has('dex-only')).toBe(false);
    });
  });

  describe('Save Data', () => {
    test('saveData sets correctly', () => {
      const mockSave = {
        trainerName: 'RED',
      } as any;

      Store.setSaveData(mockSave);
      expect(Store.saveData.get()).toBe(mockSave);
      expect(Store.saveData.get()?.trainerName).toBe('RED');

      Store.setSaveData(null);
      expect(Store.saveData.get()).toBeNull();
    });

    test('error updates correctly', () => {
      Store.setError('Parse failed');
      expect(Store.error.get()).toBe('Parse failed');

      Store.setError(null);
      expect(Store.error.get()).toBeNull();
    });
  });
});
