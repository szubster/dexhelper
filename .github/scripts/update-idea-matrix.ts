import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

// Helper to find all markdown files in a directory recursively
function findMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else if (filePath.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

export function updateIdeaDependencyMatrix(repoRoot: string) {
  const matrixFilePath = path.join(repoRoot, '.foundry/docs/architecture/idea_dependency_matrix.md');
  if (!fs.existsSync(matrixFilePath)) {
    const dir = path.dirname(matrixFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Create new file with basic frontmatter and header
    const initialContent = `---
id: doc-architecture-idea-dependency-matrix
type: RESEARCH
title: "Idea Dependency Matrix Schema"
status: COMPLETED
owner_persona: architect
created_at: "${new Date().toISOString().split('T')[0]}"
updated_at: "${new Date().toISOString().split('T')[0]}"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
priority: 70
tags:
  - architecture
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ""
notes: "Historical mapping metadata index for overlapping domain boundaries between implemented and archived Ideas."
---

# Idea Dependency Matrix

## Context / Purpose
The Idea Dependency Matrix is a lightweight historical mapping index designed to track the relationships, dependencies, and overlapping domain boundaries between implemented, active, and archived \`IDEA\` nodes within The Foundry. As the system scales and multiple ideas touch similar parts of the codebase or product surface, this matrix serves as a single source of truth for understanding how different ideas interact.

## Guidelines
- **Updating the Matrix:** When a new \`IDEA\` node is transitioned to \`COMPLETED\` or when a new feature is architected that significantly overlaps with existing domains, the architect or responsible persona must update the matrix table below.
- **Node IDs:** Always use the exact, full Node ID (e.g., \`idea-001-auth-overhaul\`).
- **Domain Boundaries:** Briefly describe the specific area of the application or architecture that the Idea modifies or relies upon.
- **Dependencies:** List any other \`IDEA\` nodes that this Idea directly depends on or significantly interacts with.

## The Matrix

| Idea ID | Title | Domain Boundaries | Dependencies / Overlaps | Status |
| :--- | :--- | :--- | :--- | :--- |
`;
    fs.writeFileSync(matrixFilePath, initialContent, 'utf-8');
  }

  const ideasDir = path.join(repoRoot, '.foundry/ideas');
  const archiveIdeasDir = path.join(repoRoot, '.foundry/archive/ideas');

  const allIdeaFiles = [
    ...findMarkdownFiles(ideasDir),
    ...findMarkdownFiles(archiveIdeasDir)
  ];

  type IdeaData = {
    id: string;
    title: string;
    domainBoundaries: string;
    dependencies: string;
    status: string;
  };

  const parsedIdeas: IdeaData[] = [];

  for (const file of allIdeaFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const parsed = matter(content);
      const data = parsed.data;

      if (data.type !== 'IDEA') continue;

      const id = data.id || path.basename(file, '.md');
      const title = data.title || 'Untitled Idea';
      const status = data.status || 'UNKNOWN';
      const tags = (data.tags || []).join(', ');

      let deps = '';
      if (Array.isArray(data.depends_on) && data.depends_on.length > 0) {
          deps = data.depends_on.map((d: string) => `\`${d}\``).join(', ');
      }
      if (data.parent) {
          deps = deps ? `${deps}, Parent: \`${data.parent}\`` : `Parent: \`${data.parent}\``;
      }

      parsedIdeas.push({
        id,
        title,
        domainBoundaries: tags || 'Uncategorized',
        dependencies: deps,
        status,
      });
    } catch (e) {
      console.warn(`Failed to parse idea file ${file}:`, e);
    }
  }

  // Sort by ID
  parsedIdeas.sort((a, b) => a.id.localeCompare(b.id));

  // Read existing matrix file
  const matrixContent = fs.readFileSync(matrixFilePath, 'utf-8');

  // Create new table string
  const header = `| Idea ID | Title | Domain Boundaries | Dependencies / Overlaps | Status |\n| :--- | :--- | :--- | :--- | :--- |`;

  let newTable = header;

  // Let's just do it simpler: extract everything between header and end

  const lines = matrixContent.split('\n');
  const existingEntries: Record<string, any> = {};

  let inTable = false;
  for (const row of lines) {
    if (row.includes('| Idea ID | Title |')) {
      inTable = true;
      continue;
    }
    if (inTable && row.trim().startsWith('|')) {
        if (row.includes('| :--- | :--- |')) continue;
        if (row.includes('(Add new ideas here)')) continue;

        // Split by | but ignore the first and last empty elements that result from standard markdown table padding
        const cols = row.split('|').map(c => c.trim());
        // A valid row `| a | b | c |` will split into `['', 'a', 'b', 'c', '']`. We need to drop first and last if empty.
        if (cols.length > 0 && cols[0] === '') cols.shift();
        if (cols.length > 0 && cols[cols.length - 1] === '') cols.pop();

        if (cols.length >= 5) {
            const idMatch = cols[0].match(/`([^`]+)`/);
            if (idMatch) {
                existingEntries[idMatch[1]] = {
                    id: idMatch[1],
                    title: cols[1],
                    domainBoundaries: cols[2],
                    dependencies: cols[3],
                    status: cols[4]
                };
            }
        }
    } else if (inTable && row.trim() === '') {
        inTable = false; // end of table
    }
  }

  // merge
  for (const idea of parsedIdeas) {
      let finalTitle = idea.title;
      let finalDomain = idea.domainBoundaries;
      let finalDeps = idea.dependencies;

      if (existingEntries[idea.id]) {
          const ex = existingEntries[idea.id];
          if (ex.domainBoundaries !== 'Uncategorized' && idea.domainBoundaries === 'Uncategorized') {
              finalDomain = ex.domainBoundaries;
          }
          if (ex.dependencies && !idea.dependencies) {
              finalDeps = ex.dependencies;
          }
      }

      newTable += `\n| \`${idea.id}\` | ${finalTitle} | ${finalDomain} | ${finalDeps} | ${idea.status} |`;
  }

  // Replace the old table. The old table starts at '| Idea ID |' and ends at the first blank line (or EOF)
  const startIndex = lines.findIndex(l => l.includes('| Idea ID | Title |'));
  if (startIndex === -1) {
    fs.writeFileSync(matrixFilePath, matrixContent + '\n\n' + newTable + '\n');
    return;
  }

  let endIndex = startIndex;
  while (endIndex < lines.length && lines[endIndex].trim().startsWith('|')) {
      endIndex++;
  }

  const beforeTable = lines.slice(0, startIndex).join('\n');
  const afterTable = lines.slice(endIndex).join('\n');

  fs.writeFileSync(matrixFilePath, beforeTable + (beforeTable.endsWith('\n') ? '' : '\n') + newTable + '\n' + afterTable, 'utf-8');
}

if (typeof require !== 'undefined' && require.main === module) {
  const repoRoot = process.cwd();
  updateIdeaDependencyMatrix(repoRoot);
  console.log('Idea dependency matrix updated successfully.');
} else if (typeof process !== 'undefined' && process.argv && process.argv[1] && typeof URL !== 'undefined') {
  try {
    const { fileURLToPath } = require('url');
    const isMain = process.argv[1] === fileURLToPath(import.meta.url);
    if (isMain) {
      const repoRoot = process.cwd();
      updateIdeaDependencyMatrix(repoRoot);
      console.log('Idea dependency matrix updated successfully.');
    }
  } catch {
    // Ignore ES module errors in CJS envs
  }
}
