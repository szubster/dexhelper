# Oak / Data Integrity Journal

*   **Version Exclusives Logic:** The objects defining version exclusives (like `GEN1_VERSION_EXCLUSIVES`) act as **blocklists**. They contain the Pokémon IDs that are *unavailable* in that specific game version. For example, `GEN1_VERSION_EXCLUSIVES.red` correctly contains Blue-exclusive Pokémon (like Sandshrew, Meowth, etc.) because they cannot be found in Pokémon Red.
*   **Gen 2 Exclusives:** Generation 2 version exclusives (Gold, Silver, Crystal) require a blocklist implemented in `gen2Exclusives.ts`.
