# Gen 2 Daily and Weekly Event Flags Offsets

In Generation 2 (Gold, Silver, Crystal), daily and weekly time-gated events are tracked within the main event flags block (`eventFlags`), which is a 2048-bit (256-byte) array.

Based on the `pokecrystal` disassembly `constants/event_flags.asm`, the specific bit indices for daily and weekly events are:

## Daily Events

### Mystery Gift
- `EVENT_MYSTERY_GIFT_DELIVERY_GUY` (Bit ID: 1809, Byte 226, Bit 1)

### Bug-Catching Contest
- `EVENT_BUG_CATCHING_CONTESTANT_1A` through `10A` (IDs 1814 - 1823, Bytes 226-227)
- `EVENT_BUG_CATCHING_CONTESTANT_1B` through `10B` (IDs 1824 - 1833, Bytes 228-229)

### Goldenrod Underground Haircut Brothers
- `EVENT_GOLDENROD_UNDERGROUND_OLDER_HAIRCUT_BROTHER` (Bit ID: 1876, Byte 234, Bit 4)
- `EVENT_GOLDENROD_UNDERGROUND_YOUNGER_HAIRCUT_BROTHER` (Bit ID: 1877, Byte 234, Bit 5)

## Weekly Events

### Friday Lapras
- `EVENT_UNION_CAVE_B2F_LAPRAS` (Bit ID: 1888, Byte 236, Bit 0)

### Weekday Siblings
These events track if the player has received the item from the sibling for that day.
- **Monday (Monica):** `EVENT_ROUTE_40_MONICA_OF_MONDAY` (Bit ID: 1886, Byte 235, Bit 6)
- **Tuesday (Tuscany):** `EVENT_ROUTE_29_TUSCANY_OF_TUESDAY` (Bit ID: 1881, Byte 235, Bit 1)
- **Wednesday (Wesley):** `EVENT_LAKE_OF_RAGE_WESLEY_OF_WEDNESDAY` (Bit ID: 1884, Byte 235, Bit 4)
- **Thursday (Arthur):** `EVENT_ROUTE_36_ARTHUR_OF_THURSDAY` (Bit ID: 1882, Byte 235, Bit 2)
- **Friday (Frieda):** `EVENT_ROUTE_32_FRIEDA_OF_FRIDAY` (Bit ID: 1880, Byte 235, Bit 0)
- **Saturday (Santos):** `EVENT_BLACKTHORN_CITY_SANTOS_OF_SATURDAY` (Bit ID: 1885, Byte 235, Bit 5)
- **Sunday (Sunny):** `EVENT_ROUTE_37_SUNNY_OF_SUNDAY` (Bit ID: 1883, Byte 235, Bit 3)

### Buena's Password
- `EVENT_BUENA_OFFERED_HER_PHONE_NUMBER_NO_BLUE_CARD` (Bit ID: 670, Byte 83, Bit 6)
- `EVENT_BUENA_OFFERED_HER_PHONE_NUMBER` (Bit ID: 828, Byte 103, Bit 4)
- `EVENT_MET_BUENA` (Bit ID: 829, Byte 103, Bit 5)
