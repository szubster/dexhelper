# Visionary Journal

- **Active Session ID:** 13048993490522208946
- **Domain:** Foundry (Internal Orchestration & Efficiency)
- **Proposed Idea:** Epic-Level Distillation and Cold Storage Archival
- **Rationale & Concept:**
  As the Foundry processes hundreds of tasks and stories, the `.foundry` directory grows rapidly. Over time, parsing all these files for DAG orchestrator scheduling becomes slower.
  This idea proposes a TPM feature where, upon completion of an EPIC, the TPM will synthesize all of its child STORIES and TASKS into a single "Changelog/Summary" document. It will then archive or delete the vast number of granular TASK and STORY node files, transitioning them into "Cold Storage." This drastically reduces the active `.foundry` node footprint, optimizing orchestrator performance and repository size, while retaining the high-level intent and lessons.

- **How this idea maintains the 50/50 balance between DexHelper and Foundry:**
  In the last session, we created `idea-128-gen3-acro-bike-route-planner.md`, which is a **DexHelper (Main Product)** feature designed to improve route planning.
  In this session, we are proposing an "Epic-Level Distillation and Cold Storage Archival" strategy, which is a **Foundry (Internal Orchestration)** infrastructure improvement.
  This maintains a strict and healthy **50/50 split** between developer-facing product features and system/orchestrator improvements, as outlined in the *Strategic Balance Learning* section of our journal.

# Visionary Journal

- **Active Session/Timestamp:** 2026-08-01
- **Domain:** Main Project (DexHelper)
- **Proposed Idea:** Gen 3 Pal Park Migration Planner (IDEA-132)
- **Rationale & Concept:**
  Migrating Pokémon from Gen 3 to Gen 4 via Pal Park is tedious, requiring players to strip HM moves, check held items, and organize exactly 6 Pokémon. A utility in DexHelper to automate these checks and assist in batching provides immense value for collectors and Ribbon Masters.
- **How this idea maintains the 50/50 balance between DexHelper and Foundry:**
  In the previous session, we proposed a Foundry orchestration feature (IDEA-131: Orchestrator Resource Locking). To strictly maintain the required 50/50 strategic balance, this session focuses on a direct product feature for DexHelper, aiming at Gen 3 players prepping for Gen 4 transfers.

# Visionary Journal

- Acknowledgment: Dry-run feature for DAG orchestrator already exists.
- Proposed Idea: Gen 3 Mystery Gift Viewer
- Domain: DexHelper (Main Project)
- Rationale: Maintains the 50/50 balance between DexHelper and Foundry ideas, proposing a premium utility for viewing Mystery Gift event data in Gen 3 saves.

# Visionary Journal

- Acknowledgment: Previous session proposed a DexHelper idea (IDEA-121 Gen 3 Mystery Gift Viewer).
- Proposed Idea: Foundry Lead Time Metrics and Bottleneck Analysis (IDEA-122)
- Domain: Foundry System
- Rationale: Maintains the 50/50 balance between DexHelper and Foundry ideas. This idea focuses on scheduling enhancements and DAG orchestrator improvements by tracking the time nodes spend in various states to identify pipeline bottlenecks.

# Visionary Journal

- **Active Session/Timestamp:** 2026-07-26-18-00-00
- **Domain:** DexHelper (Core Application Type Engine)
- **Proposed Idea:** Improved SaveData Typing via Discriminated Generation Unions (IDEA-123)
- **Rationale & Concept:**
  Currently, the shared `SaveData` interface holds all properties from all generations (Gen 1, Gen 2, and Gen 3) as optional fields. This introduces significant cognitive overhead, forces extensive use of optional chaining (`?.`), and obscures the exact data guarantee of any specific save file at compile time.

  By redefining `SaveData` as a discriminated union (`Gen1SaveData | Gen2SaveData | Gen3SaveData`) with the `generation` field acting as the discriminator, we unlock TypeScript's control flow analysis. Once a consumer narrows down the type (e.g., `if (data.generation === 1)`), they are guaranteed to have safe, compile-time access to Gen 1 properties (like `gen1StaticEncounters`) without optional chaining, and any access to non-existent properties (like `gen3BerryPatches`) will fail at compile time instead of failing silently or throwing at runtime.

- **How this idea maintains the 50/50 balance between DexHelper and Foundry:**
  In the previous session, we proposed/progressed ideas such as `idea-122-pokemon-themed-foundry-personas.md` and circular dependency checks, which strictly focus on **Foundry (internal orchestrator/factory tooling)**.
  To preserve the mandatory **50/50 strategic balance** between DexHelper (the core application/product) and the Foundry (the internal software factory), we are now focusing on a highly impactful technical feature for **DexHelper**. Specifically, the type-safety of the save parsing engine, which is the foundational database of the entire application.

# Visionary Journal

- **Active Session/Timestamp:** 2026-07-27-12-00-00
- **Domain:** Foundry (Internal Orchestrator Optimization)
- **Proposed Idea:** Librarian Persona for Context Token Optimization (IDEA-124)
- **Rationale & Concept:**
  Context window size is the most precious resource for multi-agent DAG pipelines. Currently, as sessions execute, agent journals accumulate fragmented, verbose historical state. We need a dedicated entity to synthesize these logs into dense, low-token knowledge blocks and aggressively prune the remainder.

  This proposed `librarian` persona fits perfectly into the existing strategic effort from IDEA-122 to theme Foundry roles as Generation 1 Pokémon. The Librarian is mapped to **Snorlax (#143)**—a sleeping giant that periodically awakens to digest immense amounts of data and consolidate memory.

- **How this idea maintains the 50/50 balance between DexHelper and Foundry:**
  In the previous session, we proposed a high-value DexHelper product feature (`idea-123-improved-savedata-typing.md`) designed to improve the application's core type engine.
  To strictly maintain our required **50/50 strategic balance**, we pivot back to the Foundry infrastructure for this session. By proposing IDEA-124, we focus entirely on the internal software factory, optimizing its scheduling, garbage collection, and token usage to prevent the orchestrator from collapsing under its own accumulated state weight over time.

# Visionary Journal

- **Active Session ID:** null
- **Domain:** Main Project (DexHelper)
- **Proposed Idea:** Shoal Cave Tide & Item Tracker (Gen 3)
- **Rationale & Concept:**
  Shoal Cave's tide mechanic is a classic Gen 3 time-based event that players often struggle to optimize because it relies on the internal RTC. By parsing the RTC and inventory for Shoal Shells/Salt, we can create a dashboard that predicts tides and tracks crafting progress for the Shell Bell. This leverages DexHelper's deep save parsing capabilities to provide a niche but highly valuable utility for Gen 3 players.
- **How this idea maintains the 50/50 balance between DexHelper and Foundry:**
  In the last session (idea-129), we proposed an infrastructure improvement for the Foundry orchestrator (Epic-Level Distillation). To maintain the strict 50/50 split, this session focuses on a direct product feature for DexHelper (Gen 3 Shoal Cave tracking).

# Visionary Journal

- **Active Session ID:** null
- **Domain:** Foundry System (Orchestrator)
- **Proposed Idea:** Implement Resource Locking (Mutex) in DAG Orchestrator (IDEA-131)
- **Rationale & Concept:**
  To prevent concurrent agents from stomping on shared resources or causing git merge conflicts, we need a formal resource locking mechanism built directly into the DAG orchestrator. Nodes will declare resources they need exclusive access to, and the orchestrator will ensure mutually exclusive dispatch.
- **How this idea maintains the 50/50 balance between DexHelper and Foundry:**
  In the previous session, we proposed a DexHelper idea (IDEA-130 Shoal Cave Tide & Item Tracker). To adhere to the strict 50/50 split requirement, this session focuses entirely on the internal Foundry system, proposing a core structural improvement to the orchestrator's concurrency model.

# Visionary Journal

- **Active Session/Timestamp:** 2026-08-03-01-53-42
- **Domain:** Foundry System (Orchestrator Tooling)
- **Proposed Idea:** Automated DAG Visualizer via Mermaid Generation (IDEA-133)
- **Rationale & Concept:**
  As the number of Foundry nodes grows, understanding the active DAG state via file inspection becomes extremely difficult. This idea proposes a tool to parse node relationships and status, generating a Mermaid.js diagram to visualize the pipeline. This enhances observability and debugging for the orchestrator.
- **How this idea maintains the 50/50 balance between DexHelper and Foundry:**
  In the previous session, we proposed a DexHelper idea (IDEA-132: Gen 3 Pal Park Migration Planner). To adhere to the strict 50/50 split requirement between core product features and internal factory tooling, this session focuses entirely on the internal Foundry system, proposing a visualization capability for the DAG orchestrator.
- **Outcome:** The idea was rejected by the maintainer because a GUI already exists. I have cancelled the IDEA node accordingly.

# Visionary Journal

- **Active Session/Timestamp:** 2026-08-05
- **Domain:** Foundry System
- **Proposed Idea:** Automated Agent A/B Testing Framework (IDEA-135)
- **Rationale & Concept:**
  Proposes a framework within the Foundry Orchestrator to A/B test system prompts and agent configurations on identical tasks in parallel. This allows the system to empirically determine which prompt structures or personas perform best (based on QA acceptance and lowest rejection count), enabling continuous, data-driven optimization of the multi-agent pipeline.
- **Strategic Balance:**
  In the previous session, we proposed IDEA-134 (Active Party Matchup Analyzer) for DexHelper. To strictly maintain the required 50/50 balance between product features and system improvements, this session pivots back to a Foundry Orchestrator idea.

# Visionary Journal

- **Active Session/Timestamp:** 2026-08-07
- **Domain:** Main Project (DexHelper)
- **Proposed Idea:** Gen 3 Trainer AI Move Predictor (IDEA-136)
- **Rationale & Concept:**
  Proposes a tool for DexHelper that predicts enemy trainer moves by simulating Generation 3 AI behavior scripts against the player's active party. Targeting hardcore challenge runners and Nuzlockers.
- **Strategic Balance:**
  Pivoting back to the DexHelper product domain after previously proposing a Foundry System idea (Automated Agent A/B Testing Framework, IDEA-135) to maintain the required 50/50 balance.

# Visionary Journal

- **Active Session/Timestamp:** 2026-08-08
- **Domain:** Main Project (DexHelper)
- **Proposed Idea:** Gen 1-3 In-Game Mail Archiver (IDEA-136)
- **Rationale & Concept:**
  Proposes a premium collector utility to extract and display custom messages written on in-game Mail held by Pokémon in the PC/Party. This preserves nostalgic social interactions from childhood saves.
- **Strategic Balance:**
  In the previous session, we proposed IDEA-135 (Automated Agent A/B Testing Framework) for the Foundry System. To strictly maintain the required 50/50 balance between product features and system improvements, this session pivots back to a DexHelper product feature.

# Visionary Journal

- **Active Session/Timestamp:** 2026-08-09
- **Domain:** Foundry System
- **Proposed Idea:** Automated ADR Compliance Linter (IDEA-142)
- **Rationale & Concept:**
  Proposes an automated CI linter that verifies codebase compliance against static rules defined in ADRs (e.g., UI constraints, React context requirements). This offloads enforcement from expensive LLM QA cycles to deterministic AST analysis.
- **Strategic Balance:**
  In previous sessions, we focused heavily on DexHelper features (e.g. IDEA-136 Gen 1-3 In-Game Mail Archiver, IDEA-134 Active Party Matchup Analyzer). To maintain the strict 50/50 balance between product features and system orchestrator improvements, this session introduces an optimization specifically targeting the Foundry system's CI and QA efficiency.

# Visionary Journal

- **Active Session/Timestamp:** 2026-08-10
- **Domain:** Main Project (DexHelper)
- **Proposed Idea:** Gen 2 Bug-Catching Contest Score Analyzer (IDEA-144)
- **Rationale & Concept:**
  Proposes an analyzer that reads Gen 2 save data to calculate the exact Bug-Catching Contest score based on hidden DVs, Level, and HP, providing a win probability against NPCs. This solves the opaque grind for rare evolutionary items like the Sun Stone.
- **Strategic Balance:**
  Pivoting back to the DexHelper product domain after previously proposing a Foundry System idea (IDEA-143 Local Visual Regression Testing & Component Diffing) to maintain the required 50/50 balance.

# Visionary Journal

- **Active Session/Timestamp:** 2026-08-04
- **Domain:** Main Project (DexHelper)
- **Proposed Idea:** Gen 1-3 Active Party Matchup Analyzer (IDEA-134)
- **Rationale & Concept:**
  As players progress through retro Pokémon games, they often hit roadblocks at major boss fights (Gym Leaders, Rivals). They may not realize their PC Box contains a perfect counter or that a TM in their inventory could solve their problem. By combining DexHelper's ability to read event flags (to know the next boss) with the player's full inventory and PC Box state, we can dynamically suggest party swaps and TM usage to optimize their team for the upcoming fight. This transforms DexHelper into an active strategic companion.
- **How this idea maintains the 50/50 balance between DexHelper and Foundry:**
  In the previous session, we proposed a Foundry orchestration feature (IDEA-133: Automated DAG Visualizer). To rigidly adhere to the required 50/50 strategic balance, this session pivots entirely to a direct product feature for DexHelper, aiming to improve the gameplay experience for end-users rather than optimizing the internal software factory.

# Visionary Journal

- **Active Session/Timestamp:** 2026-08-11
- **Domain:** Foundry system
- **Proposed Idea:** Foundry System Statistics Reporting and Backfilling (IDEA-146)
- **Rationale & Concept:**
  The Foundry autonomous software factory manages multiple concurrent agent pipelines across a graph of Ideas, PRDs, Epics, Stories, and Tasks. However, we have lacked a high-level operational reporting system for key factory metrics like pull requests (including auto-merge success rate) and node counts categorized by status and type.

  To address this, we proposed a unified statistics specification file updated by the orchestrator in real-time, coupled with a history-backfilling parser to analyze Git repository history. This will empower personas like the Agile Coach and TPM to analyze bottleneck points and monitor pipeline efficiency.

- **How this idea maintains the 50/50 balance between DexHelper and Foundry:**
  In the preceding sessions, a sequence of DexHelper product ideas were proposed (including the Gen 2 Bug Catching Contest Analyzer (IDEA-144) and the Component Variants and Theming Consolidation (IDEA-145)). Moving back to a core platform orchestration feature for the autonomous software factory (such as statistics and backfilling) successfully maintains the 50/50 strategic balance between direct end-user features (DexHelper) and internal pipeline improvements (Foundry).

# Visionary Journal

- **Active Session/Timestamp:** 2026-08-12-01-06-42
- **Domain:** Main Project (DexHelper)
- **Proposed Idea:** Gen 3 Weather Anomaly Tracker (IDEA-147)
- **Rationale & Concept:**
  In Pokemon Emerald, tracking the Marine Cave (Kyogre) and Terra Cave (Groudon) anomalies requires repeatedly revisiting the Weather Institute. DexHelper can automate this by extracting the relevant event flags and variables directly from the save file and highlighting the affected routes on the map UI.
- **How this idea maintains the 50/50 balance between DexHelper and Foundry:**
  In the previous session, we proposed IDEA-146 (Implement Foundry System Statistics Reporting and Backfilling), which focused purely on the Foundry Orchestrator. To strictly maintain the required 50/50 balance between product features and system improvements, this session pivots back to proposing a direct user-facing feature for DexHelper (a Gen 3 tracker).
