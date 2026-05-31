# Visionary Journal

## 2026-05-18
**Idea:** Specialized "Living Dex" Organization Tracker
**Learning:** Catering to hardcore collector playstyles aligns perfectly with the "premium storage viewer" goal of DexHelper. The current app shows stats and individual Pokemon, but doesn't have a view dedicated specifically to organizing a *Living Dex* (one of every Pokemon in numerical order in boxes). This is a common pain point for Gen 1/2 players because there's no automated box sorting in those games.
**Outcome:** Created IDEA node.

## 2026-05-18
**Idea:** Automated Nuzlocke Verification and Run Tracker
**Learning:** Automating tedious, manual community workflows (like Nuzlocke tracking spreadsheets) by leveraging our existing programmatic save file data provides extremely high unique value.
**Outcome:** Created IDEA node.

## 2026-05-19
**Idea:** Damage Calculator and Showdown Export Integration
**Learning:** Expanding on the Nuzlocke Tracker idea, we can bridge the gap to external tools. Players heavily rely on damage calculators (like Showdown's) for planning. Providing an export of their exact team stats (DVs, EVs, etc) directly from their save file eliminates tedious data entry and errors, offering immense value to the competitive/challenge community.
**Outcome:** Created IDEA node.

## 2026-05-20
**Idea:** Multi-Save Trade Planner
**Learning:** Gen 1 and Gen 2 players often play multiple games to complete the Pokedex due to version exclusives (e.g. Red vs Blue) and trade evolutions. Being able to load multiple save files into DexHelper simultaneously and have the assistant identify the optimal cross-save trades (e.g., "Trade your Kadabra in Save A with the Vulpix in Save B") would massively expand the app's usefulness beyond a single-file tracker to a holistic "Collection Manager".
**Outcome:** Created IDEA node.

## 2026-05-21
**Idea:** Emulator Auto-Sync via File System Access API
**Learning:** The application heavily relies on offline-first, client-side processing of `.sav` files. A major friction point is the manual re-uploading of save files as players progress. Leveraging modern web capabilities like the File System Access API to securely link the browser directly to local emulator directories perfectly aligns with the offline-first architecture while providing a "live update" experience for tracking. This builds foundational value for other ideas like the Nuzlocke Tracker.
**Outcome:** Created IDEA node.

## 2026-05-22
**Idea:** Gen 2 Shiny Gene Detection & Breeding Assistant
**Learning:** Gen 2's unique DV-based shiny mechanics present a massive opportunity. Surfacing hidden state (like DVs that make a Pokémon a "Shiny Carrier") directly supports hardcore endgame goals like shiny hunting, which players currently have to calculate manually. This leverages our programmatic save file access to provide unique value.
**Outcome:** Created IDEA node.

## 2026-05-23
**Idea:** Smart Route Radar / Context-Aware Missing Encounter Map
**Learning:** Currently DexHelper acts as an excellent static reference and passive save viewer. By dynamically intersecting the static game knowledge (e.g., encounter tables for specific maps) with the player's current save state (Pokédex/Box completion), we can create an "active guide". A feature that automatically highlights which routes the player should visit *next* to catch missing Pokémon bridges the gap between reference tool and proactive companion app.
**Outcome:** Created IDEA node.

**Idea:** Gen 3 Feebas Tile Predictor
**Learning:** Gen 3 introduced extremely cryptic, save-state dependent mechanics like the 6 random Feebas tiles on Route 119. Since we already parse `.sav` files, extracting the seed and visually highlighting these exact tiles on a route map provides tremendous utility, turning a tedious manual search into a targeted catch, thus perfectly leveraging our offline-first programmatic save access.
## 2026-05-27
**Idea:** ROM Hack Support via Custom Adapters
**Learning:** Hardcoding our parsing engine strictly to vanilla Gen 1/2 saves alienates a massive, highly-engaged segment of the retro Pokémon community: ROM hack players (e.g., Crystal Clear, Polished Crystal). Since ROM hacks often modify save structures, our current heuristic detection fails. We need a pluggable adapter architecture to scale our user base to include these custom playstyles without breaking core functionality.
**Outcome:** Rejected by the maintainer. Hard project constraint established: the maintainer will not play ROM hacks and considers supporting them too much effort. Do not generate ideas related to ROM hack support in the future.
## 2026-05-26
**Idea:** Save File Health & Corruption Scanner
**Learning:** The application's core strength is its deep parsing of retro save files. By leaning into the "offline-first, client-side" architecture, we can leverage this existing parsing logic to not just display data, but *validate* it. This pivots the app's value proposition from being just a "tracker" to a critical "preservation utility" for a community plagued by dying cartridge batteries and bad dumps. Ideas that reuse our existing programmatic strengths to solve high-friction community problems outside of standard gameplay loops are highly valuable.
## 2025-05-24
**Idea:** Time Capsule Readiness Validator
**Learning:** Gen 2's backward compatibility via the Time Capsule is a major mechanic, but its move-based restrictions are obtuse and require external research by the player. Leveraging our save file programmatic access to automate these cross-generational friction points fits perfectly within DexHelper's vision as a premium companion app.
## 2026-05-24
**Idea:** Save State Version History and Metadata Inference
**Learning:** Older generation games lack metadata (like "date caught" or "encounter location" in Gen 1). However, by storing a history of sequential save file uploads and diffing them (e.g., "Pikachu appeared in Box 1 between upload A and upload B"), we can infer and enrich the data locally, creating modern metadata for retro games. This completely redefines the tool from a static state viewer into a progressive timeline tracker.
**Outcome:** Created IDEA node.

## 2026-05-31
**Idea:** Unown Form Tracker
**Learning:** Catering to end-game completionists adds significant value. Gen 2 has a specific quest to collect all 26 Unown forms (A-Z) which are determined by DVs. Since `DexHelper` already parses DVs for stats and shininess, extending this to explicitly track Unown forms gives players a visual checklist, transforming a tedious manual process into a highly actionable feature.
**Outcome:** Created IDEA node.
