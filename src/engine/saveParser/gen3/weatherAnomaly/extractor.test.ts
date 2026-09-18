import { describe, expect, it } from 'vitest';
import { WEATHER_ANOMALY_VAR_RELATIVE_OFFSET } from './constants';
import { extractWeatherAnomaly } from './extractor';

describe('extractWeatherAnomaly', () => {
  it('should correctly extract an active weather anomaly', () => {
    const buffer = new ArrayBuffer(200); // increase buffer size
    const view = new DataView(buffer);
    const section1Offset = 10;
    const varOffset = section1Offset + WEATHER_ANOMALY_VAR_RELATIVE_OFFSET;

    view.setUint16(varOffset, 5, true); // Set locationId to 5

    const result = extractWeatherAnomaly(view, section1Offset);

    expect(result.isActive).toBe(true);
    expect(result.locationId).toBe(5);
  });

  it('should correctly extract an inactive weather anomaly', () => {
    const buffer = new ArrayBuffer(200); // increase buffer size
    const view = new DataView(buffer);
    const section1Offset = 10;
    const varOffset = section1Offset + WEATHER_ANOMALY_VAR_RELATIVE_OFFSET;

    view.setUint16(varOffset, 0, true); // Set locationId to 0

    const result = extractWeatherAnomaly(view, section1Offset);

    expect(result.isActive).toBe(false);
    expect(result.locationId).toBe(0);
  });

  it('should throw RangeError with specific message for out-of-bounds read', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    const section1Offset = 0; // offset would be 0 + 110, which is out of bounds for size 10

    expect(() => extractWeatherAnomaly(view, section1Offset)).toThrow(RangeError);
    expect(() => extractWeatherAnomaly(view, section1Offset)).toThrow('The save file is corrupted or incomplete.');
  });
});
