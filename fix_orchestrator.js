const fs = require('fs');
let content = fs.readFileSync('.foundry/tasks/task-072-128-implement-dag-cancellation.md', 'utf8');
content = content.replace(
  "- [ ] Implement detection of permanently failed nodes",
  "- [x] Implement detection of permanently failed nodes"
);
content = content.replace(
  "- [ ] Traverse the DAG to identify all `PENDING` nodes",
  "- [x] Traverse the DAG to identify all `PENDING` nodes"
);
content = content.replace(
  "- [ ] Transition identified `PENDING` nodes to `CANCELLED`",
  "- [x] Transition identified `PENDING` nodes to `CANCELLED`"
);
content = content.replace(
  "- [ ] Set `rejection_reason` for the newly cancelled nodes",
  "- [x] Set `rejection_reason` for the newly cancelled nodes"
);
content = content.replace(
  "- [ ] Include loop detection/safeguards",
  "- [x] Include loop detection/safeguards"
);
content = content.replace(
  "- [ ] Output console logs for the cancellation operations",
  "- [x] Output console logs for the cancellation operations"
);
fs.writeFileSync('.foundry/tasks/task-072-128-implement-dag-cancellation.md', content, 'utf8');
