# Memory Offsets for Move PPs and Known Good Item Lists

## Gen 1 Data Structure
In Generation 1, the Pokémon data structure is 44 bytes long. The Move PP values are stored in 4 consecutive bytes:
- Move 1 PP: `0x1D` (29)
- Move 2 PP: `0x1E` (30)
- Move 3 PP: `0x1F` (31)
- Move 4 PP: `0x20` (32)

Note: The lowest 6 bits represent the current PP, and the highest 2 bits represent the number of PP Ups applied.

## Gen 2 Data Structure
In Generation 2, the Pokémon data structure is 48 bytes long. The Move PP values are stored in 4 consecutive bytes:
- Move 1 PP: `0x17` (23)
- Move 2 PP: `0x18` (24)
- Move 3 PP: `0x19` (25)
- Move 4 PP: `0x1A` (26)

Like Gen 1, the lowest 6 bits represent current PP, and the highest 2 bits represent PP Ups.

## Known Good Item Lists
See the `gen1_items_table.md` for the known good Gen 1 item list.

## Base PP Values
See the `moves_table.md` for the base PP values for Gen 1 and Gen 2 moves.

## Gen 1 Items
| Hex | Dec | Item Name |
|---|---|---|
| 0x00 | 0 | NO_ITEM |
| 0x01 | 1 | MASTER_BALL |
| 0x02 | 2 | ULTRA_BALL |
| 0x03 | 3 | GREAT_BALL |
| 0x04 | 4 | POKE_BALL |
| 0x05 | 5 | TOWN_MAP |
| 0x06 | 6 | BICYCLE |
| 0x07 | 7 | SURFBOARD |
| 0x08 | 8 | SAFARI_BALL |
| 0x09 | 9 | POKEDEX |
| 0x0A | 10 | MOON_STONE |
| 0x0B | 11 | ANTIDOTE |
| 0x0C | 12 | BURN_HEAL |
| 0x0D | 13 | ICE_HEAL |
| 0x0E | 14 | AWAKENING |
| 0x0F | 15 | PARLYZ_HEAL |
| 0x10 | 16 | FULL_RESTORE |
| 0x11 | 17 | MAX_POTION |
| 0x12 | 18 | HYPER_POTION |
| 0x13 | 19 | SUPER_POTION |
| 0x14 | 20 | POTION |
| 0x15 | 21 | BOULDERBADGE |
| 0x16 | 22 | CASCADEBADGE |
| 0x17 | 23 | THUNDERBADGE |
| 0x18 | 24 | RAINBOWBADGE |
| 0x19 | 25 | SOULBADGE |
| 0x1A | 26 | MARSHBADGE |
| 0x1B | 27 | VOLCANOBADGE |
| 0x1C | 28 | EARTHBADGE |
| 0x1D | 29 | ESCAPE_ROPE |
| 0x1E | 30 | REPEL |
| 0x1F | 31 | OLD_AMBER |
| 0x20 | 32 | FIRE_STONE |
| 0x21 | 33 | THUNDER_STONE |
| 0x22 | 34 | WATER_STONE |
| 0x23 | 35 | HP_UP |
| 0x24 | 36 | PROTEIN |
| 0x25 | 37 | IRON |
| 0x26 | 38 | CARBOS |
| 0x27 | 39 | CALCIUM |
| 0x28 | 40 | RARE_CANDY |
| 0x29 | 41 | DOME_FOSSIL |
| 0x2A | 42 | HELIX_FOSSIL |
| 0x2B | 43 | SECRET_KEY |
| 0x2C | 44 | ITEM_2C |
| 0x2D | 45 | BIKE_VOUCHER |
| 0x2E | 46 | X_ACCURACY |
| 0x2F | 47 | LEAF_STONE |
| 0x30 | 48 | CARD_KEY |
| 0x31 | 49 | NUGGET |
| 0x32 | 50 | ITEM_32 |
| 0x33 | 51 | POKE_DOLL |
| 0x34 | 52 | FULL_HEAL |
| 0x35 | 53 | REVIVE |
| 0x36 | 54 | MAX_REVIVE |
| 0x37 | 55 | GUARD_SPEC |
| 0x38 | 56 | SUPER_REPEL |
| 0x39 | 57 | MAX_REPEL |
| 0x3A | 58 | DIRE_HIT |
| 0x3B | 59 | COIN |
| 0x3C | 60 | FRESH_WATER |
| 0x3D | 61 | SODA_POP |
| 0x3E | 62 | LEMONADE |
| 0x3F | 63 | S_S_TICKET |
| 0x40 | 64 | GOLD_TEETH |
| 0x41 | 65 | X_ATTACK |
| 0x42 | 66 | X_DEFEND |
| 0x43 | 67 | X_SPEED |
| 0x44 | 68 | X_SPECIAL |
| 0x45 | 69 | COIN_CASE |
| 0x46 | 70 | OAKS_PARCEL |
| 0x47 | 71 | ITEMFINDER |
| 0x48 | 72 | SILPH_SCOPE |
| 0x49 | 73 | POKE_FLUTE |
| 0x4A | 74 | LIFT_KEY |
| 0x4B | 75 | EXP_ALL |
| 0x4C | 76 | OLD_ROD |
| 0x4D | 77 | GOOD_ROD |
| 0x4E | 78 | SUPER_ROD |
| 0x4F | 79 | PP_UP |
| 0x50 | 80 | ETHER |
| 0x51 | 81 | MAX_ETHER |
| 0x52 | 82 | ELIXER |
| 0x53 | 83 | MAX_ELIXER |
| 0x54 | 84 | FLOOR_B2F |
| 0x55 | 85 | FLOOR_B1F |
| 0x56 | 86 | FLOOR_1F |
| 0x57 | 87 | FLOOR_2F |
| 0x58 | 88 | FLOOR_3F |
| 0x59 | 89 | FLOOR_4F |
| 0x5A | 90 | FLOOR_5F |
| 0x5B | 91 | FLOOR_6F |
| 0x5C | 92 | FLOOR_7F |
| 0x5D | 93 | FLOOR_8F |
| 0x5E | 94 | FLOOR_9F |
| 0x5F | 95 | FLOOR_10F |
| 0x60 | 96 | FLOOR_11F |
| 0x61 | 97 | FLOOR_B4F |
| 0xC4 | 196 | HM01 |
| 0xC5 | 197 | HM02 |
| 0xC6 | 198 | HM03 |
| 0xC7 | 199 | HM04 |
| 0xC8 | 200 | HM05 |
| 0xC9 | 201 | TM01 |
| 0xCA | 202 | TM02 |
| 0xCB | 203 | TM03 |
| 0xCC | 204 | TM04 |
| 0xCD | 205 | TM05 |
| 0xCE | 206 | TM06 |
| 0xCF | 207 | TM07 |
| 0xD0 | 208 | TM08 |
| 0xD1 | 209 | TM09 |
| 0xD2 | 210 | TM10 |
| 0xD3 | 211 | TM11 |
| 0xD4 | 212 | TM12 |
| 0xD5 | 213 | TM13 |
| 0xD6 | 214 | TM14 |
| 0xD7 | 215 | TM15 |
| 0xD8 | 216 | TM16 |
| 0xD9 | 217 | TM17 |
| 0xDA | 218 | TM18 |
| 0xDB | 219 | TM19 |
| 0xDC | 220 | TM20 |
| 0xDD | 221 | TM21 |
| 0xDE | 222 | TM22 |
| 0xDF | 223 | TM23 |
| 0xE0 | 224 | TM24 |
| 0xE1 | 225 | TM25 |
| 0xE2 | 226 | TM26 |
| 0xE3 | 227 | TM27 |
| 0xE4 | 228 | TM28 |
| 0xE5 | 229 | TM29 |
| 0xE6 | 230 | TM30 |
| 0xE7 | 231 | TM31 |
| 0xE8 | 232 | TM32 |
| 0xE9 | 233 | TM33 |
| 0xEA | 234 | TM34 |
| 0xEB | 235 | TM35 |
| 0xEC | 236 | TM36 |
| 0xED | 237 | TM37 |
| 0xEE | 238 | TM38 |
| 0xEF | 239 | TM39 |
| 0xF0 | 240 | TM40 |
| 0xF1 | 241 | TM41 |
| 0xF2 | 242 | TM42 |
| 0xF3 | 243 | TM43 |
| 0xF4 | 244 | TM44 |
| 0xF5 | 245 | TM45 |
| 0xF6 | 246 | TM46 |
| 0xF7 | 247 | TM47 |
| 0xF8 | 248 | TM48 |
| 0xF9 | 249 | TM49 |
| 0xFA | 250 | TM50 |

## Move Base PPs (Gen 1 & 2)
| Move Name | Base PP |
|---|---|
| absorb | 25 |
| acid | 30 |
| acid-armor | 20 |
| aeroblast | 5 |
| agility | 30 |
| amnesia | 20 |
| ancient-power | 5 |
| attract | 15 |
| aurora-beam | 20 |
| barrage | 20 |
| barrier | 20 |
| baton-pass | 40 |
| beat-up | 10 |
| belly-drum | 10 |
| bide | 10 |
| bind | 20 |
| bite | 25 |
| blizzard | 5 |
| body-slam | 15 |
| bone-club | 20 |
| bone-rush | 10 |
| bonemerang | 10 |
| bubble | 30 |
| bubble-beam | 20 |
| charm | 20 |
| clamp | 15 |
| comet-punch | 15 |
| confuse-ray | 10 |
| confusion | 25 |
| constrict | 35 |
| conversion | 30 |
| conversion-2 | 30 |
| cotton-spore | 40 |
| counter | 20 |
| crabhammer | 10 |
| cross-chop | 5 |
| crunch | 15 |
| curse | 10 |
| cut | 30 |
| defense-curl | 40 |
| destiny-bond | 5 |
| detect | 5 |
| dig | 10 |
| disable | 20 |
| dizzy-punch | 10 |
| double-edge | 15 |
| double-kick | 30 |
| double-slap | 10 |
| double-team | 15 |
| dragon-breath | 20 |
| dragon-rage | 10 |
| dream-eater | 15 |
| drill-peck | 20 |
| dynamic-punch | 5 |
| earthquake | 10 |
| egg-bomb | 10 |
| ember | 25 |
| encore | 5 |
| endure | 10 |
| explosion | 5 |
| extreme-speed | 5 |
| false-swipe | 40 |
| feint-attack | 20 |
| fire-blast | 5 |
| fire-punch | 15 |
| fire-spin | 15 |
| fissure | 5 |
| flail | 15 |
| flame-wheel | 25 |
| flamethrower | 15 |
| flash | 20 |
| fly | 15 |
| focus-energy | 30 |
| foresight | 40 |
| frustration | 20 |
| fury-attack | 20 |
| fury-cutter | 20 |
| fury-swipes | 15 |
| future-sight | 10 |
| giga-drain | 10 |
| glare | 30 |
| growl | 40 |
| growth | 20 |
| guillotine | 5 |
| gust | 35 |
| harden | 30 |
| haze | 30 |
| headbutt | 15 |
| heal-bell | 5 |
| hidden-power | 15 |
| high-jump-kick | 10 |
| horn-attack | 25 |
| horn-drill | 5 |
| hydro-pump | 5 |
| hyper-beam | 5 |
| hyper-fang | 15 |
| hypnosis | 20 |
| ice-beam | 10 |
| ice-punch | 15 |
| icy-wind | 15 |
| iron-tail | 15 |
| jump-kick | 10 |
| karate-chop | 25 |
| kinesis | 15 |
| leech-life | 10 |
| leech-seed | 10 |
| leer | 30 |
| lick | 30 |
| light-screen | 30 |
| lock-on | 5 |
| lovely-kiss | 10 |
| low-kick | 20 |
| mach-punch | 30 |
| magnitude | 30 |
| mean-look | 5 |
| meditate | 40 |
| mega-drain | 15 |
| mega-kick | 5 |
| mega-punch | 20 |
| megahorn | 10 |
| metal-claw | 35 |
| metronome | 10 |
| milk-drink | 5 |
| mimic | 10 |
| mind-reader | 5 |
| minimize | 10 |
| mirror-coat | 20 |
| mirror-move | 20 |
| mist | 30 |
| moonlight | 5 |
| morning-sun | 5 |
| mud-slap | 10 |
| night-shade | 15 |
| nightmare | 15 |
| octazooka | 10 |
| outrage | 10 |
| pain-split | 20 |
| pay-day | 20 |
| peck | 35 |
| perish-song | 5 |
| petal-dance | 10 |
| pin-missile | 20 |
| poison-gas | 40 |
| poison-powder | 35 |
| poison-sting | 35 |
| pound | 35 |
| powder-snow | 25 |
| present | 15 |
| protect | 10 |
| psybeam | 20 |
| psych-up | 10 |
| psychic | 10 |
| psywave | 15 |
| pursuit | 20 |
| quick-attack | 30 |
| rage | 20 |
| rain-dance | 5 |
| rapid-spin | 40 |
| razor-leaf | 25 |
| razor-wind | 10 |
| recover | 5 |
| reflect | 20 |
| rest | 5 |
| return | 20 |
| reversal | 15 |
| roar | 20 |
| rock-slide | 10 |
| rock-smash | 15 |
| rock-throw | 15 |
| rolling-kick | 15 |
| rollout | 20 |
| sacred-fire | 5 |
| safeguard | 25 |
| sand-attack | 15 |
| sandstorm | 10 |
| scary-face | 10 |
| scratch | 35 |
| screech | 40 |
| seismic-toss | 20 |
| self-destruct | 5 |
| shadow-ball | 15 |
| sharpen | 30 |
| sing | 15 |
| sketch | 1 |
| skull-bash | 10 |
| sky-attack | 5 |
| slam | 20 |
| slash | 20 |
| sleep-powder | 15 |
| sleep-talk | 10 |
| sludge | 20 |
| sludge-bomb | 10 |
| smog | 20 |
| smokescreen | 20 |
| snore | 15 |
| soft-boiled | 5 |
| solar-beam | 10 |
| sonic-boom | 20 |
| spark | 20 |
| spider-web | 10 |
| spike-cannon | 15 |
| spikes | 20 |
| spite | 10 |
| splash | 40 |
| spore | 15 |
| steel-wing | 25 |
| stomp | 20 |
| strength | 15 |
| string-shot | 40 |
| struggle | 1 |
| stun-spore | 30 |
| submission | 20 |
| substitute | 10 |
| sunny-day | 5 |
| super-fang | 10 |
| supersonic | 20 |
| surf | 15 |
| swagger | 15 |
| sweet-kiss | 10 |
| sweet-scent | 20 |
| swift | 20 |
| swords-dance | 20 |
| synthesis | 5 |
| tackle | 35 |
| tail-whip | 30 |
| take-down | 20 |
| teleport | 20 |
| thief | 25 |
| thrash | 10 |
| thunder | 10 |
| thunder-punch | 15 |
| thunder-shock | 30 |
| thunder-wave | 20 |
| thunderbolt | 15 |
| toxic | 10 |
| transform | 10 |
| tri-attack | 10 |
| triple-kick | 10 |
| twineedle | 20 |
| twister | 20 |
| vice-grip | 30 |
| vine-whip | 25 |
| vital-throw | 10 |
| water-gun | 25 |
| waterfall | 15 |
| whirlpool | 15 |
| whirlwind | 20 |
| wing-attack | 35 |
| withdraw | 40 |
| wrap | 20 |
| zap-cannon | 5 |
