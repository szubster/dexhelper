export const GEN2_TM_HM_TO_MOVE_ID: Record<number, number> = {
  191: 223, // TM01 - DynamicPunch
  192: 29, // TM02 - Headbutt
  193: 174, // TM03 - Curse
  194: 205, // TM04 - Rollout
  195: 46, // TM05 - Roar
  196: 92, // TM06 - Toxic
  197: 192, // TM07 - Zap Cannon
  198: 249, // TM08 - Rock Smash
  199: 244, // TM09 - Psych Up
  200: 237, // TM10 - Hidden Power
  201: 241, // TM11 - Sunny Day
  202: 230, // TM12 - Sweet Scent
  203: 173, // TM13 - Snore
  204: 59, // TM14 - Blizzard
  205: 63, // TM15 - Hyper Beam
  206: 196, // TM16 - Icy Wind
  207: 182, // TM17 - Protect
  208: 240, // TM18 - Rain Dance
  209: 202, // TM19 - Giga Drain
  210: 203, // TM20 - Endure
  211: 218, // TM21 - Frustration
  212: 76, // TM22 - SolarBeam
  213: 231, // TM23 - Iron Tail
  214: 225, // TM24 - DragonBreath
  215: 87, // TM25 - Thunder
  216: 89, // TM26 - Earthquake
  217: 216, // TM27 - Return
  218: 91, // TM28 - Dig
  219: 94, // TM29 - Psychic
  220: 247, // TM30 - Shadow Ball
  221: 189, // TM31 - Mud-Slap
  222: 104, // TM32 - Double Team
  223: 8, // TM33 - Ice Punch
  224: 207, // TM34 - Swagger
  225: 214, // TM35 - Sleep Talk
  226: 188, // TM36 - Sludge Bomb
  227: 201, // TM37 - Sandstorm
  228: 126, // TM38 - Fire Blast
  229: 129, // TM39 - Swift
  230: 111, // TM40 - Defense Curl
  231: 9, // TM41 - ThunderPunch
  232: 138, // TM42 - Dream Eater
  233: 197, // TM43 - Detect
  234: 156, // TM44 - Rest
  235: 213, // TM45 - Attract
  236: 168, // TM46 - Thief
  237: 211, // TM47 - Steel Wing
  238: 7, // TM48 - Fire Punch
  239: 210, // TM49 - Fury Cutter
  240: 171, // TM50 - Nightmare
  241: 15, // HM01 - Cut
  242: 19, // HM02 - Fly
  243: 57, // HM03 - Surf
  244: 70, // HM04 - Strength
  245: 148, // HM05 - Flash
  246: 250, // HM06 - Whirlpool
  247: 127, // HM07 - Waterfall
};

export const GEN2_TM_EVENT_FLAGS: Record<number, number> = {
  221: 8, // TM31
  239: 9, // TM49
  191: 10, // TM01
  235: 11, // TM45
  220: 12, // TM30
  213: 13, // TM23
  206: 14, // TM16
  214: 15, // TM24
  203: 59, // TM13
  198: 72, // TM08
  195: 75, // TM05
  240: 80, // TM50
  200: 85, // TM10
  226: 86, // TM36
  192: 92, // TM02
  237: 113, // TM47
  227: 114, // TM37
  202: 119, // TM12
  193: 206, // TM03
  209: 208, // TM19
  196: 209, // TM06
  197: 211, // TM07
  232: 212, // TM42
  219: 215, // TM29
};

const BITS_PER_BYTE_SHIFT = 3;
const BIT_INDEX_MASK = 7;

export function parseGen2TMFlags(eventFlags: Uint8Array): Record<number, boolean> {
  const flags: Record<number, boolean> = {};
  for (const [idStr, flag] of Object.entries(GEN2_TM_EVENT_FLAGS)) {
    const id = parseInt(idStr, 10);
    const byteIndex = flag >> BITS_PER_BYTE_SHIFT;
    const bitIndex = flag & BIT_INDEX_MASK;
    flags[id] = eventFlags[byteIndex] !== undefined && (eventFlags[byteIndex] & (1 << bitIndex)) !== 0;
  }
  return flags;
}
