- **2026-05-XX Pattern Insight:** When implementing sequential stories (e.g., in `epic-017-029-dag-dashboard-ui`), sibling dependencies should be correctly linked using `depends_on`. For instance, `story-029-051-implement-core-graph-visualization` correctly blocks on `story-029-048-evaluate-graph-libraries`. I also made sure to append the newly spawned story to the parent epic's markdown and tick the checkbox, without modifying its YAML frontmatter.

- Learning: When creating subsequent stories for an epic where a previous story has FAILED, ensure the new story depends on the FAILED story to block execution until the failure is resolved.

## 2026-05-18: Gen3 Data Formats
Note that generation 3 data formatting and serialization uses MsgPack (`msgpackr`) rather than JSON, to reduce dataset sizes and improve parse speeds (ADR 010).

## 2026-05-18: Gen3 Data Formats Update
Note that generation 3 data formatting uses `.jsonl` for source files in the repository for ease of review, which is then compiled into MsgPack via a Vite plugin for runtime use.
- Sibling dependencies must strictly use node IDs (e.g., task-123-slug) instead of relative file paths to satisfy memory constraints.
- **2026-05-19 Pattern Insight:** When an implementation leaf task fails permanently and triggers the creation of a `RESEARCH` node and new retry tasks, do NOT update the originally associated pending `QA` task node frontmatter. Just update the QA task Markdown body indicating that it is CANCELLED and replaced by the new tasks.

- **2026-05-22 Pattern Insight:** When handling a permanently failed child node (e.g., reaching Max Rejection Count), we must NOT change the YAML frontmatter of associated orphaned pending QA task nodes. We should only append a `CANCELLED` notice in the orphaned node's markdown body. The `status` in the YAML frontmatter MUST remain whatever it previously was (e.g., `PENDING`). Additionally, when checking off boxes in a generated tasks list inside a parent story, it may be necessary to leave the replaced/cancelled task unchecked while checking the new replacement tasks.
