

---

- **Active Session/Timestamp:** 2026-08-20
- **Domain:** Main Project (DexHelper)
- **Proposed Idea:** Gen 2 Headbutt Tree Predictor (IDEA-157)
- **Rationale & Concept:**
  In Generation 2 (Gold, Silver, Crystal), headbutt trees spawn wild Pokémon, but the math dictating which trees yield which encounter tables is based on the player's Trainer ID (TID) and the tree's X/Y map coordinates. Finding rare Pokémon like Heracross is often a frustrating, opaque grind.
  The Gen 2 Headbutt Tree Predictor proposes leveraging DexHelper's save file parsing to read the TID, apply the headbutt formula, and explicitly color-code the interactive map UI to show exactly which trees the player should hunt at for their specific save file.
- **Strategic Balance:**
  In the preceding session, IDEA-156 was proposed for the Foundry System (Automated Graph Healing for BLOCKED Nodes). To strictly maintain the required 50/50 strategic balance between direct end-user features (DexHelper) and internal pipeline improvements (Foundry), this session pivots back to proposing a high-value, mechanics-surfacing product feature for DexHelper (Gen 2 Headbutt Tree Predictor).


---

# Visionary Journal

- **Active Session/Timestamp:** 2026-08-18-00-40-43
- **Domain:** Foundry System
- **Proposed Idea:** Foundry DAG Node Health Heatmap Visualizer (IDEA-156)
- **Rationale & Concept:**
  The project already possesses an interactive React Flow DAG visualizer at `/dag`. However, managing pipeline velocity at scale requires more than just structural topology; it requires observability into node health (e.g., resurrection loops, high rejection counts). This idea proposes a "Health Heatmap" overlay for the existing DAG visualizer to proactively highlight problematic nodes, aiding the TPM and Agile Coach.
- **Strategic Balance:**
  In the previous session, we proposed IDEA-155 (Gen 3 Trick House Tracker) for the main DexHelper product domain. To strictly maintain the required 50/50 balance between product features and system improvements, this session pivots back to a Foundry Orchestrator tooling improvement.
