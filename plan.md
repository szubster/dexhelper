1. Run `pnpm lint && pnpm test` using `run_in_bash_session`.
2. Draft a TASK node using `write_file` for `.foundry/tasks/task-526-564-rng-explainer-ui-impl.md` with the following content:
```markdown
---
id: task-526-564-rng-explainer-ui-impl
type: TASK
title: Implement RNG Tool Explainer UI Component
status: READY
owner_persona: coder
created_at: '2024-05-18'
updated_at: '2024-05-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-131-526-rng-explainer-ui-component
tags:
  - feature
  - rng
  - explainer
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement RNG Tool Explainer UI Component

## Objective
Implement a brief, user-friendly explainer section within the RNG calculator UI that instructs users on how to use their TID/SID combination with external RNG manipulation tools.

## Acceptance Criteria
- [ ] Create a new UI component (e.g., `RNGExplainer`) in the appropriate RNG calculator directory.
- [ ] Ensure the component renders a clear, accessible explanation of TID/SID usage.
- [ ] Adhere to the "tactical hardware/snooping" aesthetic constraints (ADR 008) including `rounded-none`, `border-dashed`, and monospaced fonts where applicable.
- [ ] Write unit tests for the new component using `vitest-browser-react` to ensure it renders correctly and is accessible.
```
3. Use `read_file` to read `.foundry/tasks/task-526-564-rng-explainer-ui-impl.md`.
4. Draft a TASK node using `write_file` for `.foundry/tasks/task-526-565-rng-explainer-ui-qa.md` with the following content:
```markdown
---
id: task-526-565-rng-explainer-ui-qa
type: TASK
title: QA Verification for RNG Tool Explainer UI Component
status: READY
owner_persona: qa
created_at: '2024-05-18'
updated_at: '2024-05-18'
depends_on:
  - task-526-564-rng-explainer-ui-impl
jules_session_id: null
pr_number: null
parent: story-131-526-rng-explainer-ui-component
tags:
  - qa
  - rng
  - explainer
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Verification for RNG Tool Explainer UI Component

## Objective
Verify the implementation of the RNG tool explainer UI component to ensure it meets requirements, accessibility standards, and aesthetic guidelines.

## Acceptance Criteria
- [ ] Verify the explainer component is present and clearly visible in the RNG calculator UI.
- [ ] Verify the explanation text is easy to understand and accurately describes TID/SID usage with external tools.
- [ ] Confirm adherence to ADR 008 UI compliance guidelines (e.g., `rounded-none`, `border-dashed`, monospaced fonts).
- [ ] Verify that appropriate unit tests exist and pass.
```
5. Use `read_file` to read `.foundry/tasks/task-526-565-rng-explainer-ui-qa.md`.
6. Update `.foundry/stories/story-131-526-rng-explainer-ui-component.md` using `replace_with_git_merge_diff` with the following content:
<<<<<<< SEARCH
## Acceptance Criteria
- [ ] Implement a brief text explainer component in the RNG calculator UI.
- [ ] Ensure the explanation is accessible and easy to understand.
- [ ] Tech Lead: Break down this Story into actionable Tasks.
=======
## Acceptance Criteria
- [ ] Implement a brief text explainer component in the RNG calculator UI.
- [ ] Ensure the explanation is accessible and easy to understand.
- [x] Tech Lead: Break down this Story into actionable Tasks.
- [ ] task-526-564-rng-explainer-ui-impl
- [ ] task-526-565-rng-explainer-ui-qa
>>>>>>> REPLACE
7. Use `read_file` to read `.foundry/stories/story-131-526-rng-explainer-ui-component.md`.
8. Run `pnpm lint && pnpm test` using `run_in_bash_session`.
9. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
10. Submit the changes using the `submit` tool with the `pr_body` parameter.
