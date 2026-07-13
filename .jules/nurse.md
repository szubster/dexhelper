# Nurse type improvements
Found and removed an unnecessary `as` cast in `src/components/TacticalSegmentedControl.tsx` that was bypassing the compiler checks for `document.activeElement`. Replaced with proper type narrowing.
