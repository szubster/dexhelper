# Visionary Journal

**Idea:** Specialized "Living Dex" Organization Tracker
**Learning:** Catering to hardcore collector playstyles aligns perfectly with the "premium storage viewer" goal of DexHelper. The current app shows stats and individual Pokemon, but doesn't have a view dedicated specifically to organizing a *Living Dex* (one of every Pokemon in numerical order in boxes). This is a common pain point for Gen 1/2 players because there's no automated box sorting in those games.

**Idea:** Automated Nuzlocke Verification and Run Tracker
**Learning:** Automating tedious, manual community workflows (like Nuzlocke tracking spreadsheets) by leveraging our existing programmatic save file data provides extremely high unique value.

**Idea:** Damage Calculator and Showdown Export Integration
**Learning:** Expanding on the Nuzlocke Tracker idea, we can bridge the gap to external tools. Players heavily rely on damage calculators (like Showdown's) for planning. Providing an export of their exact team stats (DVs, EVs, etc) directly from their save file eliminates tedious data entry and errors, offering immense value to the competitive/challenge community.

**Idea:** Multi-Save Trade Planner
**Learning:** Gen 1 and Gen 2 players often play multiple games to complete the Pokedex due to version exclusives (e.g. Red vs Blue) and trade evolutions. Being able to load multiple save files into DexHelper simultaneously and have the assistant identify the optimal cross-save trades (e.g., "Trade your Kadabra in Save A with the Vulpix in Save B") would massively expand the app's usefulness beyond a single-file tracker to a holistic "Collection Manager".

**Idea:** Emulator Auto-Sync via File System Access API
**Learning:** The application heavily relies on offline-first, client-side processing of `.sav` files. A major friction point is the manual re-uploading of save files as players progress. Leveraging modern web capabilities like the File System Access API to securely link the browser directly to local emulator directories perfectly aligns with the offline-first architecture while providing a "live update" experience for tracking. This builds foundational value for other ideas like the Nuzlocke Tracker.

**Idea:** Gen 2 Shiny Gene Detection & Breeding Assistant
**Learning:** Gen 2's unique DV-based shiny mechanics present a massive opportunity. Surfacing hidden state (like DVs that make a Pokémon a "Shiny Carrier") directly supports hardcore endgame goals like shiny hunting, which players currently have to calculate manually. This leverages our programmatic save file access to provide unique value.

**Idea:** Smart Route Radar / Context-Aware Missing Encounter Map
**Learning:** Currently DexHelper acts as an excellent static reference and passive save viewer. By dynamically intersecting the static game knowledge (e.g., encounter tables for specific maps) with the player's current save state (Pokédex/Box completion), we can create an "active guide". A feature that automatically highlights which routes the player should visit *next* to catch missing Pokémon bridges the gap between reference tool and proactive companion app.

**Idea:** Gen 3 Feebas Tile Predictor
**Learning:** Gen 3 introduced extremely cryptic, save-state dependent mechanics like the 6 random Feebas tiles on Route 119. Since we already parse `.sav` files, extracting the seed and visually highlighting these exact tiles on a route map provides tremendous utility, turning a tedious manual search into a targeted catch, thus perfectly leveraging our offline-first programmatic save access.
## 2026-05-27
**Idea:** ROM Hack Support via Custom Adapters
**Learning:** Hardcoding our parsing engine strictly to vanilla Gen 1/2 saves alienates a massive, highly-engaged segment of the retro Pokémon community: ROM hack players (e.g., Crystal Clear, Polished Crystal). Since ROM hacks often modify save structures, our current heuristic detection fails. We need a pluggable adapter architecture to scale our user base to include these custom playstyles without breaking core functionality.
**Outcome:** Rejected by the maintainer. Hard project constraint established: the maintainer will not play ROM hacks and considers supporting them too much effort. Do not generate ideas related to ROM hack support in the future.
## 2026-05-26
**Idea:** Save File Health & Corruption Scanner
**Learning:** The application's core strength is its deep parsing of retro save files. By leaning into the "offline-first, client-side" architecture, we can leverage this existing parsing logic to not just display data, but *validate* it. This pivots the app's value proposition from being just a "tracker" to a critical "preservation utility" for a community plagued by dying cartridge batteries and bad dumps. Ideas that reuse our existing programmatic strengths to solve high-friction community problems outside of standard gameplay loops are highly valuable.

**Idea:** Time Capsule Readiness Validator
**Learning:** Gen 2's backward compatibility via the Time Capsule is a major mechanic, but its move-based restrictions are obtuse and require external research by the player. Leveraging our save file programmatic access to automate these cross-generational friction points fits perfectly within DexHelper's vision as a premium companion app.

**Idea:** Save State Version History and Metadata Inference
**Learning:** Older generation games lack metadata (like "date caught" or "encounter location" in Gen 1). However, by storing a history of sequential save file uploads and diffing them (e.g., "Pikachu appeared in Box 1 between upload A and upload B"), we can infer and enrich the data locally, creating modern metadata for retro games. This completely redefines the tool from a static state viewer into a progressive timeline tracker.

**Idea:** Missing Hidden Items Finder
**Learning:** Finding hidden items (like Rare Candies or TMs) in Gen 1/2 is extremely tedious without a guide, and players often forget which ones they've already picked up since the games don't track them explicitly in a user-facing way. By parsing the event flags in the save file, we can dynamically generate a checklist of *remaining* hidden items, turning static guide knowledge into personalized, actionable insights. This continues the trend of surfacing hidden save state to solve high-friction retro gaming pain points.

**Idea:** Pokerus Tracker and Infection Spread Assistant
**Learning:** Pokerus is an incredibly rare, highly sought-after, and poorly explained hidden mechanic in Gen 2+. Players have no easy way of tracking which Pokemon have it, how many days until it cures, and who is contagious, forcing them to guess or carefully count days. Uncovering this hidden state allows us to create an infection planner, taking another opaque game mechanic and turning it into an actionable utility for dedicated trainers.

## Learning
**Idea:** Gen 3 Berry Farming Tracker
**Learning:** When expanding to new generations (like Gen 3), target the unique, generation-specific mechanics (like RTC-based berry farming) that present new pain points for players. Automating time-based or heavily localized systems provides immediate high value that generic static views cannot match.

## 2026-06-01
**Idea:** Gen 3 Mirage Island Predictor
**Learning:** Building on the Gen 3 support expansions, targeting obscure, RNG-based, or hidden daily mechanics (like Mirage Island, which relies on a matching RNG value with the party Pokémon) provides players with "superpower" utilities that they cannot easily achieve through normal gameplay. This aligns with DexHelper's vision as a premium companion app capable of deeply introspecting save states.
## 2026-05-31
**Idea:** Unown Form Tracker
**Learning:** Catering to end-game completionists adds significant value. Gen 2 has a specific quest to collect all 26 Unown forms (A-Z) which are determined by DVs. Since `DexHelper` already parses DVs for stats and shininess, extending this to explicitly track Unown forms gives players a visual checklist, transforming a tedious manual process into a highly actionable feature.

## 2026-06-04
**Idea:** Gen 2 Daily and Weekly Event Tracker
**Learning:** Expanding the app's capability to parse time-based data (RTC) from Gen 2 save files lets us create dynamic "daily to-do checklists". Turning a static collection viewer into an active agenda that reminds players of time-gated events (like swarms or daily rare encounters) solves a massive pain point for retro gamers without guides, continuing our trend of surfacing hidden state into actionable UI.
**Outcome:** Created IDEA node.
**Feedback Update:** Noted that RTC is not reliably stored in all emulator `.sav` files. Instead of relying solely on the `.sav` file's RTC, we should use the user's system device clock combined with the save file's event flags to power this feature. This avoids creating features that break depending on the emulator used. Also learned to add filtering to only show events relevant to uncaught Pokémon to increase usefulness.
## 2026-06-02
**Idea:** Gen 3 Mirage Island Predictor
**Learning:** Continuing the trend of surfacing hidden global state (like Feebas tiles or daily swarms) and cross-referencing it with the player's large entity datasets (like hundreds of PC Pokémon PIDs), we can eliminate extremely tedious brute-force mechanics. This provides immediate, tangible value that perfectly aligns with our offline-first programmatic parsing strengths.
## 2026-06-08
**Idea:** Roaming Pokémon Tracking Dashboard
**Learning:** Gen 2 and Gen 3 feature "roaming" legendary Pokémon (like Entei, Raikou, Latios, Latias) whose locations change randomly as the player moves between routes. Tracking them is notoriously frustrating without external tools or constantly checking the Pokédex (if even seen yet). Since DexHelper already parses save state, we can extract the exact map coordinates of roaming Pokémon and display them on our map, turning one of the most tedious mechanics in retro Pokémon into a straightforward, predictable hunt. This perfectly leverages our core strength of surfacing hidden global state.
**Outcome:** Created IDEA node.

**Idea:** Gen 3 Contest Stat and Ribbon Tracker
**Learning:** Expanding Gen 3 support by surfacing hidden endgame stats (Condition/Sheen) and aggregating tedious-to-check completion marks (Ribbons) across the entire PC perfectly targets the hardcore completionist community, providing immense utility that the in-game UI lacks.
**Outcome:** Created IDEA node.

## 2026-06-05
**Idea:** Hall of Fame Timeline and Certificate Exporter
**Learning:** Expanding the app's scope to include social sharing and community engagement adds significant value. Extracting Hall of Fame data to generate shareable images targets the highly active challenge-running community, transforming DexHelper from a purely personal utility into a tool that drives organic, word-of-mouth growth.
## 2026-06-05
**Idea:** Gen 3 Roaming Legendary Tracker and IV Glitch Inspector
**Learning:** In Gen 3, tracking roaming legendaries (Latias/Latios) is notoriously frustrating, and the infamous "Roamer IV Glitch" in Ruby/Sapphire/FireRed/LeafGreen permanently ruins their stats upon generation. By surfacing this hidden generation data (current route, nature, and IVs) immediately after the roamer is released, players can decide whether to reset or continue hunting without wasting hours only to discover a glitched, unusable Pokémon. This strongly reinforces the principle of revealing critical hidden state to prevent high-friction, wasted effort in retro games.

## 2026-06-10
**Idea:** Gen 3 Secret Base and Mixed Record Viewer
**Learning:** Expanding Gen 3 support by surfacing hidden state from social features (like mixed records and secret bases) provides players with actionable endgame utilities. Revealing exact locations and NPC trainer data turns a highly opaque feature into an optimized tool for EXP/EV farming, fitting perfectly with DexHelper's core value proposition as an intelligent companion app.

## 2026-06-11
**Idea:** Gen 3 Battle Frontier Dashboard
**Learning:** For extensive, multi-faceted endgame content (like the 7 facilities of the Emerald Battle Frontier), data is often deeply fragmented across the in-game UI or requires physical in-game travel to check. Centralizing this distributed state into a unified, actionable dashboard perfectly aligns with DexHelper's vision. Aggregating hidden or hard-to-reach progress data into one screen provides immense value by eliminating tedious navigation and allowing players to easily track their ultimate endgame goals.

## 2026-06-12
**Idea:** Gen 3 TV Broadcast and Swarm Tracker
**Learning:** Gen 3 features a hidden time-based event system driven by in-game TV broadcasts (which trigger swarms, sales, etc.). Like the Berry Tracker and Daily Events ideas, targeting time-gated mechanics that players easily miss without playing every day provides a massive QoL improvement. Automating these reminders based on save file event timers perfectly leverages our programmatic access to create actionable schedules.

## 2026-06-13
**Idea:** Gen 3 PokéNav Match Call & Rematch Tracker
**Learning:** Expanding Gen 3 support by surfacing hidden, dynamically changing state (like the obfuscated step-counter-driven Match Call rematch flags) provides players with highly actionable utilities. Transforming a tedious, scroll-heavy in-game UI into an optimized dashboard for EV and EXP farming perfectly leverages our offline-first programmatic parsing strengths, turning hidden state into a competitive advantage for the hardcore playerbase.

## 2026-06-14
**Idea:** Foundry Zombie Node Garbage Collection
**Learning:** It is critical to balance ideation between the core product (DexHelper) and the internal tooling that builds it (Foundry). Relying solely on the heartbeat workflow for node state management can lead to DAG deadlocks if edge cases occur. Proposing self-healing mechanisms for the orchestrator, like garbage collecting zombie nodes, ensures the autonomous software factory remains resilient and requires less manual TPM intervention.

**Idea:** Exact Friendship & Evolution Tracker
**Learning:** Expanding the app to parse the hidden exact numerical Friendship/Happiness value from the save file (which ranges 0-255) surfaces a critical game mechanic that players often struggle with in Gen 2 and Gen 3 due to vague in-game feedback. By overlaying this into a tracker view that estimates remaining actions for evolution, it turns an obtuse, high-friction mechanic into an actionable, premium feature.

## 2026-06-16
**Idea:** Gen 3 Secret ID Viewer and Shiny RNG Assistant
**Learning:** Foundational values like the Secret ID (SID) in Generation 3 are permanently hidden from the player but are the core requirement for advanced community metas like RNG manipulation (especially given Emerald's fixed seed and R/S's dry battery mechanics). Surfacing this single hidden integer unlocks entirely new ways to play the game, reinforcing our strategy of turning static save data into powerful, meta-enabling utilities for hardcore players.

## 2026-06-16 (Update)
**Idea:** Gen 3 Secret ID Viewer and Shiny RNG Assistant
**Learning:** The maintainer rejected the idea of exposing the Gen 3 Secret ID for RNG manipulation. While uncovering hidden variables like SID technically aligns with programmatic save parsing, tools explicitly supporting RNG manipulation are out of scope. In the future, do not propose features that assist with RNG manipulation or explicitly display the Secret ID.

## 2026-06-17
**Idea:** Daycare Status and Exact Egg Hatch Tracker
**Learning:** Targeting opaque, heavily-utilized progression mechanics like breeding (Daycare status and Egg steps) for actionable QoL improvements perfectly aligns with the app's offline-first programmatic save parsing strengths. Extracting exact cycle counts transforms vague in-game text into precise data, removing tedious guesswork for hardcore players.

## 2026-06-25
**Idea:** Hidden Power Type and Base Power Calculator
**Learning:** Hidden Power is a highly sought-after mechanic for competitive battling and challenge runs (like Nuzlockes), especially in Gens 2 and 3. Since the move's attributes are determined entirely by the Pokémon's hidden IVs/DVs—which players cannot easily see in-game without trial and error or external calculators—automatically extracting and calculating this information from the save file provides immediate, immense value. This perfectly fits the "premium companion app" ethos: taking opaque, hidden data and rendering it directly actionable.

## 2026-06-22
**Idea:** PC Box Duplicate Analyzer & Release Assistant
**Learning:** Hardcore players often fill their PC boxes with duplicates during shiny hunting, breeding (especially in Gen 2 and Gen 3), or Safari Zone trips. Identifying which duplicates to keep (best IVs/DVs, Natures) and which to release is a massive pain point given the slow in-game UI. Surfacing "Duplicate Groups" directly from the parsed save file and comparing their stats side-by-side turns a tedious box-management chore into an optimized, actionable task. This aligns perfectly with the goal of being a premium, data-driven companion app for retro games.
## 2026-06-25
**Idea:** Gen 4 Poké Radar Chain Tracker
**Learning:** When expanding into a new generation (Gen 4), focus on identifying the most stressful and highly volatile manual mechanics—like the 40-chain Poké Radar limit, where a single mistake breaks the chain. By directly reading the active chain counter from the save file, we replace a fragile manual tracking process with absolute programmatic certainty, deeply reinforcing DexHelper's value as an indispensable premium companion app.

## 2026-06-25 (Update)
**Idea:** Gen 4 Poké Radar Chain Tracker
**Learning:** The maintainer rejected the idea of extracting Gen 4 Poké Radar chain data because Generation 4 is currently completely unsupported and out of scope for the immediate roadmap. In the future, strictly limit ideation to generations currently supported by the app (Gen 1-3) unless specifically requested otherwise.

## 2026-06-25 (Second Attempt)
**Idea:** Gen 3 Pokéblock Inventory and Contest Planner
**Learning:** When generating new ideas after a rejection due to scope (like proposing Gen 4 features), pivot back to the core mechanics of the currently supported generations. Expanding on existing Gen 3 support (like Contests) by revealing the hidden, exact stats of items (like Pokéblocks' feel and flavor) perfectly aligns with DexHelper's strength of turning opaque game data into actionable strategy without overstepping the project roadmap.

## 2026-06-25 (Third Attempt)
**Idea:** Gen 3 Trick House Tracker
**Learning:** When proposing ideas for complex mechanics (like Contests/Pokéblocks), ensure they aren't already covered by existing macroscopic ideas (like the overall Contest Tracker). If a collision occurs, pivot to a distinct, highly localized mechanic (like the Gen 3 Trick House progression) that has clear save-file presence but isn't part of a larger, already-planned system.
