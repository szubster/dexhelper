---
id: idea-136-in-game-mail-archiver
type: IDEA
title: Gen 1-3 In-Game Mail Archiver
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-08'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - mail
  - collector
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 1-3 In-Game Mail Archiver

## Context
In early Pokémon generations, players could purchase Mail items, attach them to Pokémon, and write custom messages. This was a core social feature used when trading with friends. Over time, these attached messages become nostalgic time capsules. However, reading them requires booting up the game, navigating to the specific Pokémon in the PC, and viewing the mail, which is tedious for players with large collections.

## Proposal
Implement an "In-Game Mail Archiver" feature in DexHelper.
- **Mail Extraction:** Scan all Pokémon in the Party and PC boxes for held Mail items.
- **Message Parsing:** Extract and decode the text written on the Mail, including standard text and any special glyphs or vocabulary system words (like the Gen 3 easy chat system).
- **Digital Scrapbook UI:** Present the extracted messages in a dedicated "Mailbox" or "Scrapbook" UI. Display the author (if recorded), the Pokémon holding it, the Mail background (using appropriate CSS/sprites), and the message text.

## Value Proposition
This leans heavily into the "premium collector utilities" aspect of DexHelper. It preserves nostalgic memories and social interactions from childhood saves, offering a novel way to interact with save data that isn't focused purely on stats or completionism.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD, determining the scope (e.g., starting with Gen 2 or Gen 3 mail formats).
