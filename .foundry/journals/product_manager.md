# Product Manager Journal

## Macro-Level Node Completion Timing
**Observation:**
Currently, macroscopic Foundry nodes (such as Epics and Stories) transition to the `VERIFYING` (and subsequently `COMPLETED`) status prematurely once their immediate Acceptance Criteria (usually just creating child nodes) are met, even though the actual implementation tasks have not been merged into the codebase.

**Architectural Constraint:**
This violates the spirit of the dependency graph. An Epic represents a "macroscopic functional chunk" of work. If it completes before its functional requirements are implemented, it provides a false sense of progress and can cause downstream nodes dependent on the Epic to be dispatched before the codebase is ready for them. The orchestrator must be updated to enforce strict hierarchical completion timing, preventing parent nodes from completing until all of their spawned descendant nodes are fully completed. This ensures that "Epic implementation is done" is semantically accurate across the DAG.

## Evaluating Custom Toolchain ROI
**Observation:**
An idea was generated to enforce `gray-matter` usage in scripts via a custom Biome/Oxlint rule. However, evaluating the implementation cost and maintenance overhead against the frequency of the issue (occasional regex regressions) revealed a low Return on Investment (ROI).

**Architectural Constraint:**
When proposing system improvements or guardrails (like custom linters), we must strictly evaluate the ROI. Creating and maintaining highly specific custom rules for minor edge-cases often outweighs the benefits compared to relying on standard PR reviews. If the technical cost and maintenance burden are disproportionately high for the problem being solved, the idea should be declined/cancelled early in the pipeline to avoid wasting engineering cycles.
