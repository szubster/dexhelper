# Scribe Session Journal - Zustand Store Documentation

## Target Module
`src/store.ts`

## Motivation
`src/store.ts` contains the central application Zustand store. While basic type definitions and property comments existed, the main `useStore` hook lacked JSDoc detailing critical store invariants:
1. **Transient vs. Persisted State Separation:** Distinguishing between user settings (persisted to `localStorage` via `partialize`) and heavy/transient runtime data (e.g., `saveData`, search terms, modal toggles).
2. **Storage Quota Preservation:** Explaining why binary save data must remain in IndexedDB/cloud storage rather than `localStorage` to prevent browser quota crashes (5MB limit).
3. **Selector Performance Best Practices:** Documenting atomic inline selector patterns to avoid unnecessary full-tree re-renders.

## Actions Completed
- Added comprehensive JSDoc to `useStore` in `src/store.ts`.
- Outlined architecture, state persistence invariants, storage quota preservation rules, and selector subscription best practices with explicit `@example` blocks.
- Verified file edits and passed all tests via `pnpm test`.

## Lessons Learned
- When documenting global state management stores, clearly detailing which state slices are persisted versus transient—and explaining the storage quota reasons why—gives future developers vital architectural context.
