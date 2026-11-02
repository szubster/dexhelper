# WildItemSelector Test Suite Deduplication

## Learnings
- **Duplicate Component Test Suite Elimination**: Consolidated `src/components/dashboard/inventory/WildItemSelector.test.tsx` (which resided outside standard `__tests__` directories) into `src/components/dashboard/inventory/__tests__/WildItemSelector.test.tsx`.
- **Preserved Distinct Coverage**: Merged UI interaction test cases (search input filtering, button toggling, badge deletion via title='Remove target', and clearing all selections) with database error handling tests (`pokeDB.getAllItems` rejection) in a single unified test suite.
