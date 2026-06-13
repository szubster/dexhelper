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
Item lists and Move Base PPs will be dynamically pulled from PokeAPI instead of statically maintained here. (See idea-077-dynamic-pokeapi-data)

## Base PP Values
