const fs = require('fs');

const implPath = '.foundry/tasks/task-108-161-gen3-roamer-location-impl.md';
let implContent = fs.readFileSync(implPath, 'utf8');
implContent = implContent.replace(
  'depends_on:\n  - .foundry/research/research-071-138-gen3-roamer-offsets.md',
  'depends_on:\n  - research-071-138-gen3-roamer-offsets'
);
fs.writeFileSync(implPath, implContent);

const qaPath = '.foundry/tasks/task-108-162-gen3-roamer-location-qa.md';
let qaContent = fs.readFileSync(qaPath, 'utf8');
qaContent = qaContent.replace(
  'depends_on:\n  - .foundry/tasks/task-108-161-gen3-roamer-location-impl.md',
  'depends_on:\n  - task-108-161-gen3-roamer-location-impl'
);
fs.writeFileSync(qaPath, qaContent);
