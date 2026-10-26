/**
 * Formats standard version exclusive lockout message.
 */
export function formatVersionExclusiveReason(gameVersion: string): string {
  const capitalized = gameVersion.charAt(0).toUpperCase() + gameVersion.slice(1);
  return `This Pokémon is not available in ${capitalized}. Must be traded from another version.`;
}
