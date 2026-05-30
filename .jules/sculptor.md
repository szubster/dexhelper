
- Ad-hoc segmented controls in the tactical UI create excessive visual noise for AI tools. By abstracting them into a single `TacticalSegmentedControl` component, we consolidate accessibility logic (handling `aria-pressed` vs `aria-checked` properly for multi/single modes) and improve the readability of consuming components significantly.
