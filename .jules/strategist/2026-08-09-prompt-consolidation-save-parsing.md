## 2026-08-09 - [Accepted] - Prompt improvement - Consolidate Save Parsing Rules
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The prompt files for `coder`, `qa`, and `tech_lead` all contained duplicated and verbose instructions regarding save file parsing (magic numbers, `RangeError` bounds checking, relative Gen 3 offsets, bitwise mapping). This duplicated context consumes token windows and makes it harder to update rules consistently.
**Pattern:** Centralize widely-shared, verbose rules (like save parsing and DataView constraints) into `core_policies.md` and instruct personas to reference them there, rather than repeating the full paragraphs in every individual agent prompt.
