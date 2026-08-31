# Gen 2 Daily and Weekly Event Flags Offsets

In Generation 2 (Gold, Silver, Crystal), daily and weekly time-gated events are tracked within the main event flags block (`eventFlags`), which is a 2048-bit (256-byte) array.

Based on the `pokecrystal` disassembly `constants/event_flags.asm`, the specific bit indices for daily and weekly events are:

## Daily Events

### Mystery Gift
- `EVENT_MYSTERY_GIFT_DELIVERY_GUY` (Bit ID: 1181, Byte 147, Bit 5)

### Bug-Catching Contest
- `EVENT_BUG_CATCHING_CONTESTANT_1A` through `10A` (IDs 1186 - 1195, Bytes 148-149)
- `EVENT_BUG_CATCHING_CONTESTANT_1B` through `10B` (IDs 1196 - 1205, Bytes 149-150)

### Goldenrod Underground Haircut Brothers
- `EVENT_GOLDENROD_UNDERGROUND_OLDER_HAIRCUT_BROTHER` (Bit ID: 1248, Byte 156, Bit 0)
- `EVENT_GOLDENROD_UNDERGROUND_YOUNGER_HAIRCUT_BROTHER` (Bit ID: 1249, Byte 156, Bit 1)

## Weekly Events

### Friday Lapras
- `EVENT_UNION_CAVE_B2F_LAPRAS` (Bit ID: 1260, Byte 157, Bit 4)

### Weekday Siblings
These events track if the player has received the item from the sibling for that day.
- **Monday (Monica):** `EVENT_ROUTE_40_MONICA_OF_MONDAY` (Bit ID: 1258, Byte 157, Bit 2)
- **Tuesday (Tuscany):** `EVENT_ROUTE_29_TUSCANY_OF_TUESDAY` (Bit ID: 1253, Byte 156, Bit 5)
- **Wednesday (Wesley):** `EVENT_LAKE_OF_RAGE_WESLEY_OF_WEDNESDAY` (Bit ID: 1256, Byte 157, Bit 0)
- **Thursday (Arthur):** `EVENT_ROUTE_36_ARTHUR_OF_THURSDAY` (Bit ID: 1254, Byte 156, Bit 6)
- **Friday (Frieda):** `EVENT_ROUTE_32_FRIEDA_OF_FRIDAY` (Bit ID: 1252, Byte 156, Bit 4)
- **Saturday (Santos):** `EVENT_BLACKTHORN_CITY_SANTOS_OF_SATURDAY` (Bit ID: 1257, Byte 157, Bit 1)
- **Sunday (Sunny):** `EVENT_ROUTE_37_SUNNY_OF_SUNDAY` (Bit ID: 1255, Byte 156, Bit 7)

### Buena's Password
- `EVENT_BUENA_OFFERED_HER_PHONE_NUMBER_NO_BLUE_CARD` (Bit ID: 325, Byte 40, Bit 5)
- `EVENT_BUENA_OFFERED_HER_PHONE_NUMBER` (Bit ID: 483, Byte 60, Bit 3)
- `EVENT_MET_BUENA` (Bit ID: 484, Byte 60, Bit 4)

### S.S. Aqua
These events track the state of the S.S. Aqua and its passengers.
- `EVENT_FAST_SHIP_DESTINATION_OLIVINE` (Bit ID: 47, Byte 5, Bit 7)
- `EVENT_FAST_SHIP_FIRST_TIME` (Bit ID: 48, Byte 6, Bit 0)
- `EVENT_FAST_SHIP_HAS_ARRIVED` (Bit ID: 49, Byte 6, Bit 1)
- `EVENT_FAST_SHIP_PASSENGERS_FIRST_TRIP` (Bit ID: 1221, Byte 152, Bit 5)
- `EVENT_FAST_SHIP_PASSENGERS_EASTBOUND` (Bit ID: 1222, Byte 152, Bit 6)
- `EVENT_FAST_SHIP_PASSENGERS_WESTBOUND` (Bit ID: 1223, Byte 152, Bit 7)
