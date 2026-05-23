import fs from 'fs';
import matter from 'gray-matter';

const path = ".foundry/stories/story-044-082-dv-shiny-gene-logic.md";
const doc = matter(fs.readFileSync(path, "utf-8"));

doc.content = doc.content.replace(
  "- [ ] Tech Lead: Break down into backend Tasks.",
  "- [x] Tech Lead: Break down into backend Tasks.\n\n## Tasks Created\n- .foundry/tasks/task-082-140-implement-shiny-carrier-logic.md\n- .foundry/tasks/task-082-141-qa-shiny-carrier-logic.md"
);

fs.writeFileSync(path, matter.stringify(doc.content, doc.data));
