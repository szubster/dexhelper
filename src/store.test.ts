import { beforeEach, describe, expect, it } from "vitest";
import { useStore } from "./store";

describe("Zustand Store", () => {
	beforeEach(() => {
		// Reset the store state before each test
		useStore.setState({
			saveData: null,
			error: null,
			filters: [],
			manualVersion: null,
			isLivingDex: false,
			globalPokeball: "poke",
			searchTerm: "",
			isSettingsOpen: false,
			isVersionModalOpen: false,
		});
	});

	describe("UI state", () => {
		it("should toggle search term", () => {
			useStore.getState().setSearchTerm("pikachu");
			expect(useStore.getState().searchTerm).toBe("pikachu");
		});

		it("should toggle settings modal", () => {
			expect(useStore.getState().isSettingsOpen).toBe(false);
			useStore.getState().setIsSettingsOpen(true);
			expect(useStore.getState().isSettingsOpen).toBe(true);
		});

		it("should toggle version modal", () => {
			expect(useStore.getState().isVersionModalOpen).toBe(false);
			useStore.getState().setIsVersionModalOpen(true);
			expect(useStore.getState().isVersionModalOpen).toBe(true);
		});
	});

	describe("Settings state", () => {
		it("should toggle filters", () => {
			useStore.getState().toggleFilter("secured");
			expect(useStore.getState().filters).toContain("secured");

			useStore.getState().toggleFilter("missing");
			expect(useStore.getState().filters).toContain("secured");
			expect(useStore.getState().filters).toContain("missing");

			// Toggle off
			useStore.getState().toggleFilter("secured");
			expect(useStore.getState().filters).not.toContain("secured");
			expect(useStore.getState().filters).toContain("missing");
		});

		it("should set filters directly", () => {
			useStore.getState().setFilters(["secured", "dex-only"]);
			expect(useStore.getState().filters).toEqual(["secured", "dex-only"]);
		});

		it("should clear filters", () => {
			useStore.getState().setFilters(["secured", "missing"]);
			useStore.getState().setFilters([]);
			expect(useStore.getState().filters).toEqual([]);
		});

		it("should set manual version", () => {
			useStore.getState().setManualVersion("red");
			expect(useStore.getState().manualVersion).toBe("red");
		});

		it("should set living dex mode", () => {
			useStore.getState().setIsLivingDex(true);
			expect(useStore.getState().isLivingDex).toBe(true);
		});

		it("should set global pokeball", () => {
			useStore.getState().setGlobalPokeball("ultra");
			expect(useStore.getState().globalPokeball).toBe("ultra");
		});
	});

	describe("filtersSet helper", () => {
		it("should return a Set of the current filters", () => {
			useStore.getState().setFilters(["secured", "missing"]);
			const result = useStore.getState().filtersSet();
			expect(result).toBeInstanceOf(Set);
			expect(result.has("secured")).toBe(true);
			expect(result.has("missing")).toBe(true);
			expect(result.has("dex-only")).toBe(false);
		});
	});

	describe("Save data", () => {
		it("should set and clear save data", () => {
			const mockSave = {
				generation: 1,
				gameVersion: "red" as const,
				trainerName: "RED",
				trainerId: 12345,
				badges: 8,
				owned: new Set([1, 4, 7]),
				seen: new Set([1, 4, 7, 25]),
				party: [25],
				pc: [1, 4],
				inventory: [],
				currentMapId: 0,
				currentBoxCount: 1,
				hallOfFameCount: 0,
				eventFlags: new Uint8Array(300),
				partyDetails: [],
				pcDetails: [],
			};

			useStore.getState().setSaveData(mockSave);
			expect(useStore.getState().saveData).toBe(mockSave);
			expect(useStore.getState().saveData?.trainerName).toBe("RED");

			useStore.getState().setSaveData(null);
			expect(useStore.getState().saveData).toBeNull();
		});

		it("should set and clear error", () => {
			useStore.getState().setError("Parse failed");
			expect(useStore.getState().error).toBe("Parse failed");

			useStore.getState().setError(null);
			expect(useStore.getState().error).toBeNull();
		});
	});
});
