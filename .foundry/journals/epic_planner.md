# Master Journal: Epic_planner

## Session: 10479712932444324014
# Session 10479712932444324014

Handled node: `prd-070-043-roamer-tracking-dashboard`

Cancelled the remaining Gen 3 roamer tracking epics (`epic-043-152`, `epic-043-153`, `epic-043-154`, `epic-043-155`) as `research-043-263-roamer-tracking-remediation` and ADR `108-027` concluded that static map coordinate extraction for Gen 3 roamers is impossible (the data is kept in EWRAM). Updated the PRD node by checking off the Gen 3 epics to resolve the impossible loop. The Gen 2 tracking tasks can proceed as they are feasible.

## Session: 13025108147948745503
# Session 13025108147948745503

## Session: 14140594791612700438
# Session 14140594791612700438

## Impossible Loop Handled
The child epic `epic-108-303-extend-phase-3-6-cancelled-nodes` of PRD `prd-086-108-fix-orchestrator-phase-3-6` was cancelled due to max rejections. I have checked off the cancelled epic in the PRD, created a `RESEARCH` node to investigate the failure, and created a replacement `EPIC` node that depends on the research node.

## Session: 1822128316479176715
# 1822128316479176715 - Epic Planner Journal
- I am reviewing the PRD `prd-082-099-gen3-trainer-data-extraction.md`.
- It seems there was already an epic `epic-099-130-gen3-trainer-data-extraction.md` created for this PRD.
- My task is to fix this by creating a new Epic or modifying the PRD to create an Epic that includes an E2E/integration story, or to create another epic specifically for E2E testing to fulfill the PRD requirements.
- The PRD acceptance criteria has `- [ ] epic-099-130-gen3-trainer-data-extraction`, but I should create a new epic that satisfies the missing E2E story requirement. Let's create `epic-099-339-gen3-trainer-data-extraction-e2e.md` (338 is the highest in my `ls -1 .foundry/epics/ | tail -n 10` but `epic-120-338-implement-conflictless-journals.md` exists).
Wait, looking at `epic-099-130-gen3-trainer-data-extraction.md`, the AC has:
`- [x] story-130-269-extract-gen3-trainer-id-secret-id`
I'll create a new Epic to represent the missing E2E integration, or recreate/supersede the failed epic. Actually, the prompt says "Your core responsibility is transforming a Product Requirements Document (PRD) into detailed EPIC breakdowns." Since the existing epic failed due to "Missing E2E/integration story", I should create a new epic specifically for the E2E story (or update the PRD to point to a new comprehensive epic). Wait, the PRD acceptance criteria is:
`- [ ] epic-099-130-gen3-trainer-data-extraction`

Ah, the PRD's AC has `- [ ] epic-099-130-gen3-trainer-data-extraction`. The epic exists but failed.
If I need to fix the failure, I should create a new EPIC for the E2E testing.

Let's write a new epic `epic-099-339-gen3-trainer-data-extraction-e2e.md`.

## Session: 3721592406195149594
# Session 3721592406195149594

## Learning

## Session: 448054359944447803
# Session 448054359944447803

## Outcome
Successfully broke down PRD `prd-121-336-gen3-mystery-gift-viewer` into two sequential Epics: `epic-121-345-gen3-mystery-gift-data-extraction` and `epic-121-346-gen3-mystery-gift-dashboard-ui`.

## Learning & Pattern
- Maintained strict adherence to not modifying the YAML frontmatter of the parent node.
- Followed the node sequence numbering (next logical sequence was 345, 346 based on files in `.foundry/epics/`).
- Enforced the exact Node ID checklist format (`- [ ] <node_id>`) in the parent's markdown.
- As per memory constraint, strictly used the node ID instead of the file path for `depends_on`.

## Session: 5089727026280127086
# Epic Planner Session Log
**Session ID:** 5089727026280127086

## Task: Breakdown PRD for Gen 3 Spinda Pattern Viewer
Successfully broke down PRD `prd-119-335-gen3-spinda-pattern-viewer.md` into 3 sequential epics:
- `epic-335-345-spinda-pid-extraction.md`
- `epic-335-346-spinda-pattern-rendering-engine.md` (depends on extraction)
- `epic-335-347-spinda-viewer-dashboard-ui.md` (depends on rendering)

Appended the new nodes as unchecked items to the PRD to prevent premature verification. Applied Sibling Dependency Recommendations (ADR-005) to correctly order the DAG nodes.


## Session 5775857715362814694.md

# Session Log
Foundry child nodes (epic-095-119 and epic-095-120) for PRD 095-056 permanently failed due to reaching max rejection count. Spawned a RESEARCH node to investigate the root cause, and created replacement EPICs. Ensured to check off the cancelled child nodes in the parent PRD markdown body to avoid the Impossible Loop constraint and adhere to ADR 007.

---

## Session 5406308992691137803.md

# 5406308992691137803

## Context
Woken up by the Orchestrator for `prd-073-045-gen3-secret-base-viewer` due to an Auditor Rejection.
The child nodes (`epic-045-324-gen3-secret-base-parsing-v2`, `epic-045-325-gen3-secret-base-radar-integration-v2`, `epic-045-326-gen3-secret-base-dashboard-v2`) failed permanently (Max rejection count reached).

## Actions Taken
- Created a `RESEARCH` node (`research-045-396-investigate-secret-base-v2-failure`) to investigate the root cause of the v2 epic failures.
- Created replacement `EPIC` nodes (`epic-045-397-gen3-secret-base-parsing-v3`, `epic-045-398-gen3-secret-base-radar-integration-v3`, `epic-045-399-gen3-secret-base-dashboard-v3`) that depend on the `RESEARCH` node.
- Appended the new nodes to the PRD's markdown body.
- Checked off the failed child nodes in the PRD's markdown body to comply with the "Handling Permanent Child Failures (The Impossible Loop)" policy and satisfy ADR 007.
- Removed the `### Auditor Rejection` block.
- Enforced a final STORY dedicated exclusively to Integration and E2E Verification in the acceptance criteria of each new EPIC.

## Learned
When children fail permanently, we must spawn research to figure out why, create new nodes that depend on that research, and check off the permanently failed ones so the parent node isn't blocked forever, per the impossible loop policy. Also, every EPIC must explicitly generate a final STORY dedicated exclusively to Integration and E2E Verification.

---

## Session 2026-08-04-00-27-08.md

# Epic Planner Session Journal

## Session ID
6110336391984079559 (or 2026-08-04-00-27-08)

## Target Node
prd-066-099-save-state-history-storage

## Action Taken
Handled the "Impossible Loop" where a child node (`epic-099-130-indexeddb-schema-design`) reached Max Rejection Count and failed permanently. This also caused its downstream dependencies (`epic-099-131`, `epic-099-132`) to be cancelled.

## Key Learnings
1. **The Impossible Loop Policy**: When a child node permanently fails, we must explicitly spawn a `RESEARCH` node to investigate the root cause *before* spawning new retry epics.
2. **Dependency Chaining**: The newly spawned retry epics must explicitly depend on the new `RESEARCH` node to ensure the root cause is resolved before implementation resumes.
3. **Markdown Checkboxes**: The permanently failed/cancelled child nodes *must* be checked off (`- [x]`) in the parent PRD's markdown body. Leaving them unchecked will cause ADR 007 to permanently block the parent PRD from transitioning to COMPLETED.
4. **E2E Verification Enforcement**: All newly spawned EPICs must now explicitly include a final STORY dedicated exclusively to Integration and E2E Verification, per updated Core Directives.
