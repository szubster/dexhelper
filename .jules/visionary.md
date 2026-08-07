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
