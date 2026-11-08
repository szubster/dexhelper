export interface BaseStats {
  hp: number;
  atk: number;
  def: number;
  spatk: number;
  spdef: number;
  spd: number;
}

export function calculateStatAdvantage(attackerStats: BaseStats, defenderStats: BaseStats): number {
  let advantage = 0;

  // Physical Advantage
  if (attackerStats.atk > defenderStats.def) {
    advantage += 1;
  } else if (attackerStats.atk < defenderStats.def) {
    advantage -= 1;
  }

  // Special Advantage
  if (attackerStats.spatk > defenderStats.spdef) {
    advantage += 1;
  } else if (attackerStats.spatk < defenderStats.spdef) {
    advantage -= 1;
  }

  // Speed Advantage
  if (attackerStats.spd > defenderStats.spd) {
    advantage += 1;
  } else if (attackerStats.spd < defenderStats.spd) {
    advantage -= 1;
  }

  // HP Advantage
  if (attackerStats.hp > defenderStats.hp) {
    advantage += 1;
  } else if (attackerStats.hp < defenderStats.hp) {
    advantage -= 1;
  }

  return advantage;
}
