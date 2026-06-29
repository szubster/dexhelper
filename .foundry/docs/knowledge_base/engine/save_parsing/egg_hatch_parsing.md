# Egg Hatch Parsing Mechanics

## Gen 2
In Gen 2, if a Pokémon is an Egg (species ID `253`), its Friendship byte is repurposed to store the remaining "Egg Cycles". Multiplying this byte by the standard Gen 2 cycle length (`256` steps) yields the exact numerical step count.

## Gen 3
In Gen 3, the Friendship byte is repurposed similarly to store the remaining "Egg Cycles". However, the "Is Egg" status is indicated by a specific bit flag in the Miscellaneous (M) substructure. The Friendship byte itself is located in the Growth (G) substructure (offset 4). The cycle length is also `256` steps.
