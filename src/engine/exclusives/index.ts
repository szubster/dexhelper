import { getUnobtainableReason as gen1UnobtainableReason } from "./gen1Exclusives";

export { getUnobtainableReason, ONE_TIME_CHOICES } from "./gen1Exclusives";

export type UnobtainableChecker = (
	pokemonId: number,
	gameVersion: string,
	ownedCount: number,
	ownedSet: Set<number>,
) => string | null;

const EXCLUSIVES_CHECKERS: Record<number, UnobtainableChecker> = {
	1: gen1UnobtainableReason,
	// Future: 2: gen2UnobtainableReason, etc.
};

/** Get the version-exclusives checker for a generation. Returns null if none exists. */
export function getExclusivesChecker(
	generation: number,
): UnobtainableChecker | null {
	return EXCLUSIVES_CHECKERS[generation] ?? null;
}
