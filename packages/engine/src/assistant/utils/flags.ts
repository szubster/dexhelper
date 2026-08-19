/**
 * Checks if a specific bit flag is set within a continuous byte array.
 * Used primarily for validating whether in-game event flags (like catching a static encounter
 * or claiming a gift Pokémon) have been triggered in the player's save file.
 *
 * @param flags - The raw byte array extracted from the save file representing a block of event flags.
 * @param flagId - The specific zero-indexed bit ID to check.
 * @returns True if the bit is set (1), false if it is unset (0) or if the inputs are invalid.
 */
export function checkFlag(flags: Uint8Array | undefined, flagId: number | undefined): boolean {
  if (!flags || flagId === undefined) return false;
  const byteIndex = flagId >> 3;
  const bitIndex = flagId & 7;
  const byte = flags[byteIndex];
  if (byte === undefined) return false;
  return (byte & (1 << bitIndex)) !== 0;
}
