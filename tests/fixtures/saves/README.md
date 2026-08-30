# Save File Fixtures

This directory contains real-world `.sav` files sourced from public repositories to use as test fixtures.

## Gen 1
* `POKEMON BLUE-0.sav`, `POKEMON RED-0.sav`, `POKEMON YELLOW-0.sav` - Sourced from [PKMDS-Blazor test files](https://github.com/codemonkey85/PKMDS-Blazor/tree/master/PKMDS-Blazor/TestFiles).
* `BaseSAV.sav` - Sourced from [pokered-save-editor](https://github.com/1fairyfox/pokered-save-editor).
* `Pokemon Yellow - 1st Glitch Hunt.sav`, `Pokemon Yellow - 2nd Glitch Hunt.sav` - Sourced from [Pokemon-Home-and-Save-File-Backups](https://github.com/SHRetro/Pokemon-Home-and-Save-File-Backups).

## Gen 2
* `PM_CRYSTAL_BXTJ-0.sav`, `Pokemon - Silver Version (UE) [C][!].sav` - Sourced from [PKMDS-Blazor test files](https://github.com/codemonkey85/PKMDS-Blazor/tree/master/PKMDS-Blazor/TestFiles).
* `Pokemon Gold - TID 15051.sav`, `Pokemon Gold - TID 65525.sav`, `Pokemon Silver - TID 38183.sav`, `Pokemon Silver - TID 39093.sav` - Sourced from [Pokemon-Home-and-Save-File-Backups](https://github.com/SHRetro/Pokemon-Home-and-Save-File-Backups).

Note: Some Gen 2 saves had emulator RTC data appended (making them 32784 or 65584 bytes) and were truncated to the standard Game Boy 32KB hardware size using `dd` to match Gen 1/2 hardware expectations.
