/**
 * In-game NPC trades (not via link cable). These are one-time trades with NPCs in the game world.
 * `receivedId`   — pokémon species ID you receive
 * `offeredId`    — pokémon species ID you must hand over
 * `location`     — human-readable location description
 * `versions`     — which game versions this trade exists in (empty = all versions in that gen)
 * `receivedOtName` — the OT name the game assigns to the received pokémon (used to detect if claimed)
 * `gen`          — generation the trade belongs to
 */
export interface NpcTradeEntry {
  receivedId: number;
  offeredId: number;
  location: string;
  versions?: string[];
  receivedOtName: string;
  gen: number;
  tradeIndex?: number; // The index of the trade in wCompletedInGameTradeFlags
}
