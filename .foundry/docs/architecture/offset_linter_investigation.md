# Offset Linter Investigation

## Findings
- Biome does not support custom JavaScript rules yet. The `noMagicNumbers` rule is available but does not allow specific targeting of `DataView` methods or hex strings.
- Oxlint does not support custom JavaScript rules yet and has limited rules.
- ESLint supports custom rules, but introducing it would add significant bloat since the project currently uses Biome and Oxlint for linting.

## Proposal
Given the tooling limitations, I propose falling back to an ADR and code-review enforcement to ensure that memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level rather than as inline magic numbers.
