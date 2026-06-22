import fs from 'node:fs';
import path from 'node:path';
import matter from '@11ty/gray-matter';

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
      if (normalizedRelative.includes('.foundry/archive/journals/')) return false;
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
  const otherRegex = /^(prd|epic|story|task|research)-\d{3}(-\d{3})?(-[a-z0-9-]+)?$/;

  const validTypes = ['IDEA', 'PRD', 'EPIC', 'STORY', 'TASK', 'RESEARCH'];
  const validStatuses = ['PENDING', 'READY', 'ACTIVE', 'VERIFYING', 'COMPLETED', 'FAILED', 'BLOCKED', 'CANCELLED'];
  const validPersonas = [
    'product_manager', 'epic_planner', 'story_owner', 'architect',
    'tech_lead', 'coder', 'qa', 'human', 'tpm', 'agile_coach', 'researcher'
  ];

  const validMappings: Record<string, string[]> = {
    IDEA: ['product_manager'],
    PRD: ['epic_planner', 'story_owner'],
    EPIC: ['story_owner', 'epic_planner'],
    STORY: ['tech_lead', 'story_owner'],
    TASK: ['coder', 'qa', 'tech_lead', 'architect'],
    RESEARCH: ['researcher'],
  };

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

    // 2.5 Validate persona mapping
    if (type && owner_persona && owner_persona !== 'human' && owner_persona !== 'tpm' && owner_persona !== 'agile_coach') {
      const allowedPersonas = validMappings[type as string] || [];
      if (!allowedPersonas.includes(owner_persona)) {
        console.error(`Error: Invalid mapping: ${type} node '${file}' cannot be owned by '${owner_persona}'`);
        hasError = true;
      }
    }

    // 2.6 Validate rejection_reason
    if (status === 'FAILED') {
      const reason = data['rejection_reason'];
      if (reason === undefined || reason === null || (typeof reason === 'string' && reason.trim() === '')) {
        console.error(`Error: Missing rejection_reason for FAILED node in file ${file}`);
        hasError = true;
      }
    } else if (status === 'ACTIVE' || status === 'COMPLETED' || status === 'READY' || status === 'VERIFYING') {
      // Proactively ensure rejection_reason is populated if it exists to prevent edge-case validation failures
      // during transitions, but do not fail for non-FAILED nodes unless it's explicitly malformed.
      const reason = data['rejection_reason'];
      if (reason === undefined) {
        console.warn(`Warning: Missing rejection_reason field in file ${file}. It should be present for all nodes.`);
      }
    }

    // 2.7 Validate paths
    if (data['depends_on'] && Array.isArray(data['depends_on'])) {
      for (const dep of data['depends_on']) {
        if (typeof dep === 'string' && dep.includes('/')) {
          if (!fs.existsSync(dep)) {
            console.error(`Error: Dependency path does not exist: '${dep}' in file ${file}`);
            hasError = true;
          }
        }
      }
    }

    if (data['research_references'] && Array.isArray(data['research_references'])) {
      for (const ref of data['research_references']) {
        if (typeof ref === 'string' && ref.includes('/')) {
          if (!fs.existsSync(ref)) {
            console.error(`Error: Research reference path does not exist: '${ref}' in file ${file}`);
            hasError = true;
          }
        }
      }
    }

    if (data['parent']) {
      // Parent might be an ID or a path. If it looks like a path (contains '/'), verify it exists.
      if (typeof data['parent'] === 'string' && data['parent'].includes('/')) {
        if (!fs.existsSync(data['parent'])) {
          console.error(`Error: Parent path does not exist: '${data['parent']}' in file ${file}`);
          hasError = true;
        }
      }
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
