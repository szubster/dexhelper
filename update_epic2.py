import re

with open('.foundry/epics/epic-099-130-indexeddb-schema-design.md', 'r') as f:
    content = f.read()

# re-apply since this is required
updated = content.replace('- [ ] Define the database name and version.', '- [x] Define the database name and version.')
updated = updated.replace('- [ ] Define object stores for storing save files, metadata, and indexes for efficient retrieval.', '- [x] Define object stores for storing save files, metadata, and indexes for efficient retrieval.')
updated = updated.replace('- [ ] Document the schema.', '- [x] Document the schema.')
updated = updated.replace('- [ ] story-130-315-define-indexeddb-schema', '- [x] story-130-315-define-indexeddb-schema')
updated = updated.replace('- [ ] story-130-316-document-indexeddb-schema', '- [x] story-130-316-document-indexeddb-schema')

with open('.foundry/epics/epic-099-130-indexeddb-schema-design.md', 'w') as f:
    f.write(updated)
