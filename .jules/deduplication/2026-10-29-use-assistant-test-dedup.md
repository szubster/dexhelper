# useAssistant Hook Test Suite Deduplication

## Learnings
- **Duplicate Test Suite Elimination**: Consolidated redundant test suite `src/hooks/useAssistant.test.tsx` (which resided outside the standard `__tests__` directory) into `src/hooks/__tests__/useAssistant.test.tsx`.
- **Selective Mocking Strategy**: By mocking only `fetchAssistantApiData` while keeping `generateSuggestions` as the real implementation in `src/hooks/__tests__/useAssistant.test.tsx`, both hook logic (null state, Mewtwo filtering, living dex, manual version, heatmap) and suggestion generation integration rules (ancestor catchability, version exclusive trades, "Catch Right Here" deduplication) are tested within a single unified suite without code or test duplication.
