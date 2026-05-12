1. Add the `researcher` persona to the GitHub agents list by copying `.jules/schedules/researcher.md` to `.github/agents/researcher.md`.
2. Create a `researcher.md` journal policy/file in `.foundry/journals/researcher.md`.
3. Create a dedicated storage directory `.foundry/research/` for research output nodes.
4. Update `foundry-orchestrator.ts` to include `research_references?: string[]` in the `FoundryFrontmatter` interface.
5. Create `.github/scripts/foundry-resolve-research.ts` to recursively parse `research_references` from the parent chain of a node.
6. Implement logic in `foundry-engine.yml` to execute `.github/scripts/foundry-resolve-research.ts` and append the references to the Jules prompt context.
7. Tick off the remaining checkboxes in `.foundry/prds/prd-011-009-researcher-persona.md` and `.foundry/epics/epic-011-021-researcher-persona.md`.
8. Complete pre commit instructions step.
9. Submit the branch.
