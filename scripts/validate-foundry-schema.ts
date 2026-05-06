import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

function getFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

function validateSchema() {
  const args = process.argv.slice(2);
  let targetFiles: string[] = [];

  if (args.length > 0) {
    targetFiles = args.filter(file => {
      if (!file.endsWith('.md')) return false;
      const normalizedRelative = file.split(path.sep).join('/');
      if (!normalizedRelative.includes('.foundry/')) return false;
      if (normalizedRelative.includes('.foundry/docs/')) return false;
      if (normalizedRelative.includes('.foundry/journals/')) return false;
      return true;
    });
  } else {
    const foundryDir = path.resolve('.foundry');
    if (!fs.existsSync(foundryDir)) {
      console.error('No .foundry directory found.');
      process.exit(0);
    }

    const allFiles = getFiles(foundryDir);
    targetFiles = allFiles.filter(file => {
      if (!file.endsWith('.md')) return false;
      const relativePath = path.relative(foundryDir, file);
      const normalizedRelative = relativePath.split(path.sep).join('/');
      if (normalizedRelative.startsWith('docs/')) return false;
      if (normalizedRelative.startsWith('journals/')) return false;
      if (normalizedRelative.startsWith('archive/journals/')) return false;
      return true;
    });
  }

  const ids = new Set<string>();
  let hasError = false;

  const ideaRegex = /^idea-\d{3}(-[a-z0-9-]+)?$/;
  const otherRegex = /^(prd|epic|story|task)-\d{3}(-\d{3})?(-[a-z0-9-]+)?$/;

  const validTypes = ['IDEA', 'PRD', 'EPIC', 'STORY', 'TASK'];
  const validStatuses = ['PENDING', 'READY', 'ACTIVE', 'COMPLETED', 'FAILED', 'BLOCKED', 'CANCELLED'];
  const validPersonas = [
    'product_manager', 'epic_planner', 'story_owner', 'architect',
    'tech_lead', 'coder', 'qa', 'human', 'tpm', 'agile_coach', 'researcher'
  ];
  const requiredFields = ['id', 'title', 'created_at', 'updated_at', 'depends_on', 'jules_session_id'];

  for (const file of targetFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    let parsed;
    try {
      parsed = matter(content);
    } catch (e) {
      console.error(`Error: Failed to parse frontmatter for file ${file}`);
      console.error(e);
      hasError = true;
      continue;
    }

    const data = parsed.data;

    // 1. Check required fields
    for (const field of requiredFields) {
      if (!(field in data)) {
        console.error(`Error: Missing required field '${field}' in file ${file}`);
        hasError = true;
      }
    }

    const { id, type, status, owner_persona } = data;

    // 2. Validate Enums
    if (type && !validTypes.includes(type)) {
      console.error(`Error: Invalid type enum '${type}' in file ${file}`);
      hasError = true;
    }
    if (status && !validStatuses.includes(status)) {
      console.error(`Error: Invalid status enum '${status}' in file ${file}`);
      hasError = true;
    }
    if (owner_persona && !validPersonas.includes(owner_persona)) {
      console.error(`Error: Invalid owner_persona enum '${owner_persona}' in file ${file}`);
      hasError = true;
    }

    // 3. ID format & uniqueness
    if (id) {
      if (ids.has(id)) {
        console.error(`Error: Duplicate ID found: ${id} in file ${file}`);
        hasError = true;
      }
      ids.add(id);

      if (id.startsWith('idea-')) {
        if (!ideaRegex.test(id)) {
          console.error(`Error: Invalid ID format for IDEA node: ${id} in file ${file}`);
          hasError = true;
        }
      } else {
        if (!otherRegex.test(id)) {
          console.error(`Error: Invalid ID format for node: ${id} in file ${file}`);
          hasError = true;
        }
      }
    } else {
      console.error(`Error: No ID found in frontmatter of file ${file}`);
      hasError = true;
    }
  }

  if (hasError) {
    process.exit(1);
  } else {
    console.log('All Foundry nodes passed schema validation.');
  }
}

validateSchema();
