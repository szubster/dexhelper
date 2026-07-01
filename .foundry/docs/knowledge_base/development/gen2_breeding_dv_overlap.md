# Gen 2 Breeding: DV Overlap Constraint (Incest Prevention)

In Generation 2, there is a structural quirk to prevent inbreeding. The game determines if two Pokémon are "related" based on their Individual Values (DVs). Two Pokémon are incompatible for breeding if:
1. Their Defense DVs are exactly the same.
2. AND their Special DVs are either identical OR they differ by exactly 8.

Because shininess is tied to specific DV combinations in Gen 2 (Defense always 10, Special always 10), two shiny Pokémon (or shiny carriers) will almost certainly trigger this rule and be unable to breed. This logic must be enforced in any algorithm dealing with Gen 2 breeding pairs.
