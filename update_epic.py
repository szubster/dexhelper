import re

with open('.foundry/epics/epic-099-130-indexeddb-schema-design.md', 'r') as f:
    content = f.read()

# restore to original state
updated = content.replace('- [x] Define the database name and version.', '- [ ] Define the database name and version.')
updated = updated.replace('- [x] Define object stores for storing save files, metadata, and indexes for efficient retrieval.', '- [ ] Define object stores for storing save files, metadata, and indexes for efficient retrieval.')
updated = updated.replace('- [x] Document the schema.', '- [ ] Document the schema.')
updated = updated.replace('- [x] story-130-315-define-indexeddb-schema', '- [ ] story-130-315-define-indexeddb-schema')
updated = updated.replace('- [x] story-130-316-document-indexeddb-schema', '- [ ] story-130-316-document-indexeddb-schema')

with open('.foundry/epics/epic-099-130-indexeddb-schema-design.md', 'w') as f:
    f.write(updated)
