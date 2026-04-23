## 2024-03-31 - Assistant Evolution Item Suggestion
**Learning:** The item evolution check was verifying if an evolution stone existed in `saveData.inventory`, but was not checking its `quantity`. This could cause false "Ready to Evolve" suggestions if the save parser left 0-quantity items in the inventory array.
**Action:** Always check `quantity > 0` when verifying player items in `saveData.inventory`.
## 2024-04-22 - Assistant Trade Evolution Held Item Support
**Learning:** The Trade evolution logic (`EVO_TRIGGER.TRADE`) was missing support for checking if a required `held` item was in the player's inventory, which is crucial for Gen 2 evolutions like Onix to Steelix.
**Action:** Always check the `detail.held` property for Trade evolutions and verify the player has it in their `saveData.inventory`.
