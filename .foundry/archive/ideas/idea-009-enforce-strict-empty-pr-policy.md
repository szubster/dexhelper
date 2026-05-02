---
id: idea-009-enforce-strict-empty-pr-policy
type: IDEA
title: "Enforce Strict Empty PR Policy Across Personas"
status: "COMPLETED"
owner_persona: product_manager
created_at: "2026-04-27"
updated_at: "2026-04-27"
depends_on: []
jules_session_id: null
---

# Enforce Strict Empty PR Policy Across Personas

## Details
Recent rejections show that agents (e.g., Product Manager) are creating dummy updates (like appending empty checkboxes) when a target artifact already exists, in an attempt to force a git diff. This violates the EMPTY PR POLICY and leads to automated reviewer rejections.
We need to systematically review all persona prompts and automated validation scripts to ensure that agents understand they must submit 0-file-change PRs when no actionable work remains, allowing the 'Auto-close Empty PRs' action to handle the completion.
