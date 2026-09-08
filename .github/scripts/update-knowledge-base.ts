import * as fs from 'node:fs';
import * as path from 'node:path';

export interface ExtractedRule {
  description: string;
  category?: string;
  sourceFiles?: string[];
}

export function updateKnowledgeBase(
  repoRoot: string,
  rules: ExtractedRule[],
  targetFile: string = '.foundry/docs/knowledge_base/agents/core_policies.md'
): void {
  const targetPath = path.join(repoRoot, targetFile);
  if (!fs.existsSync(targetPath)) {
    throw new Error(`Knowledge base file not found at ${targetPath}`);
  }

  let content = fs.readFileSync(targetPath, 'utf-8');

  if (rules.length === 0) return;

  const sectionHeader = '## Librarian Extracted Rules';

  if (content.includes(sectionHeader)) {
    const parts = content.split(sectionHeader);


    // We just want to find lines starting with "- " in the section.
    // However, it's easier to just check if the rule is already in the file.
    const newRulesToAppend = rules.filter(r => !content.includes(`- ${r.description}`));

    if (newRulesToAppend.length > 0) {
      const newRulesText = newRulesToAppend.map(r => `- ${r.description}`).join('\n');
      content = `${parts[0]}${sectionHeader}\n${newRulesText}\n${parts[1]}`;
    }
  } else {
    const newRulesText = rules.map(r => `- ${r.description}`).join('\n');
    content += `\n${sectionHeader}\n${newRulesText}\n`;
  }

  fs.writeFileSync(targetPath, content, 'utf-8');
}
