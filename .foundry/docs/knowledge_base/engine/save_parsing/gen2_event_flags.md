# Gen 2 Event Flags

## Assembly Parsing Caveat
When extracting event flag constants from the Pokécrystal source code (specifically `constants/event_flags.asm`), **do not use line numbers as bit indices**.

The assembly file uses macros such as `const_def`, `const_skip`, and `const_next` to dynamically advance the constant counter. To find the correct bit offset, you must properly evaluate these directives rather than counting lines.

## True Parsed Values for Gen 2 Static Encounters
The correct, fully-evaluated bit offsets for the required Gen 2 static encounters are:

- `EVENT_FOUGHT_SUDOWOODO` = 42
- `EVENT_FOUGHT_HO_OH` = 791
- `EVENT_FOUGHT_LUGIA` = 792
- `EVENT_FOUGHT_SNORLAX` = 1872
- `EVENT_LAKE_OF_RAGE_RED_GYARADOS` = 1873
