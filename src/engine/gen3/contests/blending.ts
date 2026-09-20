export interface BerryProfile {
  spicy: number;
  dry: number;
  sweet: number;
  bitter: number;
  sour: number;
  feel: number;
}

export interface PokeblockProfile {
  spicy: number;
  dry: number;
  sweet: number;
  bitter: number;
  sour: number;
  feel: number;
}

export function calculatePokeblockProfile(berries: BerryProfile[], numPlayers: number): PokeblockProfile {
  if (berries.length === 0) {
    return { spicy: 0, dry: 0, sweet: 0, bitter: 0, sour: 0, feel: 0 };
  }

  // Divisor for flavor calculation
  const flavorDivisor = Math.max(1, numPlayers - 1);

  let spicySum = 0;
  let drySum = 0;
  let sweetSum = 0;
  let bitterSum = 0;
  let sourSum = 0;

  let totalFeel = 0;
  let minFeel = Infinity;

  for (const berry of berries) {
    spicySum += berry.spicy;
    drySum += berry.dry;
    sweetSum += berry.sweet;
    bitterSum += berry.bitter;
    sourSum += berry.sour;

    totalFeel += berry.feel;
    if (berry.feel < minFeel) {
      minFeel = berry.feel;
    }
  }

  // Negative flavors in Gen 3 blending (Opposite flavors):
  // Spicy minus Sour
  // Dry minus Spicy
  // Sweet minus Dry
  // Bitter minus Sweet
  // Sour minus Bitter
  const finalSpicy = Math.floor(Math.max(0, spicySum - sourSum) / flavorDivisor);
  const finalDry = Math.floor(Math.max(0, drySum - spicySum) / flavorDivisor);
  const finalSweet = Math.floor(Math.max(0, sweetSum - drySum) / flavorDivisor);
  const finalBitter = Math.floor(Math.max(0, bitterSum - sweetSum) / flavorDivisor);
  const finalSour = Math.floor(Math.max(0, sourSum - bitterSum) / flavorDivisor);

  // Feel
  const averageFeel = Math.floor(totalFeel / berries.length);
  const feel = Math.max(averageFeel, minFeel);

  return {
    spicy: finalSpicy,
    dry: finalDry,
    sweet: finalSweet,
    bitter: finalBitter,
    sour: finalSour,
    feel,
  };
}
