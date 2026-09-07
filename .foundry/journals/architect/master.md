### Context
The Foundry Orchestrator was flagging TASK nodes owned by the 'architect' persona as FAILED due to a restrictive persona-to-type mapping. Specifically, `.foundry/tasks/task-048-080-evaluate-graph-libraries.md` was unresolvable because it was owned by 'architect' but the schema only allowed 'coder', 'qa', or 'tech_lead' for TASK nodes.

### Rationale
Architects frequently perform evaluation tasks (e.g., assessing graph libraries, prototyping integration approaches) that result in ADRs or technical specifications. These activities are best represented as TASK nodes within the Foundry DAG.

## 2026-05-17
* **MsgPack Transition for Gen 3:** As part of the Gen 3 data implementation, I created ADR 010 to mandate a shift from JSON to MsgPack (`msgpackr`) for data storage and hydration. As previously researched in `data_format_strategy.md`, expanding from ~177 KB of Gen 1-2 data up to the full Gen 3 size risks ballooning the bundle and slowing down client-side parsing. By making this transition now, we optimize application efficiency.
- When referencing other nodes in YAML frontmatter fields like `parent` or `depends_on`, strictly use the exact node ID (e.g., `prd-053-022-gen3-data-parsing`) rather than the relative file path to avoid Groundedness Rule violations.

## 2026-05-19: Late Binding Correction
Received CEO feedback: "As architect you should prepare adrs. Leave rest to other personas and late binding. Improve your prompt now, if it was not obvious."
Learning: My role is strictly architectural blueprinting (creating ADRs, schemas). Breaking down work into EPICs, STORYs, and TASKs is the responsibility of other personas (epic_planner, story_owner, tech_lead) via late binding. I should not proactively create downstream execution nodes.

### 2026-05-21: Re-evaluating Data Deduplication Optimizations
When utilizing advanced serializers with object structure deduplication (like `msgpackr` with `useRecords`), stripping property names down to minified keys (e.g., `n` instead of `name`) for size reduction becomes an anti-pattern. The serialization library already extracts these keys into extensions, making the short names redundant. Moving forward, we should prioritize readable, verbose property names to preserve Developer Experience (DX) rather than prematurely optimizing property lengths, as the size gains are negligible (e.g., ~52 bytes per 1,000 objects). Enum-to-integer optimizations remain valid as strings cannot be perfectly deduplicated.

## 2026-06-07: Feebas Route 119 Visualization Architecture (ADR 020)
**Context:** Implemented an ADR for rendering the Feebas tile locations in Gen 3 (Ruby, Sapphire, Emerald).
**Learning:** Separating the complex mathematics (LCG PRNG logic) used to calculate the 6 tiles based on the save file seed from the React UI representation is critical. This enforces testability and allows the `PokemonLocations` component to simply render an array of coordinates without knowing about memory offsets or game-specific PRNG nuances.
**Impact:** Re-affirmed our commitment to a pure decoupled state/UI model, particularly necessary for the incredibly esoteric logic of Gen 3 hidden mechanics.


- ADR 032 is accepted to use a multi-emulator architecture (`binjgb` for Gen 1/2, `mGBA` for Gen 3).
- Updated `.foundry/docs/schema.md` to document the global data contract for emulator integration and WASM memory extraction for `.sav` data as required by the Architect persona guidelines.
