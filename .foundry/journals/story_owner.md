- **2026-05-XX Pattern Insight:** When implementing sequential stories (e.g., in `epic-017-029-dag-dashboard-ui`), sibling dependencies should be correctly linked using `depends_on`. For instance, `story-029-051-implement-core-graph-visualization` correctly blocks on `story-029-048-evaluate-graph-libraries`. I also made sure to append the newly spawned story to the parent epic's markdown and tick the checkbox, without modifying its YAML frontmatter.

- Learning: When creating subsequent stories for an epic where a previous story has FAILED, ensure the new story depends on the FAILED story to block execution until the failure is resolved.

## 2026-05-18: Gen3 Data Formats
Note that generation 3 data formatting and serialization uses MsgPack (`msgpackr`) rather than JSON, to reduce dataset sizes and improve parse speeds (ADR 010).

## 2026-05-18: Gen3 Data Formats Update
Note that generation 3 data formatting uses `.jsonl` for source files in the repository for ease of review, which is then compiled into MsgPack via a Vite plugin for runtime use.
- Sibling dependencies must strictly use node IDs (e.g., task-123-slug) instead of relative file paths to satisfy memory constraints.
- **2023-10-27**: When executing the Empty PR Policy because a STORY already has its downstream TASK nodes created and its acceptance criteria checked, the target artifact is considered complete. The `request_code_review` tool may generate a false negative stating "No patch was found to review", which can be ignored before proceeding with the `submit` tool.
- **2026-05-19 Pattern Insight:** When an implementation leaf task fails permanently and triggers the creation of a `RESEARCH` node and new retry tasks, do NOT update the originally associated pending `QA` task node frontmatter. Just update the QA task Markdown body indicating that it is CANCELLED and replaced by the new tasks.
