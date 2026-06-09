If I shouldn't remove the encounters entirely, but rather show a warning:
```typescript
        const details = suggestion.encounterInfo[pid];
        if (details) {
          const missingTools = new Set<string>();
          for (let dIdx = 0; dIdx < details.length; dIdx++) {
            const d = details[dIdx];
            if (d) {
              if (d.method === 'headbutt' && !hasHeadbutt) missingTools.add('Headbutt (TM02)');
              if (d.method === 'rock-smash' && !hasRockSmash) missingTools.add('Rock Smash (TM08)');
              if (d.method === 'surf' && !hasSurf) missingTools.add('Surf');
              if (d.method === 'old-rod' && !hasOldRod) missingTools.add('Old Rod');
              if (d.method === 'good-rod' && !hasGoodRod) missingTools.add('Good Rod');
              if (d.method === 'super-rod' && !hasSuperRod) missingTools.add('Super Rod');
            }
          }
          if (missingTools.size > 0) {
              const warnings = Array.from(missingTools);
              if (suggestion.warning) {
                  suggestion.warning += `, Requires ${warnings.join(' or ')}`;
              } else {
                  suggestion.warning = `Requires ${warnings.join(' or ')}`;
              }
              // If they don't have the tool, we probably should lower the priority
              // so it doesn't show at the top
              suggestion.priority = Math.min(suggestion.priority, 50);
          }
          // We no longer filter out `details`. We keep them all so the user sees the encounters!
          hasValidEncounter = true;
        }
```
Wait, if a Pokemon has multiple encounter methods (e.g. walk and surf), we shouldn't add a warning if they can catch it via `walk`!
Ah! Good point.

```typescript
        const details = suggestion.encounterInfo[pid];
        if (details) {
          const missingTools = new Set<string>();
          let hasAccessibleMethod = false;

          for (let dIdx = 0; dIdx < details.length; dIdx++) {
            const d = details[dIdx];
            if (d) {
              let methodAccessible = true;
              if (d.method === 'headbutt' && !hasHeadbutt) { methodAccessible = false; missingTools.add('Headbutt'); }
              else if (d.method === 'rock-smash' && !hasRockSmash) { methodAccessible = false; missingTools.add('Rock Smash'); }
              else if (d.method === 'surf' && !hasSurf) { methodAccessible = false; missingTools.add('Surf'); }
              else if (d.method === 'old-rod' && !hasOldRod) { methodAccessible = false; missingTools.add('Old Rod'); }
              else if (d.method === 'good-rod' && !hasGoodRod) { methodAccessible = false; missingTools.add('Good Rod'); }
              else if (d.method === 'super-rod' && !hasSuperRod) { methodAccessible = false; missingTools.add('Super Rod'); }

              if (methodAccessible) {
                  hasAccessibleMethod = true;
              }
            }
          }

          if (!hasAccessibleMethod && missingTools.size > 0) {
              const warnings = Array.from(missingTools);
              const warningStr = `Requires ${warnings.join(' or ')}`;
              if (suggestion.warning) {
                  suggestion.warning += `, ${warningStr}`;
              } else {
                  suggestion.warning = warningStr;
              }
              // penalize priority
              suggestion.priority = Math.min(suggestion.priority, 45);
          }
          hasValidEncounter = true;
        }
```
If we do this, `filteredDetails` array logic goes away. We just iterate and don't delete elements. The encounters stay in `suggestion.encounterInfo[pid]`.
Wait, the old logic completely removed elements from the array!
```typescript
          const filteredDetails: EncounterDetail[] = [];
          for (let dIdx = 0; dIdx < details.length; dIdx++) {
            const d = details[dIdx];
            if (d) {
              if (d.method === 'headbutt' && !hasHeadbutt) continue;
              ...
              filteredDetails.push(d);
            }
          }
          suggestion.encounterInfo[pid] = filteredDetails;
```
If we don't remove them, the user will see the encounters in the UI. And they will see a warning.
This satisfies the prompt!
