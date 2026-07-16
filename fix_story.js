const fs = require('fs');
const content = fs.readFileSync('.foundry/stories/story-090-134-garbage-collection-integration.md', 'utf-8');
const newContent = content.replace('updated_at: \'2026-07-16\'', `updated_at: '${new Date().toISOString().split('T')[0]}'`);
fs.writeFileSync('.foundry/stories/story-090-134-garbage-collection-integration.md', newContent);
