import { describe, expect, it } from "vitest";
import { GENERATION_CONFIGS, getGenerationConfig } from "./generationConfig";

describe("getGenerationConfig", () => {
  it("should return the correct configuration for an existing generation (Gen 1)", () => {
    const config = getGenerationConfig(1);
    expect(config).toBe(GENERATION_CONFIGS[1]);
    expect(config.id).toBe(1);
  });

  it("should return the correct configuration for an existing generation (Gen 2)", () => {
    const config = getGenerationConfig(2);
    expect(config).toBe(GENERATION_CONFIGS[2]);
    expect(config.id).toBe(2);
  });

  it("should fall back to Gen 1 configuration for an unknown generation (e.g. Gen 3)", () => {
    const config = getGenerationConfig(3);
    // Since Gen 3 is not yet implemented/registered, it should return Gen 1 fallback.
    expect(config).toBe(GENERATION_CONFIGS[1]);
  });

  it("should fall back to Gen 1 configuration for generation 0", () => {
    const config = getGenerationConfig(0);
    expect(config).toBe(GENERATION_CONFIGS[1]);
  });

  it("should fall back to Gen 1 configuration for negative generation numbers", () => {
    const config = getGenerationConfig(-1);
    expect(config).toBe(GENERATION_CONFIGS[1]);
  });

  it("should fall back to Gen 1 configuration for an arbitrarily large generation number", () => {
    const config = getGenerationConfig(999);
    expect(config).toBe(GENERATION_CONFIGS[1]);
  });
});
