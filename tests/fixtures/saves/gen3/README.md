# Gen 3 Save Fixtures

This directory contains real-world Gen 3 `.sav` files used for parsing and integration testing. These files were sourced from public GitHub repositories that archive Pokémon save files.

## Sources

- `emerald_bl1ndbeholder.sav`: Pokémon Emerald save file sourced from [Bl1ndBeholder/pokemon-saves](https://github.com/Bl1ndBeholder/pokemon-saves).
- `emerald_vithuang.sav`: Pokémon Emerald save file sourced from [VitHuang/PokemonBoxSaveEditor](https://github.com/VitHuang/PokemonBoxSaveEditor).
- `firered_eventsgallery.sav`: Pokémon FireRed save file (MYSTRY MEW event) sourced from [projectpokemon/EventsGallery](https://github.com/projectpokemon/EventsGallery).
- `firered_vithuang.sav`: Pokémon FireRed save file sourced from [VitHuang/PokemonBoxSaveEditor](https://github.com/VitHuang/PokemonBoxSaveEditor).
- `ruby_vithuang.sav`: Pokémon Ruby save file sourced from [VitHuang/PokemonBoxSaveEditor](https://github.com/VitHuang/PokemonBoxSaveEditor).
- `ruby2_vithuang.sav`: Another Pokémon Ruby save file sourced from [VitHuang/PokemonBoxSaveEditor](https://github.com/VitHuang/PokemonBoxSaveEditor).

*Note: Some of the original save files (e.g. from VitHuang/PokemonBoxSaveEditor) were exactly 64KB (65536 bytes) or 56KB (57344 bytes) and were padded to exactly 128KB (131072 bytes) with zeroes to match standard GameBoy Advance emulator requirements.*
- `emerald_spinda_party_fixture.sav`: A modified Pokémon Emerald save file containing a Spinda in the active party.
- `emerald_spinda_pc_fixture.sav`: A modified Pokémon Emerald save file containing a Spinda in the first PC box.

- `emerald_egg_fixture.sav`: A modified Pokémon Emerald save file containing an Egg in the active party.