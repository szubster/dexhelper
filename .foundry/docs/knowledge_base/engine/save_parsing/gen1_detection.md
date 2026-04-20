# Gen 1 Save Detection Strategy

The system uses a multi-layered scoring approach to identify the version (Red, Blue, or Yellow) of a Gen 1 save file.

## 1. High-Confidence Yellow Markers
Yellow version is detected first by checking specific memory addresses related to the "Following Pikachu" feature:
- **0x271C**: Following Pikachu status.
- **0x271D**: Pikachu Happiness.
If these values are non-zero and not `0xFF`, the save is identified as Yellow.

## 2. Version Exclusive Scoring
If high-confidence markers are absent, the system scores the save based on "seen" and "owned" version-exclusive Pokémon:
- **Red Exclusives**: Ekans, Arbok, Oddish, Gloom, Vileplume, Mankey, Primeape, Growlithe, Arcanine, Scyther, Electabuzz.
- **Blue Exclusives**: Sandshrew, Sandslash, Vulpix, Ninetales, Meowth, Persian, Bellsprout, Weepinbell, Victreebel, Pinsir, Magmar.
- **Yellow Missing**: Weedle line, Ekans line, Meowth line, Koffing line, Jynx, Electabuzz, Magmar.

### Point System:
- **Owned + Native**: +2 points (uses `isNative` to check if OT matches the save's trainer).
- **Seen Only**: +1 point.

## 3. Ambiguity Resolution
- If scores are within 2 points of each other and very low, the system returns `unknown` to trigger a manual selection modal for the user.
- This ensures that traded Pokémon or incomplete saves don't force an incorrect auto-detection.
