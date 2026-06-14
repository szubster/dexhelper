# Generation 3 Mirage Island Offsets

This document outlines the byte offsets and data structure size for the daily/random variables block that contains the Mirage Island value in Pokémon Generation 3 save files (Ruby, Sapphire, Emerald).

## Data Structure
The Mirage Island value is stored as a random value within the "Section 2 - Game State" of the save file structure.

- **Size**: 16-bit integer (2 bytes).
- **Endianness**: Little-endian.

## Offsets
The exact offsets depend on the game version:

| Game Version | Section | Offset | Size | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Ruby / Sapphire** | Section 2 | `0x0408` | 2 bytes | Mirage Island value |
| **Emerald** | Section 2 | `0x0464` | 2 bytes | Mirage Island value |

## Parsing Requirements
As per ADR 010, any extraction logic must use the `DataView` API (e.g., `getUint16`) to read this value and handle out-of-bounds reads gracefully.
