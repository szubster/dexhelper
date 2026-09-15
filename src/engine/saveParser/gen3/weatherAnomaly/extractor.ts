import { WEATHER_ANOMALY_VAR_RELATIVE_OFFSET } from './constants';
import type { Gen3WeatherAnomaly } from './types';

/**
 * Extracts the active weather anomaly from a Gen 3 save file.
 *
 * @param view - The DataView of the save file.
 * @param section1Offset - The resolved offset to Section 1 (SaveBlock1)
 * @returns The extracted weather anomaly data.
 * @throws {RangeError} If the save file is corrupted or incomplete.
 */
export function extractWeatherAnomaly(view: DataView, section1Offset: number): Gen3WeatherAnomaly {
  try {
    const varOffset = section1Offset + WEATHER_ANOMALY_VAR_RELATIVE_OFFSET;

    // Check bounds BEFORE reading to explicitly throw RangeError if needed
    if (varOffset < 0 || varOffset + 2 > view.byteLength) {
      throw new RangeError('The save file is corrupted or incomplete.');
    }

    const locationId = view.getUint16(varOffset, true); // true for little-endian

    return {
      isActive: locationId !== 0,
      locationId: locationId,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new RangeError('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
