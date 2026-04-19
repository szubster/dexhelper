1. **Fix `hasStone` logic**: Update `hasStone` check in `src/engine/assistant/suggestionEngine.ts` to include `&& i.quantity > 0` so that 0-quantity items don't falsely trigger the "Ready to Evolve" suggestion.
2. **Pre-commit Instructions**: Run the pre-commit script to verify our code change.
3. **Submit Change**: Submit our work using standard commit messages.
